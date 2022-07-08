import request from '../request.js'

/* 品牌列表 */
function brandList(start,limit){
	return request({
		url:`/lejuClient/brand/findBrandsByPage/${start}/${limit}`,
		method:'get',
		
	})
}


/* 文章列表 */
function articleList(start,limit){
	return request({
		url:`/lejuClient/productArticle/findArticleByPage/${start}/${limit}`,
		method:'get'
	})
}


/* 根据文章id查询文章详情 */
function searchDetailByid(id){
	return request({
		url:`/lejuClient/productArticle/productArticle/${id}`
	})
}
export {
	brandList,
	articleList,
	searchDetailByid,
}