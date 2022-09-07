import React from "react";
import ReactDOM from "react-dom/client";

import "./style/variables.css";
import "./style/fonts.css";
import "./style/css_reset.css";
import "./style/general.css";

import Header from "./components/Header";
import Main from "./pages/main/Main";
import Footer from "./components/Footer";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Header />
    <Main />
    <Footer />
  </React.StrictMode>
);

reportWebVitals();