/**
 * 存储数据
 */
export const setItem = (key, value) => {
  // value分为基本数据类型和复杂数据类型
  // 将数组，对象类型的数据转化为JSON字符串进行存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/**
 * 获取数据
 */
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/**
 * 删除指定数据
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
/**
 * 删除所有数据
 */
export const removeAllItem = () => {
  window.localStorage.clear()
}
