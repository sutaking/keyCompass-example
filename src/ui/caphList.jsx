import React from 'react';
import ReactDOM from 'react-dom';

var itemWidth,itemHeight, limitRows, limitCols, listAreaWidth, listLength;

const caphList = React.createClass({

    propTypes: {

        /**
         * Direction of layout for columns.
         */
        direction: React.PropTypes.string,

        /**
         * Override the inline-styles of the root element.
         */
        style: React.PropTypes.object,

        /**
         * Number of px for one cell height.
         */
        itemHeigh: React.PropTypes.number,

        /**
         * Ratio of cell height.
         */
        aspectRatio: React.PropTypes.number,

        /**
         * Number of px for the padding/spacing between items.
         */
        padding: React.PropTypes.number,

        /**
         * event func for focus.
         */
        scrollArea: React.PropTypes.func

    },

    getInitialState() {
        return {};
    },

    getLimit(total, width) {
        return Math.floor((total+this.props.padding-1)/width);
    },

    initListLayout() {
        const props = this.props;
        
        listAreaWidth = props.style.width;

        itemWidth = this.getItemWidth(props.itemHeigh, props.aspectRatio)+props.padding;
        itemHeight = props.itemHeigh + props.padding;
        limitRows = this.getLimit(listAreaWidth, itemWidth);
        limitCols = this.getLimit(this.props.style.height, itemHeight);
    },

    isListEnd(index) {
        if(Math.floor(listLength/limitRows) === (index/limitRows)) {
            return true;
        }
        return false;
    },

    moveList(index, item, keyCode) {
        this.initListLayout();
        const props = this.props;

        var currentList = ReactDOM.findDOMNode(this);
        const listAreaOffset = currentList.getBoundingClientRect().left;
        
        const keyMap = {
            LEFT: 37,
            RIGHT: 39,
            UP: 38,
            DOWN: 40
        }
        
        const itemOffset = item.getBoundingClientRect();

        function getScrollIndex (_index) {
            return (Math.floor(_index/limitCols))+1-limitRows;
        };

        function getIndexVertical (keyCode) {
            var num = (index/limitRows)-limitCols+1;
            var num1 = num>0 ? Math.floor(num) : 0;

            if (keyCode === keyMap.DOWN) {
                return num1;
            }
            else {
                if(itemOffset.top > itemHeight) {
                    return;
                }
                //console.log(Math.floor(index/limitRows));
                return Math.floor(index/limitRows);
            }
        };

        function keyCodeLeft () {
            if(itemOffset.right > itemWidth) {
                return;
            }
            return Math.floor(index/limitCols);
        };

        function keyCodeRight () {
            if((itemOffset.left+itemWidth) < listAreaWidth) {
                return;
            }
            return getScrollIndex(index);
        };

        var distance = {};
        if (props.direction === 'v' || props.direction === 'V') {
            switch(keyCode) {
                case keyMap.UP:
                case keyMap.DOWN:
                    this._handleScrollVertical(getIndexVertical(keyCode));
                    break;
            }
        }
        else {
            switch(keyCode) {
                case keyMap.LEFT:
                    this._handleScrollHorizontal(keyCodeLeft());
                    break;
                case keyMap.RIGHT:
                    this._handleScrollHorizontal(keyCodeRight());
                    break;
            }
        }
    },
    
    _handleScrollVertical(pos, index) {
        //console.log('index:'+index+', movetop:'+pos);
        var moveListStyle = {
            transition: '.5s transform ease-out',
            transform: 'translate3d(0,'+ pos * -itemHeight +'px,0)',
        };
        this.setState({
            moveListStyle: moveListStyle 
        });
    },

    _handleScrollHorizontal(pos, index) {
        //console.log('index:'+index+', moveleft:'+pos.left+', movetop:'+pos.top);
        var moveListStyle = {
            transition: '.5s transform ease-out',
            transform: 'translate3d('+ pos * -itemWidth +'px,0,0)',
        };
        this.setState({
            moveListStyle: moveListStyle 
        });
    },

    getItemWidth(height, ratio) {

        switch(ratio) {
            case 0:
                return height;
            case 1:
                return height/3*4;
            case 2:
                return height/4*3;
            case 3:
                return height/10*16;
            case 4:
                return height/16*10;
            default:
                return height;
        }
    },

    getPositionItem(index, width) {
        const props = this.props;
        const itemViewWidth = width + props.padding;
        const itemViewHeight = props.itemHeigh + props.padding;

        var getTopIndex = function(_index) {
            if(props.direction === 'V' || props.direction === 'v') {
                return Math.floor(_index/limitRows);
            }
            //console.log(_index+' top:'+_index%props.cols);
            return _index%limitCols;
        };

        var getLeftIndex = function(_index) {
            //console.log(_index+' left:'+Math.floor(_index/props.cols));
            if(props.direction === 'V' || props.direction === 'v') {
                return _index%limitRows;
            }
            return Math.floor(_index/limitCols);
        };

        var itemTop = getTopIndex(index)*itemViewHeight;
        var itemLeft = getLeftIndex(index)*itemViewWidth;

        //console.log('index:'+index+', itemTop:'+itemTop+', itemLeft:'+itemLeft);
        return {itemLeft, itemTop}
    },

    render() {
        const props = this.props;
        this.initListLayout();

        const listChildren = React.Children.map(this.props.children, (currentChild, index)=>{
            //console.log(props.itemHeigh);

            const itemWidth = this.getItemWidth(props.itemHeigh, props.aspectRatio);
            const itemPosition = this.getPositionItem(index, itemWidth);

            var positionStyle = {
                width: itemWidth,
                height: props.itemHeigh,
                position: 'absolute',
                transform: 'translate3d('
                            + itemPosition.itemLeft +'px,'
                            + itemPosition.itemTop +'px,0)',
            }
            
            return React.cloneElement(currentChild, 
                {   scrollList: this.moveList,
                    scrollArea: this.props.scrollArea,
                    className: 'list-items',
                    index: index,
                    style:Object.assign({}, currentChild.props.style, positionStyle) 
                });
        });
        listLength = listChildren.length;

        return (<div style={{overflow:'hidden', height: props.style.height, width:props.style.width}}>
            <div
            style={Object.assign({}, this.state.moveListStyle, props.style)}>
            {listChildren}
            </div></div>
        );
    }
});

export default caphList;