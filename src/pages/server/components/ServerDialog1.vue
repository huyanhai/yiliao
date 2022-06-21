<template>
  <a-modal v-model:visible="editDialog" :title="item.name" width="600px" :closable="false">
    <a-form :model="form" :label-col="{ span: 4 }">
      <a-form-item label="二级分类">
        <a-input-group compact>
          <a-input v-model:value="form.name" style="width: calc(100% - 200px)" />
          <a-button @click="addItem">添加</a-button>
        </a-input-group>
        <div style="margin-top: 10px">
          <a-tag
            v-for="(it, index) in children"
            :key="index"
            style="margin-bottom: 5px"
            closable
            @close="close(index)"
            >{{ it }}</a-tag
          >
        </div>
      </a-form-item>
      <a-form-item label="描述">
        <a-textarea v-model:value="item.introduction" disabled />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button
          type="primary"
          @click="
            reset();
            getList();
          "
          >关闭</a-button
        >
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { useServer } from '../hooks/useServer';
import { departmentInfoInsert } from '@/api';

const { editDialog, getList, item } = useServer();

const form = ref({
  name: '',
});

const children = ref([]);

const reset = () => {
  form.value.name = '';
  children.value = [];
  editDialog.value = false;
};

const close = (index: number) => {
  children.value.splice(index, 1);
};

const addItem = async () => {
  if (!form.value.name) return;
  const { success } = await departmentInfoInsert({
    ...item.value,
    parentId: item.value.id,
    name: form.value.name,
  });
  if (success) {
    children.value.push(form.value.name);
  }
};
</script>

<style lang="scss" scoped></style>
