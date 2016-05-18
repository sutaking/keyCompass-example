import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill";

import MainPage from './pages/main';
import WelcomePage from './pages/welcome';

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
        }, 1000);

        return (this.state.showData ? <MainPage/> : <WelcomePage/>);
    }
});

ReactDOM.render(
    <TEDapp />, document.getElementById('container')
);

