<template>
  <div class="app-main">
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.app-main {
  // 浏览器可视区域高度 100vh
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
