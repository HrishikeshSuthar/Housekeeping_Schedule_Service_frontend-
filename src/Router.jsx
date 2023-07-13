import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/MainPage/Main";
import Show from "./components/showPage/show";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/show",
    element: <Show />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
