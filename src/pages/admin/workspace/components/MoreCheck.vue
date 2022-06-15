<template>
  <a-card size="small" bordered class="more-checkbox">
    <template #title>
      <a-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @change="onCheckAllChange">
        全选 已选择<a-typography-text type="danger"> {{( $attrs.value as any).length }}项</a-typography-text>共{{
          options.length
        }}项
      </a-checkbox>
    </template>
    <a-checkbox-group :options="options" v-bind="$attrs" @change="groupChange" />
  </a-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
  options: any[];
}>();

const indeterminate = ref(false);
const checkAll = ref(false);

const emits = defineEmits(['onUpdate:value']);

const groupChange = (e) => {
  checkAll.value = e.length === props.options.length;
  indeterminate.value = !!e.length && e.length < props.options.length;
};

const onCheckAllChange = (e) => {
  const arr = [];
  if (e.target.checked) {
    for (const item of props.options) {
      arr.push(item.value);
    }
  }
  emits('onUpdate:value', arr);
};
</script>

<style lang="scss" scoped>
.more-checkbox {
  :deep(.ant-card-body) {
    .ant-checkbox-wrapper {
      display: flex;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
