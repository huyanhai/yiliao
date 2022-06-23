<template>
  <div>
    <a-card style="margin-bottom: 20px" class="my-card">
      <a-form layout="inline">
        <a-form-item label="菜单状态">
          <a-select
            v-model:value="formData.enabled"
            style="width: 200px"
            :options="[
              { value: '1', label: '启用' },
              {
                value: '0',
                label: '禁用',
              },
            ]"
          />
        </a-form-item>
        <a-form-item label="角色名称">
          <a-input v-model:value="formData.name" style="width: 200px" />
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

    <my-table :data-source="list" :pagination="pagination" :loading="loading" @change="onPageChange">
      <template #left>角色管理</template>
      <template #right>
        <a-button type="primary" @click="showDialog = true">新增</a-button>
        <!-- <a-button type="primary">导入</a-button> -->
      </template>
      <a-table-column title="角色名称" data-index="name" />
      <a-table-column title="角色描述" data-index="remark" />
      <a-table-column title="显示顺序" data-index="lastName" />
      <a-table-column title="状态">
        <template #default="{ record }">
          <a-switch v-model:checked="record.enabled" :disabled="true" />
        </template>
      </a-table-column>
      <a-table-column title="操作" data-index="lastName">
        <template #default="{ record }">
          <a-space>
            <a-button type="primary" size="small" @click="setqx(record)">权限</a-button>
            <a-button type="primary" size="small" danger @click="del(record)">删除</a-button>
          </a-space>
        </template>
      </a-table-column>
    </my-table>
    <my-dialog />
    <my-dialog1 />
  </div>
</template>
<script lang="ts" setup>
import { Modal } from 'ant-design-vue';

import { onMounted } from 'vue';
import { roleInfoDelete } from '@/api';
import { useRole } from './hooks/useRole';

import MyTable from '@/components/table.vue';
import MyDialog from './components/RoleDialog.vue';
import MyDialog1 from './components/RoleDialogOp.vue';

const { loading, pagination, list, formData, showDialog, getList, setqx, reset } = useRole();

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
      const { success } = await roleInfoDelete({ id: item.id });
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
