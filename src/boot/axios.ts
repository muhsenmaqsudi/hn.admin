import Vue from 'vue';
import axios, { AxiosRequestConfig } from 'axios';
import { AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../config/constants';
import db from '../config/db';
import AuthDTO from '../interfaces/AuthDTO.interface';

const axiosConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  responseType: 'json',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
};

const myAxios = axios.create(axiosConfig);

myAxios.interceptors.request.use(
  axiosConfig => {
    const auth: AuthDTO = db.get('authToken');

    if (auth) {
      axiosConfig.headers.Authorization = `${auth.token_type} ${auth.access_token}`;
    }

    return axiosConfig;
  },
  error => Promise.reject(error)
);

Vue.prototype.$axios = myAxios;

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }

  interface VueConstructor {
    $axios: AxiosInstance;
  }
}

export { myAxios };
