import { TsSystem, type CachedFsMap } from "./system.ts";

let system: TsSystem | null = null;

export async function createTsSystemIfNeeded(
  files: Record<string, { code: string }>,
  entry: string,
  fsMapCached: CachedFsMap
): Promise<TsSystem> {
  if (system) {
    return system;
  }

  return TsSystem.build(files, entry, fsMapCached);
}
