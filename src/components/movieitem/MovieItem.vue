<template>
  <el-col style="padding-right: 7px; padding-left: 7px">
    <div style="cursor: pointer" @click="toPlayer(video)" :title="video.vname">
      <el-card :body-style="{ padding: '0px' }" class="card">
        <div class="imgs">
          <el-image
            lazy
            fit="cover"
            :src="baseURL + video.coverurl"
            class="coverImg"
          />
          <img
            src="~assets/img/icon/play-icon.png"
            class="play-icon el-image"
            alt=""
          />
        </div>
        <div style="padding: 14px">
          <span class="tit">{{ video.vname }}</span>
          <div class="bottom clearfix">
            <time class="time">{{ dateTit + video.releasetime }}</time>
          </div>
          <div class="num">
            {{ getVisited(video.visited) + "次观看" }}
            <!--设置一个插槽，在收藏界面显示移除-->
            <slot class="remove-slot" name="remove" />
          </div>
        </div>
      </el-card>
    </div>
  </el-col>
</template>

<script>
import { handleVisited } from "assets/js/utils";
import { toPlayerMixin } from "assets/js/mixin";

export default {
  name: "MovieItem",
  mixins: [toPlayerMixin],
  props: {
    video: {
      type: Object,
      default: null,
    },
    // 时间前的描述
    dateTit: {
      type: String,
      default: "",
    },
  },
  methods: {
    getVisited(visited) {
      return handleVisited(visited);
    },
  },
};
</script>

<style scoped>
.time {
  font-size: 15px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.tit {
  font-weight: 700;
  font-size: 18px;

  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /*行数*/
  -webkit-box-orient: vertical;
}

.num {
  position: relative;
  font-size: 15px;
  padding-top: 9px;
}

/*处于手机屏幕时*/
@media screen and (max-width: 768px) {
  .tit {
    font-weight: 600;
    font-size: 12px;
    height: 32px;
  }
  .time {
    font-size: 10px;
    color: #999;
  }
  .num {
    font-size: 9px;
    padding-top: 3px;
  }
  .bottom {
    margin-top: 2px;
    line-height: 7px;
  }
  .coverImg {
    height: 120px !important;
  }
}

.coverImg {
  width: 100%;
  height: 175px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.card {
  margin-bottom: 20px;
  transition: all 0.6s; /*所有属性变化在0.6秒内执行动画*/
}
.card:hover {
  transform: scale(1.06); /*鼠标放上之后元素变成1.06倍大小*/
}
.imgs {
  position: relative;
}
.play-icon {
  position: absolute;
  /*top: -15px;*/
  right: 2%;
  bottom: 5px;
  z-index: 7;
  width: 40px;
}
</style>
