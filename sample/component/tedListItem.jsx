import React from 'react';
import { CaphList, CaphListItem } from '../../src/CaphReact';


var onSelected = function(){
    //console.log(' - - - - - - - - - onSelected function...');
    // Change depth example
    //Focusable.controllerProvider.getInstance().setDepth(1);
}

var onFocused = function(){
    console.log(' - - - - - - - - - onFocused function...');
}

var onBlurred = function(){
    //console.log(' - - - - - - - - - onBlurred function...');
}

const TedListItem = React.createClass({

    render () {

        //const index = this.props.index;
        const focus = {initialFocus: false};
        const itemsStyle = {
            color: '#eee',
            fontSize: 40,
            lineHeight: '250px',
            textAlign: 'center'
        };//focusable = {this.props.focus}

        return (
            <CaphListItem focusable={{initialFocus: false}} />
        );

    }
});

module.exports = TedListItem;