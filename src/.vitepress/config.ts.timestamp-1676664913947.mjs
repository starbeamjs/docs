// src/.vitepress/config.ts
import { defineConfig } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/vitepress@1.0.0-alpha.46_zytk3tupt4i5432ph5k7d2vxd4/node_modules/vitepress/dist/node/index.js";

// src/.vitepress/config/head.ts
var HEAD = [
  font("Readex Pro", { weight: "160..700" }),
  font("Baloo 2", { weight: "400..800" }),
  font("Sofia Sans", { weight: "100..900", italic: true }),
  font("Expletus Sans", { weight: "400..700" }),
  font("Martian Mono", { weight: "100..800" }),
  font("Overpass", { weight: "100..900" }),
  font("Comfortaa", { weight: "400..700" }),
  // https://microsoft.github.io/vscode-codicons/dist/codicon.ttf
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
    }
  ],
  [
    "link",
    {
      rel: "stylesheet",
      href: "https://microsoft.github.io/vscode-codicons/dist/codicon.css"
    }
  ]
];
function font(family, {
  weight,
  width,
  italic = false
}) {
  const axes = [];
  const values2 = [];
  if (italic && width) {
    axes.push("ital", "wght", "width");
    values2.push(`0,${weight},${width}`, `1,${weight},${width}`);
  } else if (italic) {
    axes.push("ital", "wght");
    values2.push(`0,${weight}`, `1,${weight}`);
  } else {
    axes.push("wght");
    values2.push(weight);
  }
  const safeFamily = family.replaceAll(" ", "+");
  const font2 = `family=${safeFamily}:${axes.join(
    ","
  )}@${values2.join(";")}`;
  return [
    "link",
    {
      rel: "stylesheet",
      href: `https://fonts.googleapis.com/css2?${font2}&display=block`
    }
  ];
}

// src/.vitepress/config/Nav.ts
var NAV = [
  {
    text: "Guides",
    link: "/guides/"
  },
  {
    text: "API",
    link: "/api/"
  },
  {
    text: "Frameworks",
    items: [
      {
        text: "React",
        link: "/frameworks/react/"
      },
      {
        text: "Preact",
        link: "/frameworks/preact/"
      }
    ]
  }
];
var SOCIAL = [
  { icon: "github", link: "https://github.com/starbeamjs/starbeam" }
];

// src/.vitepress/config/Sidebar.ts
var SIDEBAR = {
  "/guides/": [
    {
      items: [
        item("Getting Started", "/guides/index.md"),
        item("Universal Reactivity", "/guides/universal-reactivity.md"),
        item("Our Guiding Principle", "/guides/principle.md")
      ]
    },
    group("Reactive Fundamentals", [
      item("Cells", "/guides/fundamentals/cells.md"),
      item("Functions", "/guides/fundamentals/functions.md"),
      item("Validation", "/guides/fundamentals/validation.md"),
      item("Resources", "/guides/fundamentals/resources.md")
    ]),
    group("Universal Code", [
      item("Blueprints and Instances", "/guides/fundamentals/instances.md")
    ]),
    // group("Universal Building Blocks", [
    //   item("Introduction", "/guides/universal/index.md"),
    //   item("Reactives", "/guides/universal/reactive.md"),
    //   item("Resources", "/guides/universal/resources.md"),
    //   item("DOM Resources", "/guides/universal/dom-resources.md"),
    //   item("Modifiers", "/guides/universal/modifiers.md"),
    //   item("Services", "/guides/universal/services.md"),
    // ]),
    group(
      "Digging Deeper",
      [
        item("Reactive Collections", "/guides/collections.md"),
        item("Developer Tools", "/guides/devtools.md"),
        item("Equivalence", "/guides/advanced/equivalence.md")
      ],
      "expanded"
    ),
    group("Optimization", [item("Formulas", "/guides/optimization/formulas.md")])
  ],
  "/api/": [
    group("@starbeam/timeline", [
      item("LIFETIME", "/api/timeline/lifetime.md"),
      item("TIMELINE", "/api/timeline/timeline.md"),
      item("ReactiveProtocol", "/api/timeline/protocol.md")
    ]),
    group("@starbeam/universal", [
      item("Cell", "/api/core/cell.md"),
      item("Formula", "/api/core/formula.md"),
      item("Resource", "/api/core/resource.md"),
      item("ResourceList", "/api/core/resource-list.md")
    ])
  ],
  "/frameworks/react/": [
    group("React", [item("Getting Started", "/frameworks/react/index.md")]),
    group("Tutorial", [
      item("Introduction", "/frameworks/react/tutorial/index.md"),
      item("Getting Started", "/frameworks/react/tutorial/1-getting-started.md"),
      item("Computed Data", "/frameworks/react/tutorial/2-computed-data.md"),
      item("Reactive Builtins", "/frameworks/react/tutorial/3-reactive-builtins.md"),
      item("Reactive Arrays", "/frameworks/react/tutorial/4-reactive-arrays.md")
    ]),
    group("Tutorial Bonus", [
      item("More with Reactive Arrays", "/frameworks/react/tutorial/5-reactive-arrays-bonus.md")
    ])
  ],
  "/frameworks/preact/": [
    group("Preact", [item("Getting Started", "/frameworks/preact/index.md")])
  ],
  "/demos/": []
};
function item(text, link) {
  return {
    text,
    link
  };
}
function group(...args) {
  if (Array.isArray(args[0])) {
    const [items, collapse] = args;
    return {
      items,
      ...groupOptions(collapse)
    };
  } else {
    const [text, items, collapse] = args;
    return {
      text,
      items,
      ...groupOptions(collapse)
    };
  }
}
function groupOptions(collapse) {
  switch (collapse) {
    case "expanded":
    case "collapsed":
      return {
        collapsed: collapse === "collapsed"
      };
    case void 0:
      return {};
  }
}

// src/.vitepress/config/package-info.ts
import { exec as rawExec } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
var __vite_injected_original_import_meta_url = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config/package-info.ts";
var exec = promisify(rawExec);
var __dirname2 = dirname(fileURLToPath(__vite_injected_original_import_meta_url));
var ROOT = await getWorkspaceRoot({ cwd: __dirname2 });
async function dep(filter, { cwd }) {
  const { stdout } = await exec(`pnpm list -D --json ${filter}`, {
    cwd
  });
  const deps2 = JSON.parse(String(stdout));
  return deps2;
}
async function getWorkspaceRoot({ cwd }) {
  const [root2] = await dep("--depth=-1", { cwd });
  return root2.path;
}
async function getStarbeamVersions() {
  const [deps2] = await dep(``, { cwd: resolve(ROOT, "packages/twoslash") });
  return {
    ...deps2.dependencies,
    ...deps2.devDependencies
  };
}

// src/.vitepress/config/Site.ts
var SITE = {
  siteTitle: "Starbeam",
  lastUpdatedText: "Last Updated:",
  footer: {
    message: "Released under the MIT license",
    copyright: "Copyright \xA9 2022-present (Yehuda Katz and Starbeam contributors)"
  }
};
var CONFIG = {
  title: "Starbeam",
  description: "Simple and Fun Reactivity",
  titleTemplate: "Simple and Fun Reactivity",
  lastUpdated: true
};
var BUILD_HOOKS = {
  transformPageData: async (page) => {
    const versions = await getStarbeamVersions();
    page.frontmatter["@starbeam:versions"] = Object.fromEntries(
      Object.values(versions).map((dep2) => [dep2.from, dep2.version])
    );
    if ("STARBEAM_REGISTRY" in process.env) {
      page.frontmatter["@starbeam:registry"] = process.env.STARBEAM_REGISTRY;
    }
  }
};

// src/.vitepress/config.ts
import path3 from "node:path";
import { fileURLToPath as fileURLToPath6 } from "node:url";

// src/.vitepress/config/markdown.ts
import { tabsMarkdownPlugin } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/vitepress-plugin-tabs@0.2.0_mzi5piyyzevl7wmlywttuprm6m/node_modules/vitepress-plugin-tabs/dist/index.js";

// src/.vitepress/packages/vitepress-snippets/src/markdown-it.ts
import "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/@mdit-vue+plugin-sfc@0.12.0/node_modules/@mdit-vue/plugin-sfc/dist/index.mjs";
import Snippet from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/docs-snippet@1.0.4/node_modules/docs-snippet/dist/lib/index.mjs";
import { existsSync, readFileSync } from "fs";
import stripAnsi from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/strip-ansi@7.0.1/node_modules/strip-ansi/index.js";

// src/.vitepress/packages/vitepress-snippets/src/snippets/language-region.ts
var RenderLanguageRegion = class {
  static create({
    filename,
    region,
    parsed,
    kind,
    env
  }) {
    const lang = region[kind];
    const source = parsed[kind];
    return new RenderLanguageRegion({
      kind,
      region: lang,
      parsed,
      source,
      filename,
      env
    });
  }
  #kind;
  #region;
  #parsed;
  #source;
  #filename;
  #env;
  constructor({
    kind,
    region,
    parsed,
    source,
    filename,
    env
  }) {
    this.#kind = kind;
    this.#region = region;
    this.#parsed = parsed;
    this.#source = source;
    this.#filename = filename;
    this.#env = env;
  }
  get #attr() {
    const attrs = [];
    const highlights = this.#highlights;
    if (highlights && highlights.length > 0) {
      attrs.push(
        `{${highlights.map((h) => h.lines).join(",")}}`
      );
    }
    attrs.push(`filename=${JSON.stringify(this.#filename)}`);
    return attrs.join(" ");
  }
  highlight(highlight4) {
    const code = this.#region.code;
    const prefix = this.#prefix();
    const postfix = this.#postfix();
    const output = [];
    if (this.#kind === "js") {
      output.push("// @noErrors");
    }
    if (prefix) {
      output.push(prefix);
    }
    if (this.#kind === "js") {
      const dts = this.#dts;
      if (dts) {
        output.push(dts.code);
      }
    }
    if (prefix || this.#kind === "js") {
      output.push("// ---cut---");
    }
    output.push(code);
    if (postfix) {
      output.push("// ---cut-after---", postfix);
    }
    const source = output.join("\n").trimEnd();
    return (highlight4 == null ? void 0 : highlight4(source, "tsx twoslash", this.#attr)) ?? `<pre><code class="language-ts">// @jsxImportSource: preact
${code}</code></pre>`;
  }
  get #highlights() {
    return this.#region.highlights;
  }
  get #dts() {
    const regions = this.#parsed.ts.regions;
    if (regions) {
      return regions["dts"];
    }
  }
  #prefix() {
    const lines = this.#source.code.split("\n");
    return lines.slice(0, this.#region.offsets.start).join("\n");
  }
  #postfix() {
    const lines = this.#source.code.split("\n");
    return lines.slice(this.#region.offsets.end).join("\n");
  }
};

// src/.vitepress/packages/vitepress-snippets/src/utils.ts
import { dirname as dirname2, relative, resolve as resolve2 } from "node:path";
var MDState = class {
  #state;
  #md;
  constructor(md, state) {
    this.#state = state;
    this.#md = md;
  }
  line(lineno) {
    return new LineState(this.#state, lineno);
  }
  consumeLine() {
    this.#state.line = this.#state.line + 1;
  }
  get highlight() {
    return this.#md.options.highlight;
  }
  get md() {
    return this.#md;
  }
  get env() {
    return new StateEnv(this.#state.env);
  }
  open() {
    return this.#state.push("html_block", "", 0);
  }
  error(message) {
    return `<div class="language-error ext-error"><pre class="ext-error"><code>${message}</code></pre></div>`;
  }
};
var StateEnv = class {
  #env;
  constructor(env) {
    this.#env = env;
  }
  get path() {
    return this.#env.relativePath;
  }
  resolve(relativeFile) {
    return resolve2(dirname2(this.#env.path), relativeFile);
  }
  get vitepressRoot() {
    return relative(this.#env.path, this.#env.relativePath);
  }
  get absolutePath() {
    return this.#env.path;
  }
};
var LineState = class {
  #state;
  #startLine;
  constructor(state, startLine) {
    this.#state = state;
    this.#startLine = startLine;
  }
  get next() {
    if (this.#startLine < this.#state.lineMax) {
      return new LineState(this.#state, this.#startLine + 1);
    } else {
      return void 0;
    }
  }
  get position() {
    return {
      pos: this.contentStart,
      max: this.end
    };
  }
  get #src() {
    return this.#state.src;
  }
  consume() {
    this.#state.line = this.#startLine + 1;
    return new LineState(this.#state, this.#startLine + 1);
  }
  until(predicate) {
    let line = this;
    let lines = [];
    while (line) {
      const next = line.next;
      if (!next) {
        this.#state.line = line.#startLine + 1;
        break;
      }
      lines.push(line.string({ ws: true }));
      line = next;
      if (predicate(next)) {
        this.#state.line = next.#startLine + 1;
        break;
      }
    }
    return lines.join("\n");
  }
  string({ ws = false } = {}) {
    return this.#src.slice(
      ws ? this.start : this.contentStart,
      this.end
    );
  }
  startsWith(chars) {
    return this.slice(chars.length) === chars;
  }
  slice(n = this.end - this.contentStart) {
    if (n > this.end - this.contentStart) {
      return void 0;
    }
    const pos = this.contentStart;
    let chars = "";
    for (let i = 0; i < n; ++i) {
      chars += this.#src.charAt(pos + i);
    }
    return chars;
  }
  /**
   * The total indent of the line, including the required indent.
   */
  get #totalIndent() {
    return this.#state.sCount[this.#startLine] ?? 0;
  }
  /**
   * The required indent of the line.
   */
  get #requiredIndent() {
    return this.#state.blkIndent;
  }
  /**
   * The indent of the line, excluding the required indent.
   */
  get indent() {
    return this.#totalIndent - this.#requiredIndent;
  }
  /**
   * if it's indented more than 3 spaces, it's a code block
   */
  get isCodeBlock() {
    return this.indent >= 4;
  }
  get start() {
    return this.#state.bMarks[this.#startLine] ?? 0;
  }
  get wsChars() {
    return this.#state.tShift[this.#startLine] ?? 0;
  }
  get contentStart() {
    return this.start + this.wsChars;
  }
  get end() {
    return this.#state.eMarks[this.#startLine] ?? 0;
  }
};

// src/.vitepress/packages/vitepress-snippets/src/markdown-it.ts
function snippetPlugin(md, srcDir) {
  const parser = (state, startLine, _endLine, silent) => {
    var _a, _b, _c;
    const mdState = new MDState(md, state);
    const line = mdState.line(startLine);
    if (line.isCodeBlock) {
      return false;
    }
    if (line.startsWith("![#")) {
      const snippet = line.string();
      const match = snippet.match(
        /^!\[#(?<region>(.*))\]\((?<file>(.*))\)$/
      );
      if (match) {
        const { region, file } = match.groups;
        mdState.consumeLine();
        pushSnippetToken(
          mdState,
          mdState.env.resolve(file),
          region
        );
        return true;
      }
    }
    if (line.startsWith("```snippet")) {
      const fenceline = line.string();
      let rawPath = (_a = fenceline.match(
        /```snippet\s+\{(.*)\}/
      )) == null ? void 0 : _a[1];
      if (silent) {
        return true;
      }
      const fenceContent = (_b = line.next) == null ? void 0 : _b.until(
        (line2) => {
          var _a2;
          return ((_a2 = line2.slice()) == null ? void 0 : _a2.trim()) === "```";
        }
      );
      if (!fenceContent) {
        return false;
      }
      const token = state.push("html_block", "", 0);
      if (!(rawPath == null ? void 0 : rawPath.startsWith("#"))) {
        token.content = error(
          `Invalid region attribute "${rawPath}"`
        );
        return true;
      }
      const regionName = rawPath.slice(1);
      const filename = mdState.env.resolve(fenceContent.trim());
      if (!existsSync(filename)) {
        token.content = mdState.error(
          `File "${filename}" does not exist`
        );
        return true;
      }
      const content = readFileSync(filename, "utf8");
      let snippet;
      try {
        snippet = Snippet(content);
      } catch (e) {
        token.content = error(
          `Invalid source file: ${codeForError(
            e.stack ?? "missing stack trace"
          )}

Code:

${codeForError(content)}`
        );
        return true;
      }
      if (regionName) {
        const region = (_c = snippet.regions) == null ? void 0 : _c.get(regionName);
        if (region === void 0) {
          token.content = error(
            `Invalid region name: ${regionName}

${codeForError(
              fenceContent
            )}`
          );
          return true;
        }
        token.content = highlightRegion({
          state: mdState,
          filename,
          region,
          complete: snippet
        });
      } else {
        token.content = highlight(mdState, filename, snippet);
      }
      return true;
    }
    return false;
  };
  md.block.ruler.before("fence", "snippet", parser);
}
function pushSnippetToken(state, filename, regionName) {
  var _a;
  const token = state.open();
  if (!existsSync(filename)) {
    token.content = state.error(
      `File "${filename}" does not exist`
    );
    return true;
  }
  const content = readFileSync(filename, "utf8");
  let snippet;
  try {
    snippet = Snippet(content);
  } catch (e) {
    token.content = error(
      `Invalid source file: ${codeForError(
        e.stack ?? "missing stack trace"
      )}

Code:

${codeForError(content)}`
    );
    return true;
  }
  if (regionName) {
    const region = (_a = snippet.regions) == null ? void 0 : _a.get(regionName);
    if (region === void 0) {
      token.content = error(
        `Invalid region name: ${regionName}

${codeForError(
          filename
        )}`
      );
      return true;
    }
    token.content = highlightRegion({
      state,
      filename,
      region,
      complete: snippet
    });
  } else {
    token.content = highlight(state, filename, snippet);
  }
  return token;
}
function highlightRegion({
  state,
  filename,
  region,
  complete
}) {
  const tsFenced = RenderLanguageRegion.create({
    filename,
    region,
    parsed: complete,
    kind: "ts",
    env: state.env
  }).highlight(state.highlight);
  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
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
    code: region.ts.code,
    highlights: [],
    prefix: ""
  });
  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }
  const jsFenced = highlightLang(state, {
    filename,
    code: region.js.code,
    highlights: [],
    prefix: ""
  });
  return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}
function highlightLang(state, {
  code,
  filename,
  highlights,
  prefix,
  postfix
}) {
  var _a;
  const attr = highlights && highlights.length > 0 ? `{${highlights.map((h) => h.lines).join(",")}} {filename=${JSON.stringify(filename)}}` : "";
  const output = [];
  if (prefix) {
    output.push(prefix, "// ---cut---");
  }
  output.push(code);
  if (postfix) {
    output.push("// ---cut-after---", postfix);
  }
  const source = output.join("\n").trimEnd();
  return ((_a = state.highlight) == null ? void 0 : _a.call(state, source, "tsx twoslash", attr)) ?? `<pre><code class="language-ts">${code}</code></pre>`;
}
function error(message) {
  return `<div class="language-error ext-error"><pre class="ext-error"><code>${message}</code></pre></div>`;
}
function codeForError(code) {
  return stripAnsi(code).replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// src/.vitepress/plugins/tabs/tabs.ts
import hash from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/hash-sum@2.0.0/node_modules/hash-sum/hash-sum.js";
var tabs = (md, { name, component, getter } = {
  name: "tabs",
  component: "Tabs",
  getter: () => []
}) => {
  const CODETAB_MARKER = `@tab`;
  const tabsRule = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.src[start] !== ":")
      return false;
    let pos = start + 1;
    while (pos <= max) {
      if (state.src[pos] !== ":")
        break;
      pos += 1;
    }
    const markerCount = pos - start;
    if (markerCount < 3)
      return false;
    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max);
    const [containerName, id = ""] = params.split("#", 2);
    if (containerName.trim() !== name)
      return false;
    if (silent)
      return true;
    let nextLine = startLine;
    let autoClosed = false;
    while (
      // unclosed block should be auto closed by end of document.
      // also block seems to be auto closed by end of parent
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent)
        break;
      if (
        // match start
        state.src[start] === ":" && // closing fence should be indented less than 4 spaces
        state.sCount[nextLine] - state.blkIndent < 4
      ) {
        for (pos = start + 1; pos <= max; pos++)
          if (state.src[pos] !== ":")
            break;
        if (pos - start >= markerCount) {
          pos = state.skipSpaces(pos);
          if (pos >= max) {
            autoClosed = true;
            break;
          }
        }
      }
    }
    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;
    state.parentType = `${name}_tabs`;
    state.lineMax = nextLine - (autoClosed ? 1 : 0);
    const openToken = state.push(`${name}_tabs_open`, component, 1);
    openToken.markup = markup;
    openToken.block = true;
    openToken.info = containerName;
    openToken.meta = { id: id.trim() };
    openToken.map = [startLine, nextLine - (autoClosed ? 1 : 0)];
    state.md.block.tokenize(
      state,
      startLine + 1,
      nextLine - (autoClosed ? 1 : 0)
    );
    const closeToken = state.push(`${name}_tabs_close`, component, -1);
    closeToken.markup = state.src.slice(start, pos);
    closeToken.block = true;
    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);
    return true;
  };
  const tabRule = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (state.src.charAt(start) !== "@")
      return false;
    let index;
    for (index = 0; index < CODETAB_MARKER.length; index++)
      if (CODETAB_MARKER[index] !== state.src[start + index])
        return false;
    const markup = state.src.slice(start, start + index);
    const info = state.src.slice(start + index, max);
    if (silent)
      return true;
    let nextLine = startLine;
    let autoClosed = false;
    while (
      // unclosed block should be auto closed by end of document.
      // also block seems to be auto closed by end of parent
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent)
        break;
      if (
        // match start
        state.src[start] === "@" && // marker should not be indented with respect of opening fence
        state.sCount[nextLine] <= state.sCount[startLine]
      ) {
        let openMakerMatched = true;
        for (index = 0; index < CODETAB_MARKER.length; index++)
          if (CODETAB_MARKER[index] !== state.src[start + index]) {
            openMakerMatched = false;
            break;
          }
        if (openMakerMatched) {
          autoClosed = true;
          nextLine -= 1;
          break;
        }
      }
    }
    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;
    state.parentType = `tab`;
    state.lineMax = nextLine;
    const openToken = state.push("tab_open", "template", 1);
    const [title, id] = info.replace(/^:active/, "").split("#", 2);
    openToken.block = true;
    openToken.markup = markup;
    openToken.info = title.trim();
    openToken.meta = {
      active: info.includes(":active")
    };
    if (id)
      openToken.meta.value = id.trim();
    openToken.map = [startLine, nextLine];
    state.md.block.tokenize(state, startLine + 1, nextLine);
    const closeToken = state.push("tab_close", "template", -1);
    closeToken.block = true;
    closeToken.markup = "";
    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);
    return true;
  };
  md.block.ruler.before("fence", `${name}_tabs`, tabsRule, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  if (!md.block.ruler.__rules__.find(({ name: name2 }) => name2 === "tab"))
    md.block.ruler.before("fence", "tab", tabRule, {
      alt: ["paragraph", "reference", "blockquote", "list"]
    });
  md.renderer.rules[`${name}_tabs_open`] = (tokens, index, options, env, self2) => {
    const { meta } = tokens[index];
    const basicData = [];
    const customData = getter(tokens, index, options, env, self2);
    let activeIndex = -1;
    let isTabStart = false;
    for (let i = index; i < tokens.length; i++) {
      const { block, meta: meta2, type, info } = tokens[i];
      if (block) {
        if (type === `${name}_tabs_close`)
          break;
        if (type === `${name}_tabs_open`)
          continue;
        if (type === "tab_open") {
          if (meta2.active)
            activeIndex = basicData.length;
          tokens[i].attrPush([
            `#tab${basicData.length}`,
            "{ title, value, isActive }"
          ]);
          isTabStart = true;
          basicData.push({
            title: info,
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            ...meta2.value ? { value: meta2.value } : {}
          });
          continue;
        }
        if (type === "tab_close")
          continue;
        if (!isTabStart) {
          tokens[i].type = `${name}_tabs_empty`;
          tokens[i].hidden = true;
        }
      }
    }
    const data = basicData.map((item2, index2) => ({
      ...item2,
      ...customData[index2]
    }));
    return `<${component} id="${hash(data)}" :data='${// single quote will break @vue/compiler-sfc
    JSON.stringify(data).replace(/'/g, "&#39")}'${activeIndex !== -1 ? ` :active="${activeIndex}"` : ""}${// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    meta.id ? ` tab-id="${meta.id}"` : ""}>
`;
  };
  md.renderer.rules[`${name}_tabs_close`] = () => `</${component}>
`;
};

