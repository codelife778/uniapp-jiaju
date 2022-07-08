import request from '../request.js'

/* 商品详情 */
function goodsdetail(productId) {
	return request({
		url: `/lejuClient/product/productDetail/${productId}`,
		method: 'get'
	})
}

/* 生成订单 */
function addPreOrder(data){
	return request({
		url:'/lejuClient/order/addPreOrder',
		method:'post',
		data
	})
}

/* 添加购物车 */
function addCart(data){
	return request({
		url:'/lejuClient/cart/addCart',
		method:'post',
		data
	})
}



export {
	goodsdetail,
	addPreOrder,
	addCart
}
