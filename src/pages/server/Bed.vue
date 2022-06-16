<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="床位号">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <a-form-item label="医院名称">
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
      <template #left>床位管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
        <a-button type="primary">导入</a-button>
      </template>
      <a-table-column key="name" title="床位号" data-index="lastName" />
      <a-table-column key="name" title="所属医院" data-index="lastName" />
      <a-table-column key="name" title="状态" data-index="lastName">
        <template #default="{ record }">
          <a-switch v-model:checked="record.status" checked-children="开" un-checked-children="关" />
        </template>
      </a-table-column>
      <a-table-column key="name" title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="edit(record)">编辑</a-button>
            <a-button type="primary" size="small">启用</a-button>
            <a-button type="primary" size="small" danger>禁用</a-button>
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
import { useBed } from './hooks/useBed';

import MyTable from '@/components/table.vue';
import MyDialog from './components/BedDialog.vue';

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

const { edit, showDialog } = useBed();

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
