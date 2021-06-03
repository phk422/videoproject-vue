import { request } from './request'

// 添加评论
export function addComment(uid, vid, content) {
  return request({
    url: '/comment/addComment',
    method: 'post',
    data: {
      uid, vid, content
    }
  })
}

// 获取评论
export function getComments(vid) {
  return request({
    url: '/comment/getComments',
    method: 'post',
    data: {
      vid
    }
  })
}

// 删除评论
export function deleteCommentById(commentId) {
  return request({
    url: '/comment/deleteCommentById',
    method: 'post',
    data: {
      commentId
    }
  })
}
