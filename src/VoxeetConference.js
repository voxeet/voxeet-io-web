import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'core-js/es6/';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import thunkMidleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'

import VoxeetSdk from '@voxeet/voxeet-web-sdk'
import { ConferenceRoom, reducer as voxeetReducer } from '@voxeet/react-components'

import './assets/css/voxeet-react-components.css';
class VoxeetConference extends Component {

  componentDidMount() {
    let conferenceName = this.props.conferenceName.trim().toLowerCase().replace(/ /g,'')
    const settings = {
      conferenceAlias: conferenceName,
      consumerKey: 'NWUzZTI4cDc0M2JodQ',
      consumerSecret: 'MjU3MWg4dHBhc2NkZWE5NDlnNWowNmdxNWU'
    };
    const reducers = combineReducers({
      voxeet: voxeetReducer
    });
    let name = this.props.userName
    if (this.props.userName.length == 0) {
      name = 'Guest ' + Math.floor((Math.random() * 100) + 1)
    }
    const userInfo = {
      name: name,
      externalId: this.props.externalId,
      avatarUrl: this.props.photoURL
    };
    var constraints = {
      audio: true,
      video: false
    };
    var videoRatio = {
      width: 1280,
      height: 720
    }
    const configureStore = () => createStore(
      reducers,
      applyMiddleware(thunkMidleware)
    );
    let displayModes = ["tiles", "speaker"]
    if (this.props.isDemo && VoxeetSdk.isElectron) {
      displayModes = ["list", "tiles", "speaker"]
    } else if (VoxeetSdk.isElectron) {
      displayModes = ["tiles", "speaker", "list"]
    }
    ReactDOM.render(
      <Provider store={configureStore()}>
        <ConferenceRoom
          autoJoin
          sdk={this.props.sdk}
          userInfo={userInfo}
          //isWebinar
          //isAdmin
          isDemo={this.props.isDemo}
          liveRecordingEnabled
          videoCodec={"H264"}
          displayModes={displayModes}
          videoRatio={videoRatio}
          handleOnLeave={this.props.handleOnLeave}
          isWidget={false}
          isElectron={VoxeetSdk.isElectron}
          constraints={constraints}
          consumerKey={settings.consumerKey}
          consumerSecret={settings.consumerSecret}
          conferenceAlias={settings.conferenceAlias}
        />
      </Provider>,
      document.getElementById('voxeet-widget')
    )
  }

  render() {
    return (
      <div id="voxeet-widget">
      </div>
    )
  }
}

VoxeetConference.propTypes = {
    conferenceName: PropTypes.string,
    photoURL: PropTypes.string,
    sdk: PropTypes.object,
    isDemo: PropTypes.bool,
    externalId: PropTypes.string,
    userName: PropTypes.string,
    handleOnLeave: PropTypes.func.isRequired
}

VoxeetConference.defaultProps = {
    conferenceName: 'conference_name',
    userName: 'Guest ' + Math.floor((Math.random() * 100) + 1)
}

export default VoxeetConference;
