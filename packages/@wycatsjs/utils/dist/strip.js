import { parsed } from "@jsergo/tagged-templates";
export const strip = parsed((lines)=>{
    const minIndent = lines.minIndent();
    return lines.dedent(minIndent).display();
});


//# sourceMappingURL=strip.js.map