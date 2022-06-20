<template>
  <a-modal v-model:visible="showDialog" title="添加医院" width="1000px" :label-col="{ span: 4 }">
    {{ activeItem }}
    <a-form :model="activeItem">
      <a-form-item label="父级医院">
        <a-select v-model="activeItem.parentId"></a-select>
      </a-form-item>
      <a-form-item label="医院名称" name="name" :rules="rules.name">
        <a-input v-model:value="activeItem.name" />
      </a-form-item>
      <a-form-item label="医院头像" name="logoFileId" :rules="rules.logoFileId">
        <a-form-item-rest>
          <a-upload
            v-model:file-list="logoFileId"
            name="avatar"
            list-type="picture-card"
            class="avatar-uploader"
            :show-upload-list="false"
            :custom-request="handleChange"
          >
            上传
            <!-- <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <div class="ant-upload-text">上传头像</div>
          </div> -->
          </a-upload>
        </a-form-item-rest>
      </a-form-item>
      <a-form-item label="医院地址" name="provinceId" :rules="rules.provinceId">
        <a-cascader
          v-model:value="activeItem.addressArr"
          :field-names="{ label: 'name', value: 'id', children: 'children' }"
          :options="region"
          placeholder="请选择地址"
          @change="cascaderChange"
        />
      </a-form-item>
      <a-form-item label="" name="address" :rules="rules.address" :wrapper-col="{ span: 22, offset: 2 }">
        <a-input v-model:value="activeItem.address" placeholder="请填写街道及门牌号" />
      </a-form-item>
      <a-form-item label="医院类型" name="hospitalType" :rules="rules.hospitalType">
        <a-select
          v-model:value="activeItem.hospitalType"
          :field-names="{
            label: 'codeName',
            value: 'codeValue',
            options: 'options',
          }"
          :options="hospitalType"
        />
      </a-form-item>
      <a-form-item label="医院等级" name="hospitalLevel" :rules="rules.hospitalLevel">
        <a-select
          v-model:value="activeItem.hospitalLevel"
          :field-names="{
            label: 'codeName',
            value: 'codeValue',
            options: 'options',
          }"
          :options="hospitalLevel"
        />
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
                v-model:value="activeItem.departments"
                :options="[
                  { value: 1, label: '王小明' },
                  { value: 2, label: '王小明' },
                ]"
                @on-update:value="(e) => (activeItem.departments = e)"
              />
            </a-col>
          </a-row>
        </a-form-item-rest>
      </a-form-item>
      <a-form-item label="医院简介" name="introduction" :rules="rules.introduction">
        <a-textarea v-model:value="activeItem.introduction" placeholder="请填写医院简介" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button type="primary" @click="confirm">提交</a-button>
        <a-button @click="resetForm">返回</a-button>
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue';
import MoreCheck from '@/components/MoreCheck.vue';
import { useWorkspace } from '../hooks/useWorkspace';
import { departmentInfoGet, hospitalInfoInsert, uploadImg } from '@/api';
import { useDictStore } from '@/store';

const { showDialog, activeItem, reset, getList } = useWorkspace();
const dictStore = useDictStore();

const logoFileId = ref([]);

const region = computed(() => dictStore.region);
const hospitalInfo = computed(() => dictStore.hospitalInfo);
const dict = computed(() => dictStore.dict);

const hospitalType = computed(() => dict.value.filter((item) => item.code === 'hospital_type'));
const hospitalLevel = computed(() => dict.value.filter((item) => item.code === 'hospital_level'));

const rules = {
  // parentId: [{ required: true, message: '请选择父级医院' }],
  name: [{ required: true, message: '请输入医院名称' }],
  logoFileId: [{ required: true, message: '请上传医院头像' }],
  provinceId: [{ required: true, message: '请选择地址' }],
  address: [{ required: true, message: '请填写医院地址' }],
  hospitalType: [{ required: true, message: '请选择医院类型' }],
  hospitalLevel: [{ required: true, message: '请选择医院等级' }],
  introduction: [{ required: true, message: '请填写医院简介' }],
};

const confirm = async () => {
  const { success } = await hospitalInfoInsert(activeItem.value);
  if (success) {
    showDialog.value = false;
    reset();
    getList();
  }
};

const cascaderChange = (value: number[]) => {
  const [one, tow, three] = value;
  activeItem.value.provinceId = one;
  activeItem.value.cityId = tow;
  activeItem.value.districtId = three;
};

const resetForm = () => {
  reset();
  showDialog.value = false;
};

const handleChange = async (e) => {
  console.log(e);
  const form = new FormData();
  form.append('files', e.file);
  const { success, data } = await uploadImg(form);
  if (success) {
    console.log(data);
  }
};

onMounted(async () => {
  departmentInfoGet({});
});
</script>

<style lang="scss" scoped></style>
