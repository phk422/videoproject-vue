<template>
  <div id="category-btn">
    <el-button
      v-for="(item, index) in videoCategory"
      :key="index"
      type="primary"
      size="medium"
      :plain="currentIndex != index"
      circle
      @click="btnClick(item.cid, index)"
    >{{ item.cname }}
    </el-button>
  </div>
</template>

<script>
import { getCategory, getPageBean } from 'network/video'

export default {
  name: 'CategoryBtn',
  data() {
    return {
      currentIndex: 0,
      videoCategory: [] // 电影分类
    }
  },
  created() {
    getCategory().then((res) => (this.videoCategory = res))
    // 当组件加载的时候默认当前活跃页
    getPageBean(this.currentIndex + 1, 1, 6).then((res) => {
      this.$store.commit('getPageBean', res)
    })
  },
  methods: {
    btnClick(cid, index) {
      this.currentIndex = index
      // 页码变为1
      this.$store.commit('updatePage', 1)
      this.$store.commit('saveCid', cid)
      this.$store.dispatch('getPageBean')
    }
  }
}
</script>

<style scoped>
#category-btn {
  padding-left: 14%;
  padding-right: 6%;
  padding-top: 20px;
}
el-btn {
  background: #409eff;
}

/*处于手机屏幕时*/
@media screen and (max-width: 768px) {
  #category-btn {
    padding-left: 0.5%;
    padding-right: 0.5%;
    padding-top: 3%;
    text-align: center;
  }
}
</style>
