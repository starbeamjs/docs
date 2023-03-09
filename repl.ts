// Define types for our AST nodes
type Expression = number | string | Sym | List;

class Sym {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  toString(): string {
    return this.name;
  }
}

class List {
  public values: Expression[];

  constructor(values: Expression[]) {
    this.values = values;
  }

  toString(): string {
    return `(${this.values.join(" ")})`;
  }
}

// Define the tokenizer
function tokenize(input: string): string[] {
  return input
    .replace(/\(/g, " ( ")
    .replace(/\)/g, " ) ")
    .trim()
    .split(/\s+/);
}

// Define the parser
function parse(tokens: string[]): Expression {
  if (tokens.length === 0) {
    throw new Error("Unexpected end of input");
  }

  const token = tokens.shift();

  if (token === "(") {
    const values: Expression[] = [];

    while (tokens[0] !== ")") {
      values.push(parse(tokens));
    }

    tokens.shift();

    return new List(values);
  } else if (token === ")") {
    throw new Error('Unexpected ")"');
  } else {
    return parseAtom(token);
  }
}

function parseAtom(token: string): Expression {
  if (/^[+-]?\d+(\.\d+)?$/.test(token)) {
    return parseFloat(token);
  } else {
    return new Sym(token);
  }
}

// Define the evaluator
// Define evaluator
function evaluate(
  expression: Expression,
  env: { [key: string]: any },
  macros: { [key: string]: Function }
): any {
  if (expression instanceof Symbol) {
    return env[expression.name];
  } else if (!(expression instanceof List)) {
    return expression;
  } else if (
    expression instanceof List &&
    expression.values.length === 0
  ) {
    return expression;
  } else {
    const [head, ...tail] = expression.values;

    if (head instanceof Symbol && head.name === "if") {
      const [condition, consequent, alternate] = tail;
      const result = evaluate(condition, env, macros);

      if (result) {
        return evaluate(consequent, env, macros);
      } else if (alternate) {
        return evaluate(alternate, env, macros);
      } else {
        return null;
      }
    } else if (head instanceof Symbol && head.name === "let") {
      const [bindings, ...body] = tail;
      const newEnv = { ...env };

      for (let i = 0; i < bindings.values.length; i += 2) {
        const bindingName = bindings.values[i].name;
        const bindingValue = evaluate(
          bindings.values[i + 1],
          env,
          macros
        );
        newEnv[bindingName] = bindingValue;
      }

      return evaluate(new List(body), newEnv, macros);
    } else if (
      head instanceof Symbol &&
      head.name === "lambda"
    ) {
      const [params, ...body] = tail;

      return (...args: any[]) => {
        const newEnv = { ...env };

        for (let i = 0; i < params.values.length; i++) {
          const paramName = params.values[i].name;
          const paramValue = args[i];
          newEnv[paramName] = paramValue;
        }

        return evaluate(new List(body), newEnv, macros);
      };
    } else {
      const evaluatedArgs = tail.map((arg) =>
        evaluate(arg, env, macros)
      );
      const fn = evaluate(head, env, macros);

      if (typeof fn !== "function") {
        throw new Error(`${head.name} is not a function`);
      }

      return fn(...evaluatedArgs);
    }
  }
}

const input = "(+ 1 (* 2 3))";

const tokens = tokenize(input);
// ['(', '+', '1', '(', '*', '2', '3', ')', ')']

const ast = parse(tokens);
// List {
//   values: [
//     Sym { name: '+' },
//     1,
//     List { values: [Sym { name: '*' }, 2, 3] }
//   ]
// }

const result = evaluate(ast, {
  "+": (a: number, b: number) => a + b,
  "*": (a: number, b: number) => a * b,
});
// 7

// Define environment with built-in functions
const env = {
  "+": (a: number, b: number) => a + b,
  "-": (a: number, b: number) => a - b,
  "*": (a: number, b: number) => a * b,
  "/": (a: number, b: number) => a / b,
  ">": (a: number, b: number) => a > b,
  "<": (a: number, b: number) => a < b,
  ">=": (a: number, b: number) => a >= b,
  "<=": (a: number, b: number) => a <= b,
  "=": (a: number, b: number) => a === b,
  abs: Math.abs,
  max: Math.max,
  min: Math.min,
  pi: Math.PI,
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sqrt: Math.sqrt,
};

