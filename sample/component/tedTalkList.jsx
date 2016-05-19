import React from 'react';
import { CaphList, CaphListItem } from '../../src/CaphReact';

var onSelected = function(){
    //console.log(' - - - - - - - - - onSelected function...');
    // Change depth example
    //Focusable.controllerProvider.getInstance().setDepth(1);
}

var onFocused = function(){
    console.log(' - - - - - - - - - onFocused function...');
}

var onBlurred = function(){
    //console.log(' - - - - - - - - - onBlurred function...');
}

const TEDtalkList = React.createClass({

    render () {

        /*var _handleSelected = function (index) {
            console.log(index);
            //this.props.move(index)
        }*/

        var setItems = (data, index) => {
            var items = [];

            var setInit =(index) => {
                var val = false;
                if (index === 0 && this.props.title === 'Newest releases') {val = true;}
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

            for(var i=0; i<data.length; ++i) {
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
            position: 'absolute',
            left: 112,
            height: 265,
            width: 1920,
            marginTop: 0,
           // overflow: 'hidden'
        };//style={styleslistArea} className={'list-container list-scroll-wrapper'}

        return (
            <div className={'list-area'}>
                <div className={'title font-label'}>{this.props.title}</div>
                <CaphList 
                    itemHeigh={250}
                    aspectRatio={3}
                    padding={20}
                    direction={'h'}
                    style={styleslistArea}
                >
                    {setItems(this.props.data, this.props.index)}
                </CaphList>
            </div>
        );
    }

});

module.exports = TEDtalkList;