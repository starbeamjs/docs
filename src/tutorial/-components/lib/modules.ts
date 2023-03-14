const imports = import.meta.glob("../../code/*/*.ts");

export const modules = Object.fromEntries(
  Object.entries(imports).map(([path, module]) => [
    normalize(path),
    module,
  ])
);

function normalize(path: string) {
  return path
    .replace("../../code/", "")
    .replace(/\/config.ts$/, "");
}
