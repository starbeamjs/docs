// @ts-check

// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="./chomp.d.ts" />

{
  /** @typedef {{root: string}} TaskOptions */
  Chomp.registerTemplate("inline-css", function (task) {
    if (task.engine || task.run)
      throw new Error('"engine", "run" not configurable for inline-css template.');

    const { from, to, throwUnmatched } = task.templateOptions;

    return [
      {
        name: task.name,
        targets: task.targets,
        deps: task.deps,
        engine: "node",
        run: `  import { readFileSync, writeFileSync } from 'fs';
    let source = readFileSync(process.env.DEP, 'utf8');
    console.info(${JSON.stringify(to)}, source)
    `,
      },
    ];
  });
}
