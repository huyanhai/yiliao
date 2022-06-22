<template>
  <a-modal v-model:visible="showDialog" title="床位管理" width="600px" :closable="false">
    <a-form ref="formRef" :model="item" :label-col="{ span: 4 }" :rules="rules">
      <a-form-item label="床位号" name="name">
        <a-input v-model:value="item.name" />
      </a-form-item>
      <a-form-item label="医院名称" name="hospitalId">
        <a-tree-select
          v-model:value="item.hospitalId"
          style="width: 100%"
          :tree-data="hospitalInfo"
          allow-clear
          checkable
          :field-names="{
            label: 'name',
            value: 'id',
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
import { useDictStore } from '@/store';

import { bedInfoInsert, bedInfoUpdate } from '@/api';

import { useBed } from '../hooks/useBed';

const { showDialog, item, reset, getList } = useBed();

const loading = ref(false);

const formRef = ref<FormInstance>();
const rules = {
  name: [{ required: true, message: '请输入床位号' }],
  hospitalId: [{ required: true, message: '请选择医院名称' }],
};

const dictStore = useDictStore();

const hospitalInfo = computed(() => {
  return dictStore.hospitalInfo;
});

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const fn = item.value.id ? bedInfoUpdate : bedInfoInsert;
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
