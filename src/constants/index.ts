import { computed } from 'vue';
import { useDictStore } from '@/store';

const dict = useDictStore();

export const tsystemType = computed(() => {
  const maps = {};
  dict.dict.map((item) => {
    if (item.code === 'system_type') {
      maps[item.codeValue] = item.codeName;
    }
    return item;
  });
  return maps;
});

export const tdoctorTitleType = computed(() => {
  const maps = {};
  dict.dict.map((item) => {
    if (item.code === 'doctor_title_type') {
      maps[item.codeValue] = item.codeName;
    }
    return item;
  });
  return maps;
});

export const thospitalType = computed(() => {
  const maps = {};
  dict.dict.map((item) => {
    if (item.code === 'hospital_type') {
      maps[item.codeValue] = item.codeName;
    }
    return item;
  });
  return maps;
});

export const thospitalLevel = computed(() => {
  const maps = {};
  dict.dict.map((item) => {
    if (item.code === 'hospital_level') {
      maps[item.codeValue] = item.codeName;
    }
    return item;
  });
  return maps;
});

export const btnType = {
  1: '系统',
  2: '目录',
  3: '页面',
  4: '按钮',
};
