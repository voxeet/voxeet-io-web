import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import thunkMidleware from 'redux-thunk'
import { combineReducers, createStore, applyMiddleware } from 'redux'

import { ConferenceRoom, reducer as voxeetReducer } from '@voxeet/react-components'

import '@voxeet/react-components/dist/voxeet-react-components.css';
class VoxeetConference extends Component {

  componentDidMount() {
    const settings = {
      conferenceAlias: this.props.conferenceName,
      //consumerKey: 'NWUzZTI4cDc0M2JodQ',
      //consumerSecret: 'MjU3MWg4dHBhc2NkZWE5NDlnNWowNmdxNWU'
      consumerKey: 'rrd',
      consumerSecret: 'voxeet'
    };
    const reducers = combineReducers({
      voxeet: voxeetReducer
    });
    const userInfo = {
      name: this.props.userName,
      externalId: this.props.externalId,
      avatarUrl: this.props.photoURL
    };
    const configureStore = () => createStore(
      reducers,
      applyMiddleware(thunkMidleware)
    );
    ReactDOM.render(
      <Provider store={configureStore()}>
        <ConferenceRoom
          autoJoin
          userInfo={userInfo}
          //kickOnHangUp
          videoCodec={"H264"}
          //isManualKickAllowed
          handleOnLeave={this.props.handleOnLeave}
          //isWidget={true}
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
    externalId: PropTypes.string,
    userName: PropTypes.string,
    handleOnLeave: PropTypes.func.isRequired
}

VoxeetConference.defaultProps = {
    conferenceName: 'conference_name',
    userName: 'Guest ' + Math.floor((Math.random() * 100) + 1)
}

export default VoxeetConference;
