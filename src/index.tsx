/**
 * Entry point for the React & Typescript Boilerplate
 * @module
 */
import "./index.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { App } from "./components/App";

import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "//budget-api.thomaskbird.com/api"
});

/**
 * Creates the entire top-level structure of the application, using the specified root component.
 * @returns JSX.Element
 */
function createAppElement(): JSX.Element {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.render(createAppElement(), document.getElementById("root"));
