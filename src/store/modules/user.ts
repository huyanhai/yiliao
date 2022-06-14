import { defineStore } from 'pinia';
import { TOKEN_NAME } from '@/config/global';
import { store } from '@/store';
import { login } from '@/api';

const InitUserInfo = {
  roles: [],
};

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem(TOKEN_NAME), // 默认token不走权限
    userInfo: InitUserInfo,
  }),
  getters: {
    roles: (state) => {
      return state.userInfo?.roles;
    },
  },
  actions: {
    async login(userInfo: Record<string, unknown>) {
      const res = await login({
        loginName: userInfo.account,
        password: userInfo.password,
      });
      if (res.code === '0') {
        this.token = res.data;
        localStorage.setItem(TOKEN_NAME, res.data);
      } else {
        throw res;
      }
    },
    async getUserInfo() {
      this.userInfo = {
        name: 'td_main',
        roles: ['all'],
      };
    },
    async logout() {
      localStorage.removeItem(TOKEN_NAME);
      this.token = '';
      this.userInfo = InitUserInfo;
    },
    async removeToken() {
      this.token = '';
    },
  },
});

export function getUserStore() {
  return useUserStore(store);
}
