import React from 'react';
import { Router, Route, Link, browserHistory } from 'react-router'

import { CaphList, CaphListItem } from '../../src/CaphReact'

import MainBackground from '../component/background'

var onSelected = function(){
    console.log(' - - - - - - - - - onSelected function...');
    // Change depth example
    //Focusable.controllerProvider.getInstance().setDepth(1);
}

var onFocused = function(){
    console.log(' - - - - - - - - - onFocused function...');
}

var onBlurred = function(){
    console.log(' - - - - - - - - - onBlurred function...');
}

const MainPage = React.createClass({

    render() {
        
        var setItems = function () {
            var items = [];

            var setInit = function(index) {
                var val = false;
                if (index === 0) {val = true;}
                return {initialFocus: val};
            };

            const itemsStyle = {
                //background: 'rgba(105, 105, 105, .5)',
                //opacity: .3
                color: '#eee',
                fontSize: 40,
                lineHeight: '250px',
                textAlign: 'center'
            };

            for(var i=0; i<10; ++i) {
                items.push(
                    < CaphListItem 
                    key={i}
                    focusable = {setInit(i)}
                    onSelected = {onSelected}
                    onFocused = {onFocused}
                    onBlurred = {onBlurred}
                    style={itemsStyle}>{i}
                    </CaphListItem>
                );
            }

            return items;
        };

        const styleslistArea = {
            position: 'relative',
            top: 10,
            left: 30,
            height: 300,
            width:1800,
            marginBottom: 50,
        };

        return (
            <div id={'myWrapper'} className={'wrapper'}>
                <MainBackground/>
                <div id={'move-container'} className={'move-container opacity-light'}>
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
                        <div className={'list-area'}>
                            <div className={'title font-label'}>Newest releases</div>
                            <CaphList 
                                itemHeigh={250}
                                aspectRatio={1}
                                padding={20}
                                direction={'h'}
                                style={styleslistArea}
                            >
                                {setItems()}
                            </CaphList>
                        </div>

                        <div className={'list-area'}>
                            <div className={'title font-label'}>My talks</div>
                            <CaphList 
                                itemHeigh={250}
                                aspectRatio={1}
                                padding={20}
                                direction={'h'}
                                style={styleslistArea}
                            >
                                {setItems()}
                            </CaphList>
                        </div>
                    </div>                    
                </div>
            </div>            
        );
    }
});

module.exports = MainPage;