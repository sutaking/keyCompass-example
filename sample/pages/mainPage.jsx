import React from 'react';
import { connect } from 'react-redux';
//import classNames from 'classnames'
//var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

import {
    MainBackground,
    TedOverview,
    TEDtalkList,
    TedDescription} 
from '../component/index';
import { updataTalkLists } from '../redux/action';

const MainPage = React.createClass({

    propTypes: {
        dispatch: React.PropTypes.func.isRequired
    },

    getInitialState () {
        dispatch(updataTalkLists(1));
        console.log(this.state);
        return {
            getLightClass: 'move-container opacity-light',
            getDrakClass: 'move-container opacity-dark',
            testdata : {
                title: 'Automated playlist',
                name: 'Watch anything',
                more: '18:00 - 105k views - Jun 2016',
                length: 15,
                url: './sample/images/bkgrd_watch_anything.jpg'
            },
            des: 'w Do not know what to watch? We will decide for you, from our library of over 1700 talks.'
        };
    },

    scrollArea (index) {
        //console.log(index);
        var moveListStyle = {
            transition: '.5s transform ease-out',
            transform: 'translate3d(0,'+ index * -298 +'px,0)',
        };
        this.setState({
            moveListStyle: moveListStyle 
        });
    },

    componentDidMount() {
        //this.setState();  
    },

    render() {
        //className={'move-container opacity-light'}
        
        let props = this.props;
        //console.log(this.state.testdata);
        return (
            <div id={'myWrapper'} className={'wrapper'}>
                <MainBackground url={this.state.testdata.url}/>
                <div id={'move-container'} className={this.state.getLight}>
                    <div className={'logo'}></div>
                    <TedOverview cut={true} data={this.state.testdata}/>
                    <div style={{position: 'relative'}}>
                        <div className={'page'}>
                            <TedDescription cut={true} 
                            data={this.state.des+this.state.des+this.state.des+this.state.des+this.state.des+this.state.des+this.state.des+this.state.des}/>
                        </div>
                    </div>
                </div>
                <div className={'list-wrapper page'}>
                    <div id={'list-category'} className={'list-category'} style={this.state.moveListStyle}>
                        <TEDtalkList size={3} key={0} move={this.scrollArea} title={'Newest releases'} data={this.state.testdata}/>
                        <TEDtalkList size={0} key={1} move={this.scrollArea} title={'My talks'} data={this.state.testdata}/>
                        <TEDtalkList size={3} key={2} move={this.scrollArea} title={'Trending'} data={this.state.testdata}/>
                        <TEDtalkList size={3} key={3} move={this.scrollArea} title={'Playlists'} data={this.state.testdata}/>
                    </div>
                </div>
            </div>
        );
    }
});

function mapState(state) {
    return {test: state.test};
};

//module.exports = MainPage;
export default connect(mapState)(MainPage);