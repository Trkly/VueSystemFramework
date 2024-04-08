<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">动态展示</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox v-for="(item, index) in dynamicData" :label="item.label" :key="index">{{ item.label }}</el-checkbox>
        </el-checkbox-group>
      </div>
    </el-card>
    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column v-for="(item, index) in tableColumns" :key="index" :prop="item.prop" :label="item.label">
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.dateFilter(row.publicDate) }}
          </template>
          <template #default v-else-if="item.prop === 'ranking'">
            {{ index + 1 }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button type="primary" size="small" @click="onShowClick(row)">查看</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onActivated, onMounted } from 'vue'
import { getArticleList, deleteArticle } from '@/api/article'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic'
import { tableRef, initSortable } from './sortable'
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 获取数据的方法
const getListData = async () => {
  const { result } = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
// getListData()
// 处理数据不重新加载的问题
onActivated(getListData)

// 表格拖拽相关
onMounted(() => {
  initSortable(tableData, getListData)
})

/**
 * size 改变触发
 */
const handleSizeChange = currentSize => {
  size.value = currentSize
  getListData()
}

/**
 * 页码改变触发
 */
const handleCurrentChange = currentPage => {
  page.value = currentPage
  getListData()
}

/**
 * 查看按钮点击事件
 */
const router = useRouter()
const onShowClick = row => {
  router.push(`/article/${row.id}`)
}

// 删除用户
const onRemoveClick = row => {
  ElMessageBox.confirm('确定要删除文章' + row.title + '吗？', {
    type: 'warning'
  }).then(async () => {
    await deleteArticle(row.id)
    ElMessage.success('文章删除成功')
    // 重新渲染数据
    getListData()
  })
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  :v-deep(.el-table__row) {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}

:v-deep(.sortable-ghost) {
  opacity: 0.6;
  color: #fff !important;
  background: #304156 !important;
}
</style>
