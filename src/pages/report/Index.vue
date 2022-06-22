<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="患者姓名">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <a-form-item label="医院名称">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <a-form-item label="报告状态">
          <a-select v-model="formData.type" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="">
          <a-space>
            <a-button type="primary">查询</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <my-table :data-source="list" :loading="loading" :pagination="pagination" @change="onPageChange">
      <template #left>报告管理</template>
      <template #right>
        <!-- <a-button type="primary" @click="showDialog = true">新增</a-button>
        <a-button type="primary">导入</a-button> -->
      </template>
      <a-table-column key="name" title="患者姓名" data-index="lastName" />
      <a-table-column key="name" title="患者年龄" data-index="lastName" />
      <a-table-column key="name" title="所属医院" data-index="lastName" />
      <a-table-column key="name" title="所属医生" data-index="lastName" />
      <a-table-column key="name" title="床号" data-index="lastName" />
      <a-table-column key="name" title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="downLoad(record)">报告下载</a-button>
            <a-button type="primary" size="small" @click="downLoad(record)">原始数据下载</a-button>
            <a-button type="primary" size="small" danger @click="del(record)">删除</a-button>
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
import { reportInfoDelete } from '@/api';
import { useReport } from './hooks/useReport';

import MyTable from '@/components/table.vue';
import MyDialog from './components/Dialog.vue';

const { loading, pagination, list, formData, getList } = useReport();

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
      const { success } = await reportInfoDelete({ id: item.id });
      if (success) {
        getList();
      }
    },
  });
};

const downLoad = (item: any) => {
  console.log(item);
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