// src/.vitepress/plugins/code-tabs/code-tabs.ts
var codeTabs = (md) => {
  tabs(md, {
    name: "code-tabs",
    component: "CodeTabs",
    getter: (tokens, index) => {
      let inCodeTab = false;
      let foundFence = false;
      const codeTabsData = [];
      for (let i = index; i < tokens.length; i++) {
        const { block, type } = tokens[i];
        if (block) {
          if (type === "code-tabs_tabs_close") {
            break;
          }
          if (type === "tab_close") {
            inCodeTab = false;
            continue;
          }
          if (type === "tab_open") {
            inCodeTab = true;
            foundFence = false;
            continue;
          }
          if (inCodeTab && type === "fence" && !foundFence) {
            foundFence = true;
            continue;
          }
          tokens[i].type = "code_tab_empty";
          tokens[i].hidden = true;
        }
      }
      return codeTabsData;
    }
  });
};

// src/.vitepress/plugins/containers/container.ts
var container = (md, {
  name,
  marker = ":",
  validate = (params) => params.trim().split(" ", 2)[0] === name,
  openRender = (tokens, index, options, _env, slf) => {
    tokens[index].attrJoin("class", name);
    return slf.renderToken(tokens, index, options);
  },
  closeRender = (tokens, index, options, _env, slf) => slf.renderToken(tokens, index, options)
} = { name: "" }) => {
  const MIN_MARKER_NUM = 3;
  const markerStart = marker[0];
  const markerLength = marker.length;
  const container2 = (state, startLine, endLine, silent) => {
    let start = state.bMarks[startLine] + state.tShift[startLine];
    let max = state.eMarks[startLine];
    if (markerStart !== state.src[start])
      return false;
    let pos = start + 1;
    while (pos <= max) {
      if (marker[(pos - start) % markerLength] !== state.src[pos])
        break;
      pos += 1;
    }
    const markerCount = Math.floor((pos - start) / markerLength);
    if (markerCount < MIN_MARKER_NUM)
      return false;
    pos -= (pos - start) % markerLength;
    const markup = state.src.slice(start, pos);
    const params = state.src.slice(pos, max);
    if (!validate(params, markup))
      return false;
    if (silent)
      return true;
    let nextLine = startLine;
    let autoClosed = false;
    while (
      // unclosed block should be auto closed by end of document.
      // also block seems to be auto closed by end of parent
      nextLine < endLine
    ) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent)
        break;
      if (
        // match start
        markerStart === state.src[start] && // closing fence should be indented less than 4 spaces
        state.sCount[nextLine] - state.blkIndent < 4
      ) {
        for (pos = start + 1; pos <= max; pos++)
          if (marker[(pos - start) % markerLength] !== state.src[pos])
            break;
        if (Math.floor((pos - start) / markerLength) >= markerCount) {
          pos -= (pos - start) % markerLength;
          pos = state.skipSpaces(pos);
          if (pos >= max) {
            autoClosed = true;
            break;
          }
        }
      }
    }
    const oldParent = state.parentType;
    const oldLineMax = state.lineMax;
    state.parentType = "container";
    state.lineMax = nextLine;
    const openToken = state.push(`container_${name}_open`, "div", 1);
    openToken.markup = markup;
    openToken.block = true;
    openToken.info = params;
    openToken.map = [startLine, nextLine];
    state.md.block.tokenize(state, startLine + 1, nextLine);
    const closeToken = state.push(`container_${name}_close`, "div", -1);
    closeToken.markup = state.src.slice(start, pos);
    closeToken.block = true;
    state.parentType = oldParent;
    state.lineMax = oldLineMax;
    state.line = nextLine + (autoClosed ? 1 : 0);
    return true;
  };
  md.block.ruler.before("fence", `container_${name}`, container2, {
    alt: ["paragraph", "reference", "blockquote", "list"]
  });
  md.renderer.rules[`container_${name}_open`] = openRender;
  md.renderer.rules[`container_${name}_close`] = closeRender;
};

// src/.vitepress/plugins/containers/containers.ts
var blockEmphasis = (md) => container(md, {
  name: "emphasis",
  openRender: (tokens, idx) => {
    const token = tokens[idx];
    const info = token.info.trim().slice("emphasis".length).trim();
    return `<blockquote class='em'><p class='title'>${info || "Key Point"}</p>
`;
  },
  closeRender: () => "</blockquote>\n"
});
var hack = (md) => container(md, {
  name: "hack",
  openRender: () => "<div style='display:none'>\n",
  closeRender: () => "</div>\n"
});
var lightBulb = (md) => container(md, {
  name: "\u{1F4A1}",
  openRender: () => "<div class='lightbulb'>\n",
  closeRender: () => "</div>\n"
});
var reactPreact = (md) => container(md, {
  name: "react-preact",
  openRender: () => "<div class='react-preact'>\n",
  closeRender: () => "</div>\n"
});
var typescript = (md) => container(md, {
  name: "typescript",
  openRender: () => "<Language><template #ts>\n",
  closeRender: () => "</template></Language>\n"
});
var javascript = (md) => container(md, {
  name: "javascript",
  openRender: () => "<Language><template #js>\n",
  closeRender: () => "</template></Language>\n"
});
var construction = (md) => container(md, {
  name: "\u{1F6A7}",
  openRender: () => "<div class='construction'>\n",
  closeRender: () => "</div>\n"
});
var algorithm = (md) => container(md, {
  name: "algorithm",
  openRender: () => "<div class='algorithm'>\n",
  closeRender: () => "</div>\n"
});
var api = (md) => container(md, {
  name: "api",
  openRender: () => "<div class='api'>\n",
  closeRender: () => "</div>\n"
});
var docs = (md) => container(md, {
  name: "docs",
  openRender: () => "<div class='vp-doc VPDoc'>\n",
  closeRender: () => "</div>\n"
});
var containers = (md) => {
  md.use(hack);
  md.use(typescript);
  md.use(javascript);
  md.use(reactPreact);
  md.use(blockEmphasis);
  md.use(lightBulb);
  md.use(construction);
  md.use(algorithm);
  md.use(api);
  md.use(docs);
};

// src/.vitepress/plugins/fences.ts
import hash2 from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/hash-sum@2.0.0/node_modules/hash-sum/hash-sum.js";
var npmRender = (md, tokens, idx) => {
  const token = tokens[idx];
  const key = `npm-${hash2(idx)}`;
  const { content: raw, info } = token;
  const content = raw.trim();
  const body = [
    "::: code-tabs#npm",
    "@tab pnpm",
    "```shell",
    `$ pnpm install ${content}`,
    "```",
    "@tab npm",
    "```shell",
    `$ npm install ${content}`,
    "```",
    "@tab yarn",
    "```shell",
    `$ yarn add ${content}`,
    "```",
    ":::"
  ].join("\n");
  return md.render(body);
};
var npm = (md) => {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args;
    const { info } = tokens[index];
    const realInfo = info.split(":", 2)[0];
    if (realInfo === "npm")
      return npmRender(md, tokens, index);
    return fence(...args);
  };
};
var stackblitzRender = (md, id, content) => {
  const lines = content.split("\n");
  const options = Object.fromEntries(
    lines.map((line) => {
      const [key, value] = line.split("=");
      return [key.trim(), value.trim()];
    })
  );
  const attrs = [`id=${JSON.stringify(id)}`];
  for (const [key, value] of Object.entries(options)) {
    attrs.push(`${key}=${JSON.stringify(value)}`);
  }
  const title = options.title ?? "Play with it on StackBlitz";
  delete options.title;
  const props = attrs.join(" ");
  const body = `::: details ${title}

<StackBlitz ${props} />

:::`;
  return md.render(body);
};
var stackblitz = (md) => {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args;
    const token = tokens[index];
    const info = token.info.match(/^stackblitz\[(.*?)\]$/);
    if (info !== null) {
      return stackblitzRender(md, info[1], token.content.trim());
    }
    return fence(...args);
  };
};
var fences = (md) => {
  md.use(npm);
  md.use(stackblitz);
};

// src/.vitepress/plugins/mark/mark.ts
var tokenize = (state, silent) => {
  const start = state.pos;
  const marker = state.src.charAt(start);
  if (silent || marker !== "=")
    return false;
  const scanned = state.scanDelims(state.pos, true);
  let { length } = scanned;
  if (length < 2)
    return false;
  let token;
  if (length % 2) {
    token = state.push("text", "", 0);
    token.content = marker;
    length -= 1;
  }
  for (let i = 0; i < length; i += 2) {
    token = state.push("text", "", 0);
    token.content = `${marker}${marker}`;
    if (scanned.can_open || scanned.can_close)
      state.delimiters.push({
        marker: 61,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        jump: i / 2,
        // 1 delimiter = 2 characters
        token: state.tokens.length - 1,
        end: -1,
        open: scanned.can_open,
        close: scanned.can_close
      });
  }
  state.pos += scanned.length;
  return true;
};
var postProcess = (state, delimiters) => {
  let token;
  const loneMarkers = [];
  const max = delimiters.length;
  for (let i = 0; i < max; i++) {
    const startDelim = delimiters[i];
    if (startDelim.marker === 61 && startDelim.end !== -1) {
      const endDelim = delimiters[startDelim.end];
      token = state.tokens[startDelim.token];
      token.type = "mark_open";
      token.tag = "mark";
      token.nesting = 1;
      token.markup = "==";
      token.content = "";
      token = state.tokens[endDelim.token];
      token.type = "mark_close";
      token.tag = "mark";
      token.nesting = -1;
      token.markup = "==";
      token.content = "";
      if (state.tokens[endDelim.token - 1].type === "text" && state.tokens[endDelim.token - 1].content === "=")
        loneMarkers.push(endDelim.token - 1);
    }
  }
  while (loneMarkers.length) {
    const i = loneMarkers.pop();
    let j = i + 1;
    while (j < state.tokens.length && state.tokens[j].type === "mark_close")
      j += 1;
    j -= 1;
    if (i !== j) {
      token = state.tokens[j];
      state.tokens[j] = state.tokens[i];
      state.tokens[i] = token;
    }
  }
};
var mark = (md) => {
  md.inline.ruler.before("emphasis", "mark", tokenize);
  md.inline.ruler2.before("emphasis", "mark", (state) => {
    const tokensMeta = state.tokens_meta || [];
    postProcess(state, state.delimiters);
    for (let curr = 0; curr < tokensMeta.length; curr++) {
      const tokenMeta = tokensMeta[curr];
      if (tokenMeta == null ? void 0 : tokenMeta.delimiters)
        postProcess(state, tokenMeta.delimiters);
    }
    return true;
  });
};

// src/.vitepress/plugins/mermaid/flowchart.ts
import { readFileSync as readFileSync2 } from "node:fs";
import path from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
var __vite_injected_original_import_meta_url2 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/plugins/mermaid/flowchart.ts";
var dirname3 = path.dirname(fileURLToPath2(__vite_injected_original_import_meta_url2));
var styles = readFileSync2(
  path.resolve(dirname3, "../mermaid.css"),
  "utf-8"
);
var theme = {
  theme: "neutral",
  themeVariables: {
    fontFamily: "var(--starbeam-font-mono)",
    fontSize: "12px"
  },
  flowchart: {
    curve: "linear",
    htmlLabels: true
  },
  themeCSS: styles.replace(/\s+/g, " ")
};
var deps = (md) => {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args;
    const token = tokens[index];
    const realInfo = token.info.split(":", 2)[0];
    if (realInfo === "deps") {
      token.info = "mermaid" + token.info.slice(realInfo.length);
      token.content = `%%{init: ${JSON.stringify(
        theme
      )}}%%
flowchart BT
${indent(token.content)}`;
    }
    return fence(...args);
  };
};
var lifecycle = (md) => {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args;
    const token = tokens[index];
    const [realInfo, options] = token.info.split(" ", 2);
    if (realInfo === "lifecycle") {
      const attrs = Object.fromEntries(token.attrs ?? []);
      const direction = Object.keys(attrs)[0] ?? "TB";
      token.info = "mermaid";
      token.content = `%%{init: ${JSON.stringify(
        theme
      )}}%%
flowchart ${direction}
${indent(token.content)}`;
      console.log(token.content);
    }
    return fence(...args);
  };
};
var flowchart = (md) => {
  md.use(deps);
  md.use(lifecycle);
};
function indent(str) {
  return str.split("\n").map((line) => "  " + line).join("\n");
}

// src/.vitepress/plugins/utils.ts
import { strFromU8, strToU8, unzlibSync, zlibSync } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/fflate@0.7.4/node_modules/fflate/esm/index.mjs";
var utoa = (data) => {
  const buffer = strToU8(data);
  const zipped = zlibSync(buffer, { level: 9 });
  const binary = strFromU8(zipped, true);
  return btoa(binary);
};

// src/.vitepress/plugins/mermaid/mermaid.ts
var mermaidRender = (tokens, index) => {
  const token = tokens[index];
  const key = `mermaid-${index}`;
  const { content } = token;
  return `<Mermaid id="${key}" code="${utoa(content)}"></Mermaid>`;
};
var mermaidHackRender = (name, content, index) => `<Mermaid id="mermaid-${index}" code="${utoa(
  `${name}
${content.split("\n").map((line) => line ? `  ${line}` : "").join("\n")}`
)}"></Mermaid>`;
var mermaid = (md) => {
  const fence = md.renderer.rules.fence;
  md.renderer.rules.fence = (...args) => {
    const [tokens, index] = args;
    const { content, info } = tokens[index];
    if (info.trim() === "mermaid")
      return mermaidRender(...args);
    if (info.trim() === "sequence")
      return mermaidHackRender("sequenceDiagram", content, index);
    if (info.trim() === "class")
      return mermaidHackRender("classDiagram", content, index);
    if (info.trim() === "state")
      return mermaidHackRender("stateDiagram-v2", content, index);
    if (info.trim() === "er")
      return mermaidHackRender("erDiagram", content, index);
    if (info.trim() === "journey")
      return mermaidHackRender("journey", content, index);
    if (info.trim() === "gantt")
      return mermaidHackRender("gantt", content, index);
    if (info.trim() === "pie")
      return mermaidHackRender("pie", content, index);
    if (info.trim() === "git-graph")
      return mermaidHackRender("gitGraph", content, index);
    if (info.trim() === "c4c")
      return mermaidHackRender("C4Context", content, index);
    if (info.trim() === "mindmap")
      return mermaidHackRender("mindmap", content, index);
    return fence(...args);
  };
  md.renderer.rules["mermaid"] = mermaidRender;
};

// src/.vitepress/config/syntax-highlight/highlight.ts
import { customAlphabet } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/nanoid@4.0.1/node_modules/nanoid/index.js";
import { dirname as dirname4, resolve as resolve3 } from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";
import {
  addClass,
  createDiffProcessor,
  createFocusProcessor,
  createHighlightProcessor,
  createRangeProcessor,
  defineProcessor,
  getHighlighter
} from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/shiki-processor@0.1.3_shiki@0.14.1/node_modules/shiki-processor/dist/index.mjs";

