import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import Articles from "./pages/Articles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/articles",
    element: <Articles />,
  },
]);

const root = ReactDOM.hydrateRoot(document.getElementById("root"));
console.log("roooot -->", root);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  );
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
