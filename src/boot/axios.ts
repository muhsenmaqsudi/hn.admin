import Vue from 'vue';
import axios, { AxiosRequestConfig } from 'axios';
import { AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../config/constants';

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

Vue.prototype.$axios = myAxios;

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }

  interface VueConstructor {
    $axios: AxiosInstance;
  }
}
