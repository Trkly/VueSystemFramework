/**
 * 导入数据对应表
 */
export const USER_RELATIONS = {
  编号: 'id',
  姓名: 'username',
  联系方式: 'mobile',
  头像: 'avatar',
  角色: 'role'
}

// 该方法负责将数组转化为二维数组
const formatJson = (headers, rows) => {
  // 首先遍历数组
  return rows.map(item => {
    return Object.keys(headers).map(key => {
      // 角色特殊处理
      if (headers[key] === 'role') {
        const roles = item[headers[key]]

        return JSON.stringify(roles.map(role => role.title))
      }
      return item[headers[key]]
    })
  })
}