// src/.vitepress/config/syntax-highlight/glimmer.tmLanguage.json
var glimmer_tmLanguage_default = {
  information_for_contributors: [
    "This file has been converted from https://github.com/microsoft/TypeScript-TmLanguage/blob/master/TypeScriptReact.tmLanguage",
    "If you want to provide a fix or improvement, please create a pull request against the original repository.",
    "Once accepted there, we are happy to receive an update request."
  ],
  version: "https://github.com/microsoft/TypeScript-TmLanguage/commit/359e091c0a83a45e20aefc13111ed4a19e201f97",
  id: "glimmer",
  name: "JavaScript (with Glimmer Content Tags)",
  scopeName: "source.js.glimmer",
  patterns: [
    {
      include: "#directives"
    },
    {
      include: "#statements"
    },
    {
      include: "#shebang"
    }
  ],
  repository: {
    shebang: {
      name: "comment.line.shebang.js.jsx",
      match: "\\A(#!).*(?=$)",
      captures: {
        "1": {
          name: "punctuation.definition.comment.js.jsx"
        }
      }
    },
    statements: {
      patterns: [
        {
          include: "#declaration"
        },
        {
          include: "#control-statement"
        },
        {
          include: "#after-operator-block-as-object-literal"
        },
        {
          include: "#decl-block"
        },
        {
          include: "#label"
        },
        {
          include: "#expression"
        },
        {
          include: "#punctuation-semicolon"
        },
        {
          include: "#string"
        },
        {
          include: "#comment"
        }
      ]
    },
    declaration: {
      patterns: [
        {
          include: "#decorator"
        },
        {
          include: "#var-expr"
        },
        {
          include: "#function-declaration"
        },
        {
          include: "#class-declaration"
        },
        {
          include: "#interface-declaration"
        },
        {
          include: "#enum-declaration"
        },
        {
          include: "#namespace-declaration"
        },
        {
          include: "#type-alias-declaration"
        },
        {
          include: "#import-equals-declaration"
        },
        {
          include: "#import-declaration"
        },
        {
          include: "#export-declaration"
        },
        {
          name: "storage.modifier.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(declare|export)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        }
      ]
    },
    "control-statement": {
      patterns: [
        {
          include: "#switch-statement"
        },
        {
          include: "#for-loop"
        },
        {
          name: "keyword.control.trycatch.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(catch|finally|throw|try)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|goto)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "1": {
              name: "keyword.control.loop.js.jsx"
            },
            "2": {
              name: "entity.name.label.js.jsx"
            }
          }
        },
        {
          name: "keyword.control.loop.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|do|goto|while)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(return)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          beginCaptures: {
            "0": {
              name: "keyword.control.flow.js.jsx"
            }
          },
          end: "(?=[;}]|$|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
          patterns: [
            {
              include: "#expression"
            }
          ]
        },
        {
          name: "keyword.control.switch.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default|switch)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          include: "#if-statement"
        },
        {
          name: "keyword.control.conditional.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(else|if)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.control.with.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(with)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.control.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(package)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.other.debugger.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(debugger)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        }
      ]
    },
    label: {
      patterns: [
        {
          begin: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(:)(?=\\s*\\{)",
          beginCaptures: {
            "1": {
              name: "entity.name.label.js.jsx"
            },
            "2": {
              name: "punctuation.separator.label.js.jsx"
            }
          },
          end: "(?<=\\})",
          patterns: [
            {
              include: "#decl-block"
            }
          ]
        },
        {
          match: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(:)",
          captures: {
            "1": {
              name: "entity.name.label.js.jsx"
            },
            "2": {
              name: "punctuation.separator.label.js.jsx"
            }
          }
        }
      ]
    },
    expression: {
      patterns: [
        {
          include: "#expressionWithoutIdentifiers"
        },
        {
          include: "#identifiers"
        },
        {
          include: "#expressionPunctuations"
        }
      ]
    },
    expressionWithoutIdentifiers: {
      patterns: [
        {
          include: "#jsx"
        },
        {
          include: "#string"
        },
        {
          include: "#regex"
        },
        {
          include: "#comment"
        },
        {
          include: "#function-expression"
        },
        {
          include: "#class-expression"
        },
        {
          include: "#arrow-function"
        },
        {
          include: "#paren-expression-possibly-arrow"
        },
        {
          include: "#cast"
        },
        {
          include: "#ternary-expression"
        },
        {
          include: "#new-expr"
        },
        {
          include: "#instanceof-expr"
        },
        {
          include: "#object-literal"
        },
        {
          include: "#expression-operators"
        },
        {
          include: "#function-call"
        },
        {
          include: "#literal"
        },
        {
          include: "#support-objects"
        },
        {
          include: "#paren-expression"
        }
      ]
    },
    expressionPunctuations: {
      patterns: [
        {
          include: "#punctuation-comma"
        },
        {
          include: "#punctuation-accessor"
        }
      ]
    },
    decorator: {
      name: "meta.decorator.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))\\@",
      beginCaptures: {
        "0": {
          name: "punctuation.decorator.js.jsx"
        }
      },
      end: "(?=\\s)",
      patterns: [
        {
          include: "#expression"
        }
      ]
    },
    "var-expr": {
      patterns: [
        {
          name: "meta.var.expr.js.jsx",
          begin: "(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))",
          end: "(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))|((?<!^let|[^\\._$[:alnum:]]let|^var|[^\\._$[:alnum:]]var)(?=\\s*$)))",
          patterns: [
            {
              begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
              beginCaptures: {
                "1": {
                  name: "keyword.control.export.js.jsx"
                },
                "2": {
                  name: "storage.modifier.js.jsx"
                },
                "3": {
                  name: "storage.type.js.jsx"
                }
              },
              end: "(?=\\S)"
            },
            {
              include: "#destructuring-variable"
            },
            {
              include: "#var-single-variable"
            },
            {
              include: "#variable-initializer"
            },
            {
              include: "#comment"
            },
            {
              begin: "(,)\\s*((?!\\S)|(?=\\/\\/))",
              beginCaptures: {
                "1": {
                  name: "punctuation.separator.comma.js.jsx"
                }
              },
              end: "(?<!,)(((?==|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|^\\s*$))|((?<=\\S)(?=\\s*$)))",
              patterns: [
                {
                  include: "#single-line-comment-consuming-line-ending"
                },
                {
                  include: "#comment"
                },
                {
                  include: "#destructuring-variable"
                },
                {
                  include: "#var-single-variable"
                },
                {
                  include: "#punctuation-comma"
                }
              ]
            },
            {
              include: "#punctuation-comma"
            }
          ]
        },
        {
          name: "meta.var.expr.js.jsx",
          begin: "(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.js.jsx"
            },
            "2": {
              name: "storage.modifier.js.jsx"
            },
            "3": {
              name: "storage.type.js.jsx"
            }
          },
          end: "(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))|((?<!^const|[^\\._$[:alnum:]]const)(?=\\s*$)))",
          patterns: [
            {
              begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
              beginCaptures: {
                "1": {
                  name: "keyword.control.export.js.jsx"
                },
                "2": {
                  name: "storage.modifier.js.jsx"
                },
                "3": {
                  name: "storage.type.js.jsx"
                }
              },
              end: "(?=\\S)"
            },
            {
              include: "#destructuring-const"
            },
            {
              include: "#var-single-const"
            },
            {
              include: "#variable-initializer"
            },
            {
              include: "#comment"
            },
            {
              begin: "(,)\\s*((?!\\S)|(?=\\/\\/))",
              beginCaptures: {
                "1": {
                  name: "punctuation.separator.comma.js.jsx"
                }
              },
              end: "(?<!,)(((?==|;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|^\\s*$))|((?<=\\S)(?=\\s*$)))",
              patterns: [
                {
                  include: "#single-line-comment-consuming-line-ending"
                },
                {
                  include: "#comment"
                },
                {
                  include: "#destructuring-const"
                },
                {
                  include: "#var-single-const"
                },
                {
                  include: "#punctuation-comma"
                }
              ]
            },
            {
              include: "#punctuation-comma"
            }
          ]
        }
      ]
    },
    "var-single-variable": {
      patterns: [
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin: "(?x)([_$[:alpha:]][_$[:alnum:]]*)(\\!)?(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx entity.name.function.js.jsx"
            },
            "2": {
              name: "keyword.operator.definiteassignment.js.jsx"
            }
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#var-single-variable-type-annotation"
            }
          ]
        },
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin: "([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])(\\!)?",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx variable.other.constant.js.jsx"
            },
            "2": {
              name: "keyword.operator.definiteassignment.js.jsx"
            }
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#var-single-variable-type-annotation"
            }
          ]
        },
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)(\\!)?",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx variable.other.readwrite.js.jsx"
            },
            "2": {
              name: "keyword.operator.definiteassignment.js.jsx"
            }
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#var-single-variable-type-annotation"
            }
          ]
        }
      ]
    },
    "var-single-const": {
      patterns: [
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin: "(?x)([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx variable.other.constant.js.jsx entity.name.function.js.jsx"
            }
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#var-single-variable-type-annotation"
            }
          ]
        },
        {
          name: "meta.var-single-variable.expr.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.js.jsx variable.other.constant.js.jsx"
            }
          },
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#var-single-variable-type-annotation"
            }
          ]
        }
      ]
    },
    "var-single-variable-type-annotation": {
      patterns: [
        {
          include: "#type-annotation"
        },
        {
          include: "#string"
        },
        {
          include: "#comment"
        }
      ]
    },
    "destructuring-variable": {
      patterns: [
        {
          name: "meta.object-binding-pattern-variable.js.jsx",
          begin: "(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\{)",
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#object-binding-pattern"
            },
            {
              include: "#type-annotation"
            },
            {
              include: "#comment"
            }
          ]
        },
        {
          name: "meta.array-binding-pattern-variable.js.jsx",
          begin: "(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\[)",
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#array-binding-pattern"
            },
            {
              include: "#type-annotation"
            },
            {
              include: "#comment"
            }
          ]
        }
      ]
    },
    "destructuring-const": {
      patterns: [
        {
          name: "meta.object-binding-pattern-variable.js.jsx",
          begin: "(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\{)",
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#object-binding-pattern-const"
            },
            {
              include: "#type-annotation"
            },
            {
              include: "#comment"
            }
          ]
        },
        {
          name: "meta.array-binding-pattern-variable.js.jsx",
          begin: "(?<!=|:|^of|[^\\._$[:alnum:]]of|^in|[^\\._$[:alnum:]]in)\\s*(?=\\[)",
          end: "(?=$|^|[;,=}]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#array-binding-pattern-const"
            },
            {
              include: "#type-annotation"
            },
            {
              include: "#comment"
            }
          ]
        }
      ]
    },
    "object-binding-element": {
      patterns: [
        {
          include: "#comment"
        },
        {
          begin: "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))",
          end: "(?=,|\\})",
          patterns: [
            {
              include: "#object-binding-element-propertyName"
            },
            {
              include: "#binding-element"
            }
          ]
        },
        {
          include: "#object-binding-pattern"
        },
        {
          include: "#destructuring-variable-rest"
        },
        {
          include: "#variable-initializer"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "object-binding-element-const": {
      patterns: [
        {
          include: "#comment"
        },
        {
          begin: "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))",
          end: "(?=,|\\})",
          patterns: [
            {
              include: "#object-binding-element-propertyName"
            },
            {
              include: "#binding-element-const"
            }
          ]
        },
        {
          include: "#object-binding-pattern-const"
        },
        {
          include: "#destructuring-variable-rest-const"
        },
        {
          include: "#variable-initializer"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "object-binding-element-propertyName": {
      begin: "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))",
      end: "(:)",
      endCaptures: {
        "0": {
          name: "punctuation.destructuring.js.jsx"
        }
      },
      patterns: [
        {
          include: "#string"
        },
        {
          include: "#array-literal"
        },
        {
          include: "#numeric-literal"
        },
        {
          name: "variable.object.property.js.jsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)"
        }
      ]
    },
    "binding-element": {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          include: "#numeric-literal"
        },
        {
          include: "#regex"
        },
        {
          include: "#object-binding-pattern"
        },
        {
          include: "#array-binding-pattern"
        },
        {
          include: "#destructuring-variable-rest"
        },
        {
          include: "#variable-initializer"
        }
      ]
    },
    "binding-element-const": {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          include: "#numeric-literal"
        },
        {
          include: "#regex"
        },
        {
          include: "#object-binding-pattern-const"
        },
        {
          include: "#array-binding-pattern-const"
        },
        {
          include: "#destructuring-variable-rest-const"
        },
        {
          include: "#variable-initializer"
        }
      ]
    },
    "destructuring-variable-rest": {
      match: "(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)",
      captures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "meta.definition.variable.js.jsx variable.other.readwrite.js.jsx"
        }
      }
    },
    "destructuring-variable-rest-const": {
      match: "(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)",
      captures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "meta.definition.variable.js.jsx variable.other.constant.js.jsx"
        }
      }
    },
    "object-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\{)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.object.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.object.js.jsx"
        }
      },
      patterns: [
        {
          include: "#object-binding-element"
        }
      ]
    },
    "object-binding-pattern-const": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\{)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.object.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.object.js.jsx"
        }
      },
      patterns: [
        {
          include: "#object-binding-element-const"
        }
      ]
    },
    "array-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\[)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.array.js.jsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.array.js.jsx"
        }
      },
      patterns: [
        {
          include: "#binding-element"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "array-binding-pattern-const": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\[)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.array.js.jsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.array.js.jsx"
        }
      },
      patterns: [
        {
          include: "#binding-element-const"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "parameter-name": {
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|protected|private|readonly)\\s+(?=(override|public|protected|private|readonly)\\s+)",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "keyword.operator.rest.js.jsx"
            },
            "3": {
              name: "entity.name.function.js.jsx variable.language.this.js.jsx"
            },
            "4": {
              name: "entity.name.function.js.jsx"
            },
            "5": {
              name: "keyword.operator.optional.js.jsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "keyword.operator.rest.js.jsx"
            },
            "3": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx"
            },
            "4": {
              name: "variable.parameter.js.jsx"
            },
            "5": {
              name: "keyword.operator.optional.js.jsx"
            }
          }
        }
      ]
    },
    "destructuring-parameter": {
      patterns: [
        {
          name: "meta.parameter.object-binding-pattern.js.jsx",
          begin: "(?<!=|:)\\s*(?:(\\.\\.\\.)\\s*)?(\\{)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.rest.js.jsx"
            },
            "2": {
              name: "punctuation.definition.binding-pattern.object.js.jsx"
            }
          },
          end: "\\}",
          endCaptures: {
            "0": {
              name: "punctuation.definition.binding-pattern.object.js.jsx"
            }
          },
          patterns: [
            {
              include: "#parameter-object-binding-element"
            }
          ]
        },
        {
          name: "meta.paramter.array-binding-pattern.js.jsx",
          begin: "(?<!=|:)\\s*(?:(\\.\\.\\.)\\s*)?(\\[)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.rest.js.jsx"
            },
            "2": {
              name: "punctuation.definition.binding-pattern.array.js.jsx"
            }
          },
          end: "\\]",
          endCaptures: {
            "0": {
              name: "punctuation.definition.binding-pattern.array.js.jsx"
            }
          },
          patterns: [
            {
              include: "#parameter-binding-element"
            },
            {
              include: "#punctuation-comma"
            }
          ]
        }
      ]
    },
    "parameter-object-binding-element": {
      patterns: [
        {
          include: "#comment"
        },
        {
          begin: "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(:))",
          end: "(?=,|\\})",
          patterns: [
            {
              include: "#object-binding-element-propertyName"
            },
            {
              include: "#parameter-binding-element"
            }
          ]
        },
        {
          include: "#parameter-object-binding-pattern"
        },
        {
          include: "#destructuring-parameter-rest"
        },
        {
          include: "#variable-initializer"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "parameter-binding-element": {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          include: "#numeric-literal"
        },
        {
          include: "#regex"
        },
        {
          include: "#parameter-object-binding-pattern"
        },
        {
          include: "#parameter-array-binding-pattern"
        },
        {
          include: "#destructuring-parameter-rest"
        },
        {
          include: "#variable-initializer"
        }
      ]
    },
    "destructuring-parameter-rest": {
      match: "(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)",
      captures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "variable.parameter.js.jsx"
        }
      }
    },
    "parameter-object-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\{)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.object.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.object.js.jsx"
        }
      },
      patterns: [
        {
          include: "#parameter-object-binding-element"
        }
      ]
    },
    "parameter-array-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\[)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.rest.js.jsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.array.js.jsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.array.js.jsx"
        }
      },
      patterns: [
        {
          include: "#parameter-binding-element"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "field-declaration": {
      name: "meta.field.declaration.js.jsx",
      begin: "(?x)(?<!\\()(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)\\s+)?(?=\\s*((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|(\\#?[_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(?:(?:(\\?)|(\\!))\\s*)?(=|:|;|,|\\}|$))",
      beginCaptures: {
        "1": {
          name: "storage.modifier.js.jsx"
        }
      },
      end: "(?x)(?=\\}|;|,|$|(^(?!\\s*((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|(\\#?[_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(?:(?:(\\?)|(\\!))\\s*)?(=|:|;|,|$))))|(?<=\\})",
      patterns: [
        {
          include: "#variable-initializer"
        },
        {
          include: "#type-annotation"
        },
        {
          include: "#string"
        },
        {
          include: "#array-literal"
        },
        {
          include: "#numeric-literal"
        },
        {
          include: "#comment"
        },
        {
          match: "(?x)(\\#?[_$[:alpha:]][_$[:alnum:]]*)(?:(\\?)|(\\!))?(?=\\s*\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "1": {
              name: "meta.definition.property.js.jsx entity.name.function.js.jsx"
            },
            "2": {
              name: "keyword.operator.optional.js.jsx"
            },
            "3": {
              name: "keyword.operator.definiteassignment.js.jsx"
            }
          }
        },
        {
          name: "meta.definition.property.js.jsx variable.object.property.js.jsx",
          match: "\\#?[_$[:alpha:]][_$[:alnum:]]*"
        },
        {
          name: "keyword.operator.optional.js.jsx",
          match: "\\?"
        },
        {
          name: "keyword.operator.definiteassignment.js.jsx",
          match: "\\!"
        }
      ]
    },
    "variable-initializer": {
      patterns: [
        {
          begin: "(?<!=|!)(=)(?!=)(?=\\s*\\S)(?!\\s*.*=>\\s*$)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.assignment.js.jsx"
            }
          },
          end: "(?=$|^|[,);}\\]]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))",
          patterns: [
            {
              include: "#expression"
            }
          ]
        },
        {
          begin: "(?<!=|!)(=)(?!=)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.assignment.js.jsx"
            }
          },
          end: "(?=[,);}\\]]|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+))|(?=^\\s*$)|(?<=\\S)(?<!=)(?=\\s*$)",
          patterns: [
            {
              include: "#expression"
            }
          ]
        }
      ]
    },
    "function-declaration": {
      name: "meta.function.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?(?:(async)\\s+)?(function\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.js.jsx"
        },
        "2": {
          name: "storage.modifier.js.jsx"
        },
        "3": {
          name: "storage.modifier.async.js.jsx"
        },
        "4": {
          name: "storage.type.function.js.jsx"
        },
        "5": {
          name: "keyword.generator.asterisk.js.jsx"
        },
        "6": {
          name: "meta.definition.function.js.jsx entity.name.function.js.jsx"
        }
      },
      end: "(?=;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))|(?<=\\})",
      patterns: [
        {
          include: "#function-name"
        },
        {
          include: "#function-body"
        }
      ]
    },
    "function-expression": {
      name: "meta.function.expression.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(async)\\s+)?(function\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*",
      beginCaptures: {
        "1": {
          name: "storage.modifier.async.js.jsx"
        },
        "2": {
          name: "storage.type.function.js.jsx"
        },
        "3": {
          name: "keyword.generator.asterisk.js.jsx"
        },
        "4": {
          name: "meta.definition.function.js.jsx entity.name.function.js.jsx"
        }
      },
      end: "(?=;)|(?<=\\})",
      patterns: [
        {
          include: "#function-name"
        },
        {
          include: "#single-line-comment-consuming-line-ending"
        },
        {
          include: "#function-body"
        }
      ]
    },
    "function-name": {
      name: "meta.definition.function.js.jsx entity.name.function.js.jsx",
      match: "[_$[:alpha:]][_$[:alnum:]]*"
    },
    "function-body": {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#type-parameters"
        },
        {
          include: "#function-parameters"
        },
        {
          include: "#return-type"
        },
        {
          include: "#type-function-return-type"
        },
        {
          include: "#decl-block"
        },
        {
          name: "keyword.generator.asterisk.js.jsx",
          match: "\\*"
        }
      ]
    },
    "method-declaration": {
      patterns: [
        {
          name: "meta.method.declaration.js.jsx",
          begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?\\s*\\b(constructor)\\b(?!:)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          beginCaptures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "storage.modifier.js.jsx"
            },
            "3": {
              name: "storage.modifier.js.jsx"
            },
            "4": {
              name: "storage.modifier.async.js.jsx"
            },
            "5": {
              name: "storage.type.js.jsx"
            }
          },
          end: "(?=\\}|;|,|$)|(?<=\\})",
          patterns: [
            {
              include: "#method-declaration-name"
            },
            {
              include: "#function-body"
            }
          ]
        },
        {
          name: "meta.method.declaration.js.jsx",
          begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?(?:(?:\\s*\\b(new)\\b(?!:)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|(?:(\\*)\\s*)?)(?=\\s*((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
          beginCaptures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "storage.modifier.js.jsx"
            },
            "3": {
              name: "storage.modifier.js.jsx"
            },
            "4": {
              name: "storage.modifier.async.js.jsx"
            },
            "5": {
              name: "keyword.operator.new.js.jsx"
            },
            "6": {
              name: "keyword.generator.asterisk.js.jsx"
            }
          },
          end: "(?=\\}|;|,|$)|(?<=\\})",
          patterns: [
            {
              include: "#method-declaration-name"
            },
            {
              include: "#function-body"
            }
          ]
        },
        {
          name: "meta.method.declaration.js.jsx",
          begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
          beginCaptures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "storage.modifier.js.jsx"
            },
            "3": {
              name: "storage.modifier.js.jsx"
            },
            "4": {
              name: "storage.modifier.async.js.jsx"
            },
            "5": {
              name: "storage.type.property.js.jsx"
            },
            "6": {
              name: "keyword.generator.asterisk.js.jsx"
            }
          },
          end: "(?=\\}|;|,|$)|(?<=\\})",
          patterns: [
            {
              include: "#method-declaration-name"
            },
            {
              include: "#function-body"
            }
          ]
        }
      ]
    },
    "object-literal-method-declaration": {
      name: "meta.method.declaration.js.jsx",
      begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
      beginCaptures: {
        "1": {
          name: "storage.modifier.async.js.jsx"
        },
        "2": {
          name: "storage.type.property.js.jsx"
        },
        "3": {
          name: "keyword.generator.asterisk.js.jsx"
        }
      },
      end: "(?=\\}|;|,)|(?<=\\})",
      patterns: [
        {
          include: "#method-declaration-name"
        },
        {
          include: "#function-body"
        },
        {
          begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
          beginCaptures: {
            "1": {
              name: "storage.modifier.async.js.jsx"
            },
            "2": {
              name: "storage.type.property.js.jsx"
            },
            "3": {
              name: "keyword.generator.asterisk.js.jsx"
            }
          },
          end: "(?=\\(|\\<)",
          patterns: [
            {
              include: "#method-declaration-name"
            }
          ]
        }
      ]
    },
    "method-declaration-name": {
      begin: "(?x)(?=((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??)\\s*[\\(\\<])",
      end: "(?=\\(|\\<)",
      patterns: [
        {
          include: "#string"
        },
        {
          include: "#array-literal"
        },
        {
          include: "#numeric-literal"
        },
        {
          name: "meta.definition.method.js.jsx entity.name.function.js.jsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*"
        },
        {
          name: "keyword.operator.optional.js.jsx",
          match: "\\?"
        }
      ]
    },
    "arrow-function": {
      patterns: [
        {
          name: "meta.arrow.js.jsx",
          match: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(\\basync)\\s+)?([_$[:alpha:]][_$[:alnum:]]*)\\s*(?==>)",
          captures: {
            "1": {
              name: "storage.modifier.async.js.jsx"
            },
            "2": {
              name: "variable.parameter.js.jsx"
            }
          }
        },
        {
          name: "meta.arrow.js.jsx",
          begin: "(?x) (?:\n  (?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(\\basync)\n)? ((?<![})!\\]])\\s*\n  (?=\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  )\n)",
          beginCaptures: {
            "1": {
              name: "storage.modifier.async.js.jsx"
            }
          },
          end: "(?==>|\\{|(^\\s*(export|function|class|interface|let|var|const|import|enum|namespace|module|type|abstract|declare)\\s+))",
          patterns: [
            {
              include: "#comment"
            },
            {
              include: "#type-parameters"
            },
            {
              include: "#function-parameters"
            },
            {
              include: "#arrow-return-type"
            },
            {
              include: "#possibly-arrow-return-type"
            }
          ]
        },
        {
          name: "meta.arrow.js.jsx",
          begin: "=>",
          beginCaptures: {
            "0": {
              name: "storage.type.function.arrow.js.jsx"
            }
          },
          end: "((?<=\\}|\\S)(?<!=>)|((?!\\{)(?=\\S)))(?!\\/[\\/\\*])",
          patterns: [
            {
              include: "#single-line-comment-consuming-line-ending"
            },
            {
              include: "#decl-block"
            },
            {
              include: "#expression"
            }
          ]
        }
      ]
    },
    "indexer-declaration": {
      name: "meta.indexer.declaration.js.jsx",
      begin: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)\\s*)?\\s*(\\[)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=:)",
      beginCaptures: {
        "1": {
          name: "storage.modifier.js.jsx"
        },
        "2": {
          name: "meta.brace.square.js.jsx"
        },
        "3": {
          name: "variable.parameter.js.jsx"
        }
      },
      end: "(\\])\\s*(\\?\\s*)?|$",
      endCaptures: {
        "1": {
          name: "meta.brace.square.js.jsx"
        },
        "2": {
          name: "keyword.operator.optional.js.jsx"
        }
      },
      patterns: [
        {
          include: "#type-annotation"
        }
      ]
    },
    "indexer-mapped-type-declaration": {
      name: "meta.indexer.mappedtype.declaration.js.jsx",
      begin: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([+-])?(readonly)\\s*)?\\s*(\\[)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s+(in)\\s+",
      beginCaptures: {
        "1": {
          name: "keyword.operator.type.modifier.js.jsx"
        },
        "2": {
          name: "storage.modifier.js.jsx"
        },
        "3": {
          name: "meta.brace.square.js.jsx"
        },
        "4": {
          name: "entity.name.type.js.jsx"
        },
        "5": {
          name: "keyword.operator.expression.in.js.jsx"
        }
      },
      end: "(\\])([+-])?\\s*(\\?\\s*)?|$",
      endCaptures: {
        "1": {
          name: "meta.brace.square.js.jsx"
        },
        "2": {
          name: "keyword.operator.type.modifier.js.jsx"
        },
        "3": {
          name: "keyword.operator.optional.js.jsx"
        }
      },
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+",
          captures: {
            "1": {
              name: "keyword.control.as.js.jsx"
            }
          }
        },
        {
          include: "#type"
        }
      ]
    },
    "function-parameters": {
      name: "meta.parameters.js.jsx",
      begin: "\\(",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.parameters.begin.js.jsx"
        }
      },
      end: "\\)",
      endCaptures: {
        "0": {
          name: "punctuation.definition.parameters.end.js.jsx"
        }
      },
      patterns: [
        {
          include: "#function-parameters-body"
        }
      ]
    },
    "function-parameters-body": {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          include: "#decorator"
        },
        {
          include: "#destructuring-parameter"
        },
        {
          include: "#parameter-name"
        },
        {
          include: "#parameter-type-annotation"
        },
        {
          include: "#variable-initializer"
        },
        {
          name: "punctuation.separator.parameter.js.jsx",
          match: ","
        }
      ]
    },
    "class-declaration": {
      name: "meta.class.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(?:(abstract)\\s+)?\\b(class)\\b(?=\\s+|/[/*])",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.js.jsx"
        },
        "2": {
          name: "storage.modifier.js.jsx"
        },
        "3": {
          name: "storage.modifier.js.jsx"
        },
        "4": {
          name: "storage.type.class.js.jsx"
        }
      },
      end: "(?<=\\})",
      patterns: [
        {
          include: "#class-declaration-or-expression-patterns"
        }
      ]
    },
    "class-expression": {
      name: "meta.class.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(class)\\b(?=\\s+|[<{]|\\/[\\/*])",
      beginCaptures: {
        "1": {
          name: "storage.modifier.js.jsx"
        },
        "2": {
          name: "storage.type.class.js.jsx"
        }
      },
      end: "(?<=\\})",
      patterns: [
        {
          include: "#class-declaration-or-expression-patterns"
        }
      ]
    },
    "class-declaration-or-expression-patterns": {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#class-or-interface-heritage"
        },
        {
          match: "[_$[:alpha:]][_$[:alnum:]]*",
          captures: {
            "0": {
              name: "entity.name.type.class.js.jsx"
            }
          }
        },
        {
          include: "#type-parameters"
        },
        {
          include: "#class-or-interface-body"
        }
      ]
    },
    "interface-declaration": {
      name: "meta.interface.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(?:(abstract)\\s+)?\\b(interface)\\b(?=\\s+|/[/*])",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.js.jsx"
        },
        "2": {
          name: "storage.modifier.js.jsx"
        },
        "3": {
          name: "storage.modifier.js.jsx"
        },
        "4": {
          name: "storage.type.interface.js.jsx"
        }
      },
      end: "(?<=\\})",
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#class-or-interface-heritage"
        },
        {
          match: "[_$[:alpha:]][_$[:alnum:]]*",
          captures: {
            "0": {
              name: "entity.name.type.interface.js.jsx"
            }
          }
        },
        {
          include: "#type-parameters"
        },
        {
          include: "#class-or-interface-body"
        }
      ]
    },
    "class-or-interface-heritage": {
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(extends|implements)\\b)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "1": {
          name: "storage.modifier.js.jsx"
        }
      },
      end: "(?=\\{)",
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#class-or-interface-heritage"
        },
        {
          include: "#type-parameters"
        },
        {
          include: "#expressionWithoutIdentifiers"
        },
        {
          match: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))(?=\\s*[_$[:alpha:]][_$[:alnum:]]*(\\s*\\??\\.\\s*[_$[:alpha:]][_$[:alnum:]]*)*\\s*)",
          captures: {
            "1": {
              name: "entity.name.type.module.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.js.jsx"
            },
            "3": {
              name: "punctuation.accessor.optional.js.jsx"
            }
          }
        },
        {
          match: "([_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "entity.other.inherited-class.js.jsx"
            }
          }
        },
        {
          include: "#expressionPunctuations"
        }
      ]
    },
    "class-or-interface-body": {
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#decorator"
        },
        {
          begin: "(?<=:)\\s*",
          end: "(?=\\s|[;),}\\]:\\-\\+]|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
          patterns: [
            {
              include: "#expression"
            }
          ]
        },
        {
          include: "#method-declaration"
        },
        {
          include: "#indexer-declaration"
        },
        {
          include: "#field-declaration"
        },
        {
          include: "#string"
        },
        {
          include: "#type-annotation"
        },
        {
          include: "#variable-initializer"
        },
        {
          include: "#access-modifier"
        },
        {
          include: "#property-accessor"
        },
        {
          include: "#async-modifier"
        },
        {
          include: "#after-operator-block-as-object-literal"
        },
        {
          include: "#decl-block"
        },
        {
          include: "#expression"
        },
        {
          include: "#punctuation-comma"
        },
        {
          include: "#punctuation-semicolon"
        }
      ]
    },
    "access-modifier": {
      name: "storage.modifier.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(abstract|declare|override|public|protected|private|readonly|static)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "property-accessor": {
      name: "storage.type.property.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(accessor|get|set)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "async-modifier": {
      name: "storage.modifier.async.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(async)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "enum-declaration": {
      name: "meta.enum.declaration.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?(?:\\b(const)\\s+)?\\b(enum)\\s+([_$[:alpha:]][_$[:alnum:]]*)",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.js.jsx"
        },
        "2": {
          name: "storage.modifier.js.jsx"
        },
        "3": {
          name: "storage.modifier.js.jsx"
        },
        "4": {
          name: "storage.type.enum.js.jsx"
        },
        "5": {
          name: "entity.name.type.enum.js.jsx"
        }
      },
      end: "(?<=\\})",
      patterns: [
        {
          include: "#comment"
        },
        {
          begin: "\\{",
          beginCaptures: {
            "0": {
              name: "punctuation.definition.block.js.jsx"
            }
          },
          end: "\\}",
          endCaptures: {
            "0": {
              name: "punctuation.definition.block.js.jsx"
            }
          },
          patterns: [
            {
              include: "#comment"
            },
            {
              begin: "([_$[:alpha:]][_$[:alnum:]]*)",
              beginCaptures: {
                "0": {
                  name: "variable.other.enummember.js.jsx"
                }
              },
              end: "(?=,|\\}|$)",
              patterns: [
                {
                  include: "#comment"
                },
                {
                  include: "#variable-initializer"
                }
              ]
            },
            {
              begin: "(?=((\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\])))",
              end: "(?=,|\\}|$)",
              patterns: [
                {
                  include: "#string"
                },
                {
                  include: "#array-literal"
                },
                {
                  include: "#comment"
                },
                {
                  include: "#variable-initializer"
                }
              ]
            },
            {
              include: "#punctuation-comma"
            }
          ]
        }
      ]
    },
    "namespace-declaration": {
      name: "meta.namespace.declaration.js.jsx",
      begin: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(namespace|module)\\s+(?=[_$[:alpha:]\"'`]))",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.js.jsx"
        },
        "2": {
          name: "storage.modifier.js.jsx"
        },
        "3": {
          name: "storage.type.namespace.js.jsx"
        }
      },
      end: "(?<=\\})|(?=;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          name: "entity.name.type.module.js.jsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)"
        },
        {
          include: "#punctuation-accessor"
        },
        {
          include: "#decl-block"
        }
      ]
    },
    "type-alias-declaration": {
      name: "meta.type.declaration.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(type)\\b\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.js.jsx"
        },
        "2": {
          name: "storage.modifier.js.jsx"
        },
        "3": {
          name: "storage.type.type.js.jsx"
        },
        "4": {
          name: "entity.name.type.alias.js.jsx"
        }
      },
      end: "(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#type-parameters"
        },
        {
          begin: "(=)\\s*(intrinsic)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          beginCaptures: {
            "1": {
              name: "keyword.operator.assignment.js.jsx"
            },
            "2": {
              name: "keyword.control.intrinsic.js.jsx"
            }
          },
          end: "(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
          patterns: [
            {
              include: "#type"
            }
          ]
        },
        {
          begin: "(=)\\s*",
          beginCaptures: {
            "1": {
              name: "keyword.operator.assignment.js.jsx"
            }
          },
          end: "(?=\\}|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
          patterns: [
            {
              include: "#type"
            }
          ]
        }
      ]
    },
    "import-equals-declaration": {
      patterns: [
        {
          name: "meta.import-equals.external.js.jsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type))?\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(=)\\s*(require)\\s*(\\()",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.js.jsx"
            },
            "2": {
              name: "storage.modifier.js.jsx"
            },
            "3": {
              name: "keyword.control.import.js.jsx"
            },
            "4": {
              name: "keyword.control.type.js.jsx"
            },
            "5": {
              name: "variable.other.readwrite.alias.js.jsx"
            },
            "6": {
              name: "keyword.operator.assignment.js.jsx"
            },
            "7": {
              name: "keyword.control.require.js.jsx"
            },
            "8": {
              name: "meta.brace.round.js.jsx"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "meta.brace.round.js.jsx"
            }
          },
          patterns: [
            {
              include: "#comment"
            },
            {
              include: "#string"
            }
          ]
        },
        {
          name: "meta.import-equals.internal.js.jsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type))?\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(=)\\s*(?!require\\b)",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.js.jsx"
            },
            "2": {
              name: "storage.modifier.js.jsx"
            },
            "3": {
              name: "keyword.control.import.js.jsx"
            },
            "4": {
              name: "keyword.control.type.js.jsx"
            },
            "5": {
              name: "variable.other.readwrite.alias.js.jsx"
            },
            "6": {
              name: "keyword.operator.assignment.js.jsx"
            }
          },
          end: "(?=;|$|^)",
          patterns: [
            {
              include: "#single-line-comment-consuming-line-ending"
            },
            {
              include: "#comment"
            },
            {
              match: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))",
              captures: {
                "1": {
                  name: "entity.name.type.module.js.jsx"
                },
                "2": {
                  name: "punctuation.accessor.js.jsx"
                },
                "3": {
                  name: "punctuation.accessor.optional.js.jsx"
                }
              }
            },
            {
              name: "variable.other.readwrite.js.jsx",
              match: "([_$[:alpha:]][_$[:alnum:]]*)"
            }
          ]
        }
      ]
    },
    "import-declaration": {
      name: "meta.import.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type)(?!\\s+from))?(?!\\s*[:\\(])(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.js.jsx"
        },
        "2": {
          name: "storage.modifier.js.jsx"
        },
        "3": {
          name: "keyword.control.import.js.jsx"
        },
        "4": {
          name: "keyword.control.type.js.jsx"
        }
      },
      end: "(?<!^import|[^\\._$[:alnum:]]import)(?=;|$|^)",
      patterns: [
        {
          include: "#single-line-comment-consuming-line-ending"
        },
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          begin: `(?<=^import|[^\\._$[:alnum:]]import)(?!\\s*["'])`,
          end: "\\bfrom\\b",
          endCaptures: {
            "0": {
              name: "keyword.control.from.js.jsx"
            }
          },
          patterns: [
            {
              include: "#import-export-declaration"
            }
          ]
        },
        {
          include: "#import-export-declaration"
        }
      ]
    },
    "export-declaration": {
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)\\s+(as)\\s+(namespace)\\s+([_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "keyword.control.export.js.jsx"
            },
            "2": {
              name: "keyword.control.as.js.jsx"
            },
            "3": {
              name: "storage.type.namespace.js.jsx"
            },
            "4": {
              name: "entity.name.type.module.js.jsx"
            }
          }
        },
        {
          name: "meta.export.default.js.jsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)(?:\\s+(type))?(?:(?:\\s*(=))|(?:\\s+(default)(?=\\s+)))",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.js.jsx"
            },
            "2": {
              name: "keyword.control.type.js.jsx"
            },
            "3": {
              name: "keyword.operator.assignment.js.jsx"
            },
            "4": {
              name: "keyword.control.default.js.jsx"
            }
          },
          end: "(?=$|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
          patterns: [
            {
              include: "#interface-declaration"
            },
            {
              include: "#expression"
            }
          ]
        },
        {
          name: "meta.export.js.jsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)(?:\\s+(type))?\\b(?!(\\$)|(\\s*:))((?=\\s*[\\{*])|((?=\\s*[_$[:alpha:]][_$[:alnum:]]*(\\s|,))(?!\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b)))",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.js.jsx"
            },
            "2": {
              name: "keyword.control.type.js.jsx"
            }
          },
          end: "(?=$|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
          patterns: [
            {
              include: "#import-export-declaration"
            }
          ]
        }
      ]
    },
    "import-export-declaration": {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          include: "#import-export-block"
        },
        {
          name: "keyword.control.from.js.jsx",
          match: "\\bfrom\\b"
        },
        {
          include: "#import-export-assert-clause"
        },
        {
          include: "#import-export-clause"
        }
      ]
    },
    "import-export-assert-clause": {
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(assert)\\s*(\\{)",
      beginCaptures: {
        "1": {
          name: "keyword.control.assert.js.jsx"
        },
        "2": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          name: "meta.object-literal.key.js.jsx",
          match: "(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)"
        },
        {
          name: "punctuation.separator.key-value.js.jsx",
          match: ":"
        }
      ]
    },
    "import-export-block": {
      name: "meta.block.js.jsx",
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      patterns: [
        {
          include: "#import-export-clause"
        }
      ]
    },
    "import-export-clause": {
      patterns: [
        {
          include: "#comment"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(?:(\\btype)\\s+)?(?:(\\bdefault)|(\\*)|(\\b[_$[:alpha:]][_$[:alnum:]]*)))\\s+(as)\\s+(?:(default(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|([_$[:alpha:]][_$[:alnum:]]*))",
          captures: {
            "1": {
              name: "keyword.control.type.js.jsx"
            },
            "2": {
              name: "keyword.control.default.js.jsx"
            },
            "3": {
              name: "constant.language.import-export-all.js.jsx"
            },
            "4": {
              name: "variable.other.readwrite.js.jsx"
            },
            "5": {
              name: "keyword.control.as.js.jsx"
            },
            "6": {
              name: "keyword.control.default.js.jsx"
            },
            "7": {
              name: "variable.other.readwrite.alias.js.jsx"
            }
          }
        },
        {
          include: "#punctuation-comma"
        },
        {
          name: "constant.language.import-export-all.js.jsx",
          match: "\\*"
        },
        {
          name: "keyword.control.default.js.jsx",
          match: "\\b(default)\\b"
        },
        {
          match: "(?:(\\btype)\\s+)?([_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "keyword.control.type.js.jsx"
            },
            "2": {
              name: "variable.other.readwrite.alias.js.jsx"
            }
          }
        }
      ]
    },
    "switch-statement": {
      name: "switch-statement.expr.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bswitch\\s*\\()",
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      patterns: [
        {
          include: "#comment"
        },
        {
          name: "switch-expression.expr.js.jsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(switch)\\s*(\\()",
          beginCaptures: {
            "1": {
              name: "keyword.control.switch.js.jsx"
            },
            "2": {
              name: "meta.brace.round.js.jsx"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "meta.brace.round.js.jsx"
            }
          },
          patterns: [
            {
              include: "#expression"
            }
          ]
        },
        {
          name: "switch-block.expr.js.jsx",
          begin: "\\{",
          beginCaptures: {
            "0": {
              name: "punctuation.definition.block.js.jsx"
            }
          },
          end: "(?=\\})",
          patterns: [
            {
              name: "case-clause.expr.js.jsx",
              begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default(?=:))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
              beginCaptures: {
                "1": {
                  name: "keyword.control.switch.js.jsx"
                }
              },
              end: "(?=:)",
              patterns: [
                {
                  include: "#expression"
                }
              ]
            },
            {
              begin: "(:)\\s*(\\{)",
              beginCaptures: {
                "1": {
                  name: "case-clause.expr.js.jsx punctuation.definition.section.case-statement.js.jsx"
                },
                "2": {
                  name: "meta.block.js.jsx punctuation.definition.block.js.jsx"
                }
              },
              end: "\\}",
              endCaptures: {
                "0": {
                  name: "meta.block.js.jsx punctuation.definition.block.js.jsx"
                }
              },
              contentName: "meta.block.js.jsx",
              patterns: [
                {
                  include: "#statements"
                }
              ]
            },
            {
              match: "(:)",
              captures: {
                "0": {
                  name: "case-clause.expr.js.jsx punctuation.definition.section.case-statement.js.jsx"
                }
              }
            },
            {
              include: "#statements"
            }
          ]
        }
      ]
    },
    "for-loop": {
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))for(?=((\\s+|(\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*))await)?\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)?(\\())",
      beginCaptures: {
        "0": {
          name: "keyword.control.loop.js.jsx"
        }
      },
      end: "(?<=\\))",
      patterns: [
        {
          include: "#comment"
        },
        {
          name: "keyword.control.loop.js.jsx",
          match: "await"
        },
        {
          begin: "\\(",
          beginCaptures: {
            "0": {
              name: "meta.brace.round.js.jsx"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "meta.brace.round.js.jsx"
            }
          },
          patterns: [
            {
              include: "#var-expr"
            },
            {
              include: "#expression"
            },
            {
              include: "#punctuation-semicolon"
            }
          ]
        }
      ]
    },
    "if-statement": {
      patterns: [
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bif\\s*(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))\\s*(?!\\{))",
          end: "(?=;|$|\\})",
          patterns: [
            {
              include: "#comment"
            },
            {
              begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(if)\\s*(\\()",
              beginCaptures: {
                "1": {
                  name: "keyword.control.conditional.js.jsx"
                },
                "2": {
                  name: "meta.brace.round.js.jsx"
                }
              },
              end: "\\)",
              endCaptures: {
                "0": {
                  name: "meta.brace.round.js.jsx"
                }
              },
              patterns: [
                {
                  include: "#expression"
                }
              ]
            },
            {
              name: "string.regexp.js.jsx",
              begin: "(?<=\\))\\s*\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
              beginCaptures: {
                "0": {
                  name: "punctuation.definition.string.begin.js.jsx"
                }
              },
              end: "(/)([dgimsuy]*)",
              endCaptures: {
                "1": {
                  name: "punctuation.definition.string.end.js.jsx"
                },
                "2": {
                  name: "keyword.other.js.jsx"
                }
              },
              patterns: [
                {
                  include: "#regexp"
                }
              ]
            },
            {
              include: "#statements"
            }
          ]
        }
      ]
    },
    "decl-block": {
      name: "meta.block.js.jsx",
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      patterns: [
        {
          include: "#statements"
        }
      ]
    },
    "after-operator-block-as-object-literal": {
      name: "meta.objectliteral.js.jsx",
      begin: "(?<!\\+\\+|--)(?<=[:=(,\\[?+!>]|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^yield|[^\\._$[:alnum:]]yield|^throw|[^\\._$[:alnum:]]throw|^in|[^\\._$[:alnum:]]in|^of|[^\\._$[:alnum:]]of|^typeof|[^\\._$[:alnum:]]typeof|&&|\\|\\||\\*)\\s*(\\{)",
      beginCaptures: {
        "1": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      patterns: [
        {
          include: "#object-member"
        }
      ]
    },
    "object-literal": {
      name: "meta.objectliteral.js.jsx",
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      patterns: [
        {
          include: "#object-member"
        }
      ]
    },
    "object-member": {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#object-literal-method-declaration"
        },
        {
          name: "meta.object.member.js.jsx meta.object-literal.key.js.jsx",
          begin: "(?=\\[)",
          end: "(?=:)|((?<=[\\]])(?=\\s*[\\(\\<]))",
          patterns: [
            {
              include: "#comment"
            },
            {
              include: "#array-literal"
            }
          ]
        },
        {
          name: "meta.object.member.js.jsx meta.object-literal.key.js.jsx",
          begin: "(?=[\\'\\\"\\`])",
          end: "(?=:)|((?<=[\\'\\\"\\`])(?=((\\s*[\\(\\<,}])|(\\s+(as|satisifies)\\s+))))",
          patterns: [
            {
              include: "#comment"
            },
            {
              include: "#string"
            }
          ]
        },
        {
          name: "meta.object.member.js.jsx meta.object-literal.key.js.jsx",
          begin: "(?x)(?=(\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$)))",
          end: "(?=:)|(?=\\s*([\\(\\<,}])|(\\s+as|satisifies\\s+))",
          patterns: [
            {
              include: "#comment"
            },
            {
              include: "#numeric-literal"
            }
          ]
        },
        {
          name: "meta.method.declaration.js.jsx",
          begin: "(?<=[\\]\\'\\\"\\`])(?=\\s*[\\(\\<])",
          end: "(?=\\}|;|,)|(?<=\\})",
          patterns: [
            {
              include: "#function-body"
            }
          ]
        },
        {
          name: "meta.object.member.js.jsx",
          match: "(?![_$[:alpha:]])([[:digit:]]+)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)",
          captures: {
            "0": {
              name: "meta.object-literal.key.js.jsx"
            },
            "1": {
              name: "constant.numeric.decimal.js.jsx"
            }
          }
        },
        {
          name: "meta.object.member.js.jsx",
          match: "(?x)(?:([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:(\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/)*\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "0": {
              name: "meta.object-literal.key.js.jsx"
            },
            "1": {
              name: "entity.name.function.js.jsx"
            }
          }
        },
        {
          name: "meta.object.member.js.jsx",
          match: "(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)",
          captures: {
            "0": {
              name: "meta.object-literal.key.js.jsx"
            }
          }
        },
        {
          name: "meta.object.member.js.jsx",
          begin: "\\.\\.\\.",
          beginCaptures: {
            "0": {
              name: "keyword.operator.spread.js.jsx"
            }
          },
          end: "(?=,|\\})",
          patterns: [
            {
              include: "#expression"
            }
          ]
        },
        {
          name: "meta.object.member.js.jsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=,|\\}|$|\\/\\/|\\/\\*)",
          captures: {
            "1": {
              name: "variable.other.readwrite.js.jsx"
            }
          }
        },
        {
          name: "meta.object.member.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*([,}]|$))",
          captures: {
            "1": {
              name: "keyword.control.as.js.jsx"
            },
            "2": {
              name: "storage.modifier.js.jsx"
            }
          }
        },
        {
          name: "meta.object.member.js.jsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(as)|(satisfies))\\s+",
          beginCaptures: {
            "1": {
              name: "keyword.control.as.js.jsx"
            },
            "2": {
              name: "keyword.control.satisfies.js.jsx"
            }
          },
          end: "(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|^|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as|satisifies)\\s+))",
          patterns: [
            {
              include: "#type"
            }
          ]
        },
        {
          name: "meta.object.member.js.jsx",
          begin: "(?=[_$[:alpha:]][_$[:alnum:]]*\\s*=)",
          end: "(?=,|\\}|$|\\/\\/|\\/\\*)",
          patterns: [
            {
              include: "#expression"
            }
          ]
        },
        {
          name: "meta.object.member.js.jsx",
          begin: ":",
          beginCaptures: {
            "0": {
              name: "meta.object-literal.key.js.jsx punctuation.separator.key-value.js.jsx"
            }
          },
          end: "(?=,|\\})",
          patterns: [
            {
              begin: "(?<=:)\\s*(async)?(?=\\s*(<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)\\(\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
              beginCaptures: {
                "1": {
                  name: "storage.modifier.async.js.jsx"
                }
              },
              end: "(?<=\\))",
              patterns: [
                {
                  include: "#type-parameters"
                },
                {
                  begin: "\\(",
                  beginCaptures: {
                    "0": {
                      name: "meta.brace.round.js.jsx"
                    }
                  },
                  end: "\\)",
                  endCaptures: {
                    "0": {
                      name: "meta.brace.round.js.jsx"
                    }
                  },
                  patterns: [
                    {
                      include: "#expression-inside-possibly-arrow-parens"
                    }
                  ]
                }
              ]
            },
            {
              begin: "(?<=:)\\s*(async)?\\s*(\\()(?=\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
              beginCaptures: {
                "1": {
                  name: "storage.modifier.async.js.jsx"
                },
                "2": {
                  name: "meta.brace.round.js.jsx"
                }
              },
              end: "\\)",
              endCaptures: {
                "0": {
                  name: "meta.brace.round.js.jsx"
                }
              },
              patterns: [
                {
                  include: "#expression-inside-possibly-arrow-parens"
                }
              ]
            },
            {
              begin: "(?<=:)\\s*(async)?\\s*(?=\\<\\s*$)",
              beginCaptures: {
                "1": {
                  name: "storage.modifier.async.js.jsx"
                }
              },
              end: "(?<=\\>)",
              patterns: [
                {
                  include: "#type-parameters"
                }
              ]
            },
            {
              begin: "(?<=\\>)\\s*(\\()(?=\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
              beginCaptures: {
                "1": {
                  name: "meta.brace.round.js.jsx"
                }
              },
              end: "\\)",
              endCaptures: {
                "0": {
                  name: "meta.brace.round.js.jsx"
                }
              },
              patterns: [
                {
                  include: "#expression-inside-possibly-arrow-parens"
                }
              ]
            },
            {
              include: "#possibly-arrow-return-type"
            },
            {
              include: "#expression"
            }
          ]
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "ternary-expression": {
      begin: "(?!\\?\\.\\s*[^[:digit:]])(\\?)(?!\\?)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.ternary.js.jsx"
        }
      },
      end: "\\s*(:)",
      endCaptures: {
        "1": {
          name: "keyword.operator.ternary.js.jsx"
        }
      },
      patterns: [
        {
          include: "#expression"
        }
      ]
    },
    "function-call": {
      patterns: [
        {
          begin: "(?=(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())",
          end: "(?<=\\))(?!(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())",
          patterns: [
            {
              name: "meta.function-call.js.jsx",
              begin: "(?=(([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))",
              end: "(?=\\s*(?:(\\?\\.\\s*)|(\\!))?((<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?\\())",
              patterns: [
                {
                  include: "#function-call-target"
                }
              ]
            },
            {
              include: "#comment"
            },
            {
              include: "#function-call-optionals"
            },
            {
              include: "#type-arguments"
            },
            {
              include: "#paren-expression"
            }
          ]
        },
        {
          begin: "(?=(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))(<\\s*[\\{\\[\\(]\\s*$))",
          end: "(?<=\\>)(?!(((([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))|(?<=[\\)]))(<\\s*[\\{\\[\\(]\\s*$))",
          patterns: [
            {
              name: "meta.function-call.js.jsx",
              begin: "(?=(([_$[:alpha:]][_$[:alnum:]]*)(\\s*\\??\\.\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*))*)|(\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*))",
              end: "(?=(<\\s*[\\{\\[\\(]\\s*$))",
              patterns: [
                {
                  include: "#function-call-target"
                }
              ]
            },
            {
              include: "#comment"
            },
            {
              include: "#function-call-optionals"
            },
            {
              include: "#type-arguments"
            }
          ]
        }
      ]
    },
    "function-call-target": {
      patterns: [
        {
          include: "#support-function-call-identifiers"
        },
        {
          name: "entity.name.function.js.jsx",
          match: "(\\#?[_$[:alpha:]][_$[:alnum:]]*)"
        }
      ]
    },
    "function-call-optionals": {
      patterns: [
        {
          name: "meta.function-call.js.jsx punctuation.accessor.optional.js.jsx",
          match: "\\?\\."
        },
        {
          name: "meta.function-call.js.jsx keyword.operator.definiteassignment.js.jsx",
          match: "\\!"
        }
      ]
    },
    "support-function-call-identifiers": {
      patterns: [
        {
          include: "#literal"
        },
        {
          include: "#support-objects"
        },
        {
          include: "#object-identifiers"
        },
        {
          include: "#punctuation-accessor"
        },
        {
          name: "keyword.operator.expression.import.js.jsx",
          match: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))import(?=\\s*[\\(]\\s*[\\\"\\'\\`]))"
        }
      ]
    },
    "new-expr": {
      name: "new.expr.js.jsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(new)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "1": {
          name: "keyword.operator.new.js.jsx"
        }
      },
      end: "(?<=\\))|(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))new(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))function((\\s+[_$[:alpha:]][_$[:alnum:]]*)|(\\s*[\\(]))))",
      patterns: [
        {
          include: "#expression"
        }
      ]
    },
    "instanceof-expr": {
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(instanceof)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "1": {
          name: "keyword.operator.expression.instanceof.js.jsx"
        }
      },
      end: "(?<=\\))|(?=[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|(===|!==|==|!=)|(([\\&\\~\\^\\|]\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s+instanceof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))function((\\s+[_$[:alpha:]][_$[:alnum:]]*)|(\\s*[\\(]))))",
      patterns: [
        {
          include: "#type"
        }
      ]
    },
    "paren-expression-possibly-arrow": {
      patterns: [
        {
          begin: "(?<=[(=,])\\s*(async)?(?=\\s*((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?\\(\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
          beginCaptures: {
            "1": {
              name: "storage.modifier.async.js.jsx"
            }
          },
          end: "(?<=\\))",
          patterns: [
            {
              include: "#paren-expression-possibly-arrow-with-typeparameters"
            }
          ]
        },
        {
          begin: "(?<=[(=,]|=>|^return|[^\\._$[:alnum:]]return)\\s*(async)?(?=\\s*((((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?\\()|(<)|((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)))\\s*$)",
          beginCaptures: {
            "1": {
              name: "storage.modifier.async.js.jsx"
            }
          },
          end: "(?<=\\))",
          patterns: [
            {
              include: "#paren-expression-possibly-arrow-with-typeparameters"
            }
          ]
        },
        {
          include: "#possibly-arrow-return-type"
        }
      ]
    },
    "paren-expression-possibly-arrow-with-typeparameters": {
      patterns: [
        {
          include: "#type-parameters"
        },
        {
          begin: "\\(",
          beginCaptures: {
            "0": {
              name: "meta.brace.round.js.jsx"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "meta.brace.round.js.jsx"
            }
          },
          patterns: [
            {
              include: "#expression-inside-possibly-arrow-parens"
            }
          ]
        }
      ]
    },
    "expression-inside-possibly-arrow-parens": {
      patterns: [
        {
          include: "#expressionWithoutIdentifiers"
        },
        {
          include: "#comment"
        },
        {
          include: "#string"
        },
        {
          include: "#decorator"
        },
        {
          include: "#destructuring-parameter"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|protected|private|readonly)\\s+(?=(override|public|protected|private|readonly)\\s+)",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "keyword.operator.rest.js.jsx"
            },
            "3": {
              name: "entity.name.function.js.jsx variable.language.this.js.jsx"
            },
            "4": {
              name: "entity.name.function.js.jsx"
            },
            "5": {
              name: "keyword.operator.optional.js.jsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*[:,]|$)",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "keyword.operator.rest.js.jsx"
            },
            "3": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx"
            },
            "4": {
              name: "variable.parameter.js.jsx"
            },
            "5": {
              name: "keyword.operator.optional.js.jsx"
            }
          }
        },
        {
          include: "#type-annotation"
        },
        {
          include: "#variable-initializer"
        },
        {
          name: "punctuation.separator.parameter.js.jsx",
          match: ","
        },
        {
          include: "#identifiers"
        },
        {
          include: "#expressionPunctuations"
        }
      ]
    },
    "paren-expression": {
      begin: "\\(",
      beginCaptures: {
        "0": {
          name: "meta.brace.round.js.jsx"
        }
      },
      end: "\\)",
      endCaptures: {
        "0": {
          name: "meta.brace.round.js.jsx"
        }
      },
      patterns: [
        {
          include: "#expression"
        }
      ]
    },
    cast: {
      patterns: [
        {
          include: "#jsx"
        }
      ]
    },
    "expression-operators": {
      patterns: [
        {
          name: "keyword.control.flow.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(await)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(yield)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?=\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*\\*)",
          beginCaptures: {
            "1": {
              name: "keyword.control.flow.js.jsx"
            }
          },
          end: "\\*",
          endCaptures: {
            "0": {
              name: "keyword.generator.asterisk.js.jsx"
            }
          },
          patterns: [
            {
              include: "#comment"
            }
          ]
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(yield)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?:\\s*(\\*))?",
          captures: {
            "1": {
              name: "keyword.control.flow.js.jsx"
            },
            "2": {
              name: "keyword.generator.asterisk.js.jsx"
            }
          }
        },
        {
          name: "keyword.operator.expression.delete.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))delete(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.operator.expression.in.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))in(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?!\\()"
        },
        {
          name: "keyword.operator.expression.of.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))of(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?!\\()"
        },
        {
          name: "keyword.operator.expression.instanceof.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))instanceof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.operator.new.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))new(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          include: "#typeof-operator"
        },
        {
          name: "keyword.operator.expression.void.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))void(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*($|[;,:})\\]]))",
          captures: {
            "1": {
              name: "keyword.control.as.js.jsx"
            },
            "2": {
              name: "storage.modifier.js.jsx"
            }
          }
        },
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(as)|(satisfies))\\s+",
          beginCaptures: {
            "1": {
              name: "keyword.control.as.js.jsx"
            },
            "2": {
              name: "keyword.control.satisfies.js.jsx"
            }
          },
          end: "(?=^|[;),}\\]:?\\-\\+\\>]|\\|\\||\\&\\&|\\!\\=\\=|$|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as|satisifies)\\s+)|(\\s+\\<))",
          patterns: [
            {
              include: "#type"
            }
          ]
        },
        {
          name: "keyword.operator.spread.js.jsx",
          match: "\\.\\.\\."
        },
        {
          name: "keyword.operator.assignment.compound.js.jsx",
          match: "\\*=|(?<!\\()/=|%=|\\+=|\\-="
        },
        {
          name: "keyword.operator.assignment.compound.bitwise.js.jsx",
          match: "\\&=|\\^=|<<=|>>=|>>>=|\\|="
        },
        {
          name: "keyword.operator.bitwise.shift.js.jsx",
          match: "<<|>>>|>>"
        },
        {
          name: "keyword.operator.comparison.js.jsx",
          match: "===|!==|==|!="
        },
        {
          name: "keyword.operator.relational.js.jsx",
          match: "<=|>=|<>|<|>"
        },
        {
          match: "(?<=[_$[:alnum:]])(\\!)\\s*(?:(/=)|(?:(/)(?![/*])))",
          captures: {
            "1": {
              name: "keyword.operator.logical.js.jsx"
            },
            "2": {
              name: "keyword.operator.assignment.compound.js.jsx"
            },
            "3": {
              name: "keyword.operator.arithmetic.js.jsx"
            }
          }
        },
        {
          name: "keyword.operator.logical.js.jsx",
          match: "\\!|&&|\\|\\||\\?\\?"
        },
        {
          name: "keyword.operator.bitwise.js.jsx",
          match: "\\&|~|\\^|\\|"
        },
        {
          name: "keyword.operator.assignment.js.jsx",
          match: "\\="
        },
        {
          name: "keyword.operator.decrement.js.jsx",
          match: "--"
        },
        {
          name: "keyword.operator.increment.js.jsx",
          match: "\\+\\+"
        },
        {
          name: "keyword.operator.arithmetic.js.jsx",
          match: "%|\\*|/|-|\\+"
        },
        {
          begin: "(?<=[_$[:alnum:])\\]])\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)+(?:(/=)|(?:(/)(?![/*]))))",
          end: "(?:(/=)|(?:(/)(?!\\*([^\\*]|(\\*[^\\/]))*\\*\\/)))",
          endCaptures: {
            "1": {
              name: "keyword.operator.assignment.compound.js.jsx"
            },
            "2": {
              name: "keyword.operator.arithmetic.js.jsx"
            }
          },
          patterns: [
            {
              include: "#comment"
            }
          ]
        },
        {
          match: "(?<=[_$[:alnum:])\\]])\\s*(?:(/=)|(?:(/)(?![/*])))",
          captures: {
            "1": {
              name: "keyword.operator.assignment.compound.js.jsx"
            },
            "2": {
              name: "keyword.operator.arithmetic.js.jsx"
            }
          }
        }
      ]
    },
    "typeof-operator": {
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))typeof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "0": {
          name: "keyword.operator.expression.typeof.js.jsx"
        }
      },
      end: "(?=[,);}\\]=>:&|{\\?]|$|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))",
      patterns: [
        {
          include: "#expression"
        }
      ]
    },
    literal: {
      patterns: [
        {
          include: "#numeric-literal"
        },
        {
          include: "#boolean-literal"
        },
        {
          include: "#null-literal"
        },
        {
          include: "#undefined-literal"
        },
        {
          include: "#numericConstant-literal"
        },
        {
          include: "#array-literal"
        },
        {
          include: "#this-literal"
        },
        {
          include: "#super-literal"
        }
      ]
    },
    "array-literal": {
      name: "meta.array.literal.js.jsx",
      begin: "\\s*(\\[)",
      beginCaptures: {
        "1": {
          name: "meta.brace.square.js.jsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "meta.brace.square.js.jsx"
        }
      },
      patterns: [
        {
          include: "#expression"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "numeric-literal": {
      patterns: [
        {
          name: "constant.numeric.hex.js.jsx",
          match: "\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$)",
          captures: {
            "1": {
              name: "storage.type.numeric.bigint.js.jsx"
            }
          }
        },
        {
          name: "constant.numeric.binary.js.jsx",
          match: "\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$)",
          captures: {
            "1": {
              name: "storage.type.numeric.bigint.js.jsx"
            }
          }
        },
        {
          name: "constant.numeric.octal.js.jsx",
          match: "\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$)",
          captures: {
            "1": {
              name: "storage.type.numeric.bigint.js.jsx"
            }
          }
        },
        {
          match: "(?x)\n(?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$)",
          captures: {
            "0": {
              name: "constant.numeric.decimal.js.jsx"
            },
            "1": {
              name: "meta.delimiter.decimal.period.js.jsx"
            },
            "2": {
              name: "storage.type.numeric.bigint.js.jsx"
            },
            "3": {
              name: "meta.delimiter.decimal.period.js.jsx"
            },
            "4": {
              name: "storage.type.numeric.bigint.js.jsx"
            },
            "5": {
              name: "meta.delimiter.decimal.period.js.jsx"
            },
            "6": {
              name: "storage.type.numeric.bigint.js.jsx"
            },
            "7": {
              name: "storage.type.numeric.bigint.js.jsx"
            },
            "8": {
              name: "meta.delimiter.decimal.period.js.jsx"
            },
            "9": {
              name: "storage.type.numeric.bigint.js.jsx"
            },
            "10": {
              name: "meta.delimiter.decimal.period.js.jsx"
            },
            "11": {
              name: "storage.type.numeric.bigint.js.jsx"
            },
            "12": {
              name: "meta.delimiter.decimal.period.js.jsx"
            },
            "13": {
              name: "storage.type.numeric.bigint.js.jsx"
            },
            "14": {
              name: "storage.type.numeric.bigint.js.jsx"
            }
          }
        }
      ]
    },
    "boolean-literal": {
      patterns: [
        {
          name: "constant.language.boolean.true.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))true(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "constant.language.boolean.false.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))false(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        }
      ]
    },
    "null-literal": {
      name: "constant.language.null.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))null(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "this-literal": {
      name: "variable.language.this.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))this\\b(?!\\$)"
    },
    "super-literal": {
      name: "variable.language.super.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))super\\b(?!\\$)"
    },
    "undefined-literal": {
      name: "constant.language.undefined.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))undefined(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "numericConstant-literal": {
      patterns: [
        {
          name: "constant.language.nan.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))NaN(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "constant.language.infinity.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Infinity(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        }
      ]
    },
    "support-objects": {
      patterns: [
        {
          name: "variable.language.arguments.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(arguments)\\b(?!\\$)"
        },
        {
          name: "support.class.promise.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(Promise)\\b(?!\\$)"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(import)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(meta)\\b(?!\\$)",
          captures: {
            "1": {
              name: "keyword.control.import.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.js.jsx"
            },
            "3": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "4": {
              name: "support.variable.property.importmeta.js.jsx"
            }
          }
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(new)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(target)\\b(?!\\$)",
          captures: {
            "1": {
              name: "keyword.operator.new.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.js.jsx"
            },
            "3": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "4": {
              name: "support.variable.property.target.js.jsx"
            }
          }
        },
        {
          match: "(?x) (?:(\\.)|(\\?\\.(?!\\s*[[:digit:]]))) \\s* (?:\n  (?:(constructor|length|prototype|__proto__)\\b(?!\\$|\\s*(<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\\())\n  |\n  (?:(EPSILON|MAX_SAFE_INTEGER|MAX_VALUE|MIN_SAFE_INTEGER|MIN_VALUE|NEGATIVE_INFINITY|POSITIVE_INFINITY)\\b(?!\\$)))",
          captures: {
            "1": {
              name: "punctuation.accessor.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "3": {
              name: "support.variable.property.js.jsx"
            },
            "4": {
              name: "support.constant.js.jsx"
            }
          }
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(exports)|(module)(?:(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))(exports|id|filename|loaded|parent|children))?)\\b(?!\\$)",
          captures: {
            "1": {
              name: "support.type.object.module.js.jsx"
            },
            "2": {
              name: "support.type.object.module.js.jsx"
            },
            "3": {
              name: "punctuation.accessor.js.jsx"
            },
            "4": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "5": {
              name: "support.type.object.module.js.jsx"
            }
          }
        }
      ]
    },
    identifiers: {
      patterns: [
        {
          include: "#object-identifiers"
        },
        {
          match: "(?x)(?:(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*)?([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n))",
          captures: {
            "1": {
              name: "punctuation.accessor.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "3": {
              name: "entity.name.function.js.jsx"
            }
          }
        },
        {
          match: "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])",
          captures: {
            "1": {
              name: "punctuation.accessor.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "3": {
              name: "variable.other.constant.property.js.jsx"
            }
          }
        },
        {
          match: "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "punctuation.accessor.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "3": {
              name: "variable.other.property.js.jsx"
            }
          }
        },
        {
          name: "variable.other.constant.js.jsx",
          match: "([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])"
        },
        {
          name: "variable.other.readwrite.js.jsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*"
        }
      ]
    },
    "object-identifiers": {
      patterns: [
        {
          name: "support.class.js.jsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*\\??\\.\\s*prototype\\b(?!\\$))"
        },
        {
          match: "(?x)(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(?:\n  (\\#?[[:upper:]][_$[:digit:][:upper:]]*) |\n  (\\#?[_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "punctuation.accessor.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "3": {
              name: "variable.other.constant.object.property.js.jsx"
            },
            "4": {
              name: "variable.other.object.property.js.jsx"
            }
          }
        },
        {
          match: "(?x)(?:\n  ([[:upper:]][_$[:digit:][:upper:]]*) |\n  ([_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "variable.other.constant.object.js.jsx"
            },
            "2": {
              name: "variable.other.object.js.jsx"
            }
          }
        }
      ]
    },
    "type-annotation": {
      patterns: [
        {
          name: "meta.type.annotation.js.jsx",
          begin: "(:)(?=\\s*\\S)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.js.jsx"
            }
          },
          end: "(?<![:|&])((?=$|^|[,);\\}\\]]|//)|(?==[^>])|((?<=[\\}>\\]\\)]|[_$[:alpha:]])\\s*(?=\\{)))",
          patterns: [
            {
              include: "#type"
            }
          ]
        },
        {
          name: "meta.type.annotation.js.jsx",
          begin: "(:)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.js.jsx"
            }
          },
          end: "(?<![:|&])((?=[,);\\}\\]]|//)|(?==[^>])|(?=^\\s*$)|((?<=\\S)(?=\\s*$))|((?<=[\\}>\\]\\)]|[_$[:alpha:]])\\s*(?=\\{)))",
          patterns: [
            {
              include: "#type"
            }
          ]
        }
      ]
    },
    "parameter-type-annotation": {
      patterns: [
        {
          name: "meta.type.annotation.js.jsx",
          begin: "(:)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.js.jsx"
            }
          },
          end: "(?=[,)])|(?==[^>])",
          patterns: [
            {
              include: "#type"
            }
          ]
        }
      ]
    },
    "return-type": {
      patterns: [
        {
          name: "meta.return.type.js.jsx",
          begin: "(?<=\\))\\s*(:)(?=\\s*\\S)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.js.jsx"
            }
          },
          end: "(?<![:|&])(?=$|^|[{};,]|//)",
          patterns: [
            {
              include: "#return-type-core"
            }
          ]
        },
        {
          name: "meta.return.type.js.jsx",
          begin: "(?<=\\))\\s*(:)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.js.jsx"
            }
          },
          end: "(?<![:|&])((?=[{};,]|//|^\\s*$)|((?<=\\S)(?=\\s*$)))",
          patterns: [
            {
              include: "#return-type-core"
            }
          ]
        }
      ]
    },
    "return-type-core": {
      patterns: [
        {
          include: "#comment"
        },
        {
          begin: "(?<=[:|&])(?=\\s*\\{)",
          end: "(?<=\\})",
          patterns: [
            {
              include: "#type-object"
            }
          ]
        },
        {
          include: "#type-predicate-operator"
        },
        {
          include: "#type"
        }
      ]
    },
    "arrow-return-type": {
      name: "meta.return.type.arrow.js.jsx",
      begin: "(?<=\\))\\s*(:)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.type.annotation.js.jsx"
        }
      },
      end: "(?==>|\\{|(^\\s*(export|function|class|interface|let|var|const|import|enum|namespace|module|type|abstract|declare)\\s+))",
      patterns: [
        {
          include: "#arrow-return-type-body"
        }
      ]
    },
    "possibly-arrow-return-type": {
      begin: "(?<=\\)|^)\\s*(:)(?=\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*=>)",
      beginCaptures: {
        "1": {
          name: "meta.arrow.js.jsx meta.return.type.arrow.js.jsx keyword.operator.type.annotation.js.jsx"
        }
      },
      end: "(?==>|\\{|(^\\s*(export|function|class|interface|let|var|const|import|enum|namespace|module|type|abstract|declare)\\s+))",
      contentName: "meta.arrow.js.jsx meta.return.type.arrow.js.jsx",
      patterns: [
        {
          include: "#arrow-return-type-body"
        }
      ]
    },
    "arrow-return-type-body": {
      patterns: [
        {
          begin: "(?<=[:])(?=\\s*\\{)",
          end: "(?<=\\})",
          patterns: [
            {
              include: "#type-object"
            }
          ]
        },
        {
          include: "#type-predicate-operator"
        },
        {
          include: "#type"
        }
      ]
    },
    "type-parameters": {
      name: "meta.type.parameters.js.jsx",
      begin: "(<)",
      beginCaptures: {
        "1": {
          name: "punctuation.definition.typeparameters.begin.js.jsx"
        }
      },
      end: "(>)",
      endCaptures: {
        "1": {
          name: "punctuation.definition.typeparameters.end.js.jsx"
        }
      },
      patterns: [
        {
          include: "#comment"
        },
        {
          name: "storage.modifier.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(extends|in|out)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          include: "#type"
        },
        {
          include: "#punctuation-comma"
        },
        {
          name: "keyword.operator.assignment.js.jsx",
          match: "(=)(?!>)"
        }
      ]
    },
    "type-arguments": {
      name: "meta.type.parameters.js.jsx",
      begin: "\\<",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.typeparameters.begin.js.jsx"
        }
      },
      end: "\\>",
      endCaptures: {
        "0": {
          name: "punctuation.definition.typeparameters.end.js.jsx"
        }
      },
      patterns: [
        {
          include: "#type-arguments-body"
        }
      ]
    },
    "type-arguments-body": {
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(_)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "0": {
              name: "keyword.operator.type.js.jsx"
            }
          }
        },
        {
          include: "#type"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    type: {
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#type-string"
        },
        {
          include: "#numeric-literal"
        },
        {
          include: "#type-primitive"
        },
        {
          include: "#type-builtin-literals"
        },
        {
          include: "#type-parameters"
        },
        {
          include: "#type-tuple"
        },
        {
          include: "#type-object"
        },
        {
          include: "#type-operators"
        },
        {
          include: "#type-conditional"
        },
        {
          include: "#type-fn-type-parameters"
        },
        {
          include: "#type-paren-or-function-parameters"
        },
        {
          include: "#type-function-return-type"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            }
          }
        },
        {
          include: "#type-name"
        }
      ]
    },
    "type-primitive": {
      name: "support.type.primitive.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(string|number|bigint|boolean|symbol|any|void|never|unknown)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "type-builtin-literals": {
      name: "support.type.builtin.js.jsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(this|true|false|undefined|null|object)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "type-tuple": {
      name: "meta.type.tuple.js.jsx",
      begin: "\\[",
      beginCaptures: {
        "0": {
          name: "meta.brace.square.js.jsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "meta.brace.square.js.jsx"
        }
      },
      patterns: [
        {
          name: "keyword.operator.rest.js.jsx",
          match: "\\.\\.\\."
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([_$[:alpha:]][_$[:alnum:]]*)\\s*(\\?)?\\s*(:)",
          captures: {
            "1": {
              name: "entity.name.label.js.jsx"
            },
            "2": {
              name: "keyword.operator.optional.js.jsx"
            },
            "3": {
              name: "punctuation.separator.label.js.jsx"
            }
          }
        },
        {
          include: "#type"
        },
        {
          include: "#punctuation-comma"
        }
      ]
    },
    "type-object": {
      name: "meta.object.type.js.jsx",
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.js.jsx"
        }
      },
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#method-declaration"
        },
        {
          include: "#indexer-declaration"
        },
        {
          include: "#indexer-mapped-type-declaration"
        },
        {
          include: "#field-declaration"
        },
        {
          include: "#type-annotation"
        },
        {
          begin: "\\.\\.\\.",
          beginCaptures: {
            "0": {
              name: "keyword.operator.spread.js.jsx"
            }
          },
          end: "(?=\\}|;|,|$)|(?<=\\})",
          patterns: [
            {
              include: "#type"
            }
          ]
        },
        {
          include: "#punctuation-comma"
        },
        {
          include: "#punctuation-semicolon"
        },
        {
          include: "#type"
        }
      ]
    },
    "type-conditional": {
      patterns: [
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(extends)\\s+",
          beginCaptures: {
            "1": {
              name: "storage.modifier.js.jsx"
            }
          },
          end: "(?<=:)",
          patterns: [
            {
              begin: "\\?",
              beginCaptures: {
                "0": {
                  name: "keyword.operator.ternary.js.jsx"
                }
              },
              end: ":",
              endCaptures: {
                "0": {
                  name: "keyword.operator.ternary.js.jsx"
                }
              },
              patterns: [
                {
                  include: "#type"
                }
              ]
            },
            {
              include: "#type"
            }
          ]
        }
      ]
    },
    "type-paren-or-function-parameters": {
      name: "meta.type.paren.cover.js.jsx",
      begin: "\\(",
      beginCaptures: {
        "0": {
          name: "meta.brace.round.js.jsx"
        }
      },
      end: "\\)",
      endCaptures: {
        "0": {
          name: "meta.brace.round.js.jsx"
        }
      },
      patterns: [
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s*(\\??)(?=\\s*(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))))",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "keyword.operator.rest.js.jsx"
            },
            "3": {
              name: "entity.name.function.js.jsx variable.language.this.js.jsx"
            },
            "4": {
              name: "entity.name.function.js.jsx"
            },
            "5": {
              name: "keyword.operator.optional.js.jsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s*(\\??)(?=:)",
          captures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "keyword.operator.rest.js.jsx"
            },
            "3": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx"
            },
            "4": {
              name: "variable.parameter.js.jsx"
            },
            "5": {
              name: "keyword.operator.optional.js.jsx"
            }
          }
        },
        {
          include: "#type-annotation"
        },
        {
          name: "punctuation.separator.parameter.js.jsx",
          match: ","
        },
        {
          include: "#type"
        }
      ]
    },
    "type-fn-type-parameters": {
      patterns: [
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(new)\\b(?=\\s*\\<)",
          beginCaptures: {
            "1": {
              name: "meta.type.constructor.js.jsx storage.modifier.js.jsx"
            },
            "2": {
              name: "meta.type.constructor.js.jsx keyword.control.new.js.jsx"
            }
          },
          end: "(?<=>)",
          patterns: [
            {
              include: "#comment"
            },
            {
              include: "#type-parameters"
            }
          ]
        },
        {
          name: "meta.type.constructor.js.jsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(new)\\b\\s*(?=\\()",
          beginCaptures: {
            "1": {
              name: "storage.modifier.js.jsx"
            },
            "2": {
              name: "keyword.control.new.js.jsx"
            }
          },
          end: "(?<=\\))",
          patterns: [
            {
              include: "#function-parameters"
            }
          ]
        },
        {
          name: "meta.type.function.js.jsx",
          begin: "(?x)(\n  (?=\n    [(]\\s*(\n      ([)]) |\n      (\\.\\.\\.) |\n      ([_$[:alnum:]]+\\s*(\n        ([:,?=])|\n        ([)]\\s*=>)\n      ))\n    )\n  )\n)",
          end: "(?<=\\))",
          patterns: [
            {
              include: "#function-parameters"
            }
          ]
        }
      ]
    },
    "type-function-return-type": {
      patterns: [
        {
          name: "meta.type.function.return.js.jsx",
          begin: "(=>)(?=\\s*\\S)",
          beginCaptures: {
            "1": {
              name: "storage.type.function.arrow.js.jsx"
            }
          },
          end: "(?<!=>)(?<![|&])(?=[,\\]\\)\\{\\}=;>:\\?]|//|$)",
          patterns: [
            {
              include: "#type-function-return-type-core"
            }
          ]
        },
        {
          name: "meta.type.function.return.js.jsx",
          begin: "=>",
          beginCaptures: {
            "0": {
              name: "storage.type.function.arrow.js.jsx"
            }
          },
          end: "(?<!=>)(?<![|&])((?=[,\\]\\)\\{\\}=;:\\?>]|//|^\\s*$)|((?<=\\S)(?=\\s*$)))",
          patterns: [
            {
              include: "#type-function-return-type-core"
            }
          ]
        }
      ]
    },
    "type-function-return-type-core": {
      patterns: [
        {
          include: "#comment"
        },
        {
          begin: "(?<==>)(?=\\s*\\{)",
          end: "(?<=\\})",
          patterns: [
            {
              include: "#type-object"
            }
          ]
        },
        {
          include: "#type-predicate-operator"
        },
        {
          include: "#type"
        }
      ]
    },
    "type-operators": {
      patterns: [
        {
          include: "#typeof-operator"
        },
        {
          include: "#type-infer"
        },
        {
          begin: "([&|])(?=\\s*\\{)",
          beginCaptures: {
            "0": {
              name: "keyword.operator.type.js.jsx"
            }
          },
          end: "(?<=\\})",
          patterns: [
            {
              include: "#type-object"
            }
          ]
        },
        {
          begin: "[&|]",
          beginCaptures: {
            "0": {
              name: "keyword.operator.type.js.jsx"
            }
          },
          end: "(?=\\S)"
        },
        {
          name: "keyword.operator.expression.keyof.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))keyof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.operator.ternary.js.jsx",
          match: "(\\?|\\:)"
        },
        {
          name: "keyword.operator.expression.import.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))import(?=\\s*\\()"
        }
      ]
    },
    "type-infer": {
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(infer)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?:\\s+(extends)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))?",
          name: "meta.type.infer.js.jsx",
          captures: {
            "1": {
              name: "keyword.operator.expression.infer.js.jsx"
            },
            "2": {
              name: "entity.name.type.js.jsx"
            },
            "3": {
              name: "keyword.operator.expression.extends.js.jsx"
            }
          }
        }
      ]
    },
    "type-predicate-operator": {
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(asserts)\\s+)?(?!asserts)(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s(is)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "1": {
              name: "keyword.operator.type.asserts.js.jsx"
            },
            "2": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx"
            },
            "3": {
              name: "variable.parameter.js.jsx"
            },
            "4": {
              name: "keyword.operator.expression.is.js.jsx"
            }
          }
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(asserts)\\s+(?!is)(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "1": {
              name: "keyword.operator.type.asserts.js.jsx"
            },
            "2": {
              name: "variable.parameter.js.jsx variable.language.this.js.jsx"
            },
            "3": {
              name: "variable.parameter.js.jsx"
            }
          }
        },
        {
          name: "keyword.operator.type.asserts.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))asserts(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.operator.expression.is.js.jsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))is(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        }
      ]
    },
    "type-name": {
      patterns: [
        {
          begin: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(<)",
          captures: {
            "1": {
              name: "entity.name.type.module.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.js.jsx"
            },
            "3": {
              name: "punctuation.accessor.optional.js.jsx"
            },
            "4": {
              name: "meta.type.parameters.js.jsx punctuation.definition.typeparameters.begin.js.jsx"
            }
          },
          end: "(>)",
          endCaptures: {
            "1": {
              name: "meta.type.parameters.js.jsx punctuation.definition.typeparameters.end.js.jsx"
            }
          },
          contentName: "meta.type.parameters.js.jsx",
          patterns: [
            {
              include: "#type-arguments-body"
            }
          ]
        },
        {
          begin: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(<)",
          beginCaptures: {
            "1": {
              name: "entity.name.type.js.jsx"
            },
            "2": {
              name: "meta.type.parameters.js.jsx punctuation.definition.typeparameters.begin.js.jsx"
            }
          },
          end: "(>)",
          endCaptures: {
            "1": {
              name: "meta.type.parameters.js.jsx punctuation.definition.typeparameters.end.js.jsx"
            }
          },
          contentName: "meta.type.parameters.js.jsx",
          patterns: [
            {
              include: "#type-arguments-body"
            }
          ]
        },
        {
          match: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))",
          captures: {
            "1": {
              name: "entity.name.type.module.js.jsx"
            },
            "2": {
              name: "punctuation.accessor.js.jsx"
            },
            "3": {
              name: "punctuation.accessor.optional.js.jsx"
            }
          }
        },
        {
          name: "entity.name.type.js.jsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*"
        }
      ]
    },
    "punctuation-comma": {
      name: "punctuation.separator.comma.js.jsx",
      match: ","
    },
    "punctuation-semicolon": {
      name: "punctuation.terminator.statement.js.jsx",
      match: ";"
    },
    "punctuation-accessor": {
      match: "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))",
      captures: {
        "1": {
          name: "punctuation.accessor.js.jsx"
        },
        "2": {
          name: "punctuation.accessor.optional.js.jsx"
        }
      }
    },
    string: {
      patterns: [
        {
          include: "#qstring-single"
        },
        {
          include: "#qstring-double"
        },
        {
          include: "#template"
        }
      ]
    },
    "qstring-double": {
      name: "string.quoted.double.js.jsx",
      begin: '"',
      beginCaptures: {
        "0": {
          name: "punctuation.definition.string.begin.js.jsx"
        }
      },
      end: '(")|((?:[^\\\\\\n])$)',
      endCaptures: {
        "1": {
          name: "punctuation.definition.string.end.js.jsx"
        },
        "2": {
          name: "invalid.illegal.newline.js.jsx"
        }
      },
      patterns: [
        {
          include: "#string-character-escape"
        }
      ]
    },
    "qstring-single": {
      name: "string.quoted.single.js.jsx",
      begin: "'",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.string.begin.js.jsx"
        }
      },
      end: "(\\')|((?:[^\\\\\\n])$)",
      endCaptures: {
        "1": {
          name: "punctuation.definition.string.end.js.jsx"
        },
        "2": {
          name: "invalid.illegal.newline.js.jsx"
        }
      },
      patterns: [
        {
          include: "#string-character-escape"
        }
      ]
    },
    "string-character-escape": {
      name: "constant.character.escape.js.jsx",
      match: "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|u\\{[0-9A-Fa-f]+\\}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.|$)"
    },
    template: {
      patterns: [
        {
          include: "#template-call"
        },
        {
          name: "string.template.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)?(`)",
          beginCaptures: {
            "1": {
              name: "entity.name.function.tagged-template.js.jsx"
            },
            "2": {
              name: "punctuation.definition.string.template.begin.js.jsx"
            }
          },
          end: "`",
          endCaptures: {
            "0": {
              name: "punctuation.definition.string.template.end.js.jsx"
            }
          },
          patterns: [
            {
              include: "#template-substitution-element"
            },
            {
              include: "#string-character-escape"
            }
          ]
        }
      ]
    },
    "template-call": {
      patterns: [
        {
          name: "string.template.js.jsx",
          begin: "(?=(([_$[:alpha:]][_$[:alnum:]]*\\s*\\??\\.\\s*)*|(\\??\\.\\s*)?)([_$[:alpha:]][_$[:alnum:]]*)(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?`)",
          end: "(?=`)",
          patterns: [
            {
              begin: "(?=(([_$[:alpha:]][_$[:alnum:]]*\\s*\\??\\.\\s*)*|(\\??\\.\\s*)?)([_$[:alpha:]][_$[:alnum:]]*))",
              end: "(?=(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)?`)",
              patterns: [
                {
                  include: "#support-function-call-identifiers"
                },
                {
                  name: "entity.name.function.tagged-template.js.jsx",
                  match: "([_$[:alpha:]][_$[:alnum:]]*)"
                }
              ]
            },
            {
              include: "#type-arguments"
            }
          ]
        },
        {
          name: "string.template.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)?\\s*(?=(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)`)",
          beginCaptures: {
            "1": {
              name: "entity.name.function.tagged-template.js.jsx"
            }
          },
          end: "(?=`)",
          patterns: [
            {
              include: "#type-arguments"
            }
          ]
        }
      ]
    },
    "template-substitution-element": {
      name: "meta.template.expression.js.jsx",
      begin: "\\$\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.begin.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.end.js.jsx"
        }
      },
      patterns: [
        {
          include: "#expression"
        }
      ],
      contentName: "meta.embedded.line.js.jsx"
    },
    "type-string": {
      patterns: [
        {
          include: "#qstring-single"
        },
        {
          include: "#qstring-double"
        },
        {
          include: "#template-type"
        }
      ]
    },
    "template-type": {
      patterns: [
        {
          include: "#template-call"
        },
        {
          name: "string.template.js.jsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)?(`)",
          beginCaptures: {
            "1": {
              name: "entity.name.function.tagged-template.js.jsx"
            },
            "2": {
              name: "punctuation.definition.string.template.begin.js.jsx"
            }
          },
          end: "`",
          endCaptures: {
            "0": {
              name: "punctuation.definition.string.template.end.js.jsx"
            }
          },
          patterns: [
            {
              include: "#template-type-substitution-element"
            },
            {
              include: "#string-character-escape"
            }
          ]
        }
      ]
    },
    "template-type-substitution-element": {
      name: "meta.template.expression.js.jsx",
      begin: "\\$\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.begin.js.jsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.end.js.jsx"
        }
      },
      patterns: [
        {
          include: "#type"
        }
      ],
      contentName: "meta.embedded.line.js.jsx"
    },
    regex: {
      patterns: [
        {
          name: "string.regexp.js.jsx",
          begin: "(?<!\\+\\+|--|})(?<=[=(:,\\[?+!]|^return|[^\\._$[:alnum:]]return|^case|[^\\._$[:alnum:]]case|=>|&&|\\|\\||\\*\\/)\\s*(\\/)(?![\\/*])(?=(?:[^\\/\\\\\\[\\()]|\\\\.|\\[([^\\]\\\\]|\\\\.)+\\]|\\(([^\\)\\\\]|\\\\.)+\\))+\\/([dgimsuy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.string.begin.js.jsx"
            }
          },
          end: "(/)([dgimsuy]*)",
          endCaptures: {
            "1": {
              name: "punctuation.definition.string.end.js.jsx"
            },
            "2": {
              name: "keyword.other.js.jsx"
            }
          },
          patterns: [
            {
              include: "#regexp"
            }
          ]
        },
        {
          name: "string.regexp.js.jsx",
          begin: "((?<![_$[:alnum:])\\]]|\\+\\+|--|}|\\*\\/)|((?<=^return|[^\\._$[:alnum:]]return|^case|[^\\._$[:alnum:]]case))\\s*)\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
          beginCaptures: {
            "0": {
              name: "punctuation.definition.string.begin.js.jsx"
            }
          },
          end: "(/)([dgimsuy]*)",
          endCaptures: {
            "1": {
              name: "punctuation.definition.string.end.js.jsx"
            },
            "2": {
              name: "keyword.other.js.jsx"
            }
          },
          patterns: [
            {
              include: "#regexp"
            }
          ]
        }
      ]
    },
    regexp: {
      patterns: [
        {
          name: "keyword.control.anchor.regexp",
          match: "\\\\[bB]|\\^|\\$"
        },
        {
          match: "\\\\[1-9]\\d*|\\\\k<([a-zA-Z_$][\\w$]*)>",
          captures: {
            "0": {
              name: "keyword.other.back-reference.regexp"
            },
            "1": {
              name: "variable.other.regexp"
            }
          }
        },
        {
          name: "keyword.operator.quantifier.regexp",
          match: "[?+*]|\\{(\\d+,\\d+|\\d+,|,\\d+|\\d+)\\}\\??"
        },
        {
          name: "keyword.operator.or.regexp",
          match: "\\|"
        },
        {
          name: "meta.group.assertion.regexp",
          begin: "(\\()((\\?=)|(\\?!)|(\\?<=)|(\\?<!))",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.group.regexp"
            },
            "2": {
              name: "punctuation.definition.group.assertion.regexp"
            },
            "3": {
              name: "meta.assertion.look-ahead.regexp"
            },
            "4": {
              name: "meta.assertion.negative-look-ahead.regexp"
            },
            "5": {
              name: "meta.assertion.look-behind.regexp"
            },
            "6": {
              name: "meta.assertion.negative-look-behind.regexp"
            }
          },
          end: "(\\))",
          endCaptures: {
            "1": {
              name: "punctuation.definition.group.regexp"
            }
          },
          patterns: [
            {
              include: "#regexp"
            }
          ]
        },
        {
          name: "meta.group.regexp",
          begin: "\\((?:(\\?:)|(?:\\?<([a-zA-Z_$][\\w$]*)>))?",
          beginCaptures: {
            "0": {
              name: "punctuation.definition.group.regexp"
            },
            "1": {
              name: "punctuation.definition.group.no-capture.regexp"
            },
            "2": {
              name: "variable.other.regexp"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "punctuation.definition.group.regexp"
            }
          },
          patterns: [
            {
              include: "#regexp"
            }
          ]
        },
        {
          name: "constant.other.character-class.set.regexp",
          begin: "(\\[)(\\^)?",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.character-class.regexp"
            },
            "2": {
              name: "keyword.operator.negation.regexp"
            }
          },
          end: "(\\])",
          endCaptures: {
            "1": {
              name: "punctuation.definition.character-class.regexp"
            }
          },
          patterns: [
            {
              name: "constant.other.character-class.range.regexp",
              match: "(?:.|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\c[A-Z])|(\\\\.))\\-(?:[^\\]\\\\]|(\\\\(?:[0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}))|(\\\\c[A-Z])|(\\\\.))",
              captures: {
                "1": {
                  name: "constant.character.numeric.regexp"
                },
                "2": {
                  name: "constant.character.control.regexp"
                },
                "3": {
                  name: "constant.character.escape.backslash.regexp"
                },
                "4": {
                  name: "constant.character.numeric.regexp"
                },
                "5": {
                  name: "constant.character.control.regexp"
                },
                "6": {
                  name: "constant.character.escape.backslash.regexp"
                }
              }
            },
            {
              include: "#regex-character-class"
            }
          ]
        },
        {
          include: "#regex-character-class"
        }
      ]
    },
    "regex-character-class": {
      patterns: [
        {
          name: "constant.other.character-class.regexp",
          match: "\\\\[wWsSdDtrnvf]|\\."
        },
        {
          name: "constant.character.numeric.regexp",
          match: "\\\\([0-7]{3}|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4})"
        },
        {
          name: "constant.character.control.regexp",
          match: "\\\\c[A-Z]"
        },
        {
          name: "constant.character.escape.backslash.regexp",
          match: "\\\\."
        }
      ]
    },
    comment: {
      patterns: [
        {
          name: "comment.block.documentation.js.jsx",
          begin: "/\\*\\*(?!/)",
          beginCaptures: {
            "0": {
              name: "punctuation.definition.comment.js.jsx"
            }
          },
          end: "\\*/",
          endCaptures: {
            "0": {
              name: "punctuation.definition.comment.js.jsx"
            }
          },
          patterns: [
            {
              include: "#docblock"
            }
          ]
        },
        {
          name: "comment.block.js.jsx",
          begin: "(/\\*)(?:\\s*((@)internal)(?=\\s|(\\*/)))?",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.comment.js.jsx"
            },
            "2": {
              name: "storage.type.internaldeclaration.js.jsx"
            },
            "3": {
              name: "punctuation.decorator.internaldeclaration.js.jsx"
            }
          },
          end: "\\*/",
          endCaptures: {
            "0": {
              name: "punctuation.definition.comment.js.jsx"
            }
          }
        },
        {
          begin: "(^[ \\t]+)?((//)(?:\\s*((@)internal)(?=\\s|$))?)",
          beginCaptures: {
            "1": {
              name: "punctuation.whitespace.comment.leading.js.jsx"
            },
            "2": {
              name: "comment.line.double-slash.js.jsx"
            },
            "3": {
              name: "punctuation.definition.comment.js.jsx"
            },
            "4": {
              name: "storage.type.internaldeclaration.js.jsx"
            },
            "5": {
              name: "punctuation.decorator.internaldeclaration.js.jsx"
            }
          },
          end: "(?=$)",
          contentName: "comment.line.double-slash.js.jsx"
        }
      ]
    },
    "single-line-comment-consuming-line-ending": {
      begin: "(^[ \\t]+)?((//)(?:\\s*((@)internal)(?=\\s|$))?)",
      beginCaptures: {
        "1": {
          name: "punctuation.whitespace.comment.leading.js.jsx"
        },
        "2": {
          name: "comment.line.double-slash.js.jsx"
        },
        "3": {
          name: "punctuation.definition.comment.js.jsx"
        },
        "4": {
          name: "storage.type.internaldeclaration.js.jsx"
        },
        "5": {
          name: "punctuation.decorator.internaldeclaration.js.jsx"
        }
      },
      end: "(?=^)",
      contentName: "comment.line.double-slash.js.jsx"
    },
    directives: {
      name: "comment.line.triple-slash.directive.js.jsx",
      begin: "^(///)\\s*(?=<(reference|amd-dependency|amd-module)(\\s+(path|types|no-default-lib|lib|name|resolution-mode)\\s*=\\s*((\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)))+\\s*/>\\s*$)",
      beginCaptures: {
        "1": {
          name: "punctuation.definition.comment.js.jsx"
        }
      },
      end: "(?=$)",
      patterns: [
        {
          name: "meta.tag.js.jsx",
          begin: "(<)(reference|amd-dependency|amd-module)",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.tag.directive.js.jsx"
            },
            "2": {
              name: "entity.name.tag.directive.js.jsx"
            }
          },
          end: "/>",
          endCaptures: {
            "0": {
              name: "punctuation.definition.tag.directive.js.jsx"
            }
          },
          patterns: [
            {
              name: "entity.other.attribute-name.directive.js.jsx",
              match: "path|types|no-default-lib|lib|name|resolution-mode"
            },
            {
              name: "keyword.operator.assignment.js.jsx",
              match: "="
            },
            {
              include: "#string"
            }
          ]
        }
      ]
    },
    docblock: {
      patterns: [
        {
          match: "(?x)\n((@)(?:access|api))\n\\s+\n(private|protected|public)\n\\b",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "constant.language.access-type.jsdoc"
            }
          }
        },
        {
          match: "(?x)\n((@)author)\n\\s+\n(\n  [^@\\s<>*/]\n  (?:[^@<>*/]|\\*[^/])*\n)\n(?:\n  \\s*\n  (<)\n  ([^>\\s]+)\n  (>)\n)?",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "entity.name.type.instance.jsdoc"
            },
            "4": {
              name: "punctuation.definition.bracket.angle.begin.jsdoc"
            },
            "5": {
              name: "constant.other.email.link.underline.jsdoc"
            },
            "6": {
              name: "punctuation.definition.bracket.angle.end.jsdoc"
            }
          }
        },
        {
          match: "(?x)\n((@)borrows) \\s+\n((?:[^@\\s*/]|\\*[^/])+)    # <that namepath>\n\\s+ (as) \\s+              # as\n((?:[^@\\s*/]|\\*[^/])+)    # <this namepath>",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "entity.name.type.instance.jsdoc"
            },
            "4": {
              name: "keyword.operator.control.jsdoc"
            },
            "5": {
              name: "entity.name.type.instance.jsdoc"
            }
          }
        },
        {
          name: "meta.example.jsdoc",
          begin: "((@)example)\\s+",
          end: "(?=@|\\*/)",
          beginCaptures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            }
          },
          patterns: [
            {
              match: "^\\s\\*\\s+"
            },
            {
              contentName: "constant.other.description.jsdoc",
              begin: "\\G(<)caption(>)",
              beginCaptures: {
                "0": {
                  name: "entity.name.tag.inline.jsdoc"
                },
                "1": {
                  name: "punctuation.definition.bracket.angle.begin.jsdoc"
                },
                "2": {
                  name: "punctuation.definition.bracket.angle.end.jsdoc"
                }
              },
              end: "(</)caption(>)|(?=\\*/)",
              endCaptures: {
                "0": {
                  name: "entity.name.tag.inline.jsdoc"
                },
                "1": {
                  name: "punctuation.definition.bracket.angle.begin.jsdoc"
                },
                "2": {
                  name: "punctuation.definition.bracket.angle.end.jsdoc"
                }
              }
            },
            {
              match: "[^\\s@*](?:[^*]|\\*[^/])*",
              captures: {
                "0": {
                  name: "source.embedded.js.jsx"
                }
              }
            }
          ]
        },
        {
          match: "(?x) ((@)kind) \\s+ (class|constant|event|external|file|function|member|mixin|module|namespace|typedef) \\b",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "constant.language.symbol-type.jsdoc"
            }
          }
        },
        {
          match: "(?x)\n((@)see)\n\\s+\n(?:\n  # URL\n  (\n    (?=https?://)\n    (?:[^\\s*]|\\*[^/])+\n  )\n  |\n  # JSDoc namepath\n  (\n    (?!\n      # Avoid matching bare URIs (also acceptable as links)\n      https?://\n      |\n      # Avoid matching {@inline tags}; we match those below\n      (?:\\[[^\\[\\]]*\\])? # Possible description [preceding]{@tag}\n      {@(?:link|linkcode|linkplain|tutorial)\\b\n    )\n    # Matched namepath\n    (?:[^@\\s*/]|\\*[^/])+\n  )\n)",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "variable.other.link.underline.jsdoc"
            },
            "4": {
              name: "entity.name.type.instance.jsdoc"
            }
          }
        },
        {
          match: "(?x)\n((@)template)\n\\s+\n# One or more valid identifiers\n(\n  [A-Za-z_$]         # First character: non-numeric word character\n  [\\w$.\\[\\]]*        # Rest of identifier\n  (?:                # Possible list of additional identifiers\n    \\s* , \\s*\n    [A-Za-z_$]\n    [\\w$.\\[\\]]*\n  )*\n)",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "variable.other.jsdoc"
            }
          }
        },
        {
          begin: "(?x)((@)template)\\s+(?={)",
          beginCaptures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            }
          },
          end: "(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])",
          patterns: [
            {
              include: "#jsdoctype"
            },
            {
              name: "variable.other.jsdoc",
              match: "([A-Za-z_$][\\w$.\\[\\]]*)"
            }
          ]
        },
        {
          match: "(?x)\n(\n  (@)\n  (?:arg|argument|const|constant|member|namespace|param|var)\n)\n\\s+\n(\n  [A-Za-z_$]\n  [\\w$.\\[\\]]*\n)",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "variable.other.jsdoc"
            }
          }
        },
        {
          begin: "((@)typedef)\\s+(?={)",
          beginCaptures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            }
          },
          end: "(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])",
          patterns: [
            {
              include: "#jsdoctype"
            },
            {
              name: "entity.name.type.instance.jsdoc",
              match: "(?:[^@\\s*/]|\\*[^/])+"
            }
          ]
        },
        {
          begin: "((@)(?:arg|argument|const|constant|member|namespace|param|prop|property|var))\\s+(?={)",
          beginCaptures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            }
          },
          end: "(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])",
          patterns: [
            {
              include: "#jsdoctype"
            },
            {
              name: "variable.other.jsdoc",
              match: "([A-Za-z_$][\\w$.\\[\\]]*)"
            },
            {
              name: "variable.other.jsdoc",
              match: `(?x)
(\\[)\\s*
[\\w$]+
(?:
  (?:\\[\\])?                                        # Foo[ ].bar properties within an array
  \\.                                                # Foo.Bar namespaced parameter
  [\\w$]+
)*
(?:
  \\s*
  (=)                                                # [foo=bar] Default parameter value
  \\s*
  (
    # The inner regexes are to stop the match early at */ and to not stop at escaped quotes
    (?>
      "(?:(?:\\*(?!/))|(?:\\\\(?!"))|[^*\\\\])*?" |                      # [foo="bar"] Double-quoted
      '(?:(?:\\*(?!/))|(?:\\\\(?!'))|[^*\\\\])*?' |                      # [foo='bar'] Single-quoted
      \\[ (?:(?:\\*(?!/))|[^*])*? \\] |                                # [foo=[1,2]] Array literal
      (?:(?:\\*(?!/))|\\s(?!\\s*\\])|\\[.*?(?:\\]|(?=\\*/))|[^*\\s\\[\\]])*   # Everything else
    )*
  )
)?
\\s*(?:(\\])((?:[^*\\s]|\\*[^\\s/])+)?|(?=\\*/))`,
              captures: {
                "1": {
                  name: "punctuation.definition.optional-value.begin.bracket.square.jsdoc"
                },
                "2": {
                  name: "keyword.operator.assignment.jsdoc"
                },
                "3": {
                  name: "source.embedded.js.jsx"
                },
                "4": {
                  name: "punctuation.definition.optional-value.end.bracket.square.jsdoc"
                },
                "5": {
                  name: "invalid.illegal.syntax.jsdoc"
                }
              }
            }
          ]
        },
        {
          begin: "(?x)\n(\n  (@)\n  (?:define|enum|exception|export|extends|lends|implements|modifies\n  |namespace|private|protected|returns?|suppress|this|throws|type\n  |yields?)\n)\n\\s+(?={)",
          beginCaptures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            }
          },
          end: "(?=\\s|\\*/|[^{}\\[\\]A-Za-z_$])",
          patterns: [
            {
              include: "#jsdoctype"
            }
          ]
        },
        {
          match: "(?x)\n(\n  (@)\n  (?:alias|augments|callback|constructs|emits|event|fires|exports?\n  |extends|external|function|func|host|lends|listens|interface|memberof!?\n  |method|module|mixes|mixin|name|requires|see|this|typedef|uses)\n)\n\\s+\n(\n  (?:\n    [^{}@\\s*] | \\*[^/]\n  )+\n)",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "entity.name.type.instance.jsdoc"
            }
          }
        },
        {
          contentName: "variable.other.jsdoc",
          begin: `((@)(?:default(?:value)?|license|version))\\s+(([''"]))`,
          beginCaptures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "variable.other.jsdoc"
            },
            "4": {
              name: "punctuation.definition.string.begin.jsdoc"
            }
          },
          end: "(\\3)|(?=$|\\*/)",
          endCaptures: {
            "0": {
              name: "variable.other.jsdoc"
            },
            "1": {
              name: "punctuation.definition.string.end.jsdoc"
            }
          }
        },
        {
          match: "((@)(?:default(?:value)?|license|tutorial|variation|version))\\s+([^\\s*]+)",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            },
            "3": {
              name: "variable.other.jsdoc"
            }
          }
        },
        {
          name: "storage.type.class.jsdoc",
          match: "(?x) (@) (?:abstract|access|alias|api|arg|argument|async|attribute|augments|author|beta|borrows|bubbles |callback|chainable|class|classdesc|code|config|const|constant|constructor|constructs|copyright |default|defaultvalue|define|deprecated|desc|description|dict|emits|enum|event|example|exception |exports?|extends|extension(?:_?for)?|external|externs|file|fileoverview|final|fires|for|func |function|generator|global|hideconstructor|host|ignore|implements|implicitCast|inherit[Dd]oc |inner|instance|interface|internal|kind|lends|license|listens|main|member|memberof!?|method |mixes|mixins?|modifies|module|name|namespace|noalias|nocollapse|nocompile|nosideeffects |override|overview|package|param|polymer(?:Behavior)?|preserve|private|prop|property|protected |public|read[Oo]nly|record|require[ds]|returns?|see|since|static|struct|submodule|summary |suppress|template|this|throws|todo|tutorial|type|typedef|unrestricted|uses|var|variation |version|virtual|writeOnce|yields?) \\b",
          captures: {
            "1": {
              name: "punctuation.definition.block.tag.jsdoc"
            }
          }
        },
        {
          include: "#inline-tags"
        },
        {
          match: "((@)(?:[_$[:alpha:]][_$[:alnum:]]*))(?=\\s+)",
          captures: {
            "1": {
              name: "storage.type.class.jsdoc"
            },
            "2": {
              name: "punctuation.definition.block.tag.jsdoc"
            }
          }
        }
      ]
    },
    brackets: {
      patterns: [
        {
          begin: "{",
          end: "}|(?=\\*/)",
          patterns: [
            {
              include: "#brackets"
            }
          ]
        },
        {
          begin: "\\[",
          end: "\\]|(?=\\*/)",
          patterns: [
            {
              include: "#brackets"
            }
          ]
        }
      ]
    },
    "inline-tags": {
      patterns: [
        {
          name: "constant.other.description.jsdoc",
          match: "(\\[)[^\\]]+(\\])(?={@(?:link|linkcode|linkplain|tutorial))",
          captures: {
            "1": {
              name: "punctuation.definition.bracket.square.begin.jsdoc"
            },
            "2": {
              name: "punctuation.definition.bracket.square.end.jsdoc"
            }
          }
        },
        {
          name: "entity.name.type.instance.jsdoc",
          begin: "({)((@)(?:link(?:code|plain)?|tutorial))\\s*",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.bracket.curly.begin.jsdoc"
            },
            "2": {
              name: "storage.type.class.jsdoc"
            },
            "3": {
              name: "punctuation.definition.inline.tag.jsdoc"
            }
          },
          end: "}|(?=\\*/)",
          endCaptures: {
            "0": {
              name: "punctuation.definition.bracket.curly.end.jsdoc"
            }
          },
          patterns: [
            {
              match: "\\G((?=https?://)(?:[^|}\\s*]|\\*[/])+)(\\|)?",
              captures: {
                "1": {
                  name: "variable.other.link.underline.jsdoc"
                },
                "2": {
                  name: "punctuation.separator.pipe.jsdoc"
                }
              }
            },
            {
              match: "\\G((?:[^{}@\\s|*]|\\*[^/])+)(\\|)?",
              captures: {
                "1": {
                  name: "variable.other.description.jsdoc"
                },
                "2": {
                  name: "punctuation.separator.pipe.jsdoc"
                }
              }
            }
          ]
        }
      ]
    },
    jsdoctype: {
      patterns: [
        {
          contentName: "entity.name.type.instance.jsdoc",
          begin: "\\G({)",
          beginCaptures: {
            "0": {
              name: "entity.name.type.instance.jsdoc"
            },
            "1": {
              name: "punctuation.definition.bracket.curly.begin.jsdoc"
            }
          },
          end: "((}))\\s*|(?=\\*/)",
          endCaptures: {
            "1": {
              name: "entity.name.type.instance.jsdoc"
            },
            "2": {
              name: "punctuation.definition.bracket.curly.end.jsdoc"
            }
          },
          patterns: [
            {
              include: "#brackets"
            }
          ]
        }
      ]
    },
    jsx: {
      patterns: [
        {
          include: "#jsx-tag-without-attributes-in-expression"
        },
        {
          include: "#jsx-tag-in-expression"
        }
      ]
    },
    "jsx-tag-without-attributes-in-expression": {
      begin: "(?<!\\+\\+|--)(?<=[({\\[,?=>:*]|&&|\\|\\||\\?|\\*\\/|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^default|[^\\._$[:alnum:]]default|^yield|[^\\._$[:alnum:]]yield|^)\\s*(?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>))",
      end: "(?!(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>))",
      patterns: [
        {
          include: "#jsx-tag-without-attributes"
        }
      ]
    },
    "jsx-tag-without-attributes": {
      name: "meta.tag.without-attributes.js.jsx",
      begin: "(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>)",
      end: "(</)(template)(>)",
      beginCaptures: {
        "1": {
          name: "punctuation.definition.tag.begin.js.jsx"
        },
        "2": {
          name: "entity.name.tag.namespace.js.jsx"
        },
        "3": {
          name: "punctuation.separator.namespace.js.jsx"
        },
        "4": {
          name: "entity.name.tag.js.jsx"
        },
        "5": {
          name: "support.class.component.js.jsx"
        },
        "6": {
          name: "punctuation.definition.tag.end.js.jsx"
        }
      },
      endCaptures: {
        "1": {
          name: "punctuation.definition.tag.begin.js.jsx"
        },
        "2": {
          name: "entity.name.tag.js.jsx"
        },
        "3": {
          name: "punctuation.definition.tag.end.js.jsx"
        }
      },
      contentName: "meta.jsx.children.js.jsx",
      patterns: [
        {
          include: "text.html.handlebars"
        }
      ]
    },
    "jsx-tag-in-expression": {
      begin: "(?x)\n  (?<!\\+\\+|--)(?<=[({\\[,?=>:*]|&&|\\|\\||\\?|\\*\\/|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^default|[^\\._$[:alnum:]]default|^yield|[^\\._$[:alnum:]]yield|^)\\s*\n  (?!<\\s*[_$[:alpha:]][_$[:alnum:]]*((\\s+extends\\s+[^=>])|,)) # look ahead is not type parameter of arrow\n  (?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))",
      end: "(?!(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))",
      patterns: [
        {
          include: "#jsx-tag"
        }
      ]
    },
    "jsx-tag": {
      name: "meta.tag.js.jsx",
      begin: "(?=(<)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))(?=((<\\s*)|(\\s+))(?!\\?)|\\/?>))",
      end: "(/>)|(?:(</)\\s*(?:([_$[:alpha:]][-_$[:alnum:].]*)(?<!\\.|-)(:))?((?:[a-z][a-z0-9]*|([_$[:alpha:]][-_$[:alnum:].]*))(?<!\\.|-))?\\s*(>))",
      endCaptures: {
        "1": {
          name: "punctuation.definition.tag.end.js.jsx"
        },
        "2": {
          name: "punctuation.definition.tag.begin.js.jsx"
        },
        "3": {
          name: "entity.name.tag.namespace.js.jsx"
        },
        "4": {
          name: "punctuation.separator.namespace.js.jsx"
        },
        "5": {
          name: "entity.name.tag.js.jsx"
        },
        "6": {
          name: "support.class.component.js.jsx"
        },
        "7": {
          name: "punctuation.definition.tag.end.js.jsx"
        }
      }
    },
    "jsx-evaluated-code": {
      contentName: "meta.embedded.expression.js.jsx",
      begin: "\\{",
      end: "\\}",
      beginCaptures: {
        "0": {
          name: "punctuation.section.embedded.begin.js.jsx"
        }
      },
      endCaptures: {
        "0": {
          name: "punctuation.section.embedded.end.js.jsx"
        }
      },
      patterns: [
        {
          include: "#expression"
        }
      ]
    },
    "jsx-entities": {
      patterns: [
        {
          name: "constant.character.entity.js.jsx",
          match: "(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)",
          captures: {
            "1": {
              name: "punctuation.definition.entity.js.jsx"
            },
            "3": {
              name: "punctuation.definition.entity.js.jsx"
            }
          }
        }
      ]
    },
    "jsx-tag-attributes": {
      name: "meta.tag.attributes.js.jsx",
      begin: "\\s+",
      end: "(?=[/]?>)",
      patterns: [
        {
          include: "#comment"
        },
        {
          include: "#jsx-tag-attribute-name"
        },
        {
          include: "#jsx-tag-attribute-assignment"
        },
        {
          include: "#jsx-string-double-quoted"
        },
        {
          include: "#jsx-string-single-quoted"
        },
        {
          include: "#jsx-evaluated-code"
        },
        {
          include: "#jsx-tag-attributes-illegal"
        }
      ]
    },
    "jsx-tag-attribute-name": {
      match: "(?x)\n  \\s*\n  (?:([_$[:alpha:]][-_$[:alnum:].]*)(:))?\n  ([_$[:alpha:]][-_$[:alnum:]]*)\n  (?=\\s|=|/?>|/\\*|//)",
      captures: {
        "1": {
          name: "entity.other.attribute-name.namespace.js.jsx"
        },
        "2": {
          name: "punctuation.separator.namespace.js.jsx"
        },
        "3": {
          name: "entity.other.attribute-name.js.jsx"
        }
      }
    },
    "jsx-tag-attribute-assignment": {
      name: "keyword.operator.assignment.js.jsx",
      match: `=(?=\\s*(?:'|"|{|/\\*|//|\\n))`
    },
    "jsx-string-double-quoted": {
      name: "string.quoted.double.js.jsx",
      begin: '"',
      end: '"',
      beginCaptures: {
        "0": {
          name: "punctuation.definition.string.begin.js.jsx"
        }
      },
      endCaptures: {
        "0": {
          name: "punctuation.definition.string.end.js.jsx"
        }
      },
      patterns: [
        {
          include: "#jsx-entities"
        }
      ]
    },
    "jsx-string-single-quoted": {
      name: "string.quoted.single.js.jsx",
      begin: "'",
      end: "'",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.string.begin.js.jsx"
        }
      },
      endCaptures: {
        "0": {
          name: "punctuation.definition.string.end.js.jsx"
        }
      },
      patterns: [
        {
          include: "#jsx-entities"
        }
      ]
    },
    "jsx-tag-attributes-illegal": {
      name: "invalid.illegal.attribute.js.jsx",
      match: "\\S+"
    }
  }
};

