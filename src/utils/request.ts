import axios from 'axios';
import { getUserStore } from '@/store';

const host = '/';

const CODE = {
  LOGIN_TIMEOUT: 1000,
  REQUEST_SUCCESS: 0,
  REQUEST_FOBID: 1001,
};

const instance = axios.create({
  baseURL: host,
  timeout: 1000,
  withCredentials: true,
});

instance.defaults.timeout = 5000;

instance.interceptors.request.use((config) => {
  const user = getUserStore();
  config.headers.token = user.token;
  return {
    ...config,
    headers: {
      ...config.headers,
    },
    params: {
      ...config.params,
      _t: Date.now(),
    },
  };
});

instance.interceptors.response.use(
  (rawResponse) => {
    // const { config } = rawResponse;
    return Promise.resolve(rawResponse.data);
  },
  (rawError) => {
    const { data } = rawError.response || {};
    return Promise.reject(data);
  },
);

export default instance;
