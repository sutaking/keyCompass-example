

const talkReducer = (state = {isTalkReducer : true}, action) => {
	//console.log(action);
    switch(action.type) {
        case 'GET_TALK_LISTS':
        	//console.log('action get talk state:');
        	console.log(state);
            return Object.assign({}, state, {getTalktest:action.test});
        default:
            return state;
    }
};

/*expect(
    //talkReducer(0, {'TEST'});
    count(0)
).toEqual(1)*/

export default talkReducer;

