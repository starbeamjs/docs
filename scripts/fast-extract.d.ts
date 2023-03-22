declare module "fast-extract" {
  import type { ReadStream } from "node:fs";

  type ExtractType =
    | "tar"
    | "tar.bz2"
    | "tar.gz"
    | "tar.xz"
    | "tgz"
    | "zip";

  export default function extract(
    from: string | ReadStream,
    to: string,
    options?: {
      strip?: number;
      type: ExtractType;
      force?: boolean;
    }
  ): Promise<void>;
}