// src/.vitepress/config/syntax-highlight/handlebars.tmLanguage.json
var handlebars_tmLanguage_default = {
  information_for_contributors: [
    "This file has been converted from https://github.com/daaain/Handlebars/blob/master/grammars/Handlebars.json",
    "If you want to provide a fix or improvement, please create a pull request against the original repository.",
    "Once accepted there, we are happy to receive an update request."
  ],
  version: "https://github.com/daaain/Handlebars/commit/85a153a6f759df4e8da7533e1b3651f007867c51",
  id: "handlebars",
  name: "Handlebars",
  scopeName: "text.html.handlebars",
  patterns: [],
  repository: {
    html_tags: {
      patterns: [
        {
          begin: "(<)([a-zA-Z0-9:-]+)(?=[^>]*></\\2>)",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.html"
            }
          },
          end: "(>(<)/)(\\2)(>)",
          endCaptures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "meta.scope.between-tag-pair.html"
            },
            "3": {
              name: "entity.name.tag.html"
            },
            "4": {
              name: "punctuation.definition.tag.html"
            }
          },
          name: "meta.tag.any.html",
          patterns: [
            {
              include: "#tag-stuff"
            }
          ]
        },
        {
          begin: "(<\\?)(xml)",
          captures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.xml.html"
            }
          },
          end: "(\\?>)",
          name: "meta.tag.preprocessor.xml.html",
          patterns: [
            {
              include: "#tag_generic_attribute"
            },
            {
              include: "#string"
            }
          ]
        },
        {
          begin: "<!--",
          captures: {
            "0": {
              name: "punctuation.definition.comment.html"
            }
          },
          end: "--\\s*>",
          name: "comment.block.html",
          patterns: [
            {
              match: "--",
              name: "invalid.illegal.bad-comments-or-CDATA.html"
            }
          ]
        },
        {
          begin: "<!",
          captures: {
            "0": {
              name: "punctuation.definition.tag.html"
            }
          },
          end: ">",
          name: "meta.tag.sgml.html",
          patterns: [
            {
              begin: "(DOCTYPE|doctype)",
              captures: {
                "1": {
                  name: "entity.name.tag.doctype.html"
                }
              },
              end: "(?=>)",
              name: "meta.tag.sgml.doctype.html",
              patterns: [
                {
                  match: '"[^">]*"',
                  name: "string.quoted.double.doctype.identifiers-and-DTDs.html"
                }
              ]
            },
            {
              begin: "\\[CDATA\\[",
              end: "]](?=>)",
              name: "constant.other.inline-data.html"
            },
            {
              match: "(\\s*)(?!--|>)\\S(\\s*)",
              name: "invalid.illegal.bad-comments-or-CDATA.html"
            }
          ]
        },
        {
          begin: "(?:^\\s+)?(<)((?i:style))\\b(?![^>]*/>)",
          captures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.style.html"
            },
            "3": {
              name: "punctuation.definition.tag.html"
            }
          },
          end: "(</)((?i:style))(>)(?:\\s*\\n)?",
          name: "source.css.embedded.html",
          patterns: [
            {
              include: "#tag-stuff"
            },
            {
              begin: "(>)",
              beginCaptures: {
                "1": {
                  name: "punctuation.definition.tag.html"
                }
              },
              end: "(?=</(?i:style))",
              patterns: [
                {
                  include: "source.css"
                }
              ]
            }
          ]
        },
        {
          begin: "(?:^\\s+)?(<)((?i:script))\\b(?![^>]*/>)",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.script.html"
            }
          },
          end: "(?<=</(script|SCRIPT))(>)(?:\\s*\\n)?",
          endCaptures: {
            "2": {
              name: "punctuation.definition.tag.html"
            }
          },
          name: "source.js.embedded.html",
          patterns: [
            {
              include: "#tag-stuff"
            },
            {
              begin: "(?<!</(?:script|SCRIPT))(>)",
              captures: {
                "1": {
                  name: "punctuation.definition.tag.html"
                },
                "2": {
                  name: "entity.name.tag.script.html"
                }
              },
              end: "(</)((?i:script))",
              patterns: [
                {
                  captures: {
                    "1": {
                      name: "punctuation.definition.comment.js"
                    }
                  },
                  match: "(//).*?((?=</script)|$\\n?)",
                  name: "comment.line.double-slash.js"
                },
                {
                  begin: "/\\*",
                  captures: {
                    "0": {
                      name: "punctuation.definition.comment.js"
                    }
                  },
                  end: "\\*/|(?=</script)",
                  name: "comment.block.js"
                },
                {
                  include: "source.js"
                }
              ]
            }
          ]
        },
        {
          begin: "(</?)((?i:body|head|html)\\b)",
          captures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.structure.any.html"
            }
          },
          end: "(>)",
          name: "meta.tag.structure.any.html",
          patterns: [
            {
              include: "#tag-stuff"
            }
          ]
        },
        {
          begin: "(</?)((?i:address|blockquote|dd|div|header|section|footer|aside|nav|dl|dt|fieldset|form|frame|frameset|h1|h2|h3|h4|h5|h6|iframe|noframes|object|ol|p|ul|applet|center|dir|hr|menu|pre)\\b)",
          captures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.block.any.html"
            }
          },
          end: "(>)",
          name: "meta.tag.block.any.html",
          patterns: [
            {
              include: "#tag-stuff"
            }
          ]
        },
        {
          begin: "(</?)((?i:a|abbr|acronym|area|b|base|basefont|bdo|big|br|button|caption|cite|code|col|colgroup|del|dfn|em|font|head|html|i|img|input|ins|isindex|kbd|label|legend|li|link|map|meta|noscript|optgroup|option|param|q|s|samp|script|select|small|span|strike|strong|style|sub|sup|table|tbody|td|textarea|tfoot|th|thead|title|tr|tt|u|var)\\b)",
          captures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.inline.any.html"
            }
          },
          end: "((?: ?/)?>)",
          name: "meta.tag.inline.any.html",
          patterns: [
            {
              include: "#tag-stuff"
            }
          ]
        },
        {
          begin: "(</?)([a-zA-Z0-9:-]+)",
          captures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.other.html"
            }
          },
          end: "(>)",
          name: "meta.tag.other.html",
          patterns: [
            {
              include: "#tag-stuff"
            }
          ]
        },
        {
          begin: "(</?)([a-zA-Z0-9{}:-]+)",
          captures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.tokenised.html"
            }
          },
          end: "(>)",
          name: "meta.tag.tokenised.html",
          patterns: [
            {
              include: "#tag-stuff"
            }
          ]
        },
        {
          include: "#entities"
        },
        {
          match: "<>",
          name: "invalid.illegal.incomplete.html"
        },
        {
          match: "<",
          name: "invalid.illegal.bad-angle-bracket.html"
        }
      ]
    },
    entities: {
      patterns: [
        {
          captures: {
            "1": {
              name: "punctuation.definition.entity.html"
            },
            "3": {
              name: "punctuation.definition.entity.html"
            }
          },
          name: "constant.character.entity.html",
          match: "(&)([a-zA-Z0-9]+|#[0-9]+|#x[0-9a-fA-F]+)(;)"
        },
        {
          name: "invalid.illegal.bad-ampersand.html",
          match: "&"
        }
      ]
    },
    end_block: {
      begin: "(\\{\\{)(~?/)([a-zA-Z0-9/_\\.-]+)\\s*",
      end: "(~?\\}\\})",
      name: "meta.function.block.end.handlebars",
      endCaptures: {
        "1": {
          name: "support.constant.handlebars"
        }
      },
      beginCaptures: {
        "1": {
          name: "support.constant.handlebars"
        },
        "2": {
          name: "support.constant.handlebars keyword.control"
        },
        "3": {
          name: "support.constant.handlebars keyword.control"
        }
      },
      patterns: []
    },
    yfm: {
      patterns: [
        {
          patterns: [
            {
              include: "source.yaml"
            }
          ],
          begin: "(?<!\\s)---\\n$",
          end: "^---\\s",
          name: "markup.raw.yaml.front-matter"
        }
      ]
    },
    comments: {
      patterns: [
        {
          patterns: [
            {
              name: "keyword.annotation.handlebars",
              match: "@\\w*"
            },
            {
              include: "#comments"
            }
          ],
          begin: "\\{\\{!",
          end: "\\}\\}",
          name: "comment.block.handlebars"
        },
        {
          captures: {
            "0": {
              name: "punctuation.definition.comment.html"
            }
          },
          begin: "<!--",
          end: "-{2,3}\\s*>",
          name: "comment.block.html",
          patterns: [
            {
              name: "invalid.illegal.bad-comments-or-CDATA.html",
              match: "--"
            }
          ]
        }
      ]
    },
    block_comments: {
      patterns: [
        {
          patterns: [
            {
              name: "keyword.annotation.handlebars",
              match: "@\\w*"
            },
            {
              include: "#comments"
            }
          ],
          begin: "\\{\\{!--",
          end: "--\\}\\}",
          name: "comment.block.handlebars"
        },
        {
          captures: {
            "0": {
              name: "punctuation.definition.comment.html"
            }
          },
          begin: "<!--",
          end: "-{2,3}\\s*>",
          name: "comment.block.html",
          patterns: [
            {
              name: "invalid.illegal.bad-comments-or-CDATA.html",
              match: "--"
            }
          ]
        }
      ]
    },
    block_helper: {
      begin: "(\\{\\{)(~?\\#)([-a-zA-Z0-9_\\./>]+)\\s?(@?[-a-zA-Z0-9_\\./]+)*\\s?(@?[-a-zA-Z0-9_\\./]+)*\\s?(@?[-a-zA-Z0-9_\\./]+)*",
      end: "(~?\\}\\})",
      name: "meta.function.block.start.handlebars",
      endCaptures: {
        "1": {
          name: "support.constant.handlebars"
        }
      },
      beginCaptures: {
        "1": {
          name: "support.constant.handlebars"
        },
        "2": {
          name: "support.constant.handlebars keyword.control"
        },
        "3": {
          name: "support.constant.handlebars keyword.control"
        },
        "4": {
          name: "variable.parameter.handlebars"
        },
        "5": {
          name: "support.constant.handlebars"
        },
        "6": {
          name: "variable.parameter.handlebars"
        },
        "7": {
          name: "support.constant.handlebars"
        }
      },
      patterns: [
        {
          include: "#string"
        },
        {
          include: "#handlebars_attribute"
        }
      ]
    },
    "string-single-quoted": {
      begin: "'",
      end: "'",
      name: "string.quoted.single.handlebars",
      endCaptures: {
        "0": {
          name: "punctuation.definition.string.end.html"
        }
      },
      beginCaptures: {
        "0": {
          name: "punctuation.definition.string.begin.html"
        }
      },
      patterns: [
        {
          include: "#escaped-single-quote"
        },
        {
          include: "#block_comments"
        },
        {
          include: "#comments"
        },
        {
          include: "#block_helper"
        },
        {
          include: "#else_token"
        },
        {
          include: "#end_block"
        },
        {
          include: "#partial_and_var"
        }
      ]
    },
    string: {
      patterns: [
        {
          include: "#string-single-quoted"
        },
        {
          include: "#string-double-quoted"
        }
      ]
    },
    "escaped-single-quote": {
      name: "constant.character.escape.js",
      match: "\\\\'"
    },
    "escaped-double-quote": {
      name: "constant.character.escape.js",
      match: '\\\\"'
    },
    partial_and_var: {
      begin: "(\\{\\{~?\\{*(>|!<)*)\\s*(@?[-a-zA-Z0-9$_\\./]+)*",
      end: "(~?\\}\\}\\}*)",
      name: "meta.function.inline.other.handlebars",
      beginCaptures: {
        "1": {
          name: "support.constant.handlebars"
        },
        "3": {
          name: "variable.parameter.handlebars"
        }
      },
      endCaptures: {
        "1": {
          name: "support.constant.handlebars"
        }
      },
      patterns: [
        {
          include: "#string"
        },
        {
          include: "#handlebars_attribute"
        }
      ]
    },
    handlebars_attribute_name: {
      begin: "\\b([-a-zA-Z0-9_\\.]+)\\b=",
      captures: {
        "1": {
          name: "variable.parameter.handlebars"
        }
      },
      end: `(?='|"|)`,
      name: "entity.other.attribute-name.handlebars"
    },
    handlebars_attribute_value: {
      begin: "([-a-zA-Z0-9_\\./]+)\\b",
      captures: {
        "1": {
          name: "variable.parameter.handlebars"
        }
      },
      end: `('|"|)`,
      name: "entity.other.attribute-value.handlebars",
      patterns: [
        {
          include: "#string"
        }
      ]
    },
    handlebars_attribute: {
      patterns: [
        {
          include: "#handlebars_attribute_name"
        },
        {
          include: "#handlebars_attribute_value"
        }
      ]
    },
    extends: {
      patterns: [
        {
          end: "(\\}\\})",
          begin: "(\\{\\{!<)\\s([-a-zA-Z0-9_\\./]+)",
          beginCaptures: {
            "1": {
              name: "support.function.handlebars"
            },
            "2": {
              name: "support.class.handlebars"
            }
          },
          endCaptures: {
            "1": {
              name: "support.function.handlebars"
            }
          },
          name: "meta.preprocessor.handlebars"
        }
      ]
    },
    else_token: {
      begin: "(\\{\\{)(~?else)(@?\\s(if)\\s([-a-zA-Z0-9_\\.\\(\\s\\)/]+))?",
      end: "(~?\\}\\}\\}*)",
      name: "meta.function.inline.else.handlebars",
      beginCaptures: {
        "1": {
          name: "support.constant.handlebars"
        },
        "2": {
          name: "support.constant.handlebars keyword.control"
        },
        "3": {
          name: "support.constant.handlebars"
        },
        "4": {
          name: "variable.parameter.handlebars"
        }
      },
      endCaptures: {
        "1": {
          name: "support.constant.handlebars"
        }
      }
    },
    "string-double-quoted": {
      begin: '"',
      end: '"',
      name: "string.quoted.double.handlebars",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.string.begin.html"
        }
      },
      endCaptures: {
        "0": {
          name: "punctuation.definition.string.end.html"
        }
      },
      patterns: [
        {
          include: "#escaped-double-quote"
        },
        {
          include: "#block_comments"
        },
        {
          include: "#comments"
        },
        {
          include: "#block_helper"
        },
        {
          include: "#else_token"
        },
        {
          include: "#end_block"
        },
        {
          include: "#partial_and_var"
        }
      ]
    },
    inline_script: {
      begin: `(?:^\\s+)?(<)((?i:script))\\b(?:.*(type)=(["'](?:text/x-handlebars-template|text/x-handlebars|text/template|x-tmpl-handlebars)["']))(?![^>]*/>)`,
      beginCaptures: {
        "1": {
          name: "punctuation.definition.tag.html"
        },
        "2": {
          name: "entity.name.tag.script.html"
        },
        "3": {
          name: "entity.other.attribute-name.html"
        },
        "4": {
          name: "string.quoted.double.html"
        }
      },
      end: "(?<=</(script|SCRIPT))(>)(?:\\s*\\n)?",
      endCaptures: {
        "2": {
          name: "punctuation.definition.tag.html"
        }
      },
      name: "source.handlebars.embedded.html",
      patterns: [
        {
          include: "#tag-stuff"
        },
        {
          begin: "(?<!</(?:script|SCRIPT))(>)",
          captures: {
            "1": {
              name: "punctuation.definition.tag.html"
            },
            "2": {
              name: "entity.name.tag.script.html"
            }
          },
          end: "(</)((?i:script))",
          patterns: [
            {
              include: "#block_comments"
            },
            {
              include: "#comments"
            },
            {
              include: "#block_helper"
            },
            {
              include: "#end_block"
            },
            {
              include: "#else_token"
            },
            {
              include: "#partial_and_var"
            },
            {
              include: "#html_tags"
            },
            {
              include: "text.html.basic"
            }
          ]
        }
      ]
    },
    tag_generic_attribute: {
      begin: "\\b([a-zA-Z0-9_-]+)\\b\\s*(=)",
      captures: {
        "1": {
          name: "entity.other.attribute-name.generic.html"
        },
        "2": {
          name: "punctuation.separator.key-value.html"
        }
      },
      patterns: [
        {
          include: "#string"
        }
      ],
      name: "entity.other.attribute-name.html",
      end: `(?<='|"|)`
    },
    tag_id_attribute: {
      begin: "\\b(id)\\b\\s*(=)",
      captures: {
        "1": {
          name: "entity.other.attribute-name.id.html"
        },
        "2": {
          name: "punctuation.separator.key-value.html"
        }
      },
      end: `(?<='|"|)`,
      name: "meta.attribute-with-value.id.html",
      patterns: [
        {
          include: "#string"
        }
      ]
    },
    "tag-stuff": {
      patterns: [
        {
          include: "#tag_id_attribute"
        },
        {
          include: "#tag_generic_attribute"
        },
        {
          include: "#string"
        },
        {
          include: "#block_comments"
        },
        {
          include: "#comments"
        },
        {
          include: "#block_helper"
        },
        {
          include: "#end_block"
        },
        {
          include: "#else_token"
        },
        {
          include: "#partial_and_var"
        }
      ]
    }
  }
};

