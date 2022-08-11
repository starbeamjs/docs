<script setup lang="ts">
import type { TokensBuilder } from "./tokens.js";

export type PunctuationChar =
  | "("
  | ")"
  | "["
  | "]"
  | "{"
  | "}"
  | ","
  | ";"
  | ":"
  | "."
  | "?"
  | " ";
export type Punctuation =
  | `${PunctuationChar}`
  | `${PunctuationChar}${PunctuationChar}`
  | `${PunctuationChar}${PunctuationChar}${PunctuationChar}`;
export type Shorthand = `${string}:${string}` | Punctuation;
export type TokenTuple = [kind: string, text: string, condition?: boolean];
export type Token =
  | Shorthand
  | [shorthand: Shorthand, condition: boolean]
  | Punctuation;

export interface ParsedToken {
  kind: string;
  text: string;
  condition?: boolean;
}

const PUNCT = /^[()\[\]{},;:.? ]+$/;

function normalize(token: Token): ParsedToken {
  if (typeof token === "string") {
    if (PUNCT.test(token)) {
      return { kind: "punct", text: token };
    } else {
      const [kind, text] = token.split(":");
      return { kind, text };
    }
  } else {
    return {
      ...normalize(token[0]),
      condition: token[1],
    };
  }
  // return text.replace(/\s+/g, ' ').trim();
}

defineProps<{ tokens: TokensBuilder }>();
</script>

<template>
  <div class="language-ts">
    <pre class="manual">
      <code>
        <template v-for="token in tokens.done()">
          <span
            v-if="token.condition === undefined || token.condition === true"
            :class="`starbeam-${token.kind}`"
          >{{ token.text }}</span>
        </template>
      </code>
    </pre>
  </div>
</template>
