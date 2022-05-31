/// <reference path="./env.d.ts" />

import { contributors } from "./contributors.json";

enum Team {
  Library = "Library",
}

export interface Contributor {
  name: string;
  avatar: string;
  bio?: string;
  github?: string;
  social?: {
    twitter?: string;
  };
  team?: Team;
}

const contributorsAvatars: Record<string, string> = {};

const getAvatarUrl = (name: string) =>
  import.meta.hot
    ? `https://github.com/${name}.png`
    : `/user-avatars/${name}.png`;

export default Object.fromEntries(
  contributors.map((contributor) => [
    contributor.github,
    {
      ...contributor,
      avatar: getAvatarUrl(contributor.github),
    },
  ])
) as Record<keyof typeof contributors, Contributor & { avatar: string }>;
