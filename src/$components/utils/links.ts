export function normalizeLink(url: string): string {
  if (isExternal(url)) {
    return url;
  }

  const { pathname, search, hash } = new URL(url, "http://example.com");

  const normalizedPath =
    pathname.endsWith("/") || pathname.endsWith(".html")
      ? url
      : `${pathname.replace(/(\.md)?$/, ".html")}${search}${hash}`;

  return withBase(normalizedPath);
}

export const EXTERNAL_URL_RE = /^[a-z]+:/i;

export function isExternal(path: string): boolean {
  return EXTERNAL_URL_RE.test(path);
}

export function withBase(path: string) {
  return EXTERNAL_URL_RE.test(path) ? path : joinPath(document.baseURI, path);
}

/**
 * Join two paths by resolving the slash collision.
 */
export function joinPath(base: string, path: string): string {
  return `${base}${path}`.replace(/\/+/g, "/");
}
