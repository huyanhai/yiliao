<template>
  <a-modal v-model:visible="showDetails" title="医院详情" width="1000px" :closable="false">
    <a-descriptions bordered>
      <a-descriptions-item label="医院名称">{{ activeItem.name }}</a-descriptions-item>
      <a-descriptions-item label="医院头像">{{ activeItem.logoFileId }}</a-descriptions-item>
      <a-descriptions-item label="医院地址">{{ activeItem.address }}</a-descriptions-item>
      <a-descriptions-item label="医院类型">{{ activeItem.hospitalType }}</a-descriptions-item>
      <a-descriptions-item label="医院等级">{{ activeItem.hospitalLevel }}</a-descriptions-item>
      <a-descriptions-item label="医院科室">{{ activeItem.name }}</a-descriptions-item>
      <a-descriptions-item label="医院简介">{{ activeItem.introduction }}</a-descriptions-item>
    </a-descriptions>
    <template #footer>
      <a-space>
        <a-button
          type="primary"
          @click="
            reset();
            showDetails = false;
          "
          >关闭</a-button
        >
      </a-space>
    </template>
  </a-modal>
</template>
<script lang="ts" setup>
import { useWorkspace } from '../hooks/useWorkspace';

const { showDetails, activeItem, reset } = useWorkspace();
</script>

<style lang="scss" scoped></style>
