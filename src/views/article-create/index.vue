<template>
  <div class="article-create">
    <el-card>
      <el-input class="title-input" placeholder="请输入文章标题" v-model="title" clearable> </el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="markdown" name="markdown">
          <markdown></markdown>
        </el-tab-pane>
        <el-tab-pane label="富文本" name="editor">
          <editor></editor>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import Editor from './components/Editor.vue'
import Markdown from './components/Markdown.vue'
import { ref } from 'vue'

const activeName = ref('markdown')
const title = ref('')
</script>

<style scoped lang="scss">
.title-input {
  margin-bottom: 20px;
}
</style>
