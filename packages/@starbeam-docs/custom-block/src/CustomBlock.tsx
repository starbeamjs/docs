import {
  defineComponent,
  type Prop,
  type PropType,
  type StyleValue,
} from "vue";
import { customBlock } from "./CustomBlock.css.js";

export interface Props {
  readonly color?: string;
  readonly border?: Border;
}

type BorderPosition =
  | `${"n" | "s" | "ns" | ""}${"e" | "w" | "ew" | ""}`
  | "-";

const north = "north";
const south = "south";
const east = "east";
const west = "west";

type BorderClass =
  | typeof north
  | typeof south
  | typeof east
  | typeof west;

const MAPPING = {
  n: north,
  s: south,
  e: east,
  w: west,
} as const;

function computeBorder(position: BorderPosition): BorderClass[] {
  const classes: BorderClass[] = [];

  for (const [input, className] of Object.entries(MAPPING)) {
    if (position.includes(input)) {
      classes.push(className);
    }
  }

  return classes;
}

type Border = `${BorderPosition}`;

function prop<U extends T, T = U>(
  type: PropType<T>,
  options?: { default: U }
): Prop<U> {
  if (options && "default" in options) {
    return {
      type,
      default: options?.default,
    } as Prop<U>;
  } else {
    return {
      type,
    } as Prop<U>;
  }
}

export default defineComponent({
  props: {
    kind: prop(String),
    border: prop<Border, string>(String),
    color: prop(String),
    style: prop<Extract<StyleValue, object>, object>(Object),
  },
  setup: (props, { slots }) => {
    return () => (
      <div
        class={[
          customBlock,
          `sbdoc-custom-block-${props.color}`,
          ...computeKindClass(props.kind),
          ...computeBorder(props.border ?? ("nsew" as Border)),
        ]}
        style={props.style ?? {}}
      >
        {slots["default"]?.()}
      </div>
    );
  },
});

function computeKindClass(kind: string | undefined): string[] {
  if (kind === "details") {
    return ["display-contents", "details"];
  } else if (kind) {
    return ["content-block", "callout-block", kind];
  } else {
    return ["content-block", "callout-block"];
  }
}
