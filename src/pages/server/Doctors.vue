<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="医生姓名">
          <a-input v-model:value="formData.name" style="width: 200px" />
        </a-form-item>
        <a-form-item label="医院名称">
          <a-input v-model:value="formData.hospitalName" style="width: 200px" />
        </a-form-item>
        <!-- <a-form-item label="一级科室">
          <a-tree-select
            v-model:value="formData.departmentId"
            :tree-data="keshiArr"
            allow-clear
            style="width: 200px"
            checkable
            :field-names="{
              label: 'name',
              value: 'id',
            }"
          />
        </a-form-item> -->
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

    <my-table :data-source="list" :pagination="pagination" @change="onPageChange">
      <template #left>医生管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
        <a-button type="primary">导入</a-button>
      </template>
      <a-table-column title="医生姓名" data-index="name" />
      <a-table-column title="医生职称" data-index="titleType">
        <template #default="{ record }">
          {{ tdoctorTitleType[record.titleType] }}
        </template>
      </a-table-column>
      <a-table-column title="所属医院" data-index="hospitalName" />
      <a-table-column title="所属科室" data-index="departmentName" />
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
      <a-table-column title="操作">
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

import { onMounted } from 'vue';
import { useDoctor } from './hooks/useDoctor';

import MyTable from '@/components/table.vue';
import MyDialog from './components/DoctorDialog.vue';
import { doctorInfoDelete } from '@/api';
import { tdoctorTitleType } from '@/constants';

const { showDialog, pagination, formData, list, edit, getList, reset, disable } = useDoctor();

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
      const { success } = await doctorInfoDelete({ id: item.id });
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
