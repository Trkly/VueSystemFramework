<template>
  <router-view />
</template>
<script setup>
import { useStore } from 'vuex'
import { generateNewStyle, writeNewStyle } from '@/utils/theme'

const store = useStore()
generateNewStyle(store.getters.mainColor).then(newStyleText => {
  writeNewStyle(newStyleText)
})

/**
 * 处理在页面绘制的时候，页面突然发生调整大小的事件，导致了样式和布局都需要重新评估，这个调整大小导致的布局变化，将延迟到下一帧来绘制
 */

const debounce = (fn, delay) => {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, args)
    }, delay)
  }
}

const _ResizeObserver = window.ResizeObserver
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16)
    super(callback)
  }
}
</script>
