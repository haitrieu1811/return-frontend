import actionTypes from '../actions/actionTypes';

const initState = {
    // isLoadingRegister: false,
    // isRegisterSuccess: false,

    isLoggedIn: false,
    userLoggedIn: null,
};

const userReducer = (state = initState, action) => {
    switch (action.type) {
        // Register
        case actionTypes.USER_REGISTER_START:
            console.log('>>> USER_REGISTER_START');
            return {
                ...state,
                // isLoadingRegister: true,
                // isRegisterSuccess: false,
            };

        case actionTypes.USER_REGISTER_SUCCESS:
            console.log('>>> USER_REGISTER_SUCCESS');
            return {
                ...state,
                isLoadingRegister: false,
                // isRegisterSuccess: true,
                registerMessage: action.payload,
            };

        case actionTypes.USER_REGISTER_FAIL:
            console.log('>>> USER_REGISTER_FAIL');
            return {
                ...state,
                // isLoadingRegister: false,
                // isRegisterSuccess: false,
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

        default:
            return state;
    }
};

export default userReducer;
