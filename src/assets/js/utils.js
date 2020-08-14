// 工具类


// 随机获取数组中的num个元素并返回新数组
export function getArrayItems(arr,num) {
	let newArr = []
	for(let i = 0;i <= num - 1;i++) {
		// 生成数组长度范围内的随机数
		let index = Math.floor(Math.random()*arr.length)
		newArr[i] = arr.splice(index,1)[0]
	}
	return newArr
}

// 23000 =》 2.3万
export function handleVisited(visited) {
	// console.log(visited);
	if(visited >= 10000) {
		var s = Math.floor(visited/10000)
		var s2 = Math.floor(visited%10000/1000)
		visited = s + '.' + s2 + '万'
	}
	return visited
}

// 时间的转换
export function getDate(pretime) {
	const minute = 1000 * 60
	const hour = minute * 60
	const day = hour * 24
	const month = day * 30
	// 将时间转化为时间戳
	pretime = pretime.replace(/\-/g,"/")
	const time = new Date(pretime).getTime();
	// 获取当前时间戳
	const now = new Date().getTime()
	const subTime = now - time
	const monthC = subTime/month
	const weekC = subTime/(7 * day)
	const dayC = subTime/day
	const hourC  = subTime/hour
	const minC = subTime/minute

	if(monthC >= 1) {
		return parseInt(monthC) + "个月前"
	}else if(weekC >= 1) {
		return parseInt(weekC) + "周前"
	}else if(dayC >= 1) {
			return parseInt(dayC) + "天前"
	}else if(hourC >= 1) {
		return parseInt(hourC) + "小时前"
	}else if(minC >= 1) {
		return parseInt(minC) + "分钟前"
	}else  {
		return "刚刚"
	}
}

// 获取唯一的id
export function getUUid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}


// 时间格式化
export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function padLeftZero (str) {
	return ('00' + str).substr(str.length);
};

