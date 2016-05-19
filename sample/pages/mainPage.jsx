import React from 'react';
//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

//import { Router, Route, Link, browserHistory } from 'react-router';
import {
    MainBackground,
    TedOverview,
    TEDtalkList,
    TedDescription} 
from '../component/tedComponent';

const MainPage = React.createClass({

    getInitialState () {
        return {};
    },

    scrollArea (index) {
        console.log(index);
        var moveListStyle = {
            transition: '.5s transform ease-out',
            transform: 'translate3d(0,'+ index * -298 +'px,0)',
        };
        this.setState({
            moveListStyle: moveListStyle 
        });
    },

    render() {
        //className={'move-container opacity-light'}

        const getLight = 'move-container opacity-light';
        const getDark = 'move-container opacity-dark';

        const testdata = {
            title: 'Automated playlist',
            name: 'Watch anything',
            more: '18:00 - 105k views - Jun 2016',
            length: 15,
            url: './sample/images/bkgrd_watch_anything.jpg'
        };
        const des = 'w Do not know what to watch? We will decide for you, from our library of over 1700 talks.';

        return (
            <div id={'myWrapper'} className={'wrapper'}>
                <MainBackground url={testdata.url}/>
                <div id={'move-container'} className={getLight}>
                    <div className={'logo'}></div>
                    <TedOverview cut={true} data={testdata}/>
                    <div style={{position: 'relative'}}>
                        <div className={'page'}>
                            <TedDescription cut={true} data={des+des+des+des+des+des+des+des}/>
                        </div>
                    </div>
                </div>
                <div className={'list-wrapper page'} style={this.state.moveListStyle}>
                    <div id={'list-category'} className={'list-category'}>
                        <TEDtalkList index={0} move={this.scrollArea} title={'Newest releases'} data={testdata}/>
                        <TEDtalkList index={1} move={this.scrollArea} title={'My talks'} data={testdata}/>
                        <TEDtalkList index={2} move={this.scrollArea} title={'Trending'} data={testdata}/>
                        <TEDtalkList index={3} move={this.scrollArea} title={'Playlists'} data={testdata}/>
                    </div>                    
                </div>
            </div>            
        );
    }
});

module.exports = MainPage;