import markdown from "markdown-it";

const MD = markdown({
  html: true,
  typographer: true,
});

export function md(text: string | undefined) {
  return text ? MD.render(text) : undefined;
}
