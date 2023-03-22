// @ts-check

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./chomp.d.ts" />

/** @typedef {{root: string}} PkgOptions */

const DISPLAY = "status-only";

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
        serial: true,
        deps: [...task.deps, `${task.name}:pkg`],
      },
      {
        name: `${task.name}:pkg`,
        deps: [`${task.name}:js`, `${task.name}:jsx`],
        serial: task.serial,
      },
      {
        name: `${task.name}:clean`,
        invalidation: "always",
        run: `rm -rf ${root}/dist`,
      },
      // {
      //   name: `${task.name}:dts`,
      //   display: DISPLAY,
      //   template: "dts",
      //   templateOptions: {
      //     root,
      //   },
      // },
      {
        name: `${task.name}:js`,
        template: "swc",
        display: DISPLAY,
        target: `${root}/dist/##.js`,
        dep: `${root}/src/##.ts`,
      },
      {
        name: `${task.name}:jsx`,
        template: "swc",
        templateOptions: {
          configFile: "packages/.swcrc",
        },
        display: DISPLAY,
        target: `${root}/dist/##.js`,
        dep: `${root}/src/##.tsx`,
      },
    ];
  }
);
