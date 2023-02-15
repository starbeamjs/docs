import type { SandpackMessage } from "@codesandbox/sandpack-client";
import {
  useActiveCode,
  useSandpack,
  type UseSandpack,
} from "sandpack-vue3";
import { onUnmounted, shallowRef, watch, type Ref } from "vue";
import type { VirtualFile } from "./monaco.ts";

type SandpackListeners = {
  [E in SandpackMessage["type"]]: (
    msg: Extract<SandpackMessage, { type: E }>
  ) => void;
};

type SandpackListener<T extends SandpackMessage["type"]> = (
  msg: Extract<SandpackMessage, { type: T }>
) => void;

export class TutorialSandpack {
  static create(
    sandpack: UseSandpack,
    activeFile: Ref<string>
  ): TutorialSandpack {
    const unlisten = sandpack.listen((msg) => {
      client.#onMessage(msg);
    });

    const client = new TutorialSandpack(
      sandpack,
      activeFile,
      unlisten
    );

    return client;
  }

  static dispose(client: TutorialSandpack) {
    client.#unlisten();
  }

  readonly #sandpack: UseSandpack;
  readonly #activeFile: Ref<string>;
  readonly #unlisten: () => void;
  readonly #events: Map<string, Set<Function>> = new Map();

  private constructor(
    sandpack: UseSandpack,
    activeFile: Ref<string>,
    unlisten: () => void
  ) {
    this.#sandpack = sandpack;
    this.#activeFile = activeFile;
    this.#unlisten = unlisten;
  }

  on<E extends SandpackMessage["type"]>(
    event: E,
    callback: SandpackListener<E>
  ): () => void {
    const callbacks = this.#events.get(event) ?? new Set();
    callbacks.add(callback);
    this.#events.set(event, callbacks);

    return () => {
      callbacks.delete(callback);
    };
  }

  #onMessage(msg: SandpackMessage) {
    const listeners = this.#events.get(msg.type);

    if (listeners) {
      for (const listener of listeners) {
        listener(msg);
      }
    }
  }

  get #info() {
    return this.#sandpack.sandpack;
  }

  get activeFile(): Ref<string> {
    return this.#activeFile;
  }

  updateCurrentFile(code: string) {
    return this.#sandpack.sandpack.updateCurrentFile(code);
  }

  get files(): Record<string, VirtualFile> {
    const files = this.#sandpack.sandpack.files;

    return Object.fromEntries(
      Object.entries(files).map(([key, value]) => [
        key,
        { code: value.code },
      ])
    );
  }
}

export function useTutorialSandpack(): TutorialSandpack {
  const { code } = useActiveCode();
  const used = useSandpack();

  const activeFile = shallowRef(used.sandpack.activeFile);

  const sandpack = TutorialSandpack.create(used, activeFile);

  watch(code, () => {
    activeFile.value = used.sandpack.activeFile;
  });

  onUnmounted(() => {
    TutorialSandpack.dispose(sandpack);
  });

  return sandpack;
}
