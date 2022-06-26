<template>
  <a-card class="info-card">
    <a-form ref="formRef" :model="user" :label-col="{ span: 4 }" layout="vertical" :rules="rules">
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="员工工号" name="id"> <a-input v-model:value="user.id" disabled="true" /> </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="员工姓名" name="userName">
            <a-input v-model:value="user.userName" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="性别" name="sex">
            <a-select
              v-model:value="user.sex"
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
        </a-col>
        <a-col :span="6">
          <a-form-item label="手机号码" name="telPhone">
            <a-input v-model:value="user.telPhone" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="电子邮箱" name="email"> <a-input v-model:value="user.email" /> </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="证件号码" name="cardId">
            <a-input v-model:value="user.cardId" />
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="职位" name="position">
            <a-input v-model:value="user.position" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="地址" name="addArr">
            <a-cascader
              v-model:value="user.addArr"
              :field-names="{ label: 'name', value: 'id', children: 'children' }"
              :options="region"
              placeholder="请选择地址"
              @change="cascaderChange"
            />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label=" " name="address">
            <a-input v-model:value="user.address" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="所属科室" name="departmentId">
            <a-tree-select
              v-model:value="user.departmentId"
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
        </a-col>
        <a-col :span="12">
          <a-form-item label="角色" name="roles">
            <a-select
              v-model:value="user.roles"
              :options="roleList"
              :field-names="{
                label: 'name',
                value: 'id',
              }"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="6">
          <a-form-item label="密码" name="password"> <a-input v-model:value="user.password" /> </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="员工状态" name="enabled">
            <a-switch
              v-model:checked="user.enabled"
              :un-checked-value="0"
              :checked-value="1"
              checked-children="开"
              un-checked-children="关"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="6"> <a-button type="primary" :loading="loading" @click="save">保存</a-button></a-col>
      </a-row>
    </a-form>
  </a-card>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import { ref, computed } from 'vue';
import { useUserStore, useDictStore } from '@/store';
import { getAllByHospitalId, roleInfoAll, updateUser } from '@/api';
import { getTree } from '@/utils/tools';

const userStore = useUserStore();
const dictStore = useDictStore();

const keshiArr = ref([]);
const roleList = ref([]);

const formRef = ref<FormInstance>();
const loading = ref(false);

const rules = {
  userName: [{ required: true, message: '请输入员工姓名' }],
  sex: [{ required: true, message: '请选择性别' }],
  telPhone: [{ required: true, message: '请输入手机号' }],
  email: [{ required: true, message: '请输入电子邮箱' }],
  cardId: [{ required: true, message: '请输入证件号码' }],
  position: [{ required: true, message: '请输入职位' }],
  addArr: [{ required: true, message: '请选择地址' }],
  deviceType: [{ required: true, message: '请选择省市区' }],
  address: [{ required: true, message: '请输入地址' }],
  // departmentId: [{ required: true, message: '请选择科室' }],
  roles: [{ required: true, message: '请选择角色' }],
  password: [{ required: true, message: '请输入密码' }],
};

const treeChange = async (v: any) => {
  const { data, success } = await getAllByHospitalId({
    id: v,
  });
  if (success) {
    keshiArr.value = getTree(data, '00000000-0000-0000-0000-000000000000', []);
  }
};

const getAllRole = async () => {
  const { data, success } = await roleInfoAll();
  if (success) {
    roleList.value = data;
  }
};

const user: any = computed({
  get: () => {
    if (userStore.userInfo && userStore.userInfo.hospitalId) {
      treeChange(userStore.userInfo.hospitalId);
    }
    getAllRole();
    const users = userStore.userInfo;
    users.addArr = [users.provinceId || '', users.cityId || '', users.districtId].filter((item) => item);
    return users;
  },
  set: (val) => val,
});
const region = computed(() => dictStore.region);

const cascaderChange = (value: number[]) => {
  const [one, tow, three] = value;
  user.value.provinceId = one;
  user.value.cityId = tow;
  user.value.districtId = three;
};

const save = async () => {
  try {
    await formRef.value?.validateFields();
    loading.value = true;
    const { success } = await updateUser({
      ...user.value,
    }).finally(() => {
      loading.value = false;
    });
    if (success) {
      message.success('修改成功');
    } else {
      message.error('修改失败');
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
