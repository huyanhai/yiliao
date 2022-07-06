import { ref } from 'vue';
import { roleInfoInfo, roleInfoGetById, permissionInfoAll } from '@/api';
import { getTree } from '@/utils/tools';

// 新增一级
const showDialog = ref(false);
// 角色权限
const showRoleOpDialog = ref(false);

const loading = ref(false);

// 权限树
const permissionTree = ref([]);

const activeItem = ref<any>({});

// 权限列表
const permission = ref({
  list: [],
});

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
  showRoleOpDialog.value = true;
  activeItem.value = items;
  const info = await permissionInfoAll();
  const { data } = await roleInfoGetById({ id: items.id });

  permissionTree.value = getTree(info.data, '', []);

  if (data?.permissions) {
    const arr = [];
    (data?.permissions || []).map((item) => {
      arr.push(item.id);
      return item;
    });
    permission.value.list = arr;
  }

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
    permissionTree,
    activeItem,
    permission,

    getList,
    reset,
    edit,
    setqx,
  };
};
