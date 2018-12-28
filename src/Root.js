import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'

const Root = ({ }) => (
<Router>
    <Switch>
        <Route 
            path="/:conferenceName" 
            exact
            render = {(props) => <App {...props} handleJoin={global.electronOnJoined} handleLeave={global.electronOnLeft}/>}
         />
        <Route 
            path="/" 
            render = {(props) => <App {...props} handleJoin={global.electronOnJoined} handleLeave={global.electronOnLeft}/>}
        />
    </Switch>
</Router>
)

Root.propTypes = {
}

export default Root