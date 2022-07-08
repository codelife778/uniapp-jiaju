import request from '../request.js'

/* 四个主分类, channel */
function findCategory(){
	return request({
		url:"/lejuClient/productCategory/findCategory/1308336521604599809",
		method: 'get',
	})
}


export {
	findCategory
}