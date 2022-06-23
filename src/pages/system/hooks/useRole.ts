import { ref } from 'vue';
import { roleInfoInfo, roleInfoGetById } from '@/api';

// 新增一级
const showDialog = ref(false);
// 角色权限
const showRoleOpDialog = ref(false);

const loading = ref(false);

// 权限列表
const permissionList = ref([]);

const item = ref<any>({
  name: '',
  enabled: '1',
  remark: '',
});

const list = ref([]);

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const formData = ref({
  enabled: '1',
  name: '',
});

const reset = () => {
  item.value = {
    name: '',
    enabled: false,
    remark: '',
  };
  pagination.value = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
  formData.value = {
    name: '',
    enabled: '',
  };
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await roleInfoInfo({
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

// 操作权限
const setqx = async (items: any) => {
  // showRoleOpDialog.value = true;

  const { data } = await roleInfoGetById({ id: items.id });
  // permissionList
};

export const useRole = () => {
  return {
    showDialog,
    item,
    list,
    pagination,
    formData,
    loading,
    showRoleOpDialog,

    getList,
    reset,
    edit,
    setqx,
  };
};
