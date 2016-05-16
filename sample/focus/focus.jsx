require('../../style/base.css')

import React from 'react';
import ReactDOM from 'react-dom';

import Focusable from '../../src/focus/focusable';
import Box from './box';

var selected = function(){
    console.log('onSelected function...');
    // Change depth
    Focusable.controllerProvider.getInstance().setDepth(1);
}

var onFocused = function(){
    console.log('onFocused function...');
}

var onBlurred = function(){
    console.log('onBlurred function...');
}

var onMouseEnter = function(){
    console.log('onMouseEnter function...');
}

const DetailContainer = React.createClass({
    render() {
        return <div className = "detail-container">
            <Box focusable = {{name:'detail1', depth:1}} className = "box location-d1" index="depth 1"></Box>
            <Box focusable = {{name:'detail2', depth:1}} className = "box location-d2" index="depth 1"></Box>
        </div>;
    }
});

const FocusSample = React.createClass({
    render() {
        return (<div>
            <div className={'demo-title'}>React CAPH Showcase</div>
            <Box focusable className = "box location1" index="1"></Box>
            <Box focusable = {{name: "focusable s Name",depth:0}} onBlurred = {onBlurred} onFocused = {onFocused} onSelected = {selected} className = "box location2" index="Press enter, to change depth"></Box>
            <Box focusable = {{name:'three'}} className = "box location3" index="3"></Box>
            <Box focusable = {{name:'4'}} className = "box location4" index="4"></Box>
            <Box focusable = {{ initialFocus: true }} className = "box location5" index="5"></Box>
            <DetailContainer></DetailContainer>
        </div>);
    }
});

module.exports = FocusSample;