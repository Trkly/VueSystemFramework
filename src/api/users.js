import request from '@/utils/request'

/**
 * 登录
 * return promise实例对象
 */
export const login = data => {
  console.log(request)
  return request({
    url: '/users/login',
    method: 'POST',
    data
  })
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/users/profile',
    method: 'GET'
  })
}

/**
 * 获取用户头像
 */
export const feature = () => {
  return request({
    url: '/users/feature',
    method: 'GET'
  })
}
