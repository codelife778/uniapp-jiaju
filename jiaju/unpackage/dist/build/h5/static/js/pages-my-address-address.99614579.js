(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-address-address"],{"08cc":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r="";console.log("process.env.NODE_ENV","production"),r="http://v3.fgimax.vipnps.vip";var i=r;e.default=i},"1da1":function(t,e,n){"use strict";function r(t,e,n,r,i,o,a){try{var s=t[o](a),c=s.value}catch(u){return void n(u)}s.done?e(c):Promise.resolve(c).then(r,i)}function i(t){return function(){var e=this,n=arguments;return new Promise((function(i,o){var a=t.apply(e,n);function s(t){r(a,i,o,s,c,"next",t)}function c(t){r(a,i,o,s,c,"throw",t)}s(void 0)}))}}n("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=i},"349c":function(t,e,n){var r=n("24fb");e=r(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */uni-view[data-v-5ad24850]{display:flex}.add[data-v-5ad24850]{position:fixed;bottom:0;width:100%;height:%?120?%;justify-content:center;align-items:center}.add .btn[data-v-5ad24850]{box-shadow:%?0?% %?5?% %?10?% rgba(0,0,0,.4);width:70%;height:%?80?%;border-radius:%?80?%;background-color:#354e44;color:#fff;justify-content:center;align-items:center;font-size:%?30?%}.add .btn .icon[data-v-5ad24850]{height:%?80?%;color:#fff;font-size:%?30?%;justify-content:center;align-items:center}.list[data-v-5ad24850]{flex-wrap:wrap}.list .row[data-v-5ad24850]{width:94%;padding:%?20?% 0;border-bottom:1Px solid #ccc;margin:0 auto}.list .row .left[data-v-5ad24850]{width:%?90?%;flex-shrink:0;align-items:center}.list .row .left .head[data-v-5ad24850]{width:%?70?%;height:%?70?%;background:linear-gradient(90deg,#ccc,#aaa);color:#fff;justify-content:center;align-items:center;border-radius:%?60?%;font-size:%?35?%}.list .row .center[data-v-5ad24850]{width:100%;flex-wrap:wrap;flex-direction:column}.list .row .center .tel[data-v-5ad24850]{margin-left:%?30?%;font-size:%?24?%;color:#999}.list .row .center .name-tel[data-v-5ad24850]{margin-left:%?30?%;align-items:baseline;margin-bottom:%?20?%}.list .row .center .name-tel .name[data-v-5ad24850]{font-size:%?28?%}.list .row .center .name-tel .default[data-v-5ad24850]{font-size:%?22?%;background-color:#354e44;color:#fff;padding:0 %?18?%;border-radius:%?8?%;margin-left:%?20?%}.list .row .center .address[data-v-5ad24850]{width:100%;font-size:%?24?%;align-items:baseline;color:#777}.list .row .right[data-v-5ad24850]{flex-shrink:0;align-items:center;margin-left:%?20?%}.list .row .right .icon[data-v-5ad24850]{justify-content:center;align-items:center;width:%?80?%;height:%?60?%;border-left:solid %?1?% #aaa;font-size:%?40?%;color:#777}.list .row .right .icon uni-image[data-v-5ad24850],\r\n.list .row .right .icon uni-image[data-v-5ad24850]{width:%?40?%;height:%?40?%;opacity:.8}',""]),t.exports=e},"356f":function(t,e,n){"use strict";n.r(e);var r=n("fccf"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},"72e3":function(t,e,n){"use strict";n.r(e);var r=n("cd34"),i=n("356f");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("d7c4");var a,s=n("f0c5"),c=Object(s["a"])(i["default"],r["b"],r["c"],!1,null,"5ad24850",null,!1,r["a"],a);e["default"]=c.exports},"924b":function(t,e,n){"use strict";var r=n("4ea4");n("d3b7"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("08cc")),o=function(t){return new Promise((function(e,n){var r={url:i.default+t.url,method:t.method?t.method.toUpperCase():"GET",data:t.data,header:{token:uni.getStorageSync("leju_token")},timeout:5e3,success:function(t){e(t)},fail:function(t){n(t)}};uni.request(r)}))},a=o;e.default=a},"96cf":function(t,e){!function(e){"use strict";var n,r=Object.prototype,i=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},a=o.iterator||"@@iterator",s=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",u="object"===typeof t,l=e.regeneratorRuntime;if(l)u&&(t.exports=l);else{l=e.regeneratorRuntime=u?t.exports:{},l.wrap=b;var d="suspendedStart",f="suspendedYield",h="executing",v="completed",p={},w={};w[a]=function(){return this};var g=Object.getPrototypeOf,y=g&&g(g(T([])));y&&y!==r&&i.call(y,a)&&(w=y);var m=E.prototype=x.prototype=Object.create(w);L.prototype=m.constructor=E,E.constructor=L,E[c]=L.displayName="GeneratorFunction",l.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===L||"GeneratorFunction"===(e.displayName||e.name))},l.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,E):(t.__proto__=E,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(m),t},l.awrap=function(t){return{__await:t}},A(j.prototype),j.prototype[s]=function(){return this},l.AsyncIterator=j,l.async=function(t,e,n,r){var i=new j(b(t,e,n,r));return l.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},A(m),m[c]="Generator",m[a]=function(){return this},m.toString=function(){return"[object Generator]"},l.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},l.values=T,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(O),!t)for(var e in this)"t"===e.charAt(0)&&i.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,i){return s.type="throw",s.arg=t,e.next=r,i&&(e.method="next",e.arg=n),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],s=a.completion;if("root"===a.tryLoc)return r("end");if(a.tryLoc<=this.prev){var c=i.call(a,"catchLoc"),u=i.call(a,"finallyLoc");if(c&&u){if(this.prev<a.catchLoc)return r(a.catchLoc,!0);if(this.prev<a.finallyLoc)return r(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return r(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return r(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&i.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=t,a.arg=e,o?(this.method="next",this.next=o.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),O(n),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var i=r.arg;O(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:T(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),p}}}function b(t,e,n,r){var i=e&&e.prototype instanceof x?e:x,o=Object.create(i.prototype),a=new S(r||[]);return o._invoke=C(t,n,a),o}function _(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(r){return{type:"throw",arg:r}}}function x(){}function L(){}function E(){}function A(t){["next","throw","return"].forEach((function(e){t[e]=function(t){return this._invoke(e,t)}}))}function j(t){function e(n,r,o,a){var s=_(t[n],t,r);if("throw"!==s.type){var c=s.arg,u=c.value;return u&&"object"===typeof u&&i.call(u,"__await")?Promise.resolve(u.__await).then((function(t){e("next",t,o,a)}),(function(t){e("throw",t,o,a)})):Promise.resolve(u).then((function(t){c.value=t,o(c)}),(function(t){return e("throw",t,o,a)}))}a(s.arg)}var n;function r(t,r){function i(){return new Promise((function(n,i){e(t,r,n,i)}))}return n=n?n.then(i,i):i()}this._invoke=r}function C(t,e,n){var r=d;return function(i,o){if(r===h)throw new Error("Generator is already running");if(r===v){if("throw"===i)throw o;return N()}n.method=i,n.arg=o;while(1){var a=n.delegate;if(a){var s=k(a,n);if(s){if(s===p)continue;return s}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===d)throw r=v,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=h;var c=_(t,e,n);if("normal"===c.type){if(r=n.done?v:f,c.arg===p)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=v,n.method="throw",n.arg=c.arg)}}}function k(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,k(t,e),"throw"===e.method))return p;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return p}var i=_(r,t.iterator,e.arg);if("throw"===i.type)return e.method="throw",e.arg=i.arg,e.delegate=null,p;var o=i.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,p):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function T(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){while(++r<t.length)if(i.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=n,e.done=!0,e};return o.next=o}}return{next:N}}function N(){return{value:n,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},ba23:function(t,e,n){var r=n("349c");"string"===typeof r&&(r=[[t.i,r,""]]),r.locals&&(t.exports=r.locals);var i=n("4f06").default;i("2ddc90cc",r,!0,{sourceMap:!1,shadowMode:!1})},cd34:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return 0==t.showPageType?n("v-uni-view",[n("v-uni-view",{staticClass:"content",staticStyle:{width:"100%"}},[n("v-uni-view",{staticClass:"list",staticStyle:{width:"100%"}},t._l(t.allAddressList,(function(e,r){return n("v-uni-view",{key:r,staticClass:"row"},[n("v-uni-view",{staticClass:"center"},[n("v-uni-view",{staticClass:"name-tel"},[n("v-uni-view",{staticClass:"name"},[t._v(t._s(e.name))]),e.defaultStatus?n("v-uni-view",{staticClass:"default"},[t._v("默认")]):t._e()],1),n("v-uni-view",{staticClass:"tel"},[t._v(t._s(e.phoneNumber))])],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-view",{staticClass:"icon edit",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.toEditAddress(e)}}},[t._v("编辑地址")])],1)],1)})),1)],1),n("v-uni-view",{staticClass:"add"},[n("v-uni-view",{staticClass:"btn",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.toNewAddress.apply(void 0,arguments)}}},[t._v("新增地址")])],1)],1):1==t.showPageType?n("v-uni-view",[n("v-uni-view",{staticClass:"content",staticStyle:{width:"100%"}},[n("v-uni-view",{staticClass:"list",staticStyle:{width:"100%"}},t._l(t.allAddressList,(function(e,r){return n("v-uni-view",{key:r,staticClass:"row"},[n("v-uni-view",{staticClass:"center",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.addresstoPay(e)}}},[n("v-uni-view",{staticClass:"name-tel"},[n("v-uni-view",{staticClass:"name"},[t._v(t._s(e.name))]),e.defaultStatus?n("v-uni-view",{staticClass:"default"},[t._v("默认")]):t._e()],1),n("v-uni-view",{staticClass:"tel"},[t._v(t._s(e.phoneNumber))])],1),n("v-uni-view",{staticClass:"right"},[n("v-uni-view",{staticClass:"icon edit",on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.toEditAddress(e)}}},[t._v("编辑地址")])],1)],1)})),1)],1)],1):t._e()},o=[]},d7c4:function(t,e,n){"use strict";var r=n("ba23"),i=n.n(r);i.a},f7b8:function(t,e,n){"use strict";var r=n("4ea4");n("99af"),Object.defineProperty(e,"__esModule",{value:!0}),e.allAddress=o,e.deleteAddress=a,e.addAddress=s,e.switchDefault=c,e.updateAddressInfo=u;var i=r(n("924b"));function o(){return(0,i.default)({url:"/lejuClient/address/findAllAddress",method:"get"})}function a(t){return(0,i.default)({url:"/lejuClient/address/delAddressInfo/".concat(t),method:"delete"})}function s(t){return(0,i.default)({url:"/lejuClient/address/addAddressInfo",method:"post",data:t})}function c(t,e){return(0,i.default)({url:"/lejuClient/address/switchDefault/".concat(t,"/").concat(e),method:"post"})}function u(t){return(0,i.default)({url:"/lejuClient/address/updateAddressInfo",method:"post",data:t})}},fccf:function(t,e,n){"use strict";var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var i=r(n("1da1")),o=n("f7b8"),a={data:function(){return{showPageType:0,allAddressList:[]}},methods:{addresstoPay:function(t){console.log(t),1==this.showPageType&&(uni.setStorageSync("selectAddress",t),uni.navigateBack({delta:1}))},init:function(){var t=this;return(0,i.default)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,o.allAddress)();case 2:t.allAddressList=e.sent.data.data.items,console.log("this.allAddressList",t.allAddressList);case 4:case"end":return e.stop()}}),e)})))()},toNewAddress:function(){uni.navigateTo({url:"../addAddress/addAddress"})},toEditAddress:function(t){console.log("row",t),uni.navigateTo({url:"../addAddress/addAddress?addressId="+t.id})}},onShow:function(){console.log("onShow()"),this.init()},onLoad:function(t){t.type?(console.log("---"),this.showPageType=1,this.init()):(console.log("+++\t"),this.showPageType=0,this.init())}};e.default=a}}]);