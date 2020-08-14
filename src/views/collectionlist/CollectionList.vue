<template>
	<div id="collection-list">
		<!--搜索结果面包屑-->
		<el-breadcrumb class="bread"
									 separator-class="el-icon-arrow-right"
									 v-if="this.$route.path.indexOf('collectionlist') > -1">
			<el-breadcrumb-item :to="{ path: '' }"><a href="/home">返回首页</a></el-breadcrumb-item>
			<el-breadcrumb-item>我的收藏：共<span class="reslut">({{videos.length}}}</span>条</el-breadcrumb-item>
		</el-breadcrumb>



		<el-row class="movie-list" v-if="videos.length !== 0">
			<el-col :md="6" :sm="8" :xs="12" v-for="(video,index) in videos" :key="index">
				<movie-item :video="video" date-tit="收藏时间：" >
					<el-button
									slot="remove"
									class="remove-slot"
									type="danger"
									icon="el-icon-delete"
									circle
									size="small"
									@click.stop="removeCollection(video)"
									title="移除该条收藏"/>
				</movie-item>
			</el-col>
			<el-col style="text-align: center">
				<el-button
								type="danger"
								icon="el-icon-delete"
								round
								@click="removeAll"
								title="一键清空">一键清空</el-button>
			</el-col>

		</el-row>



		<el-row v-else class="not-result">
			<el-col :span="12" :offset="6">
				<img src="~assets/img/icon/not-collection.png">
				<div>暂无收藏</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import {getCollectionByUid} from "network/video";
	import MovieItem from "components/movieitem/MovieItem"
	import {getDate} from "assets/js/utils";
	import {removeCollection} from "network/collection";

	export default {
		name: "CollectionList",
		components: {MovieItem},
		data() {
			return {
				videos: [],
				uid: this.$user.uid,
			}
		},
		methods: {
			// 移除单个收藏
			removeCollection(video) {
				this.$confirm('确认移除吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					// 确认
					removeCollection(this.uid,video.vid).then(res => {
						// console.log(res);
						// 将要删除的当前video对象移除数组
						// 获取下标
						const index = this.videos.indexOf(video)
						if(index > -1) {
							this.videos.splice(index,1)
						}
					})

					this.$message({
						type: 'success',
						message: '移除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					})
				})
			},
			removeAll(){
				// 移除所有收藏
				this.$confirm('确认移除所有收藏吗？', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let arr = []
					for(let i of this.videos) {
						arr.push(i.vid)
					}
					let vidStr = arr.join(",")
					// console.log(vidStr);
					// 确认
					removeCollection(this.uid,vidStr).then(res => {
						this.videos = []
					})

					this.$message({
						type: 'success',
						message: '移除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					})
				})
			}

		},
		created() {
			// 获取当前用户
			if(this.uid) {
				getCollectionByUid(this.uid).then(res => {
					for(let i of res) {
						// 时间转换
						i.releasetime = getDate(i.releasetime)
						// console.log(getDate(i.releasetime));
					}
					this.videos = res
				})
			}



		}
	}
</script>

<style scoped>
	#collection-list {
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
