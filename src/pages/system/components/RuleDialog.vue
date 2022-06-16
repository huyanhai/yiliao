<template>
  <a-modal v-model:visible="showDialog" title="角色管理" width="600px" @ok="confirm">
    <a-form :model="item" :label-col="{ span: 4 }">
      <a-form-item label="角色名称" name="username" :rules="rules.name">
        <a-input v-model:value="item" />
      </a-form-item>
      <a-form-item label="角色注备" name="username" :rules="rules.name">
        <a-input v-model:value="item" />
      </a-form-item>
      <a-form-item label="设备状态" name="username" :rules="rules.name">
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
import { useRule } from '../hooks/useRule';
import { departmentInfoGet } from '@/api';

const { showDialog, item } = useRule();

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
