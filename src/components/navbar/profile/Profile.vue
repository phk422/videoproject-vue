<template>
  <div id="profile">
    <!--登录弹窗-->
    <el-dialog
      title="用户登录"
      append-to-body
      :visible.sync="dialogVisible"
      width="85%"
      center
    >
      <el-input placeholder="请输入登录账号" v-model="username" clearable>
      </el-input>
      <br />
      <br />
      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
      <br />
      <br />
      <span class="register"
        >没有账号？<a href="javascript:void(0)" @click="dialogVisible2 = true"
          >点击注册</a
        ></span
      >

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="isLoading" @click.native="loginBtn"
          >登 录</el-button
        >
      </span>
    </el-dialog>
    <!--注册弹窗-->
    <el-dialog
      title="用户注册"
      append-to-body
      :visible.sync="dialogVisible2"
      width="85%"
      center
    >
      <el-col class="avatar-name" style="padding-bottom: 10px">
        <img :src="imageUrl" class="avatar" /><br />
        <el-upload
          ref="uploadImg"
          class="avatar-uploader"
          :auto-upload="false"
          :action="baseURL + '/upload'"
          :show-file-list="false"
          :on-change="imgChange"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <el-button
            type="primary"
            size="medium"
            class="el-icon-plus avatar-uploader-icon"
            >上传头像</el-button
          >
        </el-upload>
      </el-col>

      <el-input
        placeholder="请输入您的昵称"
        v-model="nickname"
        @blur="nickNameBlur"
        clearable
      >
      </el-input>
      <br />
      <br />
      <el-input
        placeholder="请输入手机号码"
        v-model="phone"
        @blur="phoneBlur"
        clearable
      >
      </el-input>
      <br />
      <br />
      <el-input
        placeholder="请输入密码"
        v-model="password"
        show-password
      ></el-input>
      <br />
      <br />
      <el-input
        placeholder="确认密码"
        v-model="repassword"
        show-password
      ></el-input>
      <br />
      <br />
      <el-input
        placeholder="请输入验证码"
        v-model="rcode"
        style="width: 45%; padding-right: 2px"
      ></el-input>
      <el-button type="primary" @click="getCode" :disabled="isBtn">{{code}}</el-button>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="isLoading" @click.native="register"
          >注 册</el-button
        >
      </span>
    </el-dialog>

    <el-row justify="center">
      <el-col class="avatar-name">
        <img :src="baseURL + user.avatarurl" class="avatar" v-if="user" />
        <img src="~assets/img/icon/avatar.png" class="avatar" v-else /><br />
        <el-button
          type="danger"
          size="small"
          @click="dialogVisible = true"
          v-if="!user"
          >登录/注册</el-button
        >
        <span v-else>{{ user.nickname }}</span>
      </el-col>
    </el-row>

    <div class="graySpace" />
    <el-row :gutter="3">
      <el-col
        :span="8"
        class="item"
        v-for="(item, index) in items"
        :key="index"
        @click.native="itemClick(item.item)"
      >
        <img :src="item.img" alt="" class="icon-img" />
        <div class="detail">{{ item.item }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userMixin } from "assets/js/mixin";

export default {
  name: "Profile",
  mixins: [userMixin],
  data() {
    return {
      items: [
        { img: require("assets/img/icon/history.png"), item: "历史记录" },
        { img: require("assets/img/icon/mylike.png"), item: "我的收藏" },
        { img: require("assets/img/icon/profile.png"), item: "个人资料" },
        { img: require("assets/img/icon/exit.png"), item: "退出登录" },
      ],
    };
  },
  methods: {
    itemClick(item) {
      if (this.user === null) {
        this.$message({
          message: "尚未登录！",
          type: "warning",
        });
      } else {
        if (item === "我的收藏") {
          this.toCollection();
        } else if (item === "历史记录") {
          this.toHistory();
        } else if (item === "个人资料") {
        } else {
          this.exitLogin();
        }
      }
    },
  },
};
</script>

<style scoped>
#profile {
  padding-top: 10px;
  /*background-color: #9acfea;*/
}

.graySpace {
  background: #eee;
  height: 20px;
}

.avatar-name {
  text-align: center;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
}

.item {
  margin-top: 5px;
  cursor: pointer;
  text-align: center;
}

.detail {
  font-size: 15px;
}

.icon-img {
  width: 50%;
}
</style>