// src/.vitepress/config/syntax-highlight/highlight.ts
var __vite_injected_original_import_meta_url3 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config/syntax-highlight/highlight.ts";
var __dirname3 = dirname4(fileURLToPath3(__vite_injected_original_import_meta_url3));
var nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);
var attrsToLines = (attrs) => {
  attrs = attrs.replace(/^(?:\[.*?\])?.*?([\d,-]+).*/, "$1").trim();
  if (!attrs) {
    return [];
  }
  return attrs.split(",").flatMap((v) => {
    const [start, end] = v.split("-").map((v2) => parseInt(v2, 10));
    if (start && end) {
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    } else if (start) {
      return [start];
    } else {
      return [];
    }
  }).map((v) => ({
    line: v,
    classes: ["highlighted"]
  }));
};
var errorLevelProcessor = defineProcessor({
  name: "error-level",
  handler: createRangeProcessor({
    error: ["highlighted", "error"],
    warning: ["highlighted", "warning"]
  })
});
var customProcessor = defineProcessor({
  name: "react",
  handler: createRangeProcessor({
    types: ["starbeam", "interface"],
    react: ["starbeam", "react-preact", "react"],
    preact: ["starbeam", "react-preact", "preact"],
    "template-tag": ["starbeam", "sfc", "tag", "template"],
    "template-tag-ann": ["starbeam", "sfc", "tag", "template", "annotate"],
    script: ["starbeam", "sfc", "script"],
    "script-ann": ["starbeam", "sfc", "script", "annotate"],
    template: ["starbeam", "sfc", "bare", "template"],
    "template-ann": ["starbeam", "sfc", "bare", "tag", "template", "annotate"],
    ann: ["starbeam", "annotate"]
  }),
  postProcess: ({ code }) => {
    if (!code.includes("starbeam")) {
      return;
    }
    return addClass(code, "has-starbeam-lines", "pre");
  }
});
async function highlight2(theme2 = "material-palenight", defaultLang = "") {
  const hasSingleTheme = typeof theme2 === "string" || "name" in theme2;
  const getThemeName2 = (themeValue) => typeof themeValue === "string" ? themeValue : themeValue.name;
  const processors = [
    createFocusProcessor(),
    createHighlightProcessor({ hasHighlightClass: "highlighted" }),
    createDiffProcessor(),
    customProcessor,
    errorLevelProcessor
  ];
  const highlighter = await getHighlighter({
    themes: hasSingleTheme ? [theme2] : [theme2.dark, theme2.light],
    processors
  });
  await highlighter.loadLanguage({
    ...handlebars_tmLanguage_default,
    path: resolve3(__dirname3, "handlebars.tmLanguage.json")
  });
  await highlighter.loadLanguage({
    ...glimmer_tmLanguage_default,
    path: resolve3(__dirname3, "glimmer.tmLanguage.json")
  });
  const styleRE = /<pre[^>]*(style=".*?")/;
  const preRE = /^<pre(.*?)>/;
  const vueRE = /-vue$/;
  const lineNoRE = /:(no-)?line-numbers$/;
  const mustacheRE = /\{\{.*?\}\}/g;
  return (str, specifiedLanguage, attrs) => {
    const vPre = vueRE.test(specifiedLanguage) ? "" : "v-pre";
    const lang = specifiedLanguage.replace(lineNoRE, "").replace(vueRE, "").toLowerCase() || defaultLang;
    const lineOptions = attrsToLines(attrs);
    const cleanup = (str2) => str2.replace(preRE, (_, attributes) => `<pre ${vPre}${attributes}>`).replace(styleRE, (_, style) => _.replace(style, ""));
    const mustaches = /* @__PURE__ */ new Map();
    const removeMustache = (s) => {
      if (vPre)
        return s;
      return s.replace(mustacheRE, (match) => {
        let marker = mustaches.get(match);
        if (!marker) {
          marker = nanoid();
          mustaches.set(match, marker);
        }
        return marker;
      });
    };
    const restoreMustache = (s) => {
      mustaches.forEach((marker, match) => {
        s = s.replaceAll(marker, match);
      });
      return s;
    };
    if (hasSingleTheme) {
      const options = {
        lang,
        theme: getThemeName2(theme2)
      };
      if (lineOptions) {
        options.lineOptions = lineOptions;
      }
      return cleanup(restoreMustache(highlighter.codeToHtml(removeMustache(str), options)));
    }
    const dark = addClass(
      cleanup(highlighter.codeToHtml(str, renderOptions({ lang, lineOptions, theme: theme2.dark }))),
      "vp-code-dark",
      "pre"
    );
    const light = addClass(
      cleanup(
        highlighter.codeToHtml(
          str,
          renderOptions({
            lang,
            lineOptions,
            theme: theme2.dark
          })
        )
      ),
      "vp-code-light",
      "pre"
    );
    return dark + light;
  };
}
function renderOptions({
  lang,
  lineOptions,
  theme: theme2
}) {
  const options = {
    lang,
    theme: getThemeName(theme2)
  };
  if (lineOptions) {
    options.lineOptions = lineOptions;
  }
  return options;
}
function getThemeName(themeValue) {
  return typeof themeValue === "string" ? themeValue : themeValue.name;
}

