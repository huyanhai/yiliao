import axios from 'axios';
import { message } from 'ant-design-vue';
import { getUserStore } from '@/store';
import release from '@/config/proxy';

const host = process.env.NODE_ENV === 'release' ? release.release.host : '/';

console.log('host', host);

const instance = axios.create({
  baseURL: host,
  timeout: 1000,
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
    if (rawResponse.data?.code !== '0') {
      message.error(rawResponse.data.message);
    }

    return Promise.resolve(rawResponse.data);
  },
  (rawError) => {
    const { data } = rawError.response || {};
    return Promise.reject(data);
  },
);

export default instance;
