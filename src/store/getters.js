import variables from '@/style/variables.module.scss'
import { generateColors } from '@/utils/theme'
import { getItem } from '@/utils/storage'
import { MAIN_COLOR } from '@/constant'
// 快捷访问

const getters = {
  token: state => state.user.token,
  /**
   * @returns true表示用户信息已存在
   */
  hasUserInfo: state => {
    console.log('userInfo', state.user.userInfo)
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
