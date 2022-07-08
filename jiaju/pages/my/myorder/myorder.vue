<template>
	<view class="order-main">
		<view class="head-bar">
			<view class="label" @tap="selectCurrentTab(item.value)" :class="{ active: item.value == current }" v-for="(item, index) in headItems" :key="item.value">
				<view>{{ item.name }}</view>
			</view>
		</view>
		
		<view class="card-list" v-if="current != 4">
			<view class="card" v-if="orderList.length > 0" v-for="item in orderList" :key="item.order.id">
				<view class="order-title">
					<text>订单编号: {{ item.order.orderSn }}</text>
					<text class="status">{{ item.order.status | statusText}}</text>
				</view>
				<view class="sku-block" v-for="(sku, index) in item.items" :key="index">
					<navigator :url="'/pages/goodsdetail/goodsdetail?productId=' + sku.productId">
						<image class="img" :src="sku.productPic" mode=""></image>
					</navigator>
					<view class="info">
						<view class="p1">
							<text class="title">{{ sku.productName }}</text>
						
							<text class="price">¥{{ sku.productPrice  }}</text>
						</view>
						<view class="p2">
						
							<text>编号：{{ sku.id }}</text>
							<text>x {{ sku.productQuantity }}</text>
						</view>
						<view class="p3">
							<view>
								规格：<br />
								<text style="margin-right: 10rpx;" v-for="(ele,idx) in sku.productAttr" :key="idx">{{ ele.key }} : {{ ele.value }}
								</text>
				
							</view>
						</view>
						<view v-show="item.order.status == 2" class="p4">
							<text v-if="sku.isReturn == 0" @tap="refundBotton(sku)">退货</text>
							<text  v-if="sku.isReturn == 1"  style="color: red;" >退货中</text>
						</view>
					</view>
				
				</view>
				<div class="total-price">
					<text>时间: {{ item.order.createTime }}</text>
					<text>合计: ¥{{ item.order.totalAmount }}</text>
				</div>
		
				<div class="btns">
				
					<div class="btn btn-cancel-order" @click="toCancleOrder(item.order.id)" v-if="current == 0">取消订单</div>
					<div class="btn btn-pay" @click="toPay(item)" v-if="current == 0">付款</div>
					<div class="btn btn-receive" @click="toConfirmReceive(item.order.id)" v-if="current == 2">确认收货</div>
					<div class="btn btn-closed" @tap="del(item)" v-if="item.order.status >= 3">订单已关闭,删除记录</div>
				</div>
			</view>
			<view  v-if="orderList.length <= 0">
				暂无数据
			</view>
		</view>
		
		<view class="card-list" v-else>
			<view class="card" v-if="orderList.length > 0" v-for="(item,index) in orderList" :key="index">
				<view class="order-title">
					<text>订单编号: {{ item.orderSn }}</text>
					<text class="status" @tap="toEditorRefundInfo(item.id)" :style="{color:(item.status == 2 || item.status ==3) ? 'red' : ''  }">{{  item.status | orderProcessText }}</text>
					
				</view>
				<view class="sku-block">
					<navigator :url="'/kindPackage/list/info/info?productId=' + item.productId">
						<image class="img" :src="item.productPic" mode=""></image>
					</navigator>
					<view class="info">
						<view class="p1">
							<text class="title">{{ item.productName }}</text>
							
							<text class="price">¥{{ item.productPrice  }}</text>
						</view>
						<view class="p2">
							<!-- 是商品编号,非商品id!! -->
							<text>编号：{{ item.id }}</text>
							<text>x {{ item.productCount }}</text>
						</view>
						<view class="p3">
							<view>
								规格：<br />
								<text style="margin-right: 10rpx;" v-for="(ele,idx) in item.productAttr" :key="idx">{{ ele.key }} : {{ ele.value }}
								</text>
				
							</view>
						</view>
					</view>
				
				</view>
				<div class="total-price">
					<text>时间: {{ item.createTime }}</text>
					<text>合计: ¥{{ item.returnAmount }}</text>
				</div>
				
			</view>
			<view  v-if="orderLists.length == 0">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	import {
		inquireAllorder,
		cancelOrder,
		confirmReceive,
		orderReturnApplys,
		deleteOrder,
		_clearOrderFocus,
	} from '@/api/myorder/request.js'
	export default {
		data() {
			return {
				index:'',
				orderLists:[],
				chargebackList:[],
				current:0,
				headItems:[
					{
						name:'待付款',
						value:0
					},
					{
						name:'已付款',
						value:1
					},
					{
						name:'已发货',
						value:2
					},
					{
						name:'已收货',
						value:3,
					},
					{
						name:'售后',
						value:4
					},
				]
			}
		},
		filters:{
			statusText(val){
				if(val == 0){
					return "未付款"
				}else if(val == 1){
					return "已付款,等待发货"
				}else if(val == 2){
					return "已发货"
				}else if(val == 3){
					return "已收货"
				}else if(val == 4){
					return "已退单"
				}else{
					return "无效订单"
				}
			},
			orderProcessText(process) {
				var text = '等待处理';
				switch (JSON.stringify(process)) {
					case '0':
						text = '等待处理';
						break;
					case '1':
						text = '确认退货,等待用户发货';
						break;
					case '2':
						text = '已退款';
						break;
					case '3':
						text = '已拒绝';
						break;
					case '9':
						text = '拒绝退货';
						break;
		
					default:
						break;
				}
				return text;
			}
		},
		computed:{
			// 对订单进行筛选  选择符合条件的数据
			orderList:{
				get(){
				
					if(this.current == 4){
						return this.chargebackList
					}else{
						return this.orderLists.filter(ele =>{
							if(this.current == 3){
								return ele.order.status == 3 || ele.order.status == 4
							}else{
								return ele.order.status == this.current
							}
							
						})
					}
				},
				set(){				
				}
			}
		
		},
		methods: {
			toEditorRefundInfo(val){
				console.log("退单页面",val);
				uni.navigateTo({
					url:`checkRefundInfo/checkRefundInfo?backOrder=${val}`
				})
			},
			refundBotton(val){
				console.log("点击了退货",val);
				uni.showToast({
					title:'进入退货详情页面',
					duration:1000
				})
				setTimeout(()=>{
				uni.navigateTo({
					url:`./editorRefundInfo/editorRefundInfo?id=${val.orderId}&skuid=${val.id}`
				})
				},1000)
				
			},
			toCancleOrder(val){
				cancelOrder(val).then(res=>{
					console.log(res);
					if(res.data.success==true){
						uni.showToast({
							title:'成功取消订单',
							duration:1000
						})
						setTimeout(()=>{
						this.init()
						},1000)
					}
				})
			},
			toPay(val){
				console.log("顶",val);
				uni.navigateTo({
					url:'../../payment/payment?orderId=' + val.order.id
				})
			},
			toConfirmReceive(val){
				console.log(val);
				confirmReceive({
					orderId:val
				}).then(res=>{
					console.log("toConfirmReceive",res);
					if(res.data.success==true){
						uni.showToast({
							title:'已确认收货',
							duration:1000
						})
						setTimeout(()=>{
						this.init()
						},1000)
					}
				})
			},
			del(item){
				console.log(item);
				_clearOrderFocus(item.order.id).then(res=>{
					console.log(res);
					if(res.data.success == true){
						uni.showToast({
							title:"删除成功"
						});
						this.clear();
						setTimeout(()=>{
							this.init();
						},1000)
					}
				})
			},
			selectCurrentTab(val){
				this.current = val;
				if(val == 4){
					this.clear()
				}else{ // tab栏切换时 应该重置分页 并清空存储的数据
					this.clear()
				}
				this.init()
			},
			clear(){
				// this.start = 1;
				// this.limit = 10;
				this.orderList = []
			},
			async init(){
				let result = await inquireAllorder()
				console.log("康康这是啥",result);
				// console.log("+++",result.data.data.orderList);
				result.data.data.orderList.forEach(ele=>{
					ele.items[0].productAttr = JSON.parse(ele.items[0].productAttr)
				})
				this.orderLists = result.data.data.orderList
				// let list = await orderReturnApplys()
				// console.log(list);
				let list = (await orderReturnApplys()).data.data.items
				list.forEach(ele=>{
					// debugger
					ele.productAttr = JSON.parse(ele.productAttr)
					console.log(ele.productAttr);
					// ele.productAttr = JSON.parse(ele.productAttr)
				});
				console.log(list);
				this.chargebackList = list
				console.log(this.chargebackList);
				// this.orderList.push(...this.chargebackList)
			}
		},
		onLoad(e){
			this.current = e.type
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
.order-main {
		.head-bar {
			width: 100%;
			overflow-y: auto;
			position: fixed;
			left: 0;
			top: 0;
			// #ifdef H5
			top: 80rpx;
			// #endif
			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 62rpx;
			padding-top: 14rpx;
			background-color: #354e44;
			color: #fff;
			font-size: 30rpx;
			line-height: 62rpx;
			z-index: 999;

			.label {
				radio {
					display: none;
				}

				&.active {
					border-bottom: 2rpx solid #dd524d;
					color: #dd524d;
				}
			}
		}

		.card-list {
			margin-top: 130rpx;

			.card {
				width: 672rpx;
				box-sizing: border-box;
				padding: 36rpx;
				border-radius: 24rpx;
				background-color: #fff;
				margin: 30rpx auto;
				font-size: 24rpx;
				color: #3e3e3e;

				.order-title {
					line-height: 33rpx;
					display: flex;
					justify-content: space-between;

					.status {
						color: #034c46;
					}

					border-bottom: 1px solid #f1ece7;
					padding-bottom: 30rpx;
				}

				.sku-block {
					display: flex;
					justify-content: flex-start;
					border-bottom: 1px solid #f1ece7;
					padding: 30rpx 0;

					.img {
						width: 162rpx;
						height: 162rpx;
						flex-shrink: 0;
						background-color: #8f8f94;
					}

					.info {
						width: 470rpx;
						margin-left: 28rpx;

						.p1,
						.p2 {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}

						.p1 {
							font-size: 26rpx;
							line-height: 37px;

							.title {
								color: #3e3e3e;
							}

							.price {
								colro: #8d8d8d;
							}
						}

						.p2,
						.p3 {
							font-size: 22rpx;
							color: #8d8d8d;
							line-height: 30rpx;
							margin-top: 5rpx;
						}

						.p4 {
							text-align: right;
							margin-top: 10rpx;
							color: #8d8d8d;
							text-decoration: underline;
						}
					}
				}

				.total-price {
					font-size: 26rpx;
					line-height: 37rpx;
					text-align: right;
					margin-top: 14rpx;
					display: flex;
					justify-content: space-between;
				}

				.btns {
					margin-top: 20rpx;
					display: flex;
					justify-content: flex-end;

					.btn {
						width: 124rpx;
						height: 50rpx;
						border: 1px solid #2d4f43;
						font-size: 26rpx;
						border-radius: 10rpx;
						color: #2d4f43;
						text-align: center;
						line-height: 50rpx;
						margin-left: 32rpx;

						&.btn-closed {
							width: auto;
							padding: 0 1em;
							border-color: #dd524d;
						}
					}
				}
			}
		}
	}
</style>
