import VueRouter from 'vue-router'
import Vue from 'vue'

// 懒加载引入页面组件，es6语法
const Home = () => import('views/movielist/MovieList')
const SearchList = () => import('views/searchlist/SearchList')
const Player = () => import('views/player/Player')
const CollectionList = () => import('views/collectionlist/CollectionList')
const HistoryList = () => import('views/historylist/HistoryList')

// 使用安装路由插件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/searchlist',
    name: 'searchlist',
    component: SearchList
  },
  {
    path: '/player',
    name: 'player',
    component: Player
  },
  {
    path: '/collectionlist',
    name: 'collectionlist',
    component: CollectionList
  },
  {
    path: '/historylist',
    name: 'historylist',
    component: HistoryList
  }
]

// 创建路由对象
const router = new VueRouter({
  mode: 'history',
  routes
})

// 导出router
export default router
