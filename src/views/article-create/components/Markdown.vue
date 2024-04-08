<template>
  <div class="markdown-container">
    <!-- 渲染区 -->
    <div id="markdown-box"></div>
    <div class="bottom">
      <el-button type="primary" @click="onSubmitClick">提交</el-button>
    </div>
  </div>
</template>

<script setup>
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-cn'
import { onMounted, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'
import { commitArticle, editArticle } from './commit'
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

// 初始化editor
// Editor实例
let mkEditor
// 处理离开页面切换语言导致 dom 无法被获取
let el
onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    height: '500px',
    previewStyle: 'vertical',
    language: 'zh-CN'
  })

  mkEditor.getMarkdown()
}

// 编辑相关
watch(
  () => props.detail,
  val => {
    if (val && val.articleContent) {
      mkEditor.setHTML(val.articleContent)
    }
  },
  {
    immediate: true
  }
)

// 处理提交
const onSubmitClick = async () => {
  console.log('获取到的文章参数是==', props)
  console.log('文章详情是==', props.detail.articleContent)
  if (props.detail && props.detail.id) {
    // 编辑文章
    await editArticle({
      id: props.detail.id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    console.log('我要创建文章==', mkEditor.getHTML())
    // 创建文章
    await commitArticle({
      author: store.getters.userInfo.username,
      title: props.title,
      content: mkEditor.getHTML()
    })
  }

  mkEditor.reset()
  emits('onSuccess')
}
</script>

<style lang="scss" scoped>
.markdown-container {
  .bottom {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
