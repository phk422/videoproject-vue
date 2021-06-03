<template>
  <div v-if="$user && videos.length > 0" id="recommend">
    <el-tag style="font-size: 15px" type="danger" effect="light">
      猜您喜欢
    </el-tag>
    <div class="text-container">
      <transition class="inner-container" name="slide" mode="out-in">
        <div
          v-if="text.val !== undefined"
          :key="text.id"
          class="text"
          @click="toPlayer(text.val)"
        >
          {{ text.val.vname }}
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { getRecommendVideos } from 'network/video'
import { toPlayerMixin } from 'assets/js/mixin'

export default {
  name: 'Recommend',
  mixins: [toPlayerMixin],
  data() {
    return {
      videos: [],
      number: 0
    }
  }, // 混入toPlayer()方法
  computed: {
    text() {
      return {
        id: this.number,
        val: this.videos[this.number]
      }
    }
  },
  mounted() {
    this.startMove()
  },
  created() {
    const user = this.$user
    if (user) {
      getRecommendVideos(user.uid).then((res) => {
        this.videos = res
      })
    }
  },

  methods: {
    startMove() {
      setTimeout(() => {
        if (this.number === this.videos.length - 1) {
          this.number = 0
        } else {
          this.number += 1
        }
        this.startMove()
      }, 3000)
    }
  }
}
</script>

<style scoped>
#recommend {
  padding-top: 20px;
  padding-right: 6%;
  display: flex;
  align-items: center;
}

/*处于手机屏幕时*/
@media screen and (max-width: 768px) {
  #recommend {
    padding-left: 0.5%;
    padding-right: 0.5%;
    padding-top: 3%;
  }
}

.text-container {
  height: 30px;
  overflow: hidden;
}
.text {
  color: #66b1ff;
}
.text-container div {
  margin-top: 5px;
  cursor: pointer;
  height: 20px;
  overflow: hidden;
  width: 450px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; /*行数*/
  -webkit-box-orient: vertical;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s linear;
}
.slide-leave-to {
  transform: translateY(-20px);
}
.slide-enter {
  transform: translateY(20px);
}
</style>
