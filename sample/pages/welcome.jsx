import React from 'react';

const WelcomePage = React.createClass({
	render() {
		return (
			<div className={'welcome'}>
				<div id={'networkHint'} className={'player-hint font-subheader'} style={{diplay: 'none'}}>
					Network Request Fail
				</div>
			</div>
		);
	}
});
module.exports = WelcomePage;