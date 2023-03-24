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
export const userUpdateStart = (data) => {
    return async (dispatch, setState) => {
        try {
            const res = await userServices.handleUpdate(data);

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
