import router from '@/router'
import store from '@/store'

// 白名单
const whiteList = ['/login']
/**
 * 路由前置守卫
 * @param {*} to 要到哪里去
 * @param {*} from 你从哪里来
 * @param {*} next 是否要去?
 */
router.beforeEach(async (to, from, next) => {
  // 1.用户已登录，则不允许进入login
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
    } else {
      // 判断用户资料是否存在，如果不存在，则获取用户信息
      if (!store.getters.hasUserInfo) {
        console.log('尝试获取用户信息', store.getters.hasUserInfo)
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    // 2.用户未登录，只允许进入白名单内的页面
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})