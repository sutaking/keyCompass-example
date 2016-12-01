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

import { updataTalkLists, receiveData, fetchTalks, showData} from '../redux/action';

const mapStateToProps = (newTalks) => ({
    newTalks
});

const mapDispatchToProps = dispatch => ({
    testFunc: () => dispatch(updataTalkLists(1)),
    receiveData: () => dispatch(receiveData())
});

const MainPage = React.createClass({

    propTypes: {
        //dispatch: React.PropTypes.func.isRequired
    },

    getInitialState () {
        //testFunc();
        return {
            getLightClass: 'move-container opacity-light',
            getDrakClass: 'move-container opacity-dark',
            testdata : {
                title: 'Automated playlist',
                name: 'Watch anything',
                more: '18:00 - 105k views - Jun 2016',
                length: 80,
                url: './sample/images/bkgrd_watch_anything.jpg'
            },
            des: 'Do not know what to watch? We will decide for you, from our library of over 1700 talks.'
        };
    },

    scrollArea (index) {
        let moveListStyle = {
            transition: '.5s transform ease-out',
            transform: 'translate3d(0,'+ index * -374 +'px,0)',
        };
        this.setState({
            moveListStyle: moveListStyle 
        });
    },

    componentDidMount() {

    },

    componentWillMount() {

    },

    render() {
        //className={'move-container opacity-light'}
        let props = this.props;
        //console.log(props.newTalks);

        const titles = ['Newest releases','My talks','Trending','Playlists'];
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
                        <TEDtalkList size={3} key={0} listindex={0} move={this.scrollArea} title={'Newest releases'} data={props.newTalks}/>
                    </div>
                </div>
            </div>
        );
    }
});
//<TEDtalkList size={3} key={1} listindex={1} move={this.scrollArea} title={'My talks'} data={this.state.testdata}/>
//<TEDtalkList size={3} key={2} listindex={2} move={this.scrollArea} title={'Trending'} data={this.state.testdata}/>
//<TEDtalkList size={0} key={3} listindex={3} move={this.scrollArea} title={'Playlists'} data={this.state.testdata}/>

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);