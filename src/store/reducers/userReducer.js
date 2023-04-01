import actionTypes from '../actions/actionTypes';

const initState = {
    isLoggedIn: false,
    isLoadingRead: false,
    userLoggedIn: null,

    listUsers: [],
    userProfilePage: [],
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        // Register
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

        // Login
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

        // Logout
        case actionTypes.USER_LOGOUT_SUCCESS:
            console.log('>>> USER_LOGOUT_SUCCESS');
            return {
                ...state,
                isLoggedIn: false,
                userLoggedIn: null,
            };

        // Update
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

        // Read list users
        case actionTypes.READ_LIST_USERS_START:
            console.log('>>> READ_LIST_USERS_START');
            return {
                ...state,
                isLoadingRead: true,
            };

        case actionTypes.READ_LIST_USERS_SUCCESS:
            console.log('>>> READ_LIST_USERS_SUCCESS');
            return {
                ...state,
                users: action.payload,
                isLoadingRead: false,
            };

        case actionTypes.READ_LIST_USERS_FAIL:
            console.log('>>> READ_LIST_USERS_FAIL');
            return {
                ...state,
                isLoadingRead: false,
            };

        // Read user of profile page
        case actionTypes.READ_USER_PROFILE_PAGE_START:
            console.log('>>> READ_USER_PROFILE_PAGE_START');
            return state;

        case actionTypes.READ_USER_PROFILE_PAGE_SUCCESS:
            console.log('>>> READ_USER_PROFILE_PAGE_SUCCESS');
            return {
                ...state,
                userProfilePage: action.payload,
            };

        case actionTypes.READ_USER_PROFILE_PAGE_FAIL:
            console.log('>>> READ_USER_PROFILE_PAGE_FAIL');
            return state;

        default:
            return state;
    }
};

export default userReducer;
