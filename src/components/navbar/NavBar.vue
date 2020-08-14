<template>
	<div>
		<el-row id="navbar" class="main el-table__fixed-header-wrapper">
			<!--logo-->
			<el-col :sm="5" class="right">
				<a href="/home" class="tit">
					<img src="~assets/img/icon/logo.png" class="logo">
					<span>在线视频点播系统</span>
				</a>
				<i class="search-icon el-icon-more" @click="drawer = true"></i><!--隐藏的部分-->
				<el-drawer
								append-to-body
								title="我是标题"
								:visible.sync="drawer"
								:with-header="false"
								size="55%"
								direction="ttb">
					<profile/>
				</el-drawer>
			</el-col>
			<!--搜索框-->
			<el-col :sm="14" class="search">
				<search-box/>
			</el-col>
			<!--用户信息-->
			<el-col :sm="5" class="user-info">
				<!--头像-->
				<img v-if="!user" src="~assets/img/icon/avatar.png" @click="dialogVisible = true" title="点击登录"
						 class="el-avatar--medium" style="cursor: pointer" alt="">
				<img v-else :src="baseURL +user.avatarurl" class="el-avatar--circle  el-avatar--medium" alt="">
				<!--下拉菜单-->
				<el-dropdown class="drop">
					<span class="el-dropdown-link">
						<span v-if="user">{{user.nickname}}</span>
						<span v-else @click="dialogVisible = true" title="点击登录">登录/注册</span>

						<!--登录弹窗-->
		<el-dialog
						title="用户登录"
						append-to-body
						:visible.sync="dialogVisible"
						width="30%"
						center>
			<el-input
							placeholder="请输入登录账号"
							v-model="username"
							clearable>
			</el-input>
			<br/>
			<br/>
			<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
			<br/>
			<br/>
			<span class="register">没有账号？<a href="javascript:void(0)" @click="dialogVisible2 = true">点击注册</a></span>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" :loading="isLoading" @click.native="loginBtn">登 录</el-button>
			</span>
		</el-dialog>
						<!--注册弹窗-->
		<el-dialog
						title="用户注册"
						append-to-body
						:visible.sync="dialogVisible2"
						width="50%"
						center>

			<el-col class="avatar-name" style="padding-bottom: 10px">
				<img :src="imageUrl" class="avatar"/><br>
				<el-upload
								ref="uploadImg"
								class="avatar-uploader"
								:auto-upload="false"
								:action="baseURL + '/upload'"
								:show-file-list="false"
								:on-change="imgChange"
								:on-success="handleAvatarSuccess"
								:before-upload="beforeAvatarUpload">
					<el-button type="primary" size="medium" class="el-icon-plus avatar-uploader-icon">上传头像</el-button>
				</el-upload>
			</el-col>

			<el-input
							placeholder="请输入您的昵称"
							v-model="nickname"
							@blur="nickNameBlur"
							clearable>
			</el-input>
			<br/>
			<br/>
			<el-input
							placeholder="请输入手机号码"
							v-model="phone"
							@blur="phoneBlur"
							clearable>
			</el-input>
			<br/>
			<br/>
			<el-input placeholder="请输入密码" v-model="password" show-password></el-input>
			<br/>
			<br/>
			<el-input placeholder="确认密码" v-model="repassword" show-password></el-input>
			<br/>
			<br/>
			<el-input placeholder="请输入验证码" v-model="rcode" style="width: 45%;padding-right: 2px"></el-input>
			<el-button type="primary" @click="getCode" :disabled="isBtn">{{code}}</el-button>

			<span slot="footer" class="dialog-footer">
				<el-button type="primary" :loading="isLoading" @click.native="register">注 册</el-button>
			</span>
		</el-dialog>

						<i class="el-icon-arrow-down el-icon--right"></i>
					</span>
					<el-dropdown-menu/><!--防止该标签隐藏的时候控制台会报错-->
					<el-dropdown-menu slot="dropdown" class="iconsize" v-if="user">
						<el-dropdown-item icon="el-icon-user-solid" class="size">个人资料</el-dropdown-item>
						<el-dropdown-item icon="el-icon-star-on" class="size" @click.native="toCollection">我的收藏
						</el-dropdown-item>
						<el-dropdown-item icon="el-icon-video-camera-solid" class="size" @click.native="toHistory">播放历史
						</el-dropdown-item>
						<el-dropdown-item icon="el-icon-error" class="size" @click.native="exitLogin">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
		</el-row>
		<!--防止下面的盒子上移动，nav-bar脱离了标准流-->
		<div style="height: 50px;"/>
	</div>
</template>

<script>
	import SearchBox from "../searchbox/SearchBox";
	import Profile from "./profile/Profile";
	import {userMixin} from "assets/js/mixin";


	export default {
		name: "NavBar",
		mixins: [userMixin],
		data() {
			return {
				drawer: false
			}
		},
		components: {Profile, SearchBox},
	}
</script>

<style scoped>

	#navbar {
		height: 50px;
		border-bottom: 1px solid rgba(34, 36, 38, .15);
		box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15);

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #ffffff;
		z-index: 9;
	}

	.main {
		padding-left: 6%;
		padding-right: 6%;
	}

	.search-icon {
		display: none;
	}

	@media screen and (max-width: 768px) {
		.main {
			padding-left: 1%;
			padding-right: 1%;
		}

		.search, .user-info {
			display: none;
		}

		.search-icon {
			display: inline;
			cursor: pointer;
			font-size: 30px;
			align-content: flex-end;
		}

	}

	.right {
		word-break: keep-all; /* 不换行 */
		white-space: nowrap; /* 不换行 */
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tit {
		display: block;
		font-weight: 700;
		height: 45px;
		text-decoration: none;
		color: #333;
	}

	.tit span {
		margin-left: 5px;
	}

	.logo {
		width: 30px;
		position: relative;
		top: 5px;
	}

	.search {
		text-align: center;
		padding-top: 6px;
	}

	.user-info {
		padding-top: 6px;
		word-break: keep-all; /* 不换行 */
		white-space: nowrap; /* 不换行 */
	}

	.drop {
		cursor: pointer;
		position: relative;
		font-size: 16px;
		bottom: 10px;
		left: 5px;
	}

	.size {
		font-size: 16px;
	}
	.avatar-name {
		text-align: center;
	}

	.avatar {
		width: 70px;
		height: 70px;
		border-radius: 50%;
	}


</style>
