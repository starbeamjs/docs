export function color(
  h: string | number,
  s: string | number,
  l: "light" | "normal" | "dark"
): string {
  const sat = typeof s === "string" ? s : `${s}%`;

  return `hsl(${h}, ${sat}, var(--color-lightness-${l}))`;
}
