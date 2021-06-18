import axiosClient from './axiosClient';

export default {
    getAll: params => {
        const url = '/articles';
        return axiosClient.get(url, { params });
    },
    getAllWithUser: userRole => {
        const url = `/articles/role/${userRole}`;
        return axiosClient.get(url);
    },
    get: id => {
        const url = `/articles/${id}`;
        return axiosClient.get(url);
    },
    getType: () => {
        const url = `/articles/types`;
        return axiosClient.get(url);
    },
};
