import request from '../request.js'

/* 确认支付 */
function confirmPay(data){
	return request({
		url:'/lejuClient/order/payConfirm',
		method:'post',
		data
	})
}

/* 确认付款 */
function payConfirm(data){
	return request({
		url:'/lejuClient/order/payConfirm',
		method:'post',
		data
	})
}
export {
	confirmPay,
	payConfirm
}