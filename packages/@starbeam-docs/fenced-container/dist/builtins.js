import { parserPlugin } from "@jsergo/mdit";
import "@mdit-vue/plugin-sfc";
import parseFence from "fenceparser";
import { Builtins, CUSTOM_EL, CustomEl, Title, UnparsedContent } from "./define.js";
import { Do, El } from "./nodes.js";
const BUILTINS = Builtins.empty().basic("info", {
    defaultTitle: "INFO",
    color: "blue"
}).basic("construction", {
    defaultTitle: "Under Construction",
    color: "orange"
}).basic("warning", {
    color: "yellow"
}).basic("error", {
    color: "red"
}).basic("tip", {
    defaultTitle: null,
    color: "green"
}).basic("callout", {
    defaultTitle: null
}).custom("💡", ({ title , content  })=>CustomEl("lightbulb", {
        border: "se",
        color: "yellow",
        style: {
            "padding-block": "0.5em"
        }
    }, [
        title,
        content
    ])).custom("lang-ts", ({ content  })=>CustomEl("lang-ts", {
        color: "neutral"
    }, [
        content
    ])).custom("em", ({ title , content  })=>CustomEl("em", {
        color: "orange",
        border: "w",
        style: {
            "font-size": `calc(1em * var(--sbdoc-ratio))`,
            "font-weight": "600",
            "border-size": "2px",
            "line-height": "1"
        }
    }, [
        title.withDefault("Key Point").map((title)=>El("h5", [
                title
            ])),
        content
    ])).custom("persona", ({ title , content  })=>El("aside", {
        class: [
            "persona",
            String(title)
        ]
    }, [
        content
    ])).custom("details", ({ title , content , attrs  })=>{
    return El(CUSTOM_EL, {
        kind: "details",
        color: "gray"
    }, [
        El("details", {
            class: [
                "content-block",
                "callout-block",
                "container",
                ...normalizePart(attrs["type"])
            ]
        }, [
            Do(()=>{
                function titleChild() {
                    switch(attrs["type"]){
                        case "deep-dive":
                            // TODO:: Generalize
                            return [
                                El("span", [
                                    "Deep Dive"
                                ]),
                                title
                            ];
                        default:
                            return [
                                title.withDefault("Details")
                            ];
                    }
                }
                return [
                    El("summary", {
                        class: "custom-block-title"
                    }, titleChild())
                ];
            }),
            content
        ])
    ]);
});
export const fencedContainerPlugin = parserPlugin({
    name: "fenced-container",
    before: "fence"
}).block((line, md)=>{
    var _matched_raw_groups;
    const matched = line.matchStart(RegExp("^(?<ticks>````*)md "));
    if (matched.type === "error") {
        return ()=>(render)=>render.html(md.error(matched.error));
    } else if (matched.type === "unmatched") {
        return false;
    }
    const ticks = (_matched_raw_groups = matched.raw.groups) === null || _matched_raw_groups === void 0 ? void 0 : _matched_raw_groups["ticks"];
    const fenceline = line.string();
    const info = fenceline.slice(matched.fragment.length);
    // split the fenceline into the part before the first space (kind) and the
    // part after it (params).
    const [kind, params] = split2(info, " ");
    if (kind === undefined) {
        return false;
    }
    const builtin = BUILTINS.tryGet(kind);
    if (builtin === undefined) {
        return false;
    }
    return ()=>{
        var _line_next;
        const fenceContent = (_line_next = line.next) === null || _line_next === void 0 ? void 0 : _line_next.until((line)=>{
            var _line_slice;
            return ((_line_slice = line.slice()) === null || _line_slice === void 0 ? void 0 : _line_slice.trim()) === ticks;
        });
        return (render)=>{
            const { title , attrs ={}  } = parseTitle(params);
            const rendered = builtin.render({
                md,
                kind,
                title: Title.provided(title),
                attrs,
                content: UnparsedContent.of(fenceContent)
            });
            return render.tokens(rendered);
        };
    };
});
function parseTitle(params) {
    if (params === undefined) {
        return {};
    }
    const trimmed = params.trim();
    if (trimmed.length === 0) {
        return {};
    }
    const quotedString = trimmed.match(/^\s*"(.*)"\s*$/);
    if (quotedString === null || quotedString === void 0 ? void 0 : quotedString[1]) {
        return {
            title: quotedString[1]
        };
    }
    if (trimmed.match(/[{=]/)) {
        const parsed = parseFence(trimmed);
        const title = getTitle(parsed["title"]);
        return {
            title,
            attrs: parsed
        };
    }
    return {
        title: trimmed
    };
}
function getTitle(title) {
    if (title === undefined) {
        return undefined;
    } else if (title === false || title === null) {
        return false;
    } else {
        return String(title);
    }
}
function split2(string, delimiter) {
    const index = string.indexOf(delimiter);
    const p0 = index === -1 ? string : string.substring(0, index);
    const p1 = index === -1 ? "" : string.substring(index + 1);
    return [
        p0,
        p1
    ];
}
function normalizePart(value) {
    if (value === null || value === undefined) {
        return [];
    } else if (Array.isArray(value)) {
        return value.flatMap(normalizePart).filter(isPresent);
    } else if (typeof value === "string") {
        return [
            value
        ];
    } else if (typeof value === "number") {
        return [
            String(value)
        ];
    } else if (typeof value === "boolean") {
        throw Error(`Booleans are not supported as part of an attr array.`);
    } else {
        throw Error(`Object are not supported as part of an attr array. You passed ${JSON.stringify(value)}`);
    }
}
function isPresent(value) {
    return value !== undefined && value !== null;
}


//# sourceMappingURL=builtins.js.map