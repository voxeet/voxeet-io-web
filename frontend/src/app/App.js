import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import logo from "../static/images/DDLoader.gif";
import dolbyLogo from "../static/images/icons/DVo_Logo_RGB_V_White.png";
import "../styles/App.css";
import Sdk from "../sdk";
import VoxeetConference from "./VoxeetConference";
// import VoxeetSdk from "@voxeet/voxeet-web-sdk";
import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
  en: {
    join: "Join call",
    name: "Your Name",
    admin: "Admin",
    conferencename: "Your conference name",
    joinDemo: "or experience Voxeet demo",
    electronmessage: "Voxeet is loading, please wait",
    conferenceJoined: "You're in the conference",
    copyright: " All Rights Reserved",
    next: "Next",
    welcome: "Welcome",
  },
  fr: {
    join: "Rejoindre la conférence",
    name: "Nom",
    admin: "Administrateur",
    joinDemo: "ou tester Voxeet demo",
    conferencename: "Nom de la conférence",
    electronmessage: "Le client Voxeet va démarrer, veuillez patienter",
    conferenceJoined: "Vous êtes dans la conférence",
    copyright: "Tous Droits Réservés",
    next: "Next",
    welcome: "Welcome",
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      simulcastMode: false,
      dolbyVoice: true,
      showOptions: false,
      isListener: false,
      widgetMode: false,
      isJoiningFromUrl: false,
      useDefaultSettings: true,
      isDemo: false,
      conferenceName: "",
      userName: "",
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleChangeConferenceName = this.handleChangeConferenceName.bind(
      this
    );
    this.escFunction = this.escFunction.bind(this);
    this.toggleChangeListener = this.toggleChangeListener.bind(this);
    this.toggleWidgetMode = this.toggleWidgetMode.bind(this);
    this.toggleSimulcastMode = this.toggleSimulcastMode.bind(this);
    this.toggleDolbyVoice = this.toggleDolbyVoice.bind(this);
    this.toggleConfiguration = this.toggleConfiguration.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
    //console.log('About to get conf params');
    const { conferenceName } = this.props.match.params;
    let url_string = window.location.href;
    let url = new URL(url_string);
    let name = url.searchParams.get("name");
    let showOptions = url.searchParams.get("options");

    let newState = {};

    if (conferenceName) {
      newState.conferenceName = conferenceName;
      if (name !== null) {
        newState.isSubmit = true;
        newState.serName = name;
      } else {
        newState.isJoiningFromUrl = true;
      }
    }
    if (showOptions !== null) {
      if (
          typeof showOptions === 'string' &&
          ['false', '0', 'no'].indexOf(showOptions.toLowerCase()) !== -1
      ) {
        newState.showOptions = false;
      }
      else {
        newState.showOptions = true;
      }
    } else {
      newState.showOptions = false;
    }
    this.setState(newState);
  }

  escFunction(event) {
    if (event.keyCode === 13 && !this.state.isSubmit) {
      this.handleClick();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleChangeConferenceName(e) {
    let conferenceName = e.target.value;
    this.setState({ conferenceName });
  }

  handleChangeUserName(e) {
    let userName = e.target.value;
    this.setState({ userName });
  }

  toggleConfiguration() {
    this.setState({
      useDefaultSettings: !this.state.useDefaultSettings,
    });
  }

  handleOnLeave() {
    /*ReactDOM.unmountComponentAtNode(document.getElementById('voxeet-widget'));
    const oldConferenceName = this.state.conferenceName*/
    this.setState({ isSubmit: false, isDemo: false });
    /*this.props.history.push('/')
    window.location.reload()*/
  }

  toggleChangeListener() {
    this.setState({
      isListener: !this.state.isListener,
    });
  }

  toggleWidgetMode() {
    this.setState({
      widgetMode: !this.state.widgetMode,
    });
  }

  toggleSimulcastMode() {
    this.setState({
      simulcastMode: !this.state.simulcastMode
    });
  }

  toggleDolbyVoice() {
    this.setState({
      dolbyVoice: !this.state.dolbyVoice
    });
  }

  handleClick() {
    this.props.history.push("/" + this.state.conferenceName);

    /*if (VoxeetSdk.isElectron) { // TODO: Check if possible to integrate into the SDK
      navigator.attachMediaStream = function(element, stream) { // Shim for electron
        if (sdk.conference && stream) {
          if (!element.renderer) {
            VideoRenderer.create(element);
          }
          sdk.conference.rtc.attachMediaStream(element.renderer, stream.peerId(), stream.label());
        }
      }
    }*/

    this.setState({ isJoiningFromUrl: false, isSubmit: true });
    this.props.handleJoin();
  }

  handleClickDemo() {
    const sdk = Sdk.create();
    this.setState({ sdk: sdk, isDemo: true, isSubmit: true });
    this.props.handleJoin();
  }

  render() {
    if (this.state.isSubmit) {
      const photoURL =
        "https://gravatar.com/avatar/" +
        Math.floor(Math.random() * 1000000) +
        "?s=200&d=identicon";
      return (
        <div>
          <VoxeetConference
            isListener={this.state.isListener}
            widgetMode={this.state.widgetMode}
            simulcastMode={this.state.simulcastMode}
            dolbyVoice={this.state.dolbyVoice}
            isDemo={this.state.isDemo}
            configuration={!this.state.useDefaultSettings}
            handleOnLeave={this.handleOnLeave.bind(this)}
            getSources={this.props.getSources}
            userName={this.state.userName}
            photoURL={photoURL}
            conferenceName={this.state.conferenceName}
          />
        </div>
      );
    }

    return (
      <div className="content-wrapper">
        <div className="content-sample">
          <div className="logo">
            <h1>{strings.welcome}</h1>
          </div>
          <div className="dolby-container-logo">
            <img src={dolbyLogo} />
          </div>
          {!this.state.isJoiningFromUrl && (
            <div className="input-field">
              <input
                name="conferenceName"
                placeholder={strings.conferencename}
                value={this.state.conferenceName}
                onChange={this.handleChangeConferenceName}
                id="conferenceName"
                type="text"
                className="validate"
              />
            </div>
          )}
          <div className="input-field">
            <input
              name="userName"
              placeholder={strings.name}
              value={this.state.userName}
              onChange={this.handleChangeUserName}
              id="userName"
              type="text"
              className="validate"
            />
          </div>
          {!this.state.showOptions && <a href="#"
                                        onClick={()=>this.setState({showOptions:true})}
          >
            Show advanced options
          </a>}
          {this.state.showOptions && <React.Fragment>
            <a href="#"
              onClick={()=>this.setState({showOptions:false})}
            >
              Hide advanced options
            </a>
            <input
                type="checkbox"
                id="isListener"
                checked={this.state.isListener}
                onChange={this.toggleChangeListener}
            />
            <label id="isListenerLabel" htmlFor="isListener">
              Join as a listener
            </label>

            <input
                type="checkbox"
                id="widgetMode"
                checked={this.state.widgetMode}
                onChange={this.toggleWidgetMode}
            />
            <label id="widgetModeLabel" htmlFor="widgetMode">
              Widget Mode
            </label>

            <input
                type="checkbox"
                id="simulcast"
                checked={this.state.simulcastMode}
                onChange={this.toggleSimulcastMode}
            />
            <label id="simulcastModeLabel" htmlFor="simulcast">
              Simulcast
            </label>

            <input
                type="checkbox"
                id="dolbyvoice"
                checked={this.state.dolbyVoice}
                onChange={this.toggleDolbyVoice}
            />
            <label id="dolbyVoiceLabel" htmlFor="dolbyvoice">
              Dolby Voice
            </label>

            <input
                type="checkbox"
                id="configuration"
                checked={this.state.useDefaultSettings}
                onChange={this.toggleConfiguration}
            />
            <label id="configurationLabel" htmlFor="configuration">
              Connect using default settings
            </label>
          </React.Fragment>}

          <div className="blockButton">
            <button
              id="join"
              type="button"
              disabled={this.state.conferenceName.length == 0 ? true : false}
              className={
                this.state.conferenceName.length == 0
                  ? "waves-effect waves-light disable"
                  : "waves-effect waves-light"
              }
              onClick={this.handleClick}
            >
              <span>{strings.next}</span>
            </button>
          </div>
          <div className="dolby-container-wrapper">
            <img src={dolbyLogo} />
          </div>
        </div>
        <div className="copyright">
          <span>Copyright © 2021 Dolby — {strings.copyright}</span>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  handleJoin: PropTypes.func,
  handleLeave: PropTypes.func,
  getSources: PropTypes.func,
};

App.defaultProps = {
  handleJoin: () => {},
  handleLeave: () => {},
  getSources: () => Promise.resolve(null),
};

const mapStateToProps = (state, ownProps) => {
  return { ...state, conferenceName: ownProps.match.params.conferenceName };
};

export default App;
