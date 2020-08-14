import axios from 'axios'
import Qs from "qs"
import Vue from "vue"

/**
 * 创建Vue实列
 * 注意：在普通js中直接使用导入的Vue可能其内部还没有加载完毕，因此需要手动创建
 * @type {Vue | CombinedVueInstance<Vue, object, object, object, Record<never, any>>}
 */
const vm = new Vue()
/*对axios进行封装*/
export function request(config) {
	// 1.创建axios实例
	const instance = axios.create({
		baseURL: vm.baseURL,
		timeout: 6666, // 超时设置
		withCredentials: true, // 允许跨域请求携带Cookie
		// 对post请求参数进行处理，不以json传送给后端,以query形式传入
		transformRequest: [function (data) {
			// 对 data 进行任意转换处理
			//console.log(data)  //{vid:1}
			//console.log(Qs.stringify(data)) // vid=1&uid=2
			// 请求参数序列化
			return Qs.stringify(data)
		}]
	})

	// 响应拦截
	instance.interceptors.response.use(result => {
		// 拦截服务器其他的返回结果，只需要数据
		return result.data
	},error => {
		console.log(error)
	})
	return instance(config)
}
