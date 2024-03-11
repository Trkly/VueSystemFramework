import variables from '@/style/variables.module.scss'
import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
// 快捷访问

const getters = {
  routes: state => state.permission.routes,
  isRefresh: state => {
    return state.getters.isRefresh === true
  },
  token: state => state.user.token,
  useRouter: state => state.app.useRouter,
  /**
   * @returns true表示用户信息已存在
   */
  hasUserInfo: state => {
    return JSON.stringify(state.user.userInfo) !== '{}'
  },
  userInfo: state => state.user.userInfo,
  cssVar: state => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR))
    }
  },
  sidebarOpened: state => state.app.sidebarOpened,
  mainColor: state => state.theme.mainColor,
  tagsViewList: state => state.app.tagsViewList
}

export default getters
