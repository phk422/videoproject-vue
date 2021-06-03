<template>
  <div id="comment">
    <!--评论条数-->
    <el-row
      style="font-size: 20px; padding-top: 10px"
    >{{ comments.length }}条评论</el-row>
    <!--评论框-->
    <el-row type="flex" align="middle" class="content">
      <el-col :span="2">
        <img
          v-if="!$user"
          class="u-avatar"
          src="~assets/img/icon/avatar.png"
          alt=""
        >
        <img v-else class="u-avatar" :src="baseURL + $user.avatarurl" alt="">
      </el-col>
      <el-col :span="15" :offset="1">
        <el-input
          v-model="content"
          type="textarea"
          :rows="3"
          :disabled="!$user"
          :placeholder="$user ? '请输入评论' : '登陆后才可评论！'"
        />
      </el-col>
      <el-col :span="6" :offset="1">
        <el-button
          type="primary"
          :disabled="!$user"
          @click.native="addComment"
        >发布评论</el-button>
      </el-col>
    </el-row>
    <!--评论内容-->
    <el-row
      v-if="comments.length === 0"
      style="height: 100px"
      type="flex"
      align="middle"
      justify="center"
    >暂无评论！</el-row>
    <el-row v-for="(comment, index) in comments" :key="index" class="content">
      <el-col :span="2">
        <img class="u-avatar" :src="baseURL + comment.avatarurl">
      </el-col>
      <el-col :span="21" :offset="1">
        <div class="u-nickname">{{ comment.nickname }}</div>
        <span class="time">{{ getDate(comment.date) }}</span>
        <!--	<el-popover
								placement="top"
								width="150"
								trigger="hover">
					<p>确定删除该条评论吗？</p>
					<div style="text-align: right; margin: 0">
						<el-button type="primary" size="mini" @click="deleteComment(comment.commentId)">确定</el-button>
					</div>
					<i class="el-icon-delete" slot="reference">删除</i>
				</el-popover>-->
        <div class="comment">
          {{ comment.content }}
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getComments, addComment } from 'network/comment'
import { formatDate } from 'assets/js/utils'
export default {
  name: 'Comment',
  components: {},
  props: {
    vid: Number
  },
  data() {
    return {
      content: '',
      comments: []
    }
  },
  watch: {
    vid(newVal) {
      // 加载当前视频的评论
      getComments(newVal).then((res) => {
        this.comments = res
      })
    }
  },
  created() {
    // 加载当前视频的评论
    getComments(this.vid).then((res) => {
      this.comments = res
    })
  },
  methods: {
    getDate(date) {
      return formatDate(new Date(date), 'yyyy-MM-dd hh:mm:ss')
    },
    // 添加评论
    addComment() {
      const user = this.$user
      if (user) {
        if (this.content === '' || this.content === null) {
          this.$message.warning('评论内容不能为空!')
          return
        }
        addComment(user.uid, this.vid, this.content).then((res) => {
          if (res === 1) {
            this.$message.info('发布评论成功！')
            this.comments.splice(0, 0, {
              avatarurl: user.avatarurl,
              nickname: user.nickname,
              content: this.content,
              date: new Date()
            })
            this.content = ''
          }
        })
      }
    }
    // 删除当前评论
    // deleteComment(contentId) {
    // 	deleteCommentById(contentId) // 删除评论
    //
    // }
  }
}
</script>

<style scoped>
#comment {
  border-top: 1px solid #9d9d9d;
  margin-top: 20px;
}

.u-avatar {
  width: 90%;
  border-radius: 50%;
}

.u-nickname {
  display: inline;
  cursor: pointer;
  color: #66b1ff;
}

.time {
  margin-left: 10px;
  font-size: 15px;
  color: #9d9d9d;
}

.comment {
  padding-top: 5px;
  font-size: 20vm;
  line-height: 1.7;
  padding-bottom: 15px;
  border-bottom: 1px solid #9d9d9d;
}

.content {
  margin-top: 20px;
  padding-bottom: 20px;
}

.el-icon-delete {
  cursor: pointer;
  margin-left: 10px;
  color: #9d9d9d;
}
</style>
