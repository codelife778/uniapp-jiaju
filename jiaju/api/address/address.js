import request from '../request.js'

/* 获取所有地址列表 */
function allAddress(){
	return request({
		url:'/lejuClient/address/findAllAddress',
		method:'get'
	})
}


/* 删除选中的地址 */
function deleteAddress(addressId){
	return request({
		url:`/lejuClient/address/delAddressInfo/${addressId}`,
		method:'delete',
	})
}

/* 新增收货地址 */
function addAddress(data){
	return request({
		url:'/lejuClient/address/addAddressInfo',
		method:'post',
		data
	})
}


/* 切换默认状态 */
function switchDefault(addressId,defaultStatus){
	return request({
		url:`/lejuClient/address/switchDefault/${addressId}/${defaultStatus}`,
		method:'post',
	})
}


/* 修改地址 */
function updateAddressInfo(data){
	return request({
		url:'/lejuClient/address/updateAddressInfo',
		method:'post',
		data
	})
}

export {
	allAddress,
	deleteAddress,
	addAddress,
	switchDefault,
	updateAddressInfo
}