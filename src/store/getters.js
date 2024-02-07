// 快捷访问

const getters = {
  token: state => state.user.token,
  /**
   * @returns true表示用户信息已存在
   */
  hasUserInfo: state => {
    console.log('userInfo', state.user.userInfo)
    return JSON.stringify(state.user.userInfo) !== '{}'
  }
}

export default getters
