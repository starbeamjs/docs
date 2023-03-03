//

type Invalidation = "always" | "mtime" | "not-found";
type Display =
  | "none"
  | "init-status"
  | "init-only"
  | "status-only"
  | "dot";
type Stdio =
  | "none"
  | "no-stdin"
  | "stdout-only"
  | "stderr-only"
  | "all";
type Engine = "node" | "deno" | "cmd";
type Validation =
  | "none"
  | "ok-only"
  | "targets-only"
  | "ok-targets";

interface TemplateOptions {
  template: string;
  templateOptions?: T;
}

type Template<
  T extends Record<string, unknown> = Record<string, unknown>
> =
  | Record<string, never>
  | {
      template: string;
      templateOptions?: T;
    };

type SugaryChompTask<O = unknown> = {
  readonly name: string;
  readonly serial?: boolean;
  /**
   * @default {"mtime"}
   */
  readonly invalidation?: Invalidation;
  /**
   * @default {"init-status"}
   */
  readonly display?: Display;
  /**
   * @default {false}
   */
  readonly echo?: boolean;
  /**
   * @default {"all"}
   */
  readonly stdio?: Stdio;
  /**
   * @default {"cmd"}
   */
  readonly engine?: Engine;
  readonly run?: string;
  readonly envDefault?: Record<string, string>;
  /**
   * @default {true}
   */
  readonly envReplace?: boolean;
  /**
   * @default {"ok-targets"}
   */
  readonly validation?: Validation;
} & TemplateOptions<O>;

type Deps<O> =
  | TemplateOptions<O>
  | (Partial<Template<O>> &
      Multi<"dep"> &
      Partial<Multi<"target">>);

type ChompTask<O = unknown> = {
  name: string;
  targets: string[];
  deps: string[];
  serial?: boolean;
  /**
   * @default {"mtime"}
   */
  invalidation?: Invalidation;
  /**
   * @default {"init-status"}
   */
  display?: Display;
  /**
   * @default {false}
   */
  echo?: boolean;
  /**
   * @default {"all"}
   */
  stdio?: Stdio;
  /**
   * @default {"cmd"}
   */
  engine?: Engine;
  run?: string;
  envDefault?: Record<string, string>;
  /**
   * @default {true}
   */
  envReplace?: boolean;
  /**
   * @default {"ok-targets"}
   */
  validation?: Validation;
} & Template<O>;

type MultiOpt<N extends string, T = string> = Partial<
  Multi<N, T>
>;

type Multi<N extends string, T = string> =
  | { [P in N]: string }
  | { [P in `${N}s`]: T[] };

declare const Chomp: {
  registerTemplate<O>(
    name: string,
    template: (task: ChompTask<O>) => SugaryChompTask[]
  );
};
