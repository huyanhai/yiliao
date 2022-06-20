import { ref } from 'vue';
import { hospitalInfoList } from '@/api';

const list = ref([]);

const loading = ref(false);

const showDialog = ref(false);
const activeItem = ref({
  address: '',
  cityId: null,
  districtId: null,
  hospitalLevel: '',
  hospitalType: '',
  introduction: '',
  logoFileId: '',
  name: '',
  provinceId: null,
  parentId: '',
  departmentIds: [],
  departments: [],
  addressArr: [],
});

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const reset = () => {
  activeItem.value = {
    address: '',
    cityId: null,
    districtId: null,
    hospitalLevel: '',
    hospitalType: '',
    introduction: '',
    logoFileId: '',
    name: '',
    provinceId: null,
    parentId: '',
    departmentIds: [],
    departments: [],
    addressArr: [],
  };
  pagination.value = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
};

const select = (item: any) => {
  item.hospitalLevel = `${item.hospitalLevel}`;
  item.hospitalType = `${item.hospitalType}`;
  activeItem.value = Object.assign(
    activeItem.value,
    {
      addressArr: [item.provinceId || '', item.cityId || '', item.districtId || ''].filter((item) => item),
    },
    item,
  );
  showDialog.value = !showDialog.value;
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await hospitalInfoList({
    pageIndex: pagination.value.defaultCurrent,
    pageSize: pagination.value.defaultPageSize,
  }).finally(() => {
    loading.value = false;
  });

  if (success) {
    list.value = data.records;
    pagination.value.total = data.total;
    pagination.value.defaultCurrent = data.pages;
    pagination.value.defaultPageSize = data.size;
  }
};

export const useWorkspace = () => {
  return {
    list,
    showDialog,
    activeItem,
    pagination,
    loading,

    select,
    getList,
    reset,
  };
};
