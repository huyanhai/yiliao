<template>
  <a-modal v-model:visible="showDialog" title="菜单管理" width="600px" :closable="false">
    <a-form ref="formRef" :model="item" :label-col="{ span: 4 }" :rules="rules">
      <a-form-item label="上级菜单">
        <a-input v-model:value="item.parentId" />
      </a-form-item>
      <a-form-item label="系统名称" name="name">
        <a-input v-model:value="item.name" />
      </a-form-item>
      <a-form-item label="系统类型" name="systemType">
        <a-select
          v-model:value="item.systemType"
          :field-names="{
            label: 'codeName',
            value: 'codeValue',
            options: 'options',
          }"
          :options="systemType"
        />
      </a-form-item>
      <a-form-item label="菜单类型" name="permissionType">
        <a-radio-group v-model:value="item.permissionType">
          <a-radio value="1">目录</a-radio>
          <a-radio value="2" :disabled="!item.parentId">页面</a-radio>
          <a-radio value="3" :disabled="!item.parentId">按纽</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="权限标识">
        <a-input />
      </a-form-item>
      <a-form-item label="请求地址" name="route">
        <a-input v-model:value="item.route" />
      </a-form-item>
      <a-form-item label="显示顺序" name="sort">
        <a-input v-model:value="item.sort" />
      </a-form-item>
      <a-form-item label="菜单状态">
        <a-radio-group v-model:value="item.enabled">
          <a-radio value="1">启用</a-radio>
          <a-radio value="2">禁用</a-radio>
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

import { ref, computed } from 'vue';
import { useMenu } from '../hooks/useMenu';
import { permissionInfoInsert, permissionInfoUpdate } from '@/api';
import { useDictStore } from '@/store';

const { showDialog, item, reset, getList } = useMenu();

const formRef = ref<FormInstance>();
const loading = ref(false);
const dictStore = useDictStore();

const dict = computed(() => dictStore.dict);
const systemType = computed(() => dict.value.filter((item) => item.code === 'system_type'));

const rules = {
  // parentId: [{ required: true, message: '请选择上级菜单' }],
  name: [{ required: true, message: '请输入系统名称' }],
  systemType: [{ required: true, message: '请选择系统类型' }],
  permissionType: [{ required: true, message: '请选择菜单类型' }],
  route: [{ required: true, message: '请输入请求地址' }],
  sort: [{ required: true, message: '请输入显示顺序' }],
};

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const fn = item.value.id ? permissionInfoUpdate : permissionInfoInsert;
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
