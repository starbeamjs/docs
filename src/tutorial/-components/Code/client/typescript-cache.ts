export class TypescriptCache {
  static initialize(storage = localStorage): TypescriptCache {
    const cache = new TypescriptCache(storage, new Map());
    cache.#load();
    return cache;
  }

  readonly #storage: Storage;
  #cache: Map<string, string>;

  private constructor(
    storage: Storage,
    cache: Map<string, string>
  ) {
    this.#storage = storage;
    this.#cache = cache;
  }

  #load() {
    const cache = new Map<string, string>();
    const storage = this.#storage;

    for (const key of Object.keys(storage)) {
      const value = storage.getItem(key);
      if (typeof value === "string") {
        cache.set(key, value);
      }
    }

    this.#cache = cache;
  }

  toWorker() {
    this.#load();
    return this.#cache;
  }
}
