import * as httpRequest from '~/utils/httpRequest';

export const createPost = async (data) => {
    try {
        const res = await httpRequest.post('post/create', data);
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getAllPosts = async () => {
    try {
        const res = await httpRequest.get('post/get-all-posts');
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getListPosts = async (limit) => {
    try {
        const res = await httpRequest.get('post/get-list-posts', { params: { limit } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getPostsByUserId = async (userId) => {
    try {
        const res = await httpRequest.get('post/get-posts-user', {
            params: {
                userId,
            },
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const handleDelete = async (postId) => {
    try {
        const res = await httpRequest.destroy('post/delete', {
            data: {
                postId,
            },
        });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const handleLike = async (userId, postId) => {
    try {
        const res = await httpRequest.post('post/like', { userId, postId });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getLikedPostsIdOfUser = async (userId) => {
    try {
        const res = await httpRequest.get('post/liked-posts-id', { params: { userId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getLikeCount = async (postId) => {
    try {
        const res = await httpRequest.get('post/like-count', { params: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const handleUnlike = async (userId, postId) => {
    try {
        const res = await httpRequest.post('post/unlike', { userId, postId });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const handleCreateComment = async (userId, postId, content) => {
    try {
        const res = await httpRequest.post('post/create-comment', { userId, postId, content });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
};

export const getCommentCount = async (postId) => {
    try {
        const res = await httpRequest.get('post/comment-count', { params: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getCommentsByPostId = async (postId) => {
    try {
        const res = await httpRequest.get('post/get-comments', { params: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getPhotosByPostId = async (postId) => {
    try {
        const res = await httpRequest.get('post/get-photos', { params: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getUsersLikedPost = async (postId) => {
    try {
        const res = await httpRequest.get('post/get-users-liked', { params: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};
