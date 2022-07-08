import request from '../request.js'

/* 更新用户信息 */
function updateMemberInfo(data){
	return request({
		url:'/lejuClient/member/updateMemberInfo',
		method:'post',
		data
	})
}

export {
	updateMemberInfo
}