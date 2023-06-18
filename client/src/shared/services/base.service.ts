import axios, { InternalAxiosRequestConfig } from 'axios';
import { LocalStorageConst } from '../consts';

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

http.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    if (
      !config.url ||
      config.url.indexOf('/auth/login') >= 0 ||
      config.url.indexOf('/auth/refresh') >= 0
    ) {
      return config;
    }

    let accessToken = localStorage.getItem(LocalStorageConst.AuthenToken) || '';
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
