import React from 'react';

const TedPlaylistButton = React.createClass({

    render () {

        return (
            <div className={'btn-wrapper btn-wrapper-playlist'}>
                <div className={'btn btn-gap btn-play-all'}></div>
            </div>
        );
    }
});

module.exports = TedPlaylistButton;