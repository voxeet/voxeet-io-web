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
    welcome: "Welcome"
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
    welcome: "Welcome"
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSubmit: false,
      simulcastMode: false,
      isListener: false,
      widgetMode: false,
      isJoiningFromUrl: false,
      useDefaultSettings: true,
      isDemo: false,
      form: {
        conferenceName: "",
        userName: ""
      }
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
    this.toggleConfiguration = this.toggleConfiguration.bind(this);
  }

  componentWillMount() {
    const { conferenceName } = this.props.match.params;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("name");
    if (conferenceName) {
      if (c != null) {
        this.setState({
          isSubmit: true,
          form: { conferenceName: conferenceName, userName: c }
        });
      } else {
        this.setState({
          isJoiningFromUrl: true,
          form: { conferenceName: conferenceName }
        });
      }
    }
  }

  escFunction(event) {
    if (event.keyCode === 13 && !this.state.isSubmit) {
      this.handleClick();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleChangeConferenceName(e) {
    const { form } = this.state;
    form["conferenceName"] = e.target.value;
    this.setState({ form });
  }

  handleChangeUserName(e) {
    const { form } = this.state;
    form["userName"] = e.target.value;
    this.setState({ form });
  }

  toggleConfiguration() {
    this.setState({
      useDefaultSettings: !this.state.useDefaultSettings
    });
  }

  handleOnLeave() {
    /*ReactDOM.unmountComponentAtNode(document.getElementById('voxeet-widget'));
    const oldConferenceName = this.state.form.conferenceName*/
    this.setState({ isSubmit: false, isDemo: false });
    /*this.props.history.push('/')
    window.location.reload()*/
  }

  toggleChangeListener() {
    this.setState({
      isListener: !this.state.isListener
    });
  }

  toggleWidgetMode() {
    this.setState({
      widgetMode: !this.state.widgetMode
    });
  }

  toggleSimulcastMode() {
    this.setState({
      simulcastMode: !this.state.simulcastMode
    });
  }

  handleClick() {
    this.props.history.push("/" + this.state.form.conferenceName);

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
          <div>
            <div className="electron-message-container">
              <div className="electron-center-container">
                <div className="electron-logo-container">
                  <img src={logo} />
                </div>
                {!this.state.widgetMode ? (
                  <Fragment>
                    <div id="loader-container">
                      <div className="loader"></div>
                    </div>
                    <div className="electron-info-container">
                      {strings.electronmessage}
                      <span className="one">.</span>
                      <span className="two">.</span>
                      <span className="three">.</span>
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div className="electron-info-container">
                      {strings.conferenceJoined}
                    </div>
                  </Fragment>
                )}
              </div>
            </div>
          </div>
          <VoxeetConference
            isListener={this.state.isListener}
            widgetMode={this.state.widgetMode}
            simulcastMode={this.state.simulcastMode}
            isDemo={this.state.isDemo}
            configuration={!this.state.useDefaultSettings}
            handleOnLeave={this.handleOnLeave.bind(this)}
            getSources={this.props.getSources}
            userName={this.state.form.userName}
            photoURL={photoURL}
            conferenceName={this.state.form.conferenceName}
          />
        </div>
      );
    }

    return (
      <div>
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
                value={this.state.form.conferenceName}
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
              value={this.state.form.userName}
              onChange={this.handleChangeUserName}
              id="userName"
              type="text"
              className="validate"
            />
          </div>

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
            id="configuration"
            checked={this.state.useDefaultSettings}
            onChange={this.toggleConfiguration}
          />
          <label id="configurationLabel" htmlFor="configuration">
            Connect using default settings
          </label>

          <div className="blockButton">
            <button
              id="join"
              type="button"
              disabled={
                this.state.form.conferenceName.length == 0 ? true : false
              }
              className={
                this.state.form.conferenceName.length == 0
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
          <span>Copyright © 2020 Dolby — {strings.copyright}</span>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  handleJoin: PropTypes.func,
  handleLeave: PropTypes.func,
  getSources: PropTypes.func
};

App.defaultProps = {
  handleJoin: () => {},
  handleLeave: () => {},
  getSources: () => Promise.resolve(null)
};

const mapStateToProps = (state, ownProps) => {
  return { ...state, conferenceName: ownProps.match.params.conferenceName };
};

export default App;
