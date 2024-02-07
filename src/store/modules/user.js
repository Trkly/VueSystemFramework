import { login, getUserInfo } from '@/api/users'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN, USERINFO } from '@/constant'
import router from '@/router'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || '',
    userInfo: getItem(USERINFO) || {}
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
          this.commit('user/setToken', data.result.token)
          router.push('/')
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
      const res = await getUserInfo()
      this.commit('user/setUserInfo', res.result)
      return res
    }

  }
}
