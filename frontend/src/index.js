import React from "react";
import ReactDOM from "react-dom";
import Root from "./Root";

ReactDOM.render(<Root />, document.getElementById("root"));

if (module && module.hot) {
    module.hot.accept();
}