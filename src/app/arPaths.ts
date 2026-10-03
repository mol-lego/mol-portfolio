import { getWork } from "./works.js";

const basePath =
  import.meta.env.BASE_URL === "/"
    ? ""
    : import.meta.env.BASE_URL.replace(/\/$/, "");

const withBase = (path: string) => `${basePath}${path}`;

export const getAppPath = (path: string) => withBase(path);

// AR の静的ページのパスは works.js の ar
export const getARStaticPath = (id: string) => {
  const path = getWork(id)?.ar;
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
