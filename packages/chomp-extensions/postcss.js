// @ts-check

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./chomp.d.ts" />

{
  /** @typedef {{root: string}} TaskOptions */

  Chomp.registerTemplate(
    "postcss",
    /**
     * @param {ChompTask<TaskOptions>} task
     * @returns {SugaryChompTask[]}
     */
    function (task) {
      if (task.engine || task.run)
        throw new Error('"engine", "run" not configurable for Replace template.');

      const { root } = task.templateOptions ?? {};

      if (!root) {
        throw new Error('"root" is required in the postcss template.');
      }

      return [
        {
          name: task.name,
          serial: true,
          deps: [`${task.name}:css`],
        },
        {
          name: `${task.name}:css`,
          targets: [`${root}/dist/##.css`],
          deps: [`${root}/src/##.postcss`],
          display: task.display,
          echo: true,

          run: `postcss \${{DEP}} --config packages -o \${{TARGET}}`,
        },
      ];
    }
  );
}
