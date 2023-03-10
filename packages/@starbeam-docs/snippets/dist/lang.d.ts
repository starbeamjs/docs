import { type Ref } from "vue";
export declare class Lang {
    #private;
    store: Ref<Record<string, string>>;
    constructor();
    get currentLang(): "ts" | "js";
    get lang(): "ts" | "js";
    set lang(lang: "ts" | "js");
}
export declare const STORAGE: Lang;
//# sourceMappingURL=lang.d.ts.map