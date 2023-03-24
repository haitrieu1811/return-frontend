import axios from 'axios';

const httpRequest = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (url, options = {}) => {
    const response = await httpRequest.get(url, options);
    return response.data;
};

export const post = async (url, data) => {
    const response = await httpRequest.post(url, data);
    return response.data;
};

export const put = async (url, data) => {
    const response = await httpRequest.put(url, data);
    return response.data;
};

export const remove = async (url, options = {}) => {
    const response = await httpRequest.delete(url, options);
    return response.data;
};

export default httpRequest;
