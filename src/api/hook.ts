import axios, { AxiosRequestConfig } from 'axios';

const getAPIURL = (path: string) => {
    return `${process.env.API_URL || 'http://localhost:8000/'}${path}`;
};

const instance = axios.create({
    baseURL: process.env.API_URL,
});

// Thay thế `any` bằng `unknown` hoặc các kiểu cụ thể hơn
const sendGet = (url: string, params?: Record<string, unknown>) => instance.get(url, { params });

const sendGetFile = (url: string, params?: Record<string, unknown>) => instance.get(url, { params, responseType: 'blob' });

const sendPost = (url: string, params?: Record<string, unknown>, config?: AxiosRequestConfig) => {
    return instance.post(url, params, config);
};

const sendPut = (url: string, params: Record<string, unknown>) => instance.put(url, params);

const sendDelete = (url: string, params?: Record<string, unknown>) => instance.delete(url, { data: params });

export { sendGet, sendGetFile, sendPost, sendDelete, sendPut, instance, getAPIURL };
