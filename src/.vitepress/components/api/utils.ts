import type * as api from "@starbeam/api-docs";
import type {
  LonghandProperty,
  PropertyModifier,
  PropertyWithModifier,
} from "@starbeam/api-docs";
import { isObject } from "@vueuse/core";

export function normalizeProperty(
  property: api.Property
): NormalizedPropertyType {
  if (isTypeWithDocs(property)) {
    const [name, docs] = property;

    return buildProperty({
      name,
      docs,
    });
  } else if (isLonghand(property)) {
    return normalizeLonghand(property);
  } else if (isPropertyWithModifier(property)) {
    const [name, docs, ...modifiers] = property;
    return buildProperty({
      name,
      docs,
      modifiers,
    });
  } else {
    exhaustiveCheck(property);
  }
}

function buildProperty(
  property: { name: string } & Partial<NormalizedPropertyType>
) {
  const { name, docs, modifiers, tags } = property;

  const prop: NormalizedPropertyType = {
    name,
  };

  if (docs) {
    prop.docs = docs;
  }

  if (modifiers) {
    prop.modifiers = modifiers;
  }

  if (tags) {
    prop.tags = tags;
  }

  return prop;
}

function normalizeLonghand(property: LonghandProperty): NormalizedPropertyType {
  const [name, { modifiers, docs, ...tagged }] = property;
  const tags = tagList(tagged);

  const prop: NormalizedPropertyType = {
    name,
  };

  if (docs) {
    prop.docs = docs;
  }

  if (modifiers) {
    prop.modifiers = modifiers;
  }

  if (tags) {
    prop.tags = tags;
  }

  return prop;
}

export function tagList(tagged: api.Tagged): api.Tag[] | void {
  const tags: api.Tag[] = [];

  if (tagged.tags) {
    tags.push(...tagged.tags);
  }

  if (tagged.tag) {
    tags.push(tagged.tag);
  }

  if (tags.length > 0) {
    return tags;
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

function isPropertyWithModifier(
  property: api.Property
): property is PropertyWithModifier {
  return property.length > 2;
}

function isPropertyModifier(value: unknown): value is PropertyModifier {
  return value === "readonly";
}

export interface NormalizedPropertyType {
  name: string;
  docs?: string;
  modifiers?: api.PropertyModifier[];
  tags?: api.Tag[];
}

export function isOptionsType(type: api.Param): type is api.Options {
  return type[0] === "@options" || type[0] === "@options?";
}

export function hasNotes(fn: api.Fn): fn is api.FnExport {
  return "notes" in fn;
}

function exhaustiveCheck(_never: never): never {
  throw new Error(
    "Expected exhaustive check to be unreachable (this should be a type error)"
  );
}
