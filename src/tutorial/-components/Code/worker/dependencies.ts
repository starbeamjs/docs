globalThis.localStorage =
  globalThis.localStorage ?? ({} as Storage);

const SERVICE_URL = "https://ata.codesandbox.io/api/v8";
const FALLBACK_SERVICE_URL = "https://typings.csb.dev/api/v8";
const BUCKET_URL =
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
    console.debug("fetching", `${this.#root}/${pkg}@${version}`);
    const response = await fetch(
      `${this.#root}/${pkg}@${version}`,
      {
        method: "HEAD",
      }
    );

    const ts = response.headers.get("x-typescript-types");

    if (ts) {
      console.debug("found", `${pkg}@${version}`, ts);
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
    return query(name, version);
  } catch {
    console.warn("error fetching dep", {
      name,
      version,
      url: `${BUCKET_URL}/${name}/${version}.json`,
    });
    return {};
  }
}

async function query(
  name: string,
  version: string
): Promise<DependencyFiles> {
  const dependencyQuery = encodeURIComponent(
    `${name}@${version}`
  );

  const url = `${BUCKET_URL}/${name}/${version}.json`;

  {
    const response = await requestPackager(url, 0);

    if (response.ok) {
      return response.value.files;
    }

    // otherwise, it hasn't been generated yet
  }

  {
    const response = await requestPackager(
      `${SERVICE_URL}/${dependencyQuery}.json`,
      3
    );

    if (response.ok) {
      return response.value.files;
    }
  }

  {
    const response = await requestPackager(
      `${FALLBACK_SERVICE_URL}/${dependencyQuery}.json`,
      3
    );

    if (response.ok) {
      return response.value.files;
    }

    throw Error(response.reason);
  }
}

async function requestPackager(
  url: string,
  retryCount = 0,
  method = "GET"
): Promise<Result<{ files: DependencyFiles }>> {
  let retries = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const manifest = await callApi(url, method); // eslint-disable-line no-await-in-loop

    if (manifest.ok) {
      return {
        ok: true,
        value: manifest.value as unknown as {
          files: DependencyFiles;
        },
      };
    }

    if (manifest.code === 403) {
      if (retries < retryCount) {
        retries++;
        await delay(1000 * 2);
        continue;
      }
    }

    return manifest;
  }
}

type Result<T> =
  | {
      readonly ok: true;
      readonly value: T;
    }
  | {
      readonly ok: false;
      readonly reason: string;
      readonly message: { error: string };
      readonly code: number;
    };

async function callApi<T>(
  url: string,
  method = "GET"
): Promise<Result<T>> {
  const response = await fetch(url, {
    method,
  });

  if (response.ok) {
    return {
      ok: true,
      value: await response.json(),
    };
  } else {
    return {
      ok: false,
      reason: response.statusText,
      message: await response.json(),
      code: response.status,
    };
  }
}

function delay(timeout = 1000) {
  return new Promise((resolve) => setTimeout(resolve, timeout));
}
