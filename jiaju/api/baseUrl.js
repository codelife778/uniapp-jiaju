var url = ""
console.log("process.env.NODE_ENV",process.env.NODE_ENV);
 if(process.env.NODE_ENV === 'development'){
     url =  "http://bufani.free.svipss.top"
	 // url = "http://leju.bufan.cloud"
	 
 }else{
     // url = "http://leju.bufan.cloud"
	 url =  "http://localhost"
 }

export default url
