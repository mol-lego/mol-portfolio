import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { NotFoundPage, RouteErrorPage } from "./pages/ErrorPage";
import { detailWorks } from "./works.js";

// 遅延読み込みのページを初めて開くときに、読み込みの間は何も描かない
const EmptyFallback = () => null;

// 作品詳細のルートは works.js の作品詳細のある作品から作る（/work/01 など）
const workRoutes = detailWorks.map((work) => ({
  path: `work/${work.id}`,
  lazy: async () => {
    const module = await import("./pages/WorkDetail");
    const WorkPage = () => createElement(module.WorkDetail, { workId: work.id });
    return { Component: WorkPage };
  },
}));

const loadAbout = async () => {
  const module = await import("./pages/About");
  return { Component: module.About };
};

const loadProcess = async () => {
  const module = await import("./pages/process");
  return { Component: module.Process };
};

const loadArViewer = async () => {
  const module = await import("./pages/ARViewer");
  return { Component: module.ARViewer };
};

const loadArExperience = async () => {
  const module = await import("./pages/ARExperience");
  return { Component: module.ARExperience };
};

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    HydrateFallback: EmptyFallback,
    errorElement: createElement(
      Layout,
      null,
      createElement(RouteErrorPage),
    ),
    children: [
      { index: true, Component: Home },
      ...workRoutes,
      { path: "about", lazy: loadAbout },
      { path: "process", lazy: loadProcess },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/ar-viewer",
    lazy: loadArViewer,
    HydrateFallback: EmptyFallback,
    errorElement: createElement(RouteErrorPage),
  },
  {
    path: "/ar-experience/:id",
    lazy: loadArExperience,
    HydrateFallback: EmptyFallback,
    errorElement: createElement(RouteErrorPage),
  },
], {
  basename: import.meta.env.BASE_URL,
});