// src/.vitepress/config/syntax-highlight/setup.ts
import parseFence2 from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/fenceparser@2.2.0/node_modules/fenceparser/dist/index.mjs";
import { dirname as dirname8, resolve as resolve5 } from "node:path";
import { pkgUpSync } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/pkg-up@4.0.0/node_modules/pkg-up/index.js";
import { setupForFile } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/remark-shiki-twoslash@3.1.1_6djyiqpcwuvk2axcgql4owytqi/node_modules/remark-shiki-twoslash/dist/index.js";

// src/.vitepress/config/shiki/shiki.ts
import { findUpSync } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/find-up@6.3.0/node_modules/find-up/index.js";
import { dirname as dirname6 } from "node:path";

// src/.vitepress/config/ts/tsconfig.ts
import { dirname as dirname5 } from "node:path";
import ts from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/typescript@5.0.0-dev.20230217/node_modules/typescript/lib/typescript.js";

// src/.vitepress/config/shiki/ts.ts
var FileDiagnostics = class {
  static for({
    filename,
    errorsRelativeTo: relativeTo
  }) {
    return new FileDiagnostics(filename, relativeTo);
  }
  #filename;
  #relativeTo;
  constructor(filename, relativeTo) {
    this.#filename = filename;
    this.#relativeTo = relativeTo;
  }
  do(callback, message) {
    const result = callback();
    if ("error" in result && result.error) {
      throw this.error(message, [result.error]);
    } else if ("errors" in result && result.errors && result.errors.length > 0) {
      throw this.error(message, result.errors);
    }
    return result;
  }
  error(message, diagnostics = []) {
    return TsDiagnostics.error(Array.isArray(diagnostics) ? diagnostics : [diagnostics], {
      filename: this.#filename,
      relativeTo: this.#relativeTo,
      message
    });
  }
};
var TsDiagnostic = class {
  static from(diagnostic, path4) {
    return new TsDiagnostic(diagnostic, path4);
  }
  static message(diagnostic, path4) {
    return new TsDiagnostic(diagnostic, path4).message;
  }
  #diagnostic;
  #path;
  constructor(diagnostic, path4) {
    this.#diagnostic = diagnostic;
    this.#path = path4;
  }
  get description() {
    return `error TS${this.#diagnostic.code}: ${this.#diagnostic.messageText}`;
  }
  get location() {
    const diagnostic = this.#diagnostic;
    if (diagnostic.file) {
      if (diagnostic.start === void 0) {
        return `${diagnostic.file.fileName}: `;
      }
      const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
      return `${diagnostic.file.fileName}(${position.line + 1},${position.character + 1}): `;
    } else {
      return `${this.#path}: `;
    }
  }
  get message() {
    return `${this.location}${this.description}`;
  }
};
var TsDiagnostics = class {
  static from(diagnostics, options) {
    return new TsDiagnostics(diagnostics, options);
  }
  static error(diagnostics, options) {
    return new TsDiagnostics(diagnostics, options).error;
  }
  /**
   * The directory that filenames should be presented relative to
   */
  #root;
  #path;
  #message;
  #diagnostics;
  constructor(diagnostics, { filename: path4, message, relativeTo: root2 }) {
    this.#root = root2;
    this.#path = path4;
    this.#diagnostics = diagnostics;
    this.#message = message;
  }
  get message() {
    return this.#message ?? "Declaration generation failed";
  }
  get error() {
    const message = [
      this.message,
      ...this.#diagnostics.map((d) => TsDiagnostic.message(d, this.#path))
    ].join("\n");
    const error2 = new Error(message);
    error2.name = "EmitterError";
    return error2;
  }
};

