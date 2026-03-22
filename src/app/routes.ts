import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { NotFoundPage, RouteErrorPage } from "./pages/ErrorPage";

const loadWorkDetail = async () => {
  const module = await import("./pages/WorkDetail");
  return { Component: module.WorkDetail };
};

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
    errorElement: createElement(
      Layout,
      null,
      createElement(RouteErrorPage),
    ),
    children: [
      { index: true, Component: Home },
      { path: "work/:id", lazy: loadWorkDetail },
      { path: "about", lazy: loadAbout },
      { path: "process", lazy: loadProcess },
      { path: "*", Component: NotFoundPage },
    ],
  },
  {
    path: "/ar-viewer",
    lazy: loadArViewer,
    errorElement: createElement(RouteErrorPage),
  },
  {
    path: "/ar-experience/:id",
    lazy: loadArExperience,
    errorElement: createElement(RouteErrorPage),
  },
], {
  basename: import.meta.env.BASE_URL,
});
