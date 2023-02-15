import type { SfcBlock } from "@mdit-vue/plugin-sfc";
import MarkdownIt from "markdown-it";
import type StateBlock from "markdown-it/lib/rules_block/state_block.js";
import { dirname, relative, resolve } from "node:path";

export class MDState {
  readonly #state: StateBlock;
  readonly #md: MarkdownIt;

  constructor(md: MarkdownIt, state: StateBlock) {
    this.#state = state;
    this.#md = md;
  }

  line(lineno: number): LineState {
    return new LineState(this.#state, lineno);
  }

  consumeLine(): void {
    this.#state.line = this.#state.line + 1;
  }

  get highlight(): HighlightFn | null | undefined {
    return this.#md.options.highlight;
  }

  get md(): MarkdownIt {
    return this.#md;
  }

  get env(): StateEnv {
    return new StateEnv(this.#state.env);
  }

  open() {
    return this.#state.push("html_block", "", 0);
  }

  error(message: string) {
    return `<div class="language-error ext-error"><pre class="ext-error"><code>${message}</code></pre></div>`;
  }
}

export type HighlightFn = (
  str: string,
  lang: string,
  attrs: string
) => string;

interface StateEnvInfo {
  readonly path: string;
  readonly relativePath: string;
  readonly cleanUrls: boolean;
  readonly sfcBlocks: SfcBlock;
  readonly content: string;
  readonly frontmatter: Record<string, string>;
  readonly excerpt: string;
}

export class StateEnv {
  readonly #env: StateEnvInfo;

  constructor(env: StateEnvInfo) {
    this.#env = env;
  }

  get path() {
    return this.#env.relativePath;
  }

  resolve(relativeFile: string) {
    return resolve(dirname(this.#env.path), relativeFile);
  }

  get vitepressRoot() {
    return relative(this.#env.path, this.#env.relativePath);
  }

  get absolutePath() {
    return this.#env.path;
  }
}

export class LineState {
  #state: StateBlock;
  #startLine: number;

  constructor(state: StateBlock, startLine: number) {
    this.#state = state;
    this.#startLine = startLine;
  }

  get next(): LineState | undefined {
    if (this.#startLine < this.#state.lineMax) {
      return new LineState(this.#state, this.#startLine + 1);
    } else {
      return undefined;
    }
  }

  get position(): { pos: number; max: number } {
    return {
      pos: this.contentStart,
      max: this.end,
    };
  }

  get #src(): string {
    return this.#state.src;
  }

  consume(): LineState {
    this.#state.line = this.#startLine + 1;
    return new LineState(this.#state, this.#startLine + 1);
  }

  until(predicate: (line: LineState) => boolean): string {
    let line: LineState | undefined = this;
    let lines = [];

    while (line) {
      const next: LineState | undefined = line.next;

      if (!next) {
        this.#state.line = line.#startLine + 1;
        break;
      }

      lines.push(line.string({ ws: true }));
      line = next;

      if (predicate(next)) {
        this.#state.line = next.#startLine + 1;
        break;
      }
    }

    return lines.join("\n");
  }

  string({ ws = false }: { ws?: boolean } = {}): string {
    return this.#src.slice(
      ws ? this.start : this.contentStart,
      this.end
    );
  }

  startsWith(chars: string): boolean {
    return this.slice(chars.length) === chars;
  }

  slice(
    n: number = this.end - this.contentStart
  ): string | undefined {
    if (n > this.end - this.contentStart) {
      return undefined;
    }

    const pos = this.contentStart;
    let chars = "";

    for (let i = 0; i < n; ++i) {
      chars += this.#src.charAt(pos + i);
    }

    return chars;
  }

  /**
   * The total indent of the line, including the required indent.
   */
  get #totalIndent(): number {
    return this.#state.sCount[this.#startLine] ?? 0;
  }

  /**
   * The required indent of the line.
   */
  get #requiredIndent(): number {
    return this.#state.blkIndent;
  }

  /**
   * The indent of the line, excluding the required indent.
   */
  get indent(): number {
    return this.#totalIndent - this.#requiredIndent;
  }

  /**
   * if it's indented more than 3 spaces, it's a code block
   */
  get isCodeBlock(): boolean {
    return this.indent >= 4;
  }

  get start(): number {
    return this.#state.bMarks[this.#startLine] ?? 0;
  }

  get wsChars(): number {
    return this.#state.tShift[this.#startLine] ?? 0;
  }

  get contentStart(): number {
    return this.start + this.wsChars;
  }

  get end(): number {
    return this.#state.eMarks[this.#startLine] ?? 0;
  }
}

export function position(
  state: StateBlock,
  startLine: number
): { pos: number; max: number } {
  const pos =
    (state.bMarks[startLine] ?? 0) +
    (state.tShift[startLine] ?? 0);
  const max = state.eMarks[startLine] ?? 0;

  return { pos, max };
}
