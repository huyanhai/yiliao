<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="一级科室">
          <a-select v-model="formData.parentId" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="二级科室">
          <a-input v-model:value="formData.nameLevel2" style="width: 200px" />
        </a-form-item>
        <a-form-item label="">
          <a-space>
            <a-button
              type="primary"
              @click="
                pagination.defaultCurrent = 1;
                getList();
              "
              >查询</a-button
            >
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
      <template #left>科室管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
        <a-button type="primary">导入</a-button>
      </template>
      <a-table-column title="一级科室" data-index="name" />
      <a-table-column title="二级科室" data-index="childrenName" />
      <a-table-column title="操作">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="edit(record)">编辑二级科室</a-button>
            <a-button type="primary" size="small" danger @click="del(record)">删除</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <my-dialog />
    <my-dialog1 />
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { Modal } from 'ant-design-vue';

import { useServer } from './hooks/useServer';
import { departmentInfoDelete } from '@/api';

import MyTable from '@/components/table.vue';
import MyDialog from './components/ServerDialog.vue';
import MyDialog1 from './components/ServerDialog1.vue';

const { showDialog, loading, pagination, list, formData, getList, edit, reset } = useServer();

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
      const { success } = await departmentInfoDelete({ id: item.id });
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
