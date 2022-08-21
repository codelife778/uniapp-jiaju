var url = ""
console.log("process.env.NODE_ENV",process.env.NODE_ENV);
 if(process.env.NODE_ENV === 'development'){
     url =  "http://localhost:82"
	 
	 
 }else{
     
	 // url =  "http://v3.fgimax.vipnps.vip"
	 url =  "https://5v936kf.nat.ipyingshe.com"
	 
 }

export default url
