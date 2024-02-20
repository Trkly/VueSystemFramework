<template>
  <div>
    <svg-icon id="guide-full" :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click="onToggle" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 定义一个响应式变量来跟踪全屏状态
const isFullscreen = ref(false)

// 处理全屏变化的函数
const handleFullscreenChange = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// 切换全屏的函数
/**
 * screenfull.toggle() 函数默认情况下将应用于整个文档，即将整个页面切换到全屏模式或从全屏模式退出。
 */
const onToggle = () => {
  screenfull.toggle()
}

// 在组件挂载时设置全屏变化监听器
onMounted(() => {
  screenfull.on('change', handleFullscreenChange)
})

// 在组件卸载时清理全屏变化监听器
onUnmounted(() => {
  screenfull.off('change', handleFullscreenChange)
})
</script>

<style lang="scss" scoped></style>
