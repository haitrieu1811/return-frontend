import actionTypes from '../actions/actionTypes';

const initState = {
    createSuccess: false,

    posts: [],
};

const postReducer = (state = initState, action) => {
    switch (action) {
        case actionTypes.CREATE_POST_START:
            console.log('>>> CREATE_POST_START');
            return {
                ...state,
                createSuccess: false,
            };

        case actionTypes.CREATE_POST_SUCCESS:
            console.log('>>> CREATE_POST_SUCCESS');
            return {
                ...state,
                createSuccess: true,
            };

        case actionTypes.CREATE_POST_FAIL:
            console.log('>>> CREATE_POST_FAIL');
            return {
                ...state,
                createSuccess: false,
            };

        default:
            return state;
    }
};

export default postReducer;
