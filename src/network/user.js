import { request } from './request'

export function checkCode(code) {
  return request({
    url: '/user/checkCode',
    method: 'post',
    data: {
      code
    }
  })
}

export function register(username, password, nickname, avatarurl, phone) {
  return request({
    url: '/user/register',
    method: 'post',
    data: {
      username,
      password,
      nickname,
      avatarurl,
      phone
    }
  })
}
