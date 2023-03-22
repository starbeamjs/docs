import type { SfcBlock } from "@mdit-vue/plugin-sfc";
import { dirname, relative, resolve } from "node:path";

export interface VitepressEnvInfo {
  readonly path: string;
  readonly relativePath: string;
  readonly cleanUrls: boolean;
  readonly sfcBlocks: SfcBlock;
  readonly content: string;
  readonly frontmatter: Record<string, string>;
  readonly excerpt: string;
}

export class VitepressStateEnv {
  readonly #env: VitepressEnvInfo;

  constructor(env: VitepressEnvInfo) {
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
