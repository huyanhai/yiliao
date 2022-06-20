import { defineStore } from 'pinia';
import { store } from '@/store';
import { sysDictionary, regionCodes, hospitalInfoGets } from '@/api';
import { getTree } from '@/utils/tools';

export const useDictStore = defineStore('dict', {
  state: () => ({
    dict: JSON.parse(localStorage.getItem('dict')) || [],
    region: JSON.parse(localStorage.getItem('region')) || [],
    hospitalInfo: JSON.parse(localStorage.getItem('hospitalInfo')) || [],
  }),
  actions: {
    async getDict() {
      if (this.dict.length === 0) {
        const { data = {}, success } = await sysDictionary();
        if (success) {
          this.dict = data;
          localStorage.setItem('dict', JSON.stringify(this.dict));
        }
      }
    },
    async getRegion() {
      if (this.region.length === 0) {
        const { data = [], success } = await regionCodes();
        if (success) {
          this.region = getTree(data, 0, []);
          localStorage.setItem('region', JSON.stringify(this.region));
        }
      }
    },
    async getHospital() {
      if (this.hospitalInfo.length === 0) {
        const { data = [], success } = await hospitalInfoGets();
        if (success) {
          this.hospitalInfo = data;
          localStorage.setItem('hospitalInfo', JSON.stringify(this.hospitalInfo));
        }
      }
    },
  },
});

export function getDictStore() {
  return useDictStore(store);
}
