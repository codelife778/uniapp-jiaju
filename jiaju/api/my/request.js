import request from '../request.js'

/* 登录 */
function doLogin(data){
	return request({
		url:'/lejuClient/login/doLogin',
		method:'post',
		data
	})
}
function register(data){
	return request({
		url:'/lejuClient/member/register',
		method:'post',
		data
	})
}


/* 获取登录用户个人信息 */
function getUserInformation(){
	return request({
		url:'/lejuClient/login/getMemberInfo',
		
	})
}
export {
	doLogin,
	register,
	getUserInformation,
}