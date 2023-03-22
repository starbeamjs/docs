import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { customBlock } from "./CustomBlock.css.js";
const north = "north";
const south = "south";
const east = "east";
const west = "west";
const MAPPING = {
    n: north,
    s: south,
    e: east,
    w: west
};
function computeBorder(position) {
    const classes = [];
    for (const [input, className] of Object.entries(MAPPING)){
        if (position.includes(input)) {
            classes.push(className);
        }
    }
    return classes;
}
function prop(type, options) {
    if (options && "default" in options) {
        return {
            type,
            default: options?.default
        };
    } else {
        return {
            type
        };
    }
}
export default defineComponent({
    props: {
        kind: prop(String),
        border: prop(String),
        color: prop(String),
        style: prop(Object)
    },
    setup: (props, { slots  })=>{
        return ()=>_createVNode("div", {
                "class": [
                    customBlock,
                    `sbdoc-custom-block-${props.color}`,
                    ...computeKindClass(props.kind),
                    ...computeBorder(props.border ?? "nsew")
                ],
                "style": props.style ?? {}
            }, [
                slots["default"]?.()
            ]);
    }
});
function computeKindClass(kind) {
    if (kind === "details") {
        return [
            "display-contents",
            "details"
        ];
    } else if (kind) {
        return [
            "content-block",
            "callout-block",
            kind
        ];
    } else {
        return [
            "content-block",
            "callout-block"
        ];
    }
}


//# sourceMappingURL=CustomBlock.js.map