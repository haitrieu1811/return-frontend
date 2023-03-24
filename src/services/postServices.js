import httpRequest from '~/utils/httpRequest';

export const createPost = async (data) => {
    try {
        const res = await httpRequest.post('post/create', data);
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getAllPosts = async (quantity = 'all', userId) => {
    try {
        const res = await httpRequest.get('post/get-all-posts', {
            params: {
                quantity,
                userId,
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getListPosts = async (userId) => {
    try {
        const res = await httpRequest.get('post/get-list-posts', {
            params: {
                userId,
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
