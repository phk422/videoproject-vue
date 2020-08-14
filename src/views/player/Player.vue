<template>
	<div class="player">
		<!--当前播放导航-->
		<el-breadcrumb class="bread"
									 separator-class="el-icon-arrow-right"
									 v-if="this.$route.path.indexOf('player') > -1">
			<el-breadcrumb-item :to="{ path: '' }"><a href="/home">返回首页</a></el-breadcrumb-item>
			<el-breadcrumb-item>正在播放：<span class="reslut">{{video.vname}}</span></el-breadcrumb-item>
		</el-breadcrumb>
		<el-row style="padding-top: 12px"  :gutter="20"><!--gutter为栅格的间隔-->
			<!--播放列-->
			<el-col :md="15">
				<!--视频播放框-->
				<p-video :video-url="baseURL + video.vurl" :cover-url="baseURL + video.coverurl" v-if="showVideo"
								 v-loading="video.url"
								 element-loading-text="视频加载中"
								 element-loading-spinner="el-icon-loading"/>
				<span class="video-name">{{video.vname}}</span>
				<!--视频标签-->
				<div class="v-tag">
					<el-tag class="tag"
									size="medium"
									v-for="(tag,index) in tags"
									:key="index"
									:type="types[index]"
									effect="plain">
						{{ tag }}
					</el-tag>
					<el-input
									class="input-new-tag"
									v-if="inputVisible"
									size="mini"
									v-model="inputValue"
									ref="saveTagInput"
									@keyup.enter.native="handleInputConfirm"
									@blur="handleInputConfirm"
					/>
					<el-button v-else class="button-new-tag" size="mini"  @click="showInput">+ 添加标签</el-button>
				</div>

				<span class="description">{{getVisited(video.visited) + "次播放,发布时间：" + video.releasetime}}</span>
				<div class="el-icon-collection">
					{{"已收藏" + collectionNum + "次"}}
					<el-button
									type="danger"
									size="mini"
									icon="el-icon-star-off"
									:disabled="isCollection"
									@click="collection(video.vid)">
						{{isCollection ? "您已收藏" : "点击收藏"}}
					</el-button>
				</div>

				<!--评论-->
				<comment :vid="video.vid"/>
			</el-col>
			<!--推荐列-->
			<el-col :md="9">
				<div class="about">
					<div>相关推荐</div>
					<el-button
									type="primary"
									size="small"
									icon="el-icon-refresh"
									circle
									@click="updateVideos">换一换</el-button>
				</div>

				<el-row class="item" v-for="(item,index) in videos" :key="index" :title="item.vname" @click.native="toPlayer(item)" >
					<div class="content">
						<el-col :span="11" class="img-col">
							<el-image lazy fit="cover" :src="baseURL + item.coverurl" class="coverImg"/>
						</el-col>
						<el-col :span="13" class="detail">
							<span class="vname">{{item.vname}}</span>
							<div class="visited">{{getVisited(item.visited)}}次观看</div>
						</el-col>
					</div>
				</el-row>


			</el-col>



		</el-row>


	</div>
</template>

