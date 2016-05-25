import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import "babel-polyfill";

import { MainPage, WelcomePage, TalkPage, PlaylistTalkPage, PlaylistPage} 
from './pages/index'

import './styles/main.css';
import './styles/button.css';
//import './styles/player.css';

import {testJsonp} from './redux/action'

testJsonp();

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
    <Router history={browserHistory}>
        <Route path="/" component={TEDapp}/>
        <Route path="/talk" component={TalkPage}/>
        <Route path="/playlist" component={PlaylistPage}/>
        <Route path="/playlist-talk" component={PlaylistTalkPage}/>
    </Router>), document.getElementById('container')
);

