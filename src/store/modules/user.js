import { login } from '@/api/users'
import { setItem, getItem } from '@/utils/storage'
import { TOKEN } from '@/constant'
import router from '@/router'
export default {
  namespaced: true,
  state: () => ({
    token: getItem(TOKEN) || ''
  }),
  mutations: {
    setToken(state, token) {
      state.token = token
      setItem(TOKEN, token)
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
    }

  }
}
