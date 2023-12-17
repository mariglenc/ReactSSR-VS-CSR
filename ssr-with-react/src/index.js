import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { initialDataContext } from "./initialDataContext";
// import App from "./App";
// import Home from "./pages/Home";
// import About from "./pages/About";
import Articles from "./pages/Articles";
// import Cats from "./pages/Cats";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <App />,
  // },
  // {
  //   path: "/home",
  //   element: <Home />,
  // },
  // {
  //   path: "/about",
  //   element: <About />,
  // },
  {
    path: "/articles",
    element: <Articles />,
  },
  // {
  //   path: "/cats",
  //   element: <Cats />,
  // },
]);

const root = ReactDOM.hydrateRoot(document.getElementById("root"));
// const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <initialDataContext.Provider
      value={(window && window.preloadedData) || { _data: {} }}
    >
      <RouterProvider router={router} />
    </initialDataContext.Provider>
  </React.StrictMode>
);
