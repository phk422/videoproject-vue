<template>
  <div id="footer-bar">
    <div class="content">
      <img class="logo" src="~assets/img/icon/logo.png" alt="" />
      <div class="author">By 彭宏坤</div>
      <el-popover placement="top" offset="10" width="150" trigger="hover">
        <img class="er" src="~assets/img/icon/erweima.png" />
        <img
          class="weixin"
          src="~assets/img/icon/weixin.png"
          slot="reference"
        />
      </el-popover>
      <a href="https://github.com/phk422" target="_blank"
        ><img style="width: 30px" src="~assets/img/icon/github.png" alt=""
      /></a>
      <div class="statement">
        视频来源：<a href="https://haokan.baidu.com/?fr=pc_pz" target="_blank"
          >好看视频</a
        >
        |
        <a href="https://www.ixigua.com/" lo target="_blank">西瓜视频</a>
        图标来源：<a
          href="https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a"
          target="_blank"
          >阿里巴巴矢量图标库</a
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterBar",
};
</script>

<style scoped>
#footer-bar {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;

  padding-left: 6%;
  padding-right: 6%;
  margin-top: 30px;
  height: 150px;
  border-top: 2px solid rgba(34, 36, 38, 0.15);
  box-shadow: 0 1px 2px 0 rgba(34, 36, 38, 0.15);
  text-align: center;
}

.content {
  padding-top: 10px;
  font-size: 14px;
}
.logo {
  width: 30px;
  cursor: pointer;
}
.author,
.statement {
  padding-top: 5px;
}

.weixin {
  width: 30px;
  cursor: pointer;
}
.er {
  width: 150px;
}
</style>
