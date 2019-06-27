import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './assets/css/index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

import { StoreProvider } from './store'
import ScrollHandler from './components/routing/ScrollHandler'

// use all.css for brands, solid, reg, light (also includes the fontawesome.min.css)
//import '@fortawesome/fontawesome-pro/css/all.min.css'

import '@fortawesome/fontawesome-pro/css/fontawesome.min.css'
import '@fortawesome/fontawesome-pro/css/light.min.css'



// if you want to show the loader when React loads data again
//const showLoader = () => loader.classList.remove('loader--hide');


const RoutedApp = () => {

    
    return (
        <React.StrictMode>
            <StoreProvider>
                
                <Router>
                    <ScrollHandler>
                        <Switch>
                            
                            <Route exact path="/" render={() => {
                                return <App  />
                            }} />
                            <Route path="/:page" render={() => {
                                return <App  />
                            }} />

                        </Switch>
                    </ScrollHandler>
                </Router>
                
            </StoreProvider>
        </React.StrictMode>
    )
}

setTimeout(() => {
    ReactDOM.render(<RoutedApp />, document.getElementById('root'))
},2000)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