// src/.vitepress/config/ts/tsconfig.ts
function getTsconfig({
  tsconfig,
  errorsRelativeTo
}) {
  const diag = FileDiagnostics.for({
    filename: tsconfig,
    errorsRelativeTo
  });
  const config = diag.do(
    () => ts.readConfigFile(tsconfig, ts.sys.readFile),
    "Failed to read tsconfig.json"
  ).config;
  const parsedTsconfig = diag.do(
    () => ts.parseJsonConfigFileContent(config, ts.sys, dirname5(tsconfig)),
    "failed to parse tsconfig.json"
  );
  return parsedTsconfig;
}

// src/.vitepress/config/vite.ts
import path2, { resolve as resolve4 } from "node:path";
import { fileURLToPath as fileURLToPath4 } from "node:url";
import vars from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-advanced-variables@3.0.1/node_modules/postcss-advanced-variables/index.js";
import functions from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-functions@4.0.2_postcss@8.4.21/node_modules/postcss-functions/dest/index.js";
import values from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-modules-values@4.0.0_postcss@8.4.21/node_modules/postcss-modules-values/src/index.js";
import nested from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-nested@6.0.0_postcss@8.4.21/node_modules/postcss-nested/index.js";
import property from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-property-lookup@3.0.0_postcss@8.4.21/node_modules/postcss-property-lookup/index.js";
import { visualizer } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/rollup-plugin-visualizer@5.9.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";

