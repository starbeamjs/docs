// src/.vitepress/config.ts
import { defineConfig } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/vitepress@1.0.0-alpha.35_b3xgtgfamhr4jiydlntqmtzdsm/node_modules/vitepress/dist/node/index.js";

// src/.vitepress/config/head.ts
var HEAD = [
  font("Readex Pro", { weight: "160..700" }),
  font("Baloo 2", { weight: "400..800" }),
  font("Expletus Sans", { weight: "400..700" }),
  font("Azeret Mono", { weight: "100..900" }),
  font("Comfortaa", { weight: "400..700" }),
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
function font(family, { weight }) {
  return [
    "link",
    {
      rel: "stylesheet",
      href: `https://fonts.googleapis.com/css2?family=${family.replaceAll(
        " ",
        "+"
      )}:wght@${weight}&display=block`
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
    group(
      "Digging Deeper",
      [
        item("Reactive Collections", "/guides/collections.md"),
        item("Developer Tools", "/guides/devtools.md"),
        item("Equivalence", "/guides/advanced/equivalence.md")
      ],
      "expanded"
    ),
    group("Optimization", [
      item("Formulas", "/guides/optimization/formulas.md")
    ])
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
      item(
        "Getting Started",
        "/frameworks/react/tutorial/1-getting-started.md"
      ),
      item("Computed Data", "/frameworks/react/tutorial/2-computed-data.md"),
      item(
        "Reactive Builtins",
        "/frameworks/react/tutorial/3-reactive-builtins.md"
      ),
      item(
        "Reactive Arrays",
        "/frameworks/react/tutorial/4-reactive-arrays.md"
      )
    ]),
    group("Tutorial Bonus", [
      item(
        "More with Reactive Arrays",
        "/frameworks/react/tutorial/5-reactive-arrays-bonus.md"
      )
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
      return {
        collapsible: true
      };
    case "collapsed":
      return {
        collapsible: true,
        collapsed: true
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
import path4 from "node:path";
import { fileURLToPath as fileURLToPath5 } from "node:url";

// src/.vitepress/config/markdown.ts
import { resolve as resolve4 } from "node:path";
import ts from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/typescript@4.9.4/node_modules/typescript/lib/typescript.js";

// src/.vitepress/packages/vitepress-snippets/src/markdown-it.ts
import "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/@mdit-vue+plugin-sfc@0.11.1/node_modules/@mdit-vue/plugin-sfc/dist/index.mjs";
import Snippet from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/docs-snippet@1.0.4/node_modules/docs-snippet/dist/lib/index.mjs";
import path from "node:path";

// src/.vitepress/packages/vitepress-snippets/src/snippets/language-region.ts
var RenderLanguageRegion = class {
  static create(region, parsed, kind) {
    const lang = region[kind];
    const source = parsed[kind];
    return new RenderLanguageRegion(kind, lang, parsed, source);
  }
  #kind;
  #region;
  #parsed;
  #source;
  constructor(kind, region, parsed, source) {
    this.#kind = kind;
    this.#region = region;
    this.#parsed = parsed;
    this.#source = source;
  }
  highlight(md) {
    var _a, _b;
    const highlights = this.#highlights;
    const code = this.#region.code;
    const prefix = this.#prefix();
    const postfix = this.#postfix();
    const attr = highlights && highlights.length > 0 ? `{${highlights.map((h) => h.lines).join(",")}}` : "";
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
    return ((_b = (_a = md.options).highlight) == null ? void 0 : _b.call(_a, source, "tsx twoslash", attr)) ?? `<pre><code class="language-ts">// @jsxImportSource: preact
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
var MDState = class {
  #state;
  constructor(state) {
    this.#state = state;
  }
  line(lineno) {
    return new LineState(this.#state, lineno);
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
    return this.#src.slice(ws ? this.start : this.contentStart, this.end);
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
  get #totalIndent() {
    return this.#state.sCount[this.#startLine] ?? 0;
  }
  get #requiredIndent() {
    return this.#state.blkIndent;
  }
  get indent() {
    return this.#totalIndent - this.#requiredIndent;
  }
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
    const CH = ";".charCodeAt(0);
    const mdState = new MDState(state);
    const line = mdState.line(startLine);
    const { pos, max } = line.position;
    if (line.isCodeBlock) {
      return false;
    }
    if (line.startsWith("```snippet")) {
      const fenceline = line.string();
      let rawPath = (_a = fenceline.match(/```snippet\s+\{(.*)\}/)) == null ? void 0 : _a[1];
      if (silent) {
        return true;
      }
      const content = (_b = line.next) == null ? void 0 : _b.until(
        (line2) => {
          var _a2;
          return ((_a2 = line2.slice()) == null ? void 0 : _a2.trim()) === "```";
        }
      );
      if (!content) {
        return false;
      }
      const [filename, regionName] = (rawPath == null ? void 0 : rawPath.split("#")) ?? [];
      const file = state.env.path;
      const dir = path.dirname(file);
      const token = state.push("html_block", "", 0);
      let snippet;
      try {
        snippet = Snippet(content);
      } catch (e) {
        token.content = error(
          `Invalid region name: ${regionName}

${content}`
        );
        return true;
      }
      if (regionName) {
        const region = (_c = snippet.regions) == null ? void 0 : _c.get(regionName);
        if (region === void 0) {
          token.content = error(
            `Invalid region name: ${regionName}

${content}`
          );
          return true;
        }
        token.content = highlightRegion(md, region, snippet);
      } else {
        token.content = highlight(md, snippet);
      }
      return true;
    }
    return false;
  };
  md.block.ruler.before("fence", "snippet", parser);
}
function highlightRegion(md, region, complete) {
  const tsFenced = RenderLanguageRegion.create(
    region,
    complete,
    "ts"
  ).highlight(md);
  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }
  const jsFenced = RenderLanguageRegion.create(
    region,
    complete,
    "js"
  ).highlight(md);
  return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}
function highlight(md, region) {
  const tsFenced = highlightLang(md, {
    code: region.ts.code,
    highlights: [],
    prefix: ""
  });
  if (region.ts.code === region.js.code) {
    return `<section class="both-lang">${tsFenced}</section>`;
  }
  const jsFenced = highlightLang(md, {
    code: region.js.code,
    highlights: [],
    prefix: ""
  });
  return `<Code><template #ts>${tsFenced}</template><template #js>${jsFenced}</template></Code>`;
}
function highlightLang(md, {
  code,
  highlights,
  prefix,
  postfix
}) {
  var _a, _b;
  const attr = highlights && highlights.length > 0 ? `{${highlights.map((h) => h.lines).join(",")}}` : "";
  const output = [];
  if (prefix) {
    output.push(prefix, "// ---cut---");
  }
  output.push(code);
  if (postfix) {
    output.push("// ---cut-after---", postfix);
  }
  const source = output.join("\n").trimEnd();
  return ((_b = (_a = md.options).highlight) == null ? void 0 : _b.call(_a, source, "tsx twoslash", attr)) ?? `<pre><code class="language-ts">${code}</code></pre>`;
}
function error(message) {
  return `<div class="language-error ext-error"><pre class="ext-error"><code>${message}</code></pre></div>`;
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
    while (nextLine < endLine) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent)
        break;
      if (state.src[start] === ":" && state.sCount[nextLine] - state.blkIndent < 4) {
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
    while (nextLine < endLine) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent)
        break;
      if (state.src[start] === "@" && state.sCount[nextLine] <= state.sCount[startLine]) {
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
    return `<${component} id="${hash(data)}" :data='${JSON.stringify(data).replace(/'/g, "&#39")}'${activeIndex !== -1 ? ` :active="${activeIndex}"` : ""}${meta.id ? ` tab-id="${meta.id}"` : ""}>
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
    while (nextLine < endLine) {
      nextLine += 1;
      start = state.bMarks[nextLine] + state.tShift[nextLine];
      max = state.eMarks[nextLine];
      if (start < max && state.sCount[nextLine] < state.blkIndent)
        break;
      if (markerStart === state.src[start] && state.sCount[nextLine] - state.blkIndent < 4) {
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
        jump: i / 2,
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
import { readFileSync } from "node:fs";
import path2 from "node:path";
import { fileURLToPath as fileURLToPath2 } from "node:url";
var __vite_injected_original_import_meta_url2 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/plugins/mermaid/flowchart.ts";
var dirname2 = path2.dirname(fileURLToPath2(__vite_injected_original_import_meta_url2));
var styles = readFileSync(path2.resolve(dirname2, "../mermaid.css"), "utf-8");
var theme = {
  theme: "neutral",
  themeVariables: {
    fontFamily: "Azeret Mono",
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
import { customAlphabet } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/nanoid@4.0.0/node_modules/nanoid/index.js";
import { dirname as dirname3, resolve as resolve2 } from "node:path";
import { fileURLToPath as fileURLToPath3 } from "node:url";
import {
  addClass,
  createDiffProcessor,
  createFocusProcessor,
  createHighlightProcessor,
  createRangeProcessor,
  defineProcessor,
  getHighlighter
} from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/shiki-processor@0.1.2_shiki@0.12.1/node_modules/shiki-processor/dist/index.mjs";

// src/.vitepress/config/syntax-highlight/glimmer.tmLanguage.json
var glimmer_tmLanguage_default = {
  information_for_contributors: [
    "This file has been converted from https://github.com/microsoft/TypeScript-TmLanguage/blob/master/TypeScriptReact.tmLanguage",
    "If you want to provide a fix or improvement, please create a pull request against the original repository.",
    "Once accepted there, we are happy to receive an update request."
  ],
  id: "glimmer",
  version: "https://github.com/microsoft/TypeScript-TmLanguage/commit/359e091c0a83a45e20aefc13111ed4a19e201f97",
  name: "Glimmer",
  scopeName: "source.glimmer",
  embeddedLanguages: {
    "meta.embedded.block.handlebars": "handlebars"
  },
  patterns: [
    {
      include: "#directives"
    },
    {
      include: "#statements"
    },
    {
      include: "#shebang"
    },
    {
      include: "#hbs"
    }
  ],
  repository: {
    hbs: {
      begin: "(^|\\G)(\\s*)<template>(\\s*$)",
      end: "(^|\\G)(\\s*)</template>\\s*$",
      contentName: "meta.embedded.block.handlebars"
    },
    shebang: {
      name: "comment.line.shebang.tsx",
      match: "\\A(#!).*(?=$)",
      captures: {
        "1": {
          name: "punctuation.definition.comment.tsx"
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
          name: "storage.modifier.tsx",
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
          name: "keyword.control.trycatch.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(catch|finally|throw|try)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|goto)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "1": {
              name: "keyword.control.loop.tsx"
            },
            "2": {
              name: "entity.name.label.tsx"
            }
          }
        },
        {
          name: "keyword.control.loop.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(break|continue|do|goto|while)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(return)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          beginCaptures: {
            "0": {
              name: "keyword.control.flow.tsx"
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
          name: "keyword.control.switch.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default|switch)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          include: "#if-statement"
        },
        {
          name: "keyword.control.conditional.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(else|if)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.control.with.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(with)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.control.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(package)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.other.debugger.tsx",
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
              name: "entity.name.label.tsx"
            },
            "2": {
              name: "punctuation.separator.label.tsx"
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
              name: "entity.name.label.tsx"
            },
            "2": {
              name: "punctuation.separator.label.tsx"
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
      name: "meta.decorator.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))\\@",
      beginCaptures: {
        "0": {
          name: "punctuation.decorator.tsx"
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
          name: "meta.var.expr.tsx",
          begin: "(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))",
          end: "(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))|((?<!^let|[^\\._$[:alnum:]]let|^var|[^\\._$[:alnum:]]var)(?=\\s*$)))",
          patterns: [
            {
              begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(var|let)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
              beginCaptures: {
                "1": {
                  name: "keyword.control.export.tsx"
                },
                "2": {
                  name: "storage.modifier.tsx"
                },
                "3": {
                  name: "storage.type.tsx"
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
                  name: "punctuation.separator.comma.tsx"
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
          name: "meta.var.expr.tsx",
          begin: "(?=(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.tsx"
            },
            "2": {
              name: "storage.modifier.tsx"
            },
            "3": {
              name: "storage.type.tsx"
            }
          },
          end: "(?!(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))((?=;|}|((?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(of|in)\\s+)|;|^\\s*$|(?:^\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b))|((?<!^const|[^\\._$[:alnum:]]const)(?=\\s*$)))",
          patterns: [
            {
              begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(const(?!\\s+enum\\b))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*",
              beginCaptures: {
                "1": {
                  name: "keyword.control.export.tsx"
                },
                "2": {
                  name: "storage.modifier.tsx"
                },
                "3": {
                  name: "storage.type.tsx"
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
                  name: "punctuation.separator.comma.tsx"
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
          name: "meta.var-single-variable.expr.tsx",
          begin: "(?x)([_$[:alpha:]][_$[:alnum:]]*)(\\!)?(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.tsx entity.name.function.tsx"
            },
            "2": {
              name: "keyword.operator.definiteassignment.tsx"
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
          name: "meta.var-single-variable.expr.tsx",
          begin: "([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])(\\!)?",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.tsx variable.other.constant.tsx"
            },
            "2": {
              name: "keyword.operator.definiteassignment.tsx"
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
          name: "meta.var-single-variable.expr.tsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)(\\!)?",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.tsx variable.other.readwrite.tsx"
            },
            "2": {
              name: "keyword.operator.definiteassignment.tsx"
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
          name: "meta.var-single-variable.expr.tsx",
          begin: "(?x)([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.tsx variable.other.constant.tsx entity.name.function.tsx"
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
          name: "meta.var-single-variable.expr.tsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)",
          beginCaptures: {
            "1": {
              name: "meta.definition.variable.tsx variable.other.constant.tsx"
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
          name: "meta.object-binding-pattern-variable.tsx",
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
          name: "meta.array-binding-pattern-variable.tsx",
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
          name: "meta.object-binding-pattern-variable.tsx",
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
          name: "meta.array-binding-pattern-variable.tsx",
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
          name: "punctuation.destructuring.tsx"
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
          name: "variable.object.property.tsx",
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
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "meta.definition.variable.tsx variable.other.readwrite.tsx"
        }
      }
    },
    "destructuring-variable-rest-const": {
      match: "(?:(\\.\\.\\.)\\s*)?([_$[:alpha:]][_$[:alnum:]]*)",
      captures: {
        "1": {
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "meta.definition.variable.tsx variable.other.constant.tsx"
        }
      }
    },
    "object-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\{)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.object.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.object.tsx"
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
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.object.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.object.tsx"
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
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.array.tsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.array.tsx"
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
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.array.tsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.array.tsx"
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
              name: "storage.modifier.tsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "keyword.operator.rest.tsx"
            },
            "3": {
              name: "entity.name.function.tsx variable.language.this.tsx"
            },
            "4": {
              name: "entity.name.function.tsx"
            },
            "5": {
              name: "keyword.operator.optional.tsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)",
          captures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "keyword.operator.rest.tsx"
            },
            "3": {
              name: "variable.parameter.tsx variable.language.this.tsx"
            },
            "4": {
              name: "variable.parameter.tsx"
            },
            "5": {
              name: "keyword.operator.optional.tsx"
            }
          }
        }
      ]
    },
    "destructuring-parameter": {
      patterns: [
        {
          name: "meta.parameter.object-binding-pattern.tsx",
          begin: "(?<!=|:)\\s*(?:(\\.\\.\\.)\\s*)?(\\{)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.rest.tsx"
            },
            "2": {
              name: "punctuation.definition.binding-pattern.object.tsx"
            }
          },
          end: "\\}",
          endCaptures: {
            "0": {
              name: "punctuation.definition.binding-pattern.object.tsx"
            }
          },
          patterns: [
            {
              include: "#parameter-object-binding-element"
            }
          ]
        },
        {
          name: "meta.paramter.array-binding-pattern.tsx",
          begin: "(?<!=|:)\\s*(?:(\\.\\.\\.)\\s*)?(\\[)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.rest.tsx"
            },
            "2": {
              name: "punctuation.definition.binding-pattern.array.tsx"
            }
          },
          end: "\\]",
          endCaptures: {
            "0": {
              name: "punctuation.definition.binding-pattern.array.tsx"
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
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "variable.parameter.tsx"
        }
      }
    },
    "parameter-object-binding-pattern": {
      begin: "(?:(\\.\\.\\.)\\s*)?(\\{)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.object.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.object.tsx"
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
          name: "keyword.operator.rest.tsx"
        },
        "2": {
          name: "punctuation.definition.binding-pattern.array.tsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "punctuation.definition.binding-pattern.array.tsx"
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
      name: "meta.field.declaration.tsx",
      begin: "(?x)(?<!\\()(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)\\s+)?(?=\\s*((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|(\\#?[_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(?:(?:(\\?)|(\\!))\\s*)?(=|:|;|,|\\}|$))",
      beginCaptures: {
        "1": {
          name: "storage.modifier.tsx"
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
              name: "meta.definition.property.tsx entity.name.function.tsx"
            },
            "2": {
              name: "keyword.operator.optional.tsx"
            },
            "3": {
              name: "keyword.operator.definiteassignment.tsx"
            }
          }
        },
        {
          name: "meta.definition.property.tsx variable.object.property.tsx",
          match: "\\#?[_$[:alpha:]][_$[:alnum:]]*"
        },
        {
          name: "keyword.operator.optional.tsx",
          match: "\\?"
        },
        {
          name: "keyword.operator.definiteassignment.tsx",
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
              name: "keyword.operator.assignment.tsx"
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
              name: "keyword.operator.assignment.tsx"
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
      name: "meta.function.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?(?:(async)\\s+)?(function\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.tsx"
        },
        "2": {
          name: "storage.modifier.tsx"
        },
        "3": {
          name: "storage.modifier.async.tsx"
        },
        "4": {
          name: "storage.type.function.tsx"
        },
        "5": {
          name: "keyword.generator.asterisk.tsx"
        },
        "6": {
          name: "meta.definition.function.tsx entity.name.function.tsx"
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
      name: "meta.function.expression.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(async)\\s+)?(function\\b)(?:\\s*(\\*))?(?:(?:\\s+|(?<=\\*))([_$[:alpha:]][_$[:alnum:]]*))?\\s*",
      beginCaptures: {
        "1": {
          name: "storage.modifier.async.tsx"
        },
        "2": {
          name: "storage.type.function.tsx"
        },
        "3": {
          name: "keyword.generator.asterisk.tsx"
        },
        "4": {
          name: "meta.definition.function.tsx entity.name.function.tsx"
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
      name: "meta.definition.function.tsx entity.name.function.tsx",
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
          name: "keyword.generator.asterisk.tsx",
          match: "\\*"
        }
      ]
    },
    "method-declaration": {
      patterns: [
        {
          name: "meta.method.declaration.tsx",
          begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?\\s*\\b(constructor)\\b(?!:)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          beginCaptures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "storage.modifier.tsx"
            },
            "3": {
              name: "storage.modifier.tsx"
            },
            "4": {
              name: "storage.modifier.async.tsx"
            },
            "5": {
              name: "storage.type.tsx"
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
          name: "meta.method.declaration.tsx",
          begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?(?:(?:\\s*\\b(new)\\b(?!:)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))|(?:(\\*)\\s*)?)(?=\\s*((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
          beginCaptures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "storage.modifier.tsx"
            },
            "3": {
              name: "storage.modifier.tsx"
            },
            "4": {
              name: "storage.modifier.async.tsx"
            },
            "5": {
              name: "keyword.operator.new.tsx"
            },
            "6": {
              name: "keyword.generator.asterisk.tsx"
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
          name: "meta.method.declaration.tsx",
          begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(override)\\s+)?(?:\\b(public|private|protected)\\s+)?(?:\\b(abstract)\\s+)?(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
          beginCaptures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "storage.modifier.tsx"
            },
            "3": {
              name: "storage.modifier.tsx"
            },
            "4": {
              name: "storage.modifier.async.tsx"
            },
            "5": {
              name: "storage.type.property.tsx"
            },
            "6": {
              name: "keyword.generator.asterisk.tsx"
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
      name: "meta.method.declaration.tsx",
      begin: "(?x)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:\\b(async)\\s+)?(?:\\b(get|set)\\s+)?(?:(\\*)\\s*)?(?=\\s*(((\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$))|(\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$))|((?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$))|([_$[:alpha:]][_$[:alnum:]]*)|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])+\\]))\\s*(\\??))\\s*((<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*))?[\\(])",
      beginCaptures: {
        "1": {
          name: "storage.modifier.async.tsx"
        },
        "2": {
          name: "storage.type.property.tsx"
        },
        "3": {
          name: "keyword.generator.asterisk.tsx"
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
              name: "storage.modifier.async.tsx"
            },
            "2": {
              name: "storage.type.property.tsx"
            },
            "3": {
              name: "keyword.generator.asterisk.tsx"
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
          name: "meta.definition.method.tsx entity.name.function.tsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*"
        },
        {
          name: "keyword.operator.optional.tsx",
          match: "\\?"
        }
      ]
    },
    "arrow-function": {
      patterns: [
        {
          name: "meta.arrow.tsx",
          match: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(\\basync)\\s+)?([_$[:alpha:]][_$[:alnum:]]*)\\s*(?==>)",
          captures: {
            "1": {
              name: "storage.modifier.async.tsx"
            },
            "2": {
              name: "variable.parameter.tsx"
            }
          }
        },
        {
          name: "meta.arrow.tsx",
          begin: "(?x) (?:\n  (?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(\\basync)\n)? ((?<![})!\\]])\\s*\n  (?=\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  )\n)",
          beginCaptures: {
            "1": {
              name: "storage.modifier.async.tsx"
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
          name: "meta.arrow.tsx",
          begin: "=>",
          beginCaptures: {
            "0": {
              name: "storage.type.function.arrow.tsx"
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
      name: "meta.indexer.declaration.tsx",
      begin: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(readonly)\\s*)?\\s*(\\[)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=:)",
      beginCaptures: {
        "1": {
          name: "storage.modifier.tsx"
        },
        "2": {
          name: "meta.brace.square.tsx"
        },
        "3": {
          name: "variable.parameter.tsx"
        }
      },
      end: "(\\])\\s*(\\?\\s*)?|$",
      endCaptures: {
        "1": {
          name: "meta.brace.square.tsx"
        },
        "2": {
          name: "keyword.operator.optional.tsx"
        }
      },
      patterns: [
        {
          include: "#type-annotation"
        }
      ]
    },
    "indexer-mapped-type-declaration": {
      name: "meta.indexer.mappedtype.declaration.tsx",
      begin: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([+-])?(readonly)\\s*)?\\s*(\\[)\\s*([_$[:alpha:]][_$[:alnum:]]*)\\s+(in)\\s+",
      beginCaptures: {
        "1": {
          name: "keyword.operator.type.modifier.tsx"
        },
        "2": {
          name: "storage.modifier.tsx"
        },
        "3": {
          name: "meta.brace.square.tsx"
        },
        "4": {
          name: "entity.name.type.tsx"
        },
        "5": {
          name: "keyword.operator.expression.in.tsx"
        }
      },
      end: "(\\])([+-])?\\s*(\\?\\s*)?|$",
      endCaptures: {
        "1": {
          name: "meta.brace.square.tsx"
        },
        "2": {
          name: "keyword.operator.type.modifier.tsx"
        },
        "3": {
          name: "keyword.operator.optional.tsx"
        }
      },
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+",
          captures: {
            "1": {
              name: "keyword.control.as.tsx"
            }
          }
        },
        {
          include: "#type"
        }
      ]
    },
    "function-parameters": {
      name: "meta.parameters.tsx",
      begin: "\\(",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.parameters.begin.tsx"
        }
      },
      end: "\\)",
      endCaptures: {
        "0": {
          name: "punctuation.definition.parameters.end.tsx"
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
          name: "punctuation.separator.parameter.tsx",
          match: ","
        }
      ]
    },
    "class-declaration": {
      name: "meta.class.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(?:(abstract)\\s+)?\\b(class)\\b(?=\\s+|/[/*])",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.tsx"
        },
        "2": {
          name: "storage.modifier.tsx"
        },
        "3": {
          name: "storage.modifier.tsx"
        },
        "4": {
          name: "storage.type.class.tsx"
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
      name: "meta.class.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(class)\\b(?=\\s+|[<{]|\\/[\\/*])",
      beginCaptures: {
        "1": {
          name: "storage.modifier.tsx"
        },
        "2": {
          name: "storage.type.class.tsx"
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
              name: "entity.name.type.class.tsx"
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
      name: "meta.interface.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(?:(abstract)\\s+)?\\b(interface)\\b(?=\\s+|/[/*])",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.tsx"
        },
        "2": {
          name: "storage.modifier.tsx"
        },
        "3": {
          name: "storage.modifier.tsx"
        },
        "4": {
          name: "storage.type.interface.tsx"
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
              name: "entity.name.type.interface.tsx"
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
          name: "storage.modifier.tsx"
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
              name: "entity.name.type.module.tsx"
            },
            "2": {
              name: "punctuation.accessor.tsx"
            },
            "3": {
              name: "punctuation.accessor.optional.tsx"
            }
          }
        },
        {
          match: "([_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "entity.other.inherited-class.tsx"
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
          name: "punctuation.definition.block.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
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
      name: "storage.modifier.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(abstract|declare|override|public|protected|private|readonly|static)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "property-accessor": {
      name: "storage.type.property.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(accessor|get|set)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "async-modifier": {
      name: "storage.modifier.async.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(async)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "enum-declaration": {
      name: "meta.enum.declaration.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?(?:\\b(const)\\s+)?\\b(enum)\\s+([_$[:alpha:]][_$[:alnum:]]*)",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.tsx"
        },
        "2": {
          name: "storage.modifier.tsx"
        },
        "3": {
          name: "storage.modifier.tsx"
        },
        "4": {
          name: "storage.type.enum.tsx"
        },
        "5": {
          name: "entity.name.type.enum.tsx"
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
              name: "punctuation.definition.block.tsx"
            }
          },
          end: "\\}",
          endCaptures: {
            "0": {
              name: "punctuation.definition.block.tsx"
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
                  name: "variable.other.enummember.tsx"
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
      name: "meta.namespace.declaration.tsx",
      begin: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(namespace|module)\\s+(?=[_$[:alpha:]\"'`]))",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.tsx"
        },
        "2": {
          name: "storage.modifier.tsx"
        },
        "3": {
          name: "storage.type.namespace.tsx"
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
          name: "entity.name.type.module.tsx",
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
      name: "meta.type.declaration.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(type)\\b\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.tsx"
        },
        "2": {
          name: "storage.modifier.tsx"
        },
        "3": {
          name: "storage.type.type.tsx"
        },
        "4": {
          name: "entity.name.type.alias.tsx"
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
              name: "keyword.operator.assignment.tsx"
            },
            "2": {
              name: "keyword.control.intrinsic.tsx"
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
              name: "keyword.operator.assignment.tsx"
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
          name: "meta.import-equals.external.tsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type))?\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(=)\\s*(require)\\s*(\\()",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.tsx"
            },
            "2": {
              name: "storage.modifier.tsx"
            },
            "3": {
              name: "keyword.control.import.tsx"
            },
            "4": {
              name: "keyword.control.type.tsx"
            },
            "5": {
              name: "variable.other.readwrite.alias.tsx"
            },
            "6": {
              name: "keyword.operator.assignment.tsx"
            },
            "7": {
              name: "keyword.control.require.tsx"
            },
            "8": {
              name: "meta.brace.round.tsx"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "meta.brace.round.tsx"
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
          name: "meta.import-equals.internal.tsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type))?\\s+([_$[:alpha:]][_$[:alnum:]]*)\\s*(=)\\s*(?!require\\b)",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.tsx"
            },
            "2": {
              name: "storage.modifier.tsx"
            },
            "3": {
              name: "keyword.control.import.tsx"
            },
            "4": {
              name: "keyword.control.type.tsx"
            },
            "5": {
              name: "variable.other.readwrite.alias.tsx"
            },
            "6": {
              name: "keyword.operator.assignment.tsx"
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
                  name: "entity.name.type.module.tsx"
                },
                "2": {
                  name: "punctuation.accessor.tsx"
                },
                "3": {
                  name: "punctuation.accessor.optional.tsx"
                }
              }
            },
            {
              name: "variable.other.readwrite.tsx",
              match: "([_$[:alpha:]][_$[:alnum:]]*)"
            }
          ]
        }
      ]
    },
    "import-declaration": {
      name: "meta.import.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(\\bexport)\\s+)?(?:(\\bdeclare)\\s+)?\\b(import)(?:\\s+(type)(?!\\s+from))?(?!\\s*[:\\(])(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "1": {
          name: "keyword.control.export.tsx"
        },
        "2": {
          name: "storage.modifier.tsx"
        },
        "3": {
          name: "keyword.control.import.tsx"
        },
        "4": {
          name: "keyword.control.type.tsx"
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
              name: "keyword.control.from.tsx"
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
              name: "keyword.control.export.tsx"
            },
            "2": {
              name: "keyword.control.as.tsx"
            },
            "3": {
              name: "storage.type.namespace.tsx"
            },
            "4": {
              name: "entity.name.type.module.tsx"
            }
          }
        },
        {
          name: "meta.export.default.tsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)(?:\\s+(type))?(?:(?:\\s*(=))|(?:\\s+(default)(?=\\s+)))",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.tsx"
            },
            "2": {
              name: "keyword.control.type.tsx"
            },
            "3": {
              name: "keyword.operator.assignment.tsx"
            },
            "4": {
              name: "keyword.control.default.tsx"
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
          name: "meta.export.tsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(export)(?:\\s+(type))?\\b(?!(\\$)|(\\s*:))((?=\\s*[\\{*])|((?=\\s*[_$[:alpha:]][_$[:alnum:]]*(\\s|,))(?!\\s*(?:abstract|async|class|const|declare|enum|export|function|import|interface|let|module|namespace|return|type|var)\\b)))",
          beginCaptures: {
            "1": {
              name: "keyword.control.export.tsx"
            },
            "2": {
              name: "keyword.control.type.tsx"
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
          name: "keyword.control.from.tsx",
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
          name: "keyword.control.assert.tsx"
        },
        "2": {
          name: "punctuation.definition.block.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
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
          name: "meta.object-literal.key.tsx",
          match: "(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)"
        },
        {
          name: "punctuation.separator.key-value.tsx",
          match: ":"
        }
      ]
    },
    "import-export-block": {
      name: "meta.block.tsx",
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
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
              name: "keyword.control.type.tsx"
            },
            "2": {
              name: "keyword.control.default.tsx"
            },
            "3": {
              name: "constant.language.import-export-all.tsx"
            },
            "4": {
              name: "variable.other.readwrite.tsx"
            },
            "5": {
              name: "keyword.control.as.tsx"
            },
            "6": {
              name: "keyword.control.default.tsx"
            },
            "7": {
              name: "variable.other.readwrite.alias.tsx"
            }
          }
        },
        {
          include: "#punctuation-comma"
        },
        {
          name: "constant.language.import-export-all.tsx",
          match: "\\*"
        },
        {
          name: "keyword.control.default.tsx",
          match: "\\b(default)\\b"
        },
        {
          match: "(?:(\\btype)\\s+)?([_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "keyword.control.type.tsx"
            },
            "2": {
              name: "variable.other.readwrite.alias.tsx"
            }
          }
        }
      ]
    },
    "switch-statement": {
      name: "switch-statement.expr.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?=\\bswitch\\s*\\()",
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
        }
      },
      patterns: [
        {
          include: "#comment"
        },
        {
          name: "switch-expression.expr.tsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(switch)\\s*(\\()",
          beginCaptures: {
            "1": {
              name: "keyword.control.switch.tsx"
            },
            "2": {
              name: "meta.brace.round.tsx"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "meta.brace.round.tsx"
            }
          },
          patterns: [
            {
              include: "#expression"
            }
          ]
        },
        {
          name: "switch-block.expr.tsx",
          begin: "\\{",
          beginCaptures: {
            "0": {
              name: "punctuation.definition.block.tsx"
            }
          },
          end: "(?=\\})",
          patterns: [
            {
              name: "case-clause.expr.tsx",
              begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(case|default(?=:))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
              beginCaptures: {
                "1": {
                  name: "keyword.control.switch.tsx"
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
                  name: "case-clause.expr.tsx punctuation.definition.section.case-statement.tsx"
                },
                "2": {
                  name: "meta.block.tsx punctuation.definition.block.tsx"
                }
              },
              end: "\\}",
              endCaptures: {
                "0": {
                  name: "meta.block.tsx punctuation.definition.block.tsx"
                }
              },
              contentName: "meta.block.tsx",
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
                  name: "case-clause.expr.tsx punctuation.definition.section.case-statement.tsx"
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
          name: "keyword.control.loop.tsx"
        }
      },
      end: "(?<=\\))",
      patterns: [
        {
          include: "#comment"
        },
        {
          name: "keyword.control.loop.tsx",
          match: "await"
        },
        {
          begin: "\\(",
          beginCaptures: {
            "0": {
              name: "meta.brace.round.tsx"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "meta.brace.round.tsx"
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
                  name: "keyword.control.conditional.tsx"
                },
                "2": {
                  name: "meta.brace.round.tsx"
                }
              },
              end: "\\)",
              endCaptures: {
                "0": {
                  name: "meta.brace.round.tsx"
                }
              },
              patterns: [
                {
                  include: "#expression"
                }
              ]
            },
            {
              name: "string.regexp.tsx",
              begin: "(?<=\\))\\s*\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
              beginCaptures: {
                "0": {
                  name: "punctuation.definition.string.begin.tsx"
                }
              },
              end: "(/)([dgimsuy]*)",
              endCaptures: {
                "1": {
                  name: "punctuation.definition.string.end.tsx"
                },
                "2": {
                  name: "keyword.other.tsx"
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
      name: "meta.block.tsx",
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
        }
      },
      patterns: [
        {
          include: "#statements"
        }
      ]
    },
    "after-operator-block-as-object-literal": {
      name: "meta.objectliteral.tsx",
      begin: "(?<!\\+\\+|--)(?<=[:=(,\\[?+!>]|^await|[^\\._$[:alnum:]]await|^return|[^\\._$[:alnum:]]return|^yield|[^\\._$[:alnum:]]yield|^throw|[^\\._$[:alnum:]]throw|^in|[^\\._$[:alnum:]]in|^of|[^\\._$[:alnum:]]of|^typeof|[^\\._$[:alnum:]]typeof|&&|\\|\\||\\*)\\s*(\\{)",
      beginCaptures: {
        "1": {
          name: "punctuation.definition.block.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
        }
      },
      patterns: [
        {
          include: "#object-member"
        }
      ]
    },
    "object-literal": {
      name: "meta.objectliteral.tsx",
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
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
          name: "meta.object.member.tsx meta.object-literal.key.tsx",
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
          name: "meta.object.member.tsx meta.object-literal.key.tsx",
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
          name: "meta.object.member.tsx meta.object-literal.key.tsx",
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
          name: "meta.method.declaration.tsx",
          begin: "(?<=[\\]\\'\\\"\\`])(?=\\s*[\\(\\<])",
          end: "(?=\\}|;|,)|(?<=\\})",
          patterns: [
            {
              include: "#function-body"
            }
          ]
        },
        {
          name: "meta.object.member.tsx",
          match: "(?![_$[:alpha:]])([[:digit:]]+)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)",
          captures: {
            "0": {
              name: "meta.object-literal.key.tsx"
            },
            "1": {
              name: "constant.numeric.decimal.tsx"
            }
          }
        },
        {
          name: "meta.object.member.tsx",
          match: "(?x)(?:([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:(\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/)*\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "0": {
              name: "meta.object-literal.key.tsx"
            },
            "1": {
              name: "entity.name.function.tsx"
            }
          }
        },
        {
          name: "meta.object.member.tsx",
          match: "(?:[_$[:alpha:]][_$[:alnum:]]*)\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*:)",
          captures: {
            "0": {
              name: "meta.object-literal.key.tsx"
            }
          }
        },
        {
          name: "meta.object.member.tsx",
          begin: "\\.\\.\\.",
          beginCaptures: {
            "0": {
              name: "keyword.operator.spread.tsx"
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
          name: "meta.object.member.tsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)\\s*(?=,|\\}|$|\\/\\/|\\/\\*)",
          captures: {
            "1": {
              name: "variable.other.readwrite.tsx"
            }
          }
        },
        {
          name: "meta.object.member.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*([,}]|$))",
          captures: {
            "1": {
              name: "keyword.control.as.tsx"
            },
            "2": {
              name: "storage.modifier.tsx"
            }
          }
        },
        {
          name: "meta.object.member.tsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(as)|(satisfies))\\s+",
          beginCaptures: {
            "1": {
              name: "keyword.control.as.tsx"
            },
            "2": {
              name: "keyword.control.satisfies.tsx"
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
          name: "meta.object.member.tsx",
          begin: "(?=[_$[:alpha:]][_$[:alnum:]]*\\s*=)",
          end: "(?=,|\\}|$|\\/\\/|\\/\\*)",
          patterns: [
            {
              include: "#expression"
            }
          ]
        },
        {
          name: "meta.object.member.tsx",
          begin: ":",
          beginCaptures: {
            "0": {
              name: "meta.object-literal.key.tsx punctuation.separator.key-value.tsx"
            }
          },
          end: "(?=,|\\})",
          patterns: [
            {
              begin: "(?<=:)\\s*(async)?(?=\\s*(<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)\\(\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))",
              beginCaptures: {
                "1": {
                  name: "storage.modifier.async.tsx"
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
                      name: "meta.brace.round.tsx"
                    }
                  },
                  end: "\\)",
                  endCaptures: {
                    "0": {
                      name: "meta.brace.round.tsx"
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
                  name: "storage.modifier.async.tsx"
                },
                "2": {
                  name: "meta.brace.round.tsx"
                }
              },
              end: "\\)",
              endCaptures: {
                "0": {
                  name: "meta.brace.round.tsx"
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
                  name: "storage.modifier.async.tsx"
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
                  name: "meta.brace.round.tsx"
                }
              },
              end: "\\)",
              endCaptures: {
                "0": {
                  name: "meta.brace.round.tsx"
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
          name: "keyword.operator.ternary.tsx"
        }
      },
      end: "\\s*(:)",
      endCaptures: {
        "1": {
          name: "keyword.operator.ternary.tsx"
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
              name: "meta.function-call.tsx",
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
              name: "meta.function-call.tsx",
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
          name: "entity.name.function.tsx",
          match: "(\\#?[_$[:alpha:]][_$[:alnum:]]*)"
        }
      ]
    },
    "function-call-optionals": {
      patterns: [
        {
          name: "meta.function-call.tsx punctuation.accessor.optional.tsx",
          match: "\\?\\."
        },
        {
          name: "meta.function-call.tsx keyword.operator.definiteassignment.tsx",
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
          name: "keyword.operator.expression.import.tsx",
          match: "(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))import(?=\\s*[\\(]\\s*[\\\"\\'\\`]))"
        }
      ]
    },
    "new-expr": {
      name: "new.expr.tsx",
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(new)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "1": {
          name: "keyword.operator.new.tsx"
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
          name: "keyword.operator.expression.instanceof.tsx"
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
              name: "storage.modifier.async.tsx"
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
              name: "storage.modifier.async.tsx"
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
              name: "meta.brace.round.tsx"
            }
          },
          end: "\\)",
          endCaptures: {
            "0": {
              name: "meta.brace.round.tsx"
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
              name: "storage.modifier.tsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*\n# function assignment |\n(=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)) |\n# typeannotation is fn type: < | () | (... | (param: | (param, | (param? | (param= | (param) =>\n(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))) |\n(:\\s*(=>|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(<[^<>]*>)|[^<>(),=])+=\\s*(\n  ((async\\s+)?(\n    (function\\s*[(<*]) |\n    (function\\s+) |\n    ([_$[:alpha:]][_$[:alnum:]]*\\s*=>)\n  )) |\n  ((async\\s*)?(\n    ((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))))) |\n    # sure shot arrow functions even if => is on new line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\n  [(]\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*\n  (\n    ([)]\\s*:) |                                                                                       # ():\n    ((\\.\\.\\.\\s*)?[_$[:alpha:]][_$[:alnum:]]*\\s*:)                                                                  # [(]param: | [(]...param:\n  )\n) |\n(\n  [<]\\s*[_$[:alpha:]][_$[:alnum:]]*\\s+extends\\s*[^=>]                                                              # < typeparam extends\n) |\n# arrow function possible to detect only with => on same line\n(\n  (<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?                                                                                 # typeparameters\n  \\(\\s*(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)*(([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\.\\.\\.\\s*[_$[:alpha:]]))([^()\\'\\\"\\`]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))*)?\\)   # parameters\n  (\\s*:\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+)?                                                                        # return type\n  \\s*=>                                                                                               # arrow operator\n)\n  ))\n)))",
          captures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "keyword.operator.rest.tsx"
            },
            "3": {
              name: "entity.name.function.tsx variable.language.this.tsx"
            },
            "4": {
              name: "entity.name.function.tsx"
            },
            "5": {
              name: "keyword.operator.optional.tsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(override|public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))\\s*(\\??)(?=\\s*[:,]|$)",
          captures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "keyword.operator.rest.tsx"
            },
            "3": {
              name: "variable.parameter.tsx variable.language.this.tsx"
            },
            "4": {
              name: "variable.parameter.tsx"
            },
            "5": {
              name: "keyword.operator.optional.tsx"
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
          name: "punctuation.separator.parameter.tsx",
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
          name: "meta.brace.round.tsx"
        }
      },
      end: "\\)",
      endCaptures: {
        "0": {
          name: "meta.brace.round.tsx"
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
          name: "keyword.control.flow.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(await)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(yield)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?=\\s*\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*\\*)",
          beginCaptures: {
            "1": {
              name: "keyword.control.flow.tsx"
            }
          },
          end: "\\*",
          endCaptures: {
            "0": {
              name: "keyword.generator.asterisk.tsx"
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
              name: "keyword.control.flow.tsx"
            },
            "2": {
              name: "keyword.generator.asterisk.tsx"
            }
          }
        },
        {
          name: "keyword.operator.expression.delete.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))delete(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.operator.expression.in.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))in(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?!\\()"
        },
        {
          name: "keyword.operator.expression.of.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))of(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?!\\()"
        },
        {
          name: "keyword.operator.expression.instanceof.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))instanceof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.operator.new.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))new(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          include: "#typeof-operator"
        },
        {
          name: "keyword.operator.expression.void.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))void(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(as)\\s+(const)(?=\\s*($|[;,:})\\]]))",
          captures: {
            "1": {
              name: "keyword.control.as.tsx"
            },
            "2": {
              name: "storage.modifier.tsx"
            }
          }
        },
        {
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(as)|(satisfies))\\s+",
          beginCaptures: {
            "1": {
              name: "keyword.control.as.tsx"
            },
            "2": {
              name: "keyword.control.satisfies.tsx"
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
          name: "keyword.operator.spread.tsx",
          match: "\\.\\.\\."
        },
        {
          name: "keyword.operator.assignment.compound.tsx",
          match: "\\*=|(?<!\\()/=|%=|\\+=|\\-="
        },
        {
          name: "keyword.operator.assignment.compound.bitwise.tsx",
          match: "\\&=|\\^=|<<=|>>=|>>>=|\\|="
        },
        {
          name: "keyword.operator.bitwise.shift.tsx",
          match: "<<|>>>|>>"
        },
        {
          name: "keyword.operator.comparison.tsx",
          match: "===|!==|==|!="
        },
        {
          name: "keyword.operator.relational.tsx",
          match: "<=|>=|<>|<|>"
        },
        {
          match: "(?<=[_$[:alnum:]])(\\!)\\s*(?:(/=)|(?:(/)(?![/*])))",
          captures: {
            "1": {
              name: "keyword.operator.logical.tsx"
            },
            "2": {
              name: "keyword.operator.assignment.compound.tsx"
            },
            "3": {
              name: "keyword.operator.arithmetic.tsx"
            }
          }
        },
        {
          name: "keyword.operator.logical.tsx",
          match: "\\!|&&|\\|\\||\\?\\?"
        },
        {
          name: "keyword.operator.bitwise.tsx",
          match: "\\&|~|\\^|\\|"
        },
        {
          name: "keyword.operator.assignment.tsx",
          match: "\\="
        },
        {
          name: "keyword.operator.decrement.tsx",
          match: "--"
        },
        {
          name: "keyword.operator.increment.tsx",
          match: "\\+\\+"
        },
        {
          name: "keyword.operator.arithmetic.tsx",
          match: "%|\\*|/|-|\\+"
        },
        {
          begin: "(?<=[_$[:alnum:])\\]])\\s*(?=(\\/\\*([^\\*]|(\\*[^\\/]))*\\*\\/\\s*)+(?:(/=)|(?:(/)(?![/*]))))",
          end: "(?:(/=)|(?:(/)(?!\\*([^\\*]|(\\*[^\\/]))*\\*\\/)))",
          endCaptures: {
            "1": {
              name: "keyword.operator.assignment.compound.tsx"
            },
            "2": {
              name: "keyword.operator.arithmetic.tsx"
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
              name: "keyword.operator.assignment.compound.tsx"
            },
            "2": {
              name: "keyword.operator.arithmetic.tsx"
            }
          }
        }
      ]
    },
    "typeof-operator": {
      begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))typeof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
      beginCaptures: {
        "0": {
          name: "keyword.operator.expression.typeof.tsx"
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
      name: "meta.array.literal.tsx",
      begin: "\\s*(\\[)",
      beginCaptures: {
        "1": {
          name: "meta.brace.square.tsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "meta.brace.square.tsx"
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
          name: "constant.numeric.hex.tsx",
          match: "\\b(?<!\\$)0(?:x|X)[0-9a-fA-F][0-9a-fA-F_]*(n)?\\b(?!\\$)",
          captures: {
            "1": {
              name: "storage.type.numeric.bigint.tsx"
            }
          }
        },
        {
          name: "constant.numeric.binary.tsx",
          match: "\\b(?<!\\$)0(?:b|B)[01][01_]*(n)?\\b(?!\\$)",
          captures: {
            "1": {
              name: "storage.type.numeric.bigint.tsx"
            }
          }
        },
        {
          name: "constant.numeric.octal.tsx",
          match: "\\b(?<!\\$)0(?:o|O)?[0-7][0-7_]*(n)?\\b(?!\\$)",
          captures: {
            "1": {
              name: "storage.type.numeric.bigint.tsx"
            }
          }
        },
        {
          match: "(?x)\n(?<!\\$)(?:\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)| # 1.1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # 1.E+3\n  (?:\\B(\\.)[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|             # .1E+3\n  (?:\\b[0-9][0-9_]*[eE][+-]?[0-9][0-9_]*(n)?\\b)|                 # 1E+3\n  (?:\\b[0-9][0-9_]*(\\.)[0-9][0-9_]*(n)?\\b)|                      # 1.1\n  (?:\\b[0-9][0-9_]*(\\.)(n)?\\B)|                                  # 1.\n  (?:\\B(\\.)[0-9][0-9_]*(n)?\\b)|                                  # .1\n  (?:\\b[0-9][0-9_]*(n)?\\b(?!\\.))                                 # 1\n)(?!\\$)",
          captures: {
            "0": {
              name: "constant.numeric.decimal.tsx"
            },
            "1": {
              name: "meta.delimiter.decimal.period.tsx"
            },
            "2": {
              name: "storage.type.numeric.bigint.tsx"
            },
            "3": {
              name: "meta.delimiter.decimal.period.tsx"
            },
            "4": {
              name: "storage.type.numeric.bigint.tsx"
            },
            "5": {
              name: "meta.delimiter.decimal.period.tsx"
            },
            "6": {
              name: "storage.type.numeric.bigint.tsx"
            },
            "7": {
              name: "storage.type.numeric.bigint.tsx"
            },
            "8": {
              name: "meta.delimiter.decimal.period.tsx"
            },
            "9": {
              name: "storage.type.numeric.bigint.tsx"
            },
            "10": {
              name: "meta.delimiter.decimal.period.tsx"
            },
            "11": {
              name: "storage.type.numeric.bigint.tsx"
            },
            "12": {
              name: "meta.delimiter.decimal.period.tsx"
            },
            "13": {
              name: "storage.type.numeric.bigint.tsx"
            },
            "14": {
              name: "storage.type.numeric.bigint.tsx"
            }
          }
        }
      ]
    },
    "boolean-literal": {
      patterns: [
        {
          name: "constant.language.boolean.true.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))true(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "constant.language.boolean.false.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))false(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        }
      ]
    },
    "null-literal": {
      name: "constant.language.null.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))null(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "this-literal": {
      name: "variable.language.this.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))this\\b(?!\\$)"
    },
    "super-literal": {
      name: "variable.language.super.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))super\\b(?!\\$)"
    },
    "undefined-literal": {
      name: "constant.language.undefined.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))undefined(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "numericConstant-literal": {
      patterns: [
        {
          name: "constant.language.nan.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))NaN(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "constant.language.infinity.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Infinity(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        }
      ]
    },
    "support-objects": {
      patterns: [
        {
          name: "variable.language.arguments.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(arguments)\\b(?!\\$)"
        },
        {
          name: "support.class.promise.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(Promise)\\b(?!\\$)"
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(import)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(meta)\\b(?!\\$)",
          captures: {
            "1": {
              name: "keyword.control.import.tsx"
            },
            "2": {
              name: "punctuation.accessor.tsx"
            },
            "3": {
              name: "punctuation.accessor.optional.tsx"
            },
            "4": {
              name: "support.variable.property.importmeta.tsx"
            }
          }
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(new)\\s*(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(target)\\b(?!\\$)",
          captures: {
            "1": {
              name: "keyword.operator.new.tsx"
            },
            "2": {
              name: "punctuation.accessor.tsx"
            },
            "3": {
              name: "punctuation.accessor.optional.tsx"
            },
            "4": {
              name: "support.variable.property.target.tsx"
            }
          }
        },
        {
          match: "(?x) (?:(\\.)|(\\?\\.(?!\\s*[[:digit:]]))) \\s* (?:\n  (?:(constructor|length|prototype|__proto__)\\b(?!\\$|\\s*(<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<]|\\<\\s*([_$[:alpha:]]|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\]))([^=<>]|=[^<])*\\>)*\\>)*>\\s*)?\\())\n  |\n  (?:(EPSILON|MAX_SAFE_INTEGER|MAX_VALUE|MIN_SAFE_INTEGER|MIN_VALUE|NEGATIVE_INFINITY|POSITIVE_INFINITY)\\b(?!\\$)))",
          captures: {
            "1": {
              name: "punctuation.accessor.tsx"
            },
            "2": {
              name: "punctuation.accessor.optional.tsx"
            },
            "3": {
              name: "support.variable.property.tsx"
            },
            "4": {
              name: "support.constant.tsx"
            }
          }
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(exports)|(module)(?:(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))(exports|id|filename|loaded|parent|children))?)\\b(?!\\$)",
          captures: {
            "1": {
              name: "support.type.object.module.tsx"
            },
            "2": {
              name: "support.type.object.module.tsx"
            },
            "3": {
              name: "punctuation.accessor.tsx"
            },
            "4": {
              name: "punctuation.accessor.optional.tsx"
            },
            "5": {
              name: "support.type.object.module.tsx"
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
              name: "punctuation.accessor.tsx"
            },
            "2": {
              name: "punctuation.accessor.optional.tsx"
            },
            "3": {
              name: "entity.name.function.tsx"
            }
          }
        },
        {
          match: "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])",
          captures: {
            "1": {
              name: "punctuation.accessor.tsx"
            },
            "2": {
              name: "punctuation.accessor.optional.tsx"
            },
            "3": {
              name: "variable.other.constant.property.tsx"
            }
          }
        },
        {
          match: "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "punctuation.accessor.tsx"
            },
            "2": {
              name: "punctuation.accessor.optional.tsx"
            },
            "3": {
              name: "variable.other.property.tsx"
            }
          }
        },
        {
          name: "variable.other.constant.tsx",
          match: "([[:upper:]][_$[:digit:][:upper:]]*)(?![_$[:alnum:]])"
        },
        {
          name: "variable.other.readwrite.tsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*"
        }
      ]
    },
    "object-identifiers": {
      patterns: [
        {
          name: "support.class.tsx",
          match: "([_$[:alpha:]][_$[:alnum:]]*)(?=\\s*\\??\\.\\s*prototype\\b(?!\\$))"
        },
        {
          match: "(?x)(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))\\s*(?:\n  (\\#?[[:upper:]][_$[:digit:][:upper:]]*) |\n  (\\#?[_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "punctuation.accessor.tsx"
            },
            "2": {
              name: "punctuation.accessor.optional.tsx"
            },
            "3": {
              name: "variable.other.constant.object.property.tsx"
            },
            "4": {
              name: "variable.other.object.property.tsx"
            }
          }
        },
        {
          match: "(?x)(?:\n  ([[:upper:]][_$[:digit:][:upper:]]*) |\n  ([_$[:alpha:]][_$[:alnum:]]*)\n)(?=\\s*\\??\\.\\s*\\#?[_$[:alpha:]][_$[:alnum:]]*)",
          captures: {
            "1": {
              name: "variable.other.constant.object.tsx"
            },
            "2": {
              name: "variable.other.object.tsx"
            }
          }
        }
      ]
    },
    "type-annotation": {
      patterns: [
        {
          name: "meta.type.annotation.tsx",
          begin: "(:)(?=\\s*\\S)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.tsx"
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
          name: "meta.type.annotation.tsx",
          begin: "(:)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.tsx"
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
          name: "meta.type.annotation.tsx",
          begin: "(:)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.tsx"
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
          name: "meta.return.type.tsx",
          begin: "(?<=\\))\\s*(:)(?=\\s*\\S)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.tsx"
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
          name: "meta.return.type.tsx",
          begin: "(?<=\\))\\s*(:)",
          beginCaptures: {
            "1": {
              name: "keyword.operator.type.annotation.tsx"
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
      name: "meta.return.type.arrow.tsx",
      begin: "(?<=\\))\\s*(:)",
      beginCaptures: {
        "1": {
          name: "keyword.operator.type.annotation.tsx"
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
          name: "meta.arrow.tsx meta.return.type.arrow.tsx keyword.operator.type.annotation.tsx"
        }
      },
      end: "(?==>|\\{|(^\\s*(export|function|class|interface|let|var|const|import|enum|namespace|module|type|abstract|declare)\\s+))",
      contentName: "meta.arrow.tsx meta.return.type.arrow.tsx",
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
      name: "meta.type.parameters.tsx",
      begin: "(<)",
      beginCaptures: {
        "1": {
          name: "punctuation.definition.typeparameters.begin.tsx"
        }
      },
      end: "(>)",
      endCaptures: {
        "1": {
          name: "punctuation.definition.typeparameters.end.tsx"
        }
      },
      patterns: [
        {
          include: "#comment"
        },
        {
          name: "storage.modifier.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(extends|in|out)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          include: "#type"
        },
        {
          include: "#punctuation-comma"
        },
        {
          name: "keyword.operator.assignment.tsx",
          match: "(=)(?!>)"
        }
      ]
    },
    "type-arguments": {
      name: "meta.type.parameters.tsx",
      begin: "\\<",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.typeparameters.begin.tsx"
        }
      },
      end: "\\>",
      endCaptures: {
        "0": {
          name: "punctuation.definition.typeparameters.end.tsx"
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
              name: "keyword.operator.type.tsx"
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
              name: "storage.modifier.tsx"
            }
          }
        },
        {
          include: "#type-name"
        }
      ]
    },
    "type-primitive": {
      name: "support.type.primitive.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(string|number|bigint|boolean|symbol|any|void|never|unknown)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "type-builtin-literals": {
      name: "support.type.builtin.tsx",
      match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(this|true|false|undefined|null|object)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
    },
    "type-tuple": {
      name: "meta.type.tuple.tsx",
      begin: "\\[",
      beginCaptures: {
        "0": {
          name: "meta.brace.square.tsx"
        }
      },
      end: "\\]",
      endCaptures: {
        "0": {
          name: "meta.brace.square.tsx"
        }
      },
      patterns: [
        {
          name: "keyword.operator.rest.tsx",
          match: "\\.\\.\\."
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))([_$[:alpha:]][_$[:alnum:]]*)\\s*(\\?)?\\s*(:)",
          captures: {
            "1": {
              name: "entity.name.label.tsx"
            },
            "2": {
              name: "keyword.operator.optional.tsx"
            },
            "3": {
              name: "punctuation.separator.label.tsx"
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
      name: "meta.object.type.tsx",
      begin: "\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.block.tsx"
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
              name: "keyword.operator.spread.tsx"
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
              name: "storage.modifier.tsx"
            }
          },
          end: "(?<=:)",
          patterns: [
            {
              begin: "\\?",
              beginCaptures: {
                "0": {
                  name: "keyword.operator.ternary.tsx"
                }
              },
              end: ":",
              endCaptures: {
                "0": {
                  name: "keyword.operator.ternary.tsx"
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
      name: "meta.type.paren.cover.tsx",
      begin: "\\(",
      beginCaptures: {
        "0": {
          name: "meta.brace.round.tsx"
        }
      },
      end: "\\)",
      endCaptures: {
        "0": {
          name: "meta.brace.round.tsx"
        }
      },
      patterns: [
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s*(\\??)(?=\\s*(:\\s*(\n  (<) |\n  ([(]\\s*(\n    ([)]) |\n    (\\.\\.\\.) |\n    ([_$[:alnum:]]+\\s*(\n      ([:,?=])|\n      ([)]\\s*=>)\n    ))\n  ))\n)) |\n(:\\s*(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))Function(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))) |\n(:\\s*((<\\s*$)|([\\(]\\s*((([\\{\\[]\\s*)?$)|((\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})\\s*((:\\s*\\{?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*)))|((\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])\\s*((:\\s*\\[?$)|((\\s*([^<>\\(\\)\\{\\}]|\\<([^<>]|\\<([^<>]|\\<[^<>]+\\>)+\\>)+\\>|\\([^\\(\\)]+\\)|\\{[^\\{\\}]+\\})+\\s*)?=\\s*))))))))",
          captures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "keyword.operator.rest.tsx"
            },
            "3": {
              name: "entity.name.function.tsx variable.language.this.tsx"
            },
            "4": {
              name: "entity.name.function.tsx"
            },
            "5": {
              name: "keyword.operator.optional.tsx"
            }
          }
        },
        {
          match: "(?x)(?:(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(public|private|protected|readonly)\\s+)?(?:(\\.\\.\\.)\\s*)?(?<!=|:)(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))\\s*(\\??)(?=:)",
          captures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "keyword.operator.rest.tsx"
            },
            "3": {
              name: "variable.parameter.tsx variable.language.this.tsx"
            },
            "4": {
              name: "variable.parameter.tsx"
            },
            "5": {
              name: "keyword.operator.optional.tsx"
            }
          }
        },
        {
          include: "#type-annotation"
        },
        {
          name: "punctuation.separator.parameter.tsx",
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
              name: "meta.type.constructor.tsx storage.modifier.tsx"
            },
            "2": {
              name: "meta.type.constructor.tsx keyword.control.new.tsx"
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
          name: "meta.type.constructor.tsx",
          begin: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(?:(abstract)\\s+)?(new)\\b\\s*(?=\\()",
          beginCaptures: {
            "1": {
              name: "storage.modifier.tsx"
            },
            "2": {
              name: "keyword.control.new.tsx"
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
          name: "meta.type.function.tsx",
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
          name: "meta.type.function.return.tsx",
          begin: "(=>)(?=\\s*\\S)",
          beginCaptures: {
            "1": {
              name: "storage.type.function.arrow.tsx"
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
          name: "meta.type.function.return.tsx",
          begin: "=>",
          beginCaptures: {
            "0": {
              name: "storage.type.function.arrow.tsx"
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
              name: "keyword.operator.type.tsx"
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
              name: "keyword.operator.type.tsx"
            }
          },
          end: "(?=\\S)"
        },
        {
          name: "keyword.operator.expression.keyof.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))keyof(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.operator.ternary.tsx",
          match: "(\\?|\\:)"
        },
        {
          name: "keyword.operator.expression.import.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))import(?=\\s*\\()"
        }
      ]
    },
    "type-infer": {
      patterns: [
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(infer)\\s+([_$[:alpha:]][_$[:alnum:]]*)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))(?:\\s+(extends)(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.)))?",
          name: "meta.type.infer.tsx",
          captures: {
            "1": {
              name: "keyword.operator.expression.infer.tsx"
            },
            "2": {
              name: "entity.name.type.tsx"
            },
            "3": {
              name: "keyword.operator.expression.extends.tsx"
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
              name: "keyword.operator.type.asserts.tsx"
            },
            "2": {
              name: "variable.parameter.tsx variable.language.this.tsx"
            },
            "3": {
              name: "variable.parameter.tsx"
            },
            "4": {
              name: "keyword.operator.expression.is.tsx"
            }
          }
        },
        {
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))(asserts)\\s+(?!is)(?:(this)|([_$[:alpha:]][_$[:alnum:]]*))(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))",
          captures: {
            "1": {
              name: "keyword.operator.type.asserts.tsx"
            },
            "2": {
              name: "variable.parameter.tsx variable.language.this.tsx"
            },
            "3": {
              name: "variable.parameter.tsx"
            }
          }
        },
        {
          name: "keyword.operator.type.asserts.tsx",
          match: "(?<![_$[:alnum:]])(?:(?<=\\.\\.\\.)|(?<!\\.))asserts(?![_$[:alnum:]])(?:(?=\\.\\.\\.)|(?!\\.))"
        },
        {
          name: "keyword.operator.expression.is.tsx",
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
              name: "entity.name.type.module.tsx"
            },
            "2": {
              name: "punctuation.accessor.tsx"
            },
            "3": {
              name: "punctuation.accessor.optional.tsx"
            },
            "4": {
              name: "meta.type.parameters.tsx punctuation.definition.typeparameters.begin.tsx"
            }
          },
          end: "(>)",
          endCaptures: {
            "1": {
              name: "meta.type.parameters.tsx punctuation.definition.typeparameters.end.tsx"
            }
          },
          contentName: "meta.type.parameters.tsx",
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
              name: "entity.name.type.tsx"
            },
            "2": {
              name: "meta.type.parameters.tsx punctuation.definition.typeparameters.begin.tsx"
            }
          },
          end: "(>)",
          endCaptures: {
            "1": {
              name: "meta.type.parameters.tsx punctuation.definition.typeparameters.end.tsx"
            }
          },
          contentName: "meta.type.parameters.tsx",
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
              name: "entity.name.type.module.tsx"
            },
            "2": {
              name: "punctuation.accessor.tsx"
            },
            "3": {
              name: "punctuation.accessor.optional.tsx"
            }
          }
        },
        {
          name: "entity.name.type.tsx",
          match: "[_$[:alpha:]][_$[:alnum:]]*"
        }
      ]
    },
    "punctuation-comma": {
      name: "punctuation.separator.comma.tsx",
      match: ","
    },
    "punctuation-semicolon": {
      name: "punctuation.terminator.statement.tsx",
      match: ";"
    },
    "punctuation-accessor": {
      match: "(?:(\\.)|(\\?\\.(?!\\s*[[:digit:]])))",
      captures: {
        "1": {
          name: "punctuation.accessor.tsx"
        },
        "2": {
          name: "punctuation.accessor.optional.tsx"
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
      name: "string.quoted.double.tsx",
      begin: '"',
      beginCaptures: {
        "0": {
          name: "punctuation.definition.string.begin.tsx"
        }
      },
      end: '(")|((?:[^\\\\\\n])$)',
      endCaptures: {
        "1": {
          name: "punctuation.definition.string.end.tsx"
        },
        "2": {
          name: "invalid.illegal.newline.tsx"
        }
      },
      patterns: [
        {
          include: "#string-character-escape"
        }
      ]
    },
    "qstring-single": {
      name: "string.quoted.single.tsx",
      begin: "'",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.string.begin.tsx"
        }
      },
      end: "(\\')|((?:[^\\\\\\n])$)",
      endCaptures: {
        "1": {
          name: "punctuation.definition.string.end.tsx"
        },
        "2": {
          name: "invalid.illegal.newline.tsx"
        }
      },
      patterns: [
        {
          include: "#string-character-escape"
        }
      ]
    },
    "string-character-escape": {
      name: "constant.character.escape.tsx",
      match: "\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|u\\{[0-9A-Fa-f]+\\}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.|$)"
    },
    template: {
      patterns: [
        {
          include: "#template-call"
        },
        {
          name: "string.template.tsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)?(`)",
          beginCaptures: {
            "1": {
              name: "entity.name.function.tagged-template.tsx"
            },
            "2": {
              name: "punctuation.definition.string.template.begin.tsx"
            }
          },
          end: "`",
          endCaptures: {
            "0": {
              name: "punctuation.definition.string.template.end.tsx"
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
          name: "string.template.tsx",
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
                  name: "entity.name.function.tagged-template.tsx",
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
          name: "string.template.tsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)?\\s*(?=(<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))(([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>|\\<\\s*(((keyof|infer|typeof|readonly)\\s+)|(([_$[:alpha:]][_$[:alnum:]]*|(\\{([^\\{\\}]|(\\{([^\\{\\}]|\\{[^\\{\\}]*\\})*\\}))*\\})|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(\\[([^\\[\\]]|(\\[([^\\[\\]]|\\[[^\\[\\]]*\\])*\\]))*\\])|(\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`))(?=\\s*([\\<\\>\\,\\.\\[]|=>|&(?!&)|\\|(?!\\|)))))([^<>\\(]|(\\(([^\\(\\)]|(\\(([^\\(\\)]|\\([^\\(\\)]*\\))*\\)))*\\))|(?<==)\\>)*(?<!=)\\>))*(?<!=)\\>)*(?<!=)>\\s*)`)",
          beginCaptures: {
            "1": {
              name: "entity.name.function.tagged-template.tsx"
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
      name: "meta.template.expression.tsx",
      begin: "\\$\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.begin.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.end.tsx"
        }
      },
      patterns: [
        {
          include: "#expression"
        }
      ],
      contentName: "meta.embedded.line.tsx"
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
          name: "string.template.tsx",
          begin: "([_$[:alpha:]][_$[:alnum:]]*)?(`)",
          beginCaptures: {
            "1": {
              name: "entity.name.function.tagged-template.tsx"
            },
            "2": {
              name: "punctuation.definition.string.template.begin.tsx"
            }
          },
          end: "`",
          endCaptures: {
            "0": {
              name: "punctuation.definition.string.template.end.tsx"
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
      name: "meta.template.expression.tsx",
      begin: "\\$\\{",
      beginCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.begin.tsx"
        }
      },
      end: "\\}",
      endCaptures: {
        "0": {
          name: "punctuation.definition.template-expression.end.tsx"
        }
      },
      patterns: [
        {
          include: "#type"
        }
      ],
      contentName: "meta.embedded.line.tsx"
    },
    regex: {
      patterns: [
        {
          name: "string.regexp.tsx",
          begin: "(?<!\\+\\+|--|})(?<=[=(:,\\[?+!]|^return|[^\\._$[:alnum:]]return|^case|[^\\._$[:alnum:]]case|=>|&&|\\|\\||\\*\\/)\\s*(\\/)(?![\\/*])(?=(?:[^\\/\\\\\\[\\()]|\\\\.|\\[([^\\]\\\\]|\\\\.)+\\]|\\(([^\\)\\\\]|\\\\.)+\\))+\\/([dgimsuy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.string.begin.tsx"
            }
          },
          end: "(/)([dgimsuy]*)",
          endCaptures: {
            "1": {
              name: "punctuation.definition.string.end.tsx"
            },
            "2": {
              name: "keyword.other.tsx"
            }
          },
          patterns: [
            {
              include: "#regexp"
            }
          ]
        },
        {
          name: "string.regexp.tsx",
          begin: "((?<![_$[:alnum:])\\]]|\\+\\+|--|}|\\*\\/)|((?<=^return|[^\\._$[:alnum:]]return|^case|[^\\._$[:alnum:]]case))\\s*)\\/(?![\\/*])(?=(?:[^\\/\\\\\\[]|\\\\.|\\[([^\\]\\\\]|\\\\.)*\\])+\\/([dgimsuy]+|(?![\\/\\*])|(?=\\/\\*))(?!\\s*[a-zA-Z0-9_$]))",
          beginCaptures: {
            "0": {
              name: "punctuation.definition.string.begin.tsx"
            }
          },
          end: "(/)([dgimsuy]*)",
          endCaptures: {
            "1": {
              name: "punctuation.definition.string.end.tsx"
            },
            "2": {
              name: "keyword.other.tsx"
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
          name: "comment.block.documentation.tsx",
          begin: "/\\*\\*(?!/)",
          beginCaptures: {
            "0": {
              name: "punctuation.definition.comment.tsx"
            }
          },
          end: "\\*/",
          endCaptures: {
            "0": {
              name: "punctuation.definition.comment.tsx"
            }
          },
          patterns: [
            {
              include: "#docblock"
            }
          ]
        },
        {
          name: "comment.block.tsx",
          begin: "(/\\*)(?:\\s*((@)internal)(?=\\s|(\\*/)))?",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.comment.tsx"
            },
            "2": {
              name: "storage.type.internaldeclaration.tsx"
            },
            "3": {
              name: "punctuation.decorator.internaldeclaration.tsx"
            }
          },
          end: "\\*/",
          endCaptures: {
            "0": {
              name: "punctuation.definition.comment.tsx"
            }
          }
        },
        {
          begin: "(^[ \\t]+)?((//)(?:\\s*((@)internal)(?=\\s|$))?)",
          beginCaptures: {
            "1": {
              name: "punctuation.whitespace.comment.leading.tsx"
            },
            "2": {
              name: "comment.line.double-slash.tsx"
            },
            "3": {
              name: "punctuation.definition.comment.tsx"
            },
            "4": {
              name: "storage.type.internaldeclaration.tsx"
            },
            "5": {
              name: "punctuation.decorator.internaldeclaration.tsx"
            }
          },
          end: "(?=$)",
          contentName: "comment.line.double-slash.tsx"
        }
      ]
    },
    "single-line-comment-consuming-line-ending": {
      begin: "(^[ \\t]+)?((//)(?:\\s*((@)internal)(?=\\s|$))?)",
      beginCaptures: {
        "1": {
          name: "punctuation.whitespace.comment.leading.tsx"
        },
        "2": {
          name: "comment.line.double-slash.tsx"
        },
        "3": {
          name: "punctuation.definition.comment.tsx"
        },
        "4": {
          name: "storage.type.internaldeclaration.tsx"
        },
        "5": {
          name: "punctuation.decorator.internaldeclaration.tsx"
        }
      },
      end: "(?=^)",
      contentName: "comment.line.double-slash.tsx"
    },
    directives: {
      name: "comment.line.triple-slash.directive.tsx",
      begin: "^(///)\\s*(?=<(reference|amd-dependency|amd-module)(\\s+(path|types|no-default-lib|lib|name|resolution-mode)\\s*=\\s*((\\'([^\\'\\\\]|\\\\.)*\\')|(\\\"([^\\\"\\\\]|\\\\.)*\\\")|(\\`([^\\`\\\\]|\\\\.)*\\`)))+\\s*/>\\s*$)",
      beginCaptures: {
        "1": {
          name: "punctuation.definition.comment.tsx"
        }
      },
      end: "(?=$)",
      patterns: [
        {
          name: "meta.tag.tsx",
          begin: "(<)(reference|amd-dependency|amd-module)",
          beginCaptures: {
            "1": {
              name: "punctuation.definition.tag.directive.tsx"
            },
            "2": {
              name: "entity.name.tag.directive.tsx"
            }
          },
          end: "/>",
          endCaptures: {
            "0": {
              name: "punctuation.definition.tag.directive.tsx"
            }
          },
          patterns: [
            {
              name: "entity.other.attribute-name.directive.tsx",
              match: "path|types|no-default-lib|lib|name|resolution-mode"
            },
            {
              name: "keyword.operator.assignment.tsx",
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
                  name: "source.embedded.tsx"
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
                  name: "source.embedded.tsx"
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
    }
  }
};

// src/.vitepress/config/syntax-highlight/highlight.ts
var __vite_injected_original_import_meta_url3 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config/syntax-highlight/highlight.ts";
var __dirname3 = dirname3(fileURLToPath3(__vite_injected_original_import_meta_url3));
var nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz", 10);
var attrsToLines = (attrs) => {
  attrs = attrs.replace(/^(?:\[.*?\])?.*?([\d,-]+).*/, "$1").trim();
  const result = [];
  if (!attrs) {
    return [];
  }
  attrs.split(",").map((v) => v.split("-").map((v2) => parseInt(v2, 10))).forEach(([start, end]) => {
    if (start && end) {
      result.push(
        ...Array.from({ length: end - start + 1 }, (_, i) => start + i)
      );
    } else {
      result.push(start);
    }
  });
  return result.map((v) => ({
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
async function highlight2(theme2 = "material-palenight", defaultLang = "") {
  const hasSingleTheme = typeof theme2 === "string" || "name" in theme2;
  const getThemeName = (themeValue) => typeof themeValue === "string" ? themeValue : themeValue.name;
  const processors = [
    createFocusProcessor(),
    createHighlightProcessor({ hasHighlightClass: "highlighted" }),
    createDiffProcessor(),
    errorLevelProcessor
  ];
  const highlighter = await getHighlighter({
    themes: hasSingleTheme ? [theme2] : [theme2.dark, theme2.light],
    processors
  });
  highlighter.loadLanguage({
    ...glimmer_tmLanguage_default,
    path: resolve2(__dirname3, "glimmer.tmLanguage.json")
  });
  const styleRE = /<pre[^>]*(style=".*?")/;
  const preRE = /^<pre(.*?)>/;
  const vueRE = /-vue$/;
  const lineNoRE = /:(no-)?line-numbers$/;
  const mustacheRE = /\{\{.*?\}\}/g;
  return (str, lang, attrs) => {
    const vPre = vueRE.test(lang) ? "" : "v-pre";
    lang = lang.replace(lineNoRE, "").replace(vueRE, "").toLowerCase() || defaultLang;
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
      return cleanup(
        restoreMustache(
          highlighter.codeToHtml(removeMustache(str), {
            lang,
            lineOptions,
            theme: getThemeName(theme2)
          })
        )
      );
    }
    const dark = addClass(
      cleanup(
        highlighter.codeToHtml(str, {
          lang,
          lineOptions,
          theme: getThemeName(theme2.dark)
        })
      ),
      "vp-code-dark",
      "pre"
    );
    const light = addClass(
      cleanup(
        highlighter.codeToHtml(str, {
          lang,
          lineOptions,
          theme: getThemeName(theme2.light)
        })
      ),
      "vp-code-light",
      "pre"
    );
    return dark + light;
  };
}

// src/.vitepress/config/syntax-highlight/setup.ts
import { setupForFile } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/remark-shiki-twoslash@3.1.0/node_modules/remark-shiki-twoslash/dist/index.js";

// src/.vitepress/config/syntax-highlight/shiki-twoslash.ts
import { lex, parse } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/fenceparser@2.2.0/node_modules/fenceparser/dist/index.mjs";
import { renderCodeToHTML } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/shiki-twoslash@3.1.0/node_modules/shiki-twoslash/dist/index.js";

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
import { runTwoSlash } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/shiki-twoslash@3.1.0/node_modules/shiki-twoslash/dist/index.js";
import { createHash } from "crypto";
import { existsSync, mkdirSync, readFileSync as readFileSync2, writeFileSync } from "fs";
import { createRequire } from "node:module";
import { join } from "path";
var __vite_injected_original_dirname = "/home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config/syntax-highlight";
var __vite_injected_original_import_meta_url4 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config/syntax-highlight/run-twoslash.ts";
var require2 = createRequire(__vite_injected_original_import_meta_url4);
var shikiVersion = require2("@typescript/twoslash/package.json").version;
var cachedTwoslashCall = (code, lang, settings) => {
  const isWebWorker = typeof self !== "undefined" && typeof self.WorkerGlobalScope !== "undefined";
  const isBrowser = isWebWorker || typeof window !== "undefined" && typeof window.document !== "undefined" && typeof fetch !== "undefined";
  if (isBrowser) {
    return runTwoSlash(code, lang, settings);
  }
  const shasum = createHash("sha1");
  const codeSha = shasum.update(`${code}-${shikiVersion}`).digest("hex");
  const getNmCache = () => {
    if (__vite_injected_original_dirname.includes("node_modules")) {
      return join(
        __vite_injected_original_dirname.split("node_modules")[0],
        "node_modules",
        ".cache",
        "twoslash"
      );
    } else {
      return join(__vite_injected_original_dirname, "..", "..", ".cache", "twoslash");
    }
  };
  const getPnpCache = () => {
    try {
      const pnp = require2("pnpapi");
      return join(
        pnp.getPackageInformation(pnp.topLevel).packageLocation,
        "node_modules",
        ".cache",
        "twoslash"
      );
    } catch (error2) {
      return getNmCache();
    }
  };
  const cacheRoot = process.versions.pnp ? getPnpCache() : getNmCache();
  const cachePath = join(cacheRoot, `${codeSha}.json`);
  if (existsSync(cachePath)) {
    if (process.env.debug)
      console.log(`Using cached twoslash results from ${cachePath}`);
    return JSON.parse(readFileSync2(cachePath, "utf8"));
  } else {
    const results = runTwoSlash(code, lang, settings);
    if (!existsSync(cacheRoot))
      mkdirSync(cacheRoot, { recursive: true });
    writeFileSync(cachePath, JSON.stringify(results), "utf8");
    return results;
  }
};

// src/.vitepress/config/syntax-highlight/shiki-twoslash.ts
var transformAttributesToHTML = (code, fenceString, highlighters, settings) => {
  const fence = parseFence(fenceString);
  const twoslash = runTwoSlashOnNode(code, fence, settings);
  const newCode = twoslash && twoslash.code || code;
  return getHTML(newCode, fence, highlighters, twoslash, settings);
};
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
var runTwoSlashOnNode = (code, { lang, meta }, settings = {}) => {
  const shouldDisableTwoslash = typeof process !== "undefined" && process.env && !!process.env.TWOSLASH_DISABLE;
  if (shouldDisableTwoslash)
    return void 0;
  if (meta.twoslash) {
    return cachedTwoslashCall(code, lang, settings);
  }
  return void 0;
};
var includes = /* @__PURE__ */ new Map();
function getHTML(code, fence, highlighters, twoslash, twoslashSettings) {
  const replacer = {
    json5: "json"
  };
  if (replacer[fence.lang])
    fence.lang = replacer[fence.lang];
  let results;
  if (fence.lang === "twoslash") {
    if (!fence.meta.include || typeof fence.meta.include !== "string") {
      throw new Error(
        "A twoslash code block needs a pragma like 'twoslash include [name]'"
      );
    }
    addIncludes(includes, fence.meta.include, code);
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
async function markdownItShikiTwoslashSetup(settings) {
  const { highlighters } = await setupForFile(settings);
  return (markdownit, options) => {
    const prev = markdownit.options.highlight;
    if (prev === void 0 || prev === null) {
      throw Error(
        "markdown-it-shiki-twoslash requires markdown-it to have a highlighter set"
      );
    }
    markdownit.options.highlight = (snippet, lang, attrs) => {
      if (!lang.match(/\btwoslash\b/)) {
        return prev(snippet, lang, attrs);
      }
      snippet = snippet.replace(/\r?\n$/, "");
      return transformAttributesToHTML(
        snippet,
        [lang, attrs].join(" "),
        highlighters,
        options
      );
    };
  };
}

// src/.vitepress/config/vite.ts
import path3, { resolve as resolve3 } from "node:path";
import { fileURLToPath as fileURLToPath4 } from "node:url";
import vars from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-advanced-variables@3.0.1/node_modules/postcss-advanced-variables/index.js";
import functions from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-functions@4.0.2_postcss@8.4.21/node_modules/postcss-functions/dest/index.js";
import values from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-modules-values@4.0.0_postcss@8.4.21/node_modules/postcss-modules-values/src/index.js";
import nested from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-nested@6.0.0_postcss@8.4.21/node_modules/postcss-nested/index.js";
import property from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-property-lookup@3.0.0_postcss@8.4.21/node_modules/postcss-property-lookup/index.js";
import * as sass from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/postcss-scss@4.0.6_postcss@8.4.21/node_modules/postcss-scss/lib/scss-syntax.mjs";
import { visualizer } from "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/node_modules/.pnpm/rollup-plugin-visualizer@5.9.0/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";

// src/.vitepress/config/css-functions/color.ts
function color(h, s, l) {
  const sat = typeof s === "string" ? s : `${s}%`;
  return `hsl(${h}, ${sat}, var(--color-lightness-${l}))`;
}

// src/.vitepress/config/vite.ts
var __vite_injected_original_import_meta_url5 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config/vite.ts";
var __dirname4 = path3.dirname(fileURLToPath4(__vite_injected_original_import_meta_url5));
var root = path3.resolve(__dirname4, "../../..");
var CSS = {
  postcss: {
    syntax: sass,
    plugins: [vars(), functions({ color }), values(), property(), nested()]
  },
  devSourcemap: true
};
var VITE = {
  css: CSS,
  logLevel: "info",
  plugins: [],
  ssr: {},
  envDir: resolve3(root, ".config", ".env"),
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

// src/.vitepress/config/markdown.ts
var Shiki = await markdownItShikiTwoslashSetup({
  themes: ["github-dark", "github-light"],
  wrapFragments: true,
  includeJSDocInHover: true,
  disableImplicitReactImport: true,
  vfsRoot: resolve4(root, "packages/twoslash"),
  ignoreCodeblocksWithCodefenceMeta: ["no-shiki"]
});
var OPTIONS = {
  experimentalDecorators: true,
  target: ts.ScriptTarget.ESNext
};
var shiki = (md) => Shiki(md, {
  themes: ["github-dark", "github-light"],
  vfsRoot: resolve4(root, "packages/twoslash"),
  defaultCompilerOptions: OPTIONS,
  ignoreCodeblocksWithCodefenceMeta: ["no-shiki"]
});
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
    md.use(codeTabs);
  },
  toc: {
    level: [2, 3, 4]
  }
};

// src/.vitepress/config.ts
var __vite_injected_original_import_meta_url6 = "file:///home/wycats/Code/Starbeam/Docs/starbeam-docs/src/.vitepress/config.ts";
var dirname4 = path4.dirname(fileURLToPath5(__vite_injected_original_import_meta_url6));
var config_default = defineConfig({
  ...CONFIG,
  ...BUILD_HOOKS,
  head: HEAD,
  outDir: path4.resolve(dirname4, "../../docs"),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52aXRlcHJlc3MvY29uZmlnLnRzIiwgInNyYy8udml0ZXByZXNzL2NvbmZpZy9oZWFkLnRzIiwgInNyYy8udml0ZXByZXNzL2NvbmZpZy9OYXYudHMiLCAic3JjLy52aXRlcHJlc3MvY29uZmlnL1NpZGViYXIudHMiLCAic3JjLy52aXRlcHJlc3MvY29uZmlnL3BhY2thZ2UtaW5mby50cyIsICJzcmMvLnZpdGVwcmVzcy9jb25maWcvU2l0ZS50cyIsICJzcmMvLnZpdGVwcmVzcy9jb25maWcvbWFya2Rvd24udHMiLCAic3JjLy52aXRlcHJlc3MvcGFja2FnZXMvdml0ZXByZXNzLXNuaXBwZXRzL3NyYy9tYXJrZG93bi1pdC50cyIsICJzcmMvLnZpdGVwcmVzcy9wYWNrYWdlcy92aXRlcHJlc3Mtc25pcHBldHMvc3JjL3NuaXBwZXRzL2xhbmd1YWdlLXJlZ2lvbi50cyIsICJzcmMvLnZpdGVwcmVzcy9wYWNrYWdlcy92aXRlcHJlc3Mtc25pcHBldHMvc3JjL3V0aWxzLnRzIiwgInNyYy8udml0ZXByZXNzL3BsdWdpbnMvdGFicy90YWJzLnRzIiwgInNyYy8udml0ZXByZXNzL3BsdWdpbnMvY29kZS10YWJzL2NvZGUtdGFicy50cyIsICJzcmMvLnZpdGVwcmVzcy9wbHVnaW5zL2NvbnRhaW5lcnMvY29udGFpbmVyLnRzIiwgInNyYy8udml0ZXByZXNzL3BsdWdpbnMvY29udGFpbmVycy9jb250YWluZXJzLnRzIiwgInNyYy8udml0ZXByZXNzL3BsdWdpbnMvZmVuY2VzLnRzIiwgInNyYy8udml0ZXByZXNzL3BsdWdpbnMvbWFyay9tYXJrLnRzIiwgInNyYy8udml0ZXByZXNzL3BsdWdpbnMvbWVybWFpZC9mbG93Y2hhcnQudHMiLCAic3JjLy52aXRlcHJlc3MvcGx1Z2lucy91dGlscy50cyIsICJzcmMvLnZpdGVwcmVzcy9wbHVnaW5zL21lcm1haWQvbWVybWFpZC50cyIsICJzcmMvLnZpdGVwcmVzcy9jb25maWcvc3ludGF4LWhpZ2hsaWdodC9oaWdobGlnaHQudHMiLCAic3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHQvc2V0dXAudHMiLCAic3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHQvc2hpa2ktdHdvc2xhc2gudHMiLCAic3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHQvaW5jbHVkZXMudHMiLCAic3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHQvcnVuLXR3b3NsYXNoLnRzIiwgInNyYy8udml0ZXByZXNzL2NvbmZpZy92aXRlLnRzIiwgInNyYy8udml0ZXByZXNzL2NvbmZpZy9jc3MtZnVuY3Rpb25zL2NvbG9yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5pbXBvcnQgeyBIRUFEIH0gZnJvbSBcIi4vY29uZmlnL2hlYWQuanNcIjtcbmltcG9ydCB7IE5BViwgU09DSUFMIH0gZnJvbSBcIi4vY29uZmlnL05hdi5qc1wiO1xuaW1wb3J0IHsgU0lERUJBUiB9IGZyb20gXCIuL2NvbmZpZy9TaWRlYmFyLmpzXCI7XG5pbXBvcnQgeyBCVUlMRF9IT09LUywgQ09ORklHLCBTSVRFIH0gZnJvbSBcIi4vY29uZmlnL1NpdGUuanNcIjtcblxuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgTUFSS0RPV04gfSBmcm9tIFwiLi9jb25maWcvbWFya2Rvd24uanNcIjtcbmltcG9ydCB7IFZJVEUgfSBmcm9tIFwiLi9jb25maWcvdml0ZS5qc1wiO1xuXG5jb25zdCBkaXJuYW1lID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC4uLkNPTkZJRyxcbiAgLi4uQlVJTERfSE9PS1MsXG4gIGhlYWQ6IEhFQUQsXG4gIG91dERpcjogcGF0aC5yZXNvbHZlKGRpcm5hbWUsIFwiLi4vLi4vZG9jc1wiKSxcbiAgbWFya2Rvd246IE1BUktET1dOLFxuXG4gIHRoZW1lQ29uZmlnOiB7XG4gICAgbmF2OiBOQVYsXG4gICAgc2lkZWJhcjogU0lERUJBUixcbiAgICBzb2NpYWxMaW5rczogU09DSUFMLFxuICAgIGVkaXRMaW5rOiB7XG4gICAgICBwYXR0ZXJuOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9zdGFyYmVhbWpzL2RvY3MvZWRpdC9tYWluL3NyYy86cGF0aFwiLFxuICAgICAgdGV4dDogXCJFZGl0IHRoaXMgcGFnZSBvbiBHaXRIdWJcIixcbiAgICB9LFxuICAgIC4uLlNJVEUsXG4gIH0sXG4gIHZpdGU6IFZJVEUsXG4gIHZ1ZToge1xuICAgIHRlbXBsYXRlOiB7XG4gICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgaXNDdXN0b21FbGVtZW50OiAodGFnKSA9PiB0YWcuaW5jbHVkZXMoXCItXCIpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvaGVhZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL2hlYWQudHNcIjtpbXBvcnQgdHlwZSB7IEhlYWRDb25maWcgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5pbXBvcnQgdHlwZSB7IENvbmZpZyB9IGZyb20gXCIuL3R5cGVzLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBIRUFEOiBDb25maWdbXCJoZWFkXCJdID0gW1xuICBmb250KFwiUmVhZGV4IFByb1wiLCB7IHdlaWdodDogXCIxNjAuLjcwMFwiIH0pLFxuICBmb250KFwiQmFsb28gMlwiLCB7IHdlaWdodDogXCI0MDAuLjgwMFwiIH0pLFxuICBmb250KFwiRXhwbGV0dXMgU2Fuc1wiLCB7IHdlaWdodDogXCI0MDAuLjcwMFwiIH0pLFxuICBmb250KFwiQXplcmV0IE1vbm9cIiwgeyB3ZWlnaHQ6IFwiMTAwLi45MDBcIiB9KSxcbiAgZm9udChcIkNvbWZvcnRhYVwiLCB7IHdlaWdodDogXCI0MDAuLjcwMFwiIH0pLFxuICAvLyBodHRwczovL21pY3Jvc29mdC5naXRodWIuaW8vdnNjb2RlLWNvZGljb25zL2Rpc3QvY29kaWNvbi50dGZcbiAgW1xuICAgIFwibGlua1wiLFxuICAgIHtcbiAgICAgIHJlbDogXCJzdHlsZXNoZWV0XCIsXG4gICAgICBocmVmOiBcImh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9TWF0ZXJpYWwrU3ltYm9scytPdXRsaW5lZDpvcHN6LHdnaHQsRklMTCxHUkFEQDIwLi40OCwxMDAuLjcwMCwwLi4xLC01MC4uMjAwXCIsXG4gICAgfSxcbiAgXSxcbiAgW1xuICAgIFwibGlua1wiLFxuICAgIHtcbiAgICAgIHJlbDogXCJzdHlsZXNoZWV0XCIsXG4gICAgICBocmVmOiBcImh0dHBzOi8vbWljcm9zb2Z0LmdpdGh1Yi5pby92c2NvZGUtY29kaWNvbnMvZGlzdC9jb2RpY29uLmNzc1wiLFxuICAgIH0sXG4gIF0sXG5dO1xuXG5mdW5jdGlvbiBmb250KGZhbWlseTogc3RyaW5nLCB7IHdlaWdodCB9OiB7IHdlaWdodDogc3RyaW5nIH0pOiBIZWFkQ29uZmlnIHtcbiAgcmV0dXJuIFtcbiAgICBcImxpbmtcIixcbiAgICB7XG4gICAgICByZWw6IFwic3R5bGVzaGVldFwiLFxuICAgICAgaHJlZjogYGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20vY3NzMj9mYW1pbHk9JHtmYW1pbHkucmVwbGFjZUFsbChcbiAgICAgICAgXCIgXCIsXG4gICAgICAgIFwiK1wiXG4gICAgICApfTp3Z2h0QCR7d2VpZ2h0fSZkaXNwbGF5PWJsb2NrYCxcbiAgICB9LFxuICBdO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL05hdi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL05hdi50c1wiO2ltcG9ydCB0eXBlIHsgVGhlbWVDb25maWcgfSBmcm9tIFwiLi90eXBlcy5qc1wiO1xuXG5leHBvcnQgY29uc3QgTkFWOiBUaGVtZUNvbmZpZ1tcIm5hdlwiXSA9IFtcbiAge1xuICAgIHRleHQ6IFwiR3VpZGVzXCIsXG4gICAgbGluazogXCIvZ3VpZGVzL1wiLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJBUElcIixcbiAgICBsaW5rOiBcIi9hcGkvXCIsXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcIkZyYW1ld29ya3NcIixcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlJlYWN0XCIsXG4gICAgICAgIGxpbms6IFwiL2ZyYW1ld29ya3MvcmVhY3QvXCIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlByZWFjdFwiLFxuICAgICAgICBsaW5rOiBcIi9mcmFtZXdvcmtzL3ByZWFjdC9cIixcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG5cbmV4cG9ydCBjb25zdCBTT0NJQUw6IFRoZW1lQ29uZmlnW1wic29jaWFsTGlua3NcIl0gPSBbXG4gIHsgaWNvbjogXCJnaXRodWJcIiwgbGluazogXCJodHRwczovL2dpdGh1Yi5jb20vc3RhcmJlYW1qcy9zdGFyYmVhbVwiIH0sXG5dO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL1NpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZy9TaWRlYmFyLnRzXCI7aW1wb3J0IHR5cGUgeyBEZWZhdWx0VGhlbWUgfSBmcm9tIFwidml0ZXByZXNzXCI7XG5pbXBvcnQgdHlwZSB7IFRoZW1lQ29uZmlnIH0gZnJvbSBcIi4vdHlwZXMuanNcIjtcblxuZXhwb3J0IGNvbnN0IFNJREVCQVI6IFRoZW1lQ29uZmlnW1wic2lkZWJhclwiXSA9IHtcbiAgXCIvZ3VpZGVzL1wiOiBbXG4gICAge1xuICAgICAgaXRlbXM6IFtcbiAgICAgICAgaXRlbShcIkdldHRpbmcgU3RhcnRlZFwiLCBcIi9ndWlkZXMvaW5kZXgubWRcIiksXG4gICAgICAgIGl0ZW0oXCJVbml2ZXJzYWwgUmVhY3Rpdml0eVwiLCBcIi9ndWlkZXMvdW5pdmVyc2FsLXJlYWN0aXZpdHkubWRcIiksXG4gICAgICAgIGl0ZW0oXCJPdXIgR3VpZGluZyBQcmluY2lwbGVcIiwgXCIvZ3VpZGVzL3ByaW5jaXBsZS5tZFwiKSxcbiAgICAgIF0sXG4gICAgfSxcbiAgICBncm91cChcIlJlYWN0aXZlIEZ1bmRhbWVudGFsc1wiLCBbXG4gICAgICBpdGVtKFwiQ2VsbHNcIiwgXCIvZ3VpZGVzL2Z1bmRhbWVudGFscy9jZWxscy5tZFwiKSxcbiAgICAgIGl0ZW0oXCJGdW5jdGlvbnNcIiwgXCIvZ3VpZGVzL2Z1bmRhbWVudGFscy9mdW5jdGlvbnMubWRcIiksXG4gICAgICBpdGVtKFwiVmFsaWRhdGlvblwiLCBcIi9ndWlkZXMvZnVuZGFtZW50YWxzL3ZhbGlkYXRpb24ubWRcIiksXG4gICAgICBpdGVtKFwiUmVzb3VyY2VzXCIsIFwiL2d1aWRlcy9mdW5kYW1lbnRhbHMvcmVzb3VyY2VzLm1kXCIpLFxuICAgIF0pLFxuICAgIGdyb3VwKFwiVW5pdmVyc2FsIENvZGVcIiwgW1xuICAgICAgaXRlbShcIkJsdWVwcmludHMgYW5kIEluc3RhbmNlc1wiLCBcIi9ndWlkZXMvZnVuZGFtZW50YWxzL2luc3RhbmNlcy5tZFwiKSxcbiAgICBdKSxcbiAgICAvLyBncm91cChcIlVuaXZlcnNhbCBCdWlsZGluZyBCbG9ja3NcIiwgW1xuICAgIC8vICAgaXRlbShcIkludHJvZHVjdGlvblwiLCBcIi9ndWlkZXMvdW5pdmVyc2FsL2luZGV4Lm1kXCIpLFxuICAgIC8vICAgaXRlbShcIlJlYWN0aXZlc1wiLCBcIi9ndWlkZXMvdW5pdmVyc2FsL3JlYWN0aXZlLm1kXCIpLFxuICAgIC8vICAgaXRlbShcIlJlc291cmNlc1wiLCBcIi9ndWlkZXMvdW5pdmVyc2FsL3Jlc291cmNlcy5tZFwiKSxcbiAgICAvLyAgIGl0ZW0oXCJET00gUmVzb3VyY2VzXCIsIFwiL2d1aWRlcy91bml2ZXJzYWwvZG9tLXJlc291cmNlcy5tZFwiKSxcbiAgICAvLyAgIGl0ZW0oXCJNb2RpZmllcnNcIiwgXCIvZ3VpZGVzL3VuaXZlcnNhbC9tb2RpZmllcnMubWRcIiksXG4gICAgLy8gICBpdGVtKFwiU2VydmljZXNcIiwgXCIvZ3VpZGVzL3VuaXZlcnNhbC9zZXJ2aWNlcy5tZFwiKSxcbiAgICAvLyBdKSxcbiAgICBncm91cChcbiAgICAgIFwiRGlnZ2luZyBEZWVwZXJcIixcbiAgICAgIFtcbiAgICAgICAgaXRlbShcIlJlYWN0aXZlIENvbGxlY3Rpb25zXCIsIFwiL2d1aWRlcy9jb2xsZWN0aW9ucy5tZFwiKSxcbiAgICAgICAgaXRlbShcIkRldmVsb3BlciBUb29sc1wiLCBcIi9ndWlkZXMvZGV2dG9vbHMubWRcIiksXG4gICAgICAgIGl0ZW0oXCJFcXVpdmFsZW5jZVwiLCBcIi9ndWlkZXMvYWR2YW5jZWQvZXF1aXZhbGVuY2UubWRcIiksXG4gICAgICBdLFxuICAgICAgXCJleHBhbmRlZFwiXG4gICAgKSxcbiAgICBncm91cChcIk9wdGltaXphdGlvblwiLCBbXG4gICAgICBpdGVtKFwiRm9ybXVsYXNcIiwgXCIvZ3VpZGVzL29wdGltaXphdGlvbi9mb3JtdWxhcy5tZFwiKSxcbiAgICBdKSxcbiAgXSxcbiAgXCIvYXBpL1wiOiBbXG4gICAgZ3JvdXAoXCJAc3RhcmJlYW0vdGltZWxpbmVcIiwgW1xuICAgICAgaXRlbShcIkxJRkVUSU1FXCIsIFwiL2FwaS90aW1lbGluZS9saWZldGltZS5tZFwiKSxcbiAgICAgIGl0ZW0oXCJUSU1FTElORVwiLCBcIi9hcGkvdGltZWxpbmUvdGltZWxpbmUubWRcIiksXG4gICAgICBpdGVtKFwiUmVhY3RpdmVQcm90b2NvbFwiLCBcIi9hcGkvdGltZWxpbmUvcHJvdG9jb2wubWRcIiksXG4gICAgXSksXG4gICAgZ3JvdXAoXCJAc3RhcmJlYW0vdW5pdmVyc2FsXCIsIFtcbiAgICAgIGl0ZW0oXCJDZWxsXCIsIFwiL2FwaS9jb3JlL2NlbGwubWRcIiksXG4gICAgICBpdGVtKFwiRm9ybXVsYVwiLCBcIi9hcGkvY29yZS9mb3JtdWxhLm1kXCIpLFxuICAgICAgaXRlbShcIlJlc291cmNlXCIsIFwiL2FwaS9jb3JlL3Jlc291cmNlLm1kXCIpLFxuICAgICAgaXRlbShcIlJlc291cmNlTGlzdFwiLCBcIi9hcGkvY29yZS9yZXNvdXJjZS1saXN0Lm1kXCIpLFxuICAgIF0pLFxuICBdLFxuICBcIi9mcmFtZXdvcmtzL3JlYWN0L1wiOiBbXG4gICAgZ3JvdXAoXCJSZWFjdFwiLCBbaXRlbShcIkdldHRpbmcgU3RhcnRlZFwiLCBcIi9mcmFtZXdvcmtzL3JlYWN0L2luZGV4Lm1kXCIpXSksXG4gICAgZ3JvdXAoXCJUdXRvcmlhbFwiLCBbXG4gICAgICBpdGVtKFwiSW50cm9kdWN0aW9uXCIsIFwiL2ZyYW1ld29ya3MvcmVhY3QvdHV0b3JpYWwvaW5kZXgubWRcIiksXG4gICAgICBpdGVtKFxuICAgICAgICBcIkdldHRpbmcgU3RhcnRlZFwiLFxuICAgICAgICBcIi9mcmFtZXdvcmtzL3JlYWN0L3R1dG9yaWFsLzEtZ2V0dGluZy1zdGFydGVkLm1kXCJcbiAgICAgICksXG4gICAgICBpdGVtKFwiQ29tcHV0ZWQgRGF0YVwiLCBcIi9mcmFtZXdvcmtzL3JlYWN0L3R1dG9yaWFsLzItY29tcHV0ZWQtZGF0YS5tZFwiKSxcbiAgICAgIGl0ZW0oXG4gICAgICAgIFwiUmVhY3RpdmUgQnVpbHRpbnNcIixcbiAgICAgICAgXCIvZnJhbWV3b3Jrcy9yZWFjdC90dXRvcmlhbC8zLXJlYWN0aXZlLWJ1aWx0aW5zLm1kXCJcbiAgICAgICksXG4gICAgICBpdGVtKFxuICAgICAgICBcIlJlYWN0aXZlIEFycmF5c1wiLFxuICAgICAgICBcIi9mcmFtZXdvcmtzL3JlYWN0L3R1dG9yaWFsLzQtcmVhY3RpdmUtYXJyYXlzLm1kXCJcbiAgICAgICksXG4gICAgXSksXG4gICAgZ3JvdXAoXCJUdXRvcmlhbCBCb251c1wiLCBbXG4gICAgICBpdGVtKFxuICAgICAgICBcIk1vcmUgd2l0aCBSZWFjdGl2ZSBBcnJheXNcIixcbiAgICAgICAgXCIvZnJhbWV3b3Jrcy9yZWFjdC90dXRvcmlhbC81LXJlYWN0aXZlLWFycmF5cy1ib251cy5tZFwiXG4gICAgICApLFxuICAgIF0pLFxuICBdLFxuICBcIi9mcmFtZXdvcmtzL3ByZWFjdC9cIjogW1xuICAgIGdyb3VwKFwiUHJlYWN0XCIsIFtpdGVtKFwiR2V0dGluZyBTdGFydGVkXCIsIFwiL2ZyYW1ld29ya3MvcHJlYWN0L2luZGV4Lm1kXCIpXSksXG4gIF0sXG4gIFwiL2RlbW9zL1wiOiBbXSxcbn07XG5cbnR5cGUgQW5vbnltb3VzR3JvdXBBcmdzID0gW1xuICBpdGVtczogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10sXG4gIGNvbGxhcHNlPzogXCJleHBhbmRlZFwiIHwgXCJjb2xsYXBzZWRcIlxuXTtcblxudHlwZSBOYW1lZEdyb3VwQXJncyA9IFtcbiAgdGV4dDogc3RyaW5nLFxuICBpdGVtczogRGVmYXVsdFRoZW1lLlNpZGViYXJJdGVtW10sXG4gIGNvbGxhcHNlPzogXCJleHBhbmRlZFwiIHwgXCJjb2xsYXBzZWRcIlxuXTtcblxuZnVuY3Rpb24gaXRlbSh0ZXh0OiBzdHJpbmcsIGxpbms6IHN0cmluZyk6IERlZmF1bHRUaGVtZS5TaWRlYmFySXRlbSB7XG4gIHJldHVybiB7XG4gICAgdGV4dCxcbiAgICBsaW5rLFxuICB9O1xufVxuXG5mdW5jdGlvbiBncm91cChcbiAgLi4uYXJnczogQW5vbnltb3VzR3JvdXBBcmdzIHwgTmFtZWRHcm91cEFyZ3Ncbik6IERlZmF1bHRUaGVtZS5TaWRlYmFyR3JvdXAge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgIGNvbnN0IFtpdGVtcywgY29sbGFwc2VdID0gYXJncyBhcyBBbm9ueW1vdXNHcm91cEFyZ3M7XG5cbiAgICByZXR1cm4ge1xuICAgICAgaXRlbXMsXG4gICAgICAuLi5ncm91cE9wdGlvbnMoY29sbGFwc2UpLFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgY29uc3QgW3RleHQsIGl0ZW1zLCBjb2xsYXBzZV0gPSBhcmdzIGFzIE5hbWVkR3JvdXBBcmdzO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRleHQsXG4gICAgICBpdGVtcyxcbiAgICAgIC4uLmdyb3VwT3B0aW9ucyhjb2xsYXBzZSksXG4gICAgfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBncm91cE9wdGlvbnMoXG4gIGNvbGxhcHNlOiBcImV4cGFuZGVkXCIgfCBcImNvbGxhcHNlZFwiIHwgdW5kZWZpbmVkXG4pOiBQaWNrPERlZmF1bHRUaGVtZS5TaWRlYmFyR3JvdXAsIFwiY29sbGFwc2VkXCIgfCBcImNvbGxhcHNpYmxlXCI+IHtcbiAgc3dpdGNoIChjb2xsYXBzZSkge1xuICAgIGNhc2UgXCJleHBhbmRlZFwiOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY29sbGFwc2libGU6IHRydWUsXG4gICAgICB9O1xuICAgIGNhc2UgXCJjb2xsYXBzZWRcIjpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNvbGxhcHNpYmxlOiB0cnVlLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICB9O1xuICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgcmV0dXJuIHt9O1xuICB9XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWdcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvcGFja2FnZS1pbmZvLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvcGFja2FnZS1pbmZvLnRzXCI7aW1wb3J0IHsgZXhlYyBhcyByYXdFeGVjIH0gZnJvbSBcIm5vZGU6Y2hpbGRfcHJvY2Vzc1wiO1xuaW1wb3J0IHsgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB7IHByb21pc2lmeSB9IGZyb20gXCJub2RlOnV0aWxcIjtcblxuY29uc3QgZXhlYyA9IHByb21pc2lmeShyYXdFeGVjKTtcblxuY29uc3QgX19kaXJuYW1lID0gZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpO1xuXG5jb25zdCBST09UID0gYXdhaXQgZ2V0V29ya3NwYWNlUm9vdCh7IGN3ZDogX19kaXJuYW1lIH0pO1xuXG5leHBvcnQgaW50ZXJmYWNlIERlcHMge1xuICBuYW1lOiBzdHJpbmc7XG4gIHZlcnNpb246IHN0cmluZztcbiAgcGF0aDogc3RyaW5nO1xuICBwcml2YXRlOiBib29sZWFuO1xuICBkZXBlbmRlbmNpZXM/OiBSZWNvcmQ8c3RyaW5nLCBEZXBlbmRlbmN5PjtcbiAgZGV2RGVwZW5kZW5jaWVzPzogUmVjb3JkPHN0cmluZywgRGVwZW5kZW5jeT47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGVwZW5kZW5jeSB7XG4gIGZyb206IHN0cmluZztcbiAgdmVyc2lvbjogc3RyaW5nO1xuICByZXNvbHZlZDogc3RyaW5nO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZXAoZmlsdGVyOiBzdHJpbmcsIHsgY3dkIH06IHsgY3dkOiBzdHJpbmcgfSkge1xuICAvLyAtRCBlbnN1cmVzIHRoYXQgd2UgZ2V0IGRldiBkZXBlbmRlbmNpZXMgcmVnYXJkbGVzcyBvZiB0aGUgdmFsdWUgb2YgTk9ERV9FTlZcbiAgY29uc3QgeyBzdGRvdXQgfSA9IGF3YWl0IGV4ZWMoYHBucG0gbGlzdCAtRCAtLWpzb24gJHtmaWx0ZXJ9YCwge1xuICAgIGN3ZCxcbiAgfSk7XG5cbiAgY29uc3QgZGVwczogRGVwc1tdID0gSlNPTi5wYXJzZShTdHJpbmcoc3Rkb3V0KSk7XG5cbiAgcmV0dXJuIGRlcHM7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFdvcmtzcGFjZVJvb3QoeyBjd2QgfTogeyBjd2Q6IHN0cmluZyB9KSB7XG4gIGNvbnN0IFtyb290XSA9IChhd2FpdCBkZXAoXCItLWRlcHRoPS0xXCIsIHsgY3dkIH0pKSBhcyBbRGVwc107XG5cbiAgcmV0dXJuIHJvb3QucGF0aDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFN0YXJiZWFtVmVyc2lvbnMoKTogUHJvbWlzZTxcbiAgUmVjb3JkPHN0cmluZywgRGVwZW5kZW5jeT5cbj4ge1xuICBjb25zdCBbZGVwc10gPSBhd2FpdCBkZXAoYGAsIHsgY3dkOiByZXNvbHZlKFJPT1QsIFwicGFja2FnZXMvdHdvc2xhc2hcIikgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5kZXBzLmRlcGVuZGVuY2llcyxcbiAgICAuLi5kZXBzLmRldkRlcGVuZGVuY2llcyxcbiAgfTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZy9TaXRlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvU2l0ZS50c1wiO2ltcG9ydCB0eXBlIHsgRGVmYXVsdFRoZW1lLCBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVwcmVzc1wiO1xuaW1wb3J0IHsgZ2V0U3RhcmJlYW1WZXJzaW9ucyB9IGZyb20gXCIuL3BhY2thZ2UtaW5mby5qc1wiO1xuaW1wb3J0IHR5cGUgeyBUaGVtZUNvbmZpZyB9IGZyb20gXCIuL3R5cGVzLmpzXCI7XG5cbmV4cG9ydCBjb25zdCBTSVRFOiBQYXJ0aWFsPFRoZW1lQ29uZmlnPiA9IHtcbiAgc2l0ZVRpdGxlOiBcIlN0YXJiZWFtXCIsXG4gIGxhc3RVcGRhdGVkVGV4dDogXCJMYXN0IFVwZGF0ZWQ6XCIsXG4gIGZvb3Rlcjoge1xuICAgIG1lc3NhZ2U6IFwiUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXCIsXG4gICAgY29weXJpZ2h0OlxuICAgICAgXCJDb3B5cmlnaHQgXHUwMEE5IDIwMjItcHJlc2VudCAoWWVodWRhIEthdHogYW5kIFN0YXJiZWFtIGNvbnRyaWJ1dG9ycylcIixcbiAgfSxcbn07XG5cbmV4cG9ydCBjb25zdCBDT05GSUc6IFBhcnRpYWw8VXNlckNvbmZpZzxEZWZhdWx0VGhlbWUuQ29uZmlnPj4gPSB7XG4gIHRpdGxlOiBcIlN0YXJiZWFtXCIsXG4gIGRlc2NyaXB0aW9uOiBcIlNpbXBsZSBhbmQgRnVuIFJlYWN0aXZpdHlcIixcbiAgdGl0bGVUZW1wbGF0ZTogXCJTaW1wbGUgYW5kIEZ1biBSZWFjdGl2aXR5XCIsXG4gIGxhc3RVcGRhdGVkOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IEJVSUxEX0hPT0tTOiBQYXJ0aWFsPFVzZXJDb25maWc8RGVmYXVsdFRoZW1lLkNvbmZpZz4+ID0ge1xuICB0cmFuc2Zvcm1QYWdlRGF0YTogYXN5bmMgKHBhZ2UpID0+IHtcbiAgICBjb25zdCB2ZXJzaW9ucyA9IGF3YWl0IGdldFN0YXJiZWFtVmVyc2lvbnMoKTtcblxuICAgIHBhZ2UuZnJvbnRtYXR0ZXJbXCJAc3RhcmJlYW06dmVyc2lvbnNcIl0gPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgICBPYmplY3QudmFsdWVzKHZlcnNpb25zKS5tYXAoKGRlcCkgPT4gW2RlcC5mcm9tLCBkZXAudmVyc2lvbl0pXG4gICAgKTtcblxuICAgIGlmIChcIlNUQVJCRUFNX1JFR0lTVFJZXCIgaW4gcHJvY2Vzcy5lbnYpIHtcbiAgICAgIHBhZ2UuZnJvbnRtYXR0ZXJbXCJAc3RhcmJlYW06cmVnaXN0cnlcIl0gPSBwcm9jZXNzLmVudi5TVEFSQkVBTV9SRUdJU1RSWTtcbiAgICB9XG4gIH0sXG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL21hcmtkb3duLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvbWFya2Rvd24udHNcIjtpbXBvcnQgdHlwZSBNYXJrZG93bkl0IGZyb20gXCJtYXJrZG93bi1pdFwiO1xuXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHRzIGZyb20gXCJ0eXBlc2NyaXB0XCI7XG5pbXBvcnQgeyBzbmlwcGV0cyB9IGZyb20gXCIuLi9wYWNrYWdlcy92aXRlcHJlc3Mtc25pcHBldHMvYnVpbGQuanNcIjtcbmltcG9ydCB7IGNvZGVUYWJzIH0gZnJvbSBcIi4uL3BsdWdpbnMvY29kZS10YWJzL2NvZGUtdGFicy5qc1wiO1xuaW1wb3J0IHsgY29udGFpbmVycyB9IGZyb20gXCIuLi9wbHVnaW5zL2NvbnRhaW5lcnMvY29udGFpbmVycy5qc1wiO1xuaW1wb3J0IHsgZmVuY2VzIH0gZnJvbSBcIi4uL3BsdWdpbnMvZmVuY2VzLmpzXCI7XG5pbXBvcnQgeyBtYXJrIH0gZnJvbSBcIi4uL3BsdWdpbnMvbWFyay9tYXJrLmpzXCI7XG5pbXBvcnQgeyBmbG93Y2hhcnQgfSBmcm9tIFwiLi4vcGx1Z2lucy9tZXJtYWlkL2Zsb3djaGFydC5qc1wiO1xuaW1wb3J0IHsgbWVybWFpZCB9IGZyb20gXCIuLi9wbHVnaW5zL21lcm1haWQvbWVybWFpZC5qc1wiO1xuaW1wb3J0IHsgaGlnaGxpZ2h0IGFzIGNyZWF0ZUhpZ2hsaWdodCB9IGZyb20gXCIuL3N5bnRheC1oaWdobGlnaHQvaGlnaGxpZ2h0LmpzXCI7XG4vLyBpbXBvcnQgeyB0YWJzIH0gZnJvbSBcIi4uL3BsdWdpbnMvdGFicy90YWJzLmpzXCI7XG5pbXBvcnQgeyBtYXJrZG93bkl0U2hpa2lUd29zbGFzaFNldHVwIH0gZnJvbSBcIi4vc3ludGF4LWhpZ2hsaWdodC9zZXR1cC5qc1wiO1xuaW1wb3J0IHR5cGUgeyBDb25maWcgfSBmcm9tIFwiLi90eXBlcy5qc1wiO1xuaW1wb3J0IHsgcm9vdCB9IGZyb20gXCIuL3ZpdGUuanNcIjtcblxuY29uc3QgU2hpa2kgPSBhd2FpdCBtYXJrZG93bkl0U2hpa2lUd29zbGFzaFNldHVwKHtcbiAgdGhlbWVzOiBbXCJnaXRodWItZGFya1wiLCBcImdpdGh1Yi1saWdodFwiXSxcbiAgd3JhcEZyYWdtZW50czogdHJ1ZSxcbiAgaW5jbHVkZUpTRG9jSW5Ib3ZlcjogdHJ1ZSxcbiAgZGlzYWJsZUltcGxpY2l0UmVhY3RJbXBvcnQ6IHRydWUsXG4gIHZmc1Jvb3Q6IHJlc29sdmUocm9vdCwgXCJwYWNrYWdlcy90d29zbGFzaFwiKSxcbiAgaWdub3JlQ29kZWJsb2Nrc1dpdGhDb2RlZmVuY2VNZXRhOiBbXCJuby1zaGlraVwiXSxcbn0pO1xuXG5jb25zdCBPUFRJT05TOiB0cy5Db21waWxlck9wdGlvbnMgPSB7XG4gIGV4cGVyaW1lbnRhbERlY29yYXRvcnM6IHRydWUsXG4gIHRhcmdldDogdHMuU2NyaXB0VGFyZ2V0LkVTTmV4dCxcbn07XG5cbmNvbnN0IHNoaWtpID0gKG1kOiBNYXJrZG93bkl0KSA9PlxuICBTaGlraShtZCwge1xuICAgIHRoZW1lczogW1wiZ2l0aHViLWRhcmtcIiwgXCJnaXRodWItbGlnaHRcIl0sXG5cbiAgICB2ZnNSb290OiByZXNvbHZlKHJvb3QsIFwicGFja2FnZXMvdHdvc2xhc2hcIiksXG4gICAgZGVmYXVsdENvbXBpbGVyT3B0aW9uczogT1BUSU9OUyxcbiAgICBpZ25vcmVDb2RlYmxvY2tzV2l0aENvZGVmZW5jZU1ldGE6IFtcIm5vLXNoaWtpXCJdLFxuICB9KTtcblxuY29uc3QgVEhFTUUgPSB7XG4gIGRhcms6IFwiZ2l0aHViLWRhcmtcIixcbiAgbGlnaHQ6IFwiZ2l0aHViLWxpZ2h0XCIsXG59O1xuXG5jb25zdCBoaWdobGlnaHQgPSBhd2FpdCBjcmVhdGVIaWdobGlnaHQoVEhFTUUsIFwidHlwZXNjcmlwdFwiKTtcblxuZXhwb3J0IGNvbnN0IE1BUktET1dOOiBDb25maWdbXCJtYXJrZG93blwiXSA9IHtcbiAgbGluZU51bWJlcnM6IGZhbHNlLFxuICB0aGVtZTogVEhFTUUsXG4gIGhpZ2hsaWdodCxcbiAgY29uZmlnOiAobWQpID0+IHtcbiAgICBtZC51c2Uoc2hpa2kpO1xuICAgIG1kLnVzZShmZW5jZXMpO1xuICAgIG1kLnVzZShzbmlwcGV0cyk7XG4gICAgbWQudXNlKGNvbnRhaW5lcnMpO1xuICAgIG1kLnVzZShtZXJtYWlkKTtcbiAgICBtZC51c2UoZmxvd2NoYXJ0KTtcbiAgICBtZC51c2UobWFyayk7XG4gICAgLy8gICAvLyBtZC51c2UodGFicyk7XG4gICAgbWQudXNlKGNvZGVUYWJzKTtcbiAgfSxcbiAgdG9jOiB7XG4gICAgbGV2ZWw6IFsyLCAzLCA0XSxcbiAgfSxcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wYWNrYWdlcy92aXRlcHJlc3Mtc25pcHBldHMvc3JjXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGFja2FnZXMvdml0ZXByZXNzLXNuaXBwZXRzL3NyYy9tYXJrZG93bi1pdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGFja2FnZXMvdml0ZXByZXNzLXNuaXBwZXRzL3NyYy9tYXJrZG93bi1pdC50c1wiO2ltcG9ydCBcIkBtZGl0LXZ1ZS9wbHVnaW4tc2ZjXCI7XG5pbXBvcnQgU25pcHBldCwgeyB0eXBlIEhpZ2hsaWdodCwgdHlwZSBSZWdpb24gfSBmcm9tIFwiZG9jcy1zbmlwcGV0XCI7XG5pbXBvcnQgdHlwZSBNYXJrZG93bkl0IGZyb20gXCJtYXJrZG93bi1pdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHR5cGUgeyBSdWxlQmxvY2sgfSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0B0eXBlcy9tYXJrZG93bi1pdC9saWIvcGFyc2VyX2Jsb2NrLmpzXCI7XG5pbXBvcnQgdHlwZSB7IFNuaXBwZXRzIH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9kb2NzLXNuaXBwZXQvZGlzdC90eXBlcy9zcmMvc25pcHBldHMuanNcIjtcbmltcG9ydCB0eXBlIHsgVml0ZXByZXNzU3RhdGVCbG9jayB9IGZyb20gXCIuLi8uLi8uLi9wbHVnaW5zL21hcmtkb3duL2Vudi5qc1wiO1xuaW1wb3J0IHsgUmVuZGVyTGFuZ3VhZ2VSZWdpb24gfSBmcm9tIFwiLi9zbmlwcGV0cy9sYW5ndWFnZS1yZWdpb24uanNcIjtcbmltcG9ydCB7IE1EU3RhdGUgfSBmcm9tIFwiLi91dGlscy5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc25pcHBldFBsdWdpbihtZDogTWFya2Rvd25JdCwgc3JjRGlyOiBzdHJpbmcpIHtcbiAgY29uc3QgcGFyc2VyOiBSdWxlQmxvY2sgPSAoXG4gICAgc3RhdGU6IFZpdGVwcmVzc1N0YXRlQmxvY2ssXG4gICAgc3RhcnRMaW5lLFxuICAgIF9lbmRMaW5lLFxuICAgIHNpbGVudFxuICApOiBib29sZWFuID0+IHtcbiAgICBjb25zdCBDSCA9IFwiO1wiLmNoYXJDb2RlQXQoMCk7XG5cbiAgICBjb25zdCBtZFN0YXRlID0gbmV3IE1EU3RhdGUoc3RhdGUpO1xuICAgIGNvbnN0IGxpbmUgPSBtZFN0YXRlLmxpbmUoc3RhcnRMaW5lKTtcbiAgICBjb25zdCB7IHBvcywgbWF4IH0gPSBsaW5lLnBvc2l0aW9uO1xuXG4gICAgaWYgKGxpbmUuaXNDb2RlQmxvY2spIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAobGluZS5zdGFydHNXaXRoKFwiYGBgc25pcHBldFwiKSkge1xuICAgICAgY29uc3QgZmVuY2VsaW5lID0gbGluZS5zdHJpbmcoKTtcblxuICAgICAgbGV0IHJhd1BhdGggPSBmZW5jZWxpbmUubWF0Y2goL2BgYHNuaXBwZXRcXHMrXFx7KC4qKVxcfS8pPy5bMV0gYXNcbiAgICAgICAgfCBzdHJpbmdcbiAgICAgICAgfCB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChzaWxlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBsaW5lLm5leHQ/LnVudGlsKFxuICAgICAgICAobGluZSkgPT4gbGluZS5zbGljZSgpPy50cmltKCkgPT09IFwiYGBgXCJcbiAgICAgICk7XG5cbiAgICAgIGlmICghY29udGVudCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IFtmaWxlbmFtZSwgcmVnaW9uTmFtZV0gPSByYXdQYXRoPy5zcGxpdChcIiNcIikgPz8gW107XG5cbiAgICAgIGNvbnN0IGZpbGUgPSBzdGF0ZS5lbnYucGF0aDtcbiAgICAgIGNvbnN0IGRpciA9IHBhdGguZGlybmFtZShmaWxlKTtcblxuICAgICAgY29uc3QgdG9rZW4gPSBzdGF0ZS5wdXNoKFwiaHRtbF9ibG9ja1wiLCBcIlwiLCAwKTtcblxuICAgICAgbGV0IHNuaXBwZXQ6IFNuaXBwZXRzO1xuXG4gICAgICB0cnkge1xuICAgICAgICBzbmlwcGV0ID0gU25pcHBldChjb250ZW50KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgdG9rZW4uY29udGVudCA9IGVycm9yKFxuICAgICAgICAgIGBJbnZhbGlkIHJlZ2lvbiBuYW1lOiAke3JlZ2lvbk5hbWV9XFxuXFxuJHtjb250ZW50fWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWdpb25OYW1lKSB7XG4gICAgICAgIGNvbnN0IHJlZ2lvbiA9IHNuaXBwZXQucmVnaW9ucz8uZ2V0KHJlZ2lvbk5hbWUpO1xuXG4gICAgICAgIGlmIChyZWdpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHRva2VuLmNvbnRlbnQgPSBlcnJvcihcbiAgICAgICAgICAgIGBJbnZhbGlkIHJlZ2lvbiBuYW1lOiAke3JlZ2lvbk5hbWV9XFxuXFxuJHtjb250ZW50fWBcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW4uY29udGVudCA9IGhpZ2hsaWdodFJlZ2lvbihtZCwgcmVnaW9uLCBzbmlwcGV0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRva2VuLmNvbnRlbnQgPSBoaWdobGlnaHQobWQsIHNuaXBwZXQpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgbWQuYmxvY2sucnVsZXIuYmVmb3JlKFwiZmVuY2VcIiwgXCJzbmlwcGV0XCIsIHBhcnNlcik7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodFJlZ2lvbihcbiAgbWQ6IE1hcmtkb3duSXQsXG4gIHJlZ2lvbjogUmVnaW9uLFxuICBjb21wbGV0ZTogU25pcHBldHNcbik6IHN0cmluZyB7XG4gIGNvbnN0IHRzRmVuY2VkID0gUmVuZGVyTGFuZ3VhZ2VSZWdpb24uY3JlYXRlKFxuICAgIHJlZ2lvbixcbiAgICBjb21wbGV0ZSxcbiAgICBcInRzXCJcbiAgKS5oaWdobGlnaHQobWQpO1xuXG4gIGlmIChyZWdpb24udHMuY29kZSA9PT0gcmVnaW9uLmpzLmNvZGUpIHtcbiAgICByZXR1cm4gYDxzZWN0aW9uIGNsYXNzPVwiYm90aC1sYW5nXCI+JHt0c0ZlbmNlZH08L3NlY3Rpb24+YDtcbiAgfVxuXG4gIGNvbnN0IGpzRmVuY2VkID0gUmVuZGVyTGFuZ3VhZ2VSZWdpb24uY3JlYXRlKFxuICAgIHJlZ2lvbixcbiAgICBjb21wbGV0ZSxcbiAgICBcImpzXCJcbiAgKS5oaWdobGlnaHQobWQpO1xuXG4gIC8vIGNvbnN0IGpzRmVuY2VkID0gaGlnaGxpZ2h0TGFuZyhtZCwge1xuICAvLyAgIGNvZGU6IHJlZ2lvbi5qcy5jb2RlLFxuICAvLyAgIGhpZ2hsaWdodHM6IHJlZ2lvbi5qcy5oaWdobGlnaHRzLFxuICAvLyAgIHByZWZpeDogcHJlZml4KHJlZ2lvbi5qcywgY29tcGxldGUuanMpLFxuICAvLyAgIHBvc3RmaXg6IHBvc3RmaXgocmVnaW9uLmpzLCBjb21wbGV0ZS5qcyksXG4gIC8vIH0pO1xuXG4gIHJldHVybiBgPENvZGU+PHRlbXBsYXRlICN0cz4ke3RzRmVuY2VkfTwvdGVtcGxhdGU+PHRlbXBsYXRlICNqcz4ke2pzRmVuY2VkfTwvdGVtcGxhdGU+PC9Db2RlPmA7XG59XG5cbmZ1bmN0aW9uIGhpZ2hsaWdodChtZDogTWFya2Rvd25JdCwgcmVnaW9uOiBTbmlwcGV0cykge1xuICBjb25zdCB0c0ZlbmNlZCA9IGhpZ2hsaWdodExhbmcobWQsIHtcbiAgICBjb2RlOiByZWdpb24udHMuY29kZSxcbiAgICBoaWdobGlnaHRzOiBbXSxcbiAgICBwcmVmaXg6IFwiXCIsXG4gIH0pO1xuXG4gIGlmIChyZWdpb24udHMuY29kZSA9PT0gcmVnaW9uLmpzLmNvZGUpIHtcbiAgICByZXR1cm4gYDxzZWN0aW9uIGNsYXNzPVwiYm90aC1sYW5nXCI+JHt0c0ZlbmNlZH08L3NlY3Rpb24+YDtcbiAgfVxuXG4gIGNvbnN0IGpzRmVuY2VkID0gaGlnaGxpZ2h0TGFuZyhtZCwge1xuICAgIGNvZGU6IHJlZ2lvbi5qcy5jb2RlLFxuICAgIGhpZ2hsaWdodHM6IFtdLFxuICAgIHByZWZpeDogXCJcIixcbiAgfSk7XG5cbiAgcmV0dXJuIGA8Q29kZT48dGVtcGxhdGUgI3RzPiR7dHNGZW5jZWR9PC90ZW1wbGF0ZT48dGVtcGxhdGUgI2pzPiR7anNGZW5jZWR9PC90ZW1wbGF0ZT48L0NvZGU+YDtcbn1cblxuZnVuY3Rpb24gaGlnaGxpZ2h0TGFuZyhcbiAgbWQ6IE1hcmtkb3duSXQsXG4gIHtcbiAgICBjb2RlLFxuICAgIGhpZ2hsaWdodHMsXG4gICAgcHJlZml4LFxuICAgIHBvc3RmaXgsXG4gIH06IHtcbiAgICBjb2RlOiBzdHJpbmc7XG4gICAgaGlnaGxpZ2h0cz86IEhpZ2hsaWdodFtdO1xuICAgIHByZWZpeD86IHN0cmluZztcbiAgICBwb3N0Zml4Pzogc3RyaW5nO1xuICB9XG4pOiBzdHJpbmcge1xuICBjb25zdCBhdHRyID1cbiAgICBoaWdobGlnaHRzICYmIGhpZ2hsaWdodHMubGVuZ3RoID4gMFxuICAgICAgPyBgeyR7aGlnaGxpZ2h0cy5tYXAoKGgpID0+IGgubGluZXMpLmpvaW4oXCIsXCIpfX1gXG4gICAgICA6IFwiXCI7XG5cbiAgY29uc3Qgb3V0cHV0ID0gW107XG5cbiAgaWYgKHByZWZpeCkge1xuICAgIG91dHB1dC5wdXNoKHByZWZpeCwgXCIvLyAtLS1jdXQtLS1cIik7XG4gIH1cblxuICBvdXRwdXQucHVzaChjb2RlKTtcblxuICBpZiAocG9zdGZpeCkge1xuICAgIG91dHB1dC5wdXNoKFwiLy8gLS0tY3V0LWFmdGVyLS0tXCIsIHBvc3RmaXgpO1xuICB9XG5cbiAgY29uc3Qgc291cmNlID0gb3V0cHV0LmpvaW4oXCJcXG5cIikudHJpbUVuZCgpO1xuXG4gIHJldHVybiAoXG4gICAgbWQub3B0aW9ucy5oaWdobGlnaHQ/Lihzb3VyY2UsIFwidHN4IHR3b3NsYXNoXCIsIGF0dHIpID8/XG4gICAgYDxwcmU+PGNvZGUgY2xhc3M9XCJsYW5ndWFnZS10c1wiPiR7Y29kZX08L2NvZGU+PC9wcmU+YFxuICApO1xufVxuXG5jbGFzcyBGZW5jZUluZm8ge1xuICAjbWQ6IE1hcmtkb3duSXQ7XG4gICNvcmlnaW5hbDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKG1kOiBNYXJrZG93bkl0LCBvcmlnaW5hbDogc3RyaW5nKSB7XG4gICAgdGhpcy4jbWQgPSBtZDtcbiAgICB0aGlzLiNvcmlnaW5hbCA9IG9yaWdpbmFsO1xuICB9XG5cbiAgLy8gYXNBdHRyKGhpZ2hsaWdodHM6IEhpZ2hsaWdodFtdKTogW3N0cmluZywgc3RyaW5nXVtdIHtcbiAgLy8gICByZXR1cm4gW1toaWdobGlnaHRzLm1hcCgoaCkgPT4gaC5saW5lcykuam9pbihcIixcIiksIFwiXCJdXTtcbiAgLy8gfVxuXG4gICNzaGlraUF0dHIoaGlnaGxpZ2h0czogSGlnaGxpZ2h0W10gfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuICAgIHJldHVybiBoaWdobGlnaHRzICYmIGhpZ2hsaWdodHMubGVuZ3RoID4gMFxuICAgICAgPyBgeyR7aGlnaGxpZ2h0cy5tYXAoKGgpID0+IGgubGluZXMpLmpvaW4oXCIsXCIpfX1gXG4gICAgICA6IFwiXCI7XG4gIH1cblxuICBoaWdobGlnaHQocmVnaW9uOiBSZWdpb24gfCBTbmlwcGV0cykge1xuICAgIGNvbnN0IHRzRmVuY2VkID0gdGhpcy4jaGlnaGxpZ2h0TGFuZyhyZWdpb24udHMpO1xuXG4gICAgaWYgKHJlZ2lvbi50cy5jb2RlID09PSByZWdpb24uanMuY29kZSkge1xuICAgICAgcmV0dXJuIGA8c2VjdGlvbiBjbGFzcz1cImJvdGgtbGFuZ1wiPiR7dHNGZW5jZWR9PC9zZWN0aW9uPmA7XG4gICAgfVxuXG4gICAgY29uc3QganNGZW5jZWQgPSB0aGlzLiNoaWdobGlnaHRMYW5nKHJlZ2lvbi5qcyk7XG5cbiAgICByZXR1cm4gYDxDb2RlPjx0ZW1wbGF0ZSAjdHM+JHt0c0ZlbmNlZH08L3RlbXBsYXRlPjx0ZW1wbGF0ZSAjanM+JHtqc0ZlbmNlZH08L3RlbXBsYXRlPjwvQ29kZT5gO1xuICB9XG5cbiAgI2hpZ2hsaWdodExhbmcocmVnaW9uOiB7IGNvZGU6IHN0cmluZzsgaGlnaGxpZ2h0cz86IEhpZ2hsaWdodFtdIH0pOiBzdHJpbmcge1xuICAgIHJldHVybiAoXG4gICAgICB0aGlzLiNtZC5vcHRpb25zLmhpZ2hsaWdodD8uKFxuICAgICAgICByZWdpb24uY29kZSxcbiAgICAgICAgXCJ0c1wiLFxuICAgICAgICB0aGlzLiNzaGlraUF0dHIocmVnaW9uLmhpZ2hsaWdodHMpXG4gICAgICApID8/IGA8cHJlPjxjb2RlIGNsYXNzPVwibGFuZ3VhZ2UtdHNcIj4ke3JlZ2lvbi5jb2RlfTwvY29kZT48L3ByZT5gXG4gICAgKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwibGFuZ3VhZ2UtZXJyb3IgZXh0LWVycm9yXCI+PHByZSBjbGFzcz1cImV4dC1lcnJvclwiPjxjb2RlPiR7bWVzc2FnZX08L2NvZGU+PC9wcmU+PC9kaXY+YDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKGRhdGE6IHN0cmluZykge1xuICAvLyBlc2NhcGUgPCBhbmQgPlxuICByZXR1cm4gYnJlYWthYmxlKGRhdGEpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpO1xufVxuXG5mdW5jdGlvbiBicmVha2FibGUoZGF0YTogc3RyaW5nKSB7XG4gIC8vIGFkZCBhIHdiciBhcm91bmQgYC9gXG4gIHJldHVybiBkYXRhLnJlcGxhY2UoL1xcLy9nLCBcIjx3YnI+Lzx3YnI+XCIpO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGFja2FnZXMvdml0ZXByZXNzLXNuaXBwZXRzL3NyYy9zbmlwcGV0c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BhY2thZ2VzL3ZpdGVwcmVzcy1zbmlwcGV0cy9zcmMvc25pcHBldHMvbGFuZ3VhZ2UtcmVnaW9uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wYWNrYWdlcy92aXRlcHJlc3Mtc25pcHBldHMvc3JjL3NuaXBwZXRzL2xhbmd1YWdlLXJlZ2lvbi50c1wiO2ltcG9ydCB0eXBlIHtcbiAgSGlnaGxpZ2h0LFxuICBMYW5ndWFnZVJlZ2lvbixcbiAgUmVnaW9uLFxuICBTbmlwcGV0cyxcbiAgU291cmNlLFxufSBmcm9tIFwiZG9jcy1zbmlwcGV0XCI7XG5pbXBvcnQgdHlwZSBNYXJrZG93bkl0IGZyb20gXCJtYXJrZG93bi1pdFwiO1xuXG5leHBvcnQgY2xhc3MgUmVuZGVyTGFuZ3VhZ2VSZWdpb24ge1xuICBzdGF0aWMgY3JlYXRlKHJlZ2lvbjogUmVnaW9uLCBwYXJzZWQ6IFNuaXBwZXRzLCBraW5kOiBcInRzXCIgfCBcImpzXCIpIHtcbiAgICBjb25zdCBsYW5nID0gcmVnaW9uW2tpbmRdO1xuICAgIGNvbnN0IHNvdXJjZSA9IHBhcnNlZFtraW5kXTtcblxuICAgIHJldHVybiBuZXcgUmVuZGVyTGFuZ3VhZ2VSZWdpb24oa2luZCwgbGFuZywgcGFyc2VkLCBzb3VyY2UpO1xuICB9XG5cbiAgI2tpbmQ6IFwidHNcIiB8IFwianNcIjtcbiAgI3JlZ2lvbjogTGFuZ3VhZ2VSZWdpb247XG4gICNwYXJzZWQ6IFNuaXBwZXRzO1xuICAjc291cmNlOiBTb3VyY2U7XG5cbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcihcbiAgICBraW5kOiBcInRzXCIgfCBcImpzXCIsXG4gICAgcmVnaW9uOiBMYW5ndWFnZVJlZ2lvbixcbiAgICBwYXJzZWQ6IFNuaXBwZXRzLFxuICAgIHNvdXJjZTogU291cmNlXG4gICkge1xuICAgIHRoaXMuI2tpbmQgPSBraW5kO1xuICAgIHRoaXMuI3JlZ2lvbiA9IHJlZ2lvbjtcbiAgICB0aGlzLiNwYXJzZWQgPSBwYXJzZWQ7XG4gICAgdGhpcy4jc291cmNlID0gc291cmNlO1xuICB9XG5cbiAgaGlnaGxpZ2h0KG1kOiBNYXJrZG93bkl0KSB7XG4gICAgY29uc3QgaGlnaGxpZ2h0cyA9IHRoaXMuI2hpZ2hsaWdodHM7XG4gICAgY29uc3QgY29kZSA9IHRoaXMuI3JlZ2lvbi5jb2RlO1xuICAgIGNvbnN0IHByZWZpeCA9IHRoaXMuI3ByZWZpeCgpO1xuICAgIGNvbnN0IHBvc3RmaXggPSB0aGlzLiNwb3N0Zml4KCk7XG5cbiAgICBjb25zdCBhdHRyID1cbiAgICAgIGhpZ2hsaWdodHMgJiYgaGlnaGxpZ2h0cy5sZW5ndGggPiAwXG4gICAgICAgID8gYHske2hpZ2hsaWdodHMubWFwKChoKSA9PiBoLmxpbmVzKS5qb2luKFwiLFwiKX19YFxuICAgICAgICA6IFwiXCI7XG5cbiAgICBjb25zdCBvdXRwdXQgPSBbXTtcblxuICAgIGlmICh0aGlzLiNraW5kID09PSBcImpzXCIpIHtcbiAgICAgIG91dHB1dC5wdXNoKFwiLy8gQG5vRXJyb3JzXCIpO1xuICAgIH1cblxuICAgIGlmIChwcmVmaXgpIHtcbiAgICAgIG91dHB1dC5wdXNoKHByZWZpeCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuI2tpbmQgPT09IFwianNcIikge1xuICAgICAgY29uc3QgZHRzID0gdGhpcy4jZHRzO1xuXG4gICAgICBpZiAoZHRzKSB7XG4gICAgICAgIG91dHB1dC5wdXNoKGR0cy5jb2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocHJlZml4IHx8IHRoaXMuI2tpbmQgPT09IFwianNcIikge1xuICAgICAgb3V0cHV0LnB1c2goXCIvLyAtLS1jdXQtLS1cIik7XG4gICAgfVxuXG4gICAgb3V0cHV0LnB1c2goY29kZSk7XG5cbiAgICBpZiAocG9zdGZpeCkge1xuICAgICAgb3V0cHV0LnB1c2goXCIvLyAtLS1jdXQtYWZ0ZXItLS1cIiwgcG9zdGZpeCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlID0gb3V0cHV0LmpvaW4oXCJcXG5cIikudHJpbUVuZCgpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIG1kLm9wdGlvbnMuaGlnaGxpZ2h0Py4oc291cmNlLCBcInRzeCB0d29zbGFzaFwiLCBhdHRyKSA/P1xuICAgICAgYDxwcmU+PGNvZGUgY2xhc3M9XCJsYW5ndWFnZS10c1wiPi8vIEBqc3hJbXBvcnRTb3VyY2U6IHByZWFjdFxcbiR7Y29kZX08L2NvZGU+PC9wcmU+YFxuICAgICk7XG4gIH1cblxuICBnZXQgI2hpZ2hsaWdodHMoKTogSGlnaGxpZ2h0W10gfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLiNyZWdpb24uaGlnaGxpZ2h0cztcbiAgfVxuXG4gIGdldCAjZHRzKCk6IExhbmd1YWdlUmVnaW9uIHwgdm9pZCB7XG4gICAgY29uc3QgcmVnaW9ucyA9IHRoaXMuI3BhcnNlZC50cy5yZWdpb25zO1xuXG4gICAgaWYgKHJlZ2lvbnMpIHtcbiAgICAgIHJldHVybiByZWdpb25zW1wiZHRzXCJdO1xuICAgIH1cbiAgfVxuXG4gICNwcmVmaXgoKSB7XG4gICAgY29uc3QgbGluZXMgPSB0aGlzLiNzb3VyY2UuY29kZS5zcGxpdChcIlxcblwiKTtcbiAgICByZXR1cm4gbGluZXMuc2xpY2UoMCwgdGhpcy4jcmVnaW9uLm9mZnNldHMuc3RhcnQpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICAjcG9zdGZpeCgpIHtcbiAgICBjb25zdCBsaW5lcyA9IHRoaXMuI3NvdXJjZS5jb2RlLnNwbGl0KFwiXFxuXCIpO1xuICAgIHJldHVybiBsaW5lcy5zbGljZSh0aGlzLiNyZWdpb24ub2Zmc2V0cy5lbmQpLmpvaW4oXCJcXG5cIik7XG4gIH1cbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BhY2thZ2VzL3ZpdGVwcmVzcy1zbmlwcGV0cy9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wYWNrYWdlcy92aXRlcHJlc3Mtc25pcHBldHMvc3JjL3V0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wYWNrYWdlcy92aXRlcHJlc3Mtc25pcHBldHMvc3JjL3V0aWxzLnRzXCI7aW1wb3J0IHR5cGUgU3RhdGVCbG9jayBmcm9tIFwibWFya2Rvd24taXQvbGliL3J1bGVzX2Jsb2NrL3N0YXRlX2Jsb2NrLmpzXCI7XG5cbmV4cG9ydCBjbGFzcyBNRFN0YXRlIHtcbiAgI3N0YXRlOiBTdGF0ZUJsb2NrO1xuXG4gIGNvbnN0cnVjdG9yKHN0YXRlOiBTdGF0ZUJsb2NrKSB7XG4gICAgdGhpcy4jc3RhdGUgPSBzdGF0ZTtcbiAgfVxuXG4gIGxpbmUobGluZW5vOiBudW1iZXIpOiBMaW5lU3RhdGUge1xuICAgIHJldHVybiBuZXcgTGluZVN0YXRlKHRoaXMuI3N0YXRlLCBsaW5lbm8pO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBMaW5lU3RhdGUge1xuICAjc3RhdGU6IFN0YXRlQmxvY2s7XG4gICNzdGFydExpbmU6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihzdGF0ZTogU3RhdGVCbG9jaywgc3RhcnRMaW5lOiBudW1iZXIpIHtcbiAgICB0aGlzLiNzdGF0ZSA9IHN0YXRlO1xuICAgIHRoaXMuI3N0YXJ0TGluZSA9IHN0YXJ0TGluZTtcbiAgfVxuXG4gIGdldCBuZXh0KCk6IExpbmVTdGF0ZSB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKHRoaXMuI3N0YXJ0TGluZSA8IHRoaXMuI3N0YXRlLmxpbmVNYXgpIHtcbiAgICAgIHJldHVybiBuZXcgTGluZVN0YXRlKHRoaXMuI3N0YXRlLCB0aGlzLiNzdGFydExpbmUgKyAxKTtcbiAgICB9XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKTogeyBwb3M6IG51bWJlcjsgbWF4OiBudW1iZXIgfSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvczogdGhpcy5jb250ZW50U3RhcnQsXG4gICAgICBtYXg6IHRoaXMuZW5kLFxuICAgIH07XG4gIH1cblxuICBnZXQgI3NyYygpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLiNzdGF0ZS5zcmM7XG4gIH1cblxuICB1bnRpbChwcmVkaWNhdGU6IChsaW5lOiBMaW5lU3RhdGUpID0+IGJvb2xlYW4pOiBzdHJpbmcge1xuICAgIGxldCBsaW5lOiBMaW5lU3RhdGUgfCB1bmRlZmluZWQgPSB0aGlzO1xuICAgIGxldCBsaW5lcyA9IFtdO1xuXG4gICAgd2hpbGUgKGxpbmUpIHtcbiAgICAgIGNvbnN0IG5leHQ6IExpbmVTdGF0ZSB8IHVuZGVmaW5lZCA9IGxpbmUubmV4dDtcblxuICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgIHRoaXMuI3N0YXRlLmxpbmUgPSBsaW5lLiNzdGFydExpbmUgKyAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgbGluZXMucHVzaChsaW5lLnN0cmluZyh7IHdzOiB0cnVlIH0pKTtcbiAgICAgIGxpbmUgPSBuZXh0O1xuXG4gICAgICBpZiAocHJlZGljYXRlKG5leHQpKSB7XG4gICAgICAgIHRoaXMuI3N0YXRlLmxpbmUgPSBuZXh0LiNzdGFydExpbmUgKyAxO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGluZXMuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHN0cmluZyh7IHdzID0gZmFsc2UgfTogeyB3cz86IGJvb2xlYW4gfSA9IHt9KTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy4jc3JjLnNsaWNlKHdzID8gdGhpcy5zdGFydCA6IHRoaXMuY29udGVudFN0YXJ0LCB0aGlzLmVuZCk7XG4gIH1cblxuICBzdGFydHNXaXRoKGNoYXJzOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zbGljZShjaGFycy5sZW5ndGgpID09PSBjaGFycztcbiAgfVxuXG4gIHNsaWNlKG46IG51bWJlciA9IHRoaXMuZW5kIC0gdGhpcy5jb250ZW50U3RhcnQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmIChuID4gdGhpcy5lbmQgLSB0aGlzLmNvbnRlbnRTdGFydCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBwb3MgPSB0aGlzLmNvbnRlbnRTdGFydDtcbiAgICBsZXQgY2hhcnMgPSBcIlwiO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGNoYXJzICs9IHRoaXMuI3NyYy5jaGFyQXQocG9zICsgaSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoYXJzO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSB0b3RhbCBpbmRlbnQgb2YgdGhlIGxpbmUsIGluY2x1ZGluZyB0aGUgcmVxdWlyZWQgaW5kZW50LlxuICAgKi9cbiAgZ2V0ICN0b3RhbEluZGVudCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiNzdGF0ZS5zQ291bnRbdGhpcy4jc3RhcnRMaW5lXSA/PyAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoZSByZXF1aXJlZCBpbmRlbnQgb2YgdGhlIGxpbmUuXG4gICAqL1xuICBnZXQgI3JlcXVpcmVkSW5kZW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuI3N0YXRlLmJsa0luZGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgaW5kZW50IG9mIHRoZSBsaW5lLCBleGNsdWRpbmcgdGhlIHJlcXVpcmVkIGluZGVudC5cbiAgICovXG4gIGdldCBpbmRlbnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4jdG90YWxJbmRlbnQgLSB0aGlzLiNyZXF1aXJlZEluZGVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBpZiBpdCdzIGluZGVudGVkIG1vcmUgdGhhbiAzIHNwYWNlcywgaXQncyBhIGNvZGUgYmxvY2tcbiAgICovXG4gIGdldCBpc0NvZGVCbG9jaygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pbmRlbnQgPj0gNDtcbiAgfVxuXG4gIGdldCBzdGFydCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLiNzdGF0ZS5iTWFya3NbdGhpcy4jc3RhcnRMaW5lXSA/PyAwO1xuICB9XG5cbiAgZ2V0IHdzQ2hhcnMoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4jc3RhdGUudFNoaWZ0W3RoaXMuI3N0YXJ0TGluZV0gPz8gMDtcbiAgfVxuXG4gIGdldCBjb250ZW50U3RhcnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydCArIHRoaXMud3NDaGFycztcbiAgfVxuXG4gIGdldCBlbmQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy4jc3RhdGUuZU1hcmtzW3RoaXMuI3N0YXJ0TGluZV0gPz8gMDtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb24oXG4gIHN0YXRlOiBTdGF0ZUJsb2NrLFxuICBzdGFydExpbmU6IG51bWJlclxuKTogeyBwb3M6IG51bWJlcjsgbWF4OiBudW1iZXIgfSB7XG4gIGNvbnN0IHBvcyA9IChzdGF0ZS5iTWFya3Nbc3RhcnRMaW5lXSA/PyAwKSArIChzdGF0ZS50U2hpZnRbc3RhcnRMaW5lXSA/PyAwKTtcbiAgY29uc3QgbWF4ID0gc3RhdGUuZU1hcmtzW3N0YXJ0TGluZV0gPz8gMDtcblxuICByZXR1cm4geyBwb3MsIG1heCB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy90YWJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy90YWJzL3RhYnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvdGFicy90YWJzLnRzXCI7aW1wb3J0IGhhc2ggZnJvbSBcImhhc2gtc3VtXCI7XG5pbXBvcnQgdHlwZSB7IE9wdGlvbnMsIFBsdWdpbldpdGhPcHRpb25zIH0gZnJvbSBcIm1hcmtkb3duLWl0XCI7XG5pbXBvcnQgdHlwZSB7IFJ1bGVCbG9jayB9IGZyb20gXCJtYXJrZG93bi1pdC9saWIvcGFyc2VyX2Jsb2NrLmpzXCI7XG5pbXBvcnQgdHlwZSB7IGRlZmF1bHQgYXMgUmVuZGVyZXIgfSBmcm9tIFwibWFya2Rvd24taXQvbGliL3JlbmRlcmVyLmpzXCI7XG5pbXBvcnQgdHlwZSB7IGRlZmF1bHQgYXMgVG9rZW4gfSBmcm9tIFwibWFya2Rvd24taXQvbGliL3Rva2VuLmpzXCI7XG5cbmludGVyZmFjZSBCYXNlVGFiRGF0YSB7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHZhbHVlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhYk9wdGlvbnMge1xuICBuYW1lOiBzdHJpbmc7XG4gIGNvbXBvbmVudDogc3RyaW5nO1xuICBnZXR0ZXI6IChcbiAgICB0b2tlbnM6IFRva2VuW10sXG4gICAgaW5kZXg6IG51bWJlcixcbiAgICBvcHRpb25zOiBPcHRpb25zLFxuICAgIGVudjogdW5rbm93bixcbiAgICBzZWxmOiBSZW5kZXJlclxuICApID0+IFJlY29yZDxzdHJpbmcsIHVua25vd24+W107XG59XG5cbmV4cG9ydCBjb25zdCB0YWJzOiBQbHVnaW5XaXRoT3B0aW9uczxUYWJPcHRpb25zPiA9IChcbiAgbWQsXG4gIHsgbmFtZSwgY29tcG9uZW50LCBnZXR0ZXIgfSA9IHtcbiAgICBuYW1lOiBcInRhYnNcIixcbiAgICBjb21wb25lbnQ6IFwiVGFic1wiLFxuICAgIGdldHRlcjogKCkgPT4gW10sXG4gIH1cbikgPT4ge1xuICBjb25zdCBDT0RFVEFCX01BUktFUiA9IGBAdGFiYDtcblxuICBjb25zdCB0YWJzUnVsZTogUnVsZUJsb2NrID0gKHN0YXRlLCBzdGFydExpbmUsIGVuZExpbmUsIHNpbGVudCkgPT4ge1xuICAgIGxldCBzdGFydCA9IHN0YXRlLmJNYXJrc1tzdGFydExpbmVdICsgc3RhdGUudFNoaWZ0W3N0YXJ0TGluZV07XG4gICAgbGV0IG1heCA9IHN0YXRlLmVNYXJrc1tzdGFydExpbmVdO1xuXG4gICAgLy8gQ2hlY2sgb3V0IHRoZSBmaXJzdCBjaGFyYWN0ZXIgcXVpY2tseSxcbiAgICAvLyB0aGlzIHNob3VsZCBmaWx0ZXIgb3V0IG1vc3Qgb2Ygbm9uLWNvbnRhaW5lcnNcbiAgICBpZiAoc3RhdGUuc3JjW3N0YXJ0XSAhPT0gXCI6XCIpIHJldHVybiBmYWxzZTtcblxuICAgIGxldCBwb3MgPSBzdGFydCArIDE7XG5cbiAgICAvLyBDaGVjayBvdXQgdGhlIHJlc3Qgb2YgdGhlIG1hcmtlciBzdHJpbmdcbiAgICB3aGlsZSAocG9zIDw9IG1heCkge1xuICAgICAgaWYgKHN0YXRlLnNyY1twb3NdICE9PSBcIjpcIikgYnJlYWs7XG4gICAgICBwb3MgKz0gMTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXJrZXJDb3VudCA9IHBvcyAtIHN0YXJ0O1xuXG4gICAgaWYgKG1hcmtlckNvdW50IDwgMykgcmV0dXJuIGZhbHNlO1xuXG4gICAgY29uc3QgbWFya3VwID0gc3RhdGUuc3JjLnNsaWNlKHN0YXJ0LCBwb3MpO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN0YXRlLnNyYy5zbGljZShwb3MsIG1heCk7XG5cbiAgICBjb25zdCBbY29udGFpbmVyTmFtZSwgaWQgPSBcIlwiXSA9IHBhcmFtcy5zcGxpdChcIiNcIiwgMik7XG5cbiAgICBpZiAoY29udGFpbmVyTmFtZS50cmltKCkgIT09IG5hbWUpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIFNpbmNlIHN0YXJ0IGlzIGZvdW5kLCB3ZSBjYW4gcmVwb3J0IHN1Y2Nlc3MgaGVyZSBpbiB2YWxpZGF0aW9uIG1vZGVcbiAgICBpZiAoc2lsZW50KSByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIFNlYXJjaCBmb3IgdGhlIGVuZCBvZiB0aGUgYmxvY2tcbiAgICBsZXQgbmV4dExpbmUgPSBzdGFydExpbmU7XG4gICAgbGV0IGF1dG9DbG9zZWQgPSBmYWxzZTtcblxuICAgIC8vIFNlYXJjaCBmb3IgdGhlIGVuZCBvZiB0aGUgYmxvY2tcbiAgICB3aGlsZSAoXG4gICAgICAvLyB1bmNsb3NlZCBibG9jayBzaG91bGQgYmUgYXV0byBjbG9zZWQgYnkgZW5kIG9mIGRvY3VtZW50LlxuICAgICAgLy8gYWxzbyBibG9jayBzZWVtcyB0byBiZSBhdXRvIGNsb3NlZCBieSBlbmQgb2YgcGFyZW50XG4gICAgICBuZXh0TGluZSA8IGVuZExpbmVcbiAgICApIHtcbiAgICAgIG5leHRMaW5lICs9IDE7XG4gICAgICBzdGFydCA9IHN0YXRlLmJNYXJrc1tuZXh0TGluZV0gKyBzdGF0ZS50U2hpZnRbbmV4dExpbmVdO1xuICAgICAgbWF4ID0gc3RhdGUuZU1hcmtzW25leHRMaW5lXTtcblxuICAgICAgaWYgKHN0YXJ0IDwgbWF4ICYmIHN0YXRlLnNDb3VudFtuZXh0TGluZV0gPCBzdGF0ZS5ibGtJbmRlbnQpXG4gICAgICAgIC8vIG5vbi1lbXB0eSBsaW5lIHdpdGggbmVnYXRpdmUgaW5kZW50IHNob3VsZCBzdG9wIHRoZSBsaXN0OlxuICAgICAgICAvLyAtIGBgYFxuICAgICAgICAvLyAgdGVzdFxuICAgICAgICBicmVhaztcblxuICAgICAgaWYgKFxuICAgICAgICAvLyBtYXRjaCBzdGFydFxuXG4gICAgICAgIHN0YXRlLnNyY1tzdGFydF0gPT09IFwiOlwiICYmXG4gICAgICAgIC8vIGNsb3NpbmcgZmVuY2Ugc2hvdWxkIGJlIGluZGVudGVkIGxlc3MgdGhhbiA0IHNwYWNlc1xuICAgICAgICBzdGF0ZS5zQ291bnRbbmV4dExpbmVdIC0gc3RhdGUuYmxrSW5kZW50IDwgNFxuICAgICAgKSB7XG4gICAgICAgIC8vIGNoZWNrIHJlc3Qgb2YgbWFya2VyXG4gICAgICAgIGZvciAocG9zID0gc3RhcnQgKyAxOyBwb3MgPD0gbWF4OyBwb3MrKylcbiAgICAgICAgICBpZiAoc3RhdGUuc3JjW3Bvc10gIT09IFwiOlwiKSBicmVhaztcblxuICAgICAgICAvLyBjbG9zaW5nIGNvZGUgZmVuY2UgbXVzdCBiZSBhdCBsZWFzdCBhcyBsb25nIGFzIHRoZSBvcGVuaW5nIG9uZVxuICAgICAgICBpZiAocG9zIC0gc3RhcnQgPj0gbWFya2VyQ291bnQpIHtcbiAgICAgICAgICAvLyBtYWtlIHN1cmUgdGFpbCBoYXMgc3BhY2VzIG9ubHlcbiAgICAgICAgICBwb3MgPSBzdGF0ZS5za2lwU3BhY2VzKHBvcyk7XG5cbiAgICAgICAgICBpZiAocG9zID49IG1heCkge1xuICAgICAgICAgICAgLy8gZm91bmQhXG4gICAgICAgICAgICBhdXRvQ2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9sZFBhcmVudCA9IHN0YXRlLnBhcmVudFR5cGU7XG4gICAgY29uc3Qgb2xkTGluZU1heCA9IHN0YXRlLmxpbmVNYXg7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHN0YXRlLnBhcmVudFR5cGUgPSBgJHtuYW1lfV90YWJzYDtcblxuICAgIC8vIHRoaXMgd2lsbCBwcmV2ZW50IGxhenkgY29udGludWF0aW9ucyBmcm9tIGV2ZXIgZ29pbmcgcGFzdCBvdXIgZW5kIG1hcmtlclxuICAgIHN0YXRlLmxpbmVNYXggPSBuZXh0TGluZSAtIChhdXRvQ2xvc2VkID8gMSA6IDApO1xuXG4gICAgY29uc3Qgb3BlblRva2VuID0gc3RhdGUucHVzaChgJHtuYW1lfV90YWJzX29wZW5gLCBjb21wb25lbnQsIDEpO1xuXG4gICAgb3BlblRva2VuLm1hcmt1cCA9IG1hcmt1cDtcbiAgICBvcGVuVG9rZW4uYmxvY2sgPSB0cnVlO1xuICAgIG9wZW5Ub2tlbi5pbmZvID0gY29udGFpbmVyTmFtZTtcbiAgICBvcGVuVG9rZW4ubWV0YSA9IHsgaWQ6IGlkLnRyaW0oKSB9O1xuICAgIG9wZW5Ub2tlbi5tYXAgPSBbc3RhcnRMaW5lLCBuZXh0TGluZSAtIChhdXRvQ2xvc2VkID8gMSA6IDApXTtcblxuICAgIHN0YXRlLm1kLmJsb2NrLnRva2VuaXplKFxuICAgICAgc3RhdGUsXG4gICAgICBzdGFydExpbmUgKyAxLFxuICAgICAgbmV4dExpbmUgLSAoYXV0b0Nsb3NlZCA/IDEgOiAwKVxuICAgICk7XG5cbiAgICBjb25zdCBjbG9zZVRva2VuID0gc3RhdGUucHVzaChgJHtuYW1lfV90YWJzX2Nsb3NlYCwgY29tcG9uZW50LCAtMSk7XG5cbiAgICBjbG9zZVRva2VuLm1hcmt1cCA9IHN0YXRlLnNyYy5zbGljZShzdGFydCwgcG9zKTtcbiAgICBjbG9zZVRva2VuLmJsb2NrID0gdHJ1ZTtcblxuICAgIHN0YXRlLnBhcmVudFR5cGUgPSBvbGRQYXJlbnQ7XG4gICAgc3RhdGUubGluZU1heCA9IG9sZExpbmVNYXg7XG4gICAgc3RhdGUubGluZSA9IG5leHRMaW5lICsgKGF1dG9DbG9zZWQgPyAxIDogMCk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBjb25zdCB0YWJSdWxlOiBSdWxlQmxvY2sgPSAoc3RhdGUsIHN0YXJ0TGluZSwgZW5kTGluZSwgc2lsZW50KSA9PiB7XG4gICAgbGV0IHN0YXJ0ID0gc3RhdGUuYk1hcmtzW3N0YXJ0TGluZV0gKyBzdGF0ZS50U2hpZnRbc3RhcnRMaW5lXTtcbiAgICBsZXQgbWF4ID0gc3RhdGUuZU1hcmtzW3N0YXJ0TGluZV07XG5cbiAgICAvKlxuICAgICAqIENoZWNrIG91dCB0aGUgZmlyc3QgY2hhcmFjdGVyIHF1aWNrbHksXG4gICAgICogdGhpcyBzaG91bGQgZmlsdGVyIG91dCBtb3N0IG9mIG5vbi11bWwgYmxvY2tzXG4gICAgICovXG4gICAgaWYgKHN0YXRlLnNyYy5jaGFyQXQoc3RhcnQpICE9PSBcIkBcIikgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IGluZGV4O1xuXG4gICAgLy8gQ2hlY2sgb3V0IHRoZSByZXN0IG9mIHRoZSBtYXJrZXIgc3RyaW5nXG4gICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgQ09ERVRBQl9NQVJLRVIubGVuZ3RoOyBpbmRleCsrKVxuICAgICAgaWYgKENPREVUQUJfTUFSS0VSW2luZGV4XSAhPT0gc3RhdGUuc3JjW3N0YXJ0ICsgaW5kZXhdKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCBtYXJrdXAgPSBzdGF0ZS5zcmMuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgaW5kZXgpO1xuICAgIGNvbnN0IGluZm8gPSBzdGF0ZS5zcmMuc2xpY2Uoc3RhcnQgKyBpbmRleCwgbWF4KTtcblxuICAgIC8vIFNpbmNlIHN0YXJ0IGlzIGZvdW5kLCB3ZSBjYW4gcmVwb3J0IHN1Y2Nlc3MgaGVyZSBpbiB2YWxpZGF0aW9uIG1vZGVcbiAgICBpZiAoc2lsZW50KSByZXR1cm4gdHJ1ZTtcblxuICAgIGxldCBuZXh0TGluZSA9IHN0YXJ0TGluZTtcbiAgICBsZXQgYXV0b0Nsb3NlZCA9IGZhbHNlO1xuXG4gICAgLy8gU2VhcmNoIGZvciB0aGUgZW5kIG9mIHRoZSBibG9ja1xuICAgIHdoaWxlIChcbiAgICAgIC8vIHVuY2xvc2VkIGJsb2NrIHNob3VsZCBiZSBhdXRvIGNsb3NlZCBieSBlbmQgb2YgZG9jdW1lbnQuXG4gICAgICAvLyBhbHNvIGJsb2NrIHNlZW1zIHRvIGJlIGF1dG8gY2xvc2VkIGJ5IGVuZCBvZiBwYXJlbnRcbiAgICAgIG5leHRMaW5lIDwgZW5kTGluZVxuICAgICkge1xuICAgICAgbmV4dExpbmUgKz0gMTtcbiAgICAgIHN0YXJ0ID0gc3RhdGUuYk1hcmtzW25leHRMaW5lXSArIHN0YXRlLnRTaGlmdFtuZXh0TGluZV07XG4gICAgICBtYXggPSBzdGF0ZS5lTWFya3NbbmV4dExpbmVdO1xuXG4gICAgICBpZiAoc3RhcnQgPCBtYXggJiYgc3RhdGUuc0NvdW50W25leHRMaW5lXSA8IHN0YXRlLmJsa0luZGVudClcbiAgICAgICAgLy8gbm9uLWVtcHR5IGxpbmUgd2l0aCBuZWdhdGl2ZSBpbmRlbnQgc2hvdWxkIHN0b3AgdGhlIGxpc3Q6XG4gICAgICAgIC8vIC0gYGBgXG4gICAgICAgIC8vICB0ZXN0XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBpZiAoXG4gICAgICAgIC8vIG1hdGNoIHN0YXJ0XG4gICAgICAgIHN0YXRlLnNyY1tzdGFydF0gPT09IFwiQFwiICYmXG4gICAgICAgIC8vIG1hcmtlciBzaG91bGQgbm90IGJlIGluZGVudGVkIHdpdGggcmVzcGVjdCBvZiBvcGVuaW5nIGZlbmNlXG4gICAgICAgIHN0YXRlLnNDb3VudFtuZXh0TGluZV0gPD0gc3RhdGUuc0NvdW50W3N0YXJ0TGluZV1cbiAgICAgICkge1xuICAgICAgICBsZXQgb3Blbk1ha2VyTWF0Y2hlZCA9IHRydWU7XG5cbiAgICAgICAgZm9yIChpbmRleCA9IDA7IGluZGV4IDwgQ09ERVRBQl9NQVJLRVIubGVuZ3RoOyBpbmRleCsrKVxuICAgICAgICAgIGlmIChDT0RFVEFCX01BUktFUltpbmRleF0gIT09IHN0YXRlLnNyY1tzdGFydCArIGluZGV4XSkge1xuICAgICAgICAgICAgb3Blbk1ha2VyTWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgIGlmIChvcGVuTWFrZXJNYXRjaGVkKSB7XG4gICAgICAgICAgLy8gZm91bmQhXG4gICAgICAgICAgYXV0b0Nsb3NlZCA9IHRydWU7XG4gICAgICAgICAgbmV4dExpbmUgLT0gMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG9sZFBhcmVudCA9IHN0YXRlLnBhcmVudFR5cGU7XG4gICAgY29uc3Qgb2xkTGluZU1heCA9IHN0YXRlLmxpbmVNYXg7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHN0YXRlLnBhcmVudFR5cGUgPSBgdGFiYDtcblxuICAgIC8vIHRoaXMgd2lsbCBwcmV2ZW50IGxhenkgY29udGludWF0aW9ucyBmcm9tIGV2ZXIgZ29pbmcgcGFzdCBvdXIgZW5kIG1hcmtlclxuICAgIHN0YXRlLmxpbmVNYXggPSBuZXh0TGluZTtcblxuICAgIGNvbnN0IG9wZW5Ub2tlbiA9IHN0YXRlLnB1c2goXCJ0YWJfb3BlblwiLCBcInRlbXBsYXRlXCIsIDEpO1xuXG4gICAgY29uc3QgW3RpdGxlLCBpZF0gPSBpbmZvLnJlcGxhY2UoL146YWN0aXZlLywgXCJcIikuc3BsaXQoXCIjXCIsIDIpO1xuXG4gICAgb3BlblRva2VuLmJsb2NrID0gdHJ1ZTtcbiAgICBvcGVuVG9rZW4ubWFya3VwID0gbWFya3VwO1xuICAgIG9wZW5Ub2tlbi5pbmZvID0gdGl0bGUudHJpbSgpO1xuICAgIG9wZW5Ub2tlbi5tZXRhID0ge1xuICAgICAgYWN0aXZlOiBpbmZvLmluY2x1ZGVzKFwiOmFjdGl2ZVwiKSxcbiAgICB9O1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLW1lbWJlci1hY2Nlc3NcbiAgICBpZiAoaWQpIG9wZW5Ub2tlbi5tZXRhLnZhbHVlID0gaWQudHJpbSgpO1xuICAgIG9wZW5Ub2tlbi5tYXAgPSBbc3RhcnRMaW5lLCBuZXh0TGluZV07XG5cbiAgICBzdGF0ZS5tZC5ibG9jay50b2tlbml6ZShzdGF0ZSwgc3RhcnRMaW5lICsgMSwgbmV4dExpbmUpO1xuXG4gICAgY29uc3QgY2xvc2VUb2tlbiA9IHN0YXRlLnB1c2goXCJ0YWJfY2xvc2VcIiwgXCJ0ZW1wbGF0ZVwiLCAtMSk7XG5cbiAgICBjbG9zZVRva2VuLmJsb2NrID0gdHJ1ZTtcbiAgICBjbG9zZVRva2VuLm1hcmt1cCA9IFwiXCI7XG5cbiAgICBzdGF0ZS5wYXJlbnRUeXBlID0gb2xkUGFyZW50O1xuICAgIHN0YXRlLmxpbmVNYXggPSBvbGRMaW5lTWF4O1xuICAgIHN0YXRlLmxpbmUgPSBuZXh0TGluZSArIChhdXRvQ2xvc2VkID8gMSA6IDApO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgbWQuYmxvY2sucnVsZXIuYmVmb3JlKFwiZmVuY2VcIiwgYCR7bmFtZX1fdGFic2AsIHRhYnNSdWxlLCB7XG4gICAgYWx0OiBbXCJwYXJhZ3JhcGhcIiwgXCJyZWZlcmVuY2VcIiwgXCJibG9ja3F1b3RlXCIsIFwibGlzdFwiXSxcbiAgfSk7XG5cbiAgLy8gV0FSTklORzogIEhlcmUgd2UgdXNlIGFuIGludGVybmFsIHZhcmlhYmxlIHRvIG1ha2Ugc3VyZSB0YWIgcnVsZSBpcyBub3QgcmVnaXN0ZXJlZFxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10cy1jb21tZW50XG4gIC8vIEB0cy1pZ25vcmVcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGlmICghbWQuYmxvY2sucnVsZXIuX19ydWxlc19fLmZpbmQoKHsgbmFtZSB9KSA9PiBuYW1lID09PSBcInRhYlwiKSlcbiAgICBtZC5ibG9jay5ydWxlci5iZWZvcmUoXCJmZW5jZVwiLCBcInRhYlwiLCB0YWJSdWxlLCB7XG4gICAgICBhbHQ6IFtcInBhcmFncmFwaFwiLCBcInJlZmVyZW5jZVwiLCBcImJsb2NrcXVvdGVcIiwgXCJsaXN0XCJdLFxuICAgIH0pO1xuXG4gIG1kLnJlbmRlcmVyLnJ1bGVzW2Ake25hbWV9X3RhYnNfb3BlbmBdID0gKFxuICAgIHRva2VucyxcbiAgICBpbmRleCxcbiAgICBvcHRpb25zLFxuICAgIGVudixcbiAgICBzZWxmXG4gICk6IHN0cmluZyA9PiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudFxuICAgIGNvbnN0IHsgbWV0YSB9ID0gdG9rZW5zW2luZGV4XTtcbiAgICBjb25zdCBiYXNpY0RhdGE6IEJhc2VUYWJEYXRhW10gPSBbXTtcbiAgICBjb25zdCBjdXN0b21EYXRhID0gZ2V0dGVyKHRva2VucywgaW5kZXgsIG9wdGlvbnMsIGVudiwgc2VsZik7XG4gICAgbGV0IGFjdGl2ZUluZGV4ID0gLTE7XG4gICAgbGV0IGlzVGFiU3RhcnQgPSBmYWxzZTtcblxuICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtYXNzaWdubWVudFxuICAgICAgY29uc3QgeyBibG9jaywgbWV0YSwgdHlwZSwgaW5mbyB9ID0gdG9rZW5zW2ldO1xuXG4gICAgICBpZiAoYmxvY2spIHtcbiAgICAgICAgaWYgKHR5cGUgPT09IGAke25hbWV9X3RhYnNfY2xvc2VgKSBicmVhaztcbiAgICAgICAgaWYgKHR5cGUgPT09IGAke25hbWV9X3RhYnNfb3BlbmApIGNvbnRpbnVlO1xuXG4gICAgICAgIGlmICh0eXBlID09PSBcInRhYl9vcGVuXCIpIHtcbiAgICAgICAgICAvLyBjb2RlIHRhYiBpcyBhY3RpdmVcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1tZW1iZXItYWNjZXNzXG4gICAgICAgICAgaWYgKG1ldGEuYWN0aXZlKSBhY3RpdmVJbmRleCA9IGJhc2ljRGF0YS5sZW5ndGg7XG5cbiAgICAgICAgICB0b2tlbnNbaV0uYXR0clB1c2goW1xuICAgICAgICAgICAgYCN0YWIke2Jhc2ljRGF0YS5sZW5ndGh9YCxcbiAgICAgICAgICAgIFwieyB0aXRsZSwgdmFsdWUsIGlzQWN0aXZlIH1cIixcbiAgICAgICAgICBdKTtcblxuICAgICAgICAgIGlzVGFiU3RhcnQgPSB0cnVlO1xuICAgICAgICAgIGJhc2ljRGF0YS5wdXNoKHtcbiAgICAgICAgICAgIHRpdGxlOiBpbmZvLFxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtbWVtYmVyLWFjY2Vzc1xuICAgICAgICAgICAgLi4uKG1ldGEudmFsdWUgPyB7IHZhbHVlOiBtZXRhLnZhbHVlIGFzIHN0cmluZyB9IDoge30pLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJ0YWJfY2xvc2VcIikgY29udGludWU7XG5cbiAgICAgICAgaWYgKCFpc1RhYlN0YXJ0KSB7XG4gICAgICAgICAgdG9rZW5zW2ldLnR5cGUgPSBgJHtuYW1lfV90YWJzX2VtcHR5YDtcbiAgICAgICAgICB0b2tlbnNbaV0uaGlkZGVuID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSBiYXNpY0RhdGEubWFwKChpdGVtLCBpbmRleCkgPT4gKHtcbiAgICAgIC4uLml0ZW0sXG4gICAgICAuLi5jdXN0b21EYXRhW2luZGV4XSxcbiAgICB9KSk7XG5cbiAgICByZXR1cm4gYDwke2NvbXBvbmVudH0gaWQ9XCIke2hhc2goZGF0YSl9XCIgOmRhdGE9JyR7XG4gICAgICAvLyBzaW5nbGUgcXVvdGUgd2lsbCBicmVhayBAdnVlL2NvbXBpbGVyLXNmY1xuICAgICAgSlNPTi5zdHJpbmdpZnkoZGF0YSkucmVwbGFjZSgvJy9nLCBcIiYjMzlcIilcbiAgICB9JyR7YWN0aXZlSW5kZXggIT09IC0xID8gYCA6YWN0aXZlPVwiJHthY3RpdmVJbmRleH1cImAgOiBcIlwifSR7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1tZW1iZXItYWNjZXNzXG4gICAgICBtZXRhLmlkID8gYCB0YWItaWQ9XCIke21ldGEuaWQgYXMgc3RyaW5nfVwiYCA6IFwiXCJcbiAgICB9PlxcbmA7XG4gIH07XG5cbiAgbWQucmVuZGVyZXIucnVsZXNbYCR7bmFtZX1fdGFic19jbG9zZWBdID0gKCk6IHN0cmluZyA9PiBgPC8ke2NvbXBvbmVudH0+XFxuYDtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wbHVnaW5zL2NvZGUtdGFic1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvY29kZS10YWJzL2NvZGUtdGFicy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9jb2RlLXRhYnMvY29kZS10YWJzLnRzXCI7aW1wb3J0IHsgdGFicyB9IGZyb20gXCIuLi90YWJzL3RhYnMuanNcIjtcblxuaW1wb3J0IHR5cGUgeyBQbHVnaW5TaW1wbGUgfSBmcm9tIFwibWFya2Rvd24taXRcIjtcblxuZXhwb3J0IGNvbnN0IGNvZGVUYWJzOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+IHtcbiAgdGFicyhtZCwge1xuICAgIG5hbWU6IFwiY29kZS10YWJzXCIsXG4gICAgY29tcG9uZW50OiBcIkNvZGVUYWJzXCIsXG4gICAgZ2V0dGVyOiAodG9rZW5zLCBpbmRleCkgPT4ge1xuICAgICAgbGV0IGluQ29kZVRhYiA9IGZhbHNlO1xuICAgICAgbGV0IGZvdW5kRmVuY2UgPSBmYWxzZTtcbiAgICAgIGNvbnN0IGNvZGVUYWJzRGF0YTogeyBjb250ZW50OiBzdHJpbmcgfVtdID0gW107XG5cbiAgICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB7IGJsb2NrLCB0eXBlIH0gPSB0b2tlbnNbaV07XG5cbiAgICAgICAgaWYgKGJsb2NrKSB7XG4gICAgICAgICAgaWYgKHR5cGUgPT09IFwiY29kZS10YWJzX3RhYnNfY2xvc2VcIikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGUgPT09IFwidGFiX2Nsb3NlXCIpIHtcbiAgICAgICAgICAgIGluQ29kZVRhYiA9IGZhbHNlO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGUgPT09IFwidGFiX29wZW5cIikge1xuICAgICAgICAgICAgLy8gZm91bmQgYSBjb2RlIHRhYlxuICAgICAgICAgICAgaW5Db2RlVGFiID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvdW5kRmVuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpbkNvZGVUYWIgJiYgdHlwZSA9PT0gXCJmZW5jZVwiICYmICFmb3VuZEZlbmNlKSB7XG4gICAgICAgICAgICBmb3VuZEZlbmNlID0gdHJ1ZTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRva2Vuc1tpXS50eXBlID0gXCJjb2RlX3RhYl9lbXB0eVwiO1xuICAgICAgICAgIHRva2Vuc1tpXS5oaWRkZW4gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb2RlVGFic0RhdGE7XG4gICAgfSxcbiAgfSk7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9jb250YWluZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9jb250YWluZXJzL2NvbnRhaW5lci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9jb250YWluZXJzL2NvbnRhaW5lci50c1wiOy8qKlxuICogRm9ya2VkIGFuZCBtb2RpZmllZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZG93bi1pdC9tYXJrZG93bi1pdC1jb250YWluZXIvYmxvYi9tYXN0ZXIvaW5kZXguanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUgVml0YWx5IFB1enJpbiwgQWxleCBLb2NoYXJpbi5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuICogcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG4gKiBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG4gKiBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuICogY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuICogT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbiAqIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG4gKiBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbiAqIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuICogT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB0eXBlIHsgT3B0aW9ucywgUGx1Z2luV2l0aE9wdGlvbnMgfSBmcm9tIFwibWFya2Rvd24taXRcIjtcbmltcG9ydCB0eXBlIHsgUnVsZUJsb2NrIH0gZnJvbSBcIm1hcmtkb3duLWl0L2xpYi9wYXJzZXJfYmxvY2suanNcIjtcbmltcG9ydCB0eXBlIHtcbiAgZGVmYXVsdCBhcyBSZW5kZXJlcixcbiAgUmVuZGVyUnVsZSxcbn0gZnJvbSBcIm1hcmtkb3duLWl0L2xpYi9yZW5kZXJlci5qc1wiO1xuaW1wb3J0IHR5cGUgeyBkZWZhdWx0IGFzIFRva2VuIH0gZnJvbSBcIm1hcmtkb3duLWl0L2xpYi90b2tlbi5qc1wiO1xuaW1wb3J0IHR5cGUgeyBNYXJrZG93bkVudiB9IGZyb20gXCIuLi9tYXJrZG93bi1lbnYuanNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBNYXJrZG93bkl0Q29udGFpbmVyT3B0aW9ucyB7XG4gIC8qKiBjb250YWluZXIgbmFtZSAqL1xuICBuYW1lOiBzdHJpbmc7XG4gIC8qKiBjb250YWluZXIgbWFya2VyICovXG4gIG1hcmtlcj86IHN0cmluZztcbiAgLyoqIHZhbGlkYXRlIHdoZXRoZXIgdGhpcyBzaG91bGQgYmUgcmVnYXJkZWQgYXMgYSBjb250YWluZXIgKi9cbiAgdmFsaWRhdGU/OiAocGFyYW1zOiBzdHJpbmcsIG1hcmt1cDogc3RyaW5nKSA9PiBib29sZWFuO1xuICAvKiogb3BlbiB0YWcgcmVuZGVyIGZ1bmN0aW9uICovXG4gIG9wZW5SZW5kZXI/OiBSZW5kZXJSdWxlO1xuICAvKiogY2xvc2UgdGFnIHJlbmRlciBmdW5jdGlvbiAqL1xuICBjbG9zZVJlbmRlcj86IFJlbmRlclJ1bGU7XG59XG5cbmV4cG9ydCBjb25zdCBjb250YWluZXI6IFBsdWdpbldpdGhPcHRpb25zPE1hcmtkb3duSXRDb250YWluZXJPcHRpb25zPiA9IChcbiAgbWQsXG4gIHtcbiAgICBuYW1lLFxuICAgIG1hcmtlciA9IFwiOlwiLFxuICAgIHZhbGlkYXRlID0gKHBhcmFtczogc3RyaW5nKTogYm9vbGVhbiA9PlxuICAgICAgcGFyYW1zLnRyaW0oKS5zcGxpdChcIiBcIiwgMilbMF0gPT09IG5hbWUsXG4gICAgb3BlblJlbmRlciA9IChcbiAgICAgIHRva2VuczogVG9rZW5bXSxcbiAgICAgIGluZGV4OiBudW1iZXIsXG4gICAgICBvcHRpb25zOiBPcHRpb25zLFxuICAgICAgX2VudjogTWFya2Rvd25FbnYsXG4gICAgICBzbGY6IFJlbmRlcmVyXG4gICAgKTogc3RyaW5nID0+IHtcbiAgICAgIC8vIGFkZCBhIGNsYXNzIHRvIHRoZSBvcGVuaW5nIHRhZ1xuICAgICAgdG9rZW5zW2luZGV4XS5hdHRySm9pbihcImNsYXNzXCIsIG5hbWUpO1xuXG4gICAgICByZXR1cm4gc2xmLnJlbmRlclRva2VuKHRva2VucywgaW5kZXgsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgY2xvc2VSZW5kZXIgPSAoXG4gICAgICB0b2tlbnM6IFRva2VuW10sXG4gICAgICBpbmRleDogbnVtYmVyLFxuICAgICAgb3B0aW9uczogT3B0aW9ucyxcbiAgICAgIF9lbnY6IE1hcmtkb3duRW52LFxuICAgICAgc2xmOiBSZW5kZXJlclxuICAgICk6IHN0cmluZyA9PiBzbGYucmVuZGVyVG9rZW4odG9rZW5zLCBpbmRleCwgb3B0aW9ucyksXG4gIH0gPSB7IG5hbWU6IFwiXCIgfVxuKSA9PiB7XG4gIGNvbnN0IE1JTl9NQVJLRVJfTlVNID0gMztcbiAgY29uc3QgbWFya2VyU3RhcnQgPSBtYXJrZXJbMF07XG4gIGNvbnN0IG1hcmtlckxlbmd0aCA9IG1hcmtlci5sZW5ndGg7XG5cbiAgY29uc3QgY29udGFpbmVyOiBSdWxlQmxvY2sgPSAoc3RhdGUsIHN0YXJ0TGluZSwgZW5kTGluZSwgc2lsZW50KSA9PiB7XG4gICAgbGV0IHN0YXJ0ID0gc3RhdGUuYk1hcmtzW3N0YXJ0TGluZV0gKyBzdGF0ZS50U2hpZnRbc3RhcnRMaW5lXTtcbiAgICBsZXQgbWF4ID0gc3RhdGUuZU1hcmtzW3N0YXJ0TGluZV07XG5cbiAgICAvLyBDaGVjayBvdXQgdGhlIGZpcnN0IGNoYXJhY3RlciBxdWlja2x5LFxuICAgIC8vIHRoaXMgc2hvdWxkIGZpbHRlciBvdXQgbW9zdCBvZiBub24tY29udGFpbmVyc1xuICAgIC8vXG4gICAgaWYgKG1hcmtlclN0YXJ0ICE9PSBzdGF0ZS5zcmNbc3RhcnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgcG9zID0gc3RhcnQgKyAxO1xuXG4gICAgLy8gQ2hlY2sgb3V0IHRoZSByZXN0IG9mIHRoZSBtYXJrZXIgc3RyaW5nXG4gICAgd2hpbGUgKHBvcyA8PSBtYXgpIHtcbiAgICAgIGlmIChtYXJrZXJbKHBvcyAtIHN0YXJ0KSAlIG1hcmtlckxlbmd0aF0gIT09IHN0YXRlLnNyY1twb3NdKSBicmVhaztcbiAgICAgIHBvcyArPSAxO1xuICAgIH1cblxuICAgIGNvbnN0IG1hcmtlckNvdW50ID0gTWF0aC5mbG9vcigocG9zIC0gc3RhcnQpIC8gbWFya2VyTGVuZ3RoKTtcblxuICAgIGlmIChtYXJrZXJDb3VudCA8IE1JTl9NQVJLRVJfTlVNKSByZXR1cm4gZmFsc2U7XG5cbiAgICBwb3MgLT0gKHBvcyAtIHN0YXJ0KSAlIG1hcmtlckxlbmd0aDtcblxuICAgIGNvbnN0IG1hcmt1cCA9IHN0YXRlLnNyYy5zbGljZShzdGFydCwgcG9zKTtcbiAgICBjb25zdCBwYXJhbXMgPSBzdGF0ZS5zcmMuc2xpY2UocG9zLCBtYXgpO1xuXG4gICAgaWYgKCF2YWxpZGF0ZShwYXJhbXMsIG1hcmt1cCkpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIFNpbmNlIHN0YXJ0IGlzIGZvdW5kLCB3ZSBjYW4gcmVwb3J0IHN1Y2Nlc3MgaGVyZSBpbiB2YWxpZGF0aW9uIG1vZGVcblxuICAgIGlmIChzaWxlbnQpIHJldHVybiB0cnVlO1xuXG4gICAgbGV0IG5leHRMaW5lID0gc3RhcnRMaW5lO1xuICAgIGxldCBhdXRvQ2xvc2VkID0gZmFsc2U7XG5cbiAgICAvLyBTZWFyY2ggZm9yIHRoZSBlbmQgb2YgdGhlIGJsb2NrXG4gICAgd2hpbGUgKFxuICAgICAgLy8gdW5jbG9zZWQgYmxvY2sgc2hvdWxkIGJlIGF1dG8gY2xvc2VkIGJ5IGVuZCBvZiBkb2N1bWVudC5cbiAgICAgIC8vIGFsc28gYmxvY2sgc2VlbXMgdG8gYmUgYXV0byBjbG9zZWQgYnkgZW5kIG9mIHBhcmVudFxuICAgICAgbmV4dExpbmUgPCBlbmRMaW5lXG4gICAgKSB7XG4gICAgICBuZXh0TGluZSArPSAxO1xuICAgICAgc3RhcnQgPSBzdGF0ZS5iTWFya3NbbmV4dExpbmVdICsgc3RhdGUudFNoaWZ0W25leHRMaW5lXTtcbiAgICAgIG1heCA9IHN0YXRlLmVNYXJrc1tuZXh0TGluZV07XG5cbiAgICAgIGlmIChzdGFydCA8IG1heCAmJiBzdGF0ZS5zQ291bnRbbmV4dExpbmVdIDwgc3RhdGUuYmxrSW5kZW50KVxuICAgICAgICAvLyBub24tZW1wdHkgbGluZSB3aXRoIG5lZ2F0aXZlIGluZGVudCBzaG91bGQgc3RvcCB0aGUgbGlzdDpcbiAgICAgICAgLy8gLSBgYGBcbiAgICAgICAgLy8gIHRlc3RcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGlmIChcbiAgICAgICAgLy8gbWF0Y2ggc3RhcnRcbiAgICAgICAgbWFya2VyU3RhcnQgPT09IHN0YXRlLnNyY1tzdGFydF0gJiZcbiAgICAgICAgLy8gY2xvc2luZyBmZW5jZSBzaG91bGQgYmUgaW5kZW50ZWQgbGVzcyB0aGFuIDQgc3BhY2VzXG4gICAgICAgIHN0YXRlLnNDb3VudFtuZXh0TGluZV0gLSBzdGF0ZS5ibGtJbmRlbnQgPCA0XG4gICAgICApIHtcbiAgICAgICAgLy8gY2hlY2sgcmVzdCBvZiBtYXJrZXJcbiAgICAgICAgZm9yIChwb3MgPSBzdGFydCArIDE7IHBvcyA8PSBtYXg7IHBvcysrKVxuICAgICAgICAgIGlmIChtYXJrZXJbKHBvcyAtIHN0YXJ0KSAlIG1hcmtlckxlbmd0aF0gIT09IHN0YXRlLnNyY1twb3NdKSBicmVhaztcblxuICAgICAgICAvLyBjbG9zaW5nIGNvZGUgZmVuY2UgbXVzdCBiZSBhdCBsZWFzdCBhcyBsb25nIGFzIHRoZSBvcGVuaW5nIG9uZVxuICAgICAgICBpZiAoTWF0aC5mbG9vcigocG9zIC0gc3RhcnQpIC8gbWFya2VyTGVuZ3RoKSA+PSBtYXJrZXJDb3VudCkge1xuICAgICAgICAgIC8vIG1ha2Ugc3VyZSB0YWlsIGhhcyBzcGFjZXMgb25seVxuICAgICAgICAgIHBvcyAtPSAocG9zIC0gc3RhcnQpICUgbWFya2VyTGVuZ3RoO1xuICAgICAgICAgIHBvcyA9IHN0YXRlLnNraXBTcGFjZXMocG9zKTtcblxuICAgICAgICAgIGlmIChwb3MgPj0gbWF4KSB7XG4gICAgICAgICAgICAvLyBmb3VuZCFcbiAgICAgICAgICAgIGF1dG9DbG9zZWQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb2xkUGFyZW50ID0gc3RhdGUucGFyZW50VHlwZTtcbiAgICBjb25zdCBvbGRMaW5lTWF4ID0gc3RhdGUubGluZU1heDtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgc3RhdGUucGFyZW50VHlwZSA9IFwiY29udGFpbmVyXCI7XG5cbiAgICAvLyB0aGlzIHdpbGwgcHJldmVudCBsYXp5IGNvbnRpbnVhdGlvbnMgZnJvbSBldmVyIGdvaW5nIHBhc3Qgb3VyIGVuZCBtYXJrZXJcbiAgICBzdGF0ZS5saW5lTWF4ID0gbmV4dExpbmU7XG5cbiAgICBjb25zdCBvcGVuVG9rZW4gPSBzdGF0ZS5wdXNoKGBjb250YWluZXJfJHtuYW1lfV9vcGVuYCwgXCJkaXZcIiwgMSk7XG5cbiAgICBvcGVuVG9rZW4ubWFya3VwID0gbWFya3VwO1xuICAgIG9wZW5Ub2tlbi5ibG9jayA9IHRydWU7XG4gICAgb3BlblRva2VuLmluZm8gPSBwYXJhbXM7XG4gICAgb3BlblRva2VuLm1hcCA9IFtzdGFydExpbmUsIG5leHRMaW5lXTtcblxuICAgIHN0YXRlLm1kLmJsb2NrLnRva2VuaXplKHN0YXRlLCBzdGFydExpbmUgKyAxLCBuZXh0TGluZSk7XG5cbiAgICBjb25zdCBjbG9zZVRva2VuID0gc3RhdGUucHVzaChgY29udGFpbmVyXyR7bmFtZX1fY2xvc2VgLCBcImRpdlwiLCAtMSk7XG5cbiAgICBjbG9zZVRva2VuLm1hcmt1cCA9IHN0YXRlLnNyYy5zbGljZShzdGFydCwgcG9zKTtcbiAgICBjbG9zZVRva2VuLmJsb2NrID0gdHJ1ZTtcblxuICAgIHN0YXRlLnBhcmVudFR5cGUgPSBvbGRQYXJlbnQ7XG4gICAgc3RhdGUubGluZU1heCA9IG9sZExpbmVNYXg7XG4gICAgc3RhdGUubGluZSA9IG5leHRMaW5lICsgKGF1dG9DbG9zZWQgPyAxIDogMCk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBtZC5ibG9jay5ydWxlci5iZWZvcmUoXCJmZW5jZVwiLCBgY29udGFpbmVyXyR7bmFtZX1gLCBjb250YWluZXIsIHtcbiAgICBhbHQ6IFtcInBhcmFncmFwaFwiLCBcInJlZmVyZW5jZVwiLCBcImJsb2NrcXVvdGVcIiwgXCJsaXN0XCJdLFxuICB9KTtcbiAgbWQucmVuZGVyZXIucnVsZXNbYGNvbnRhaW5lcl8ke25hbWV9X29wZW5gXSA9IG9wZW5SZW5kZXI7XG4gIG1kLnJlbmRlcmVyLnJ1bGVzW2Bjb250YWluZXJfJHtuYW1lfV9jbG9zZWBdID0gY2xvc2VSZW5kZXI7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9jb250YWluZXJzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9jb250YWluZXJzL2NvbnRhaW5lcnMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvY29udGFpbmVycy9jb250YWluZXJzLnRzXCI7aW1wb3J0IHR5cGUgeyBQbHVnaW5TaW1wbGUgfSBmcm9tIFwibWFya2Rvd24taXRcIjtcbmltcG9ydCB7IGNvbnRhaW5lciB9IGZyb20gXCIuL2NvbnRhaW5lci5qc1wiO1xuXG5leHBvcnQgY29uc3QgYmxvY2tFbXBoYXNpczogUGx1Z2luU2ltcGxlID0gKG1kKSA9PlxuICBjb250YWluZXIobWQsIHtcbiAgICBuYW1lOiBcImVtcGhhc2lzXCIsXG4gICAgb3BlblJlbmRlcjogKHRva2VucywgaWR4KSA9PiB7XG4gICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpZHhdO1xuICAgICAgY29uc3QgaW5mbyA9IHRva2VuLmluZm8udHJpbSgpLnNsaWNlKFwiZW1waGFzaXNcIi5sZW5ndGgpLnRyaW0oKTtcblxuICAgICAgcmV0dXJuIGA8YmxvY2txdW90ZSBjbGFzcz0nZW0nPjxwIGNsYXNzPSd0aXRsZSc+JHtcbiAgICAgICAgaW5mbyB8fCBcIktleSBQb2ludFwiXG4gICAgICB9PC9wPlxcbmA7XG4gICAgfSxcbiAgICBjbG9zZVJlbmRlcjogKCkgPT4gXCI8L2Jsb2NrcXVvdGU+XFxuXCIsXG4gIH0pO1xuXG5leHBvcnQgY29uc3QgaGFjazogUGx1Z2luU2ltcGxlID0gKG1kKSA9PlxuICBjb250YWluZXIobWQsIHtcbiAgICBuYW1lOiBcImhhY2tcIixcbiAgICBvcGVuUmVuZGVyOiAoKSA9PiBcIjxkaXYgc3R5bGU9J2Rpc3BsYXk6bm9uZSc+XFxuXCIsXG4gICAgY2xvc2VSZW5kZXI6ICgpID0+IFwiPC9kaXY+XFxuXCIsXG4gIH0pO1xuXG5leHBvcnQgY29uc3QgbGlnaHRCdWxiOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+XG4gIGNvbnRhaW5lcihtZCwge1xuICAgIG5hbWU6IFwiXHVEODNEXHVEQ0ExXCIsXG4gICAgb3BlblJlbmRlcjogKCkgPT4gXCI8ZGl2IGNsYXNzPSdsaWdodGJ1bGInPlxcblwiLFxuICAgIGNsb3NlUmVuZGVyOiAoKSA9PiBcIjwvZGl2PlxcblwiLFxuICB9KTtcblxuZXhwb3J0IGNvbnN0IHR5cGVzY3JpcHQ6IFBsdWdpblNpbXBsZSA9IChtZCkgPT5cbiAgY29udGFpbmVyKG1kLCB7XG4gICAgbmFtZTogXCJ0eXBlc2NyaXB0XCIsXG4gICAgb3BlblJlbmRlcjogKCkgPT4gXCI8TGFuZ3VhZ2U+PHRlbXBsYXRlICN0cz5cXG5cIixcbiAgICBjbG9zZVJlbmRlcjogKCkgPT4gXCI8L3RlbXBsYXRlPjwvTGFuZ3VhZ2U+XFxuXCIsXG4gIH0pO1xuXG5leHBvcnQgY29uc3QgamF2YXNjcmlwdDogUGx1Z2luU2ltcGxlID0gKG1kKSA9PlxuICBjb250YWluZXIobWQsIHtcbiAgICBuYW1lOiBcImphdmFzY3JpcHRcIixcbiAgICBvcGVuUmVuZGVyOiAoKSA9PiBcIjxMYW5ndWFnZT48dGVtcGxhdGUgI2pzPlxcblwiLFxuICAgIGNsb3NlUmVuZGVyOiAoKSA9PiBcIjwvdGVtcGxhdGU+PC9MYW5ndWFnZT5cXG5cIixcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBjb25zdHJ1Y3Rpb246IFBsdWdpblNpbXBsZSA9IChtZCkgPT5cbiAgY29udGFpbmVyKG1kLCB7XG4gICAgbmFtZTogXCJcdUQ4M0RcdURFQTdcIixcbiAgICBvcGVuUmVuZGVyOiAoKSA9PiBcIjxkaXYgY2xhc3M9J2NvbnN0cnVjdGlvbic+XFxuXCIsXG4gICAgY2xvc2VSZW5kZXI6ICgpID0+IFwiPC9kaXY+XFxuXCIsXG4gIH0pO1xuXG5leHBvcnQgY29uc3QgYWxnb3JpdGhtOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+XG4gIGNvbnRhaW5lcihtZCwge1xuICAgIG5hbWU6IFwiYWxnb3JpdGhtXCIsXG4gICAgb3BlblJlbmRlcjogKCkgPT4gXCI8ZGl2IGNsYXNzPSdhbGdvcml0aG0nPlxcblwiLFxuICAgIGNsb3NlUmVuZGVyOiAoKSA9PiBcIjwvZGl2PlxcblwiLFxuICB9KTtcblxuZXhwb3J0IGNvbnN0IGFwaTogUGx1Z2luU2ltcGxlID0gKG1kKSA9PlxuICBjb250YWluZXIobWQsIHtcbiAgICBuYW1lOiBcImFwaVwiLFxuICAgIG9wZW5SZW5kZXI6ICgpID0+IFwiPGRpdiBjbGFzcz0nYXBpJz5cXG5cIixcbiAgICBjbG9zZVJlbmRlcjogKCkgPT4gXCI8L2Rpdj5cXG5cIixcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBkb2NzOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+XG4gIGNvbnRhaW5lcihtZCwge1xuICAgIG5hbWU6IFwiZG9jc1wiLFxuICAgIG9wZW5SZW5kZXI6ICgpID0+IFwiPGRpdiBjbGFzcz0ndnAtZG9jIFZQRG9jJz5cXG5cIixcbiAgICBjbG9zZVJlbmRlcjogKCkgPT4gXCI8L2Rpdj5cXG5cIixcbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBjb250YWluZXJzOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+IHtcbiAgbWQudXNlKGhhY2spO1xuICBtZC51c2UodHlwZXNjcmlwdCk7XG4gIG1kLnVzZShqYXZhc2NyaXB0KTtcbiAgbWQudXNlKGJsb2NrRW1waGFzaXMpO1xuICBtZC51c2UobGlnaHRCdWxiKTtcbiAgbWQudXNlKGNvbnN0cnVjdGlvbik7XG4gIG1kLnVzZShhbGdvcml0aG0pO1xuICBtZC51c2UoYXBpKTtcbiAgbWQudXNlKGRvY3MpO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wbHVnaW5zL2ZlbmNlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9mZW5jZXMudHNcIjtpbXBvcnQgaGFzaCBmcm9tIFwiaGFzaC1zdW1cIjtcbmltcG9ydCB0eXBlIE1hcmtkb3duSXQgZnJvbSBcIm1hcmtkb3duLWl0XCI7XG5pbXBvcnQgdHlwZSB7IFBsdWdpblNpbXBsZSB9IGZyb20gXCJtYXJrZG93bi1pdFwiO1xuaW1wb3J0IHR5cGUgeyBkZWZhdWx0IGFzIFRva2VuIH0gZnJvbSBcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AdHlwZXMvbWFya2Rvd24taXQvbGliL3Rva2VuLmpzXCI7XG5cbi8vIGRlY2xhcmUgY29uc3QgX19kaXJuYW1lOiBzdHJpbmc7XG5jb25zdCBkaXIgPSBfX2Rpcm5hbWU7XG4vLyBjb25zdCBkaXIgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5cbmNvbnN0IG5wbVJlbmRlciA9IChtZDogTWFya2Rvd25JdCwgdG9rZW5zOiBUb2tlbltdLCBpZHg6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHRva2VuID0gdG9rZW5zW2lkeF0hO1xuICBjb25zdCBrZXkgPSBgbnBtLSR7aGFzaChpZHgpfWA7XG4gIGNvbnN0IHsgY29udGVudDogcmF3LCBpbmZvIH0gPSB0b2tlbjtcbiAgY29uc3QgY29udGVudCA9IHJhdy50cmltKCk7XG5cbiAgY29uc3QgYm9keSA9IFtcbiAgICBcIjo6OiBjb2RlLXRhYnMjbnBtXCIsXG4gICAgXCJAdGFiIHBucG1cIixcbiAgICBcImBgYHNoZWxsXCIsXG4gICAgYCQgcG5wbSBpbnN0YWxsICR7Y29udGVudH1gLFxuICAgIFwiYGBgXCIsXG4gICAgXCJAdGFiIG5wbVwiLFxuICAgIFwiYGBgc2hlbGxcIixcbiAgICBgJCBucG0gaW5zdGFsbCAke2NvbnRlbnR9YCxcbiAgICBcImBgYFwiLFxuICAgIFwiQHRhYiB5YXJuXCIsXG4gICAgXCJgYGBzaGVsbFwiLFxuICAgIGAkIHlhcm4gYWRkICR7Y29udGVudH1gLFxuICAgIFwiYGBgXCIsXG4gICAgXCI6OjpcIixcbiAgXS5qb2luKFwiXFxuXCIpO1xuXG4gIHJldHVybiBtZC5yZW5kZXIoYm9keSk7XG59O1xuXG5leHBvcnQgY29uc3QgbnBtOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+IHtcbiAgLy8gSGFuZGxlIGBgYG5wbSBibG9ja3NcbiAgY29uc3QgZmVuY2UgPSBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZTtcblxuICBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZSA9ICguLi5hcmdzKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBbdG9rZW5zLCBpbmRleF0gPSBhcmdzO1xuICAgIGNvbnN0IHsgaW5mbyB9ID0gdG9rZW5zW2luZGV4XSE7XG4gICAgY29uc3QgcmVhbEluZm8gPSBpbmZvLnNwbGl0KFwiOlwiLCAyKVswXTtcblxuICAgIGlmIChyZWFsSW5mbyA9PT0gXCJucG1cIikgcmV0dXJuIG5wbVJlbmRlcihtZCwgdG9rZW5zLCBpbmRleCk7XG5cbiAgICByZXR1cm4gZmVuY2UhKC4uLmFyZ3MpO1xuICB9O1xufTtcblxuY29uc3Qgc3RhY2tibGl0elJlbmRlciA9IChcbiAgbWQ6IE1hcmtkb3duSXQsXG4gIGlkOiBzdHJpbmcsXG4gIGNvbnRlbnQ6IHN0cmluZ1xuKTogc3RyaW5nID0+IHtcbiAgLy8gcGFyc2UgdGhlIGNvbnRlbnQgbGluZXMuIEVhY2ggbGluZSBpcyBhIHBhaXIgb2YgYGtleVxccyo9XFxzKnZhbHVlYFxuICBjb25zdCBsaW5lcyA9IGNvbnRlbnQuc3BsaXQoXCJcXG5cIik7XG4gIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuZnJvbUVudHJpZXMoXG4gICAgbGluZXMubWFwKChsaW5lKSA9PiB7XG4gICAgICBjb25zdCBba2V5LCB2YWx1ZV0gPSBsaW5lLnNwbGl0KFwiPVwiKTtcbiAgICAgIHJldHVybiBba2V5IS50cmltKCksIHZhbHVlIS50cmltKCldO1xuICAgIH0pXG4gICkgYXMgUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcblxuICBjb25zdCBhdHRycyA9IFtgaWQ9JHtKU09OLnN0cmluZ2lmeShpZCl9YF07XG5cbiAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob3B0aW9ucykpIHtcbiAgICBhdHRycy5wdXNoKGAke2tleX09JHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9YCk7XG4gIH1cblxuICBjb25zdCB0aXRsZSA9IG9wdGlvbnMudGl0bGUgPz8gXCJQbGF5IHdpdGggaXQgb24gU3RhY2tCbGl0elwiO1xuICBkZWxldGUgb3B0aW9ucy50aXRsZTtcblxuICBjb25zdCBwcm9wcyA9IGF0dHJzLmpvaW4oXCIgXCIpO1xuXG4gIGNvbnN0IGJvZHkgPSBgOjo6IGRldGFpbHMgJHt0aXRsZX1cXG5cXG48U3RhY2tCbGl0eiAke3Byb3BzfSAvPlxcblxcbjo6OmA7XG5cbiAgcmV0dXJuIG1kLnJlbmRlcihib2R5KTtcbn07XG5cbmV4cG9ydCBjb25zdCBzdGFja2JsaXR6OiBQbHVnaW5TaW1wbGUgPSAobWQpID0+IHtcbiAgLy8gSGFuZGxlIGBgYHN0YWNrYmxpdHogYmxvY2tzXG4gIGNvbnN0IGZlbmNlID0gbWQucmVuZGVyZXIucnVsZXMuZmVuY2U7XG5cbiAgbWQucmVuZGVyZXIucnVsZXMuZmVuY2UgPSAoLi4uYXJncyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgW3Rva2VucywgaW5kZXhdID0gYXJncztcbiAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpbmRleF0hO1xuICAgIC8vIHBhcnNlIGBzdGFja2JsaXR6W2lkXWAgdXNpbmcgcmVnZXggZ3JvdXBzXG4gICAgY29uc3QgaW5mbyA9IHRva2VuLmluZm8ubWF0Y2goL15zdGFja2JsaXR6XFxbKC4qPylcXF0kLyk7XG5cbiAgICBpZiAoaW5mbyAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHN0YWNrYmxpdHpSZW5kZXIobWQsIGluZm9bMV0hLCB0b2tlbi5jb250ZW50LnRyaW0oKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZlbmNlISguLi5hcmdzKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBmZW5jZXMgPSAobWQ6IE1hcmtkb3duSXQpID0+IHtcbiAgbWQudXNlKG5wbSk7XG4gIG1kLnVzZShzdGFja2JsaXR6KTtcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wbHVnaW5zL21hcmtcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wbHVnaW5zL21hcmsvbWFyay50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvcGx1Z2lucy9tYXJrL21hcmsudHNcIjsvKipcbiAqIEZvcmtlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXJrZG93bi1pdC9tYXJrZG93bi1pdC1tYXJrL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUgVml0YWx5IFB1enJpbiwgQWxleCBLb2NoYXJpbi5cbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvblxuICogb2J0YWluaW5nIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb25cbiAqIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dFxuICogcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsXG4gKiBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlXG4gKiBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZ1xuICogY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuICogaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbiAqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFU1xuICogT0YgTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkRcbiAqIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUXG4gKiBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSxcbiAqIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lOR1xuICogRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUlxuICogT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuICovXG5cbmltcG9ydCB0eXBlIHsgUGx1Z2luU2ltcGxlIH0gZnJvbSBcIm1hcmtkb3duLWl0XCI7XG5pbXBvcnQgdHlwZSB7IFJ1bGVJbmxpbmUgfSBmcm9tIFwibWFya2Rvd24taXQvbGliL3BhcnNlcl9pbmxpbmUuanNcIjtcbmltcG9ydCB0eXBlIHsgZGVmYXVsdCBhcyBTdGF0ZUlubGluZSB9IGZyb20gXCJtYXJrZG93bi1pdC9saWIvcnVsZXNfaW5saW5lL3N0YXRlX2lubGluZS5qc1wiO1xuXG4vKlxuICogSW5zZXJ0IGVhY2ggbWFya2VyIGFzIGEgc2VwYXJhdGUgdGV4dCB0b2tlbiwgYW5kIGFkZCBpdCB0byBkZWxpbWl0ZXIgbGlzdFxuICpcbiAqL1xuY29uc3QgdG9rZW5pemU6IFJ1bGVJbmxpbmUgPSAoc3RhdGUsIHNpbGVudCkgPT4ge1xuICBjb25zdCBzdGFydCA9IHN0YXRlLnBvcztcbiAgY29uc3QgbWFya2VyID0gc3RhdGUuc3JjLmNoYXJBdChzdGFydCk7XG5cbiAgaWYgKHNpbGVudCB8fCBtYXJrZXIgIT09IFwiPVwiKSByZXR1cm4gZmFsc2U7XG5cbiAgY29uc3Qgc2Nhbm5lZCA9IHN0YXRlLnNjYW5EZWxpbXMoc3RhdGUucG9zLCB0cnVlKTtcbiAgbGV0IHsgbGVuZ3RoIH0gPSBzY2FubmVkO1xuXG4gIGlmIChsZW5ndGggPCAyKSByZXR1cm4gZmFsc2U7XG4gIGxldCB0b2tlbjtcblxuICBpZiAobGVuZ3RoICUgMikge1xuICAgIHRva2VuID0gc3RhdGUucHVzaChcInRleHRcIiwgXCJcIiwgMCk7XG4gICAgdG9rZW4uY29udGVudCA9IG1hcmtlcjtcbiAgICBsZW5ndGggLT0gMTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDIpIHtcbiAgICB0b2tlbiA9IHN0YXRlLnB1c2goXCJ0ZXh0XCIsIFwiXCIsIDApO1xuICAgIHRva2VuLmNvbnRlbnQgPSBgJHttYXJrZXJ9JHttYXJrZXJ9YDtcblxuICAgIGlmIChzY2FubmVkLmNhbl9vcGVuIHx8IHNjYW5uZWQuY2FuX2Nsb3NlKVxuICAgICAgc3RhdGUuZGVsaW1pdGVycy5wdXNoKHtcbiAgICAgICAgbWFya2VyOiAweDNkLFxuICAgICAgICBsZW5ndGg6IDAsIC8vIGRpc2FibGUgXCJydWxlIG9mIDNcIiBsZW5ndGggY2hlY2tzIG1lYW50IGZvciBlbXBoYXNpc1xuICAgICAgICBqdW1wOiBpIC8gMiwgLy8gMSBkZWxpbWl0ZXIgPSAyIGNoYXJhY3RlcnNcbiAgICAgICAgdG9rZW46IHN0YXRlLnRva2Vucy5sZW5ndGggLSAxLFxuICAgICAgICBlbmQ6IC0xLFxuICAgICAgICBvcGVuOiBzY2FubmVkLmNhbl9vcGVuLFxuICAgICAgICBjbG9zZTogc2Nhbm5lZC5jYW5fY2xvc2UsXG4gICAgICB9KTtcbiAgfVxuXG4gIHN0YXRlLnBvcyArPSBzY2FubmVkLmxlbmd0aDtcblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qXG4gKiBXYWxrIHRocm91Z2ggZGVsaW1pdGVyIGxpc3QgYW5kIHJlcGxhY2UgdGV4dCB0b2tlbnMgd2l0aCB0YWdzXG4gKlxuICovXG5jb25zdCBwb3N0UHJvY2VzcyA9IChcbiAgc3RhdGU6IFN0YXRlSW5saW5lLFxuICBkZWxpbWl0ZXJzOiBTdGF0ZUlubGluZS5EZWxpbWl0ZXJbXVxuKTogdm9pZCA9PiB7XG4gIGxldCB0b2tlbjtcbiAgY29uc3QgbG9uZU1hcmtlcnMgPSBbXTtcbiAgY29uc3QgbWF4ID0gZGVsaW1pdGVycy5sZW5ndGg7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xuICAgIGNvbnN0IHN0YXJ0RGVsaW0gPSBkZWxpbWl0ZXJzW2ldO1xuXG4gICAgaWYgKHN0YXJ0RGVsaW0ubWFya2VyID09PSAweDNkIC8qID0gKi8gJiYgc3RhcnREZWxpbS5lbmQgIT09IC0xKSB7XG4gICAgICBjb25zdCBlbmREZWxpbSA9IGRlbGltaXRlcnNbc3RhcnREZWxpbS5lbmRdO1xuXG4gICAgICB0b2tlbiA9IHN0YXRlLnRva2Vuc1tzdGFydERlbGltLnRva2VuXTtcbiAgICAgIHRva2VuLnR5cGUgPSBcIm1hcmtfb3BlblwiO1xuICAgICAgdG9rZW4udGFnID0gXCJtYXJrXCI7XG4gICAgICB0b2tlbi5uZXN0aW5nID0gMTtcbiAgICAgIHRva2VuLm1hcmt1cCA9IFwiPT1cIjtcbiAgICAgIHRva2VuLmNvbnRlbnQgPSBcIlwiO1xuXG4gICAgICB0b2tlbiA9IHN0YXRlLnRva2Vuc1tlbmREZWxpbS50b2tlbl07XG4gICAgICB0b2tlbi50eXBlID0gXCJtYXJrX2Nsb3NlXCI7XG4gICAgICB0b2tlbi50YWcgPSBcIm1hcmtcIjtcbiAgICAgIHRva2VuLm5lc3RpbmcgPSAtMTtcbiAgICAgIHRva2VuLm1hcmt1cCA9IFwiPT1cIjtcbiAgICAgIHRva2VuLmNvbnRlbnQgPSBcIlwiO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHN0YXRlLnRva2Vuc1tlbmREZWxpbS50b2tlbiAtIDFdLnR5cGUgPT09IFwidGV4dFwiICYmXG4gICAgICAgIHN0YXRlLnRva2Vuc1tlbmREZWxpbS50b2tlbiAtIDFdLmNvbnRlbnQgPT09IFwiPVwiXG4gICAgICApXG4gICAgICAgIGxvbmVNYXJrZXJzLnB1c2goZW5kRGVsaW0udG9rZW4gLSAxKTtcbiAgICB9XG4gIH1cblxuICAvKlxuICAgKiBJZiBhIG1hcmtlciBzZXF1ZW5jZSBoYXMgYW4gb2RkIG51bWJlciBvZiBjaGFyYWN0ZXJzLCBpdFx1MjAxOXMgc3BsaXR0ZWRcbiAgICogbGlrZSB0aGlzOiBgfn5+fn5gIC0+IGB+YCArIGB+fmAgKyBgfn5gLCBsZWF2aW5nIG9uZSBtYXJrZXIgYXQgdGhlXG4gICAqIHN0YXJ0IG9mIHRoZSBzZXF1ZW5jZS5cbiAgICpcbiAgICogU28sIHdlIGhhdmUgdG8gbW92ZSBhbGwgdGhvc2UgbWFya2VycyBhZnRlciBzdWJzZXF1ZW50IHNfY2xvc2UgdGFncy5cbiAgICpcbiAgICovXG4gIHdoaWxlIChsb25lTWFya2Vycy5sZW5ndGgpIHtcbiAgICBjb25zdCBpID0gbG9uZU1hcmtlcnMucG9wKCkhO1xuICAgIGxldCBqID0gaSArIDE7XG5cbiAgICB3aGlsZSAoaiA8IHN0YXRlLnRva2Vucy5sZW5ndGggJiYgc3RhdGUudG9rZW5zW2pdLnR5cGUgPT09IFwibWFya19jbG9zZVwiKVxuICAgICAgaiArPSAxO1xuXG4gICAgaiAtPSAxO1xuXG4gICAgaWYgKGkgIT09IGopIHtcbiAgICAgIHRva2VuID0gc3RhdGUudG9rZW5zW2pdO1xuICAgICAgc3RhdGUudG9rZW5zW2pdID0gc3RhdGUudG9rZW5zW2ldO1xuICAgICAgc3RhdGUudG9rZW5zW2ldID0gdG9rZW47XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnQgY29uc3QgbWFyazogUGx1Z2luU2ltcGxlID0gKG1kKSA9PiB7XG4gIG1kLmlubGluZS5ydWxlci5iZWZvcmUoXCJlbXBoYXNpc1wiLCBcIm1hcmtcIiwgdG9rZW5pemUpO1xuICBtZC5pbmxpbmUucnVsZXIyLmJlZm9yZShcImVtcGhhc2lzXCIsIFwibWFya1wiLCAoc3RhdGUpID0+IHtcbiAgICBjb25zdCB0b2tlbnNNZXRhID0gc3RhdGUudG9rZW5zX21ldGEgfHwgW107XG5cbiAgICBwb3N0UHJvY2VzcyhzdGF0ZSwgc3RhdGUuZGVsaW1pdGVycyk7XG5cbiAgICBmb3IgKGxldCBjdXJyID0gMDsgY3VyciA8IHRva2Vuc01ldGEubGVuZ3RoOyBjdXJyKyspIHtcbiAgICAgIGNvbnN0IHRva2VuTWV0YSA9IHRva2Vuc01ldGFbY3Vycl07XG5cbiAgICAgIGlmICh0b2tlbk1ldGE/LmRlbGltaXRlcnMpIHBvc3RQcm9jZXNzKHN0YXRlLCB0b2tlbk1ldGEuZGVsaW1pdGVycyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvbWVybWFpZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvbWVybWFpZC9mbG93Y2hhcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvbWVybWFpZC9mbG93Y2hhcnQudHNcIjtpbXBvcnQgdHlwZSBNYXJrZG93bkl0IGZyb20gXCJtYXJrZG93bi1pdFwiO1xuaW1wb3J0IHR5cGUgeyBQbHVnaW5TaW1wbGUgfSBmcm9tIFwibWFya2Rvd24taXRcIjtcbmltcG9ydCB0eXBlIHsgTWVybWFpZENvbmZpZyB9IGZyb20gXCJtZXJtYWlkXCI7XG5pbXBvcnQgeyByZWFkRmlsZVN5bmMgfSBmcm9tIFwibm9kZTpmc1wiO1xuaW1wb3J0IHBhdGggZnJvbSBcIm5vZGU6cGF0aFwiO1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gXCJub2RlOnVybFwiO1xuXG5jb25zdCBkaXJuYW1lID0gcGF0aC5kaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5jb25zdCBzdHlsZXMgPSByZWFkRmlsZVN5bmMocGF0aC5yZXNvbHZlKGRpcm5hbWUsIFwiLi4vbWVybWFpZC5jc3NcIiksIFwidXRmLThcIik7XG5cbmNvbnN0IHRoZW1lOiBNZXJtYWlkQ29uZmlnID0ge1xuICB0aGVtZTogXCJuZXV0cmFsXCIsXG4gIHRoZW1lVmFyaWFibGVzOiB7XG4gICAgZm9udEZhbWlseTogXCJBemVyZXQgTW9ub1wiLFxuICAgIGZvbnRTaXplOiBcIjEycHhcIixcbiAgfSxcbiAgZmxvd2NoYXJ0OiB7XG4gICAgY3VydmU6IFwibGluZWFyXCIsXG4gICAgaHRtbExhYmVsczogdHJ1ZSxcbiAgfSxcbiAgdGhlbWVDU1M6IHN0eWxlcy5yZXBsYWNlKC9cXHMrL2csIFwiIFwiKSxcbn07XG5cbmV4cG9ydCBjb25zdCBkZXBzOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+IHtcbiAgY29uc3QgZmVuY2UgPSBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZTtcblxuICBtZC5yZW5kZXJlci5ydWxlcy5mZW5jZSA9ICguLi5hcmdzKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCBbdG9rZW5zLCBpbmRleF0gPSBhcmdzO1xuICAgIGNvbnN0IHRva2VuID0gdG9rZW5zW2luZGV4XSE7XG4gICAgY29uc3QgcmVhbEluZm8gPSB0b2tlbi5pbmZvLnNwbGl0KFwiOlwiLCAyKVswXTtcblxuICAgIGlmIChyZWFsSW5mbyA9PT0gXCJkZXBzXCIpIHtcbiAgICAgIHRva2VuLmluZm8gPSBcIm1lcm1haWRcIiArIHRva2VuLmluZm8uc2xpY2UocmVhbEluZm8ubGVuZ3RoKTtcblxuICAgICAgdG9rZW4uY29udGVudCA9IGAlJXtpbml0OiAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICB0aGVtZVxuICAgICAgKX19JSVcXG5mbG93Y2hhcnQgQlRcXG4ke2luZGVudCh0b2tlbi5jb250ZW50KX1gO1xuICAgIH1cblxuICAgIHJldHVybiBmZW5jZSEoLi4uYXJncyk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgbGlmZWN5Y2xlOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+IHtcbiAgLy8gSGFuZGxlIGBgYGxpZmVjeWNsZVxuICBjb25zdCBmZW5jZSA9IG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlO1xuXG4gIG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlID0gKC4uLmFyZ3MpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IFt0b2tlbnMsIGluZGV4XSA9IGFyZ3M7XG4gICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaW5kZXhdITtcbiAgICBjb25zdCBbcmVhbEluZm8sIG9wdGlvbnNdID0gdG9rZW4uaW5mby5zcGxpdChcIiBcIiwgMik7XG5cbiAgICBpZiAocmVhbEluZm8gPT09IFwibGlmZWN5Y2xlXCIpIHtcbiAgICAgIGNvbnN0IGF0dHJzID0gT2JqZWN0LmZyb21FbnRyaWVzKHRva2VuLmF0dHJzID8/IFtdKTtcbiAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE9iamVjdC5rZXlzKGF0dHJzKVswXSA/PyBcIlRCXCI7XG4gICAgICB0b2tlbi5pbmZvID0gXCJtZXJtYWlkXCI7XG5cbiAgICAgIHRva2VuLmNvbnRlbnQgPSBgJSV7aW5pdDogJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgdGhlbWVcbiAgICAgICl9fSUlXFxuZmxvd2NoYXJ0ICR7ZGlyZWN0aW9ufVxcbiR7aW5kZW50KHRva2VuLmNvbnRlbnQpfWA7XG5cbiAgICAgIGNvbnNvbGUubG9nKHRva2VuLmNvbnRlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBmZW5jZSEoLi4uYXJncyk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgZmxvd2NoYXJ0ID0gKG1kOiBNYXJrZG93bkl0KSA9PiB7XG4gIG1kLnVzZShkZXBzKTtcbiAgbWQudXNlKGxpZmVjeWNsZSk7XG59O1xuXG5mdW5jdGlvbiBpbmRlbnQoc3RyOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gc3RyXG4gICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgLm1hcCgobGluZSkgPT4gXCIgIFwiICsgbGluZSlcbiAgICAuam9pbihcIlxcblwiKTtcbn1cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wbHVnaW5zL3V0aWxzLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wbHVnaW5zL3V0aWxzLnRzXCI7aW1wb3J0IHsgc3RyRnJvbVU4LCBzdHJUb1U4LCB1bnpsaWJTeW5jLCB6bGliU3luYyB9IGZyb20gXCJmZmxhdGVcIjtcblxuZXhwb3J0IGNvbnN0IHV0b2EgPSAoZGF0YTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgYnVmZmVyID0gc3RyVG9VOChkYXRhKTtcbiAgY29uc3QgemlwcGVkID0gemxpYlN5bmMoYnVmZmVyLCB7IGxldmVsOiA5IH0pO1xuICBjb25zdCBiaW5hcnkgPSBzdHJGcm9tVTgoemlwcGVkLCB0cnVlKTtcblxuICByZXR1cm4gYnRvYShiaW5hcnkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGF0b3UgPSAoYmFzZTY0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBiaW5hcnkgPSBhdG9iKGJhc2U2NCk7XG5cbiAgLy8gemxpYiBoZWFkZXIgKHg3OCksIGxldmVsIDkgKHhEQSlcbiAgaWYgKGJpbmFyeS5zdGFydHNXaXRoKFwiXFx4NzhcXHhEQVwiKSlcbiAgICByZXR1cm4gc3RyRnJvbVU4KHVuemxpYlN5bmMoc3RyVG9VOChiaW5hcnksIHRydWUpKSk7XG5cbiAgLy8gb2xkIHVuaWNvZGUgaGFja3MgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgLy8gaHR0cHM6Ly9iYXNlNjQuZ3VydS9kZXZlbG9wZXJzL2phdmFzY3JpcHQvZXhhbXBsZXMvdW5pY29kZS1zdHJpbmdzXG4gIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoZXNjYXBlKGJpbmFyeSkpO1xufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvbWVybWFpZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL3BsdWdpbnMvbWVybWFpZC9tZXJtYWlkLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9wbHVnaW5zL21lcm1haWQvbWVybWFpZC50c1wiO2ltcG9ydCB0eXBlIHsgUGx1Z2luU2ltcGxlIH0gZnJvbSBcIm1hcmtkb3duLWl0XCI7XG5pbXBvcnQgdHlwZSB7IGRlZmF1bHQgYXMgUmVuZGVyZXIgfSBmcm9tIFwibWFya2Rvd24taXQvbGliL3JlbmRlcmVyLmpzXCI7XG5pbXBvcnQgeyB1dG9hIH0gZnJvbSBcIi4uL3V0aWxzLmpzXCI7XG5cbmNvbnN0IG1lcm1haWRSZW5kZXI6IFJlbmRlcmVyLlJlbmRlclJ1bGUgPSAodG9rZW5zLCBpbmRleCkgPT4ge1xuICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpbmRleF07XG4gIGNvbnN0IGtleSA9IGBtZXJtYWlkLSR7aW5kZXh9YDtcbiAgY29uc3QgeyBjb250ZW50IH0gPSB0b2tlbjtcblxuICByZXR1cm4gYDxNZXJtYWlkIGlkPVwiJHtrZXl9XCIgY29kZT1cIiR7dXRvYShjb250ZW50KX1cIj48L01lcm1haWQ+YDtcbn07XG5cbi8vIGEgaGFjayBmb3Igc2VxdWVuY2VEaWFncmFtXG5jb25zdCBtZXJtYWlkSGFja1JlbmRlciA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBjb250ZW50OiBzdHJpbmcsXG4gIGluZGV4OiBudW1iZXJcbik6IHN0cmluZyA9PlxuICBgPE1lcm1haWQgaWQ9XCJtZXJtYWlkLSR7aW5kZXh9XCIgY29kZT1cIiR7dXRvYShcbiAgICBgJHtuYW1lfVxcbiR7Y29udGVudFxuICAgICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgICAubWFwKChsaW5lKSA9PiAobGluZSA/IGAgICR7bGluZX1gIDogXCJcIikpXG4gICAgICAuam9pbihcIlxcblwiKX1gXG4gICl9XCI+PC9NZXJtYWlkPmA7XG5cbmV4cG9ydCBjb25zdCBtZXJtYWlkOiBQbHVnaW5TaW1wbGUgPSAobWQpID0+IHtcbiAgLy8gSGFuZGxlIGBgYG1lcm1haWQgYmxvY2tzXG4gIGNvbnN0IGZlbmNlID0gbWQucmVuZGVyZXIucnVsZXMuZmVuY2U7XG5cbiAgbWQucmVuZGVyZXIucnVsZXMuZmVuY2UgPSAoLi4uYXJncyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgW3Rva2VucywgaW5kZXhdID0gYXJncztcbiAgICBjb25zdCB7IGNvbnRlbnQsIGluZm8gfSA9IHRva2Vuc1tpbmRleF07XG5cbiAgICBpZiAoaW5mby50cmltKCkgPT09IFwibWVybWFpZFwiKSByZXR1cm4gbWVybWFpZFJlbmRlciguLi5hcmdzKTtcbiAgICBpZiAoaW5mby50cmltKCkgPT09IFwic2VxdWVuY2VcIilcbiAgICAgIHJldHVybiBtZXJtYWlkSGFja1JlbmRlcihcInNlcXVlbmNlRGlhZ3JhbVwiLCBjb250ZW50LCBpbmRleCk7XG4gICAgaWYgKGluZm8udHJpbSgpID09PSBcImNsYXNzXCIpXG4gICAgICByZXR1cm4gbWVybWFpZEhhY2tSZW5kZXIoXCJjbGFzc0RpYWdyYW1cIiwgY29udGVudCwgaW5kZXgpO1xuICAgIGlmIChpbmZvLnRyaW0oKSA9PT0gXCJzdGF0ZVwiKVxuICAgICAgcmV0dXJuIG1lcm1haWRIYWNrUmVuZGVyKFwic3RhdGVEaWFncmFtLXYyXCIsIGNvbnRlbnQsIGluZGV4KTtcbiAgICBpZiAoaW5mby50cmltKCkgPT09IFwiZXJcIilcbiAgICAgIHJldHVybiBtZXJtYWlkSGFja1JlbmRlcihcImVyRGlhZ3JhbVwiLCBjb250ZW50LCBpbmRleCk7XG4gICAgaWYgKGluZm8udHJpbSgpID09PSBcImpvdXJuZXlcIilcbiAgICAgIHJldHVybiBtZXJtYWlkSGFja1JlbmRlcihcImpvdXJuZXlcIiwgY29udGVudCwgaW5kZXgpO1xuICAgIGlmIChpbmZvLnRyaW0oKSA9PT0gXCJnYW50dFwiKVxuICAgICAgcmV0dXJuIG1lcm1haWRIYWNrUmVuZGVyKFwiZ2FudHRcIiwgY29udGVudCwgaW5kZXgpO1xuICAgIGlmIChpbmZvLnRyaW0oKSA9PT0gXCJwaWVcIikgcmV0dXJuIG1lcm1haWRIYWNrUmVuZGVyKFwicGllXCIsIGNvbnRlbnQsIGluZGV4KTtcbiAgICBpZiAoaW5mby50cmltKCkgPT09IFwiZ2l0LWdyYXBoXCIpXG4gICAgICByZXR1cm4gbWVybWFpZEhhY2tSZW5kZXIoXCJnaXRHcmFwaFwiLCBjb250ZW50LCBpbmRleCk7XG4gICAgaWYgKGluZm8udHJpbSgpID09PSBcImM0Y1wiKVxuICAgICAgcmV0dXJuIG1lcm1haWRIYWNrUmVuZGVyKFwiQzRDb250ZXh0XCIsIGNvbnRlbnQsIGluZGV4KTtcbiAgICBpZiAoaW5mby50cmltKCkgPT09IFwibWluZG1hcFwiKVxuICAgICAgcmV0dXJuIG1lcm1haWRIYWNrUmVuZGVyKFwibWluZG1hcFwiLCBjb250ZW50LCBpbmRleCk7XG5cbiAgICByZXR1cm4gZmVuY2UhKC4uLmFyZ3MpO1xuICB9O1xuXG4gIG1kLnJlbmRlcmVyLnJ1bGVzW1wibWVybWFpZFwiXSA9IG1lcm1haWRSZW5kZXI7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvc3ludGF4LWhpZ2hsaWdodC9oaWdobGlnaHQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZy9zeW50YXgtaGlnaGxpZ2h0L2hpZ2hsaWdodC50c1wiO2ltcG9ydCB7IGN1c3RvbUFscGhhYmV0IH0gZnJvbSBcIm5hbm9pZFwiO1xuaW1wb3J0IHsgZGlybmFtZSwgcmVzb2x2ZSB9IGZyb20gXCJub2RlOnBhdGhcIjtcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tIFwibm9kZTp1cmxcIjtcbmltcG9ydCB0eXBlIHsgSHRtbFJlbmRlcmVyT3B0aW9ucywgSVRoZW1lUmVnaXN0cmF0aW9uIH0gZnJvbSBcInNoaWtpXCI7XG5pbXBvcnQge1xuICBhZGRDbGFzcyxcbiAgY3JlYXRlRGlmZlByb2Nlc3NvcixcbiAgY3JlYXRlRm9jdXNQcm9jZXNzb3IsXG4gIGNyZWF0ZUhpZ2hsaWdodFByb2Nlc3NvcixcbiAgY3JlYXRlUmFuZ2VQcm9jZXNzb3IsXG4gIGRlZmluZVByb2Nlc3NvcixcbiAgZ2V0SGlnaGxpZ2h0ZXIsXG4gIHR5cGUgUHJvY2Vzc29yLFxufSBmcm9tIFwic2hpa2ktcHJvY2Vzc29yXCI7XG5pbXBvcnQgZ2xpbW1lckxhbmcgZnJvbSBcIi4vZ2xpbW1lci50bUxhbmd1YWdlLmpzb25cIiBhc3NlcnQgeyB0eXBlOiBcImpzb25cIiB9O1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XG5cbnR5cGUgVGhlbWVPcHRpb25zID1cbiAgfCBJVGhlbWVSZWdpc3RyYXRpb25cbiAgfCB7IGxpZ2h0OiBJVGhlbWVSZWdpc3RyYXRpb247IGRhcms6IElUaGVtZVJlZ2lzdHJhdGlvbiB9O1xuXG5jb25zdCBuYW5vaWQgPSBjdXN0b21BbHBoYWJldChcImFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6XCIsIDEwKTtcblxuLyoqXG4gKiAyIHN0ZXBzOlxuICpcbiAqIDEuIGNvbnZlcnQgYXR0cnMgaW50byBsaW5lIG51bWJlcnM6XG4gKiAgICB7NCw3LTEzLDE2LDIzLTI3LDQwfSAtPiBbNCw3LDgsOSwxMCwxMSwxMiwxMywxNiwyMywyNCwyNSwyNiwyNyw0MF1cbiAqIDIuIGNvbnZlcnQgbGluZSBudW1iZXJzIGludG8gbGluZSBvcHRpb25zOlxuICogICAgW3sgbGluZTogbnVtYmVyLCBjbGFzc2VzOiBzdHJpbmdbXSB9XVxuICovXG5jb25zdCBhdHRyc1RvTGluZXMgPSAoYXR0cnM6IHN0cmluZyk6IEh0bWxSZW5kZXJlck9wdGlvbnNbXCJsaW5lT3B0aW9uc1wiXSA9PiB7XG4gIGF0dHJzID0gYXR0cnMucmVwbGFjZSgvXig/OlxcWy4qP1xcXSk/Lio/KFtcXGQsLV0rKS4qLywgXCIkMVwiKS50cmltKCk7XG4gIGNvbnN0IHJlc3VsdDogbnVtYmVyW10gPSBbXTtcbiAgaWYgKCFhdHRycykge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICBhdHRyc1xuICAgIC5zcGxpdChcIixcIilcbiAgICAubWFwKCh2KSA9PiB2LnNwbGl0KFwiLVwiKS5tYXAoKHYpID0+IHBhcnNlSW50KHYsIDEwKSkpXG4gICAgLmZvckVhY2goKFtzdGFydCwgZW5kXSkgPT4ge1xuICAgICAgaWYgKHN0YXJ0ICYmIGVuZCkge1xuICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAuLi5BcnJheS5mcm9tKHsgbGVuZ3RoOiBlbmQgLSBzdGFydCArIDEgfSwgKF8sIGkpID0+IHN0YXJ0ICsgaSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHN0YXJ0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgcmV0dXJuIHJlc3VsdC5tYXAoKHYpID0+ICh7XG4gICAgbGluZTogdixcbiAgICBjbGFzc2VzOiBbXCJoaWdobGlnaHRlZFwiXSxcbiAgfSkpO1xufTtcblxuY29uc3QgZXJyb3JMZXZlbFByb2Nlc3NvciA9IGRlZmluZVByb2Nlc3Nvcih7XG4gIG5hbWU6IFwiZXJyb3ItbGV2ZWxcIixcbiAgaGFuZGxlcjogY3JlYXRlUmFuZ2VQcm9jZXNzb3Ioe1xuICAgIGVycm9yOiBbXCJoaWdobGlnaHRlZFwiLCBcImVycm9yXCJdLFxuICAgIHdhcm5pbmc6IFtcImhpZ2hsaWdodGVkXCIsIFwid2FybmluZ1wiXSxcbiAgfSksXG59KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhpZ2hsaWdodChcbiAgdGhlbWU6IFRoZW1lT3B0aW9ucyA9IFwibWF0ZXJpYWwtcGFsZW5pZ2h0XCIsXG4gIGRlZmF1bHRMYW5nOiBzdHJpbmcgPSBcIlwiXG4pOiBQcm9taXNlPChzdHI6IHN0cmluZywgbGFuZzogc3RyaW5nLCBhdHRyczogc3RyaW5nKSA9PiBzdHJpbmc+IHtcbiAgY29uc3QgaGFzU2luZ2xlVGhlbWUgPSB0eXBlb2YgdGhlbWUgPT09IFwic3RyaW5nXCIgfHwgXCJuYW1lXCIgaW4gdGhlbWU7XG4gIGNvbnN0IGdldFRoZW1lTmFtZSA9ICh0aGVtZVZhbHVlOiBJVGhlbWVSZWdpc3RyYXRpb24pID0+XG4gICAgdHlwZW9mIHRoZW1lVmFsdWUgPT09IFwic3RyaW5nXCIgPyB0aGVtZVZhbHVlIDogdGhlbWVWYWx1ZS5uYW1lO1xuXG4gIGNvbnN0IHByb2Nlc3NvcnM6IFByb2Nlc3NvcltdID0gW1xuICAgIGNyZWF0ZUZvY3VzUHJvY2Vzc29yKCksXG4gICAgY3JlYXRlSGlnaGxpZ2h0UHJvY2Vzc29yKHsgaGFzSGlnaGxpZ2h0Q2xhc3M6IFwiaGlnaGxpZ2h0ZWRcIiB9KSxcbiAgICBjcmVhdGVEaWZmUHJvY2Vzc29yKCksXG4gICAgZXJyb3JMZXZlbFByb2Nlc3NvcixcbiAgXTtcblxuICBjb25zdCBoaWdobGlnaHRlciA9IGF3YWl0IGdldEhpZ2hsaWdodGVyKHtcbiAgICB0aGVtZXM6IGhhc1NpbmdsZVRoZW1lID8gW3RoZW1lXSA6IFt0aGVtZS5kYXJrLCB0aGVtZS5saWdodF0sXG4gICAgcHJvY2Vzc29ycyxcbiAgfSk7XG5cbiAgaGlnaGxpZ2h0ZXIubG9hZExhbmd1YWdlKHtcbiAgICAuLi5nbGltbWVyTGFuZyxcbiAgICBwYXRoOiByZXNvbHZlKF9fZGlybmFtZSwgXCJnbGltbWVyLnRtTGFuZ3VhZ2UuanNvblwiKSxcbiAgfSk7XG5cbiAgY29uc3Qgc3R5bGVSRSA9IC88cHJlW14+XSooc3R5bGU9XCIuKj9cIikvO1xuICBjb25zdCBwcmVSRSA9IC9ePHByZSguKj8pPi87XG4gIGNvbnN0IHZ1ZVJFID0gLy12dWUkLztcbiAgY29uc3QgbGluZU5vUkUgPSAvOihuby0pP2xpbmUtbnVtYmVycyQvO1xuICBjb25zdCBtdXN0YWNoZVJFID0gL1xce1xcey4qP1xcfVxcfS9nO1xuXG4gIHJldHVybiAoc3RyOiBzdHJpbmcsIGxhbmc6IHN0cmluZywgYXR0cnM6IHN0cmluZykgPT4ge1xuICAgIGNvbnN0IHZQcmUgPSB2dWVSRS50ZXN0KGxhbmcpID8gXCJcIiA6IFwidi1wcmVcIjtcbiAgICBsYW5nID1cbiAgICAgIGxhbmcucmVwbGFjZShsaW5lTm9SRSwgXCJcIikucmVwbGFjZSh2dWVSRSwgXCJcIikudG9Mb3dlckNhc2UoKSB8fFxuICAgICAgZGVmYXVsdExhbmc7XG5cbiAgICBjb25zdCBsaW5lT3B0aW9ucyA9IGF0dHJzVG9MaW5lcyhhdHRycyk7XG4gICAgY29uc3QgY2xlYW51cCA9IChzdHI6IHN0cmluZykgPT5cbiAgICAgIHN0clxuICAgICAgICAucmVwbGFjZShwcmVSRSwgKF8sIGF0dHJpYnV0ZXMpID0+IGA8cHJlICR7dlByZX0ke2F0dHJpYnV0ZXN9PmApXG4gICAgICAgIC5yZXBsYWNlKHN0eWxlUkUsIChfLCBzdHlsZSkgPT4gXy5yZXBsYWNlKHN0eWxlLCBcIlwiKSk7XG5cbiAgICBjb25zdCBtdXN0YWNoZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG4gICAgY29uc3QgcmVtb3ZlTXVzdGFjaGUgPSAoczogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodlByZSkgcmV0dXJuIHM7XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKG11c3RhY2hlUkUsIChtYXRjaCkgPT4ge1xuICAgICAgICBsZXQgbWFya2VyID0gbXVzdGFjaGVzLmdldChtYXRjaCk7XG4gICAgICAgIGlmICghbWFya2VyKSB7XG4gICAgICAgICAgbWFya2VyID0gbmFub2lkKCk7XG4gICAgICAgICAgbXVzdGFjaGVzLnNldChtYXRjaCwgbWFya2VyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFya2VyO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlc3RvcmVNdXN0YWNoZSA9IChzOiBzdHJpbmcpID0+IHtcbiAgICAgIG11c3RhY2hlcy5mb3JFYWNoKChtYXJrZXIsIG1hdGNoKSA9PiB7XG4gICAgICAgIHMgPSBzLnJlcGxhY2VBbGwobWFya2VyLCBtYXRjaCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBzO1xuICAgIH07XG5cbiAgICBpZiAoaGFzU2luZ2xlVGhlbWUpIHtcbiAgICAgIHJldHVybiBjbGVhbnVwKFxuICAgICAgICByZXN0b3JlTXVzdGFjaGUoXG4gICAgICAgICAgaGlnaGxpZ2h0ZXIuY29kZVRvSHRtbChyZW1vdmVNdXN0YWNoZShzdHIpLCB7XG4gICAgICAgICAgICBsYW5nLFxuICAgICAgICAgICAgbGluZU9wdGlvbnMsXG4gICAgICAgICAgICB0aGVtZTogZ2V0VGhlbWVOYW1lKHRoZW1lKSxcbiAgICAgICAgICB9KVxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRhcmsgPSBhZGRDbGFzcyhcbiAgICAgIGNsZWFudXAoXG4gICAgICAgIGhpZ2hsaWdodGVyLmNvZGVUb0h0bWwoc3RyLCB7XG4gICAgICAgICAgbGFuZyxcbiAgICAgICAgICBsaW5lT3B0aW9ucyxcbiAgICAgICAgICB0aGVtZTogZ2V0VGhlbWVOYW1lKHRoZW1lLmRhcmspLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICAgIFwidnAtY29kZS1kYXJrXCIsXG4gICAgICBcInByZVwiXG4gICAgKTtcblxuICAgIGNvbnN0IGxpZ2h0ID0gYWRkQ2xhc3MoXG4gICAgICBjbGVhbnVwKFxuICAgICAgICBoaWdobGlnaHRlci5jb2RlVG9IdG1sKHN0ciwge1xuICAgICAgICAgIGxhbmcsXG4gICAgICAgICAgbGluZU9wdGlvbnMsXG4gICAgICAgICAgdGhlbWU6IGdldFRoZW1lTmFtZSh0aGVtZS5saWdodCksXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgXCJ2cC1jb2RlLWxpZ2h0XCIsXG4gICAgICBcInByZVwiXG4gICAgKTtcblxuICAgIHJldHVybiBkYXJrICsgbGlnaHQ7XG4gIH07XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvc3ludGF4LWhpZ2hsaWdodFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZy9zeW50YXgtaGlnaGxpZ2h0L3NldHVwLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvc3ludGF4LWhpZ2hsaWdodC9zZXR1cC50c1wiO2ltcG9ydCB0eXBlIE1hcmtkb3duSXQgZnJvbSBcIm1hcmtkb3duLWl0XCI7XG5pbXBvcnQgeyBzZXR1cEZvckZpbGUgfSBmcm9tIFwicmVtYXJrLXNoaWtpLXR3b3NsYXNoXCI7XG5pbXBvcnQgdHlwZSB7IFVzZXJDb25maWdTZXR0aW5ncyB9IGZyb20gXCJzaGlraS10d29zbGFzaFwiO1xuaW1wb3J0IHsgdHJhbnNmb3JtQXR0cmlidXRlc1RvSFRNTCB9IGZyb20gXCIuL3NoaWtpLXR3b3NsYXNoLmpzXCI7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYXJrZG93bkl0U2hpa2lUd29zbGFzaFNldHVwKFxuICBzZXR0aW5nczogVXNlckNvbmZpZ1NldHRpbmdzXG4pOiBQcm9taXNlPE1hcmtkb3duSXQuUGx1Z2luV2l0aE9wdGlvbnM8VXNlckNvbmZpZ1NldHRpbmdzPj4ge1xuICBjb25zdCB7IGhpZ2hsaWdodGVycyB9ID0gYXdhaXQgc2V0dXBGb3JGaWxlKHNldHRpbmdzKTtcblxuICByZXR1cm4gKG1hcmtkb3duaXQsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBwcmV2ID0gbWFya2Rvd25pdC5vcHRpb25zLmhpZ2hsaWdodDtcblxuICAgIGlmIChwcmV2ID09PSB1bmRlZmluZWQgfHwgcHJldiA9PT0gbnVsbCkge1xuICAgICAgdGhyb3cgRXJyb3IoXG4gICAgICAgIFwibWFya2Rvd24taXQtc2hpa2ktdHdvc2xhc2ggcmVxdWlyZXMgbWFya2Rvd24taXQgdG8gaGF2ZSBhIGhpZ2hsaWdodGVyIHNldFwiXG4gICAgICApO1xuICAgIH1cblxuICAgIG1hcmtkb3duaXQub3B0aW9ucy5oaWdobGlnaHQgPSAoc25pcHBldCwgbGFuZywgYXR0cnMpID0+IHtcbiAgICAgIGlmICghbGFuZy5tYXRjaCgvXFxidHdvc2xhc2hcXGIvKSkge1xuICAgICAgICByZXR1cm4gcHJldihzbmlwcGV0LCBsYW5nLCBhdHRycyk7XG4gICAgICB9XG4gICAgICBzbmlwcGV0ID0gc25pcHBldC5yZXBsYWNlKC9cXHI/XFxuJC8sIFwiXCIpOyAvLyBzdHJpcCB0cmFpbGluZyBuZXdsaW5lIGZlZCBkdXJpbmcgY29kZSBibG9jayBwYXJzaW5nXG4gICAgICByZXR1cm4gdHJhbnNmb3JtQXR0cmlidXRlc1RvSFRNTChcbiAgICAgICAgc25pcHBldCxcbiAgICAgICAgW2xhbmcsIGF0dHJzXS5qb2luKFwiIFwiKSxcbiAgICAgICAgaGlnaGxpZ2h0ZXJzLFxuICAgICAgICBvcHRpb25zIVxuICAgICAgKTtcbiAgICB9O1xuICB9O1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvc3ludGF4LWhpZ2hsaWdodC9zaGlraS10d29zbGFzaC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHQvc2hpa2ktdHdvc2xhc2gudHNcIjtpbXBvcnQgdHlwZSB7IFR3b1NsYXNoUmV0dXJuIH0gZnJvbSBcIkB0eXBlc2NyaXB0L3R3b3NsYXNoXCI7XG5pbXBvcnQgeyBsZXgsIHBhcnNlIH0gZnJvbSBcImZlbmNlcGFyc2VyXCI7XG5pbXBvcnQgdHlwZSB7IEhpZ2hsaWdodGVyIH0gZnJvbSBcInNoaWtpXCI7XG5pbXBvcnQgdHlwZSB7IFVzZXJDb25maWdTZXR0aW5ncyB9IGZyb20gXCJzaGlraS10d29zbGFzaFwiO1xuaW1wb3J0IHsgcmVuZGVyQ29kZVRvSFRNTCB9IGZyb20gXCJzaGlraS10d29zbGFzaFwiO1xuaW1wb3J0IHsgYWRkSW5jbHVkZXMgfSBmcm9tIFwiLi9pbmNsdWRlcy5qc1wiO1xuaW1wb3J0IHsgY2FjaGVkVHdvc2xhc2hDYWxsIH0gZnJvbSBcIi4vcnVuLXR3b3NsYXNoLmpzXCI7XG5cbmV4cG9ydCBjb25zdCB0cmFuc2Zvcm1BdHRyaWJ1dGVzVG9IVE1MID0gKFxuICBjb2RlOiBzdHJpbmcsXG4gIGZlbmNlU3RyaW5nOiBzdHJpbmcsXG4gIGhpZ2hsaWdodGVyczogSGlnaGxpZ2h0ZXJbXSxcbiAgc2V0dGluZ3M6IFVzZXJDb25maWdTZXR0aW5nc1xuKSA9PiB7XG4gIGNvbnN0IGZlbmNlID0gcGFyc2VGZW5jZShmZW5jZVN0cmluZyk7XG5cbiAgY29uc3QgdHdvc2xhc2ggPSBydW5Ud29TbGFzaE9uTm9kZShjb2RlLCBmZW5jZSwgc2V0dGluZ3MpO1xuICBjb25zdCBuZXdDb2RlID0gKHR3b3NsYXNoICYmIHR3b3NsYXNoLmNvZGUpIHx8IGNvZGU7XG4gIHJldHVybiBnZXRIVE1MKG5ld0NvZGUsIGZlbmNlLCBoaWdobGlnaHRlcnMsIHR3b3NsYXNoLCBzZXR0aW5ncyk7XG59O1xuXG5jb25zdCBwYXJzZUZlbmNlID0gKGZlbmNlOiBzdHJpbmcpOiBGZW5jZSA9PiB7XG4gIGNvbnN0IFtsYW5nLCAuLi50b2tlbnNdID0gbGV4KGZlbmNlKTtcblxuICAvLyBpZiB0aGUgbGFuZ3VhZ2UgaXMgdHdvc2xhc2ggYW5kIGluY2x1ZGUga2V5IGlzIGZvdW5kXG4gIC8vIGluc2VydCBhbiBgPWAgYWZ0ZXIgaW5jbHVkZSB0byBtYWtlIGl0IGBpbmNsdWRlPVtuYW1lXWBcbiAgLy8gd2hpY2ggeWllbGRzIGJldHRlciBtZXRhXG4gIGlmIChsYW5nID09PSBcInR3b3NsYXNoXCIpIHtcbiAgICAvLyBTZWFyY2ggZm9yIGBpbmNsdWRlYCBpbiB0b2tlbnNcbiAgICBjb25zdCBpbmRleCA9IHRva2Vucy5pbmRleE9mKFwiaW5jbHVkZVwiKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0b2tlbnMuc3BsaWNlKGluZGV4ICsgMSwgMCwgXCI9XCIpO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG1ldGEgPSBwYXJzZSh0b2tlbnMpID8/IHt9O1xuXG4gIHJldHVybiB7XG4gICAgbGFuZzogKGxhbmcgfHwgXCJcIikudG9TdHJpbmcoKSxcbiAgICBtZXRhLFxuICB9O1xufTtcblxuLyoqXG4gKiBSdW5zIHR3b3NsYXNoIGFjcm9zcyBhbiBBU1Qgbm9kZSwgc3dpdGNoaW5nIG91dCB0aGUgdGV4dCBjb250ZW50LCBhbmQgbGFuZ1xuICogYW5kIGFkZGluZyBhIGB0d29zbGFzaGAgcHJvcGVydHkgdG8gdGhlIG5vZGUuXG4gKi9cbmV4cG9ydCBjb25zdCBydW5Ud29TbGFzaE9uTm9kZSA9IChcbiAgY29kZTogc3RyaW5nLFxuICB7IGxhbmcsIG1ldGEgfTogRmVuY2UsXG4gIHNldHRpbmdzOiBVc2VyQ29uZmlnU2V0dGluZ3MgPSB7fVxuKSA9PiB7XG4gIC8vIE9mZmVyIGEgd2F5IHRvIGRvIGhpZ2gtcGVyZiBpdGVyYXRpb25zLCB0aGlzIGlzIGxlc3MgdXNlZnVsXG4gIC8vIGdpdmVuIHRoYXQgd2UgY2FjaGUgdGhlIHJlc3VsdHMgb2YgdHdvc2xhc2ggaW4gdGhlIGZpbGUtc3lzdGVtXG4gIGNvbnN0IHNob3VsZERpc2FibGVUd29zbGFzaCA9XG4gICAgdHlwZW9mIHByb2Nlc3MgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICBwcm9jZXNzLmVudiAmJlxuICAgICEhcHJvY2Vzcy5lbnYuVFdPU0xBU0hfRElTQUJMRTtcbiAgaWYgKHNob3VsZERpc2FibGVUd29zbGFzaCkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAvLyBPbmx5IHJ1biB0d29zbGFzaCB3aGVuIHRoZSBtZXRhIGhhcyB0aGUgYXR0cmlidXRlIHR3b3NsYXNoXG4gIGlmIChtZXRhLnR3b3NsYXNoKSB7XG4gICAgcmV0dXJuIGNhY2hlZFR3b3NsYXNoQ2FsbChjb2RlLCBsYW5nLCBzZXR0aW5ncyk7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufTtcblxuY29uc3QgaW5jbHVkZXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuXG5mdW5jdGlvbiBnZXRIVE1MKFxuICBjb2RlOiBzdHJpbmcsXG4gIGZlbmNlOiBGZW5jZSxcbiAgaGlnaGxpZ2h0ZXJzOiBIaWdobGlnaHRlcltdLFxuICB0d29zbGFzaDogVHdvU2xhc2hSZXR1cm4gfCB1bmRlZmluZWQsXG4gIHR3b3NsYXNoU2V0dGluZ3M6IFVzZXJDb25maWdTZXR0aW5nc1xuKSB7XG4gIC8vIFNoaWtpIGRvZXNuJ3QgcmVzcGVjdCBqc29uNSBhcyBhbiBpbnB1dCwgc28gc3dpdGNoIGl0XG4gIC8vIHRvIGpzb24sIHdoaWNoIGNhbiBoYW5kbGUgY29tbWVudHMgaW4gdGhlIHN5bnRheCBoaWdobGlnaHRcbiAgY29uc3QgcmVwbGFjZXI6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAganNvbjU6IFwianNvblwiLFxuICB9O1xuXG4gIGlmIChyZXBsYWNlcltmZW5jZS5sYW5nXSkgZmVuY2UubGFuZyA9IHJlcGxhY2VyW2ZlbmNlLmxhbmddO1xuXG4gIGxldCByZXN1bHRzO1xuICAvLyBTdXBwb3J0ICd0d29zbGFzaCcgaW5jbHVkZXNcbiAgaWYgKGZlbmNlLmxhbmcgPT09IFwidHdvc2xhc2hcIikge1xuICAgIGlmICghZmVuY2UubWV0YS5pbmNsdWRlIHx8IHR5cGVvZiBmZW5jZS5tZXRhLmluY2x1ZGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgXCJBIHR3b3NsYXNoIGNvZGUgYmxvY2sgbmVlZHMgYSBwcmFnbWEgbGlrZSAndHdvc2xhc2ggaW5jbHVkZSBbbmFtZV0nXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYWRkSW5jbHVkZXMoaW5jbHVkZXMsIGZlbmNlLm1ldGEuaW5jbHVkZSBhcyBzdHJpbmcsIGNvZGUpO1xuICAgIHJlc3VsdHMgPSB0d29zbGFzaFNldHRpbmdzLndyYXBGcmFnbWVudHNcbiAgICAgID8gYDxkaXYgY2xhc3M9XCJzaGlraS10d29zbGFzaC1mcmFnbWVudFwiPjwvZGl2PmBcbiAgICAgIDogXCJcIjtcbiAgfSBlbHNlIHtcbiAgICAvLyBBbGwgZ29vZCwgZ2V0IGVhY2ggaGlnaGxpZ2h0ZXIgYW5kIHJlbmRlciB0aGUgc2hpa2kgb3V0cHV0IGZvciBpdFxuICAgIGNvbnN0IG91dHB1dCA9IGhpZ2hsaWdodGVycy5tYXAoKGhpZ2hsaWdodGVyKSA9PiB7XG4gICAgICAvLyBAdHMtaWdub3JlXG4gICAgICBjb25zdCB0aGVtZU5hbWU6IHN0cmluZyA9IGhpZ2hsaWdodGVyLmN1c3RvbU5hbWVcbiAgICAgICAgLnNwbGl0KFwiL1wiKVxuICAgICAgICAucG9wKClcbiAgICAgICAgLnJlcGxhY2UoXCIuanNvblwiLCBcIlwiKTtcbiAgICAgIHJldHVybiByZW5kZXJDb2RlVG9IVE1MKFxuICAgICAgICBjb2RlLFxuICAgICAgICBmZW5jZS5sYW5nLFxuICAgICAgICBmZW5jZS5tZXRhLFxuICAgICAgICB7IHRoZW1lTmFtZSwgLi4udHdvc2xhc2hTZXR0aW5ncyB9LFxuICAgICAgICBoaWdobGlnaHRlcixcbiAgICAgICAgdHdvc2xhc2hcbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmVzdWx0cyA9IG91dHB1dC5qb2luKFwiXFxuXCIpO1xuICAgIGlmIChoaWdobGlnaHRlcnMubGVuZ3RoID4gMSAmJiB0d29zbGFzaFNldHRpbmdzLndyYXBGcmFnbWVudHMpIHtcbiAgICAgIHJlc3VsdHMgPSBgPGRpdiBjbGFzcz1cInNoaWtpLXR3b3NsYXNoLWZyYWdtZW50XCI+JHtyZXN1bHRzfTwvZGl2PmA7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRzO1xufVxuXG50eXBlIEZlbmNlID0ge1xuICBsYW5nOiBzdHJpbmc7XG4gIG1ldGE6IE5vbk51bGxhYmxlPFJldHVyblR5cGU8dHlwZW9mIHBhcnNlPj47XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvc3ludGF4LWhpZ2hsaWdodC9pbmNsdWRlcy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHQvaW5jbHVkZXMudHNcIjtleHBvcnQgY29uc3QgYWRkSW5jbHVkZXMgPSAoXG4gIG1hcDogTWFwPHN0cmluZywgc3RyaW5nPixcbiAgbmFtZTogc3RyaW5nLFxuICBjb2RlOiBzdHJpbmdcbikgPT4ge1xuICBjb25zdCBsaW5lczogc3RyaW5nW10gPSBbXTtcblxuICBjb2RlLnNwbGl0KFwiXFxuXCIpLmZvckVhY2goKGwsIF9pKSA9PiB7XG4gICAgY29uc3QgdHJpbW1lZCA9IGwudHJpbSgpO1xuXG4gICAgaWYgKHRyaW1tZWQuc3RhcnRzV2l0aChcIi8vIC0gXCIpKSB7XG4gICAgICBjb25zdCBrZXkgPSB0cmltbWVkLnNwbGl0KFwiLy8gLSBcIilbMV0uc3BsaXQoXCIgXCIpWzBdO1xuICAgICAgbWFwLnNldChuYW1lICsgXCItXCIgKyBrZXksIGxpbmVzLmpvaW4oXCJcXG5cIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaW5lcy5wdXNoKGwpO1xuICAgIH1cbiAgfSk7XG4gIG1hcC5zZXQobmFtZSwgbGluZXMuam9pbihcIlxcblwiKSk7XG59O1xuXG5leHBvcnQgY29uc3QgcmVwbGFjZUluY2x1ZGVzSW5Db2RlID0gKFxuICBfbWFwOiBNYXA8c3RyaW5nLCBzdHJpbmc+LFxuICBjb2RlOiBzdHJpbmdcbikgPT4ge1xuICBjb25zdCBpbmNsdWRlcyA9IC9cXC9cXC8gQGluY2x1ZGU6ICguKikkL2dtO1xuXG4gIC8vIEJhc2ljYWxseSBydW4gYSByZWdleCBvdmVyIHRoZSBjb2RlIHJlcGxhY2luZyBhbnkgLy8gQGluY2x1ZGU6IHRoaW5nIHdpdGhcbiAgLy8gJ3RoaW5nJyBmcm9tIHRoZSBtYXBcblxuICAvLyBjb25zdCB0b1JlcGxhY2U6IFtpbmRleDpudW1iZXIsIGxlbmd0aDogbnVtYmVyLCBzdHI6IHN0cmluZ11bXSA9IFtdXG4gIGNvbnN0IHRvUmVwbGFjZTogW251bWJlciwgbnVtYmVyLCBzdHJpbmddW10gPSBbXTtcblxuICBsZXQgbWF0Y2g7XG4gIHdoaWxlICgobWF0Y2ggPSBpbmNsdWRlcy5leGVjKGNvZGUpKSAhPT0gbnVsbCkge1xuICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIGF2b2lkIGluZmluaXRlIGxvb3BzIHdpdGggemVyby13aWR0aCBtYXRjaGVzXG4gICAgaWYgKG1hdGNoLmluZGV4ID09PSBpbmNsdWRlcy5sYXN0SW5kZXgpIHtcbiAgICAgIGluY2x1ZGVzLmxhc3RJbmRleCsrO1xuICAgIH1cbiAgICBjb25zdCBrZXkgPSBtYXRjaFsxXTtcbiAgICBjb25zdCByZXBsYWNlV2l0aCA9IF9tYXAuZ2V0KGtleSk7XG5cbiAgICBpZiAoIXJlcGxhY2VXaXRoKSB7XG4gICAgICBjb25zdCBtc2cgPSBgQ291bGQgbm90IGZpbmQgYW4gaW5jbHVkZSB3aXRoIHRoZSBrZXk6ICcke2tleX0nLlxcblRoZXJlIGlzOiAke0FycmF5LmZyb20oXG4gICAgICAgIF9tYXAua2V5cygpXG4gICAgICApfS5gO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKG1zZyk7XG4gICAgfVxuXG4gICAgdG9SZXBsYWNlLnB1c2goW21hdGNoLmluZGV4LCBtYXRjaFswXS5sZW5ndGgsIHJlcGxhY2VXaXRoXSk7XG4gIH1cblxuICBsZXQgbmV3Q29kZSA9IGNvZGUudG9TdHJpbmcoKTtcbiAgLy8gR28gYmFja3dhcmRzIHRocm91Z2ggdGhlIGZvdW5kIGNoYW5nZXMgc28gdGhhdCB3ZSBjYW4gcmV0YWluIGluZGV4IHBvc2l0aW9uXG4gIHRvUmVwbGFjZS5yZXZlcnNlKCkuZm9yRWFjaCgocikgPT4ge1xuICAgIG5ld0NvZGUgPVxuICAgICAgbmV3Q29kZS5zdWJzdHJpbmcoMCwgclswXSkgKyByWzJdICsgbmV3Q29kZS5zdWJzdHJpbmcoclswXSArIHJbMV0pO1xuICB9KTtcbiAgcmV0dXJuIG5ld0NvZGU7XG59O1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS93eWNhdHMvQ29kZS9TdGFyYmVhbS9Eb2NzL3N0YXJiZWFtLWRvY3Mvc3JjLy52aXRlcHJlc3MvY29uZmlnL3N5bnRheC1oaWdobGlnaHRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvc3ludGF4LWhpZ2hsaWdodC9ydW4tdHdvc2xhc2gudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZy9zeW50YXgtaGlnaGxpZ2h0L3J1bi10d29zbGFzaC50c1wiO2ltcG9ydCB0eXBlIHsgVHdvU2xhc2hSZXR1cm4gfSBmcm9tIFwiQHR5cGVzY3JpcHQvdHdvc2xhc2hcIjtcbmltcG9ydCB7IHJ1blR3b1NsYXNoLCBVc2VyQ29uZmlnU2V0dGluZ3MgfSBmcm9tIFwic2hpa2ktdHdvc2xhc2hcIjtcblxuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gXCJjcnlwdG9cIjtcbmltcG9ydCB7IGV4aXN0c1N5bmMsIG1rZGlyU3luYywgcmVhZEZpbGVTeW5jLCB3cml0ZUZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBjcmVhdGVSZXF1aXJlIH0gZnJvbSBcIm5vZGU6bW9kdWxlXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcblxuY29uc3QgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUoaW1wb3J0Lm1ldGEudXJsKTtcblxuY29uc3Qgc2hpa2lWZXJzaW9uID0gcmVxdWlyZShcIkB0eXBlc2NyaXB0L3R3b3NsYXNoL3BhY2thZ2UuanNvblwiKS52ZXJzaW9uO1xuXG4vKipcbiAqIEtlZXBzIGEgY2FjaGUgb2YgdGhlIEpTT04gcmVzcG9uc2VzIHRvIGEgdHdvc2xhc2ggY2FsbCBpbiBub2RlX21vZHVsZXMvLmNhY2hlL3R3b3NsYXNoXG4gKiB3aGljaCBzaG91bGQga2VlcCBDSSB0aW1lcyBkb3duIChlLmcuIHRoZSBlcHViIHZzIHRoZSBoYW5kYm9vayBldGMpIC0gYnV0IGFsc28gZHVyaW5nXG4gKiBkZXYgdGltZSwgd2hlcmUgaXQgY2FuIGJlIHN1cGVyIHVzZWZ1bC5cbiAqL1xuZXhwb3J0IGNvbnN0IGNhY2hlZFR3b3NsYXNoQ2FsbCA9IChcbiAgY29kZTogc3RyaW5nLFxuICBsYW5nOiBzdHJpbmcsXG4gIHNldHRpbmdzOiBVc2VyQ29uZmlnU2V0dGluZ3Ncbik6IFR3b1NsYXNoUmV0dXJuIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgaXNXZWJXb3JrZXIgPVxuICAgIHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiICYmXG4gICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgIHR5cGVvZiBzZWxmLldvcmtlckdsb2JhbFNjb3BlICE9PSBcInVuZGVmaW5lZFwiO1xuICBjb25zdCBpc0Jyb3dzZXIgPVxuICAgIGlzV2ViV29ya2VyIHx8XG4gICAgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgIHR5cGVvZiB3aW5kb3cuZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgIHR5cGVvZiBmZXRjaCAhPT0gXCJ1bmRlZmluZWRcIik7XG5cbiAgaWYgKGlzQnJvd3Nlcikge1xuICAgIC8vIE5vdCBpbiBOb2RlLCBydW4gdW4tY2FjaGVkXG4gICAgcmV0dXJuIHJ1blR3b1NsYXNoKGNvZGUsIGxhbmcsIHNldHRpbmdzKTtcbiAgfVxuXG4gIGNvbnN0IHNoYXN1bSA9IGNyZWF0ZUhhc2goXCJzaGExXCIpO1xuICBjb25zdCBjb2RlU2hhID0gc2hhc3VtLnVwZGF0ZShgJHtjb2RlfS0ke3NoaWtpVmVyc2lvbn1gKS5kaWdlc3QoXCJoZXhcIik7XG5cbiAgY29uc3QgZ2V0Tm1DYWNoZSA9ICgpID0+IHtcbiAgICBpZiAoX19kaXJuYW1lLmluY2x1ZGVzKFwibm9kZV9tb2R1bGVzXCIpKSB7XG4gICAgICByZXR1cm4gam9pbihcbiAgICAgICAgX19kaXJuYW1lLnNwbGl0KFwibm9kZV9tb2R1bGVzXCIpWzBdLFxuICAgICAgICBcIm5vZGVfbW9kdWxlc1wiLFxuICAgICAgICBcIi5jYWNoZVwiLFxuICAgICAgICBcInR3b3NsYXNoXCJcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBqb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcIi4uXCIsIFwiLmNhY2hlXCIsIFwidHdvc2xhc2hcIik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IGdldFBucENhY2hlID0gKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwbnAgPSByZXF1aXJlKFwicG5wYXBpXCIpO1xuICAgICAgcmV0dXJuIGpvaW4oXG4gICAgICAgIHBucC5nZXRQYWNrYWdlSW5mb3JtYXRpb24ocG5wLnRvcExldmVsKS5wYWNrYWdlTG9jYXRpb24sXG4gICAgICAgIFwibm9kZV9tb2R1bGVzXCIsXG4gICAgICAgIFwiLmNhY2hlXCIsXG4gICAgICAgIFwidHdvc2xhc2hcIlxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgcmV0dXJuIGdldE5tQ2FjaGUoKTtcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgY2FjaGVSb290ID0gcHJvY2Vzcy52ZXJzaW9ucy5wbnAgPyBnZXRQbnBDYWNoZSgpIDogZ2V0Tm1DYWNoZSgpO1xuXG4gIGNvbnN0IGNhY2hlUGF0aCA9IGpvaW4oY2FjaGVSb290LCBgJHtjb2RlU2hhfS5qc29uYCk7XG5cbiAgaWYgKGV4aXN0c1N5bmMoY2FjaGVQYXRoKSkge1xuICAgIGlmIChwcm9jZXNzLmVudi5kZWJ1ZylcbiAgICAgIGNvbnNvbGUubG9nKGBVc2luZyBjYWNoZWQgdHdvc2xhc2ggcmVzdWx0cyBmcm9tICR7Y2FjaGVQYXRofWApO1xuXG4gICAgcmV0dXJuIEpTT04ucGFyc2UocmVhZEZpbGVTeW5jKGNhY2hlUGF0aCwgXCJ1dGY4XCIpKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCByZXN1bHRzID0gcnVuVHdvU2xhc2goY29kZSwgbGFuZywgc2V0dGluZ3MpO1xuICAgIGlmICghZXhpc3RzU3luYyhjYWNoZVJvb3QpKSBta2RpclN5bmMoY2FjaGVSb290LCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KTtcbiAgICB3cml0ZUZpbGVTeW5jKGNhY2hlUGF0aCwgSlNPTi5zdHJpbmdpZnkocmVzdWx0cyksIFwidXRmOFwiKTtcbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfVxufTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZ1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZy92aXRlLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvdml0ZS50c1wiO2ltcG9ydCBwYXRoLCB7IHJlc29sdmUgfSBmcm9tIFwibm9kZTpwYXRoXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoIH0gZnJvbSBcIm5vZGU6dXJsXCI7XG5pbXBvcnQgdmFycyBmcm9tIFwicG9zdGNzcy1hZHZhbmNlZC12YXJpYWJsZXNcIjtcbmltcG9ydCBmdW5jdGlvbnMgZnJvbSBcInBvc3Rjc3MtZnVuY3Rpb25zXCI7XG5pbXBvcnQgdmFsdWVzIGZyb20gXCJwb3N0Y3NzLW1vZHVsZXMtdmFsdWVzXCI7XG5pbXBvcnQgbmVzdGVkIGZyb20gXCJwb3N0Y3NzLW5lc3RlZFwiO1xuaW1wb3J0IHByb3BlcnR5IGZyb20gXCJwb3N0Y3NzLXByb3BlcnR5LWxvb2t1cFwiO1xuaW1wb3J0ICogYXMgc2FzcyBmcm9tIFwicG9zdGNzcy1zY3NzXCI7XG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSBcInJvbGx1cC1wbHVnaW4tdmlzdWFsaXplclwiO1xuaW1wb3J0IHR5cGUgeyBDU1NPcHRpb25zLCBVc2VyQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCB7IGNvbG9yIH0gZnJvbSBcIi4vY3NzLWZ1bmN0aW9ucy9jb2xvci5qc1wiO1xuXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcbmV4cG9ydCBjb25zdCByb290ID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuLi8uLi8uLlwiKTtcblxuZXhwb3J0IGNvbnN0IENTUzogQ1NTT3B0aW9ucyA9IHtcbiAgcG9zdGNzczoge1xuICAgIHN5bnRheDogc2FzcyxcbiAgICBwbHVnaW5zOiBbdmFycygpLCBmdW5jdGlvbnMoeyBjb2xvciB9KSwgdmFsdWVzKCksIHByb3BlcnR5KCksIG5lc3RlZCgpXSxcbiAgfSxcbiAgZGV2U291cmNlbWFwOiB0cnVlLFxufTtcblxuZXhwb3J0IGNvbnN0IFZJVEU6IFVzZXJDb25maWcgPSB7XG4gIGNzczogQ1NTLFxuICBsb2dMZXZlbDogXCJpbmZvXCIsXG4gIHBsdWdpbnM6IFtdLFxuICBzc3I6IHt9LFxuICBlbnZEaXI6IHJlc29sdmUocm9vdCwgXCIuY29uZmlnXCIsIFwiLmVudlwiKSxcbiAgZW52UHJlZml4OiBcIlNUQVJCRUFNX1wiLFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgdmlzdWFsaXplcih7XG4gICAgICAgICAgZW1pdEZpbGU6IHRydWUsXG4gICAgICAgICAgZmlsZW5hbWU6IFwic3RhdHMuaHRtbFwiLFxuICAgICAgICB9KSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcbn07XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvY3NzLWZ1bmN0aW9uc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvd3ljYXRzL0NvZGUvU3RhcmJlYW0vRG9jcy9zdGFyYmVhbS1kb2NzL3NyYy8udml0ZXByZXNzL2NvbmZpZy9jc3MtZnVuY3Rpb25zL2NvbG9yLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3d5Y2F0cy9Db2RlL1N0YXJiZWFtL0RvY3Mvc3RhcmJlYW0tZG9jcy9zcmMvLnZpdGVwcmVzcy9jb25maWcvY3NzLWZ1bmN0aW9ucy9jb2xvci50c1wiO2V4cG9ydCBmdW5jdGlvbiBjb2xvcihcbiAgaDogc3RyaW5nIHwgbnVtYmVyLFxuICBzOiBzdHJpbmcgfCBudW1iZXIsXG4gIGw6IFwibGlnaHRcIiB8IFwibm9ybWFsXCIgfCBcImRhcmtcIlxuKTogc3RyaW5nIHtcbiAgY29uc3Qgc2F0ID0gdHlwZW9mIHMgPT09IFwic3RyaW5nXCIgPyBzIDogYCR7c30lYDtcblxuICByZXR1cm4gYGhzbCgke2h9LCAke3Nh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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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TCxTQUFTO0FBQUEsSUFDVCxhQUFhO0FBQUEsSUFDYixVQUFVO0FBQUEsTUFDUixTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0EsR0FBRztBQUFBLEVBQ0w7QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLEtBQUs7QUFBQSxJQUNILFVBQVU7QUFBQSxNQUNSLGlCQUFpQjtBQUFBLFFBQ2YsaUJBQWlCLENBQUMsUUFBUSxJQUFJLFNBQVMsR0FBRztBQUFBLE1BQzVDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJfX2Rpcm5hbWUiLCAiZGVwcyIsICJyb290IiwgImRlcCIsICJwYXRoIiwgImZpbGVVUkxUb1BhdGgiLCAicmVzb2x2ZSIsICJsaW5lIiwgIl9hIiwgIm5hbWUiLCAic2VsZiIsICJtZXRhIiwgIml0ZW0iLCAiaW5kZXgiLCAiY29udGFpbmVyIiwgImhhc2giLCAiaGFzaCIsICJwYXRoIiwgImZpbGVVUkxUb1BhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJkaXJuYW1lIiwgInBhdGgiLCAiZmlsZVVSTFRvUGF0aCIsICJkaXJuYW1lIiwgInJlc29sdmUiLCAiZmlsZVVSTFRvUGF0aCIsICJfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsIiwgIl9fZGlybmFtZSIsICJkaXJuYW1lIiwgImZpbGVVUkxUb1BhdGgiLCAidiIsICJoaWdobGlnaHQiLCAidGhlbWUiLCAicmVzb2x2ZSIsICJzdHIiLCAicmVhZEZpbGVTeW5jIiwgIl9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwiLCAicmVxdWlyZSIsICJlcnJvciIsICJyZWFkRmlsZVN5bmMiLCAicGF0aCIsICJyZXNvbHZlIiwgImZpbGVVUkxUb1BhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJfX2Rpcm5hbWUiLCAicGF0aCIsICJmaWxlVVJMVG9QYXRoIiwgInJlc29sdmUiLCAicmVzb2x2ZSIsICJoaWdobGlnaHQiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJkaXJuYW1lIiwgInBhdGgiLCAiZmlsZVVSTFRvUGF0aCJdCn0K
