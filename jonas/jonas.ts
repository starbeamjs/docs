import chalk from "chalk";
import toposort from "toposort";
import treeify, { type TreeObject } from "treeify";
import data from "./data.json" assert { type: "json" };

/** colors */
const DEPTHS = [
  chalk.red,
  chalk.yellow,
  chalk.green,
  chalk.cyan,
  chalk.blue,
  chalk.magenta,
];

const ROOT_COLOR = chalk.bgBlackBright.hex("#006666");

function depthColor(n: number) {
  return DEPTHS[n % DEPTHS.length] ?? chalk.gray;
}

class Entity {
  readonly combinations: Combination[] = [];
  constructor(readonly name: string) {}

  get isRoot(): boolean {
    return this.combinations.length === 0;
  }

  color(depth: number) {
    if (this.isRoot) {
      return ROOT_COLOR(this.name);
    } else {
      return depthColor(depth)(this.name);
    }
  }

  #leveled(
    levels: Record<string, number> = {},
    level = 0
  ): Record<string, number> {
    levels[this.name] = level;

    for (const combination of this.combinations) {
      combination.a.#leveled(levels, level + 1);
      combination.b.#leveled(levels, level + 1);
    }

    return levels;
  }

  sort(): Entity[] {
    const nodes: Set<Entity> = new Set();
    const edges: Map<Entity, Entity> = new Map();

    this.#addToGraph(nodes, edges);

    // console.log({ nodes, edges });
    return toposort.array([...nodes], [...edges]).reverse();
  }

  howSteps2(): treeify.TreeObject {
    const entities = this.sort();
    const levels = this.#leveled();

    const tree: TreeObject = {};

    for (const entity of entities) {
      const level = levels[entity.name] ?? 0;

      if (entity.isRoot) {
        continue;
      } else {
        for (const combination of entity.combinations) {
          const [name, value] = combination.howStep(level);

          tree[name] = value;
        }
      }
    }

    return tree;
  }

  #addToGraph(
    nodes: Set<Entity>,
    edges: Map<Entity, Entity>
  ): void {
    nodes.add(this);

    for (const combination of this.combinations) {
      combination.a.#addToGraph(nodes, edges);
      edges.set(this, combination.a);
      combination.b.#addToGraph(nodes, edges);
      edges.set(this, combination.b);
    }
  }

  howSteps(
    children: FormattedStep[] = [],
    depth = 0,
    seen: Set<string> = new Set()
  ): TreeObject {
    for (const combination of this.combinations) {
      children.push(combination.howStep(depth));

      if (!seen.has(combination.a.name)) {
        seen.add(combination.a.name);
        combination.a.howSteps(children, depth + 1, seen);
      }

      if (!seen.has(combination.b.name)) {
        seen.add(combination.b.name);
        combination.b.howSteps(children, depth + 1, seen);
      }
    }

    children.reverse();

    return Object.fromEntries(
      children.map(([name, value]) => [name, value])
    );
  }

  how(depth = 0): TreeObject {
    const children: Record<string, TreeObject> = {};

    for (const combination of this.combinations) {
      const aName = combination.a.color(depth);
      const bName = combination.b.color(depth);

      if (aName === bName) {
        children[`${aName} x 2`] = combination.a.how(depth + 1);
      } else {
        children[aName] = combination.a.how(depth + 1);
        children[bName] = combination.b.how(depth + 1);
      }
    }

    return children;
  }
}

type FormattedStep = [name: string, value: string];

class Combination {
  constructor(
    readonly a: Entity,
    readonly b: Entity,
    readonly to: Entity
  ) {
    if (a === undefined || b === undefined || to === undefined) {
      console.log({ a, b, to });
      throw new Error("Invalid combination");
    }
  }

  howStep(depth: number): FormattedStep {
    const to = this.to.color(depth);

    if (this.a.name === this.b.name) {
      return [to, `${this.a.color(depth + 1)} x 2`];
    } else {
      return [
        to,
        `${this.a.color(depth + 1)} + ${this.b.color(
          depth + 1
        )}`,
      ];
    }
  }

  display(): string {
    return `${this.to.name} = ${this.displayPlus()}`;
  }

  displayOther(name: string) {
    if (this.a.name === this.b.name && this.b.name === name) {
      return "x 2";
    } else if (this.a.name === name) {
      return this.b.name;
    } else if (this.b.name === name) {
      return this.a.name;
    } else {
      return `${this.a.name} + ${this.b.name}`;
    }
  }

  displayPlus() {
    if (this.a.name === this.b.name) {
      return `${this.a.name} x 2`;
    } else {
      return `${this.a.name} + ${this.b.name}`;
    }
  }
}

class Entities {
  readonly entities: Record<string, Entity> = {};
  readonly combinations: Record<string, Combination[]> = {};

  get all(): Entity[] {
    return Object.values(this.entities);
  }

