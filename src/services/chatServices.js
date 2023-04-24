import httpRequest from '~/utils/httpRequest';

export const createChatRoom = async (firstUserId, secondUserId) => {
    try {
        const res = await httpRequest.post('chat/create-room', { firstUserId, secondUserId });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getChatRoom = async (firstUserId, secondUserId) => {
    try {
        const res = await httpRequest.get('chat/get-chat-room', { params: { firstUserId, secondUserId } });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const createMessage = async (data) => {
    try {
        const res = await httpRequest.post('chat/create-message', { data });
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getMessageList = async (chatRoomId, page) => {
    try {
        const res = await httpRequest.get('chat/get-message-list', { params: { chatRoomId, page } });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getListChatRoom = async (userId, page) => {
    try {
        const res = await httpRequest.get('chat/get-list-room-chat', { params: { userId, page } });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getUnreadMessages = async (chatRoomId, userId) => {
    try {
        const res = await httpRequest.get('chat/get-quantity-unread', { params: { chatRoomId, userId } });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const seenMessages = async (chatRoomId, userId) => {
    try {
        const res = await httpRequest.put('chat/seen-message', { chatRoomId, userId });
        return res;
    } catch (e) {
        console.log(e);
    }
};
