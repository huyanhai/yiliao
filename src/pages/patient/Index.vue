<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="患者姓名">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <!-- <a-form-item label="医院名称">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item> -->
        <a-form-item label="">
          <a-space>
            <a-button type="primary" @click="getList">查询</a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <my-table :data-source="list" :pagination="pagination" :loading="loading" @change="onPageChange">
      <template #left>患者管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
      </template>
      <a-table-column title="患者姓名" data-index="name" />
      <a-table-column title="患者年龄" data-index="age" />
      <a-table-column title="所属医院" data-index="hospitalName" />
      <a-table-column title="所属医生" data-index="doctorName" />
      <a-table-column title="床号" data-index="bedName" />
      <a-table-column title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="edit(record)">报告下载</a-button>
            <a-button type="primary" size="small" @click="edit(record)">修改</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <my-dialog />
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';

import { usePatient } from './hooks/usePatient';
// import { patientInfoDelete } from '@/api';

import MyTable from '@/components/table.vue';
import MyDialog from './components/Dialog.vue';

const { showDialog, loading, pagination, list, formData, getList, edit, reset } = usePatient();

const onPageChange = (pageInfo: any) => {
  pagination.value.defaultCurrent = pageInfo.current;
  pagination.value.defaultPageSize = pageInfo.pageSize;
  getList();
};

// const del = (item: any) => {
//   Modal.confirm({
//     title: '确认删除',
//     content: '确认删除数据?',
//     okText: '确认',
//     cancelText: '取消',
//     onOk: async () => {
//       const { success } = await patientInfoDelete({ id: item.id });
//       if (success) {
//         getList();
//       }
//     },
//   });
// };

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
