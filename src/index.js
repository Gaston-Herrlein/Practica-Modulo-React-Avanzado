import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/app";
import configureStore from "./store";
import storage from "./utils/storage";
import { configureClient } from "./api/client";
import "./index.css";

const accessToken = storage.get("auth");
configureClient({ accessToken });

const root = createRoot(document.getElementById("root"));
const router = createBrowserRouter([{ path: "*", element: <App /> }]);
const store = configureStore({ auth: !!accessToken }, { router });

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
