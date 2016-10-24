import React from 'react';
import { connect } from 'react-redux';

import {
    MainBackground,
    TedOverview,
    TedButton,
    TEDtalkList,
    TedDescription} 
from '../component/index';


const TalkPage = React.createClass({

    render () {

        const des = 'Do not know what to watch? We will decide for you, from our library of over 1700 talks.';
        const testdata = {
            title: 'Talk Page',
            name: 'Talk Page anything',
            more: '18:00 - 105k views - Jun 2016',
            length: 3,
            url: './sample/testdata/bg.jpg'
        };

        return (
            <div id={'myWrapper'} className={'wrapper'}>
                <MainBackground url={testdata.url}/>
                <div id={'move-container'} className={'move-container'}>
                    <div className={'logo'}></div>
                    <TedOverview cut={false} data={testdata}/>
                    <TedDescription cut={false} data={des+des+des+des+des+des+des}/>
                    <TedButton />
                    <div className={'related-talk'}> 
                        <TEDtalkList size={3} title={'Related talks'} data={testdata}/>
                    </div>
                </div>
            </div>
        );
    }
});

//module.exports = TalkPage;
export default connect(state => state)(TalkPage);