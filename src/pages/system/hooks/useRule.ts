import { ref } from 'vue';

// 新增一级
const showDialog = ref(false);

// 编辑二级
const editDialog = ref(false);

const item = ref({});

const edit = (item: any) => {
  item.value = {};
  editDialog.value = !editDialog.value;
};

export const useRule = () => {
  return {
    showDialog,
    editDialog,
    item,
    edit,
  };
};
