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
const SESSION_SERVER =
  process.env.SESSION_SERVER || "https://session.voxeet.com";

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
    if (this.props.userName.length === 0) {
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
      case "arthurvoxeet":
        name = "Arthur";
        photoURL = "https://bokoblin.github.io/portfolio/images/ajoli.png";
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
    const configureStore = () =>
      createStore(reducers, applyMiddleware(thunkMidleware));
    let displayModes = ["tiles", "speaker"];
    if (this.props.isDemo && VoxeetSdk.isElectron) {
      displayModes = ["list", "tiles", "speaker"];
    } else if (VoxeetSdk.isElectron) {
      displayModes = ["tiles", "speaker", "list"];
    }
    let accessToken, refreshToken;

    if ('mediaSession' in navigator) {
      /////////////////////////////////////////////////////////////////////////
      /// PIP Controls (Chromium-only: Chrome 91+, Edge 91+)
      ///
      /// Documentation: https://w3c.github.io/mediasession
      /// Notes: These actions are not supported yet on Media Session GMC UI
      /////////////////////////////////////////////////////////////////////////

      let isMicrophoneActive = constraints.audio;
      let isCameraActive = constraints.video;
      const enablePipActions = navigator.mediaSession
          && navigator.mediaSession.setActionHandler
          && navigator.mediaSession.setMicrophoneActive
          && navigator.mediaSession.setCameraActive
          && document.exitPictureInPicture;

      if (enablePipActions) {
        console.log("Pip actions are available!")
        navigator.mediaSession.setMicrophoneActive(isMicrophoneActive);
        navigator.mediaSession.setCameraActive(isCameraActive);

        try {
          navigator.mediaSession.setActionHandler('togglemicrophone', () => {
            isMicrophoneActive = !isMicrophoneActive;
            //FIXME: Use react component like Buttons.ToggleMicrophoneButton.toggle() instead of query selector
            document.querySelector('[data-for=toggle-mute]').click()
            navigator.mediaSession.setMicrophoneActive(isMicrophoneActive);
          });
        } catch(error) {
          console.warn('"togglemicrophone" media session action is not supported.');
        }

        try {
          navigator.mediaSession.setActionHandler('togglecamera', () => {
            isCameraActive = !isCameraActive;
            //FIXME: Use react component like Buttons.ToggleVideoButton.toggle() instead of query selector
            document.querySelector('[data-for=toggle-video]').click()
            navigator.mediaSession.setCameraActive(isCameraActive);
          });
        } catch(error) {
          console.warn('"togglecamera" media session action is not supported.');
        }

        try {
          navigator.mediaSession.setActionHandler("hangup", () => {
            document.exitPictureInPicture();
            navigator.mediaSession.playbackState = "none";
            //FIXME: Use react component like Buttons.HangupButton.leave() instead of query selector
            document.querySelector('[data-for=leave]').click()
          });
        } catch (error) {
          console.warn('"hangup" media session action is not supported.');
        }
      }
    }

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
                    ? !this.props.widgetMode
                    : false
                }
                isListener={this.props.isListener}
                isDemo={this.props.isDemo}
                rtcpmode={"max"}
                liveRecordingEnabled
                videoCodec={"H264"}
                chromeExtensionId={"efdjhmbmjlhomjhnnmpeeillhpnldoje"}
                displayModes={displayModes}
                simulcast={this.props.simulcastMode}
                dvwc={this.props.dvwc}
                dolbyVoice={this.props.dolbyVoice}
                handleOnLeave={this.props.handleOnLeave}
                getSources={this.props.getSources}
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
  dolbyVoice: PropTypes.bool,
  dvwc: PropTypes.bool,
  photoURL: PropTypes.string,
  sdk: PropTypes.object,
  isDemo: PropTypes.bool,
  externalId: PropTypes.string,
  isListener: PropTypes.bool,
  widgetMode: PropTypes.bool,
  configuration: PropTypes.bool,
  userName: PropTypes.string,
  handleOnLeave: PropTypes.func.isRequired,
  getSources: PropTypes.func
};

VoxeetConference.defaultProps = {
  conferenceName: "conference_name",
  userName: "Guest " + Math.floor(Math.random() * 100 + 1),
};

export default VoxeetConference;
