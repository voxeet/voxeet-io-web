import React, { Component } from 'react';
import PropTypes from 'prop-types'
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import Sdk from './sdk'
import VoxeetConference from './VoxeetConference'
import VoxeetSdk from '@voxeet/voxeet-web-sdk'
import LocalizedStrings from 'react-localization';

let strings = new LocalizedStrings({
 en:{
   join:"Join call",
   name:"Your Name",
   admin:"Admin",
   conferencename:"Your conference name",
   joinDemo: "or experience Voxeet demo",
   electronmessage:"Voxeet is loading, please wait",
   copyright:" All rights reserved"
 },
 fr: {
   join:"Rejoindre la conférence",
   name:"Nom",
   admin:"Administrateur",
   joinDemo: "ou tester Voxeet demo",
   conferencename:"Nom de la conférence",
   electronmessage:"Le client Voxeet va démarrer, veuillez patienter",
   copyright:"Tous droits réservés"
 }
});

class App extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isSubmit: false,
        sdk:null,
        isJoiningFromUrl: false,
        isDemo: false,
        form : {
          conferenceName: "",
          userName: ""
        }
      }
      this.handleClick = this.handleClick.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.escFunction = this.escFunction.bind(this)
  }

  componentWillMount() {
    const { conferenceName } = this.props.match.params
    var url_string = window.location.href;
    var url = new URL(url_string);
    var c = url.searchParams.get("name");
    if (conferenceName) {
      if (c != null) {
        this.setState({ isSubmit: true, form :{ conferenceName: conferenceName, userName: c}})
      } else {
        this.setState({ isJoiningFromUrl: true, form :{ conferenceName: conferenceName}})
      }
    }
  }

  escFunction(event){
      if(event.keyCode === 13 && !this.state.isSubmit) {
          this.handleClick()
      }
    }

  componentDidMount() {
    document.addEventListener("keydown", this.escFunction, false);
  }

  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  }

  handleChange(e) {
    const { form } = this.state;
    form[e.target.name] = e.target.value;
    this.setState({ form });
  }

  handleOnLeave() {
    /*ReactDOM.unmountComponentAtNode(document.getElementById('voxeet-widget'));
    const oldConferenceName = this.state.form.conferenceName*/
    this.setState({ isSubmit: false })
    this.props.history.push('/')
    window.location.reload()
  }

  handleClick() {
    this.props.history.push('/' + this.state.form.conferenceName)
    const sdk = Sdk.create()

    if (VoxeetSdk.isElectron) { // TODO: Check if possible to integrate into the SDK
      navigator.attachMediaStream = function(element, stream) { // Shim for electron
        if (sdk.conference && stream) {
          if (!element.renderer) {
            VideoRenderer.create(element);
          }
          sdk.conference.rtc.attachMediaStream(element.renderer, stream.peerId(), stream.label());
        }
      }
    }

    this.setState({ isJoiningFromUrl: false, sdk: sdk, isSubmit: true})
    this.props.handleJoin();
  }

  handleClickDemo() {
    const sdk = Sdk.create()
    this.setState({ sdk: sdk, isDemo: true, isSubmit: true})
    this.props.handleJoin();
  }

  render() {
    if (this.state.isSubmit) {
        const photoURL = "https://gravatar.com/avatar/" + Math.floor(Math.random() * 1000000) + "?s=200&d=identicon"
        return (
          <div>
            <div>
              <div className="electron-message-container">
                <div className="electron-center-container">
                  <div className="electron-logo-container">
                    <img src={logo} />
                  </div>
                  <div id="loader-container"><div className="loader"></div></div>
                  <div className="electron-info-container">
                    {strings.electronmessage}<span className="one">.</span><span className="two">.</span><span className="three">.</span>​
                  </div>
                </div>
              </div>
            </div>
            <VoxeetConference isDemo={this.state.isDemo} handleOnLeave={this.handleOnLeave.bind(this)} sdk={this.state.sdk} userName={this.state.form.userName} photoURL={photoURL} conferenceName={this.state.form.conferenceName} />
          </div>
        )
    }

    return (
      <div>
        <div className="content-sample">
          <div className="logo">
            <img src={logo} className="voxeet-logo" alt="logo" />
            <h1>voxeet</h1>
          </div>
          { !this.state.isJoiningFromUrl &&
          <div className="input-field">
            <input name="conferenceName" placeholder={strings.conferencename} value={this.state.form.conferenceName} onChange={this.handleChange} id="conferenceName" type="text" className="validate" />
          </div>
          }
          <div className="input-field">
            <input name="userName" placeholder={strings.name} value={this.state.form.userName} onChange={this.handleChange} id="userName" type="text" className="validate" />
          </div>

          <div className="blockButton">
            <button id="join" disabled={ this.state.form.conferenceName.length == 0 ? true : false } className={ this.state.form.conferenceName.length == 0 ? "waves-effect waves-light disable" : "waves-effect waves-light" } onClick={this.handleClick}>
              <span>{strings.join}</span>
            </button>
          </div>
          <button className="button-demo" onClick={this.handleClickDemo.bind(this)}>
            <span>{strings.joinDemo}</span>
          </button>
        </div>
        <div className="copyright">
          Voxeet © 2018 {strings.copyright}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  handleJoin: PropTypes.func,
  handleLeave: PropTypes.func
}

App.defaultProps = {
  handleJoin: () => {},
  handleLeave: () => {}
}

const mapStateToProps = (state, ownProps) => {
  return {...state, conferenceName: ownProps.match.params.conferenceName}
}

export default App;
