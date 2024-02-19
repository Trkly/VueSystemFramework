<template>
  <div class="navbar">
    <hamburger class="hamburger-container" />
    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <header-search class="right-menu-item hover-effect" />
      <screenfull class="right-menu-item hover-effect" />
      <theme-picker class="right-menu-item hover-effect" />
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar shape="square" :size="40" :src="$store.getters.userInfo.avatar"></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/"><el-dropdown-item> 主页 </el-dropdown-item></router-link>
            <a target="_blank" href="#"><el-dropdown-item> 课程主页 </el-dropdown-item></a>
            <el-dropdown-item divided @click="logout"> 退出登录 </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger/index'
import Breadcrumb from '@/components/Breadcrumb/index'
import ThemePicker from '@/components/ThemeSelect/index'
import Screenfull from '@/components/Screenfull/index'
import HeaderSearch from '@/components/HeaderSearch/index'
const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>

<style scoped lang="scss">
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover动画
    transition: background 0.5s;

    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }
  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    :deep(.avatar-container) {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }

    :deep(.right-menu-item) {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
      }
    }
  }
}
</style>
