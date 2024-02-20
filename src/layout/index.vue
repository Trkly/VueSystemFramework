<template>
  <div class="app-wrapper" :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']">
    <!-- 左侧 menu -->
    <Sidebar class="sidebar-container" :style="{ backgroundColor: $store.getters.cssVar.menuBg }" />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部 navbar -->
        <Navbar />
        <!-- tags -->
        <tags-view />
      </div>

      <!-- 内容区 -->
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import TagsView from '@/components/TagsView'
import AppMain from './components/AppMain'
import variables from '@/style/variables.module.scss'
console.log('variables:', variables)
</script>

<style scoped lang="scss">
@import '~@/style/mixin.scss';
@import '~@/style/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width $sideBarDuration;
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
