
import request from '../request.js'
/* 轮播图片 */
function bannerAds(data){
	return request({
		url:'/lejuClient/home/bannerAds',
		method:'get'
	})
}

/* 四个主分类, channel */
function findCategory(){
	return request({
		url:"/lejuClient/productCategory/findCategory/1308336521604599809",
		method: 'get',
	})
}


/* 限时活动 */
function limitTime(data){
	return request({
		url: `/lejuClient/home/recommendList`,
		method: 'get',
	})
}


// 3. 最热推荐
function hotList(data){
	return request({
		url: `/lejuClient/home/hotList`,
		method: 'get'
	})
}

/* 新品推荐 */
function newProducts(){
	return request({
		url:'/lejuClient/home/lejuLatestProducts',
		method:'get'
	})
}

/* 猜你喜欢 */
function youLike(){
		
	return request({
		url:'/lejuClient/home/saleMostProducts',
		method:'get'
	})
}

export {
	bannerAds,
	findCategory,
	limitTime,
	hotList,
	newProducts,
	youLike,
}