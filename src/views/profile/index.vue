<template>
  <div>
    <div class="my-container">
      <el-row>
        <el-col :span="6">
          <project-card class="user-card" :features="featureData"> </project-card>
        </el-col>
        <el-col :span="18">
          <el-card>
            <el-tabs v-model="activeName">
              <el-tab-pane label="特征" name="feature">
                <feature />
              </el-tab-pane>
              <el-tab-pane label="章节" name="chapter">
                <chapter />
              </el-tab-pane>
              <el-tab-pane label="作者" name="author">
                <author />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { feature } from '@/api/users'
import { ref } from 'vue'
const activeName = ref('feature')

const featureData = ref([])
const getFeatureData = async () => {
  const { data } = await feature()
  featureData.value = data
  console.log('获取到的数据是:', featureData.value)
}
getFeatureData()
</script>

<style scoped lang="scss">
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
