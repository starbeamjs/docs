"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strip = void 0;
var tagged_templates_1 = require("@jsergo/tagged-templates");
exports.strip = (0, tagged_templates_1.parsed)(function (lines) {
    var minIndent = lines.minIndent();
    return lines.dedent(minIndent).display();
});
