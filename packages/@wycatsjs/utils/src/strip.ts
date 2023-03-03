import { Lines, parsed } from "@jsergo/tagged-templates";

export const strip = parsed((lines: Lines<string>): string => {
  const minIndent = lines.minIndent();
  return lines.dedent(minIndent).display();
});
