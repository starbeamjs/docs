import type { Code } from "./types.js";

export function injectCSS(shadowRoot: ShadowRoot, code: Code): void {
  if (
    code.css &&
    // style not injected
    Array.from(shadowRoot.childNodes).every(
      (element) => element.nodeName !== "STYLE"
    )
  ) {
    const style = h("style", { innerHTML: code.css });

    shadowRoot.appendChild(style);
  }
}

export function injectScript(
  id: string,
  shadowRoot: ShadowRoot,
  code: Code
): void {
  const scriptText = code.getScript();

  if (
    scriptText &&
    // style not injected
    Array.from(shadowRoot.childNodes).every(
      (element) => element.nodeName !== "SCRIPT"
    )
  ) {
    const script = document.createElement("script");

    script.appendChild(
      document.createTextNode(
        // here we are fixing `document` variable back to shadowDOM
        `{const document=window.document.querySelector('#${id} .code-demo-container').shadowRoot;\n${scriptText}}`
      )
    );
    shadowRoot.appendChild(script);
  }
}

export function h(
  tag: string,
  attrs: Record<string, string>,
  children?: HTMLElement[]
): HTMLElement {
  const node = document.createElement(tag);

  attrs &&
    Object.keys(attrs).forEach((key) => {
      if (!key.indexOf("data")) {
        const k = key.replace("data", "");

        node.dataset[k] = attrs[key];
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
      } else node[key] = attrs[key];
    });

  if (children)
    children.forEach((child) => {
      node.appendChild(child);
    });

  return node;
}
