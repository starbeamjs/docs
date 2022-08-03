"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("@typescript/lib-dom");
// #region stopwatch
const core_1 = require("@starbeam/core");
const Stopwatch = (0, core_1.Resource)((r) => {
    const time = (0, core_1.Cell)(new Date());
    r.on.setup(() => {
        const interval = setInterval(() => {
            time.set(new Date());
        });
        // #highlight:next
        return () => clearInterval(interval);
    });
    // #highlight:next
    return () => {
        const now = time.current;
        return new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: false,
        }).format(now);
    };
});
// #endregion stopwatch
