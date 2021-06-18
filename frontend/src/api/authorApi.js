import axioClient from './axiosClient';
const authorApi = {
    getAll: params => {
        const url = '/authors';
        return axioClient.get(url);
    },
};

export default authorApi;
