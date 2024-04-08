<template>
  <el-dialog title="配置角色" :model-value="modelValue" @close="closed">
    <el-radio-group v-model="userRoleTitle">
      <el-radio v-for="item in allRoleList" :key="item.id" :label="item.name">{{ item.name }}</el-radio>
    </el-radio-group>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">取消</el-button>
        <el-button type="primary" @click="onConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue'
import { roleList } from '@/api/role'
import { userRoles, updateRole } from '@/api/user-manage'
import { ElMessage } from 'element-plus'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emits = defineEmits(['update:modelValue', 'updateRole'])

// 所有角色
const allRoleList = ref([])
// 获取所有角色数据的方法
const getListData = async () => {
  const { result } = await roleList()
  console.log('获取到的所有角色列表是==', result)
  allRoleList.value = result
  console.log('allRoleList.value==', allRoleList.value)
}
onMounted(() => {
  getListData()
})

// 当前用户角色
const userRoleTitle = ref('')
// 获取当前用户角色
const getUserRoles = async () => {
  const { result } = await userRoles(props.userId)
  console.log('获取到的当前用户是==', result)
  userRoleTitle.value = result.name
  console.log('userRoleTitle.value==', userRoleTitle.value)
}
watch(
  () => props.userId,
  val => {
    if (val) getUserRoles()
  }
)

/**
  确定按钮点击事件
 */
const onConfirm = async () => {
  console.log('你哈==', userRoleTitle.value)
  console.log('allRoleList.value==', allRoleList.value)
  // 处理数据结构
  const roles = allRoleList.value.find(role => role.name === userRoleTitle.value)
  console.log('选择的用户权限是==', roles)
  const data = {
    id: props.userId,
    role: roles
  }
  await updateRole(data)
  ElMessage.success('用户角色更新成功')
  closed()
  // 角色更新成功
  // eslint-disable-next-line vue/custom-event-name-casing
  emits('updateRole')
}

/**
 * 关闭
 */
const closed = () => {
  emits('update:modelValue', false)
}
</script>

<style lang="scss" scoped></style>
