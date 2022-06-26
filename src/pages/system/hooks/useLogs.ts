import { ref } from 'vue';
import { operationLog } from '@/api';

const showDialog = ref(false);

const loading = ref(false);

const list = ref([]);

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await operationLog({
    pageIndex: pagination.value.defaultCurrent,
    pageSize: pagination.value.defaultPageSize,
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

export const useLogs = () => {
  return {
    showDialog,
    list,
    pagination,
    loading,

    getList,
  };
};
