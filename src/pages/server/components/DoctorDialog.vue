<template>
  <a-modal v-model:visible="showDialog" title="添加医生" width="600px" @ok="confirm">
    <a-form :model="item" :label-col="{ span: 4 }">
      <a-form-item label="医生名称" name="username" :rules="rules.name">
        <a-input v-model:value="item" />
      </a-form-item>
      <a-form-item label="医生职称" name="username" :rules="rules.name">
        <a-select v-model="item">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="所属医院" name="username" :rules="rules.name">
        <a-select v-model="item">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="所属科室" name="username" :rules="rules.name">
        <a-select v-model="item">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
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
import { useDoctor } from '../hooks/useDoctor';
import { departmentInfoGet } from '@/api';

const { showDialog, item } = useDoctor();

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
