'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Focusable from '../../src/focus/focusable';

const Box = React.createClass({
    mixins: [Focusable.activation],
    getInitialState: function() {
        return {
            className: this.props.className
        };
    },
    render: function() {
        return <div className = {this.state.className } 
        focusable = {this.props.focusable}
        onMouseEnter = { this.state.handleMouseEvent }
        onMouseLeave = { this.state.handleMouseEvent }
        onClick = { this.state.handleMouseEvent } >{this.props.index}</div>;
    }
});

export default Box;