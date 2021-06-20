import axiosClient from './axiosClient';

const articleApi = {
    getAll: params => {
        const url = '/articles';
        return axiosClient.get(url, { params });
    },
    getAllWithUser: (userRole, params) => {
        const url = `/articles/role/${userRole}`;
        return axiosClient.get(url, { params });
    },
    getDetail: (articleID, userRole) => {
        const url = `/articles/${articleID}/role/${userRole}`;
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
    putStatusCode: (articleID, userRole, params) => {
        const url = `/articles/${articleID}/status/role/${userRole}`;
        return axiosClient.put(url, params);
    },
};

export default articleApi;
