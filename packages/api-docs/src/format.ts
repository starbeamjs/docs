export function formatSlug(...parts: string[]) {
  return parts.map((p) => p.replace(/[^a-zA-Z0-9-]/g, "--")).join("-");
}
