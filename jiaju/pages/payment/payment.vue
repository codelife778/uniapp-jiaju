<template>
	<view>
		<view class="block">
			<view class="content">
				<view class="orderinfo">
					<view class="row">
						<view class="nominal">订单编号:</view><view class="text">{{orderinfo.orderSn}}</view>
					</view>
					<view class="row">
						<view class="nominal">订单金额:</view><view class="text">{{orderinfo.totalAmount }}元</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="block">
			<view class="title">
				选择支付方式
			</view>
			<view class="content">
				<view class="pay-list">
					
					<view class="row" @tap="paytype='alipay'">
							<view class="left">
								<image src="/static/icons/alipay.png"></image>
							</view>
							<view class="center">
								支付宝支付
							</view>
							<view class="right">
								<radio :checked="paytype=='alipay'" color="#354E44" />
							</view>
					</view>
					
					
					<view class="row" @tap="paytype='wxpay'">
							<view class="left">
								<image src="/static/icons/wxpay.png"></image>
							</view>
							<view class="center">
								微信支付
							</view>
							<view class="right">
								<radio :checked="paytype=='wxpay'" color="#354E44" />
							</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="pay">
			<view class="btn" @tap="immediatePay">立即支付</view>
			<view class="tis">
				点击立即支付，即代表您同意<view class="terms">
					《条款协议》
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		confirmPay,
		payConfirm,
	} from '@/api/payment/request.js'
	import{
		getPreOrderById,
	} from '@/api/order/request.js'
	export default {
		data() {
			return {
				id:'',
				orderinfo:{},
				paytype:'alipay',
			}
		},
		methods: {
			async immediatePay(){
				let result = await payConfirm({
					orderId:this.id,
					payType:this.paytype==1?1:2
				})
				console.log("result",result);
				if(result.data.success == true){
					uni.hideLoading();
					uni.showToast({
						title:'支付成功'
					});
					setTimeout(()=>{
						uni.redirectTo({
							url:'../paymentResult/paymentResult?price='+this.orderinfo.totalAmount
						});
					},300);
				}else{
					uni.hideLoading();
				}
			},
			async init(id){
			let result = await getPreOrderById(id)
			// console.log(" await getPreOrderById(id)",result);
			this.orderinfo = result.data.data.orderBase
			}
		},
		onShow(){
			this.init(this.id)
		},
		onLoad(e){
			// console.log(e);
			this.id=e.orderId;
		}
	}
</script>

<style lang="scss" scoped>
.block{
		width: 94%;
		padding: 0 3% 40rpx 3%;
		.title{
			width: 100%;
			font-size: 34rpx;
		}
		.content{
			.orderinfo{
				width: 100%;
				border-bottom: solid 1rpx #eee;
				.row{
					width: 100%;
					height: 90rpx;
					display: flex;
					align-items: center;
					.nominal{
						flex-shrink: 0;
						font-size: 32rpx;
						color: #7d7d7d;
					}
					.text{
						width: 70%;
						margin-left: 10rpx;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size: 32rpx;
					}
				}
			}
			.pay-list{
				width: 100%;
				border-bottom: solid 1rpx #eee;
				.row{
					width: 100%;
					height: 120rpx;
					display: flex;
					align-items: center;
					.left{
						width: 100rpx;
						flex-shrink: 0;
						display: flex;
						align-items: center;
						image{
							width: 80rpx;
							height: 80rpx;
							background-color: transparent;
						}
					}
					.center{
						width: 100%;
						font-size: 30rpx;
					}
					.right{
						width: 100rpx;
						flex-shrink: 0;
						display: flex;
						justify-content: flex-end;
					}
				}
			}
		}
	}
	.pay{
		margin-top: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		.btn{
			width: 70%;
			height: 80rpx;
			border-radius: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #fff;
			background-color: #354E44;
			box-shadow: 0rpx 5rpx 10rpx rgba(0,0,0,0.2);
		}
		.tis{
			margin-top: 10rpx;
			width: 100%;
			font-size: 24rpx;
			display: flex;
			justify-content: center;
			align-items: baseline;
			color: #999;
			.terms{
				color: #5a9ef7;
			}
		}
	}
</style>
