import { toast } from 'react-toastify';

import actionTypes from './actionTypes';
import * as postServices from '~/services/postServices';

// Create
export const createPostStart = (data) => {
    return async (dispatch, setState) => {
        try {
            const res = await postServices.createPost(data);

            console.log(res);

            if (res && res.errCode === 0) {
                toast.success(res.message);
                dispatch(createPostSuccess());
            } else {
                toast.error(res.message);
                dispatch(createPostFail());
            }
        } catch (e) {
            dispatch(createPostFail());
            console.log(e);
        }
    };
};

export const createPostSuccess = () => ({
    type: actionTypes.CREATE_POST_SUCCESS,
});

export const createPostFail = () => ({
    type: actionTypes.CREATE_POST_FAIL,
});

// Read
export const readPostStart = (limit = 10) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.READ_POST_START });

            const res = await postServices.getListPosts(limit);

            if (res && res.errCode === 0) {
                dispatch(readPostSuccess(res.data));
            } else {
                dispatch(readPostFail());
            }
        } catch (e) {
            dispatch(readPostFail());
            console.log(e);
        }
    };
};

export const readPostSuccess = (payload) => ({
    type: actionTypes.READ_POST_SUCCESS,
    payload,
});

export const readPostFail = () => ({
    type: actionTypes.READ_POST_FAIL,
});

// Read posts of user
export const readPostsOfUserStart = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.READ_POST_OF_USER_START });

            const res = await postServices.getPostsByUserId(userId);

            if (res && res.errCode === 0) {
                dispatch(readPostsOfUserSuccess(res.data));
            } else {
                dispatch(readPostsOfUserFail());
            }
        } catch (e) {
            dispatch(readPostsOfUserFail());
            console.log(e);
        }
    };
};

export const readPostsOfUserSuccess = (payload) => ({
    type: actionTypes.READ_POST_OF_USER_SUCCESS,
    payload,
});

export const readPostsOfUserFail = () => ({
    type: actionTypes.READ_POST_OF_USER_FAIL,
});

// Delete
export const deletePostStart = (postId, userId) => {
    return async (dispatch) => {
        try {
            const res = await postServices.handleDelete(postId);
            if (res && res.errCode === 0) {
                await dispatch(deletePostSuccess());
                await dispatch(readPostStart());
                await dispatch(readPostsOfUserStart(userId));
                toast.success(res.message);
            } else {
                toast.success(res.message);
                dispatch(deletePostFail());
            }
        } catch (e) {
            dispatch(deletePostFail());
            console.log(e);
        }
    };
};

export const deletePostSuccess = () => ({
    type: actionTypes.DELETE_POST_SUCCESS,
});

export const deletePostFail = () => ({
    type: actionTypes.DELETE_POST_FAIL,
});
