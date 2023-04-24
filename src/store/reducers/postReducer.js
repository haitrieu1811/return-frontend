import actionTypes from '../actions/actionTypes';

const initState = {
    isLoadingRead: false,
    posts: [],
};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        // CREATE
        case actionTypes.CREATE_POST_START:
            console.log('>>> CREATE_POST_START');
            return state;

        case actionTypes.CREATE_POST_SUCCESS:
            console.log('>>> CREATE_POST_SUCCESS');
            return state;

        case actionTypes.CREATE_POST_FAIL:
            console.log('>>> CREATE_POST_FAIL');
            return state;

        // READ
        case actionTypes.READ_LIST_POST_START:
            console.log('>>> READ_LIST_POST_START');
            return {
                ...state,
                isLoadingRead: true,
            };

        case actionTypes.READ_LIST_POST_SUCCESS:
            console.log('>>> READ_LIST_POST_SUCCESS');
            return {
                ...state,
                posts: action.payload,
                isLoadingRead: false,
            };

        case actionTypes.READ_LIST_POST_FAIL:
            console.log('>>> READ_LIST_POST_FAIL');
            return {
                ...state,
                isLoadingRead: false,
            };

        // UPDATE
        case actionTypes.UPDATE_POST_START:
            console.log('>>> UPDATE_POST_START');
            return state;

        case actionTypes.UPDATE_POST_SUCCESS:
            console.log('>>> UPDATE_POST_SUCCESS');
            return state;

        case actionTypes.UPDATE_POST_FAIL:
            console.log('>>> UPDATE_POST_FAIL');
            return state;

        default:
            return state;
    }
};

export default postReducer;
