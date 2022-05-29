type AttributifyAttributes =
  import("@unocss/preset-attributify").AttributifyAttributes;

import "@vue/runtime-core";

declare module "@vue/runtime-core" {
  interface ComponentCustomProps extends AttributifyAttributes {}
}

declare module "react" {
  /**
   * @source {https://uno.antfu.me/?s=pb}
   */

  /**
   * @source {https://uno.antfu.me/?s=op}
   */
  type OpacityLevels =
    | "-0"
    | "-1"
    | "-2"
    | "-3"
    | "-4"
    | "-5"
    | "-6"
    | "-7"
    | "-8"
    | "-9";

  type Positions = "center";
  type TextSizes = "3em" | "4em";

  type PaddingAttrs = `p${Positions}`;
  type TextAttrs = `text${TextSizes}` | `text${Positions}`;

  type BooleanAttrs<N extends string> = Partial<Record<N, boolean>>;

  type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

  type ShorthandBooleanAttrs =
    | PaddingAttrs
    | `text${"Center" | "Lg" | "3em" | "4em"}`
    | `${
        | "minW"
        | "maxW"
        | "minH"
        | "maxH"
        | "w"
        | "h"}${Capitalize<string>}${string}`
    | `p${"t" | "b" | ""}${Digit}${Digit | ""}`
    | `op-${Digit}`
    | `op-${Digit}${Digit}`
    | `op${Digit}`
    | `op${Digit}${Digit}`
    | `${"font" | "fw"}${
        | Digit
        | "Black"
        | "Bold"
        | "Extrabold"
        | "Extralight"
        | "Medium"
        | "Normal"
        | "Semibold"
        | "Thin"
        | "Light"
        | `-${Digit}00`}`
    | `${"fontLeading" | "leading" | "fontLh" | "lh"}${
        | `-${Digit}`
        | "Loose"
        | "None"
        | "Normal"
        | "Relaxed"
        | "Snug"
        | "Tight"}`
    | `flex${
        | "Col"
        | "ColReverse"
        | "Inline"
        | "None"
        | "Nowrap"
        | "Row"
        | "RowReverse"
        | "Wrap"
        | "WrapReverse"}`
    | "inlineFlex"
    | `m${OptionalDash<"t" | "r" | "b" | "l" | "s" | "e"> | ""}${
        | "a"
        | `${Digit}${Digit | ""}`}`
    | `gap${Digit}${Digit | ""}`;

  type OptionalDash<A extends string> = A | UtilityAttr<A>;

  type UtilityAttr<A extends string> = A extends `${infer F}${infer R}`
    ? `${Capitalize<F>}${R}`
    : A;

  interface AnchorHTMLAttributes<T> extends HTMLAttributes<T> {
    class?: string;
  }

  // type UtilityBoolAttrs = `flexCol`;
  type Reactify<T extends string, SoFar extends string = ``> = `` extends T
    ? SoFar
    : T extends `${infer S}-${infer R}`
    ? Reactify<R, `${SoFar}${OptionalDash<S>}`>
    : `${SoFar}${OptionalDash<T>}`;

  type UtilityBoolAttrs = Reactify<
    | `flex-${"col" | "row" | "wrap"}`
    | `text-${Digit}em`
    | `text-lg`
    | `op-${Digit}${Digit | ""}`
    | `text-center`
    | `${"min-" | "max-" | ""}${"w" | "h"}-${`${Digit}${string}` | "screen"}`
    | `${"m" | "p"}${"t" | "r" | "b" | "l" | "s" | "e" | ""}-${
        | "a"
        | `${Digit}${string | ""}`
        | ""}`
    | `font-${Digit}${"00" | ""}`
    | `font-${
        | "black"
        | "bold"
        | "extrabold"
        | "extralight"
        | "medium"
        | "normal"
        | "semibold"
        | "thin"
        | "light"}`
  >;

  interface HTMLAttributes<T>
    extends AttributifyAttributes,
      BooleanAttrs<
        UtilityBoolAttrs | `sm:${UtilityBoolAttrs}` | `md:${UtilityBoolAttrs}`
      > {}

  interface ImgHTMLAttributes<T> {
    crossorigin?: string;
  }

  interface HTMLAttributes<T> {
    class?: string;

    itemsCenter?: true;
    leading7?: true;
    trackingWide?: true;

    "children:my0"?: true;

    gap4?: true;
  }
}

export {};
