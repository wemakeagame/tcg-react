import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import reportWebVitals from "./reportWebVitals";
import App from "./core/components/App";
import { Theme } from "@radix-ui/themes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserRegisterPage } from "./player/components/UserRegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/error",
    element: <h1>Something is wrong</h1>,
  },
  {
    path: "/register",
    element: <UserRegisterPage />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Theme>
      <RouterProvider router={router} />
    </Theme>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();