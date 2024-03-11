import { createArticle, articleEdit } from '@/api/article'
import { ElMessage } from 'element-plus'

export const commitArticle = async data => {
  const res = await createArticle(data)
  ElMessage.success('文章创建成功')
  return res
}

export const editArticle = async data => {
  const res = await articleEdit(data)
  ElMessage.success('文章修改成功')
  return res
}
