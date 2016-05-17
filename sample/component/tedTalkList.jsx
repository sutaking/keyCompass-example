import React from 'react';

const TEDtalkList = React.createClass({

	render () {

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

		);
	}

});

module.exports = TEDtalkList;