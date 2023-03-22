type DynamicSegment = string | string[];

export default function (
  raw: TemplateStringsArray,
  ...dynamic: DynamicSegment[]
): string;
