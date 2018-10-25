import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import store from './store'
import { Router } from 'react-router-dom'

import  appHistory from './history'


ReactDOM.render(
    <Provider store = {store}>
        <Router history={appHistory}>
            <App />
        </Router>
    </Provider>, 
    document.getElementById('root')
)

serviceWorker.unregister()
