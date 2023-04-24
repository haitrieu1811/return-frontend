import { toast } from 'react-toastify';

import actionTypes from './actionTypes';
import * as userServices from '~/services/userServices';

// REGISTER
export const userRegisterStart = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.USER_REGISTER_START });

            const res = await userServices.register(data);

            if (res && res.errCode === 0) {
                toast.success('Đăng kí tài khoản thành công');
                dispatch(userRegisterSuccess(res.message));
            } else {
                toast.error(res.message);
                dispatch(userRegisterFail(res.message));
            }
        } catch (e) {
            toast.error('Đăng kí tài khoản thất bại');
            dispatch(userRegisterFail());
            console.log(e);
        }
    };
};

export const userRegisterSuccess = () => ({
    type: actionTypes.USER_REGISTER_SUCCESS,
});

export const userRegisterFail = () => ({
    type: actionTypes.USER_REGISTER_FAIL,
});

// LOGIN
export const userLoginStart = (username, password) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.USER_LOGIN_START });

            const res = await userServices.login(username, password);

            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch(userLoginSuccess(res.data));
            } else {
                toast.error(res.message);
                dispatch(userLoginFail());
            }
        } catch (e) {
            toast.error('Đăng nhập thất bại');
            dispatch(userLoginFail());
            console.log(e);
        }
    };
};

export const userLoginSuccess = (payload) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

// LOGOUT
export const userLogoutSuccess = () => ({
    type: actionTypes.USER_LOGOUT_SUCCESS,
});

// UPDATE
export const userUpdateStart = (data, userId) => {
    return async (dispatch) => {
        try {
            const res = await userServices.update(data);

            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch(userUpdateSuccess(res.data));
            } else {
                toast.error(res.message);
                dispatch(userUpdateFail());
            }
        } catch (e) {
            dispatch(userUpdateFail());
            console.log(e);
        }
    };
};

export const userUpdateSuccess = (payload) => ({
    type: actionTypes.USER_UPDATE_SUCCESS,
    payload,
});

export const userUpdateFail = () => ({
    type: actionTypes.USER_UPDATE_FAIL,
});

// UPDATE LIKED POST
export const updateLikedPostsStart = (newLikedPosts) => {
    return (dispatch) => {
        try {
            dispatch(updateLikedPostsSuccess(newLikedPosts));
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateLikedPostsSuccess = (payload) => ({
    type: actionTypes.UPDATE_LIKED_POSTS_SUCCESS,
    payload: payload,
});

export const updateLikedPostsFail = () => ({
    type: actionTypes.UPDATE_LIKED_POSTS_FAIL,
});

// UPDATE SAVED POST
export const updateSavedPostsStart = (newSavedPosts) => {
    return (dispatch) => {
        try {
            dispatch(updateSavedPostsSuccess(newSavedPosts));
        } catch (e) {
            console.log(e);
        }
    };
};

export const updateSavedPostsSuccess = (payload) => ({
    type: actionTypes.UPDATE_SAVED_POSTS_SUCCESS,
    payload: payload,
});

export const updateSavedPostsFail = () => ({
    type: actionTypes.UPDATE_SAVED_POSTS_FAIL,
});
