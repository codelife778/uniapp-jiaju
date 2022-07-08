<template>
	<view class="order-detail" v-if="singleOrderItem.orderItems">

		<view class="order-status">等待支付</view>
		<navigator class="address-block" open-type="navigate" :url="`/pages/my/address/address?type=select`">
			<view>去选择收货地址</view>
		</navigator>
		<navigator class="address-block" open-type="navigate" :url="`/pages/my/address/address?type=select`">
			<view class="send-name">姓名:{{addressInfo.name}} 电话号码: {{addressInfo.phoneNumber}}</view>
			<view class="address">收货地址:
				{{addressInfo.province}}-{{addressInfo.city}}-{{addressInfo.region}}{{addressInfo.detailAddress}}</view>
		</navigator>
		<view class="order-card">
			<view class="order-title">
				<text>订单编号: {{singleOrderItem.orderBase.orderSn}}</text>
				<text class="status">等待支付</text>
			</view>
			<view class="sku-block" v-for="item in singleOrderItem.orderItems" :key="item.id">
				<image class="img" :src="item.productPic" mode=""></image>
				<view class="info">
					<view class="p1">
						<text class="title">{{item.productName}}</text>
						<text class="price">¥{{item.productPrice}}</text>
					</view>
					<view class="p2">
						<text>编号：{{item.productSn}}</text>
						<text>x {{item.productQuantity}}</text>
					</view>
					<view class="p3">
						<text>规格：</text>
						<text style="margin-right: 4rpx;" v-for="(ele,idx) in item.productAttr" :key="idx">{{ ele.key }}
							: {{ ele.value }} </text>
					</view>
				</view>
			</view>


			<view class="total-price">
				<text>合计: {{singleOrderItem.orderBase.totalAmount}}</text>
			</view>
			<!-- buttons -->
			<view class="btns">
				<view class="btn" @tap="reallytoPay">确认付款</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getPreOrderById,
		orderconfirmation,
	} from '@/api/order/request.js'
	import {
		allAddress
	} from '@/api/address/address.js'
	import mix from '@/mixins/checklogin.js'
	export default {
		data() {
			return {
				singleOrderItem: {},
				addressInfo: {},
				orderid:'',
			}
		},
		mixins: [mix],
		methods: {
			reallytoPay() {
				console.log(123);
				this.checklogin(this.pays)
			},

			pays() {
				var orderItemList = [];
				this.singleOrderItem.orderItems.forEach(ele => {
					let obj = {
						"cartId": ele.cartId,
						"productId": ele.productId,
						"productQuantity": ele.productQuantity,
						"productSkuId": ele.productSkuId
					}
					orderItemList.push(obj)
				})
				let obj = {
					"addressId": this.addressInfo.id,
					"orderId": this.singleOrderItem.orderItems[0].orderId,
					"orderItemList": orderItemList,
					"payType": 0,
					"sourceType": 1
				}
				orderconfirmation(obj)
					.then(res => {
						if (res.data.success) {
							console.log("这是啥玩意",res);
							uni.redirectTo({
								url: `/pages/payment/payment?orderId=${res.data.data.orderId}`
							})
						}
					})
			},

			async init(id) {
				let result = await getPreOrderById(id)
				console.log("await getPreOrderById(id)", result);
				result.data.data.orderItems.forEach(ele => {
					ele.productAttr = JSON.parse(ele.productAttr)
				})
				this.singleOrderItem = result.data.data;
				console.log("this.singleOrderItem", this.singleOrderItem);
			},
			initSelAddress() {
				var addressInfo = uni.getStorageSync("selectAddress");
				if (addressInfo) {
					this.addressInfo = addressInfo
				}else{
					allAddress().then(res=>{
						console.log("默认地址",res);
						let result  = res.data.data.items.find(ele=>{
							console.log(ele);
							return ele.defaultStatus==1
						})
						console.log(result);
						this.addressInfo = result
					})
				}
			},
		},
		onShow(){
			console.log("这是onshow");
			this.init(this.orderid)
			this.initSelAddress()
		},
		onLoad(val) { 
			this.orderid=val.id
		}
	}
</script>

<style lang="scss" scoped>
	.order-detail {
		.order-status {
			font-size: 36rpx;
			color: #494949;
			height: 88rpx;
			border-bottom: 1px solid #ccc;
			line-height: 88rpx;
			margin: 0 60rpx;
			box-sizing: border-box;
		}

		.address-block {
			font-size: 28rpx;
			color: #494949;
			border-bottom: 1px solid #ccc;
			margin: 0 60rpx;
			box-sizing: border-box;
			padding: 30rpx 0;
		}

		.order-card {
			width: 672rpx;
			box-sizing: border-box;
			padding: 36rpx;
			border-radius: 24rpx;
			background-color: #fff;
			margin: 30rpx auto;
			font-size: 24rpx;
			color: #3E3E3E;

			.order-title {
				line-height: 33rpx;
				display: flex;
				justify-content: space-between;

				.status {
					color: #034C46;
				}

				border-bottom: 1px solid #F1ECE7;
				padding-bottom: 30rpx;
			}

			.sku-block {
				display: flex;
				justify-content: flex-start;
				border-bottom: 1px solid #F1ECE7;
				padding: 30rpx 0;

				.img {
					width: 162rpx;
					height: 162rpx;
					flex-shrink: 0;
					background-color: #8F8F94;
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
							color: #3E3E3E;
						}

						.price {
							colro: #8D8D8D;
						}
					}

					.p2,
					.p3 {
						font-size: 22rpx;
						color: #8D8D8D;
						line-height: 30rpx;
						margin-top: 5rpx;
					}

					.p4 {
						text-align: right;
						margin-top: 10rpx;
						color: #8D8D8D;
						text-decoration: underline;
					}

				}
			}

			.total-price {
				font-size: 26rpx;
				line-height: 37rpx;
				text-align: right;
				margin-top: 14rpx;
			}

			.btns {
				margin-top: 20rpx;
				display: flex;
				justify-content: flex-end;

				.btn {
					width: 124rpx;
					height: 50rpx;
					border: 1px solid #2D4F43;
					font-size: 26rpx;
					border-radius: 10rpx;
					color: #2D4F43;
					text-align: center;
					line-height: 50rpx;
					margin-left: 32rpx;
				}
			}

		}
	}
</style>
