import request from '@/utils/request'

/**
 * 获取所有的角色
 */

export const roleList = () => {
  return request({
    url: '/role/list'
  })
}
