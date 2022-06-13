<template>
  <div class="login-wrapper">
    <login-header />

    <div class="login-container">
      <div class="title-container">
        <h1 class="title margin-no">{{ type === 'login' ? '登录到管理台' : '找回密码' }}</h1>
      </div>

      <login v-if="type === 'login'" />
      <register v-else />
    </div>

    <footer class="copyright">Copyright @ 2021-2022 xxx. All Rights Reserved</footer>
  </div>
</template>
<script lang="ts">
export default {
  name: 'LoginIndex',
};
</script>
<script setup lang="ts">
import { useLogin } from './hooks/useLogin';

import Login from './components/Login.vue';
import Register from './components/Register.vue';
import LoginHeader from './components/Header.vue';

const { type } = useLogin();
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
