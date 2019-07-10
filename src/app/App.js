import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import logo from "../static/images/logo.svg";
import "../styles/App.css";
import Sdk from "../sdk";
import VoxeetConference from "./VoxeetConference";
import VoxeetSdk from "@voxeet/voxeet-web-sdk";
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
    copyright: " All rights reserved"
  },
  fr: {
    join: "Rejoindre la conférence",
    name: "Nom",
    admin: "Administrateur",
    joinDemo: "ou tester Voxeet demo",
    conferencename: "Nom de la conférence",
    electronmessage: "Le client Voxeet va démarrer, veuillez patienter",
    conferenceJoined: "Vous êtes dans la conférence",
    copyright: "Tous droits réservés"
  }
});

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isSubmit: false,
        isListener: false,
        widgetMode: false,
        isJoiningFromUrl: false,
        configuration: false,
        isDemo: false,
        form : {
          conferenceName: "",
          userName: ""
        }
      }
      this.handleClick = this.handleClick.bind(this)
      this.handleChangeUserName = this.handleChangeUserName.bind(this)
      this.handleChangeConferenceName = this.handleChangeConferenceName.bind(this)
      this.escFunction = this.escFunction.bind(this)
      this.toggleChangeListener = this.toggleChangeListener.bind(this)
      this.toggleWidgetMode = this.toggleWidgetMode.bind(this)
      this.toggleConfiguration = this.toggleConfiguration.bind(this)
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
      configuration: !this.state.configuration,
    });
  }

  handleOnLeave() {
    /*ReactDOM.unmountComponentAtNode(document.getElementById('voxeet-widget'));
    const oldConferenceName = this.state.form.conferenceName*/
    this.setState({ isSubmit: false });
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
                      <span className="three">.</span>​
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
            <VoxeetConference isListener={this.state.isListener} widgetMode={this.state.widgetMode} isDemo={this.state.isDemo} handleOnLeave={this.handleOnLeave.bind(this)} userName={this.state.form.userName} photoURL={photoURL} conferenceName={this.state.form.conferenceName} />
          </div>
          <VoxeetConference
            isListener={this.state.isListener}
            widgetMode={this.state.widgetMode}
            isDemo={this.state.isDemo}
            handleOnLeave={this.handleOnLeave.bind(this)}
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
            <img src={logo} className="voxeet-logo" alt="logo" />
            <h1>voxeet</h1>
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

          <input type="checkbox" id="configurationMode" checked={this.state.configuration} onChange={this.toggleConfiguration} />
          <label id="configurationModeLabek" htmlFor="configurationMode">Configuration before joining</label>

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
              <span>{strings.join}</span>
            </button>
          </div>
          <button
            className="button-demo"
            type="button"
            onClick={this.handleClickDemo.bind(this)}
          >
            <span>{strings.joinDemo}</span>
          </button>
        </div>
        <div className="copyright">
          Voxeet © 2019 {strings.copyright}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  handleJoin: PropTypes.func,
  handleLeave: PropTypes.func
};

App.defaultProps = {
  handleJoin: () => {},
  handleLeave: () => {}
};

const mapStateToProps = (state, ownProps) => {
  return { ...state, conferenceName: ownProps.match.params.conferenceName };
};

export default App;
