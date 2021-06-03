import { request } from './request'

// 登陆验证
export function login(username, password) {
  return request({
    url: '/user/getUser',
    method: 'post',
    data: {
      username,
      password
    }
  })
}
