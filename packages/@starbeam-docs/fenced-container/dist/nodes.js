import Token from "markdown-it/lib/token.js";
export function Fragment(...children) {
    return {
        render: (fragment)=>fragment.push(...children)
    };
}
export function El(...args) {
    return {
        render: (fragment)=>fragment.el(...args)
    };
}
export function HtmlEl(...args) {
    return {
        render: (fragment)=>fragment.htmlEl(...args)
    };
}
export function Do(then) {
    return {
        render: (fragment)=>render(fragment, then())
    };
}
export function Let(values, then) {
    return {
        render: (fragment)=>render(fragment, then(values))
    };
}
export function If(condition, then, options) {
    return {
        render: (fragment)=>{
            if (condition) {
                return render(fragment, then(condition));
            } else if (options === null || options === void 0 ? void 0 : options.else) {
                return render(fragment, options.else());
            } else {
                return fragment;
            }
        }
    };
}
export function HTML(value) {
    const html = new Token("html_block", value, 0);
    html.content = value;
    return {
        render: (tokens)=>tokens.append(html)
    };
}
function render(fragment, children) {
    if (Array.isArray(children)) {
        for (const child of children){
            child.render(fragment);
        }
    } else {
        children.render(fragment);
    }
    return fragment;
}


//# sourceMappingURL=nodes.js.map