// src/.vitepress/config/css-functions/color.ts
function color(h, s, l) {
  const sat = typeof s === "string" ? s : `${s}%`;
  return `hsl(${h}, ${sat}, var(--color-lightness-${l}))`;
}

// src/.vitepress/config/vite.ts
var __vite_injected_original_import_meta_url4 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config/vite.ts";
var __dirname4 = path2.dirname(fileURLToPath4(__vite_injected_original_import_meta_url4));
var root = path2.resolve(__dirname4, "../../..");
var CSS = {
  postcss: {
    // syntax: sass,
    plugins: [
      vars(),
      functions({ color }),
      values(),
      property(),
      nested()
    ]
  },
  devSourcemap: true
};
var VITE = {
  css: CSS,
  logLevel: "info",
  optimizeDeps: {
    exclude: ["vitepress-plugin-tabs"]
  },
  envDir: resolve4(root, ".config", ".env"),
  envPrefix: "STARBEAM_",
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          emitFile: true,
          filename: "stats.html"
        })
      ]
    }
  }
};

// src/.vitepress/config/shiki/shiki.ts
var ShikiPackage = class {
  // basic approach taken from
  // https://github.com/AssemblyScript/assemblyscript/blob/1e2de99e43f0d2f61e6699d9c23093a1b753a000/scripts/build-dts.js#L95
  static at({ path: path4, workspaceRoot = root }) {
    const tsconfig = findUpSync("tsconfig.json", {
      cwd: path4,
      stopAt: workspaceRoot,
      type: "file"
    });
    if (!tsconfig) {
      throw Error(`Could not find tsconfig.json for ${path4}`);
    }
    const { options } = getTsconfig({
      tsconfig,
      errorsRelativeTo: workspaceRoot
    });
    return new ShikiPackage(dirname6(tsconfig), options);
  }
  #dir;
  #compilerOptions;
  constructor(dir, compilerOptions) {
    this.#dir = dir;
    this.#compilerOptions = compilerOptions;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return {
      dir: this.#dir,
      compilerOptions: this.#compilerOptions
    };
  }
  get root() {
    return this.#dir;
  }
  get compilerOptions() {
    return this.#compilerOptions;
  }
};

// src/.vitepress/config/syntax-highlight/shiki-twoslash.ts
import { lex, parse } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/fenceparser@2.2.0/node_modules/fenceparser/dist/index.mjs";
import { renderCodeToHTML } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/shiki-twoslash@3.1.1_6djyiqpcwuvk2axcgql4owytqi/node_modules/shiki-twoslash/dist/index.js";

// src/.vitepress/config/syntax-highlight/includes.ts
var addIncludes = (map, name, code) => {
  const lines = [];
  code.split("\n").forEach((l, _i) => {
    const trimmed = l.trim();
    if (trimmed.startsWith("// - ")) {
      const key = trimmed.split("// - ")[1].split(" ")[0];
      map.set(name + "-" + key, lines.join("\n"));
    } else {
      lines.push(l);
    }
  });
  map.set(name, lines.join("\n"));
};

// src/.vitepress/config/syntax-highlight/run-twoslash.ts
import { runTwoSlash } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/shiki-twoslash@3.1.1_6djyiqpcwuvk2axcgql4owytqi/node_modules/shiki-twoslash/dist/index.js";
import { createHash } from "crypto";
import { existsSync as existsSync2, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname as dirname7, join } from "node:path";
import { fileURLToPath as fileURLToPath5 } from "url";
var __vite_injected_original_import_meta_url5 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config/syntax-highlight/run-twoslash.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url5);
var shikiVersion = require2("@typescript/twoslash/package.json").version;
var NodeModules = class {
  static at(path4, pnp = !!process.versions["pnp"]) {
    const [root2] = path4.split("node_modules");
    const cache = cacheFor(pnp, root2, path4);
    return new NodeModules(path4, root2, cache);
  }
  #dirname;
  #root;
  #cache;
  constructor(dirname10, root2, cache) {
    this.#dirname = dirname10;
    this.#root = root2;
    this.#cache = cache;
  }
  /**
   * The root of the npm cache directory (possibly pnp)
   */
  get cacheRoot() {
    return this.#cache;
  }
  /**
   * The directory that contains the node_modules directory.
   */
  get root() {
    const [before] = this.#dirname.split("node_modules");
    return before;
  }
};
function cacheFor(pnp, nmRoot, dirname10) {
  if (pnp === false) {
    return nmCache(nmRoot, dirname10);
  }
  try {
    const pnp2 = require2("pnpapi");
    return join(
      pnp2.getPackageInformation(pnp2.topLevel).packageLocation,
      "node_modules",
      ".cache",
      "twoslash"
    );
  } catch (error2) {
    return nmCache(nmRoot, dirname10);
  }
}
function nmCache(nmRoot, dirname10) {
  if (nmRoot) {
    return join(nmRoot, "node_modules", ".cache", "twoslash");
  } else {
    return join(dirname10, "..", "..", ".cache", "twoslash");
  }
}
var NODE_MODULES = NodeModules.at(dirname7(fileURLToPath5(__vite_injected_original_import_meta_url5)));
var cachedTwoslashCall = (code, lang, settings) => {
  const isWebWorker = typeof self !== "undefined" && // @ts-expect-error
  typeof self.WorkerGlobalScope !== "undefined";
  const isBrowser = isWebWorker || typeof window !== "undefined" && typeof window.document !== "undefined" && typeof fetch !== "undefined";
  if (isBrowser) {
    return runTwoSlash(code, lang, settings);
  }
  const shasum = createHash("sha1");
  const codeSha = shasum.update(`${code}-${shikiVersion}`).digest("hex");
  const cacheRoot = NODE_MODULES.cacheRoot;
  const cachePath = join(cacheRoot, `${codeSha}.json`);
  if (false) {
    if (process.env["debug"])
      console.log(`Using cached twoslash results from ${cachePath}`);
    return JSON.parse(readFileSync3(cachePath, "utf8"));
  } else {
    const results = runTwoSlash(code, lang, settings);
    if (!existsSync2(cacheRoot))
      mkdirSync(cacheRoot, { recursive: true });
    writeFileSync(cachePath, JSON.stringify(results), "utf8");
    return results;
  }
};

// src/.vitepress/config/syntax-highlight/shiki-twoslash.ts
function transformAttributesToHTML(code, fenceString, highlighters, settings) {
  const fence = parseFence(fenceString);
  const twoslash = runTwoSlashOnNode(code, fence, settings);
  const newCode = twoslash && twoslash.code || code;
  return getHTML(newCode, fence, highlighters, twoslash, settings);
}
var parseFence = (fence) => {
  const [lang, ...tokens] = lex(fence);
  if (lang === "twoslash") {
    const index = tokens.indexOf("include");
    if (index !== -1) {
      tokens.splice(index + 1, 0, "=");
    }
  }
  const meta = parse(tokens) ?? {};
  return {
    lang: (lang || "").toString(),
    meta
  };
};
function runTwoSlashOnNode(code, { lang, meta }, settings = {}) {
  const shouldDisableTwoslash = typeof process !== "undefined" && process.env && !!process.env["TWOSLASH_DISABLE"];
  if (shouldDisableTwoslash)
    return void 0;
  if (meta["twoslash"]) {
    return cachedTwoslashCall(code, lang, settings);
  }
  return void 0;
}
var includes = /* @__PURE__ */ new Map();
function getHTML(code, fence, highlighters, twoslash, twoslashSettings) {
  const replacer = {
    json5: "json"
  };
  const replacement = replacer[fence.lang];
  if (replacement)
    fence.lang = replacement;
  let results;
  if (fence.lang === "twoslash") {
    if (!fence.meta["include"] || typeof fence.meta["include"] !== "string") {
      throw new Error("A twoslash code block needs a pragma like 'twoslash include [name]'");
    }
    addIncludes(includes, fence.meta["include"], code);
    results = twoslashSettings.wrapFragments ? `<div class="shiki-twoslash-fragment"></div>` : "";
  } else {
    const output = highlighters.map((highlighter) => {
      const themeName = highlighter.customName.split("/").pop().replace(".json", "");
      return renderCodeToHTML(
        code,
        fence.lang,
        fence.meta,
        { themeName, ...twoslashSettings },
        highlighter,
        twoslash
      );
    });
    results = output.join("\n");
    if (highlighters.length > 1 && twoslashSettings.wrapFragments) {
      results = `<div class="shiki-twoslash-fragment">${results}</div>`;
    }
  }
  return results;
}

// src/.vitepress/config/syntax-highlight/setup.ts
var IS_DEV = process.env["NODE_ENV"] === "development";
var stub = resolve5(root, "packages/twoslash");
async function markdownItShikiTwoslashSetup(settings) {
  const { highlighters } = await setupForFile(settings);
  return (markdownit, options) => {
    const prev = markdownit.options.highlight;
    if (prev === void 0 || prev === null) {
      throw Error(
        "markdown-it-shiki-twoslash requires markdown-it to have a highlighter set"
      );
    }
    markdownit.options.highlight = (snippet, lang, rawAttrs) => {
      const attrs = parseFence2(rawAttrs);
      if (!lang.match(/\btwoslash\b/)) {
        return prev(snippet, lang, rawAttrs);
      }
      const filename = attrs["filename"];
      if (!filename) {
        throw Error(
          "```twoslash fences must specify a filename (e.g. ```twoslash filename=index.ts"
        );
      }
      if (typeof filename !== "string") {
        throw Error(
          `the filename specified in \`\`\`twoslash fences must be a string (you specified ${filename})`
        );
      }
      const pkgJSON = pkgUpSync({
        cwd: dirname8(filename)
      });
      if (pkgJSON === void 0) {
        throw Error(`no package.json found for ${filename}`);
      }
      const vfsRoot = { vfsRoot: dirname8(pkgJSON) };
      const pkg = ShikiPackage.at({
        path: filename,
        workspaceRoot: root
      });
      snippet = snippet.replace(/\r?\n$/, "");
      return transformAttributesToHTML(
        snippet,
        [lang, rawAttrs].join(" "),
        highlighters,
        {
          ...options,
          defaultCompilerOptions: pkg.compilerOptions
          // ...vfsRoot,
          // ...vfsRoot,
          // defaultOptions: {
          // ...options.defaultOptions,
          // ...defaultOptions,
          // },
        }
      );
    };
  };
}

// src/.vitepress/config/markdown.ts
var Shiki = await markdownItShikiTwoslashSetup({
  themes: ["github-dark", "github-light"]
});
var shiki = (md) => {
  return Shiki(md, {
    ignoreCodeblocksWithCodefenceMeta: ["no-shiki"]
  });
};
var THEME = {
  dark: "github-dark",
  light: "github-light"
};
var highlight3 = await highlight2(THEME, "typescript");
var MARKDOWN = {
  lineNumbers: false,
  theme: THEME,
  highlight: highlight3,
  config: (md) => {
    md.use(shiki);
    md.use(fences);
    md.use(snippetPlugin);
    md.use(containers);
    md.use(mermaid);
    md.use(flowchart);
    md.use(mark);
    md.use(tabsMarkdownPlugin);
    md.use(codeTabs);
  },
  toc: {
    level: [2, 3, 4]
  }
};

// src/.vitepress/config.ts
var __vite_injected_original_import_meta_url6 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config.ts";
var dirname9 = path3.dirname(fileURLToPath6(__vite_injected_original_import_meta_url6));
var config_default = defineConfig({
  ...CONFIG,
  ...BUILD_HOOKS,
  head: HEAD,
  outDir: path3.resolve(dirname9, "../../docs"),
  markdown: MARKDOWN,
  themeConfig: {
    nav: NAV,
    sidebar: SIDEBAR,
    socialLinks: SOCIAL,
    editLink: {
      pattern: "https://github.com/starbeamjs/docs/edit/main/src/:path",
      text: "Edit this page on GitHub"
    },
    ...SITE
  },
  vite: VITE,
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes("-")
      }
    }
  }
});
export {
  config_default as default
};