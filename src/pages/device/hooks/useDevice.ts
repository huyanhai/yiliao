import { ref } from 'vue';
import { deviceInfoInfo } from '@/api';

// 新增一级
const showDialog = ref(false);

const loading = ref(false);

const item = ref<any>({
  code: '',
  name: '',
  hospitalId: '',
  mac: '',
  productKey: '',
  deviceName: '',
  deviceSecret: '',
  deviceType: '',
  status: '1',
});

const list = ref([]);

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const formData = ref({
  code: '',
  hospitalName: '',
  status: '',
});

const reset = () => {
  item.value = {
    code: '',
    name: '',
    hospitalId: '',
    mac: '',
    productKey: '',
    deviceName: '',
    deviceSecret: '',
    deviceType: '',
    status: '',
  };
  pagination.value = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
  formData.value = {
    code: '',
    hospitalName: '',
    status: '',
  };
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await deviceInfoInfo({
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

const edit = (items: any) => {
  item.value = JSON.parse(JSON.stringify(items));
  showDialog.value = true;
};

export const useDevice = () => {
  return {
    showDialog,
    item,
    list,
    pagination,
    formData,
    loading,

    getList,
    reset,
    edit,
  };
};
