import actionTypes from '../actions/actionTypes';

const initState = {
    isLoggedIn: false,
    userLoggedIn: {},
    savedPosts: [],
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        // REGISTER
        case actionTypes.USER_REGISTER_START:
            console.log('>>> USER_REGISTER_START');
            return state;

        case actionTypes.USER_REGISTER_SUCCESS:
            console.log('>>> USER_REGISTER_SUCCESS');
            return {
                ...state,
                isLoadingRegister: false,
                registerMessage: action.payload,
            };

        case actionTypes.USER_REGISTER_FAIL:
            console.log('>>> USER_REGISTER_FAIL');
            return {
                ...state,
                registerMessage: action.payload,
            };

        // LOGIN
        case actionTypes.USER_LOGIN_START:
            console.log('>>> USER_LOGIN_START');
            return {
                ...state,
                isLoggedIn: false,
            };

        case actionTypes.USER_LOGIN_SUCCESS:
            console.log('>>> USER_LOGIN_SUCCESS');
            return {
                ...state,
                isLoggedIn: true,
                userLoggedIn: action.payload,
            };

        case actionTypes.USER_LOGIN_FAIL:
            console.log('>>> USER_LOGIN_FAIL');
            return {
                ...state,
                isLoggedIn: false,
                userLoggedIn: null,
            };

        // LOGOUT
        case actionTypes.USER_LOGOUT_SUCCESS:
            console.log('>>> USER_LOGOUT_SUCCESS');
            return {
                ...state,
                isLoggedIn: false,
                userLoggedIn: {},
            };

        // UPDATE
        case actionTypes.USER_UPDATE_START:
            console.log('>>> USER_UPDATE_START');
            return state;

        case actionTypes.USER_UPDATE_SUCCESS:
            console.log('>>> USER_UPDATE_SUCCESS');
            return {
                ...state,
                userLoggedIn: action.payload,
            };

        case actionTypes.USER_UPDATE_FAIL:
            console.log('>>> USER_UPDATE_FAIL');
            return state;

        // UPDATE LIKED POSTS
        case actionTypes.UPDATE_LIKED_POSTS_START:
            console.log('>>> UPDATE_LIKED_POSTS_START');
            return state;

        case actionTypes.UPDATE_LIKED_POSTS_SUCCESS:
            console.log('>>> UPDATE_LIKED_POSTS_SUCCESS');
            return {
                ...state,
                userLoggedIn: { ...state.userLoggedIn, likedPosts: action.payload },
            };

        case actionTypes.UPDATE_LIKED_POSTS_FAIL:
            console.log('>>> UPDATE_LIKED_POSTS_FAIL');
            return state;

        // UPDATE SAVED POSTS
        case actionTypes.UPDATE_SAVED_POSTS_START:
            console.log('>>> UPDATE_SAVED_POSTS_START');
            return state;

        case actionTypes.UPDATE_SAVED_POSTS_SUCCESS:
            console.log('>>> UPDATE_SAVED_POSTS_SUCCESS');
            return {
                ...state,
                userLoggedIn: { ...state.userLoggedIn, savedPosts: action.payload },
            };

        case actionTypes.UPDATE_SAVED_POSTS_FAIL:
            console.log('>>> UPDATE_SAVED_POSTS_FAIL');
            return state;

        default:
            return state;
    }
};

export default userReducer;
