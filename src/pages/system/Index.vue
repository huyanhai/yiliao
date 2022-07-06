<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="医疗机构名称">
          <a-tree-select
            v-model:value="formData.hospitalId"
            style="width: 200px"
            :tree-data="allHospital"
            allow-clear
            checkable
            :field-names="{
              label: 'name',
              value: 'id',
            }"
          />
        </a-form-item>
        <a-form-item label="姓名">
          <a-input v-model:value="formData.userName" style="width: 200px" />
        </a-form-item>
        <a-form-item label="角色名称">
          <a-select
            v-model:value="formData.roleId"
            style="width: 200px"
            :options="roleList"
            :field-names="{
              label: 'name',
              value: 'id',
            }"
          />
        </a-form-item>
        <a-form-item label="">
          <a-space>
            <a-button type="primary" @click="getList()">查询</a-button>
            <a-button
              @click="
                reset();
                getList();
              "
              >重置</a-button
            >
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <my-table :data-source="list" :loading="loading" :pagination="pagination" @change="onPageChange">
      <template #left>账号管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
      </template>
      <a-table-column title="用户名" data-index="userName" />
      <a-table-column title="姓名" data-index="loginName" />
      <a-table-column title="医院名称" data-index="hospitalName" />
      <a-table-column title="角色名称" data-index="roleNames" />
      <a-table-column title="状态">
        <template #default="{ record }">
          <a-switch v-model:checked="record.enabled" :disabled="true" :un-checked-value="0" :checked-value="1" />
        </template>
      </a-table-column>
      <a-table-column title="创建时间" data-index="createTime" />
      <a-table-column title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="edit(record)">编辑</a-button>
            <a-button type="primary" size="small" danger @click="del(record)">删除</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <my-dialog />
  </div>
</template>
<script lang="ts" setup>
import { Modal, message as amessage } from 'ant-design-vue';

import { onMounted, computed } from 'vue';
import { userDelete } from '@/api';
import { useAccount } from './hooks/useAccount';
import { useDictStore } from '@/store';

import MyTable from '@/components/table.vue';
import MyDialog from './components/Dialog.vue';

const { loading, pagination, list, formData, showDialog, roleList, getList, getRoleList, reset, edit } = useAccount();

const dictStore = useDictStore();

const allHospital = computed(() => dictStore.allHospital);

const onPageChange = (pageInfo: any) => {
  pagination.value.defaultCurrent = pageInfo.current;
  pagination.value.defaultPageSize = pageInfo.pageSize;
  getList();
};

const del = (item: any) => {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除数据?',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      const { success, message } = await userDelete({ id: item.id });
      if (success) {
        getList();
      } else {
        amessage.error(message);
      }
    },
  });
};

const downLoad = (item: any) => {
  console.log(item);
};

onMounted(() => {
  getList();
  getRoleList();
});
</script>

<style lang="scss" scoped>
.my-card {
  :deep(.ant-form-item) {
    margin-bottom: 12px;
  }
}
</style>
