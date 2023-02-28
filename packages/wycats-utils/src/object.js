"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapEntries = void 0;
function mapEntries(obj, fn) {
    return Object.fromEntries(Object.entries(obj).map(function (_a) {
        var key = _a[0], value = _a[1];
        return fn(value, key, obj);
    }));
}
exports.mapEntries = mapEntries;
