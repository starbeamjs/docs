import type { ExplainedFunction } from "jsdoc-api";
import type Token from "markdown-it/lib/token.js";
import type { RenderFence } from "./type";

export function FunctionSignature(
  signature: ExplainedFunction,
  source: string,
  token: Token,
  md: RenderFence
): string {
  const returnType = signature.returns
    ? signature.returns[0].type.names[0]
    : "void";

  const body =
    source
      .slice(signature.meta.range[0], signature.meta.range[1])
      .replace(/\s*[{][}]\s*$/g, `: ${returnType};`)
      .trimEnd() + "\n";

  token.content = body;

  const rendered = md.renderToken();

  const dl = [`<dl class="signature">`];

  for (const param of signature.params) {
    dl.push(md.paramEntry(param));
  }

  if (signature.returns?.length > 0) {
    dl.push(`<dt>returns</dt>`);
    dl.push(`<dd><code>${md.typeName(signature.returns[0].type)}</code></dd>`);
  }

  dl.push(`</dl>`);

  return rendered + "\n\n" + dl.join("\n") + "\n";
}
