import { ref } from 'vue';
import { patientInfoInfo } from '@/api';

// 新增一级
const showDialog = ref(false);

const loading = ref(false);

const item = ref<any>({
  name: '',
  cardId: '',
  telPhone: '',
  age: '',
  sex: '',
});

const list = ref([]);

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const formData = ref({
  name: '',
});

const reset = () => {
  item.value = {
    name: '',
    cardId: '',
    telPhone: '',
    age: '',
    sex: '',
  };
  pagination.value = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
  formData.value = {
    name: '',
  };
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await patientInfoInfo({
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

export const usePatient = () => {
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
