<template>
  <video-player
    ref="videoPlayer"
    class="vjs-custom-skin video-player"
    :options="playerOptions"
    :playsinline="true"
    custom-event-name="customstatechangedeventname"
    @ready="playerReadied"
    @loadeddata="onPlayerLoadeddata($event)"
    @canplay="onPlayerCanplay($event)"
    @canplaythrough="onPlayerCanplaythrough($event)"
    @play="onPlayerPlay($event)"
    @playing="onPlayerPlaying($event)"
    @timeupdate="onPlayerTimeupdate($event)"
    @pause="onPlayerPause($event)"
    @waiting="onPlayerWaiting($event)"
    @ended="onPlayerEnded($event)"
    @statechanged="playerStateChanged($event)"
  />
</template>

<script>
export default {
  name: 'PVideo',
  props: {
    videoUrl: String,
    coverUrl: String // 封面
  },
  data() {
    return {
      playerOptions: {
        techOrder: ['html5', 'flash'], // 兼容顺序,使用flash播放，可以播放flv格式的文件
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: true, // 如果true,浏览器准备好时开始回放
        notSupportedMessage: '此视频暂无法播放!', // 无法播放时显示的信息
        sourceOrder: true,
        loop: false, // 导致视频一结束就重新开始。
        // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        muted: false, // 默认情况下将会消除任何音频。
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: false, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        flash: {
          hls: { withCredentials: false }
        },
        sources: [
          {
            type: 'video/mp4', // 资源格式写法：'video/mp4'
            src: this.videoUrl // 本地资源地址，注意：本地资源存放在public文件夹中，本文视频资源路径public/video/1.mp4
          }
        ],
        poster: this.coverUrl, // 你的封面地址
        // width: document.documentElement.clientWidth,
        // height: this.fileAreaHeight, // 设置高度，fluid需要设置成flase
        // 配置控制栏
        controlBar: {
          timeDivider: true, // 时间分割线
          durationDisplay: true, // 总时间
          progressControl: true, // 进度条
          remainingTimeDisplay: false, // 剩余时间
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  created() {
    // console.log(this.videoUrl);
  },
  methods: {
    // --------------------视频播放-开始-------------------- */

    // 初始化话播放-在onPlayerCanplay中调用
    initPlay(player) {
      // console.log('initPlay>当前视频播放器实例对象', this.player);
      player.play()
    },

    /* 视频播放 */
    // 视频准备完毕
    playerReadied(player) {
      // console.log('Readied>视频准备完毕!', player);
    },

    // 视频加载完成
    onPlayerLoadeddata(player) {
      // console.log('Loadeddata>视频加载完成!', player);
    },

    // 可以播放视频
    onPlayerCanplay(player) {
      // console.log('Canplay>可以播放视频!', player);
      // this.initPlay(player);
    },

    // 拖动视频条会触发事件-视频暂停>可以播放视频>可以播放视频至拖动位置>视频播放>视频加载中>可以播放视频>视频播放中>视频加载中>可以播放视频>视频播放中>视频加载中>可以播放视频>视频播放中>可以播放视频至拖动位置
    // 可以播放视频至拖动位置
    onPlayerCanplaythrough(player) {
      // console.log('Canplaythrough>可以播放视频至拖动位置!', player);
    },

    // 视频播放
    onPlayerPlay(player) {
      // console.log('Play>视频播放!', player);
    },

    // 视频播放中
    onPlayerPlaying(player) {
      // console.log('Playing>视频播放中!', player);
    },

    // 视频时间更新中
    onPlayerTimeupdate(player) {
      // console.log('Timeupdate>视频时间更新中!', player);
    },

    // 视频暂停
    onPlayerPause(player) {
      // console.log('Pause>视频暂停!', player);
    },

    // 视频加载中
    onPlayerWaiting(player) {
      // console.log('Waiting>视频加载中!', player);
    },

    // 视频状态改变
    playerStateChanged(playerCurrentState) {
      // console.log('StateChanged>视频状态改变', playerCurrentState);
    },

    // 视频播放结束
    onPlayerEnded(player) {
      // console.log('Ended>视频播放结束!', player);
    }

    // --------------------视频播放-结束-------------------- */
  }
}
</script>

<style scoped>
/* /deep/vue中的样式穿透 */
/*修改默认样式*/
::v-deep.video-js .vjs-big-play-button {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
</style>
