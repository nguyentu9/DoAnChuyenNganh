import axiosClient from './axiosClient';

const articleApi = {
    get: id => {
        const url = `/articles/${id}`;
        return axiosClient.get(url);
    },
    getAll: params => {
        const url = '/articles';
        return axiosClient.get(url, { params });
    },
    getAllWithUser: (userRole, params) => {
        const url = `/articles/role/${userRole}`;
        return axiosClient.get(url, { params });
    },
    getReviewers: articleID => {
        const url = `/articles/${articleID}/reviewer/role/editor`;
        return axiosClient.get(url);
    },
    getDetail: (articleID, userRole) => {
        const url = `/articles/${articleID}/role/${userRole}`;
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
