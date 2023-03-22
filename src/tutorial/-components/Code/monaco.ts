import loader from "@monaco-editor/loader";
import monacoLib, { Uri } from "monaco-editor";
import type ts from "typescript";
import {
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
  type Ref,
} from "vue";
import type { TutorialSandpack } from "./sandpack.js";

type LoadedMonaco = typeof monacoLib;
type MonacoModel = monacoLib.editor.ITextModel;
type MonacoEditor = monacoLib.editor.IEditor;
type ModelChangeEvent =
  monacoLib.editor.IModelContentChangedEvent;
type Unsubscribe = () => void;
type IDisposable = monacoLib.IDisposable;

const REACT_JSX: ts.JsxEmit.ReactJSX = 4;

export interface VirtualFile {
  readonly code: string;
}

export interface Files {
  readonly files: Record<string, VirtualFile>;
  readonly activeFile: string;
}

export interface MonacoOptions {
  readonly sandpack: TutorialSandpack;
  readonly element: Ref<null | HTMLElement>;
}

type UseMonaco = Ref<null | {
  system: Monaco;
  editor: Editor;
}>;

export function useMonaco({
  sandpack,
  element,
}: MonacoOptions): UseMonaco {
  const returnRef: UseMonaco = shallowRef(null);

  onMounted(async () => {
    const monaco = await Monaco.load();

    // debugger;

    for (const [name, file] of Object.entries(sandpack.files)) {
      monaco.addFile({
        code: file.code,
        path: name,
      });
    }

    if (!element.value) {
      throw Error(
        "UNEXPECTED: monaco element ref wasn't populated"
      );
    }

    const editor = monaco.editor(
      element.value,
      sandpack.activeFile.value
    );

    editor.onChange((e, model) => {
      sandpack.updateCurrentFile(model.code);
    });

    watch(sandpack.activeFile, () => {
      editor.setFile(sandpack.activeFile.value);
    });

    onUnmounted(() => {
      Monaco.dispose(monaco);
    });

    returnRef.value = { system: monaco, editor };
  });

  onUnmounted(() => {
    const initialized = returnRef.value;

    if (initialized) {
      Editor.dispose(initialized.editor);
    }
  });

  return returnRef;
}

export interface CodeFile {
  readonly code: string;
  readonly path: string;
}

export class Monaco {
  static async load(): Promise<Monaco> {
    const monaco = await loader.init();
    const ts = monaco.languages.typescript;

    console.debug("VERSION", ts.typescriptVersion);

    ts.typescriptDefaults.setEagerModelSync(true);

    ts.typescriptDefaults.setCompilerOptions({
      target: ts.ScriptTarget.ESNext,
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      strict: true,
      allowSyntheticDefaultImports: true,
      esModuleInterop: true,
      isolatedModules: true,
      typeRoots: ["node_modules"],
      paths: {
        "@starbeam/*": [
          "node_modules/@starbeam/*/dist/index.js",
        ],
      },
    });
    return new Monaco(monaco, MonacoModels.empty(monaco));
  }

  static dispose(monaco: Monaco) {
    MonacoModels.dispose(monaco.#models);
  }

  static models(monaco: Monaco): MonacoModels {
    return monaco.#models;
  }

  readonly #monaco: LoadedMonaco;
  readonly #models: MonacoModels;

  constructor(monaco: LoadedMonaco, models: MonacoModels) {
    this.#monaco = monaco;
    this.#models = models;
  }

  get #ts() {
    return this.#monaco.languages.typescript;
  }

  upsertLib({ code, path }: CodeFile) {
    const uri = this.#monaco.Uri.file(path);

    const model = this.#monaco.editor.getModel(uri);

    if (!model) {
      if (path.endsWith(".d.ts")) {
        this.#ts.typescriptDefaults.addExtraLib(code, path);
        this.#monaco.editor.createModel(code, undefined, uri);
      } else {
        this.#monaco.editor.createModel(code, undefined, uri);
      }
      // this.#ts.typescriptDefaults.addExtraLib(code, path);
    }

    // this.#ts.typescriptDefaults(code, path);
  }

  upsertFile({ code, path }: CodeFile) {
    const model = this.#model(path);

    if (model === null) {
      this.addFile({ code, path });
    } else {
      model.update(code);
    }
  }

  addFile({ code, path }: CodeFile): void {
    const uri = this.#monaco.Uri.file(path);

    const model = Model.of(
      this.#monaco.editor.createModel(code, undefined, uri)
    );
    this.#models.add(path, model);
  }

