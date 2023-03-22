// #region render
import { Formula, type Reactive } from "@starbeam/universal";
import MarkdownIt from "markdown-it";

export function renderMarkdown(
  text: Reactive<string>,
  options: { linkify: Reactive<boolean> }
) {
  return MarkdownIt({
    linkify: options.linkify.current,
  }).render(text.current);
}
// #endregion

{
  // #region cached
  function renderMarkdown(
    text: Reactive<string>,
    options: { linkify: Reactive<boolean> }
  ) {
    return Formula(() =>
      MarkdownIt({
        linkify: options.linkify.current,
      }).render(text.current)
    );
  }
  // #endregion
}
