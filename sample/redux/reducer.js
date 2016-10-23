/*expect(
    //talkReducer(0, {'TEST'});
    count(0)
).toEqual(1)*/

/*export const talkReducer = (state = {isTalkReducer : true}, action) => {
	
    switch(action.type) {
        case 'GET_TALK_LISTS':
        	console.log(action.talks);
            return Object.assign({}, state, {talk:action.talks});
        default:
            return state;
    }
};*/

export const talkReducer = (state, action) => {
    console.log(action);
    switch(action.type) {
        case 'RECEIVE_TALKS':
            console.log(action);
            return action.data.cards || state;
        case 'GET_TALK_LISTS':
            console.log(action);
            return Object.assign({}, state, {talk:action.talks});
        default:
            return state || '';
    }
};

