import * as httpRequest from '~/utils/httpRequest';

export const handleRegister = async (data) => {
    try {
        const res = await httpRequest.post('user/register', data);
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const handleLogin = async (data) => {
    try {
        const res = await httpRequest.post('user/login', data);
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const handleUpdate = async (data) => {
    try {
        const res = await httpRequest.put('user/update', data);
        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getUserById = async (userId) => {
    try {
        const res = await httpRequest.get('user/get-user', {
            params: {
                userId,
            },
        });

        return res;
    } catch (e) {
        console.log(e);
    }
};

export const getAllUsers = async () => {
    try {
        const res = await httpRequest.get('user/get-all');
        return res;
    } catch (e) {
        console.log(e);
    }
};
