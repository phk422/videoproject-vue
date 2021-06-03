<template>
  <div id="history-list">
    <!--搜索结果面包屑-->
    <el-breadcrumb
      v-if="this.$route.path.indexOf('historylist') > -1"
      class="bread"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item :to="{ path: '' }"><a href="/home">返回首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>播放历史记录：共<span class="reslut">({{ videos.length }}}</span>条</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row v-if="videos.length !== 0" class="movie-list">
      <el-col v-for="(video,index) in videos" :key="index" :md="6" :sm="8" :xs="12">
        <movie-item :video="video" date-tit="上次播放：">
          <el-button
            slot="remove"
            class="remove-slot"
            type="danger"
            icon="el-icon-delete"
            circle
            size="small"
            title="移除该历史记录"
            @click.stop="removeHistory(video)"
          />
        </movie-item>
      </el-col>
      <el-col style="text-align: center">
        <el-button
          type="danger"
          icon="el-icon-delete"
          round
          title="一键清空历史"
          @click="removeAll"
        >一键清空历史</el-button>
      </el-col>

    </el-row>

    <el-row v-else class="not-result">
      <el-col :span="12" :offset="6">
        <img src="~assets/img/icon/not-history.png">
        <div>无播放历史</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import MovieItem from 'components/movieitem/MovieItem'

import { getHistoryByUid } from 'network/video'
import { getDate } from 'assets/js/utils'
import { deleteHistory } from 'network/history'

export default {
  name: 'HistoryList',
  components: { MovieItem },
  data() {
    return {
      videos: [],
      uid: this.$user.uid // 用户id
    }
  },
  created() {
    if (this.uid) {
      // 加载当前用户播放的历史记录
      getHistoryByUid(this.uid).then(res => {
        for (const i of res) {
          // 时间转换
          i.releasetime = getDate(i.releasetime)
          // console.log(getDate(i.releasetime));
        }
        this.videos = res
      })
    }
  },
  methods: {
    // 清除当前历史记录
    removeHistory(video) {
      this.$confirm('确认移除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 确认
        deleteHistory(this.uid, video.vid).then(res => {
          // 将要删除的当前video对象移除数组
          // 获取下标
          const index = this.videos.indexOf(video)
          if (index > -1) {
            this.videos.splice(index, 1)
          }
        })
        this.$message({
          type: 'success',
          message: '移除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    // 清空所有历史记录
    removeAll() {
      // 移除所有收藏
      this.$confirm('确认移除所有播放历史记录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const arr = []
        for (const i of this.videos) {
          arr.push(i.vid)
        }
        const vidStr = arr.join(',')
        // 确认
        deleteHistory(this.uid, vidStr).then(res => {
          this.videos = []
        })

        this.$message({
          type: 'success',
          message: '移除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  }
}
</script>

<style scoped>
#history-list {
  padding-left: 6%;
  padding-right: 6%;
  padding-top: 30px;
}

.bread {
  font-size: 15px;
}

.movie-list {
  padding-top: 15px;
}

.reslut {
  color: red;
}

.not-result {
  padding-top: 100px;
  padding-bottom: 100px;
  text-align: center;
}

.remove-slot {
  position: absolute;
  right: 5px;
  bottom: 2px;
}
</style>
