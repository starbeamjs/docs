import "@mdit-vue/plugin-sfc";
import Snippet from "docs-snippet";
import { existsSync, readFileSync } from "node:fs";
import stripAnsi from "strip-ansi";
import { RenderLanguageRegion } from "./snippets/language-region.js";
import { MDState } from "./utils.js";
export function snippetPlugin(md, srcDir) {
    const parser = (state, startLine, _endLine, silent)=>{
        const mdState = new MDState(md, state);
        const line = mdState.line(startLine);
        if (line.isCodeBlock) {
            return false;
        }
        // The syntax is `!(./-snippets/cell.ts#cell)
        if (line.startsWith("!(")) {
            const snippet = line.string();
            // use named captures
            const match = snippet.match(RegExp("^!\\((?:(?<lang>[a-z-]+):)?(?<file>(.*?))(?:#(?<region>.*))?\\)$"));
            if (match) {
                const { region , file , lang  } = match.groups;
                mdState.consumeLine();
                pushSnippetToken(mdState, mdState.env.resolve(file), region, lang);
                return true;
            }
        }
        if (line.startsWith("```snippet")) {
            var _fenceline_match, _line_next, _snippet_regions;
            const fenceline = line.string();
            let rawPath = (_fenceline_match = fenceline.match(/```snippet\s+\{(.*)\}/)) === null || _fenceline_match === void 0 ? void 0 : _fenceline_match[1];
            if (silent) {
                return true;
            }
            const fenceContent = (_line_next = line.next) === null || _line_next === void 0 ? void 0 : _line_next.until((line)=>{
                var _line_slice;
                return ((_line_slice = line.slice()) === null || _line_slice === void 0 ? void 0 : _line_slice.trim()) === "```";
            });
            if (!fenceContent) {
                return false;
            }
            const token = state.push("html_block", "", 0);
            if (!(rawPath === null || rawPath === void 0 ? void 0 : rawPath.startsWith("#"))) {
                token.content = error(`Invalid region attribute "${rawPath}"`);
                return true;
            }
            let regionName = rawPath.slice(1);
            const filename = mdState.env.resolve(fenceContent.trim());
            if (!existsSync(filename)) {
                token.content = mdState.error(`File "${filename}" does not exist`);
                return true;
            }
            let content = readFileSync(filename, "utf8");
            if (!regionName) {
                content = `// #region all\n${content}\n// #endregion\n`;
                regionName = "all";
            }
            let snippet;
            try {
                snippet = Snippet(content);
            } catch (e) {
                var _e_stack;
                token.content = error(`Invalid source file: ${codeForError((_e_stack = e.stack) !== null && _e_stack !== void 0 ? _e_stack : "missing stack trace")}\n\nCode:\n\n${codeForError(content)}`);
                return true;
            }
            const region = (_snippet_regions = snippet.regions) === null || _snippet_regions === void 0 ? void 0 : _snippet_regions.get(regionName);
            if (region === undefined) {
                token.content = error(`Invalid region name: ${regionName}\n\n${codeForError(fenceContent)}`);
                return true;
            }
            token.content = highlightRegion({
                state: mdState,
                filename,
                region,
                complete: snippet,
                lang: undefined
            });
            return true;
        }
        return false;
    };
    md.block.ruler.before("fence", "snippet", parser);
}
function pushSnippetToken(state, filename, regionName, lang) {
    const token = state.open();
    if (!existsSync(filename)) {
        token.content = state.error(`File "${filename}" does not exist`);
        return true;
    }
    const content = readFileSync(filename, "utf8");
    let snippet;
    try {
        snippet = Snippet(content);
    } catch (e) {
        var _e_stack;
        token.content = error(`Invalid source file: ${codeForError((_e_stack = e.stack) !== null && _e_stack !== void 0 ? _e_stack : "missing stack trace")}\n\nCode:\n\n${codeForError(content)}`);
        return true;
    }
    if (regionName === null || regionName === void 0 ? void 0 : regionName.trim()) {
        var _snippet_regions;
        const region = (_snippet_regions = snippet.regions) === null || _snippet_regions === void 0 ? void 0 : _snippet_regions.get(regionName);
        if (region === undefined) {
            token.content = error(`Invalid region name: ${regionName}\n\n${codeForError(filename)}`);
            return true;
        }
        token.content = highlightRegion({
            state,
            filename,
            region,
            complete: snippet,
            lang
        });
    } else {
        token.content = highlight(state, filename, snippet);
    }
    return token;
}
function highlightRegion({ state , filename , region , complete , lang  }) {
    if (lang) {
        if (lang !== "js" && lang !== "ts") {
            return error(`Invalid language "${lang}" (must be one of ts or js)\n\n${codeForError(region.js.code)}`);
        }
        const fenced = RenderLanguageRegion.create({
            filename,
            region,
            parsed: complete,
            kind: lang,
            env: state.env
        }).highlight(state.highlight);
        return `<section class="code-block language-${lang}">${fenced}</section>`;
    }
    const tsFenced = RenderLanguageRegion.create({
        filename,
        region,
        parsed: complete,
        kind: "ts",
        env: state.env
    }).highlight(state.highlight);
    if (region.ts.code === region.js.code) {
        return `<section class="both-lang code-block language-ts">${tsFenced}</section>`;
    }
    const jsFenced = RenderLanguageRegion.create({
        filename,
        region,
        parsed: complete,
        kind: "js",
        env: state.env
    }).highlight(state.highlight);
    return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}
function highlight(state, filename, region) {
    const tsFenced = highlightLang(state, {
        filename,
        lang: "ts",
        code: region.ts.code,
        highlights: [],
        prefix: ""
    });
    if (region.ts.code === region.js.code) {
        return `<section class="both-lang code-block language-ts">${tsFenced}</section>`;
    }
    const jsFenced = highlightLang(state, {
        filename,
        lang: "js",
        code: region.js.code,
        highlights: [],
        prefix: ""
    });
    return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}
function highlightLang(state, { code , lang , filename , highlights , prefix , postfix  }) {
    var _state_highlight;
    const attr = highlights && highlights.length > 0 ? `{${highlights.map((h)=>h.lines).join(",")}}` : "";
    const output = [];
    if (prefix) {
        output.push(prefix, "// ---cut---");
    }
    output.push(code);
    if (postfix) {
        output.push("// ---cut-after---", postfix);
    }
    const source = output.join("\n").trimEnd();
    const highlighted = (_state_highlight = state.highlight) === null || _state_highlight === void 0 ? void 0 : _state_highlight.call(state, source, `tsx twoslash`, `filename="${encodeURIComponent(filename)}" lang=${lang} ${attr}`);
    return `<pre><code class="language-ts">${highlighted}</code></pre>`;
}
function error(message) {
    return `<div class="language-error ext-error"><pre class="ext-error"><code>${message}</code></pre></div>`;
}
function normalize(data) {
    // escape < and >
    return breakable(data).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function breakable(data) {
    // add a wbr around `/`
    return data.replace(/\//g, "<wbr>/<wbr>");
}
function codeForError(code) {
    // escape the code
    return stripAnsi(code).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}


//# sourceMappingURL=markdown-it.js.map