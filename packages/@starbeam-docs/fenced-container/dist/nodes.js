import Token from "markdown-it/lib/token.js";
export function Fragment(...children) {
    return {
        render: (tokens)=>tokens.append(...children)
    };
}
export function El(...args) {
    return {
        render: (tokens)=>tokens.el(...args)
    };
}
export function Do(then) {
    return {
        render: (tokens)=>render(tokens, then)
    };
}
export function Let(values, then) {
    return {
        render: (tokens)=>{
            return render(tokens, ()=>then(values));
        }
    };
}
export function If(condition, then, options) {
    return {
        render: (tokens)=>{
            return render(tokens, ()=>{
                if (condition) {
                    return then(condition, tokens);
                } else if (options === null || options === void 0 ? void 0 : options.else) {
                    return options.else(tokens);
                }
            });
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
function render(tokens, callback) {
    const children = callback();
    if (Array.isArray(children)) {
        return tokens.append(...children);
    }
    return tokens;
}


//# sourceMappingURL=nodes.js.map