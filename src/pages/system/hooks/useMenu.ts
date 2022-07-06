import { ref } from 'vue';
import { permissionInfoInfo, permissionInfoAll, permissionUpdateEnabled } from '@/api';
import { getTree } from '@/utils/tools';

const showDialog = ref(false);

const loading = ref(false);

const item = ref<any>({
  parentId: '',
  name: '',
  permissionType: '',
  systemType: '',
  route: '',
  sort: '',
  enabled: '1',
});

const list = ref([]);

const allPermission = ref([]);

const pagination = ref({
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 0,
});

const formData = ref({
  permissionType: '',
  systemType: '',
});

const reset = () => {
  item.value = {
    parentId: '',
    name: '',
    permissionType: '',
    systemType: '',
    enabled: '1',
    route: '',
    sort: '',
  };
  pagination.value = {
    defaultCurrent: 1,
    defaultPageSize: 10,
    total: 0,
  };
  formData.value = {
    systemType: '',
    permissionType: '',
  };
};

const getList = async () => {
  loading.value = true;
  const { data = [], success } = await permissionInfoInfo({
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

const getAllPermission = async () => {
  const { data } = await permissionInfoAll();
  const arrs = [
    {
      name: '无',
      id: '',
      key: '',
      permissionType: -1,
      children: [],
    },
  ];

  arrs[0].children = getTree(data, '', []);
  allPermission.value = arrs;
};

const edit = (items: any) => {
  item.value = JSON.parse(JSON.stringify(items));
  item.value.enabled = item.value.enabled ? 1 : 2;
  showDialog.value = true;
  getAllPermission();
};

const disable = (items: any) => {
  permissionUpdateEnabled({
    id: items.id,
    enabled: items.enabled,
  }).then(() => {
    getList();
  });
};

export const useMenu = () => {
  return {
    showDialog,
    item,
    list,
    pagination,
    formData,
    loading,
    allPermission,

    getList,
    reset,
    edit,
    getAllPermission,
    disable,
  };
};
