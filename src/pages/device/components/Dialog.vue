<template>
  <a-modal v-model:visible="showDialog" title="设备管理" width="600px" :closable="false">
    <a-form ref="formRef" :model="item" :label-col="{ span: 4 }" :rules="rules">
      <a-form-item label="设备编号" name="code">
        <a-input v-model:value="item.code" />
      </a-form-item>
      <a-form-item label="设备名称" name="name">
        <a-input v-model:value="item.name" />
      </a-form-item>
      <a-form-item label="医疗机构名称" name="hospitalId">
        <a-tree-select
          v-model:value="item.hospitalId"
          style="width: 100%"
          :tree-data="allHospital"
          allow-clear
          checkable
          :field-names="{
            label: 'name',
            value: 'id',
          }"
        />
      </a-form-item>
      <a-form-item label="设备MAC" name="mac">
        <a-input v-model:value="item.mac" />
      </a-form-item>
      <a-form-item label="productKey" name="productKey">
        <a-input v-model:value="item.productKey" />
      </a-form-item>
      <a-form-item label="deviceSecret" name="deviceSecret">
        <a-input v-model:value="item.deviceSecret" />
      </a-form-item>
      <a-form-item label="deviceName" name="deviceName">
        <a-input v-model:value="item.deviceName" />
      </a-form-item>
      <a-form-item label="设备类型" name="deviceType">
        <a-select
          v-model:value="item.deviceType"
          :field-names="{
            label: 'codeName',
            value: 'codeValue',
            options: 'options',
          }"
          :options="deviceType"
        />
      </a-form-item>
      <a-form-item label="设备状态" name="status">
        <a-radio-group v-model:value="item.status">
          <a-radio value="1">启用</a-radio>
          <a-radio value="2">禁用</a-radio>
          <a-radio value="3">报损</a-radio>
          <a-radio value="4">报修</a-radio>
        </a-radio-group>
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

import { computed, ref } from 'vue';
import { useDevice } from '../hooks/useDevice';
import { deviceInfoUpdate, deviceInfoInsert } from '@/api';
import { useDictStore } from '@/store';

const { showDialog, item, reset, getList } = useDevice();

const formRef = ref<FormInstance>();
const loading = ref(false);

const rules = {
  code: [{ required: true, message: '请输入设备编号' }],
  name: [{ required: true, message: '请输入设备名称' }],
  hospitalId: [{ required: true, message: '请选择医疗机构名称' }],
  mac: [{ required: true, message: '请输入设备MAC' }],
  productKey: [{ required: true, message: '请输入productKey' }],
  deviceName: [{ required: true, message: '请输入deviceName' }],
  deviceSecret: [{ required: true, message: '请输入deviceSecret' }],
  deviceType: [{ required: true, message: '请选择设备类型' }],
};

const dictStore = useDictStore();
const dict = computed(() => dictStore.dict);
const deviceType = computed(() => dict.value.filter((item) => item.code === 'device_type'));
const allHospital = computed(() => dictStore.allHospital);

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const fn = item.value.id ? deviceInfoUpdate : deviceInfoInsert;
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
