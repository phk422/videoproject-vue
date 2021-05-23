import {request} from "./request";

// 用户收藏
export function userCollection(uid,vid) {
	return request({
		url: "/collection/userCollection",
		method: "post",
		data: {
			uid,
			vid
		}
	})
}

// 判断用户是否收藏
export function isCollection(uid,vid) {
	return request({
		url: "/collection/isCollection",
		method: "post",
		data: {
			uid,
			vid
		}
	})
}

// 根据电影id获取收藏次数
export function getCollectionNum(vid) {
	return request({
		url: "/collection/getCollectionNum",
		method: "post",
		data: {vid}
	})
}

// 用户移除收藏
export function removeCollection(uid,vids) {
	return request({
		url: "/collection/removeCollection",
		method: "post",
		data: {
			uid,
			vids
		}
	})
}
