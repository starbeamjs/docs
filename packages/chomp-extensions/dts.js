// @ts-check

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./chomp.d.ts" />

{
  /** @typedef {{root: string}} TaskOptions */

  Chomp.registerTemplate(
    "dts",
    /**
     * @param {ChompTask<TaskOptions>} task
     * @returns {SugaryChompTask[]}
     */
    function (task) {
      if (task.engine || task.run)
        throw new Error('"engine", "run" not configurable for Replace template.');

      const { root } = task.templateOptions ?? {};

      if (!root) {
        throw new Error('"root" is required in the .d.ts template.');
      }

      return [
        {
          name: task.name,
          target: `${root}/dist/##.d.ts`,
          dep: `${root}/src/##.ts`,

          run: `tsc \${{DEP}} ${flags(root)}`,
        },
        {
          name: `${task.name}:clean`,
          invalidation: "always",
          run: `rm -f ${root}/dist/**/*.d.ts{,.map}`,
        },
      ];
    }
  );

  const tsconfig = {
    target: "esnext",
    module: "ESNext",
    declaration: true,
    emitDeclarationOnly: true,
    declarationMap: true,
    moduleResolution: "bundler",
    allowImportingTsExtensions: false,
    allowArbitraryExtensions: true,
    resolveJsonModule: true,
    verbatimModuleSyntax: true,
    moduleDetection: "force",
    forceConsistentCasingInFileNames: true,
    strict: true,
    noImplicitAny: true,
    noUncheckedIndexedAccess: true,
    noPropertyAccessFromIndexSignature: true,
    exactOptionalPropertyTypes: true,
    noImplicitOverride: true,
    noImplicitReturns: true,
    lib: ["ESNext", "DOM", "DOM.Iterable"],
    skipLibCheck: true,
  };

  /**
   * @param {string} root
   * @return {string}
   */
  function flags(root) {
    /** @const */

    return Object.entries({ ...tsconfig, outDir: `${root}/dist` })
      .flatMap((entry) => kv(entry))
      .join(" ");
  }

  /**
   * @param {[key: string, value: string | boolean | string[]]} entry
   * @returns {string[]}
   */
  function kv([key, value]) {
    if (Array.isArray(value)) {
      return [`--${key}`, value.join(",")];
    }
    if (typeof value === "boolean") {
      return value ? [`--${key}`] : [];
    }
    return [`--${key}`, value];
  }
}
