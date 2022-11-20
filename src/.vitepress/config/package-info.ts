import { exec as rawExec } from "node:child_process";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const exec = promisify(rawExec);

const __dirname = dirname(fileURLToPath(import.meta.url));

const ROOT = await getWorkspaceRoot({ cwd: __dirname });

export interface Deps {
  name: string;
  version: string;
  path: string;
  private: boolean;
  dependencies?: Record<string, Dependency>;
  devDependencies?: Record<string, Dependency>;
}

export interface Dependency {
  from: string;
  version: string;
  resolved: string;
}

async function dep(filter: string, { cwd }: { cwd: string }) {
  // -DP ensures that we get both dev and prod dependencies regardless of the value of NODE_ENV
  const { stdout } = await exec(`pnpm list -DP --json ${filter}`, {
    cwd,
  });

  const deps: Deps[] = JSON.parse(String(stdout));

  return deps;
}

async function getWorkspaceRoot({ cwd }: { cwd: string }) {
  const [root] = (await dep("--depth=-1", { cwd })) as [Deps];

  return root.path;
}

export async function getStarbeamVersions(): Promise<
  Record<string, Dependency>
> {
  const [deps] = await dep(`@starbeam/*`, { cwd: ROOT });

  return {
    ...deps.dependencies,
    ...deps.devDependencies,
  };
}
