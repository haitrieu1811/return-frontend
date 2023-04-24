import * as httpRequest from '~/utils/httpRequest';

// REGISTER
export const register = async (data) => {
    try {
        const res = await httpRequest.post('user/register', data);
        return res;
    } catch (e) {
        console.log(e);
    }
};

// LOGIN
export const login = async (username, password) => {
    try {
        const res = await httpRequest.get('user/login', { params: { username, password } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// UPDATE
export const update = async (data) => {
    try {
        const res = await httpRequest.put('user/update', data);
        return res;
    } catch (e) {
        console.log(e);
    }
};

// GET USER
export const getUser = async (userId) => {
    try {
        const res = await httpRequest.get('user/get-user', { params: { userId } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// SEARCH
export const search = async (keyword) => {
    try {
        const res = await httpRequest.get('user/search', { params: { keyword } });
        return res;
    } catch (e) {
        console.log(e);
    }
};

// GET LIST USER
export const getUsers = async (userLoggedInId, page) => {
    try {
        const res = await httpRequest.get('user/get-users', { params: { userLoggedInId, page } });
        return res;
    } catch (e) {
        console.log(e);
    }
};
