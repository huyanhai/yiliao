import { ref } from 'vue';

const showDialog = ref(false);
const activeItem = ref({
  departmentIds: [],
  departmentIds1: [],
});

const select = (item: any) => {
  activeItem.value = item;
  showDialog.value = !showDialog.value;
};

export const useWorkspace = () => {
  return {
    showDialog,
    activeItem,

    select,
  };
};
