<template>
  <a-modal v-model:visible="showRoleOpDialog" title="角色管理" width="600px" :closable="false">
    <my-table>
      <a-table-column title="系统" data-index="lastName" />
      <a-table-colum title="模块" data-index="lastName" />
      <a-table-column title="页面名称" data-index="lastName" />
      <a-table-column title="操作" data-index="lastName">
        <template #default="{ record }"> </template>
      </a-table-column>
    </my-table>
    <template #footer>
      <a-space>
        <a-button type="primary" @click="confirm">提交</a-button>
        <a-button
          @click="
            reset();
            showRoleOpDialog = false;
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

const { showRoleOpDialog, item, reset, getList } = useRole();

const formRef = ref<FormInstance>();
const loading = ref(false);

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
      showRoleOpDialog.value = false;
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
