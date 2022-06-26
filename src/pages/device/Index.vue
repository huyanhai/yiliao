<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="设备编号">
          <a-select v-model="formData.type" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="医院名称">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <a-form-item label="设备状态">
          <a-select v-model="formData.type" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="">
          <a-space>
            <a-button type="primary" @click="getList">查询</a-button>
            <a-button
              @click="
                reset();
                getList();
              "
            >
              重置
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <my-table :loading="loading" :data-source="list" :pagination="pagination" @change="onPageChange">
      <template #left>设备管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
      </template>
      <a-table-column title="设备名称" data-index="name" />
      <a-table-column title="设备编号" data-index="code" />
      <a-table-column title="所属医院" data-index="hospitalId" />
      <a-table-column title="设备Mac" data-index="mac" />
      <a-table-column title="设备类型" data-index="deviceType">
        <template #default="{ record }">
          {{ tsystemType[record.deviceType] }}
        </template>
      </a-table-column>
      <a-table-column title="设备状态" data-index="status">
        <template #default="{ record }"> {{ status[record.status] }}</template>
      </a-table-column>
      <a-table-column title="操作">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="edit(record)">上线</a-button>
            <a-button type="primary" size="small" danger @click="edit(record)">下线</a-button>
            <a-button type="primary" size="small" danger @click="del(record)">删除</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <my-dialog />
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import { Modal } from 'ant-design-vue';
import { useDevice } from './hooks/useDevice';

import { tsystemType } from '@/constants';

import { deviceInfoDelete } from '@/api';

import MyTable from '@/components/table.vue';
import MyDialog from './components/Dialog.vue';

const status = {
  1: '启用',
  2: '禁用',
  3: '报损',
  4: '报修',
};

const { showDialog, loading, pagination, list, formData, getList, edit, reset } = useDevice();

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
      const { success } = await deviceInfoDelete({ id: item.id });
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
