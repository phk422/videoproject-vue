import { request } from './request'

// 添加播放历史
export function addHistory(uid, vid) {
  return request({
    url: '/history/addHistory',
    method: 'post',
    data: {
      uid,
      vid
    }
  })
}

// 删除选中的播放历史
export function deleteHistory(uid, vids) {
  return request({
    url: '/history/deleteHistory',
    method: 'post',
    data: {
      uid,
      vids
    }
  })
}
