const basePath =
  import.meta.env.BASE_URL === "/"
    ? ""
    : import.meta.env.BASE_URL.replace(/\/$/, "");

const withBase = (path: string) => `${basePath}${path}`;

const AR_STATIC_PATHS: Record<string, string> = {
  "01": "/ar/qe/index.html",
  "02": "/ar/venice/index.html",
  "03": "/ar/yasaka/index.html",
  "04": "/ar/hawaii/index.html",
};

export const getAppPath = (path: string) => withBase(path);

export const getARStaticPath = (id: string) => {
  const path = AR_STATIC_PATHS[id];
  return path ? withBase(path) : null;
};

export const getARStaticUrl = (id: string, backTarget?: string) => {
  const path = getARStaticPath(id);
  if (!path) {
    return null;
  }

  if (!backTarget) {
    return path;
  }

  return `${path}?back=${encodeURIComponent(backTarget)}`;
};
