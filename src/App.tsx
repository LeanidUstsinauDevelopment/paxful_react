import React from "react";
import { BrowserRouter } from "react-router-dom";

import "./App.css";
import Content from "./components/Content/Content";

export default () => (
  <BrowserRouter>
    <Content />
  </BrowserRouter>
);
