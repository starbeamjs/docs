type AttributifyAttributes =
  import("@unocss/preset-attributify").AttributifyAttributes;

import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  interface ComponentCustomProps extends AttributifyAttributes {}
}

declare module "react" {
  type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  type Alpha =
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "g"
    | "h"
    | "i"
    | "j"
    | "k"
    | "l"
    | "m"
    | "n"
    | "o"
    | "p"
    | "q"
    | "r"
    | "s"
    | "t"
    | "u"
    | "v"
    | "w"
    | "x"
    | "y"
    | "z";

  type OptionallyDashedProperty<A extends string> =
    A extends `${Digit}${string}` ? A | `-${A}` : A | DashProperty<A>;

  type DashedProperty<A extends string> = A extends `${Digit}${string}`
    ? A
    : DashProperty<A>;

  type DashProperty<A extends string> = A extends `${infer F}${infer R}`
    ? `${Capitalize<F>}${R}`
    : A;

  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    class?: string;
  }

  // type UtilityBoolAttrs = `flexCol`;
  type WithOptionalDash<
    T extends string,
    SoFar extends string = ``
  > = `` extends T
    ? SoFar
    : `` extends SoFar
    ? T extends `${infer S}-${infer R}`
      ? WithOptionalDash<R, S>
      : T
    : T extends `${infer S}-${infer R}`
    ? WithOptionalDash<R, `${SoFar}${OptionallyDashedProperty<S>}`>
    : `${SoFar}${OptionallyDashedProperty<T>}`;

  type WithMandatoryDash<
    T extends string,
    SoFar extends string = ``
  > = `` extends T
    ? SoFar
    : `` extends SoFar
    ? T extends `${infer S}-${infer R}`
      ? WithMandatoryDash<R, S>
      : T
    : T extends `${infer S}-${infer R}`
    ? WithMandatoryDash<R, `${SoFar}${DashedProperty<S>}`>
    : `${SoFar}${DashedProperty<T>}`;

  type WidthAttributes = {
    [P in `${
      | "min-w"
      | "min-h"
      | "w"
      | "h"}${Digit}${string}` as WithMandatoryDash<P>]?: boolean;
  };

  type Dimension = "t" | "r" | "b" | "l" | "s" | "e" | "x" | "y";

  type MarginPaddingAttributes = {
    [P in `${
      | "m"
      | "p"}${Dimension}-${Digit}${string}` as WithOptionalDash<P>]?: boolean;
  };

  type OpacityAttributes = {
    [P in `op-${Digit}${string}` as WithOptionalDash<P>]?: boolean;
  };

  type TextSize = "xl" | `${Digit}em`;

  type TextAttributes = {
    [P in
      | `text-${TextSize}`
      | `text-${Digit}${TextSize}` as WithMandatoryDash<P>]?: boolean;
  };

  type FlexAttrs = {
    [P in `flex${Uppercase<string>}${string}`]?: boolean;
  };

  type AriaAttrs = {
    [P in `aria${Uppercase<string>}${string}`]?: string;
  };

  type Attrs<K extends string, Type extends string | boolean = boolean> = {
    [P in K as WithOptionalDash<P>]?: Type;
  };

  interface AllAttrs
    extends AttributifyAttributes,
      WidthAttributes,
      TextAttributes,
      MarginPaddingAttributes,
      OpacityAttributes,
      FlexAttrs,
      Attrs<"rounded-full" | "text-center">,
      AriaAttrs {}

  type SpecializedAttrs = { [P in `md:${string}`]?: boolean | string };
  type AnyAttr = { [P in `${string}`]?: boolean | string };

  interface HTMLAttributes<T> extends AnyAttr {}

  interface ImgHTMLAttributes<T> {
    crossorigin?: string;
  }
}

export {};