  add(name: string, options?: { a: string; b: string }) {
    const entity = this.#get(name);

    if (options) {
      const combination = new Combination(
        this.#get(options.a),
        this.#get(options.b),
        entity
      );
      entity.combinations.push(combination);
      this.#addCombination(combination);
    }
  }

  #addCombination(combination: Combination) {
    let aCombinations = this.combinations[combination.a.name];

    if (aCombinations === undefined) {
      this.combinations[combination.a.name] = aCombinations = [];
    }
    aCombinations.push(combination);

    let bCombinations = this.combinations[combination.b.name];

    if (bCombinations === undefined) {
      this.combinations[combination.b.name] = bCombinations = [];
    }
    bCombinations.push(combination);
  }

  #get(name: string) {
    let entity = this.entities[name];

    if (entity === undefined) {
      entity = new Entity(name);
      this.entities[name] = entity;
    }

    return entity;
  }

  printWith(entity: Entity) {
    console.group(
      `with ${chalk.bgYellow.whiteBright(entity.name)}`
    );
    const combinations = ENTITIES.combinations[entity.name];

    if (combinations) {
      const object: Record<string, string> = {};
      for (const combination of combinations) {
        object[chalk.hex("#FFA500")(combination.to.name)] =
          chalk.cyan(combination.displayOther(entity.name));
      }
      console.log(treeify.asTree(object, true, true));
    } else {
      console.log("No combinations found");
    }
    console.groupEnd();
  }

  how(name: string) {
    const entity = this.entities[name];

    if (entity === undefined) {
      console.log(
        chalk.red(
          `Surprisingly, no entity named ${name} was found`
        )
      );
      return;
    }

    console.log(treeify.asTree(entity.how(), false, true));

    if (entity.combinations.length === 0) {
      return null;
    } else {
      return entity.combinations[0];
    }
  }

  isRoot(name: string) {
    const entity = this.entities[name];

    return entity.combinations.length === 0;
  }

  printHowSteps(name: string | Entity) {
    const entity =
      typeof name === "string" ? this.entities[name] : name;

    if (entity === undefined) {
      return;
    }

    console.log(treeify.asTree(entity.howSteps2(), true, true));
    console.log(`${ROOT_COLOR("basic items")} look like this.`);
    console.log();
    console.log(
      `A ${ROOT_COLOR(
        "basic item"
      )} is always present and does not need to be crafted.`
    );
    console.log();
  }

  printHow(name: string | Entity) {
    const entity =
      typeof name === "string" ? this.entities[name] : name;

    if (entity === undefined) {
      return;
    }

    const object = {
      [entity.name]: entity.how(),
    };

    console.log(treeify.asTree(object, false, true));
  }
}

const ENTITIES = new Entities();

for (const item of data) {
  const { to, a, b } = normalize(item);

  if (to === undefined) {
    console.error("data import error", item);
    process.exit(1);
  }

  ENTITIES.add(to, a && b ? { a, b } : undefined);
}

function normalize(item: string) {
  const [to, from] = item.split("=").map((s) => s.trim());

  if (from) {
    const [a, b] = from.split("+").map((s) => s.trim());
    return { to, a, b };
  } else {
    return { to };
  }
}

import prompts from "prompts";

// exit on ctrl-c
process.on("SIGABRT", () => {
  process.exit(0);
});

const options = {
  onCancel: () => {
    console.log("^C");
    process.exit(0);
  },
};

while (true) {
  const answer = (await prompts(
    [
      {
        type: "autocomplete",
        name: "mode",
        message:
          "Do you want to learn how to make something or learn what to do with something?",
        choices: [
          {
            title: "Learn how to make something",
            value: "make-something",
          },
          {
            title: "Learn what to do with something",
            value: "do-something",
          },
          { title: "Exit", value: "exit" },
        ],
      },
    ],
    options
  )) as {
    mode: "make-something" | "do-something" | "exit";
  };

  const { mode } = answer;

  if (answer.mode === "exit") {
    break;
  }

  if (mode === "make-something") {
    const answer = await prompts(
      [
        {
          type: "autocomplete",
          name: "what",
          message: "What do you want to create?",
          choices: ENTITIES.all.map((entity) => ({
            title: entity.name,
            value: entity,
          })),
        },
        {
          type: "autocomplete",
          name: "format",
          message: "What format do you want to use?",
          choices: [
            {
              title: "List of Steps",
              value: "steps",
            },
            {
              title: "Tree",
              value: "tree",
            },
          ],
        },
      ],
      options
    );

    if (answer.format === "tree") {
      ENTITIES.printHow(answer.what);
    } else {
      ENTITIES.printHowSteps(answer.what);
    }
  } else if (mode === "do-something") {
    const answer = (await prompts(
      [
        {
          type: "autocomplete",
          name: "what",
          message: "What do you want to create?",
          choices: ENTITIES.all.map((entity) => ({
            title: entity.name,
            value: entity,
          })),
        },
      ],
      options
    )) as { what: Entity };
    ENTITIES.printWith(answer.what);
  }
}