  editor(element: HTMLElement, path: string | null): Editor {
    // this.#ts.typescriptDefaults.setInlayHintsOptions({
    //   includeInlayVariableTypeHints: true,
    // });

    const activeModel = this.#model(path);

    const editor = this.#monaco.editor.create(element, {
      minimap: { enabled: false },
      // inlayHints: { enabled: "onUnlessPressed" },
      model: activeModel?.raw ?? null,
      automaticLayout: true,

      // scrollBeyondLastColumn: 0,
      // wordWrapColumn: 50,
      // scrollbar: {
      //   horizontal: "hidden",
      // },
      // wordWrap: "bounded",
    });

    return Editor.create(this, editor, activeModel ?? null);
  }

  #model(path: string | null): Model | null {
    if (path === null) {
      return null;
    }

    const model = this.#models.get(path);

    return model ? Model.of(model) : null;
  }
}

type ModelChangeHandler = (
  event: ModelChangeEvent,
  model: Model
) => void;

class ActiveModel {
  static start(
    onChange: Set<ModelChangeHandler>,
    initialModel: Model | null
  ) {
    const model = new ActiveModel(null, onChange);
    model.next(initialModel?.raw ?? null);
    return model;
  }

  readonly #model: {
    model: MonacoModel;
    dispose: IDisposable;
  } | null;
  readonly #onChange: Set<ModelChangeHandler>;

  constructor(
    model: { model: MonacoModel; dispose: IDisposable } | null,
    onChange: Set<ModelChangeHandler>
  ) {
    this.#model = model;
    this.#onChange = onChange;
  }

  next(model: MonacoModel | null) {
    if (this.#model) {
      this.#model.dispose.dispose();
    }

    if (model) {
      const dispose = model.onDidChangeContent((e) => {
        this.#onChange.forEach((cb) => cb(e, Model.of(model)));
      });

      return new ActiveModel({ model, dispose }, this.#onChange);
    } else {
      {
        return new ActiveModel(null, this.#onChange);
      }
    }
  }
}

class Editor {
  static create(
    monaco: Monaco,
    editor: MonacoEditor,
    initialModel: Model | null
  ): Editor {
    return new Editor(
      monaco,
      Monaco.models(monaco),
      editor,
      initialModel
    );
  }

  static dispose(editor: Editor) {
    editor.#editor.dispose();
    MonacoModels.dispose(editor.#models);
  }

  readonly #monaco: Monaco;
  readonly #models: MonacoModels;
  readonly #editor: MonacoEditor;

  readonly #onChange: Set<ModelChangeHandler> = new Set();

  #active: ActiveModel;

  private constructor(
    monaco: Monaco,
    models: MonacoModels,
    editor: MonacoEditor,
    initialModel: Model | null
  ) {
    this.#monaco = monaco;
    this.#models = models;
    this.#editor = editor;
    this.#active = ActiveModel.start(
      this.#onChange,
      initialModel
    );
  }

  onChange(callback: ModelChangeHandler): Unsubscribe {
    this.#onChange.add(callback);

    return () => {
      this.#onChange.delete(callback);
    };
  }

  setFile(path: string): void {
    const model = this.#models.get(path);
    this.#editor.setModel(model);
    this.#active = this.#active.next(model);
  }
}

class Model {
  static of(model: MonacoModel): Model {
    return new Model(model);
  }

  readonly #model: MonacoModel;

  private constructor(model: MonacoModel) {
    this.#model = model;
  }

  get raw(): MonacoModel {
    return this.#model;
  }

  get id() {
    return this.#model.id;
  }

  get uri() {
    return this.#model.uri;
  }

  get code() {
    return this.#model.getValue();
  }

  update(code: string) {
    this.#model.setValue(code);
  }
}

class MonacoModels {
  static empty(monaco: LoadedMonaco): MonacoModels {
    return new MonacoModels(monaco, new Map());
  }

  static dispose(models: MonacoModels) {
    for (const uri of models.#models.values()) {
      const model = models.#monaco.editor.getModel(uri);
      model?.dispose();
    }
  }

  readonly #monaco: LoadedMonaco;
  readonly #models: Map<string, Uri>;

  private constructor(
    monaco: LoadedMonaco,
    models: Map<string, Uri>
  ) {
    this.#monaco = monaco;
    this.#models = models;
  }

  add(path: string, model: Model): void {
    this.#models.set(path, model.uri);
  }

  get(path: string): MonacoModel | null {
    const id = this.#models.get(path);

    if (!id) {
      return null;
    }

    return this.#monaco.editor.getModel(id);
  }
}
