import React from 'react';

import {
    MainBackground,
    TedOverview,
    TedPlaylistButton,
    TEDtalkList,
    TedDescription} 
from '../component/tedComponent';

const PlaylistPage = React.createClass({

    render () {
    	const des = 'Amazing, inspiring feats of daring and determination that will bring you everywhere from the high skies to the deep sea.';
    	const testdata = {
    	    title: 'Playlist',
    	    name: 'Extreme sports',
    	    more: '8 talks - 1h 44m',
    	    length: 13,
    	    url: './sample/testdata/Extreme_sports.jpg'
    	};

        return (
        	<div id={'myWrapper'} className={'wrapper'}>
        	    <MainBackground url={testdata.url}/>
        	    <div id={'move-container'} className={'move-container'}>
        	        <div className={'logo'}></div>
        	        <TedOverview cut={false} data={testdata}/>
        	        <TedDescription cut={false} data={des}/>
        	        <TedPlaylistButton />
        	        <div className={'list-wrapper list-wrapper-playlist page'}> 
        	            <TEDtalkList title={'8 talks in this playlist'} data={testdata}/>
        	        </div>
        	    </div>
        	</div>
        );
    }
});

module.exports = PlaylistPage;