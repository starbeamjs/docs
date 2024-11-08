import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./prism.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  React.createElement(StrictMode, {}, React.createElement(App))
);
