import type { MarkdownSfcBlocks } from "@mdit-vue/plugin-sfc";
import type StateBlock from "markdown-it/lib/rules_block/state_block.js";

export interface MarkdownEnv {
  path: string;
  sfcBlocks?: MarkdownSfcBlocks;
}

export interface VitepressStateBlock extends StateBlock {
  env: MarkdownEnv;
}
