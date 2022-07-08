import request from '../request.js'

// 获取分类列表
function findProductList(start,limit,data){
	return request({
		url:`/lejuClient/product/findProductList/${start}/${limit}`,
		method:"post",
		data
	})
}

	
export {
	findProductList
}