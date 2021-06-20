import axioClient from './axiosClient';
const reviewerApi = {
    getAll: params => {
        const url = '/reviewers';
        return axioClient.get(url, { params });
    },
};

export default reviewerApi;
