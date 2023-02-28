import { Lines, parsed } from "ergo-tagged-templates";

/**
 * Remove leading whitespace from a string.
 *
 * By default, this will remove literal whitespace at the beginning of each
 * line, but will *not* remove whitespace from interpolated strings.
 *
 * By default, if a line contained interpolated content, but the rendered line
 * is entirely whitespace, it will be removed.
 *
 * TODO:
 *
 * Support:
 * - Retaining pure-whitespace lines that had interpolated content.
 * - Removing leading whitespace from interpolated strings.
 * - Re-indenting interpolated strings.
 */
export const strip = parsed((lines: Lines<string>): string => {
  const minIndent = lines.minIndent();

  return lines.dedent(minIndent).display();
});
