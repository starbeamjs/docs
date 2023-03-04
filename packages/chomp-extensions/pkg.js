// @ts-check

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./chomp.d.ts" />

/** @typedef {{root: string}} PkgOptions */

Chomp.registerTemplate(
  "pkg",
  /**
   * @param {ChompTask<PkgOptions>} task
   * @returns {SugaryChompTask[]}
   */
  (task) => {
    if (task.engine || task.run)
      throw new Error('"engine", "run" not configurable for Replace template.');

    const { root } = task.templateOptions ?? {};

    if (!root) {
      throw new Error('"root" is required in the .d.ts template.');
    }

    return [
      {
        name: task.name,
        deps: [`${task.name}:dts`, `${task.name}:js`],
      },
      {
        name: `${task.name}:clean`,
        invalidation: "always",
        run: `rm -rf ${root}/dist`,
      },
      {
        name: `${task.name}:dts`,
        template: "dts",
        templateOptions: {
          root,
        },
      },
      {
        name: `${task.name}:js`,
        template: "swc",
        target: `${root}/dist/##.js`,
        dep: `${root}/src/##.ts`,
      },
    ];
  }
);
