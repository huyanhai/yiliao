<template>
  <a-modal
    v-model:visible="showDialog"
    title="添加医院"
    width="1000px"
    :layout="{
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    }"
    :footer="null"
    @ok="confirm"
  >
    <a-form :model="activeItem">
      <a-form-item label="父级医院" name="username" :rules="rules.name">
        <a-select v-model="activeItem.type">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="医院名称" name="username" :rules="rules.name">
        <a-input v-model:value="activeItem.name" />
      </a-form-item>
      <a-form-item label="医院头像" name="username" :rules="rules.name">
        <!-- <a-upload
          v-model:file-list="activeItem"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <div class="ant-upload-text">上传头像</div>
          </div>
        </a-upload> -->
      </a-form-item>
      <a-form-item label="医院地址" name="username" :rules="rules.name">
        <a-cascader v-model:value="activeItem" :options="addressOptions" placeholder="请选择地址" />
      </a-form-item>
      <a-form-item label="" name="username" :rules="rules.name" :wrapper-col="{ span: 22, offset: 2 }">
        <a-input v-model:value="activeItem.name" placeholder="请填写街道及门牌号" />
      </a-form-item>
      <a-form-item label="医院类型" name="username" :rules="rules.name">
        <a-select v-model="activeItem.type">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="医院等级" name="username" :rules="rules.name">
        <a-select v-model="activeItem.type">
          <a-select-option value="jack">Jack</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="医院科室" name="username" :rules="rules.name">
        <a-form-item-rest>
          <a-row :gutter="16">
            <a-col :span="12">
              一级科室
              <more-check
                v-model:value="activeItem.departmentIds"
                :options="[
                  { value: 1, label: '王小明' },
                  { value: 2, label: '王小明' },
                ]"
                @on-update:value="(e) => (activeItem.departmentIds = e)"
              />
            </a-col>
            <a-col :span="12">
              二级科室
              <more-check
                v-model:value="activeItem.departmentIds1"
                :options="[
                  { value: 1, label: '王小明' },
                  { value: 2, label: '王小明' },
                ]"
                @on-update:value="(e) => (activeItem.departmentIds1 = e)"
              />
            </a-col>
          </a-row>
        </a-form-item-rest>
      </a-form-item>
      <a-form-item label="医院简介" name="username" :rules="rules.name">
        <a-textarea v-model:value="activeItem.name" placeholder="请填写医院简介" />
      </a-form-item>
      <a-form-item label="" name="username" :wrapper-col="{ span: 22, offset: 2 }">
        <a-space>
          <a-button type="primary">提交</a-button>
          <a-button>返回</a-button>
        </a-space>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useWorkspace } from '../hooks/useWorkspace';
import { departmentInfoGet } from '@/api';

import MoreCheck from './MoreCheck.vue';

const { showDialog, activeItem } = useWorkspace();

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
