<template>
  <a-modal v-model:visible="showDialog" title="账号管理" width="600px" :closable="false">
    <a-form ref="formRef" :model="item" :label-col="{ span: 4 }" :rules="rules">
      <a-form-item label="用户名" name="loginName">
        <a-input v-model:value="item.loginName" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input v-model:value="item.password" />
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
      <a-form-item label="真实用户名" name="userName">
        <a-input v-model:value="item.userName" />
      </a-form-item>
      <a-form-item label="角色名称" name="roleIds">
        <a-select
          v-model:value="item.roleIds"
          :options="roleList"
          mode="multiple"
          :field-names="{
            label: 'name',
            value: 'id',
          }"
        ></a-select>
      </a-form-item>
      <a-form-item label="手机号码" name="telPhone">
        <a-input v-model:value="item.telPhone" />
      </a-form-item>
      <a-form-item label="状态">
        <a-radio-group v-model:value="item.enabled">
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

import { ref, computed } from 'vue';
import { useAccount } from '../hooks/useAccount';
import { userUpdate, userInsert } from '@/api';
import { useDictStore } from '@/store';

const { showDialog, item, reset, getList, roleList } = useAccount();

const formRef = ref<FormInstance>();
const loading = ref(false);
const dictStore = useDictStore();

const allHospital = computed(() => dictStore.allHospital);

const rules = {
  loginName: [{ required: true, message: '请输入用户名' }],
  password: [{ required: true, message: '请输入密码' }],
  hospitalId: [{ required: true, message: '请选择医疗机构名称' }],
  userName: [{ required: true, message: '请输入真实用户名' }],
  roleIds: [{ required: true, message: '请选择角色名称' }],
  telPhone: [{ required: true, message: '请输入手机号码' }],
};

const confirm = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const fn = item.value.id ? userUpdate : userInsert;
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
