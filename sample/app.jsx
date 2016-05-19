import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";

import MainPage from './pages/mainPage';
import WelcomePage from './pages/welcome';
import TalkPage from './pages/talkPage';
import PlaylistTalkPage from './pages/playlistTalkPage';
import PlaylistPage from './pages/playlistPage';


import './styles/main.css';
import './styles/button.css';
//import './styles/player.css';

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

ReactDOM.render(
    <TEDapp />, document.getElementById('container')
);

