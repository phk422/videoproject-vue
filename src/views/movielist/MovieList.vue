<template>
	<div>

		<el-row >
			<el-col :md="12" >
				<!--影片分类按钮-->
				<category-btn/>
			</el-col>
			<el-col :md="12">
				<!--猜您喜欢-->
				<recommend/>
			</el-col>
		</el-row>
		<!--电影列表，与推荐列表-->
		<el-row id="movie-list">
			<!--电影列表-->
			<el-col :md="18">
				<el-col :md="8" :sm="12" :xs="12" v-for="(video,index) in $store.state.pageBean.list" :key="index">
					<movie-item :video="video"/>
				</el-col>
				<!--
					分页按钮：
						page-size：每页显示条数
						total：总条数
						hide-on-single-page： 页数为一时隐藏
				-->
				<el-col :span="24" class="pagination">
					<el-pagination
									background
									:small="screenWidth <= 768"
									hide-on-single-page
									layout="prev, pager, next"
									@current-change="handleCurrentChange"
									:current-page="$store.state.activePage"
									:page-size="6"
									:total="$store.state.pageBean.totalCount">
					</el-pagination>
				</el-col>
			</el-col>

			<!--推荐列表-->
			<el-col :md="6">
				<hot-list/>
			</el-col>
		</el-row>
	</div>

</template>

<script>
	import MovieItem from "components/movieitem/MovieItem";
	import CategoryBtn from "components/categorybtn/CategoryBtn";
	import HotList from "components/hotlist/HotList";
	import Recommend from "components/recommend/Recommend";

	export default {
		name: "MovieList",
		data() {
			return {
				screenWidth: document.body.clientWidth,     // 屏幕宽,为了控制分页条的大小
				currentPage: 1,
			}
		},
		components: {Recommend, HotList, CategoryBtn, HotList, MovieItem},
		created() {
			this.currentPage = 1
		},
		methods: {
			handleCurrentChange(currentPage) {
				this.currentPage = currentPage
				this.$store.commit("updatePage", currentPage)
				this.$store.dispatch("getPageBean")
				// 回到顶部
				scrollTo(0,0)
			}
		},
		created() {
			// console.log(this.$store.state.videos);
			// 当页面挂载时，页码变为1
			this.$store.commit('updatePage',1)
		},
		mounted() {
			// 当窗口宽度改变时获取屏幕宽度
			window.onresize = () => {
				return (() => {
					window.screenWidth = document.body.clientWidth
					this.screenWidth = window.screenWidth
				})
			}
		}
	}
</script>

<style scoped>
	#movie-list {
		padding-top: 15px;
		padding-left: 6%;
		padding-right: 6%;
	}

	.pagination {
		text-align: center;
		padding: 10px;
	}

	/*处于手机屏幕时*/
	@media screen and (max-width: 768px){

		#movie-list {
			padding-top: 8px;
			padding-left: 0.5%;
			padding-right: 0.5%;
		}
	}

</style>
