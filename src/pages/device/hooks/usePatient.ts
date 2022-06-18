import { ref } from 'vue';
import { deviceInfoGetPage } from '@/api';

const dataSource = ref([]);

const loading = ref(false);

// 新增一级
const showDialog = ref(false);

// 编辑二级
const editDialog = ref(false);

const item = ref({
  code: '',
  mac: '',
  productKey: '',
  deviceSecret: '',
  deviceType: '',
  status: '',
  name: '',
});

const formData = ref({
  name: '',
  type: '',
  level: '',
});

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const edit = (item: any) => {
  item.value = {};
  editDialog.value = !editDialog.value;
};

export const getList = async () => {
  const { data, success } = await deviceInfoGetPage(formData.value);
  if (success) {
    dataSource.value = data.orders;
    pagination.value.total = data.total;
    pagination.value.defaultCurrent = data.current;
  }
  console.log(data);
};

export const usePatient = () => {
  return {
    dataSource,
    loading,
    showDialog,
    editDialog,
    item,
    formData,
    pagination,

    edit,
    getList,
  };
};
