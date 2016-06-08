

const talkReducer = (state={color:'red'}, action) => {

    switch(action.type) {
        case 'GET_TALK_LISTS':
            return Object.assign({}, state, {test:action.test});
        default:
            return state;
    }
};

export default talkReducer;

