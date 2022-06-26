<template>
  <a-card>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="系统消息">
        <a-list item-layout="horizontal" :data-source="[]">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              >
                <template #title>
                  <a href="https://www.antdv.com/">{{ item.title }}</a>
                </template>
                <template #avatar>
                  <a-avatar src="https://joeschmoe.io/api/v1/random" />
                </template>
              </a-list-item-meta>
            </a-list-item>
          </template>
        </a-list>
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

const activeKey = ref('1');
</script>

<style lang="scss" scoped></style>
