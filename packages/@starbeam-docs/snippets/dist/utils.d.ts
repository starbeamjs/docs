import type { SfcBlock } from "@mdit-vue/plugin-sfc";
import MarkdownIt from "markdown-it";
import type StateBlock from "markdown-it/lib/rules_block/state_block.js";
export declare class MDState {
    #private;
    constructor(md: MarkdownIt, state: StateBlock);
    line(lineno: number): LineState;
    consumeLine(): void;
    get highlight(): HighlightFn | null | undefined;
    get md(): MarkdownIt;
    get env(): StateEnv;
    open(): import("markdown-it/lib/token");
    render(content: string): string;
    error(message: string): string;
}
export type HighlightFn = (str: string, lang: string, attrs: string) => string;
interface StateEnvInfo {
    readonly path: string;
    readonly relativePath: string;
    readonly cleanUrls: boolean;
    readonly sfcBlocks: SfcBlock;
    readonly content: string;
    readonly frontmatter: Record<string, string>;
    readonly excerpt: string;
}
export declare class StateEnv {
    #private;
    constructor(env: StateEnvInfo);
    get path(): string;
    resolve(relativeFile: string): string;
    get vitepressRoot(): string;
    get absolutePath(): string;
}
export declare class LineState {
    #private;
    constructor(state: StateBlock, startLine: number);
    get next(): LineState | undefined;
    get position(): {
        pos: number;
        max: number;
    };
    consume(): LineState;
    until(predicate: (line: LineState) => boolean): string;
    string({ ws }?: {
        ws?: boolean;
    }): string;
    startsWith(chars: string): boolean;
    slice(n?: number): string | undefined;
    /**
     * The indent of the line, excluding the required indent.
     */
    get indent(): number;
    /**
     * if it's indented more than 3 spaces, it's a code block
     */
    get isCodeBlock(): boolean;
    get start(): number;
    get wsChars(): number;
    get contentStart(): number;
    get end(): number;
}
export declare function position(state: StateBlock, startLine: number): {
    pos: number;
    max: number;
};
export {};
//# sourceMappingURL=utils.d.ts.map