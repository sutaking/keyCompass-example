import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import { CaphList, CaphListItem } from '../../src/CaphReact'

var onSelected = function(){
    console.log(' - - - - - - - - - onSelected function...');
    // Change depth example
    //Focusable.controllerProvider.getInstance().setDepth(1);
}

var onFocused = function(){
    console.log(' - - - - - - - - - onFocused function...');
}

var onBlurred = function(){
    console.log(' - - - - - - - - - onBlurred function...');
}

const MainPage = React.createClass({

    render() {

        //var listArray = {num:100, title:'Samsung '};
        const stageStyle = {
            background: 'url(./sample/images/bkgrd_watch_anything.jpg) top right no-repeat',
            backgroundSize: '1252px auto'
        }
        return (
            <div id={'myWrapper'} className={'wrapper'}>
                <div id={'stage'} className={'stage stage-transition talk opacity-light'} 
                style={stageStyle}>
                    <div className={'shadow shadow-big'}></div>
                </div>
            </div>            
        );
    }
});

module.exports = MainPage;