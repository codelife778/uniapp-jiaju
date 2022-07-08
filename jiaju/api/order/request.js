import request from '../request.js'

/* 根据订单id查询订单详细内容 */
function getPreOrderById(orderId){
	return request({
		url:`/lejuClient/order/getPreOrderById/${orderId}`
	})
}

/* 订单确认 */
function orderconfirmation(data){
	return request({
		url:'/lejuClient/order/addConfirmOrder',
		method:'post',
		data
	})
}

/* 确认支付 */
function confirmPay(data){
	return request({
		url:'/lejuClient/order/payConfirm',
		method:'post',
		data
	})
}
export {
	getPreOrderById,
	orderconfirmation,
	confirmPay
}