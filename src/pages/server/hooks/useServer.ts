import { ref } from 'vue';
import { departmentInfo } from '@/api';

// 新增一级
const showDialog = ref(false);

// 编辑二级
const editDialog = ref(false);

const loading = ref(false);

const item = ref<any>({});

const list = ref([]);

const formData = ref({
  hospitalId: '',
  nameLevel2: '',
  parentId: '',
  introduction: '',
});

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const reset = () => {
  pagination.value = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
  formData.value = {
    hospitalId: '',
    nameLevel2: '',
    parentId: '',
    introduction: '',
  };
};

const edit = (info: any) => {
  item.value = info;
  editDialog.value = !editDialog.value;
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await departmentInfo({
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

export const useServer = () => {
  return {
    list,
    loading,
    showDialog,
    editDialog,
    item,
    pagination,
    formData,

    getList,
    edit,
    reset,
  };
};
