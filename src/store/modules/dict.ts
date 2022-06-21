import { defineStore } from 'pinia';
import { store } from '@/store';
import { sysDictionary, regionCodes, hospitalInfoGets, getAllByHospitalId } from '@/api';
import { getTree } from '@/utils/tools';

export const useDictStore = defineStore('dict', {
  state: () => ({
    dict: JSON.parse(localStorage.getItem('dict')) || [],
    region: JSON.parse(localStorage.getItem('region')) || [],
    hospitalInfo: JSON.parse(localStorage.getItem('hospitalInfo')) || [],
    allHospital: JSON.parse(localStorage.getItem('allHospital')) || [],
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
      const { data = [], success } = await hospitalInfoGets();
      if (success) {
        const datas = getTree(data, '', []);
        this.hospitalInfo = datas;
        localStorage.setItem('hospitalInfo', JSON.stringify(this.hospitalInfo));
      }
    },
    async allByHospitalId(id?: string | number) {
      const { data = [], success } = await getAllByHospitalId({
        hospitalId: id,
      });
      if (success) {
        const datas = getTree(data, '00000000-0000-0000-0000-000000000000', []);
        this.allHospital = datas;
        localStorage.setItem('allHospital', JSON.stringify(this.allHospital));
      }
    },
  },
});

export function getDictStore() {
  return useDictStore(store);
}
