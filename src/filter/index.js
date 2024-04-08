import dayjs from 'dayjs'
// 语言包
import 'dayjs/locale/zh-cn'

const dateFilter = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }

  return dayjs(val).format(format)
}

export default app => {
  app.config.globalProperties.$filters = {
    dateFilter
  }
}
