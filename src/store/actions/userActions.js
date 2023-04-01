import { toast } from 'react-toastify';

import actionTypes from './actionTypes';
import * as userServices from '~/services/userServices';

// Register
export const userRegisterStart = (email, password, passwordConfirm) => {
    return async (dispatch, setState) => {
        try {
            dispatch({ type: actionTypes.USER_REGISTER_START });

            const data = { email, password, passwordConfirm };
            const res = await userServices.handleRegister(data);

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

// Login
export const userLoginStart = (email, password) => {
    return async (dispatch, setState) => {
        try {
            dispatch({ type: actionTypes.USER_LOGIN_START });

            const data = { email, password };
            const res = await userServices.handleLogin(data);

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

// Logout
export const userLogoutSuccess = () => ({
    type: actionTypes.USER_LOGOUT_SUCCESS,
});

// Update
export const userUpdateStart = (data, userId) => {
    return async (dispatch, setState) => {
        try {
            const res = await userServices.handleUpdate(data);

            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch(userUpdateSuccess(res.data));
                dispatch(readUserProfilePageStart(userId));
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

// Delete
export const deleteUserStart = (userId) => {
    return async (dispatch, setState) => {
        try {
            const res = await userServices.handleDelete(userId);

            if (res && res.errCode === 0) {
                await dispatch(deleteUserSuccess());
                await dispatch(readUsersStart());
                toast.success(res.message);
            } else {
                toast.error(res.message);
                dispatch(deleteUserFail());
            }
        } catch (e) {
            toast.error(e);
            dispatch(deleteUserFail());
            console.log(e);
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,
});

// Read list users
export const readUsersStart = () => {
    return async (dispatch, setState) => {
        try {
            dispatch({ type: actionTypes.READ_LIST_USERS_START });

            const res = await userServices.getAllUsers();

            if (res && res.errCode === 0) {
                dispatch(readUserSuccess(res.data));
            }
        } catch (e) {
            dispatch(readUsersFail());
            console.log(e);
        }
    };
};

export const readUserSuccess = (payload) => ({
    type: actionTypes.READ_LIST_USERS_SUCCESS,
    payload,
});

export const readUsersFail = () => ({
    type: actionTypes.READ_LIST_USERS_FAIL,
});

// Read user profile page
export const readUserProfilePageStart = (userId) => {
    return async (dispatch) => {
        try {
            const res = await userServices.getUserById(userId);
            if (res && res.errCode === 0) {
                dispatch(readUserProfilePageSuccess(res.data));
            } else {
                dispatch(readUserProfilePageFail());
            }
        } catch (e) {
            console.log(e);
        }
    };
};

export const readUserProfilePageSuccess = (payload) => ({
    type: actionTypes.READ_USER_PROFILE_PAGE_SUCCESS,
    payload,
});

export const readUserProfilePageFail = () => ({
    type: actionTypes.READ_USER_PROFILE_PAGE_FAIL,
});
