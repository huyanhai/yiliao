<template>
  <div>
    <a-card class="info-card">
      <a-form ref="formRef" :model="formData" :label-col="{ span: 4 }" layout="vertical" :rules="rules">
        <a-row :gutter="16">
          <a-col :span="10">
            <a-form-item label="员工工号"> <a-input v-model:value="user.id" /> </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="10">
            <a-form-item label="原始密码" name="oldPassword">
              <a-input v-model:value="formData.oldPassword" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="10">
            <a-form-item label="新密码" name="password"> <a-input v-model:value="formData.password" /> </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="10">
            <a-form-item label="确认密码" name="password1">
              <a-input v-model:value="formData.password1" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="10">
            <a-space>
              <a-button @click="$router.go(-1)">取消</a-button>
              <a-button type="primary" :loading="loading" @click="save">保存</a-button>
            </a-space>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';

import { message as msg } from 'ant-design-vue';
import { computed, ref } from 'vue';
import { updatePassword } from '@/api';
import { useUserStore } from '@/store';

const formRef = ref<FormInstance>();
const loading = ref(false);

const userStore = useUserStore();

const user = computed(() => userStore.userInfo);

const formData = ref({
  oldPassword: '',
  password: '',
  password1: '',
});

const rules = {
  oldPassword: [{ required: true, message: '请输入旧密码' }],
  password: [{ required: true, message: '请输入新密码' }],
  password1: [
    {
      required: true,
      trigger: 'change',
      validator: (_rule: Rule, value: any) => {
        if (!value) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('请输入确认密码');
        }
        if (value !== formData.value.password) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('两次密码不一致');
        }
        return Promise.resolve();
      },
    },
  ],
};

const save = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const { success, message } = await updatePassword({
      id: user.value.id,
      ...formData.value,
    }).finally(() => {
      loading.value = false;
    });
    if (success) {
      msg.success('修改成功');
    } else {
      msg.error(message);
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.info-card {
  :deep(.ant-form-item-label) {
    width: 100%;
    max-width: 100%;
  }
}
</style>
