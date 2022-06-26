import { ref } from 'vue';
import { hospitalInfoList, hospitalInfoById } from '@/api';

const list = ref([]);

const loading = ref(false);

const showDialog = ref(false);
const showDetails = ref(false);

const activeItem = ref<{
  [key: string]: any;
}>({
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

const formData = ref({
  name: '',
  type: '',
  level: '',
});

const checkDetails = (item: any) => {
  showDetails.value = true;

  activeItem.value = Object.assign(
    activeItem.value,
    {
      addressArr: [item.provinceId || '', item.cityId || '', item.districtId || ''].filter((item) => item),
    },
    item,
  );
};

const reset = () => {
  formData.value = { name: '', type: '', level: '' };
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

const select = async (item: any) => {
  const { data, success } = await hospitalInfoById({
    id: item.id,
  });
  if (success) {
    data.addressArr = [data.provinceId || '', data.cityId || '', data.districtId].filter((item) => item);
    activeItem.value = data;
    showDialog.value = !showDialog.value;
  }
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await hospitalInfoList({
    pageIndex: pagination.value.defaultCurrent,
    pageSize: pagination.value.defaultPageSize,
    ...formData.value,
  }).finally(() => {
    loading.value = false;
  });

  if (success) {
    list.value = data.records;
    pagination.value.total = data.total;
    pagination.value.defaultCurrent = data.current;
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
    formData,
    showDetails,

    select,
    getList,
    reset,
    checkDetails,
  };
};
