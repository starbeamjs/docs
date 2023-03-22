import { useStorage } from "@vueuse/core";
import { ref, watch, type Ref } from "vue";

const LANG_KEY = "default-lang";
const DEFAULT_LANG = "js";

export class Lang {
  #store: Ref<Record<string, string>>;
  readonly #currentLang: Ref<"ts" | "js">;

  constructor() {
    const store = (this.#store = useStorage<
      Record<string, string>
    >("VUEPRESS_CODE_TAB_STORE", {}));
    this.#currentLang = ref(this.lang);

    watch(
      () => store.value[LANG_KEY] as "ts" | "js" | undefined,
      (newValue) => {
        this.#currentLang.value = newValue ?? DEFAULT_LANG;
      }
    );
  }

  get store(): Record<string, string> {
    return this.#store.value;
  }

  get currentLang(): "ts" | "js" {
    return this.#currentLang.value;
  }

  get lang(): "ts" | "js" {
    return this.store[LANG_KEY] === "ts" ? "ts" : "js";
  }

  set lang(lang: "ts" | "js") {
    this.store[LANG_KEY] = lang;
  }
}

export const STORAGE = new Lang();
