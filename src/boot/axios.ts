import Vue from 'vue';
import axios, { AxiosRequestConfig } from 'axios';
import { AxiosInstance } from 'axios';
import { API_BASE_URL, API_TIMEOUT } from '../config/constants';
import db from '../config/db';
import AuthDTO from '../interfaces/AuthDTO.interface';
import store from '../store';
import router from '../router';

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

let isRefreshing = false;
// @ts-ignore
let subscribers = [];

// @ts-ignore
function addSubscriber(cb) {
  subscribers.push(cb);
}

function onRefreshed() {
  // @ts-ignore
  subscribers.filter(cb => cb());
}

myAxios.interceptors.response.use(
  response => response,
  error => {
    const {
      config,
      response: { status, data }
    } = error;

    const originalRequest = config;

    if (data.message === 'The refresh token is invalid.') {
      db.remove('authToken');
      // @ts-ignore
      router().go('/');
      return Promise.reject(false);
    }

    // if (originalRequest.url.includes('token')) {
    //   return Promise.reject(false);
    // }

    if (
      status === 401 &&
      data.message ===
        'An Exception occurred when trying to authenticate the User.'
    ) {
      if (!isRefreshing) {
        isRefreshing = true;
        store
          .dispatch('auth/refreshToken')
          .then(res => {
            if (res.status === 200) {
              isRefreshing = false;
              onRefreshed();
            }
            subscribers = [];
          })
          .catch(error => {
            console.log(error);
          });
      }

      const retryOriginalRequest = new Promise(resolve => {
        addSubscriber(() => {
          resolve(myAxios(originalRequest));
        });
      });

      return retryOriginalRequest;
    }
    return Promise.reject(error);
  }
);

subscribers = [];

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
