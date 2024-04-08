<template>
  <el-dialog title="配置角色权限" :model-value="modelValue" @close="closed">
    <el-tree
      ref="treeRef"
      :data="allPermission"
      show-checkbox
      node-key="id"
      default-expand-all
      :props="defaultProps"
      @click="handleNodeClick"
    >
    </el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { permissionList } from '@/api/permission'
import { rolePermission, distributePermission } from '@/api/role'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: Number,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

const handleNodeClick = node => {
  console.log('node==', node)
  // 点击的节点是一个父节点且有子节点
  const children = node.children
  // 使子节点的选中状态与父节点保持一致
  children.forEach(child => {
    child.checked = node.checked
  })
}

// 所有权限
const allPermission = ref([])
const getPermissionList = async () => {
  const { result } = await permissionList()
  console.log('获取到的所有权限是==', result)
  allPermission.value = result
}
getPermissionList()

// 属性结构配置
const defaultProps = {
  children: 'children',
  label: 'name'
}

// tree 节点
const treeRef = ref(null)

// 获取当前用户角色的权限
const getRolePermission = async () => {
  const { result } = await rolePermission(props.roleId)
  console.log('获取当前角色的权限', result)
  const checkedKeys = result
  treeRef.value.setCheckedKeys(checkedKeys)
}

watch(
  () => props.roleId,
  val => {
    if (val) getRolePermission()
  }
)

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  console.log('要分配的权限是==', treeRef.value.getCheckedKeys())
  const test = treeRef.value.getCheckedKeys().filter(value => {
    return typeof value === 'number'
  })
  console.log('test==', test)
  await distributePermission({
    roleId: props.roleId,
    permissions: test
  })
  ElMessage.success('用户角色更新成功')
  closed()
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
