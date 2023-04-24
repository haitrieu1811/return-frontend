import * as httpRequest from '~/utils/httpRequest';

// CREATE
export const createPost = async (data) => {
    try {
        const res = await httpRequest.post('post/create', data);
        return res;
    } catch (e) {
        console.log(e);
    }
};

// GET POST
export const getPostById = async (postId) => {
    try {
        const res = await httpRequest.get('post/get-post-by-id', { params: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// GET LIST POSTS
export const getListPosts = async (userId, page) => {
    try {
        const res = await httpRequest.get('post/get-list-posts', { params: { userId, page } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// UPDATE
export const update = async (data, postId) => {
    try {
        const res = await httpRequest.put('post/update', { data, postId });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// DELETE
export const handleDelete = async (postId) => {
    try {
        const res = await httpRequest.destroy('post/delete', { data: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// LIKE
export const handleLike = async (userId, postId) => {
    try {
        const res = await httpRequest.post('post/like', { userId, postId });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// UNLIKE
export const handleUnlike = async (userId, postId) => {
    try {
        const res = await httpRequest.post('post/unlike', { userId, postId });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// COMMENT
export const createComment = async (userId, postId, content) => {
    try {
        const res = await httpRequest.post('post/create-comment', { userId, postId, content });
        console.log(res);
    } catch (e) {
        console.log(e);
    }
};

// GET COMMENTS BY POST ID
export const getCommentsByPostId = async (postId) => {
    try {
        const res = await httpRequest.get('post/get-comments', { params: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const handleDeleteCommentHistories = async (postId) => {
    try {
        const res = await httpRequest.destroy('post/delete-comment-histories', { data: { postId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// DELETE COMMENT
export const handleDeleteCommentById = async (commentId) => {
    try {
        const res = await httpRequest.destroy('post/delete-comment-by-id', { data: { commentId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// DELETE PHOTO
export const handleDeletePhotoById = async (photoId) => {
    try {
        const res = await httpRequest.destroy('post/delete-photo-by-id', { data: { photoId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// CREATE COMMENT REPLY
export const createCommentReply = async (commentId, commentBy, responseId, content) => {
    try {
        const res = await httpRequest.post('post/create-comment-reply', { commentId, commentBy, responseId, content });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// DELETE COMMENT REPLY
export const deleteCommentReply = async (commentReplyId) => {
    try {
        const res = await httpRequest.destroy('post/delete-comment-reply-by-id', { data: { commentReplyId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// GET SAVED LIST
export const getSavedList = async (userId) => {
    try {
        const res = await httpRequest.get('post/saved-list', { params: { userId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// SAVE POST
export const savePost = async (postId, userId, status) => {
    try {
        const res = await httpRequest.post('post/save', { postId, userId, status });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// UNSAVE POST
export const unSavePost = async (postId, userId) => {
    try {
        const res = await httpRequest.destroy('post/un-save', { data: { postId, userId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};
