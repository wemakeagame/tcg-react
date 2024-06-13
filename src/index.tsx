import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@radix-ui/themes/styles.css";
import reportWebVitals from "./reportWebVitals";
import App from "./core/components/App";
import { Theme } from "@radix-ui/themes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { UserRegisterPage } from "./user/components/UserRegisterPage";
import { MainPage } from "./game/components/MainPage";
import { UserLandingPage } from "./user/components/UserLandingPage";
import { NonAuthorized } from "./core/components/NonAuthorized";
import { ManageDeckPage } from "./card/components/ManageDeckPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/error",
    element: <h1>Something is wrong</h1>,
  },
  {
    path: "/non-authorized",
    element: <NonAuthorized />,
  },
  {
    path: "/user",
    element: <UserLandingPage />
  },
  {
    path: "/register",
    element: <UserRegisterPage />,
  },
  {
    path: "/manage-deck",
    element: <ManageDeckPage />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App>
      <Theme
        accentColor="green"
        grayColor="gray"
        panelBackground="translucent"
        scaling="100%"
        radius="small"
        style={{ backgroundColor: "#a2dfab" }}
      >
        <RouterProvider router={router} />
      </Theme>
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
