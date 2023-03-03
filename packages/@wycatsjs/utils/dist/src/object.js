export function mapEntries(obj, fn) {
    return Object.fromEntries(Object.entries(obj).map(([key, value])=>fn(value, key, obj)));
}

//# sourceMappingURL=object.js.map