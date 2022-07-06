import { ref } from 'vue';
import { userInfo, roleInfoAll, userGetById } from '@/api';

// 新增一级
const showDialog = ref(false);

const loading = ref(false);

// 角色列表
const roleList = ref([]);

const item = ref<any>({
  loginName: '',
  password: '',
  hospitalId: '',
  userName: '',
  roleIds: [],
  telPhone: '',
  enabled: '1',
});

const list = ref([]);

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const formData = ref({
  hospitalId: '',
  userName: '',
  roleId: '',
});

const reset = () => {
  item.value = {
    loginName: '',
    password: '',
    hospitalId: '',
    userName: '',
    roleIds: [],
    telPhone: '',
    enabled: '1',
  };
  pagination.value = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
  formData.value = {
    hospitalId: '',
    userName: '',
    roleId: '',
  };
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await userInfo({
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

const edit = async (items: any) => {
  const { data } = await userGetById({
    id: items.id,
  });
  if (data) {
    item.value = data;
    showDialog.value = true;
  }
};

const getRoleList = async () => {
  const { data, success } = await roleInfoAll();
  if (success) {
    roleList.value = data;
  }
};

export const useAccount = () => {
  return {
    showDialog,
    item,
    list,
    pagination,
    formData,
    loading,
    roleList,

    getList,
    reset,
    edit,
    getRoleList,
  };
};
