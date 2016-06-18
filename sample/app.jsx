import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import "babel-polyfill";

import { MainPage, WelcomePage, TalkPage, PlaylistTalkPage, PlaylistPage} 
from './pages/index';
import configureStore from './redux/store';

import './styles/main.css';
import './styles/button.css';
//import './styles/player.css';

//import {testJsonp} from './redux/action'
//testJsonp();
import { updataTalkLists } from './redux/action';
const store = configureStore();
//store.dispatch(updataTalkLists(1));

const TEDapp = React.createClass({
    getInitialState() {
        return { showData: false};
    },
    _enterApp () {
        this.setState({showData: true});
    },
    render () {

        setTimeout(() => {
            this._enterApp();
        }, 100);
        return (this.state.showData ? <MainPage/> : <WelcomePage/>);
    }
});

ReactDOM.render((
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={TEDapp}/>
            <Route path="/talk" component={TalkPage}/>
            <Route path="/playlist" component={PlaylistPage}/>
            <Route path="/playlist-talk" component={PlaylistTalkPage}/>
        </Router>
    </Provider>), document.getElementById('container')
);

