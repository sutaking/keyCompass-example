import React from 'react';

import {
    MainBackground,
    TedOverview,
    TedButton,
    TedDescription} 
from '../component/tedComponent';

const PlaylistTalkPage = React.createClass({

    render () {
        const des = 'Do not know what to watch? We will decide for you, from our library of over 1700 talks.';
        const testdata = {
            title: 'Ethan Page',
            name: 'Talk Page anything',
            more: '18:00 - 105k views - Jun 2016',
            length: 3,
            url: './sample/testdata/bg.jpg'
        };

        const playlistdata = {
            url: './sample/testdata/Extreme_sports_268x268.jpg'
        };

        return (
            <div id={'myWrapper'} className={'wrapper'}>
                <MainBackground url={testdata.url}/>
                <div id={'move-container'} className={'move-container'}>
                    <div className={'logo'}></div>
                    <TedOverview cut={false} data={testdata} playlistInfo={playlistdata}/>
                    <TedDescription cut={false} data={des+des+des+des+des+des+des}/>
                    <TedButton />
                </div>
            </div>
        );
    }
});

module.exports = PlaylistTalkPage;