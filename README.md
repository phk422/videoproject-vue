# 基于Vue,ElementUI的在现视频点播系统

[项目演示](http://182.92.148.170:8080)

**使用到的技术**

```
UI框架：EelementUI
网络请求：axios
视频播放组件:vue-player
```

**基本功能**

```
1.视频浏览
2.视频搜索
3.推荐视频
4.视频排行榜
5.视频收藏，为视频添加标签
6.播放历史记录
7.用户注册登录
8.视频评论
```

**后端接口**

打开vue.config.js配置服务接口地址：

```javascript
devServer: {
	port: 8000, // 项目的端口号
	// 跨域代理配置
	proxy: {
		'/api': {
			target: 'http://localhost:8888', //这里是接口地址，接口地址联系作者获取
			ws: true,//是否代理websockets
			changeOrigin: true,   // 设置同源  默认false，是否需要改变原始主机头为目标URL
			pathRewrite: {
				'^/api': ''
			}		
		}
	}
},
```



```
接口地址可添加微信/QQ获取：
邮箱地址：1769476788@qq.com
微信账号/QQ：1769476788
```

**个人微信**

<img src="img/image-20200817121128341.png" alt="image-20200817121128341" width="260px" />

后面会将后端接口代码push上来！

### 安装依赖

```
npm install
```

### 启动服务

```
npm run serve
```

启动服务后打开浏览器，访问http://localhost:8000

### 项目打包

```
npm run build
```


