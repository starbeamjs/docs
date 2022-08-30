import type StateBlock from "markdown-it/lib/rules_block/state_block.js";

export interface MarkdownEnv {
  path: string;
}

export interface VitepressStateBlock extends StateBlock {
  env: MarkdownEnv;
}
