<template>
  <!--搜索框-->
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    placeholder="搜索您想看到视频"
    clearable
    suffix-icon="el-icon-search"
    size="medium"
    :debounce="1000"
    :style="sw"
    @select="handleSelect"
    @focus="userFocus"
    @keyup.enter.native="onSearch"
  />
</template>

<script>
import { getNumVideo, getUserInput } from 'network/video'

export default {
  name: 'SearchBox',
  props: {
    sw: {
      type: String,
      default: 'width:60%'
    }
  },
  data() {
    return {
      restaurants: [],
      state: '',
      timer: null
    }
  },
  methods: {
    // 跳转搜索页面，传递搜索框的参数
    toSearchList() {
      this.$store.commit('saveValue', this.state)
      this.$store.dispatch('getPageBeanByValue')
      this.$router.push('/searchlist')
    },
    // 回车事件
    onSearch() {
      // 正则去空格
      if (this.state.replace(/\s*/g, '')) {
        this.toSearchList()
      } else {
        this.$message({
          showClose: true,
          message: '不能为空！',
          type: 'warning'
        })
      }
    },

    loadAll() {
      getNumVideo(10).then((res) => {
        // map可以改变原json
        this.restaurants = res.map((item) => {
          return {
            value: item.vname
          }
        })
      })
    },

    // 重点：当框中的改变时触发该方法，elementui自动设置了防抖，参见debounce属性
    // queryString 为输入框中的值。cb为返回显示列表的回调函数
    querySearchAsync(queryString, cb) {
      if (queryString) {
        getUserInput(queryString).then((res) => {
          this.restaurants = res.map((item) => {
            return {
              value: item.vname
            }
          })
          cb(this.restaurants)
        })
      } else {
        cb(this.restaurants)
      }
    },

    createStateFilter(queryString) {
      return (state) => {
        return (
          state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    },
    handleSelect(item) {
      this.toSearchList()
      // console.log(item);
    },
    userFocus() {
      this.loadAll()
    }
  }
}
</script>

<style scoped>
</style>
