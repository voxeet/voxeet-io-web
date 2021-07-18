import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./app/App";
const { electronOnJoined, electronOnLeft, getSources } = window.electron || {};

const ASSET_PATH = process.env.ASSET_PATH || "/";

window.getScreenSourceId = () => {
  return getSources({ types: ["window", "screen"] }).then(async sources => {
    for (const source of sources) {
      if (source.name === "Entire Screen") {
        console.log("About to set fullScreenId to Entire Screen", source.id);
        return source.id;
      } else if (source.name === "Screen 1") {
        console.log("About to set fullScreenId to Screen 1", source.id);
        return source.id;
      } else {
        console.log("Found source", source.name);
      }
    }
    return null;
  });
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