// Define macro expander
function expand(
  expression: Expression,
  macros: { [key: string]: Function }
): Expression {
  if (expression instanceof List) {
    const [head, ...tail] = expression.values;

    if (head instanceof Sym && macros[head.name]) {
      const macroFn = macros[head.name];
      const macroArgs = tail.map((arg) => expand(arg, macros));

      return expand(macroFn(...macroArgs), macros);
    } else {
      return new List([
        expand(head, macros),
        ...tail.map((arg) => expand(arg, macros)),
      ]);
    }
  } else {
    return expression;
  }
}

// Define macro expander for quote macro
function quoteExpander(expression: Expression): Expression {
  if (expression instanceof List) {
    return new List(
      expression.values.map((value) => quoteExpander(value))
    );
  } else if (expression instanceof Sym) {
    return new List([new Sym("quote"), expression]);
  } else {
    return expression;
  }
}

// Define macro expander for unquote macro
function unquoteExpander(expression: Expression): Expression {
  throw new Error("Unquote can only be used inside quasiquote");
}

// Define macro expander for splice-unquote macro
function spliceUnquoteExpander(
  expression: Expression
): Expression {
  throw new Error(
    "Splice-unquote can only be used inside quasiquote"
  );
}

// Define macro expander for all macros
function macroExpander(
  expression: Expression,
  macros: { [key: string]: Function }
): Expression {
  if (expression instanceof List) {
    const [head, ...tail] = expression.values;

    if (head instanceof Sym && macros[head.name]) {
      const macroFn = macros[head.name];
      const macroArgs = tail.map((arg) => expand(arg, macros));

      return expand(macroFn(...macroArgs), macros);
    } else if (
      head instanceof Sym &&
      head.name === "quasiquote"
    ) {
      if (tail.length !== 1) {
        throw new Error(
          "quasiquote requires exactly one argument"
        );
      }

      return quasiquoteExpander(tail[0]);
    } else {
      return new List([
        expand(head, macros),
        ...tail.map((arg) => expand(arg, macros)),
      ]);
    }
  } else if (expression instanceof Sym) {
    return new List([new Sym("quote"), expression]);
  } else {
    return expression;
  }
}

// Define quasiquote macro expander
function quasiquoteExpander(expression: Expression): Expression {
  if (expression instanceof List) {
    const [head, ...tail] = expression.values;

    if (head instanceof Sym && head.name === "unquote") {
      if (tail.length !== 1) {
        throw new Error("unquote requires exactly one argument");
      }

      return tail[0];
    } else if (head instanceof List) {
      const [subhead, ...subtail] = head.values;

      if (
        subhead instanceof Sym &&
        subhead.name === "splice-unquote"
      ) {
        if (subtail.length !== 1) {
          throw new Error(
            "splice-unquote requires exactly one argument"
          );
        }

        return new List([
          new Sym("append"),
          subtail[0],
          quasiquoteExpander(new List(tail)),
        ]);
      }
    }

    return new List([
      new Sym("cons"),
      quasiquoteExpander(head),
      quasiquoteExpander(new List(tail)),
    ]);
  } else {
    return new List([new Sym("quote"), expression]);
  }
}

// Define macro evaluator
function evaluateMacro(
  expression: Expression,
  env: { [key: string]: any },
  macros: { [key: string]: Function }
): any {
  const [macro, ...args] = expression.values;
  const macroName = macro instanceof Symbol ? macro.name : null;
  const macroFn = macros[macroName];

  if (typeof macroFn !== "function") {
    throw new Error(`"${macroName}" is not a macro`);
  }

  const expanded = macroFn(...args);

  if (macroName === "defmacro") {
    if (args[0] instanceof Symbol) {
      macros[args[0].name] = args[1];
      return null;
    } else {
      throw new Error(`Invalid macro name: ${args[0]}`);
    }
  } else {
    const expandedAst = expand(expanded, macros);
    const evaluatedAst = evaluate(
      expandedAst,
      env,
      evaluateMacro
    );
    return evaluate(evaluatedAst, env);
  }
}

import * as readline from "readline";
// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "lisp> ",
});
rl.prompt();
rl.on("line", (line: string) => {
  try {
    const tokens = tokenize(line);
    const ast = parse(tokens);
    const expandedAst = expand(ast, {});
    const result = evaluate(expandedAst, env, evaluateMacro);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }

  rl.prompt();
}).on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});
