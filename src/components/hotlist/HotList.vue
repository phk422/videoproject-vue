<template>
	<el-card class="box-card" :body-style="{paddingTop:'0px'}">
		<div slot="header" class="clearfix">
			<img src="~assets/img/icon/like.png" alt="" class="recommand-icon">
			<span>热播排行</span>
		</div>
		<div v-for="(video,index) in videos" :title="video.vname" :key="index" class="item" @click="toPlayer(video)">
			<div  :class="rank(index + 1)">{{index + 1}}</div>
			{{video.vname}}
		</div>
	</el-card>
</template>

<script>
	import {getHotTen} from "network/video";
	import {toPlayerMixin} from "assets/js/mixin";

	export default {
		name: "HotList",
		data() {
			return {
				videos: []
			}
		},
		mixins: [toPlayerMixin],
		methods: {

		},
		computed: {
			rank() {
				return (index) => {  // index是使用时的参数
					// console.log(index)
					if(index === 1) {
						return "first"
					}
					if (index === 2) {
						return "second"
					}
					if (index === 3) {
						return "third"
					}
					if(index > 3) {
						return "other"
					}
				}
			}
		},
		created() {
			getHotTen().then(res => {
				this.videos = res
			})
		}
	}
</script>

<style scoped>

	.item {
		height: 25px;
		margin-top: 4px;
		margin-bottom: 16px;
		cursor: pointer;
		transition: all 0.6s;/*所有属性变化在0.6秒内执行动画*/


		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; /*行数*/
		-webkit-box-orient: vertical;
	}
	.item:hover {
		transform: scale(1.1);/*鼠标放上之后元素变成1.1倍大小*/;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}
	.clearfix:after {
		clear: both
	}

	.clearfix {
		position: relative;
	}
	.clearfix span {
		font-size: 20px;
		position: absolute;
		bottom: 8px;
		left: 35px;
	}
	.box-card {
		width: 100%;
	}

	.recommand-icon {
		width: 30px;
	}

	@media screen and (max-width: 768px) {
		.clearfix span {
			font-size: 15px;
			position: absolute;
			bottom: 8px;
			left: 35px;
		}
		.text {
			font-size: 13px;
		}
	}

	.other {
		display: inline-block;
		background-color: rgb(176, 183, 194);
		width: 22px;
		height: 22px;
		line-height: 20px;
		text-align: center;
		color: #ffffff;
		font-size: 15px;
		border-radius: 5px;
	}
	.first {
		display: inline-block;
		background-color: rgb(255, 74, 74);
		width: 22px;
		height: 22px;
		line-height: 20px;
		text-align: center;
		color: #ffffff;
		font-size: 15px;
		border-radius: 5px;
	}
	.second {
		display: inline-block;
		background-color: rgb(255, 119, 1);
		width: 22px;
		height: 22px;
		line-height: 20px;
		text-align: center;
		color: #ffffff;
		font-size: 15px;
		border-radius: 5px;
	}
	.third {
		display: inline-block;
		background-color: rgb(255, 180, 0);
		width: 22px;
		height: 22px;
		line-height: 20px;
		text-align: center;
		color: #ffffff;
		font-size: 15px;
		border-radius: 5px;
	}
	.el-card__body {
		padding-top: 0px;
	}
</style>
