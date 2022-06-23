<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="系统名称">
          <a-select v-model="formData.type" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="菜单名称">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <a-form-item label="角色名称">
          <a-select v-model="formData.type" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
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
      <template #left>菜单管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
        <!-- <a-button type="primary">导入</a-button> -->
      </template>
      <a-table-column key="name" title="菜单名称" data-index="lastName" />
      <a-table-column key="name" title="类型" data-index="lastName" />
      <a-table-column key="name" title="系统名称" data-index="lastName" />
      <a-table-column key="name" title="显示顺序" data-index="lastName" />
      <a-table-column key="name" title="请求地址" data-index="lastName" />
      <a-table-column key="name" title="权限标识" data-index="lastName" />
      <a-table-column key="name" title="状态" data-index="lastName" />
      <a-table-column key="name" title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="edit(record)">编辑</a-button>
            <a-button type="primary" size="small" danger @click="del(record)">删除</a-button>
            <a-button type="primary" size="small" @click="edit(record)">上线</a-button>
            <a-button type="primary" size="small" @click="edit(record)">下线</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <my-dialog />
  </div>
</template>
<script lang="ts" setup>
import { Modal } from 'ant-design-vue';

import { onMounted } from 'vue';
import { permissionInfoDelete } from '@/api';
import { useMenu } from './hooks/useMenu';

import MyTable from '@/components/table.vue';
import MyDialog from './components/MenuDialog.vue';

const { loading, pagination, list, formData, showDialog, getList, getAllPermission, reset, edit } = useMenu();

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
      const { success } = await permissionInfoDelete({ id: item.id });
      if (success) {
        getList();
      }
    },
  });
};

onMounted(() => {
  getList();
  getAllPermission();
});
</script>

<style lang="scss" scoped>
.my-card {
  :deep(.ant-form-item) {
    margin-bottom: 12px;
  }
}
</style>
