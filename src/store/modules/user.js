import { login, getUserInfoData } from '@/api/users'
import { setItem, getItem, removeAllItem } from '@/utils/storage'
import { TOKEN, USERINFO } from '@/constant'
import router, { resetRouter } from '@/router'
import { setTimeStamp } from '@/utils/auth'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: getItem(USERINFO) || {},
    isRefresh: true
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
    },
    setUserInfo(state, userInfo) {
      console.log('我来设置用户信息了', userInfo)
      state.userInfo = userInfo
      setItem(USERINFO, userInfo)
    }
  },
  actions: {
    /**
     * 登录请求动作
     * @param {前后文} context
     * @param {用户信息} userInfo
     * @returns
     */
    login(context, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(data => {
          console.log('data:', data.result.token)
          // 用户登录后设置token保存到浏览器内存
          this.commit('user/setToken', data.result.token)
          // 跳转到首页
          router.push('/')
          // 保存登录时间
          setTimeStamp()
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

    /**
     * 获取用户信息
     * @param {*} context 前后文
     * @returns 用户信息
     */
    async getUserInfo(context) {
      const res = await getUserInfoData()
      console.log('获取到的用户信息是==', res.result)
      this.commit('user/setUserInfo', res.result)
      return res.result
    },

    /**
     * 退出登录
     */
    logout() {
      resetRouter()
      this.commit('user/setToken', '')
      this.commit('user/setUserInfo', {})
      this.commit('app/initTagsViewList')
      removeAllItem()
      // TODO: 清理掉权限相关配置
      router.push({ path: '/login', query: { q: Math.random() } })
    }

  }
}
