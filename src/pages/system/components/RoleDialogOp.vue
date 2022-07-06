<template>
  <a-modal v-model:visible="showRoleOpDialog" title="权限管理" width="600px" :closable="false">
    <a-form ref="formRef" :model="permission" :label-col="{ span: 4 }" :rules="rules">
      <a-form-item label="" name="systemType">
        <a-tree
          v-model:selectedKeys="permission.list"
          v-model:checkedKeys="permission.list"
          checkable
          style="width: 100%"
          :tree-data="permissionTree"
          :field-names="{
            title: 'name',
            key: 'id',
          }"
        />
      </a-form-item>
    </a-form>

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
import { setPermission } from '@/api';

const { showRoleOpDialog, permission, activeItem, permissionTree, reset, getList } = useRole();

const formRef = ref<FormInstance>();
const loading = ref(false);

const rules = {
  list: [{ required: true, message: '请勾选权限' }],
};

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    console.log({
      permissionIds: permission.value.list,
      id: activeItem.value?.id,
    });

    const { success } = await setPermission({
      permissionIds: permission.value.list,
      id: activeItem.value?.id,
    }).finally(() => {
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
