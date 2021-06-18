import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL_v1,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async config => {
    let tokenStringify = JSON.parse(localStorage.getItem('persist:root')).auth;
    let { token } = JSON.parse(tokenStringify);
    config.headers.Authorization = token || '';
    return config;
});

axiosClient.interceptors.response.use(
    response => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    error => {
        throw error;
    }
);

export default axiosClient;
