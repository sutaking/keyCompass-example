import React from 'react';

const TedButton = React.createClass({

    render () {

        return (
            <div className={'btn-wrapper'}>
                <div className={'btn btn-gap btn-play'}></div>
                <div className={'btn btn-gap btn-add-talks'}></div>
                <div className={'btn btn-gap btn-about-speaker'}></div>
            </div>
        );
    }
});

module.exports = TedButton;