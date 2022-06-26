<template>
  <div>
    <my-table :data-source="list" :loading="loading" :pagination="pagination" @change="onPageChange">
      <template #left>日志管理</template>
      <template #right>
        <!-- <a-button type="primary" @click="showDialog = true">新增</a-button> -->
        <!-- <a-button type="primary">导入</a-button> -->
      </template>
      <a-table-column title="菜单名称" data-index="name" />
      <a-table-column title="类型" data-index="systemType" />
      <a-table-column title="系统名称" data-index="systemType" />
      <a-table-column title="显示顺序" data-index="sort" />
      <a-table-column title="请求地址" data-index="route" />
      <a-table-column title="权限标识" data-index="permissionType" />
      <a-table-column title="状态">
        <template #default="{ record }">
          <a-switch v-model:checked="record.enabled" :disabled="true" checked-children="开" un-checked-children="关" />
        </template>
      </a-table-column>
      <a-table-column title="操作" data-index="lastName">
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
import { useLogs } from './hooks/useLogs';

import MyTable from '@/components/table.vue';
import MyDialog from './components/MenuDialog.vue';

const { loading, pagination, list, getList } = useLogs();

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
});
</script>

<style lang="scss" scoped>
.my-card {
  :deep(.ant-form-item) {
    margin-bottom: 12px;
  }
}
</style>