<script>
	import PVideo from "components/pvideo/PVideo";
	import Comment from "components/comment/Comment";

	import {addVisited, getVideoByCid,addTag} from "network/video";
	import {getArrayItems,handleVisited} from "assets/js/utils";
	import {getCollectionNum, isCollection, userCollection} from "network/collection";
	import {addHistory} from "network/history";

	export default {
		name: "Player",
		components: {Comment, PVideo},
		data() {
			return {
				// video: this.$store.state.playerVideo,
				video: JSON.parse(sessionStorage.getItem("video")),
				// 标签的样式数组
				types: ['', 'success', 'info', 'danger', 'warning'],
				// 标签
				tags: [],
				//相关推荐videos
				videos: [],
				showVideo: true,
				isCollection: false, // 用户收藏状态
				collectionNum: 0, // 收藏次数

				inputVisible: false,
				inputValue: ''
			}
		},
		methods: {
			// 添加标签相关方法
			showInput() {
				this.inputVisible = true;
				this.$nextTick(() => {
					this.$refs.saveTagInput.$refs.input.focus();
				});
			},
			handleInputConfirm() {
				let inputValue = this.inputValue;
				if(!inputValue) {

				}else if(this.tags.indexOf(inputValue) !== -1) {
					this.$message.info("该标签已存在！")
				}else {
					this.tags.push(inputValue);
					addTag(this.tags.join("，"),this.video.vid).then(res => console.log(res)) // 添加标签
				}
				this.inputVisible = false;
				this.inputValue = '';
			},

			// 换一换
			updateVideos() {
				getVideoByCid(this.video.cid).then(res => {
					// 排除当前播放的视频
					for(let i = 0;i < res.length;i++) {
						if(res[i].vid == this.video.vid) {
							res.splice(i,1)
						}
					}
					// 随机选取六条
					this.videos = getArrayItems(res,6)
				})
			},
			// 格式化拜访次数，23001=》2.3万
			getVisited(visited) {
				return handleVisited(visited)
			},

      // 跳转到播放页面，携带video数据
			toPlayer(item) {
				this.showVideo = false
				// 异步更新dom,重新渲染pvideo
				this.$nextTick(() => {
					this.showVideo = true
				})

				// 回到顶部
				scrollTo(0,0)

				this.video = item
				// 添加播放次数
				addVisited(item.vid)

				// 根据此视频判断当前用户是否收藏
				const user = this.$user
				if(user) {
					isCollection(user.uid,item.vid).then(res => {
						if(res) {
							this.isCollection = true
						}else {
							this.isCollection = false
						}
					})
				}

				// 获取当前视频收藏次数
				getCollectionNum(this.video.vid).then(res => {
					this.collectionNum = res
				})

				// 添加播放历史记录
				if(user) {
					addHistory(user.uid,this.video.vid).then(res => {
						// console.log(res);
					})
				}

			},
		/*	// 用户点击收藏
			collection() {
				// 获取user
				let user = this.$user
				if (!user) {
					this.$toast.show("用户未登录",2000)
				}
			},*/
			// 用户点击收藏
			collection(vid) {
				// 1.判断用户是否登录
				// 1.1 通过cookie获取用户
				const user = this.$user
				if(user) {
					// 用户已登录
					// console.log(user);
					// 添加收藏
					userCollection(user.uid,vid).then((res) => {
						// console.log(res);
						if(res === 1) {
							this.collectionNum ++
							this.isCollection = true
							// 收藏成功
							this.$notify.success({
								title: '收藏成功',
								duration: 2000
							})
						}
					})
				}else {
					// 用户未登录，给出提示
					this.$notify({
						title: '提示',
						message: '要登陆后才可以收藏哦！',
						type: 'warning',
						duration: 3000
					});
				}
			},

		},

		created() {
			// console.log("create")
			// 将关键字以逗号分隔为数组保存到标签组
			this.tags = this.video.keyword.split("，")
			// 相关推荐列表
			this.updateVideos();
			// 获取当前登录对象
			const user = this.$user
			if(user) {
				isCollection(user.uid,this.video.vid).then(res => {
					if(res) {
						this.isCollection = true
					}
				})
			}

			// 获取当前视频收藏次数
			getCollectionNum(this.video.vid).then(res => {
				this.collectionNum = res
			})
		},

		watch: {
			// 当video改变时修改标签组
			video(newVal) {
				// 将关键字以逗号分隔为数组保存到标签组
				this.tags = newVal.keyword.split("，")
			}
		}
	}
</script>

<style scoped>

	.player {
		padding-top: 20px;
		padding-left: 6%;
		padding-right: 6%;
	}

	.about {
		font-size: 18px;
		margin-top: 10px;
		display: flex;
		justify-content: space-between;
	}
	.content {
		padding-bottom: 20px;
	}

	.item {
		cursor: pointer;
		margin-bottom: 10px;
		border-bottom: 1px solid rgba(34, 36, 38, .15);
		box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15);
	}
	.item:hover {
		background-color: rgb(236, 245, 255);
		color: rgb(102, 177, 255);
	}

	.img-col {
		padding-right: 10px;
	}
	.coverImg {
		margin-top: 10px;
		margin-bottom: 8px;
		width: 100%;
		/*height: 120px;*/
		border-radius: 3px;
	}

	.detail {
		margin-top: 8%;
	}

	.vname {
		font-weight: 600;
		font-size: 15px;

		height: 40px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2; /*行数*/
		-webkit-box-orient: vertical;
	}

	.visited {
		font-size: 13px;
		padding-top: 6px;
	}

	.video-name {
		font-size: 20px;
		padding-top: 20px;
		display: block;
	}

	.description {
		display: block;
		padding-top: 10px;
		font-size: 13px;
		color: rgb(127, 102, 102);
	}

	.v-tag {
		padding-top: 10px;
	}
	.tag{
		margin-right: 3px;
	}

	.el-icon-collection {
		padding-top: 10px;
		font-size: 13px;
		padding-right: 10px;
	}

	.bread {
		font-size: 15px;
	}

	/*处于手机屏幕时*/
	@media screen and (max-width: 768px){
		.player {
			padding-left: 1%;
			padding-right: 1%;
		}

		.vname {
			font-size: 13px;
		}

		.visited {
			font-size: 11px;
		}
	}


	.button-new-tag {
		height: 28px;
		line-height: 28px;
		color: #66b1ff;
		padding-top: 0;
		padding-bottom: 0;
	}
	.input-new-tag {
		width: 90px;
		vertical-align: bottom;
	}



</style>
