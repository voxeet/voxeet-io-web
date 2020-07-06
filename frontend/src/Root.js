import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./app/App";
const { electronOnJoined, electronOnLeft, getSources } = window.electron || {};

const ASSET_PATH = process.env.ASSET_PATH || "/";

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
