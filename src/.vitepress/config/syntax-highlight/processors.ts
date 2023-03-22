import {
  createDiffProcessor,
  createFocusProcessor,
  createHighlightProcessor,
  createRangeProcessor,
  defineProcessor,
  Processor,
} from "shiki-processor";

const errorLevelProcessor = defineProcessor({
  name: "error-level",
  handler: createRangeProcessor({
    error: ["highlighted", "error"],
    warning: ["highlighted", "warning"],
  }),
});

export const PROCESSORS: Processor[] = [
  createFocusProcessor(),
  createHighlightProcessor({ hasHighlightClass: "highlighted" }),
  createDiffProcessor(),
  errorLevelProcessor,
];
