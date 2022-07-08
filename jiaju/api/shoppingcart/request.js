import reqeust from '../request'

/* 获取购物车列表 */
function showShoppingcartList(){
	return reqeust({
		url:'/lejuClient/cart/findAllCartItem',
		method:'get'
	})
}


/* 添加商品到购物车 */
function addCart(data){
	return reqeust({
		url:'/lejuClient/cart/addCart',
		method:'post',
		data
	})
}


/* 清空购物车商品 */
function clearCart(data){
	return reqeust({
		url:'/lejuClient/cart/clearCart',
		method:'post',
		data
	})
}


/* 删除多个购物车商品 */
function deleteCartItems(data){
	return reqeust({
		url:'/lejuClient/cart/delCartItems',
		method:'post',
		data
	})
}


export{
	showShoppingcartList,
	addCart,
	clearCart,
	deleteCartItems,
}