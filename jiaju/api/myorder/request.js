import request from '../request.js'

/* 查询全部订单 */
function inquireAllorder(){
	return request({
		url:'/lejuClient/order/findAllOrders',
		
	})
}


/* 取消订单 */
function cancelOrder(orderId){
	return request({
		url:`/lejuClient/order/cancelOrder/${orderId}`,
		method:'post',
		
	})
}


/* 确认收货 */
function confirmReceive(data){
	return request({
		url:'/lejuClient/order/receiveDone',
		method:'post',
		data
	})
}

/* 生成退货订单 */
 function createRefundOrder(data){
	 return request({
		 url:'/lejuClient/orderReturn/addOrderReturnApply',
		 method:'post',
		 data
	 })
 }
 
 
 /* 退单公司列表*/
 function getCompanyAddrss(){
	 return request({
		 url:'/lejuClient/orderReturn/getCompanyAddrss',
	 })
 }
 
 
 
 /* 退单提交*/
 function SubmitChargeback(data){
	 return request({
		 url:'/lejuClient/orderReturn/addOrderReturnApply',
		 method:'post',
		 data
	 })
 }
 
 /* 退单列表*/
 function orderReturnApplys(){
	 return request({
		 url:'/lejuClient/orderReturn/orderReturnApplys',
		 
	 })
 }
 
 
 /* 根据id查看退单详情*/
 function orderReturn(id){
	 return request({
		 url:`/lejuClient/orderReturn/${id}`,
		 
	 })
 }
 
 
 /* 删除订单*/
 function deleteOrder(orderId){
	 return request({
		 url:`/lejuClient/order/deleteOrder/${orderId}`,
		 method:'DELETE',
 })
 }
 
 /* 强制删除订单*/
function _clearOrderFocus(data){
	return request({
		url:`/lejuClient/order/_clearOrderFocus?orderId=${data}`,
		method:'post',
	
	})
}
 
export {
	inquireAllorder,
	cancelOrder,
	confirmReceive,
	createRefundOrder,
	getCompanyAddrss,
	SubmitChargeback,
	orderReturnApplys,
	orderReturn,
	deleteOrder,
	_clearOrderFocus,
}