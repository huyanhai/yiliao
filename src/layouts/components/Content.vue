<template>
  <router-view> </router-view>
</template>

<style lang="less" scoped>
@import '@/style/variables';

.fade-leave-active,
.fade-enter-active {
  transition: opacity var(--tdvns-anim-duration-slow) var(--tdvns-anim-time-fn-easing);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
