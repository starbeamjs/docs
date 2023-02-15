globalThis.localStorage =
  globalThis.localStorage ?? ({} as Storage);

export const BUCKET_URL =
  "https://prod-packager-packages.codesandbox.io/v1/typings";
export const TYPES_REGISTRY =
  "https://unpkg.com/types-registry@latest/index.json";

export interface DependencyFile {
  readonly module: {
    readonly code: string;
  };
}

export type DependencyFiles = Record<string, DependencyFile>;

class EsmShTypes {
  static default() {
    return new EsmShTypes("https://esm.sh");
  }

  readonly #root: string;

  constructor(root: string) {
    this.#root = root;
  }

  async types(pkg: string, version = "latest") {
    console.log("fetching", `${this.#root}/${pkg}@${version}`);
    const response = await fetch(
      `${this.#root}/${pkg}@${version}`,
      {
        method: "HEAD",
      }
    );

    const ts = response.headers.get("x-typescript-types");

    if (ts) {
      console.log("found", `${pkg}@${version}`, ts);
    } else {
      console.warn("not found", `${pkg}@${version}`);
    }
  }
}

const TYPES = EsmShTypes.default();

/**
 * Fetch dependencies types from CodeSandbox CDN
 */
export async function fetchDependencyTyping({
  name,
  version,
}: {
  name: string;
  version: string;
}): Promise<DependencyFiles> {
  try {
    const url = `${BUCKET_URL}/${name}/${version}.json`;
    const { files } = await fetch(url).then((data) =>
      data.json()
    );

    return files;
  } catch {
    console.warn("error fetching dep", {
      name,
      version,
      url: `${BUCKET_URL}/${name}/${version}.json`,
    });
    return {};
  }
}
