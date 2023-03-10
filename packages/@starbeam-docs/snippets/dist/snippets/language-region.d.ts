import type { Region, Snippets } from "docs-snippet";
import type { HighlightFn, StateEnv } from "../utils.js";
export declare class RenderLanguageRegion {
    #private;
    static create({ filename, region, parsed, kind, env, }: {
        region: Region;
        parsed: Snippets;
        kind: "ts" | "js";
        filename: string;
        env: StateEnv;
    }): RenderLanguageRegion;
    private constructor();
    highlight(highlight: HighlightFn | null | undefined): string;
}
//# sourceMappingURL=language-region.d.ts.map