<template>
  <t-card class="list-card-container">
    <t-form layout="inline">
      <t-form-item label="医疗机构名称" name="name">
        <t-input v-model="formData.name"></t-input>
      </t-form-item>
      <t-form-item label="医院类型" name="name">
        <t-select v-model="formData.type" :options="[]" placeholder="请选择医院类型" />
      </t-form-item>
      <t-form-item label="医院等级" name="name">
        <t-select v-model="formData.level" :options="[]" placeholder="请选择医院等级" />
      </t-form-item>
      <t-form-item label="" name="name">
        <t-button block theme="primary" variant="base">查询</t-button>
        <t-button block variant="outline">重置</t-button>
      </t-form-item>
    </t-form>
    <t-table
      row-key="index"
      :data="[
        { index: 1, platform: '公用' },
        { index: 2, platform: '私有' },
      ]"
      :loading="loading"
      :columns="columns"
      :pagination="pagination"
      :table-content-width="'undefined'"
      :fixed-rows="[2, 2]"
      @page-change="onPageChange"
    >
      <template #operation="{ row }">
        <t-button theme="primary" @click="$router.push(`/workspace/details/${row.index}`)"> 查看详情 </t-button>
      </template>
    </t-table>
  </t-card>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { hospitalInfoList } from '@/api';
import { columns } from './table';

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

<style lang="scss" scoped></style>
