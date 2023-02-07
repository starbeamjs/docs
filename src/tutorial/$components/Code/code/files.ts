import { babelJSX, toSandpackFiles } from "./sandpack.js";
import type { ExampleConfig } from "./tree.js";

export function example({ files, jsx, main }: ExampleConfig) {
  return {
    ...toSandpackFiles(files),
    ".babelrc": {
      hidden: true,
      code: JSON.stringify(
        {
          presets: ["env"],
          plugins: ["transform-runtime", babelJSX(jsx)],
          parserOpts: {
            plugins: ["dynamicImport"],
          },
        },
        null,
        2
      ),
    },
    "package.json": JSON.stringify(
      {
        main: main ?? "/src/index.ts",
        type: "module",
        dependencies: deps.value,
        devDependencies: {
          typescript: "^4.0.0",
        },
      },
      null,
      2
    ),
    "tsconfig.json": JSON.stringify(
      {
        compilerOptions: {
          strict: true,
          module: "commonjs",
          target: "esnext",
          ...TSCONFIG_JSX,
          esModuleInterop: true,
          sourceMap: true,
          allowJs: true,
          lib: ["es6", "dom"],
          rootDir: "src",
          moduleResolution: "node16",
        },
      },
      null,
      2
    ),
  };
}
