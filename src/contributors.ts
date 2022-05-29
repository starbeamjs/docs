import "@starbeam/docs/env";

import { contributors } from "./contributors.json" assert { type: "json" };

enum Team {
  Library = "Library",
}

export interface Contributor {
  name: string;
  avatar: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
  };
  team?: Team;
}

const contributorsAvatars: Record<string, string> = {};

const getAvatarUrl = (name: string) =>
  import.meta.hot
    ? `https://github.com/${name}.png`
    : `/user-avatars/${name}.png`;

export default Object.fromEntries(
  contributors.map(({ github }) => [github, getAvatarUrl(github)])
) as Record<keyof typeof contributors, string>;
