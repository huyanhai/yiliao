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
        {{ item.hospitalId }}
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
      <a-form-item label="所属科室" name="departmentId1">
        <a-tree-select
          v-model:value="item.departmentId1"
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
import { getAllByHospitalId, doctorInfoInsert } from '@/api';
import { getTree } from '@/utils/tools';

const { showDialog, item, reset, getList } = useDoctor();

const keshiArr = ref([]);
const loading = ref(false);

const formRef = ref<FormInstance>();
const rules = {
  name: [{ required: true, message: '请输入医生名称' }],
  titleType: [{ required: true, message: '请选择医生职称' }],
  hospitalId: [{ required: true, message: '请选择所属医院' }],
  departmentId1: [{ required: true, message: '请选择所属科室' }],
};

const dictStore = useDictStore();
const dict = computed(() => dictStore.dict);

// 职称
const doctorType = computed(() => dict.value.filter((item) => item.code === 'doctor_title_type'));

const hospitalInfo = computed(() => {
  return dictStore.hospitalInfo;
});

const treeChange = async (v: any) => {
  const { data, success } = await getAllByHospitalId({
    id: v,
  });
  if (success) {
    keshiArr.value = getTree(data, '00000000-0000-0000-0000-000000000000', []);
  }
};

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const { success } = await doctorInfoInsert(item.value).finally(() => {
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
