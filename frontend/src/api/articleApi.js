import axiosClient from "./axiosClient";

const articleApi = {
    getAll: (params) => {
        const url = '/product';
        return axiosClient.get(url, { params }); 
    },

    get: (id) => {
        const url = `/product/${id}`;
        return axiosClient.get(url);
    },
}

export default articleApi;