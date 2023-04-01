import actionTypes from '../actions/actionTypes';

const initState = {
    createSuccess: false,
    isLoadingRead: false,

    posts: [],
    postsOfUser: [],
};

const postReducer = (state = initState, action) => {
    switch (action.type) {
        // Create
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

        // Read
        case actionTypes.READ_POST_START:
            console.log('>>> READ_POST_START');
            return {
                ...state,
                isLoadingRead: true,
            };

        case actionTypes.READ_POST_SUCCESS:
            console.log('>>> READ_POST_SUCCESS');
            return {
                ...state,
                posts: action.payload,
                isLoadingRead: false,
            };

        case actionTypes.READ_POST_FAIL:
            console.log('>>> READ_POST_FAIL');
            return {
                ...state,
                isLoadingRead: false,
            };

        // Read posts of user
        case actionTypes.READ_POST_OF_USER_START:
            console.log('>>> READ_POST_OF_USER_START');
            return state;

        case actionTypes.READ_POST_OF_USER_SUCCESS:
            console.log('>>> READ_POST_OF_USER_SUCCESS');
            return {
                ...state,
                postsOfUser: action.payload,
            };

        case actionTypes.READ_POST_OF_USER_FAIL:
            console.log('>>> READ_POST_OF_USER_FAIL');
            return state;

        default:
            return state;
    }
};

export default postReducer;
