import { ref } from 'vue';
import { doctorInfo, doctorInfoGetById } from '@/api';

// 新增一级
const showDialog = ref(false);

// 编辑二级
const editDialog = ref(false);

const loading = ref(false);

const item = ref<any>({
  hospitalName: '',
  titleType: '',
  hospitalId: '',
  departmentId1: '',
});

const list = ref([]);

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const formData = ref({
  hospitalName: '',
  name: '',
  departmentId1: '',
});

const reset = () => {
  item.value = {
    hospitalName: '',
    titleType: '',
    hospitalId: '',
    departmentId1: '',
  };
  pagination.value = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
  formData.value = {
    hospitalName: '',
    name: '',
    departmentId1: '',
  };
};

const edit = (item: any) => {
  item.value = {};
  editDialog.value = !editDialog.value;
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await doctorInfo({
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

export const useDoctor = () => {
  return {
    showDialog,
    editDialog,
    item,
    list,
    pagination,
    formData,

    edit,
    getList,
    reset,
  };
};
