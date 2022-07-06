<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="系统名称">
          <a-select
            v-model:value="formData.systemType"
            :field-names="{
              label: 'codeName',
              value: 'codeValue',
              options: 'options',
            }"
            :options="systemType"
            style="width: 200px"
          />
        </a-form-item>
        <a-form-item label="菜单类型">
          <a-select v-model:value="formData.permissionType" style="width: 200px">
            <a-select-option value="1">系统</a-select-option>
            <a-select-option value="2">目录</a-select-option>
            <a-select-option value="3"> 页面 </a-select-option>
            <a-select-option value="4">按纽</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="">
          <a-space>
            <a-button type="primary" @click="getList()">查询</a-button>
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
      <template #left>菜单管理</template>
      <template #right>
        <a-button
          type="primary"
          @click="
            showDialog = true;
            getAllPermission();
          "
          >新增</a-button
        >
        <!-- <a-button type="primary">导入</a-button> -->
      </template>
      <a-table-column title="菜单名称" data-index="name" />
      <a-table-column title="类型">
        <template #default="{ record }">
          {{ btnType[record.permissionType] }}
        </template>
      </a-table-column>
      <a-table-column title="系统名称" data-index="systemType">
        <template #default="{ record }">
          {{ tsystemType[record.systemType] }}
        </template>
      </a-table-column>
      <a-table-column title="显示顺序" data-index="sort" />
      <a-table-column title="请求地址" data-index="route" />
      <!-- <a-table-column title="权限标识" data-index="permissionType" /> -->
      <a-table-column title="状态">
        <template #default="{ record }">
          <a-switch
            v-model:checked="record.enabled"
            checked-children="开"
            un-checked-children="关"
            :un-checked-value="false"
            :checked-value="true"
            @click="change(record)"
          />
        </template>
      </a-table-column>
      <a-table-column title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="edit(record)">编辑</a-button>
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

import { onMounted, computed } from 'vue';
import { permissionInfoDelete } from '@/api';
import { useMenu } from './hooks/useMenu';
import { tsystemType, btnType } from '@/constants';
import { useDictStore } from '@/store';

import MyTable from '@/components/table.vue';
import MyDialog from './components/MenuDialog.vue';

const { loading, pagination, list, formData, showDialog, getList, reset, edit, getAllPermission, disable } = useMenu();

const onPageChange = (pageInfo: any) => {
  pagination.value.defaultCurrent = pageInfo.current;
  pagination.value.defaultPageSize = pageInfo.pageSize;
  getList();
};

const dictStore = useDictStore();
const dict = computed(() => dictStore.dict);
const systemType = computed(() => dict.value.filter((item) => item.code === 'system_type'));

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

const change = (item: any) => {
  disable(item);
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
