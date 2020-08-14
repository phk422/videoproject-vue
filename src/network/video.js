import {request} from "./request";

// 获取电影分类
export function getCategory() {
	return request({
		url: "/videoCategory"
	})
}


// 获取分页查询对象（根据cid）
export function getPageBean(cid,currentPage,pageSize) {
	return request({
		url: "/video/getPageBean",
		method: "post",
		data: {
			cid,
			currentPage,
			pageSize
		}
	})
}

// 随机获取num个Video
export function getNumVideo(num) {
	return request({
		url: "/video/getRandVideo",
		params: {
			num
		}
	})
}

// 获取分页查询对象（根据vname）
export function getPageBeanByValue(value,currentPage,pageSize) {
	return request({
		url: "/video/getPageBeanByValue",
		method: "post",
		data: {
			value,
			currentPage,
			pageSize
		}
	})
}

// 根据用户搜索为其推荐
export function getUserInput(value) {
	return request({
		url: "/video/getUserInput",
		method: "post",
		data: {
			value
		}
	})
}

// 增加视频浏览量
export function addVisited(vid) {
	request({
		url: "/video/addVisited",
		params: {
			vid
		}
	})
}

// 根据分类id查询videos
export function getVideoByCid(cid) {
	return request({
		url: "/video/getVideoByCid",
		method: "post",
		data: {
			cid
		}
	})
}

// 根据用户id查询收藏电影
export function getCollectionByUid(uid) {
	return request({
		url: "/video/getCollectionByUid",
		method: "post",
		data: {
			uid
		}
	})
}

// 查询当前用户的播放历史
export function getHistoryByUid(uid) {
	return request({
		url: "/video/getHistoryByUid",
		method: "post",
		data: {
			uid
		}
	})
}

// 获取排行前十的电影
export function getHotTen() {
	return request({
		url: "video/getHotTen"
	})

}

// 为电影添加标签
export function addTag(newTag,vid) {
	return request({
		url: "/video/addTag",
		method: "post",
		data: {
			newTag,
			vid
		}
	})
}

// 向用户推荐的视频
export function getRecommendVideos(uid) {
	return request({
		url: "/video/getRecommendVideos",
		method: "post",
		data: {
			uid
		}
	})
}
