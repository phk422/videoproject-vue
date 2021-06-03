/**
 * 混入对象，抽取Vue中公共的部分
 */
import { login } from 'network/navbar'
import { register, checkCode } from 'network/user'
import { request } from 'network/request'

import { addHistory } from 'network/history'
import { addVisited } from 'network/video'

export const userMixin = {
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      nickname: '', // 用户昵称
      phone: '', // 电话
      username: '', // 用户账号
      password: '', // 用户密码
      repassword: '', // 确认密码
      avatarurl: '', // 用户头像路径
      rcode: '', // 注册验证码
      isLoading: false, // 登录加载效果
      user: this.$user, // 登录用户对象
      code: '点击获取验证码',
      isBtn: false,
      imageUrl: require('assets/img/icon/avatar.png')
    }
  },

  methods: {
    // 昵称校验
    nickNameBlur() {
      if (this.nickname.length <= 0) {
        this.$message.warning('昵称不能为空')
      }
    },
    // 电话校验
    phoneBlur() {
      if (!(/^1[3456789]\d{9}$/.test(this.phone))) {
        this.$message.warning('电话号码格式有误')
      }
    },
    loginBtn() {
      this.isLoading = true // 显示加载效果
      login(this.username, this.password).then(res => {
        this.user = res
        console.log(res)
        if (res) {
          // 刷新当前页面
          this.$router.go(0)
          // 登陆成功
          this.$message({
            message: '欢迎' + this.user.nickname + '登录',
            type: 'success'
          })
          this.$cookies.set('user', this.user, '7d') // 设置cookie时长为七天
          this.dialogVisible = false // 关闭弹窗
        } else {
          this.isLoading = false
          // 登陆失败
          this.$message({
            message: '账号或密码错误',
            type: 'error'
          })
        }
      })
      this.username = ''
      this.password = ''
    },
    exitLogin() {
      this.$cookies.remove('user')
      this.user = null
      // 刷新当前页面
      this.$router.go(0)
      this.isLoading = false
    },
    toCollection() {
      this.$router.push('/collectionlist')
    },
    toHistory() {
      this.$router.push('/historylist')
    },

    getCode() {
      // 发送验证码
      if (this.phone) {
        this.isBtn = true
        let time = 60
        const timeout = setInterval(() => {
          if (time !== 0) {
            time--
            this.code = time + 's后重新获取'
          } else {
            this.isBtn = false
            this.code = '重新获取验证码'
            clearTimeout(timeout)
          }
        }, 1000)

        request({
          url: '/sendCode',
          method: 'post',
          data: {
            phone: this.phone
          }
        }).then(res => {
          console.log(res)
        })
      } else {
        this.$message.warning('电话号码为空')
      }
    },

    // 点击注册
    register() {
      if (this.password !== this.repassword) {
        this.$message.warning('密码输入不一致')
        return
      }
      // 先判断验证码是否正确
      checkCode(this.rcode).then(res => {
        if (res === 1) {
          // 验证码正确，提交头像,在成功的回调中注册用户
          this.$refs.uploadImg.submit()
        } else if (res === -1) {
          this.$message.warning('验证码已失效，请重新获取!')
        } else {
          this.$message.warning('验证码错误!')
        }
      })
    },

    // 选择图片时
    imgChange(file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 上传成功时
    handleAvatarSuccess(res, file) {
      this.avatarurl = res
      // console.log(res);// 服务器返回的文件名称
      // 注册
      register(this.phone, this.password, this.nickname, this.avatarurl, this.phone).then(res => {
        // console.log(res);
        if (res === 1) {
          this.$message.success('注册成功！')
          this.dialogVisible2 = false
          this.password = ''
        } else if (res === -1) {
          this.$message.warning('该手机号码已经被注册！如有疑问，请联系管理员！')
        }
      })
    },

    // 上传之前
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片格式错误!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}

export const toPlayerMixin = {
  methods: {
    toPlayer(video) {
      // 回到顶部
      scrollTo(0, 0)
      // 将当前点击的video对象交给vuex
      this.$store.commit('savePlayerVideo', video)
      // 跳转新窗口
      const routeURL = this.$router.resolve({
        path: '/player'
      })

      sessionStorage.setItem('video', JSON.stringify(video))
      window.open(routeURL.href, '_blank')
      // 增加电影浏览量
      addVisited(video.vid)
      // 添加播放历史记录
      // 获取当前登录用户
      const user = this.$user
      if (user) {
        addHistory(user.uid, video.vid).then(res => {
          // console.log(res);
        })
      }
    }
  }
}
