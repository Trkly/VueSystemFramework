import router from './router'
import store from './store'

// 白名单
const whiteList = ['/login']

// 判断当前是否刷新路由
let isAccessed = true
/**
 * 路由前置守卫
 */
router.beforeEach(async (to, from, next) => {
  // 存在 token ，进入主页
  // if (store.state.user.token) {
  // 快捷访问
  console.log('isAccessed==', isAccessed)
  if (store.getters.token) {
    if (!store.getters.hasUserInfo) {
      // 此时不存在用户信息，则需要获取用户信息，将isAccessed设为true,便于进入后续判断获取用户资料
      isAccessed = true
    }
    if (to.path === '/login') {
      next('/')
    } else if (isAccessed) {
      // 触发获取用户信息的 action，并获取用户当前权限
      const { permission } = await store.dispatch('user/getUserInfo')
      // 处理用户权限，筛选出需要添加的权限
      const filterRoutes = await store.dispatch(
        'permission/filterRoutes',
        permission.menus
      )
      // 利用 addRoute 循环添加
      filterRoutes.forEach(item => {
        router.addRoute(item)
      })
      isAccessed = false
      // 添加完动态路由之后，需要在进行一次主动跳转
      next(to.path)
    } else {
      next()
    }
  } else {
    // 没有token的情况下，可以进入白名单
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
