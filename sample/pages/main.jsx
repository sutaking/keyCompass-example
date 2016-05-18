import React from 'react';
//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import { Router, Route, Link, browserHistory } from 'react-router';

import MainBackground from '../component/background';
import TEDtalkList from '../component/tedtalkList';


const MainPage = React.createClass({


    render() {
        //className={'move-container opacity-light'}

        const getLight = 'move-container opacity-light';
        const getDark = 'move-container opacity-dark';

        return (
            <div id={'myWrapper'} className={'wrapper'}>
                <MainBackground/>
                <div id={'move-container'} className={getLight}>
                    <div className={'logo'}></div>
                    <div className={'overview'}>
                        <div className={'font-body'}>Automated</div>
                        <div className={'font-header'}>Watch anything</div>
                        <div className={'more font-info-dark'}>18:00 - 105k views - Jun 2016</div>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div className={'page'}>
                            <div className={'overview desc font-body'}>
                              Do not know what to watch? We will decide for you, from our library of over 1700 talks.  
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'list-wrapper page'}>
                    <div id={'list-category'} className={'list-category'}>
                        <TEDtalkList title={'Newest releases'}/>
                        <TEDtalkList title={'My talks'}/>
                    </div>                    
                </div>
            </div>            
        );
    }
});

module.exports = MainPage;