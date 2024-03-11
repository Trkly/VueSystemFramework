import request from '@/utils/request'

/**
 * 获取所有的角色
 */

export const roleList = () => {
  return request({
    url: '/role/list',
    method: 'GET'
  })
}

/**
 * 获取指定角色的权限
 */
export const rolePermission = roleId => {
  return request({
    url: '/role/permission',
    params: {
      roleId: roleId
    },
    method: 'GET'
  })
}

/**
 * 为角色修改权限
 */
export const distributePermission = data => {
  return request({
    url: '/role/distribute-permission',
    method: 'POST',
    data
  })
}
