<template>
  <a-modal v-model:visible="showDialog" title="菜单管理" width="600px" @ok="confirm">
    <a-form :model="item" :label-col="{ span: 4 }">
      <a-form-item label="上级菜单" name="username" :rules="rules.name">
        <a-input v-model:value="item" />
      </a-form-item>
      <a-form-item label="系统名称" name="username" :rules="rules.name">
        <a-select v-model="item">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="菜单类型" name="username" :rules="rules.name">
        <a-radio-group v-model:value="item" name="radioGroup">
          <a-radio value="1">目录</a-radio>
          <a-radio value="2">页面</a-radio>
          <a-radio value="3">按纽</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="系统名称" name="username" :rules="rules.name">
        <a-input v-model:value="item" />
      </a-form-item>
      <a-form-item label="权限标识" name="username" :rules="rules.name">
        <a-input v-model:value="item" />
      </a-form-item>
      <a-form-item label="请求地址" name="username" :rules="rules.name">
        <a-input v-model:value="item" />
      </a-form-item>
      <a-form-item label="显示顺序" name="username" :rules="rules.name">
        <a-input v-model:value="item" />
      </a-form-item>
      <a-form-item label="菜单状态" name="username" :rules="rules.name">
        <a-radio-group v-model:value="item" name="radioGroup">
          <a-radio value="1">启用</a-radio>
          <a-radio value="2">禁用</a-radio>
        </a-radio-group>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button type="primary">提交</a-button>
        <a-button>返回</a-button>
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useMenu } from '../hooks/useMenu';
import { departmentInfoGet } from '@/api';

const { showDialog, item } = useMenu();

const addressOptions = ref([]);

const rules = {
  name: [{ required: true, message: 'Please input your username!' }],
};

const confirm = () => {
  console.log('confirm');
};

onMounted(() => {
  departmentInfoGet({});
});
</script>

<style lang="scss" scoped></style>
