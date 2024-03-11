import { LANG, TAGS_VIEW, USE_ROUTER } from '@/constant/index'
import { getItem, setItem } from '@/utils/storage'
export default {
  namespaced: true,
  state: () => ({
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || [],
    useRouter: []
  }),
  mutations: {
    /**
     * 设置vuex中的useRouter
     */
    setUseRouter(state, myRouter) {
      state.useRouter = myRouter
    },

    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },

    /**
   * 初始化 tagsList
   */
    initTagsViewList(state) {
      state.tagsViewList = []
    },

    /**
     * 添加 tags
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find(item => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },

    /**
     * 为指定的 tag 修改 title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     *
     * @param {删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload}
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        state.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
      }
      setItem(TAGS_VIEW, state.tagsViewList)
    }

  }

}
