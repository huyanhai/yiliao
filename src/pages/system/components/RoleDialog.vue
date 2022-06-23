<template>
  <a-modal v-model:visible="showDialog" title="角色管理" width="600px" :closable="false">
    <a-form ref="formRef" :model="item" :label-col="{ span: 4 }" :rules="rules">
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="item.name" />
      </a-form-item>
      <a-form-item label="角色注备">
        <a-textarea v-model:value="item.remark" />
      </a-form-item>
      <a-form-item label="菜单状态">
        <a-radio-group v-model:value="item.enabled" name="radioGroup">
          <a-radio value="1">启用</a-radio>
          <a-radio value="0">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button type="primary" :loading="loading" @click="confirm">提交</a-button>
        <a-button
          @click="
            reset();
            showDialog = false;
          "
        >
          返回
        </a-button>
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue';

import { ref } from 'vue';
import { useRole } from '../hooks/useRole';
import { roleInfoInsert, roleInfoUpdate } from '@/api';

const { showDialog, item, reset, getList } = useRole();

const formRef = ref<FormInstance>();
const loading = ref(false);

const rules = {
  name: [{ required: true, message: '请输入角色名称' }],
};

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const fn = item.value.id ? roleInfoUpdate : roleInfoInsert;
    const { success } = await fn(item.value).finally(() => {
      loading.value = false;
    });
    if (success) {
      reset();
      getList();
      showDialog.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
