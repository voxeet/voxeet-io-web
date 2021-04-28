import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./app/App";
const { electronOnJoined, electronOnLeft, getSources } = window.electron || {};

const ASSET_PATH = process.env.ASSET_PATH || "/";

let fullScreenId = null;
getSources({ types: ["window", "screen"] }).then(async sources => {
  for (const source of sources) {
    if (source.name === "Entire Screen") {
      console.log("About to set fullScreenId", source.id);
      fullScreenId = source.id;
      return;
    } else {
      console.log("Found source", source.name);
    }
  }
});
window.getScreenSourceId = () => {
  console.log("About to return fullScreenId", fullScreenId);
  return fullScreenId;
};

const Root = ({}) => (
  <Router basename={ASSET_PATH}>
    <Switch>
      <Route
        path="/:conferenceName"
        exact
        render={props => (
          <App
            {...props}
            handleJoin={electronOnJoined}
            handleLeave={electronOnLeft}
            getSources={getSources}
          />
        )}
      />
      <Route
        path="/"
        render={props => (
          <App
            {...props}
            handleJoin={electronOnJoined}
            handleLeave={electronOnLeft}
          />
        )}
      />
    </Switch>
  </Router>
);

Root.propTypes = {};

export default Root;
