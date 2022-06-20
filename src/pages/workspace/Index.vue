<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="医疗机构名称">
          <a-input v-model:value="formData.name" style="width: 200px" />
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
            <a-button type="primary">查询</a-button>
            <a-button>重置</a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
    {{ list }}
    <my-table :data-source="list" :pagination="pagination" :loading="loading" @change="onPageChange">
      <template #left>工作站管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
        <!-- <a-button type="primary">导入</a-button> -->
      </template>
      <a-table-column title="医院名称" data-index="name" />
      <a-table-column title="医院头像" data-index="logoFileId" />
      <a-table-column title="上级医院" data-index="parentId" />
      <a-table-column title="医院地址" data-index="address" />
      <a-table-column title="医院类型" data-index="hospitalType" />
      <a-table-column title="医院等级" data-index="hospitalLevel" />
      <a-table-column title="是否上架" data-index="lastName" />
      <a-table-column title="操作">
        <template #default="{ record }">
          <a-space>
            <a-button type="link" size="small" @click="$router.push('/workspace/details?id=1')">查看详情</a-button>
            <a-button type="primary" size="small" @click="select(record)">编辑</a-button>
            <a-button type="primary" size="small" danger @click="del(record)">删除</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <work-dialog />
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { Modal } from 'ant-design-vue';

import { useDictStore } from '@/store';
import { hospitalInfoDelete } from '@/api';

import { useWorkspace } from './hooks/useWorkspace';

import MyTable from '@/components/table.vue';

import WorkDialog from './components/Dialog.vue';

const { dict, getDict, getRegion, getHospital } = useDictStore();

const formData = ref({
  name: '',
  type: '',
  level: '',
});

const { select, getList, list, showDialog, pagination, loading } = useWorkspace();

const onPageChange = (pageInfo: any) => {
  console.log('onPageChange', pageInfo);
};

const del = (item: any) => {
  Modal.confirm({
    title: '确认删除',
    content: '确认删除数据?',
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      const { success } = await hospitalInfoDelete({ id: item.id });
      if (success) {
        console.log('删除成功');
      }
    },
  });
};

onMounted(async () => {
  getList();
  await getRegion();
  await getHospital();
  if (Object.keys(dict || {}).length === 0) {
    getDict();
  }
});
</script>

<style lang="scss" scoped>
.my-card {
  :deep(.ant-form-item) {
    margin-bottom: 12px;
  }
}
</style>
