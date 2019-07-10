import React, { Component } from "react";
import logo from "../static/images/logo.svg";
import "core-js/es6/";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import thunkMidleware from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";

import VoxeetSdk from "@voxeet/voxeet-web-sdk";
import {
  ConferenceRoom,
  reducer as voxeetReducer
} from "@voxeet/react-components";

import "@voxeet/react-components/dist/voxeet-react-components.css";

class VoxeetConference extends Component {
  componentDidMount() {
    let conferenceName = this.props.conferenceName
      .trim()
      .toLowerCase()
      .replace(/ /g, "");
    const settings = {
      conferenceAlias: conferenceName,
      consumerKey: "NWUzZTI4cDc0M2JodQ",
      consumerSecret: "MjU3MWg4dHBhc2NkZWE5NDlnNWowNmdxNWU"
    };
    const reducers = combineReducers({
      voxeet: voxeetReducer
    });

    let name = this.props.userName;
    let photoURL = this.props.photoURL;
    if (this.props.userName.length == 0) {
      name = "Guest " + Math.floor(Math.random() * 100 + 1);
    }

    switch (name) {
      case "valvoxeet":
        name = "Valentin";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/val.png";
        break;
      case "cocovoxeet":
        name = "Coco";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/coco.png";
        break;
      case "kevinvoxeet":
        name = "Kevin";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/kevin.png";
        break;
      case "vanvoxeet":
        name = "Van";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/van.png";
        break;
      case "totovoxeet":
        name = "Thomas";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/thomas.png";
        break;
      case "raphvoxeet":
        name = "Raphael";
        break;
      case "stephanevoxeet":
        name = "Stephane";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/stephane.jpeg";
        break;
      case "benoitvoxeet":
        name = "Benoit";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/benoit.jpg";
        break;
      case "bernardvoxeet":
        name = "Bernard";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/bernard.png";
        break;
      case "fabienvoxeet":
        name = "Fabien";
        photoURL = "https://s3.amazonaws.com/voxeet-cdn/avatars/fabien.png";
        break;
    }

    const userInfo = {
      name: name,
      avatarUrl: photoURL
    };
    var constraints = {
      audio: true,
      video: true
    };
    var videoRatio = {
      width: 1280,
      height: 720
    };
    const configureStore = () =>
      createStore(reducers, applyMiddleware(thunkMidleware));
    let displayModes = ["tiles", "speaker"];
    if (this.props.isDemo && VoxeetSdk.isElectron) {
      displayModes = ["list", "tiles", "speaker"];
    } else if (VoxeetSdk.isElectron) {
      displayModes = ["tiles", "speaker", "list"];
    }
    ReactDOM.render(
      <Provider context={React.createContext()} store={configureStore()}>
        <ConferenceRoom
          autoJoin
          userInfo={userInfo}
          preConfig={
            this.props.configuration
              ? this.props.widgetMode
                ? false
                : true
              : false
          }
          isListener={this.props.isListener}
          isDemo={this.props.isDemo}
          liveRecordingEnabled
          videoCodec={"H264"}
          chromeExtensionId={"efdjhmbmjlhomjhnnmpeeillhpnldoje"}
          displayModes={displayModes}
          videoRatio={videoRatio}
          handleOnLeave={this.props.handleOnLeave}
          isWidget={this.props.widgetMode}
          isElectron={VoxeetSdk.isElectron}
          constraints={constraints}
          consumerKey={settings.consumerKey}
          consumerSecret={settings.consumerSecret}
          conferenceAlias={settings.conferenceAlias}
        />
      </Provider>,
      document.getElementById("voxeet-widget")
    );
  }

  render() {
    return <div id="voxeet-widget"></div>;
  }
}

VoxeetConference.propTypes = {
  conferenceName: PropTypes.string,
  photoURL: PropTypes.string,
  sdk: PropTypes.object,
  isDemo: PropTypes.bool,
  externalId: PropTypes.string,
  isListener: PropTypes.bool,
  widgetMode: PropTypes.bool,
  configuration: PropTypes.bool,
  userName: PropTypes.string,
  handleOnLeave: PropTypes.func.isRequired
};

VoxeetConference.defaultProps = {
  conferenceName: "conference_name",
  userName: "Guest " + Math.floor(Math.random() * 100 + 1)
};

export default VoxeetConference;
