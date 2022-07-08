import baseUrl from "./baseUrl"
var request = function(config) {
	return new Promise((resolve,reject)=>{
			var setting = {
				url: baseUrl + config.url,
				method:config.method ? (config.method).toUpperCase() :  "GET",
				data:config.data,
				header:{
						  token:uni.getStorageSync("leju_token")
				},
				timeout:5000,
				success(res){
					resolve(res)
				},
				fail(res){
					reject(res)
				}
			}
			uni.request(setting)
	})
};
	
export default request