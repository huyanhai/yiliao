<template>
  <a-modal v-model:visible="showDialog" title="添加医生" width="600px" :closable="false">
    <a-form ref="formRef" :model="item" :label-col="{ span: 4 }" :rules="rules">
      <a-form-item label="医生名称" name="name">
        <a-input v-model:value="item.name" />
      </a-form-item>
      <a-form-item label="医生职称" name="titleType">
        <a-select
          v-model:value="item.titleType"
          :field-names="{
            label: 'codeName',
            value: 'codeValue',
            options: 'options',
          }"
          :options="doctorType"
        />
      </a-form-item>
      <a-form-item label="所属医院" name="hospitalId">
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
          @change="treeChange"
        />
      </a-form-item>
      <a-form-item label="所属科室" name="departmentId">
        <a-tree-select
          v-model:value="item.departmentId"
          style="width: 100%"
          :tree-data="keshiArr"
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
        <a-button type="primary" :loading="loading" @click="confirm">提交</a-button>
        <a-button
          @click="
            reset();
            showDialog = false;
          "
          >关闭</a-button
        >
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import { useDictStore } from '@/store';

import { useDoctor } from '../hooks/useDoctor';
import { doctorInfoInsert, doctorInfoUpdate } from '@/api';

const { showDialog, item, keshiArr, reset, getList, treeChange } = useDoctor();

const loading = ref(false);

const formRef = ref<FormInstance>();
const rules = {
  name: [{ required: true, message: '请输入医生名称' }],
  titleType: [{ required: true, message: '请选择医生职称' }],
  hospitalId: [{ required: true, message: '请选择所属医院' }],
  departmentId: [{ required: true, message: '请选择所属科室' }],
};

const dictStore = useDictStore();
const dict = computed(() => dictStore.dict);

// 职称
const doctorType = computed(() => dict.value.filter((item) => item.code === 'doctor_title_type'));

const hospitalInfo = computed(() => {
  return dictStore.hospitalInfo;
});

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const fn = item.value.id ? doctorInfoUpdate : doctorInfoInsert;
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
