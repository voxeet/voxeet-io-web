import React, { Component } from "react";
import "core-js/es6/";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import thunkMidleware from "redux-thunk";
import { combineReducers, createStore, applyMiddleware } from "redux";
import axios from "axios";

import VoxeetSdk from "@voxeet/voxeet-web-sdk";
import {
  ConferenceRoom,
  VoxeetProvider,
  reducer as voxeetReducer,
} from "@voxeet/react-components";

import "@voxeet/react-components/dist/voxeet-react-components.css";

const AUTH_SERVER = process.env.AUTH_SERVER || "";

class VoxeetConference extends Component {
  componentDidMount() {
    let conferenceName = this.props.conferenceName
      .trim()
      .toLowerCase()
      .replace(/ /g, "");
    const settings = {
      conferenceAlias: conferenceName,
    };
    const reducers = combineReducers({
      voxeet: voxeetReducer,
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
      avatarUrl: photoURL,
    };
    var constraints = {
      audio: true,
      video: true,
    };
    var videoRatio = {
      width: 1280,
      height: 720,
    };
    const configureStore = () =>
      createStore(reducers, applyMiddleware(thunkMidleware));
    let displayModes = ["tiles", "speaker"];
    if (this.props.isDemo && VoxeetSdk.isElectron) {
      displayModes = ["list", "tiles", "speaker"];
    } else if (VoxeetSdk.isElectron) {
      displayModes = ["tiles", "speaker", "list"];
    }
    let accessToken, refreshToken;

    const doRefreshToken = () => {
      return axios.get(`${AUTH_SERVER}/api/token`, {}).then((response) => {
        accessToken = response.data.access_token;
        refreshToken = response.data.refresh_token;

        return accessToken;
      });
    };

    try {
      let token = "";
      axios
        .get(`${AUTH_SERVER}/api/token`, {})
        .then((response) => {
          //console.log("TOKEN: ", response);

          accessToken = response.data.access_token;
          refreshToken = response.data.refresh_token;

          ReactDOM.render(
            <VoxeetProvider store={configureStore()}>
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
                rtcpMode={"max"}
                liveRecordingEnabled
                videoCodec={"H264"}
                chromeExtensionId={"efdjhmbmjlhomjhnnmpeeillhpnldoje"}
                displayModes={displayModes}
                simulcast={this.props.simulcastMode}
                videoRatio={videoRatio}
                handleOnLeave={this.props.handleOnLeave}
                isWidget={this.props.widgetMode}
                isElectron={VoxeetSdk.isElectron}
                constraints={constraints}
                oauthToken={accessToken}
                refreshTokenCallback={doRefreshToken}
                conferenceAlias={settings.conferenceAlias}
              />
            </VoxeetProvider>,
            document.getElementById("voxeet-widget")
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      alert("Something went wrong : " + e);
    }
  }

  render() {
    return <div id="voxeet-widget"></div>;
  }
}

VoxeetConference.propTypes = {
  conferenceName: PropTypes.string,
  simulcastMode: PropTypes.bool,
  photoURL: PropTypes.string,
  sdk: PropTypes.object,
  isDemo: PropTypes.bool,
  externalId: PropTypes.string,
  isListener: PropTypes.bool,
  widgetMode: PropTypes.bool,
  configuration: PropTypes.bool,
  userName: PropTypes.string,
  handleOnLeave: PropTypes.func.isRequired,
};

VoxeetConference.defaultProps = {
  conferenceName: "conference_name",
  userName: "Guest " + Math.floor(Math.random() * 100 + 1),
};

export default VoxeetConference;
