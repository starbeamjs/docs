var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function createCommonjsModule(fn, basedir, module) {
  return module = {
    path: basedir,
    exports: {},
    require: function (path, base) {
      return commonjsRequire(path, base === void 0 || base === null ? module.path : base);
    } },
  fn(module, module.exports), module.exports;
}
function commonjsRequire() {
  throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
}
function defaultSetTimout() {
  throw new Error("setTimeout has not been defined");
}
function defaultClearTimeout() {
  throw new Error("clearTimeout has not been defined");
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
var globalContext;
if (typeof window !== "undefined") {
  globalContext = window;
} else if (typeof self !== "undefined") {
  globalContext = self;
} else {
  globalContext = {};
}
if (typeof globalContext.setTimeout === "function") {
  cachedSetTimeout = setTimeout;
}
if (typeof globalContext.clearTimeout === "function") {
  cachedClearTimeout = clearTimeout;
}
function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    return setTimeout(fun, 0);
  }
  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }
  try {
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e2) {
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}
function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    return clearTimeout(marker);
  }
  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }
  try {
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      return cachedClearTimeout.call(null, marker);
    } catch (e2) {
      return cachedClearTimeout.call(this, marker);
    }
  }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }
  draining = false;
  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }
  if (queue.length) {
    drainQueue();
  }
}
function drainQueue() {
  if (draining) {
    return;
  }
  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;
  while (len) {
    currentQueue = queue;
    queue = [];
    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }
    queueIndex = -1;
    len = queue.length;
  }
  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}
function nextTick(fun) {
  var args = new Array(arguments.length - 1);
  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }
  queue.push(new Item(fun, args));
  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}
function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}
Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};
var title = "browser";
var platform = "browser";
var browser = true;
var argv = [];
var version = "";
var versions = {};
var release = {};
var config = {};
function noop() {
}
var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;
function binding(name) {
  throw new Error("process.binding is not supported");
}
function cwd() {
  return "/";
}
function chdir(dir) {
  throw new Error("process.chdir is not supported");
}
function umask() {
  return 0;
}
var performance = globalContext.performance || {};
var performanceNow = performance.now || performance.mozNow || performance.msNow || performance.oNow || performance.webkitNow || function () {
  return new Date().getTime();
};
function hrtime(previousTimestamp) {
  var clocktime = performanceNow.call(performance) * 1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor(clocktime % 1 * 1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds < 0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds, nanoseconds];
}
var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1e3;
}
var process = {
  nextTick,
  title,
  browser,
  env: { NODE_ENV: "production" },
  argv,
  version,
  versions,
  on,
  addListener,
  once,
  off,
  removeListener,
  removeAllListeners,
  emit,
  binding,
  cwd,
  chdir,
  umask,
  hrtime,
  platform,
  release,
  config,
  uptime };

var asciiTree = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AsciiTree = void 0;
  class AsciiTree2 {
    constructor(text, ...children) {
      this.text = text;
      this._children = new Array();
      for (const child of children) {
        this.add(child);
      }
    }
    printTree(output = process.stdout) {
      let ancestorsPrefix = "";
      for (const parent of this.ancestors) {
        if (parent.level <= 0) {
          continue;
        }
        if (parent.last) {
          ancestorsPrefix += "  ";
        } else {
          ancestorsPrefix += " \u2502";
        }
      }
      let myPrefix = "";
      let multilinePrefix = "";
      if (this.level > 0) {
        if (this.last) {
          if (!this.empty) {
            myPrefix += " \u2514\u2500\u252C ";
            multilinePrefix += " \u2514\u2500\u252C ";
          } else {
            myPrefix += " \u2514\u2500\u2500 ";
            multilinePrefix = "     ";
          }
        } else {
          if (!this.empty) {
            myPrefix += " \u251C\u2500\u252C ";
            multilinePrefix += " \u2502 \u2502 ";
          } else {
            myPrefix += " \u251C\u2500\u2500 ";
            multilinePrefix += " \u2502   ";
          }
        }
      }
      if (this.text) {
        output.write(ancestorsPrefix);
        output.write(myPrefix);
        const lines = this.text.split("\n");
        output.write(lines[0]);
        output.write("\n");
        for (const line of lines.splice(1)) {
          output.write(ancestorsPrefix);
          output.write(multilinePrefix);
          output.write(line);
          output.write("\n");
        }
      }
      for (const child of this._children) {
        child.printTree(output);
      }
    }
    toString() {
      let out = "";
      const printer = {
        write: (data) => {
          out += data;
          return true;
        } };

      this.printTree(printer);
      return out;
    }
    add(...children) {
      for (const child of children) {
        child.parent = this;
        this._children.push(child);
      }
    }
    get children() {
      return this._children.map((x) => x);
    }
    get root() {
      return !this.parent;
    }
    get last() {
      if (!this.parent) {
        return true;
      }
      return this.parent.children.indexOf(this) === this.parent.children.length - 1;
    }
    get level() {
      if (!this.parent) {
        return this.text ? 0 : -1;
      }
      return this.parent.level + 1;
    }
    get empty() {
      return this.children.length === 0;
    }
    get ancestors() {
      if (!this.parent) {
        return [];
      }
      return [...this.parent.ancestors, this.parent];
    }}

  exports.AsciiTree = AsciiTree2;
});
var lib = createCommonjsModule(function (module, exports) {
  var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function (o, m, k, k2) {
    if (k2 === void 0)
    k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function () {
        return m[k];
      } });
  } : function (o, m, k, k2) {
    if (k2 === void 0)
    k2 = k;
    o[k2] = m[k];
  });
  var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function (m, exports2) {
    for (var p in m)
    if (p !== "default" && !exports2.hasOwnProperty(p))
    __createBinding(exports2, m, p);
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  __exportStar(asciiTree, exports);
});
var __pika_web_default_export_for_treeshaking__ = /* @__PURE__ */getDefaultExportFromCjs(lib);
var AsciiTree = lib.AsciiTree;

export { AsciiTree, lib as __moduleExports, __pika_web_default_export_for_treeshaking__ as default };
