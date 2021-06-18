import axioClient from './axiosClient';

export default {
    getAll: params => {
        const url = '/authors';
        return axioClient.get(url);
    },
};
