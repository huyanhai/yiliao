<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="医疗机构名称">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <a-form-item label="医院类型">
          <a-select
            v-model:value="formData.type"
            style="width: 200px"
            :field-names="{
              label: 'codeName',
              value: 'codeValue',
              options: 'options',
            }"
            :options="hospitalType"
          />
        </a-form-item>
        <a-form-item label="医院等级">
          <a-select
            v-model:value="formData.level"
            style="width: 200px"
            :field-names="{
              label: 'codeName',
              value: 'codeValue',
              options: 'options',
            }"
            :options="hospitalLevel"
          />
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
    <my-table :data-source="list" :pagination="pagination" :loading="loading" @change="onPageChange">
      <template #left>工作站管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
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
            <a-button type="link" size="small" @click="checkDetails(record)">查看详情</a-button>
            <a-button type="primary" size="small" @click="select(record)">编辑</a-button>
            <a-button type="primary" size="small" danger @click="del(record)">删除</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <work-dialog />
    <work-details />
  </div>
</template>
<script lang="ts" setup>
import { onMounted, computed } from 'vue';
import { Modal } from 'ant-design-vue';

import { useDictStore } from '@/store';
import { hospitalInfoDelete } from '@/api';

import { useWorkspace } from './hooks/useWorkspace';

import MyTable from '@/components/table.vue';

import WorkDialog from './components/Dialog.vue';
import WorkDetails from './components/Details.vue';

const { getDict, getRegion, getHospital } = useDictStore();
const dictStore = useDictStore();

const dict = computed(() => dictStore.dict);
const hospitalType = computed(() => dict.value.filter((item) => item.code === 'hospital_type'));
const hospitalLevel = computed(() => dict.value.filter((item) => item.code === 'hospital_level'));

const { select, getList, reset, checkDetails, list, showDialog, pagination, loading, formData } = useWorkspace();

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
      const { success } = await hospitalInfoDelete({ id: item.id });
      if (success) {
        getList();
      }
    },
  });
};

onMounted(async () => {
  getList();
  await getRegion();
  await getHospital();
  if (Object.keys(dict.value || {}).length === 0) {
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
