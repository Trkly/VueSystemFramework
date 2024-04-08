import request from '@/utils/request'

/**
 * 获取用户列表数据
 */
export const getUserManageList = data => {
  return request({
    url: '/user-manage/list',
    method: 'POST',
    data
  })
}

/**
 * 批量导入
 */
export const userBatchImport = data => {
  return request({
    url: '/user-manage/batchImport',
    method: 'POST',
    data
  })
}

/**
 * 删除指定数据
 */
export const deleteUser = id => {
  return request({
    url: '/user-manage/delete',
    params: {
      id: id
    },
    method: 'GET'
  })
}

/**
 * 获取所有用户列表数据
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list',
    method: 'GET'
  })
}

/**
 * 获取用户详情
 */
export const userDetail = id => {
  return request({
    url: '/user-manage/detail',
    params: {
      id: id
    },
    method: 'GET'
  })
}

/**
 * 获取指定用户角色
 */
export const userRoles = id => {
  return request({
    url: '/user-manage/role',
    params: {
      id: id
    },
    method: 'GET'
  })
}

/**
 * 分用户分配角色
 */
export const updateRole = data => {
  console.log(data)
  return request({
    url: '/user-manage/update-role',
    method: 'POST',
    data
  })
}
