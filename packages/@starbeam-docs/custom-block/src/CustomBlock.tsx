import { defineComponent, type Prop, type PropType } from "vue";
import {
  customBlock,
  north,
  south,
  east,
  west,
} from "./CustomBlock.css.js";

export interface Props {
  readonly color?: string;
  readonly border?: Border;
}

type BorderPosition =
  | `${"n" | "s" | "ns" | ""}${"e" | "w" | "ew" | ""}`
  | "-";

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

  console.log({ position, MAPPING });

  for (const [input, className] of Object.entries(MAPPING)) {
    if (position.includes(input)) {
      classes.push(className);
    }
  }

  console.log({ position, classes });

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

function string(): string {
  return "string";
}

export default defineComponent({
  props: {
    border: prop<Border, string>(string),
    color: prop(String),
    style: prop<Record<string, unknown>, object>(Object),
  },
  setup: (props, { slots }) => {
    console.log({ ...props });
    return () => (
      <div
        class={[
          customBlock,
          "content-block",
          ...computeBorder(props.border ?? ("nsew" as Border)),
        ]}
        style={{
          "--sbdoc-local-border-color": props.color,
          "--sbdoc-local-fg": props.color,
          ...props.style,
        }}
      >
        {slots["default"]?.()}
      </div>
    );
  },
});
