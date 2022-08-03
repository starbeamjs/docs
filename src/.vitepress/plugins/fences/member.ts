import type { ExplainedMember } from "jsdoc-api";
import Token from "markdown-it/lib/token.js";
import { RenderFence } from "./type";

export function MemberSignature(
  signature: ExplainedMember,
  source: string,
  token: Token,
  md: RenderFence
): string {
  // token.content = JSON.stringify(signature, null, 2);
  // return render();

  const namespace = signature.tags.find((t) => t.title === "for");

  const body =
    signature.properties
      .map(
        (p) =>
          `${namespace ? `${namespace.value}.` : ""}${source.slice(
            signature.meta.range[0],
            signature.meta.range[1]
          )}: ${md.typeName(p.type)}`
      )
      .join("\n") + "\n";

  token.content = body;

  const rendered = md.renderToken();
  const dl = ["<dl>"];

  for (const property of signature.properties) {
    dl.push(md.paramEntry(property));
  }

  dl.push("</dl>");

  return rendered + "\n\n" + dl.join("\n") + "\n";
}
