import * as monaco from "monaco-editor";

class Workspace {
  #modules: Record<string, Module> = {};

  join(path: string): string {
    return `${path}`;
  }

  add(module: Module): Module {
    this.#modules[module.relative] = module;
    return module;
  }

  module(relative: string): Module | undefined {
    return this.#modules[relative];
  }
}

class Types {
  #package: string;
  #manifest: Module;
  #modules: Record<string, Module> = {};

  constructor(pkg: string) {
    this.#package = pkg;

    this.#manifest = Module.insert(
      this,
      "package.json",
      "json",
      JSON.stringify(
        {
          name: this.#typesName,
        },
        null,
        2
      )
    );
  }

  join(file: string): string {
    return `node_modules/@types/${this.#typesName}/${file}`;
  }

  get #typesName() {
    if (this.#package.startsWith("@")) {
      // convert @foo/bar to foo__bar
      return this.#package.slice(1).replace(/\//g, "__");
    } else {
      return this.#package;
    }
  }

  addIndex(module: Module) {
    this.add(module);
    this.#manifest.update(
      JSON.stringify(
        {
          name: this.#typesName,
          main: module.relative,
        },
        null,
        2
      )
    );
  }

  add(module: Module) {
    this.#modules[module.relative] = module;
    addTS(`/${module.filename}`, this.#package, module.content);
  }

  module(relative: string): Module | undefined {
    return this.#modules[relative];
  }
}

class Module implements monaco.IDisposable {
  static insert(
    root: Package | Workspace | Types,
    filename: string,
    language: "typescript" | "javascript" | "json",
    content: string
  ) {
    return new Module(root, filename, language, content);
  }

  #root: Package | Workspace | Types;
  #filename: string;
  #language: "typescript" | "javascript" | "json";
  #content: string;
  #model: monaco.editor.ITextModel;

  private constructor(
    root: Package | Workspace | Types,
    filename: string,
    language: "typescript" | "javascript" | "json",
    content: string
  ) {
    this.#root = root;
    this.#filename = filename;
    this.#language = language;
    this.#content = content;
    this.#model = this.#insert();
  }

  dispose() {
    this.#model.dispose();
  }

  update(body: string) {
    this.#model.setValue(body);
  }

  #insert(): monaco.editor.ITextModel {
    return monaco.editor.createModel(
      this.#content,
      this.#language,
      monaco.Uri.parse(this.filename)
    );
  }

  get model() {
    return this.#model;
  }

  get filename() {
    return this.#root.join(this.#filename);
  }

  get relative() {
    return this.#filename;
  }

  get content() {
    return this.#content;
  }
}

export class ReplWorkspace {
  static configure(): ReplWorkspace {
    monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      module: monaco.languages.typescript.ModuleKind.ESNext,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      noEmit: true,
      typeRoots: ["node_modules/@types"],
      strict: true,
    });

    monaco.languages.typescript.typescriptDefaults.workerOptions;

    const store = new ReplWorkspace();

    store.json("package.json", {
      private: true,
      type: "module",
      main: "index.ts",
    });

    return store;
  }

  #workspace = new Workspace();
  #nodeModules: Record<string, Package> = {};

  get(filename: string | { module: string; in: string }): Module | undefined {
    if (typeof filename === "string") {
      return this.#workspace.module(filename);
    } else {
      return this.#nodeModules[filename.in].get(filename.module);
    }
  }

  json(filename: string, contents: object): Module {
    const module = Module.insert(
      this.#workspace,
      filename,
      "json",
      JSON.stringify(contents, null, 2)
    );
    this.#workspace.add(module);
    return module;
  }

  ts(filename: string, contents: string): Module {
    const module = Module.insert(
      this.#workspace,
      filename,
      "typescript",
      contents
    );
    this.#workspace.add(module);
    return module;
  }

  add(pkg: Package): void {
    pkg.update();
    this.#nodeModules[pkg.name] = pkg;
  }

  // skypack(lib: string, skypack: )
}

export const MONACO_WORKSPACE = ReplWorkspace.configure();

export class Package {
  static create(name: string, version: string) {
    return new Package(name, version);
  }

  #name: string;
  #version: string;
  #main: Module;
  #modules: Module[];
  #types: Types;
  #manifest: Module;

  constructor(
    name: string,
    version: string,
    {
      main,
      modules,
      types,
    }: {
      main?: Module;
      modules?: Module[];
      types?: Types;
    } = {}
  ) {
    this.#name = name;
    this.#version = version;
    this.#main =
      main ?? Module.insert(this, "index.js", "javascript", "export {}");
    this.#modules = modules ?? [];
    this.#types = types ?? new Types(name);
    this.#manifest = this.#createPackageJSON();
  }

  getType(filename: string): Module | undefined {
    return this.#types.module(filename);
  }

  get(filename: string): Module | undefined {
    if (filename === this.#main.relative) {
      return this.#main;
    }

    if (filename === "package.json") {
      return this.#manifest;
    }

    return this.#modules.find((m) => m.relative === filename);
  }

  #createPackageJSON(): Module {
    return Module.insert(
      this,
      "package.json",
      "json",
      JSON.stringify(this.manifest, null, 2)
    );
  }

  get name() {
    return this.#name;
  }

  update() {
    this.#manifest.update(JSON.stringify(this.manifest, null, 2));
  }

  add(
    type: "exports:main" | "exports:types" | "module" | "type",
    filename: string,
    content: string
  ): this {
    switch (type) {
      case "exports:main":
        this.#main.dispose();
        this.#main = Module.insert(this, filename, "javascript", content);
        break;
      case "exports:types":
        this.#types.addIndex(
          Module.insert(this.#types, filename, "typescript", content)
        );

        break;
      case "module":
        this.#modules.push(
          Module.insert(this, filename, "javascript", content)
        );
        break;
      case "type":
        this.#types.add(Module.insert(this, filename, "typescript", content));
        break;
    }

    return this;
  }

  join(filename: string) {
    return `node_modules/${this.#name}/${filename}`;
  }

  get main() {
    return this.#main;
  }

  get type() {
    return this.#types.addIndex;
  }

  get modules() {
    return this.#modules;
  }

  get dts() {
    return this.#types;
  }

  get manifest(): object {
    return {
      name: this.#name,
      version: this.#version,
      main: this.#main.relative,
    };
  }
}

class AsyncPackage {
  #name: string;

  /** The root of the module for X-Import-URL and X-Typescript-Types */
  #root: string;
  /** The filename under X-Import-URL */
  #main: string;
  /** The filename under X-Typescript-Types */
  #typeIndex: string;
  /** The types files imported from the type index */
  #types: Record<string, Module>;
}

export default new ReplWorkspace();

function addTS(filename: string, pkg: string, content: string) {
  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    `declare module "${pkg}" { ${content} }`,
    filename
  );
}
