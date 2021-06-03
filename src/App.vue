<template>
  <div id="app">
    <!--导航栏-->
    <nav-bar />
    <!--手机屏幕下显示的搜索框-->
    <div class="hidden-sm-and-up searchd"><search-box /></div>
    <!--下面的部分通过路由动态决定渲染与否-->
    <!--exclude,其值为正则，匹配到的组件的名称会被排除在keep-alive之外-->
    <keep-alive exclude="Player,CollectionList,HistoryList">
      <router-view />
    </keep-alive>
    <!--页脚-->
    <footer-bar />
    <!--回到顶部按钮-->
    <el-backtop :visibility-height="100" :bottom="60" />
  </div>
</template>

<script>
import NavBar from 'components/navbar/NavBar'
import SearchBox from 'components/searchbox/SearchBox'
import FooterBar from 'components/footerbar/FooterBar'

export default {
  name: 'App',
  components: {
    FooterBar,
    SearchBox,
    NavBar
  },
  created() {
    /**
     * 防止vuex中的state在界面刷新后丢失
     */
    // 在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }

    // 在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  methods: {

  }

}
</script>

<style>
@import "assets/css/base.css";

#app {
  overflow-y: scroll;
}
.searchd {
  margin-top: 15px;
  text-align: center;
}

/*.fade-enter-active,.fade-leave-active {
  -webkit-transition:opacity 1s;
  transition:opacity 1s
}
.fade-enter,.fade-leave-to {
  opacity:0
}*/
</style>
