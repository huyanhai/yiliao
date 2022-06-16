<template>
  <a-card>
    <a-row style="margin-bottom: 10px">
      <a-col :span="12">
        <a-typography-title :level="5" style="margin-bottom: 0">
          <slot name="left">标题</slot>
        </a-typography-title>
      </a-col>
      <a-col :span="12" style="text-align: right">
        <a-space>
          <slot name="right"></slot>
        </a-space>
      </a-col>
    </a-row>
    <a-table v-bind="$attrs">
      <slot></slot>
    </a-table>
  </a-card>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped></style>
