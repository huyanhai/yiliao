import { ref } from 'vue';
import { doctorInfo, doctorUpdateEnabled, getAllByHospitalId } from '@/api';
import { getTree } from '@/utils/tools';

// 新增一级
const showDialog = ref(false);

// 编辑二级
const editDialog = ref(false);

const loading = ref(false);

const keshiArr = ref([]);

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
const treeChange = async (v: any) => {
  const { data, success } = await getAllByHospitalId({
    id: v,
  });
  if (success) {
    keshiArr.value = getTree(data, '00000000-0000-0000-0000-000000000000', []);
  }
};

const edit = (items: any) => {
  treeChange(items.id);
  item.value = items;
  showDialog.value = !showDialog.value;
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

const disable = (items: any) => {
  doctorUpdateEnabled({
    id: items.id,
    enabled: items.enabled,
  }).then(() => {
    getList();
  });
};

export const useDoctor = () => {
  return {
    showDialog,
    editDialog,
    item,
    list,
    pagination,
    formData,
    keshiArr,

    treeChange,
    edit,
    getList,
    reset,
    disable,
  };
};
