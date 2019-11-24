import Vue from 'vue';
import axios from 'axios';
import { AxiosInstance } from 'axios';

axios.defaults.baseURL = 'http://docker.ehso.ir/healthnet/';

Vue.prototype.$axios = axios;

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosInstance;
  }

  interface VueConstructor {
    $axios: AxiosInstance;
  }
}
