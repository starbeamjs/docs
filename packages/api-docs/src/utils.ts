import type * as api from "./api.js";
import type { PropertyInfo } from "./impls/interface/property";
import type { Linkable } from "./impls/interfaces.js";

export function normalizeProperty(
  parent: Linkable,
  name: string,
  property: api.Property
): PropertyInfo {
  if (isTypeWithDocs(property)) {
    return buildProperty(parent, {
      name,
      type: property,
    });
  } else if (isLonghand(property)) {
    return normalizeLonghand(parent, name, property);
  } else if (isPropertyWithModifier(property)) {
    const [type, docs, ...modifiers] = property;
    return buildProperty(parent, {
      name,
      type: [type, docs],
      modifiers,
    });
  } else {
    exhaustive(property);
  }
}

function buildProperty(
  parent: Linkable,
  property: { name: string; type: api.TypeWithDocs } & Partial<PropertyInfo>
) {
  const { name, type, modifiers, tags } = property;

  let prop: PropertyInfo = {
    parent,
    name,
    type,
  };

  if (modifiers) {
    prop = { ...prop, modifiers };
  }

  if (tags) {
    prop = { ...prop, tags };
  }

  return prop;
}

function normalizeLonghand(
  parent: Linkable,
  name: string,
  property: api.LonghandProperty
): PropertyInfo {
  const [type, { modifiers, docs, ...tagged }] = property;
  const tags = tagList(tagged);

  return buildProperty(parent, {
    name,
    type: typeWithDocs(type, docs),
    modifiers,
    tags: tags,
  });
}

function typeWithDocs(type: string, docs?: string): api.TypeWithDocs {
  if (docs === undefined) {
    return [type];
  } else {
    return [type, docs];
  }
}

export function tagList(tagged: api.Tagged): api.Tag[] | null {
  const tags: api.Tag[] = [];

  if (tagged.tags) {
    tags.push(...tagged.tags);
  }

  if (tagged.tag) {
    tags.push(tagged.tag);
  }

  if (tags.length > 0) {
    return tags;
  } else {
    return null;
  }
}

function isTypeWithDocs(property: api.Property): property is api.TypeWithDocs {
  return (
    property.length === 1 ||
    (property.length === 2 && typeof property[1] === "string")
  );
}

function isLonghand(property: api.Property): property is api.LonghandProperty {
  return property.length === 2 && isObject(property[1]);
}

function isObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function isPropertyWithModifier(
  property: api.Property
): property is api.PropertyWithModifier {
  return property.length > 2;
}

function isPropertyModifier(value: unknown): value is api.PropertyModifier {
  return value === "readonly";
}

export function isOptionsType(type: api.Type): type is api.Options {
  return type[0] === "@options" || type[0] === "@options?";
}

export function hasNotes(fn: api.Fn): fn is api.FnExport {
  return "notes" in fn;
}

export function exhaustive(
  exhausted: never,
  value: unknown = exhausted
): never {
  console.error(
    "Expected exhaustive check to be unreachable (this should be a type error). value was ",
    value
  );
  throw Error("Exhaustive check should be unreachable");
}

export function formatTypeName(name: string) {
  return name.replace(/\?$/, "");
}

export function formatDocs(docs: string): string {
  let string = docs.trim();

  if (string.endsWith(".")) {
    string = string.slice(0, -1);
  }

  return string.replaceAll("\n\n", "<br>") + ".";
}
