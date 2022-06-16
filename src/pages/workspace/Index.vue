<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="医疗机构名称">
          <a-input v-model:value="formData.name" placeholder="input placeholder" style="width: 200px" />
        </a-form-item>
        <a-form-item label="医院类型">
          <a-select v-model="formData.type" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="医院等级">
          <a-select v-model="formData.level" style="width: 200px">
            <a-select-option value="jack">Jack</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="">
          <a-space>
            <a-button type="primary" @click="showDialog = true">新增</a-button>
            <a-button type="primary">查询</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
    <my-table :data-source="[1]" :pagination="pagination" @change="onPageChange">
      <a-table-column key="name" title="医院名称" data-index="lastName" />
      <a-table-column key="name" title="医院头像" data-index="lastName" />
      <a-table-column key="name" title="上级医院" data-index="lastName" />
      <a-table-column key="name" title="医院地址" data-index="lastName" />
      <a-table-column key="name" title="医院类型" data-index="lastName" />
      <a-table-column key="name" title="医院等级" data-index="lastName" />
      <a-table-column key="name" title="是否上架" data-index="lastName" />
      <a-table-column key="name" title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="$router.push('/workspace/details?id=1')">查看详情</a-button>
            <a-button type="primary" size="small" @click="select(record)">编辑</a-button>
            <a-button type="primary" size="small" danger>删除</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <work-dialog />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { hospitalInfoList, regionCodes } from '@/api';
import { useWorkspace } from './hooks/useWorkspace';

import MyTable from '@/components/table.vue';

import WorkDialog from './components/Dialog.vue';

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

const { select, showDialog } = useWorkspace();

const getList = async () => {
  hospitalInfoList({ pageIndex: pagination.defaultCurrent, pageSize: pagination.defaultPageSize });
};

const getRegionCodes = async () => {
  regionCodes();
};

const onPageChange = (pageInfo: any) => {
  console.log('onPageChange', pageInfo);
};

onMounted(() => {
  getList();
  getRegionCodes();
});
</script>

<style lang="scss" scoped>
.my-card {
  :deep(.ant-form-item) {
    margin-bottom: 12px;
  }
}
</style>
