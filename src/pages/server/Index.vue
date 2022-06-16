<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="一级科室">
          <a-select v-model="formData.type" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="二级科室">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <a-form-item label="">
          <a-space>
            <a-button type="primary">查询</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>

    <my-table :data-source="[1]" :pagination="pagination" @change="onPageChange">
      <template #left>科室管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
        <a-button type="primary">导入</a-button>
      </template>
      <a-table-column key="name" title="一级科室" data-index="lastName" />
      <a-table-column key="name" title="二级科室" data-index="lastName" />
      <a-table-column key="name" title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="edit(record)">编辑二级科室</a-button>
            <a-button type="primary" size="small" danger>删除</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <my-dialog />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { hospitalInfoList } from '@/api';
import { useServer } from './hooks/useServer';

import MyTable from '@/components/table.vue';
import MyDialog from './components/ServerDialog.vue';

const loading = ref(false);

const formData = ref({
  name: '',
  type: '',
  level: '',
});

const pagination = {
  defaultCurrent: 1,
  defaultPageSize: 10,
  total: 100,
};

const { edit, showDialog } = useServer();

const getList = async () => {
  hospitalInfoList({ pageIndex: pagination.defaultCurrent, pageSize: pagination.defaultPageSize });
};

const onPageChange = (pageInfo: any) => {
  console.log('onPageChange', pageInfo);
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
