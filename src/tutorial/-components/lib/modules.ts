const imports = import.meta.glob("@/tutorial/code/*/*.ts");

export const modules = Object.fromEntries(
  Object.entries(imports).map(([path, module]) => [
    normalize(path),
    module,
  ])
);

function normalize(path: string) {
  return path
    .replace(/^\/tutorial\/code\//, "")
    .replace(/\/config.ts$/, "");
}
