import React from 'react';

const MainBackground = React.createClass({

	render () {

		const stageStyle = {
		    background: 'url(./sample/images/bkgrd_watch_anything.jpg) top right no-repeat',
		    backgroundSize: '1252px auto'
		}

		return (
			<div id={'stage'} className={'stage stage-transition talk opacity-light'} 
			style={stageStyle}>
			    <div className={'shadow shadow-big'}></div>
			</div>
		);
	}

});

module.exports = MainBackground;