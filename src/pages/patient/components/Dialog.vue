<template>
  <a-modal v-model:visible="showDialog" title="添加患者" width="600px" :closable="false">
    <a-form ref="formRef" :model="item" :label-col="{ span: 4 }" :rules="rules">
      <a-form-item label="患者姓名" name="name">
        <a-input v-model:value="item.name" />
      </a-form-item>
      <a-form-item label="身份证号" name="cardId" style="width: 100%">
        <a-input-number v-model:value="item.cardId" style="width: 100%" />
      </a-form-item>
      <a-form-item label="电话号码" name="telPhone">
        <a-input v-model:value="item.telPhone" />
      </a-form-item>
      <a-form-item label="年纪" name="age" style="width: 100%">
        <a-input-number v-model:value="item.age" style="width: 100%" />
      </a-form-item>
      <a-form-item label="性别" name="sex">
        <a-select
          v-model:value="item.sex"
          :options="[
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 0,
            },
          ]"
        />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button type="primary" @click="confirm">提交</a-button>
        <a-button @click="showDialog = false">返回</a-button>
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue';

import { ref } from 'vue';
import { usePatient } from '../hooks/usePatient';
import { patientInfoUpdate, patientInfoInsert } from '@/api';

const { showDialog, item, reset, getList } = usePatient();

const formRef = ref<FormInstance>();
const loading = ref(false);

const rules = {
  name: [{ required: true, message: '请输入患者姓名' }],
  cardId: [{ required: true, message: '请输入身份证号' }],
  telPhone: [{ required: true, message: '请输入手机号' }],
  age: [{ required: true, message: '请输入年龄' }],
  sex: [{ required: true, message: '请选择性别' }],
};

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const fn = item.value.id ? patientInfoUpdate : patientInfoInsert;
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
