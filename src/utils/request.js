import axios from 'axios'
import store from '@/store'
import { ElMessage } from 'element-plus'
import { isCheckTimeout } from './auth'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
// 请求拦截器
service.interceptors.request.use(config => {
  // 在这里统一注入token
  if (store.getters.token) {
    if (isCheckTimeout()) {
      // 推出操作
      store.dispatch('user/logout')
      return Promise.reject(new Error('token 失效'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(
  // 请求成功
  response => {
    const { status, data } = response.data
    // 需要判断请求是否成功
    if (status === 'success') {
      // 成功返回解析后的数据
      return data
    } else {
      const { message } = data
      // 失败（请求成功，业务失败），消息提示
      ElMessage.error(message)
      return Promise.reject(new Error(message))
    }
  },
  // 请求失败
  error => {
    // token过期
    if (error.response && error.response.data && error.response.data.code === 401) {
      store.dispatch('user/logout')
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  })
export default service
