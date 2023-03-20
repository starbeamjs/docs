<script setup lang="ts">
import {
  SandpackProvider,
  type SandpackFiles,
  type SandpackInternalOptions,
  type SandpackSetup,
} from "sandpack-vue3";
import { useData } from "vitepress";
import { computed, type Ref } from "vue";

import type { StarbeamFrontmatter } from "../../config/site-data.js";
import {
  toSandpackDeps,
  toSandpackFiles,
  type DemoDeps,
  type DemoFiles,
} from "./demo.js";
import DemoBody from "./DemoBody.vue";

const { config, size = 160 } = defineProps<{
  size?: number | undefined;
  config: {
    files: DemoFiles;
    dependencies: DemoDeps;
    jsx?: string;
    main?: string;
    activeFile?: string;
  };
}>();

const info = useData();
const data = useData().frontmatter as Ref<StarbeamFrontmatter>;

const deps = computed(() => {
  const versions = data.value["@starbeam:versions"];
  const deps = toSandpackDeps(config.dependencies) ?? {};

  return Object.fromEntries(
    Object.entries(deps).map(([dep, version]) => {
      const foundVersion = versions[dep];

      if (foundVersion) {
        return [dep, version === "package.json" ? foundVersion : version];
      } else {
        throw Error(
          `Dependency ${dep} (used in ${
            info.page.value.relativePath
          }) not found in versions: ${JSON.stringify(versions)}`
        );
      }
    })
  );
});

const BABEL_JSX = config.jsx
  ? [
      "transform-react-jsx",
      {
        runtime: "automatic",
        importSource: config.jsx,
      },
    ]
  : ["transform-react-jsx"];

const TSCONFIG_JSX = config.jsx
  ? {
      jsx: "preserve",
      jsxImportSource: config.jsx,
    }
  : { jsx: "preserve" };

const files: SandpackFiles = {
  ...toSandpackFiles(config.files),
  ".babelrc": {
    hidden: true,
    code: JSON.stringify(
      {
        presets: ["env"],
        plugins: ["transform-runtime", BABEL_JSX],
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
      main: config.main ?? "/src/index.ts",
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
        rootDir: "src",
        moduleResolution: "node16",
      },
    },
    null,
    2
  ),
};

const options: SandpackInternalOptions = {
  recompileMode: "delayed",
  activeFile: config.activeFile ?? mainFile(),
};

const registryURL = import.meta.env.STARBEAM_REGISTRY_URL;

function mainFile() {
  return config.main ?? "/src/index.ts";
}

const customSetup = computed((): SandpackSetup => {
  if (registryURL) {
    return {
      dependencies: deps.value,
      entry: mainFile(),
      npmRegistries: [
        {
          enabledScopes: ["@starbeam"],
          registryUrl: registryURL,
          limitToScopes: true,
        },
      ],
    };
  } else {
    return {
      dependencies: deps.value,
    };
  }
});
</script>

<template>
  <SandpackProvider
    :files="files"
    :options="options"
    :custom-setup="customSetup"
    template="vanilla-ts"
  >
    <DemoBody />
  </SandpackProvider>
</template>
