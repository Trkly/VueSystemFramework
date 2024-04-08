<template>
  <div class="">
    <el-card>
      <el-table :data="allRoles" border style="width: 100%">
        <el-table-column label="序号" type="index" width="120"> </el-table-column>
        <el-table-column label="名称" prop="name"> </el-table-column>
        <el-table-column label="描述" prop="desc"> </el-table-column>
        <el-table-column label="操作" prop="action" width="260" #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="onDistributePermissionClick(row)"
            v-permission="['distributePermission']"
          >
            分配权限
          </el-button>
        </el-table-column>
      </el-table>
    </el-card>

    <distribute-permission v-model="distributePermissionVisible" :roleId="selectRoleId"></distribute-permission>
  </div>
</template>

<script setup>
import { roleList } from '@/api/role'
import { ref } from 'vue'
import DistributePermission from './components/DistributePermission.vue'

const allRoles = ref([])
const getRoleList = async () => {
  const { result } = await roleList()
  console.log('result====', result)
  allRoles.value = result
}
getRoleList()

/**
 * 分配权限
 */
const distributePermissionVisible = ref(false)
const selectRoleId = ref(NaN)
const onDistributePermissionClick = row => {
  selectRoleId.value = row.id
  distributePermissionVisible.value = true
}
</script>
