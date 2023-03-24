import { toast } from 'react-toastify';

import actionTypes from './actionTypes';
import * as postServices from '~/services/postServices';

export const createPostStart = (data) => {
    return async (dispatch, setState) => {
        try {
            const res = await postServices.createPost(data);

            if (res.data && res.data.errCode === 0) {
                toast.success(res.data.message);
                dispatch(createPostSuccess());
            } else {
                toast.error(res.data.message);
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
