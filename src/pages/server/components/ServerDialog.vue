<template>
  <a-modal v-model:visible="showDialog" title="添加医生" width="600px" :closable="false">
    <a-form :model="form" :label-col="{ span: 4 }">
      <a-form-item label="一级分类" name="username">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="描述" name="username">
        <a-textarea v-model:value="form.introduction" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button type="primary" @click="confirm">提交</a-button>
        <a-button @click="reset">返回</a-button>
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { useServer } from '../hooks/useServer';
import { departmentInfoInsert } from '@/api';

const { showDialog, getList } = useServer();

const form = ref({
  name: '',
  introduction: '',
});

const reset = () => {
  form.value.name = '';
  showDialog.value = false;
};

const confirm = async () => {
  const { success } = await departmentInfoInsert(form.value);
  if (success) {
    reset();
    getList();
  }
};
</script>

<style lang="scss" scoped></style>
