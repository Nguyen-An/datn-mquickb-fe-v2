import axios, { AxiosRequestConfig } from 'axios';

const getAPIURL = (path: string) => {
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/'}${path}`;
};

// const instance = axios.create({
//     baseURL: process.env.API_URL,
// });

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/',
});

instance.interceptors.request.use(
    function (config) {
        const accessToken = localStorage.getItem('token');
        if(accessToken) {
            config.headers.Authorization = `Bearer ${accessToken ? accessToken : ''}` as string
        }
        // const urlsNoAuth = ['/auth']
        // if (config.url && !urlsNoAuth.includes(config.url)) config.headers.Authorization = `Bearer ${accessToken ? accessToken : ''}` as string
        return config
    },

    function (error) {
        return Promise.reject(error)
    }
)

// Thay thế `any` bằng `unknown` hoặc các kiểu cụ thể hơn
const sendGet = (url: string, params?: Record<string, unknown>) => instance.get(url, { params });

const sendGetFile = (url: string, params?: Record<string, unknown>) => instance.get(url, { params, responseType: 'blob' });

const sendPost = (url: string, params?: Record<string, unknown>) => {
    return instance.post(url, params);
};

const sendPut = (url: string, params: Record<string, unknown>) => instance.put(url, params);

const sendDelete = (url: string, params?: Record<string, unknown>) => instance.delete(url, { data: params });

export { sendGet, sendGetFile, sendPost, sendDelete, sendPut, instance, getAPIURL };
