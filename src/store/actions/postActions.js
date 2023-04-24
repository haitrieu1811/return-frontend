import { toast } from 'react-toastify';

import * as postServices from '~/services/postServices';
import actionTypes from './actionTypes';

// CREATE
export const createPostStart = (data) => {
    return async (dispatch) => {
        try {
            const res = await postServices.createPost(data);

            if (res && res.errCode === 0) {
                dispatch(createPostSuccess());
                toast.success(res.message);
            } else {
                dispatch(createPostFail());
                toast.error(res.message);
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

// READ LIST POST
export const readListPostStart = (userId, page) => {
    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.READ_LIST_POST_START });

            const res = await postServices.getListPosts(userId, page);

            if (res && res.errCode === 0) dispatch(readPostSuccess(res.data));
            else dispatch(readPostFail());
        } catch (e) {
            dispatch(readPostFail());
            console.log(e);
        }
    };
};

export const readPostSuccess = (payload) => ({
    type: actionTypes.READ_LIST_POST_SUCCESS,
    payload,
});

export const readPostFail = () => ({
    type: actionTypes.READ_LIST_POST_FAIL,
});

// UPDATE
export const updatePostStart = (data, postId) => {
    return async (dispatch) => {
        try {
            const res = await postServices.update(data, postId);
            if (res && res.errCode === 0) {
                await dispatch(updatePostSuccess());
                await dispatch(readListPostStart(10));
                toast.success(res.message);
            } else {
                dispatch(updatePostFail());
                toast.error(res.message);
            }
        } catch (e) {
            dispatch(updatePostFail());
            console.log(e);
        }
    };
};

export const updatePostSuccess = () => ({
    type: actionTypes.UPDATE_POST_SUCCESS,
});

export const updatePostFail = () => ({
    type: actionTypes.UPDATE_POST_FAIL,
});

// DELETE
export const deletePostStart = (postId) => {
    return async (dispatch) => {
        try {
            const res = await postServices.handleDelete(postId);
            if (res && res.errCode === 0) {
                await dispatch(deletePostSuccess());

                await dispatch(handleDeleteCommentHistoriesStart(postId));

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

// DELETE ALL COMMENT HISTORIES
export const handleDeleteCommentHistoriesStart = (postId) => {
    return async () => {
        try {
            await postServices.handleDeleteCommentHistories(postId);
        } catch (e) {
            console.log(e);
        }
    };
};

// DELETE COMMENT BY ID
export const handleDeleteCommentById = (commentId) => {
    return async () => {
        try {
            const res = await postServices.handleDeleteCommentById(commentId);
            if (res && res.errCode === 0) toast.success(res.message);
        } catch (e) {
            console.log(e);
        }
    };
};

// DELETE COMMENT REPLY BY ID
export const handleDeleteCommentReplyById = (commentReplyId) => {
    return async () => {
        try {
            const res = await postServices.deleteCommentReply(commentReplyId);
            if (res && res.errCode === 0) toast.success(res.message);
            else toast.error(res.message);
        } catch (e) {
            console.log(e);
        }
    };
};

// DELETE PHOTO
export const deletePhotoStart = (photoId) => {
    return async () => {
        try {
            const res = await postServices.handleDeletePhotoById(photoId);

            if (res && res.errCode === 0) toast.success(res.message);
            else toast.error(res.message);
        } catch (e) {
            console.log(e);
        }
    };
};
