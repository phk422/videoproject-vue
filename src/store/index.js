import Vuex from 'vuex'
import Vue from 'vue'
import { getPageBean, getPageBeanByValue } from 'network/video'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    pageBean: Object,
    activePage: 1,
    cid: 1,
    value: String // 搜索框的value
  },

  // 同步操作
  mutations: {
    // 获取分页视频
    getPageBean(state, pageBean) {
      state.pageBean = pageBean
    },
    // 存入cid
    saveCid(state, cid) {
      state.cid = cid
    },
    // 存入value
    saveValue(state, value) {
      state.value = value
    },
    // 存入playerVideo
    savePlayerVideo(state, palyerVideo) {
      state.playerVideo = palyerVideo
    },
    // 改变页数
    updatePage(state, newPage) {
      state.activePage = newPage
    }
  },

  // 异步操作
  actions: {
    getPageBean(context) {
      getPageBean(context.state.cid, context.state.activePage, 6).then(res => {
        context.commit('getPageBean', res)
      })
    },
    getPageBeanByValue(context) {
      getPageBeanByValue(context.state.value, context.state.activePage, 8).then(res => {
        console.log(res)
        context.commit('getPageBean', res)
      })
    }
  },
  getters: {},
  modules: {}
})

// 导出store
export default store
