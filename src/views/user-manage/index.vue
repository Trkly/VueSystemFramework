<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button type="primary" @click="onImportExcelClick" v-permission="['importUser']">excel 导入</el-button>
        <el-button type="success" @click="onToExcelClick">excel 导出</el-button>
      </div>
    </el-card>
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="#" type="index" />
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="联系方式"></el-table-column>
        <el-table-column label="头像" align="center">
          <template #default="{ row }">
            <el-image class="avatar" :src="row.avatar" :preview-src-list="[row.avatar]"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="角色">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">{{ item.title }}</el-tag>
            </div>
            <div v-else>
              <el-tag size="small">员工</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="开通时间">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="260">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="onShowClick(row._id)">查看</el-button>
            <el-button type="info" size="small" @click="onShowRoleClick(row)" v-permission="['distributeRole']">角色</el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)" v-permission="['removeUser']">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[2, 5, 10, 20]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <export-to-excel v-model="exportToExcelVisible"></export-to-excel>
    <roles-dialog v-model="roleDialogVisible" :userId="selectUserId" @updateRole="getListData"></roles-dialog>
  </div>
</template>

<script setup>
import { ref, onActivated, watch } from 'vue'
import { getUserManageList, deleteUser } from '@/api/user-manage'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import ExportToExcel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'
// 数据相关
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
// 获取数据的方法
const getListData = async () => {
  const { data } = await getUserManageList({
    page: page.value,
    size: size.value
  })
  console.log('result==', data)
  tableData.value = data.list
  total.value = data.total
}
getListData()
// 分页相关
/**
 * size改变触发
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
 * excel 导入点击事件
 */
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

// 处理导入用户后数据不重新加载的问题
onActivated(getListData)

/**
 * 删除点击事件
 */
const onRemoveClick = row => {
  ElMessageBox.confirm('确定要删除用户 ' + row.username + ' 吗？', {
    type: 'warning'
  }).then(async () => {
    await deleteUser(row._id)
    ElMessageBox.success('删除成功')
    // 重新渲染数据
    getListData()
  })
}

/**
 * 查看按钮点击事件
 */
const onShowClick = id => {
  router.push(`/user/info/${id}`)
}

/**
 * excel 导出点击事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}

/**
 * 查看角色的点击事件
 */
const selectUserId = ref('')
const roleDialogVisible = ref(false)
const onShowRoleClick = row => {
  console.log('查看角色的点击事件:  ', row)
  selectUserId.value = row._id
  roleDialogVisible.value = true
}

// 保证每次打开重新获取用户角色数据
watch(roleDialogVisible, val => {
  if (!val) selectUserId.value = ''
})
</script>

<style scoped lang="scss">
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
