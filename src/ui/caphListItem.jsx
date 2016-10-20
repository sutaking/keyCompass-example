'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Focusable from '../focus/focusable';

const CaphListItem = React.createClass({
    mixins: [Focusable.activation],

    propTypes: {

        /**
         * focusable if true.
         */
        focusable: React.PropTypes.object,

        /**
         * index of list item.
         */
        index: React.PropTypes.number,

        scrollArea: React.PropTypes.func,

        listAreaIndex: React.PropTypes.number

    },

    getInitialState: function() {
        return {
            className: this.props.className
        };
    },

    focus: function(keyCode) {
        /*this.setState({
            className: this.props.className + ' focused'
        });*/
        //console.log(this.props.listAreaIndex);
        this.props.scrollList(this.props.index, ReactDOM.findDOMNode(this), keyCode);
        this.props.scrollArea(this.props.listAreaIndex);
    },

    blur: function(keyCode) {
        /*this.setState({
            className: this.props.className
        });*/
    },
    render: function() {
        const props = this.props;

        //onMouseEnter = { this.focus }
        //onMouseLeave = { this.blur } 
        //style={Object.assign({},props.style, props.background)}

        return <div className = {this.state.className}
                focusable = {{ initialFocus: props.focusable}}
                style={props.style}>
                    {props.children}
            </div>;
    }
});

export default CaphListItem;