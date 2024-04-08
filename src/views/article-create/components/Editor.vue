<template>
  <div class="editor-container">
    <div id="editor-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import E from 'wangeditor'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import { commitArticle, editArticle } from './commit'
import { useStore } from 'vuex'
const props = defineProps({
  title: {
    required: true,
    type: String
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

// Editor实例
let editor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#editor-box')
  initEditor()
})

const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜单栏提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'

  // 国际化相关处理
  editor.config.lang = 'zh-CN'
  editor.create()
}

// 编辑相关
watch(
  () => props.detail,
  val => {
    if (val && val.articleContent) {
      editor.txt.html(val.articleContent)
    }
  },
  {
    immediate: true
  }
)
const store = useStore()
const onSubmitClick = async () => {
  console.log('获取到的编号是==', props.detail)
  console.log('文章详情是==', props.title)
  if (props.detail && props.detail.id) {
    // 编辑文章
    await editArticle({
      id: props.detail.id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    // 创建文章
    await commitArticle({
      author: store.getters.userInfo.username,
      title: props.title,
      content: editor.txt.html()
    })
  }

  editor.txt.html('')
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.editor-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
