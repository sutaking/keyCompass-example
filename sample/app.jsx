import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Router, Route, Link, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import "babel-polyfill";

import { MainPage, WelcomePage, TalkPage, PlaylistTalkPage, PlaylistPage} 
from './pages/index';

import * as reducers from './redux/reducer';
import { fetchTalks } from './redux/action';

import './styles/main.css';
import './styles/button.css';
//import './styles/player.css';

const store = createStore(combineReducers({reducers, routing:routerReducer}), applyMiddleware(thunkMiddleware));
const history = syncHistoryWithStore(browserHistory, store);

const TEDapp = React.createClass({
    getInitialState() {
        return { showData: false};
    },
    _enterApp() {
        this.setState({showData: true});
    },
    render() {
        setTimeout(() => {
            this._enterApp();
        }, 100);
        return (this.state.showData ? <MainPage/> : <WelcomePage/>);
    }
});

function start() {
    ReactDOM.render((
        <Provider store={store}>
            <Router history={history}>
                <Route path='/' component={TEDapp}/>
                <Route path='/talk' component={TalkPage}/>
                <Route path='/playlist' component={PlaylistPage}/>
                <Route path='/playlist-talk' component={PlaylistTalkPage}/>
            </Router>
        </Provider>), document.getElementById('container')
    );
}


store.dispatch(fetchTalks());
start();



