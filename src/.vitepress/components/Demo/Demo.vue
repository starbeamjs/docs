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
import { toSandpackDeps, toSandpackFiles, type DemoDeps, type DemoFiles } from "./demo.js";
import DemoBody from "./DemoBody.vue";

const { config } = defineProps<{
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
  <div class="demo">
    <SandpackProvider
      :files="files"
      :options="options"
      :custom-setup="customSetup"
      template="vanilla-ts"
    >
      <DemoBody />
    </SandpackProvider>
  </div>
</template>

<style scoped lang="postcss">
div.demo {
  display: grid;
  margin-block-start: 1rem;
  margin-block-end: 1rem;
  padding: 0;
  border: none;

  & + h2 {
    border-block-start: 1rem;
    margin-block-start: 0;
  }

  :deep(div.sp-wrapper) {
    margin-block-start: 0.5rem;
  }

  :deep(button.clear span.icon) {
    font-family: var(--icons);
  }

  :deep(div.sp-layout) {
    border: none;
    background: none;
  }

  :deep(div.sp-stack) {
    /* height: max-content; */

    div.sp-tabs {
      border: none;
    }

    div.sp-preview-container {
      border-radius: var(--sp-border-radius);
      border-color: var(--vp-badge-info-border);
      border-width: 1px;
      border-style: solid;
      background: var(--vp-badge-info-bg);

      color: var(--theme-color);
    }
  }

  :deep(button.toggle-button) {
    display: grid;
    contain: layout;
    align-content: center;
    background-color: var(--sp-colors-surface2);
    color: var(--sp-colors-clickable);
    padding-inline: 0.5rem;
    padding-block-end: 0.15rem;
    border-radius: 1rem;

    &:hover {
      background-color: var(--sp-colors-surface3);
      color: var(--sp-colors-hover);
    }

    &:active {
      color: var(--sp-colors-clickable);
    }

    > span.count {
      display: none;
    }

    &:not([data-count="0"]) {
      padding-inline-end: 0.75rem;

      > span.count {
        display: grid;
        font-size: 0.75em;
        width: 2em;
        height: 2em;
        place-content: center;
        color: red;
        position: absolute;
        right: 0;
        top: -0.5em;
        background-color: var(--sp-colors-clickable);
        color: var(--sp-colors-surface3);

        border-radius: 1000px;
      }
    }
  }
}
</style>
