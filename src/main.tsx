import React from "react";
import ReactDOM from "react-dom/client";
import App from "./core/App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./core/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
