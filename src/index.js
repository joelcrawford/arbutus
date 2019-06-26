import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './assets/css/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

import { StoreProvider } from './store'

import { createBrowserHistory } from 'history'
import createHistoryHashObserver from './store/createHistoryHashObserver'

// use all.css for brands, solid, reg, light (also includes the fontawesome.min.css)
//import '@fortawesome/fontawesome-pro/css/all.min.css'

import '@fortawesome/fontawesome-pro/css/fontawesome.min.css'
import '@fortawesome/fontawesome-pro/css/light.min.css'
import '@fortawesome/fontawesome-pro/css/brands.min.css'

const browserHistory = createBrowserHistory()

const RoutedApp = () => {
    return (
        <React.StrictMode>
            <StoreProvider>
                <Router history={createHistoryHashObserver(browserHistory)}>
                    <Switch>
                        <Route exact path="/" component={App} />
                        <Route path="/:page" component={App} />
                    </Switch>
                </Router>
            </StoreProvider>
        </React.StrictMode>
    )
}

ReactDOM.render(<RoutedApp />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
