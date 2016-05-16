import React from 'react';

import CaphList from '../src/ui/caphList';
import CaphListItem from '../src/ui/caphListItem';


const getStyles = () => {

    const styles = {
        listArea: {
            position: 'relative',
            top: 10,
            left: 30,
            height: 800,
            width:1800,
            marginBottom: 50,
            //background:'red',
        }
    };

    return styles;
};

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

var listDemo = React.createClass({
    getInitialState() {
        return {
            listClass: 'list-warpper'
        };
    },

    /*handleBoxFocus(index) {
        var distance = -350 * index;
        var newListStyle = {
            transform: 'translate3d(0px, ' + distance + 'px, 0)',
            transition:'transform .8s ease-out'
        };
        this.setState({
            newListStyle: newListStyle 
        });
    },*/

    setItems(_index, _num) {
        var items = [];
        var currentIndex = _index;

        var setInit = function(index) {
            var val = false;
            if (index === 0 && currentIndex === 0){val = true;}
            return {initialFocus: val};
        };

        var getItemStyle = function (index) {
            return {
                color: '#eee',
                fontSize: 40,
                lineHeight: '150px',
                textAlign: 'center',
                background: 'url(./img/'+index%15+'.jpg) 100% 100% no-repeat', 
                backgroundSize:'100% 100%'
            }
        };

        for(var i=0; i<_num; ++i) {
            items.push(
                < CaphListItem 
                key={i}
                focusable = {setInit(i)}
                onSelected = {onSelected}
                onFocused = {onFocused}
                onBlurred = {onBlurred}
                style={getItemStyle(i+4*_index)}>
                    <div>GGGGGG</div>
                    <div>OOOOOO</div>
                </CaphListItem>
                );
                //onBoxFocus={_handleBoxFocus}
                //listAreaIndex={_index}
        }
        return items;
    },

    render() {

        var listArray = [
            //{num:10, title:'Amazon '},
            //{num:30, title:'Mi '},
            {num:100, title:'Samsung '}];
        
        var _setItems = this.setItems;

        const styles = getStyles();

        return (
            <div className={this.state.listClass} style={this.state.newListStyle}>
                {listArray.map(function(data, i) {
                    return <div key={i}>
                        <div className={'list-title'}>{data.title+i}</div>

                        <CaphList 
                            itemHeigh={250}
                            aspectRatio={0}
                            padding={20}
                            direction={'h'}
                            style={styles.listArea}
                        >
                            {_setItems(i, data.num)}
                        </CaphList>

                    </div>;
                })}
            </div>
        );
    }
});

module.exports = listDemo;