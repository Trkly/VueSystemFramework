<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermission"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="permissionName" label="权限名称" width="180"> </el-table-column>
        <el-table-column prop="permissionMark" label="权限标识" width="180"> </el-table-column>
        <el-table-column prop="permissionDesc" label="权限描述" width="180"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { ref } from 'vue'
/**
 * 权限分级
 * 1.一级权限为页面权限
 * permissionMark 对应 路由名称
 * 2.二级权限为功能权限
 * permissionMark 对应 功能权限表
 */
// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  const { result } = await permissionList()
  allPermission.value = result.data
  console.log('permissionList==', allPermission.value)
}
getPermissionList()
</script>

<style scoped lang="scss"></style>
