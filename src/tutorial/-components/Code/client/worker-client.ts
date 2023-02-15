import { onUnmounted } from "vue";
import { logOnClient } from "../shared/log.js";

export class WorkerClient {
  static create() {
    const worker = new Worker(
      new URL("../worker/main.ts", import.meta.url),
      {
        name: "ts-server",
        type: "module",
      }
    );

    const controller = new AbortController();
    const client = new WorkerClient(worker, controller);

    worker.addEventListener(
      "message",
      (event) => {
        client.#onMessage(event);
      },
      { signal: controller.signal }
    );

    return client;
  }

  static dispose(client: WorkerClient) {
    client.#abort.abort();
    client.#worker.terminate();
  }

  readonly #worker: Worker;
  readonly #events: Map<string, Set<Function>> = new Map();
  readonly #abort: AbortController;

  private constructor(worker: Worker, abort: AbortController) {
    this.#worker = worker;
    this.#abort = abort;
  }

  on<D extends object>(
    event: string,
    callback: (data: D) => void
  ): () => void {
    const callbacks = this.#events.get(event) ?? new Set();

    callbacks.add(callback);

    this.#events.set(event, callbacks);

    return () => {
      callbacks.delete(callback);
    };
  }

  post(event: string, details: object) {
    logOnClient("out", event, details);
    this.#worker.postMessage({ event, details });
  }

  #onMessage(event: MessageEvent) {
    const { event: name, details } = event.data;

    logOnClient("in", name, details);

    const callbacks = this.#events.get(name);

    if (callbacks) {
      for (const callback of callbacks) {
        callback(details);
      }
    }
  }
}

export function useWorkerClient(name = "ts-server") {
  const client = WorkerClient.create();

  onUnmounted(() => {
    WorkerClient.dispose(client);
  });

  return client;
}
