import React from 'react';
import { browserHistory } from 'react-router'
import { CaphList, CaphListItem } from '../../src/CaphReact';

var onSelected = function(){
    //console.log(' - - - - - - - - - onSelected function...');
    // Change depth example
    //Focusable.controllerProvider.getInstance().setDepth(1);
    //browserHistory.push('/talk')
}

var onFocused = function(index){
    //console.log(' - - - - onFocused function - - - - - ');

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
            if(!data.newTalks) {
                console.log(1111);
                return(<div/>);
            }
            var talks = data.newTalks.data;
            var items = [];

            var setInit =(index) => {
                var val = false;
                if (index === 0 && this.props.title === 'Newest releases') {val = true;}
                return {initialFocus: val};
            };

            const itemsStyle = {
                color: '#eee',
                fontSize: 40,
                lineHeight: '250px',
                textAlign: 'center',
                WebkitBackgroundSize:'100% auto'
            };

            for(var i=0; i<talks.length; ++i) {
                //console.log(talks[i].talk.photo_urls[0].url)
                items.push(
                    < CaphListItem 
                    key={i}
                    listAreaIndex={this.props.listindex}
                    focusable = {setInit(i)}
                    onSelected = {onSelected}
                    onFocused = {onFocused(i)}
                    onBlurred = {onBlurred}
                    style={Object.assign({}, itemsStyle, {'background': 'url('+talks[i].talk.photo_urls[0].url+')'})}>
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
        };

        const ratio = this.props.size;

        return (
            <div className={'list-area'}>
                <div className={'title font-label'}>{this.props.title}</div>
                <CaphList 
                    itemHeigh={250}
                    aspectRatio={this.props.size}
                    padding={20}
                    direction={'h'}
                    style={styleslistArea}
                    scrollArea={this.props.move}
                >
                    {setItems(this.props.data, this.props.index)}
                </CaphList>
            </div>
        );
    }

});

module.exports = TEDtalkList;