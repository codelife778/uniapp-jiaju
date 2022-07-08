<template>
	<view class="info">
		<view class="banner">
			<swiper class="banner-swiper swiper" :indicator-dots="true" :autoplay="true" :interval="3000"
				:duration="400">
				<swiper-item class="swiper-item" v-for="item in goodsdetailinfo.skuList" :key="item.id">
					<image class="image" :src="item.pic" mode=""></image>
				</swiper-item>
			</swiper>
			<view class="collect" @tap="collect">
				<uni-icons type="star" size="30" :color="iconColor"></uni-icons>
			</view>
		</view>


		<view class="title-block">
			<view class="boxs">
				<view class="price " v-if="goodsdetailinfo.promotionPrice">
					¥
					<view class="money">{{ goodsdetailinfo.promotionPrice }}</view>
					.00
				</view>
				<view class="price" :class="{ disabled: goodsdetailinfo.promotionPrice }">
					¥
					<view class="money">{{ goodsdetailinfo.price }}</view>
					.00
				</view>
				<view class="promotion-type">{{ activityText }}</view>
			</view>
			<view class="detail_title">{{ goodsdetailinfo.name }}</view>
			<view class="detail_desc">{{ goodsdetailinfo.description }}</view>
		</view>


		<view class="content">
			<mp-html :content="goodsdetailinfo.detailMobileHtml" :tag-style="tagStyle" ref="article" />
		</view>


		<view class="goods-nav">
			<view class="kf"></view>
			<view class="buy-btns">
				<view class="btn-goods-cart" @tap="cartOrpurchase(0)">添加到购物车</view>
				<view class="btn-goods-buy" @tap="cartOrpurchase(1)">立即购买</view>
			</view>
		</view>


		<view class="sku-main" v-if="show">
			<view class="card">
				<image src="@/static/icons/x.png" class="close" @tap="closeCard"></image>
				<image class="img" v-if="goodsdetailinfo.skuList.length > 0"
					:src="goodsdetailinfo.skuList[selectCurrentSkuIndex].pic">
				</image>
				<view class="title">{{goodsdetailinfo.name}}</view>
				<view class="sku-count">库存数量: {{ goodsdetailinfo.skuList[selectCurrentSkuIndex].stock }}</view>
				<view class="colors-area">
					<view class="common-title">商品选择</view>
					<view class="colors">
						<view class="color-item" :class="{ active: selectCurrentSkuIndex == index }"
							v-for="(item, index) in goodsdetailinfo.skuList" :key="item.id"
							@tap="selectCurrentSkuIndex = index">
							<text style="margin-right: 10rpx;" v-for="(ele, index) in item.spData"
								:key="index">{{ ele.key }}:{{ ele.value }}</text>
						</view>
					</view>
				</view>
				<view class="promise_service">
					<view class="common-title">特色服务</view>
					<view class="works">
						<view class="work-item">送货上门</view>
						<view class="work-item">上门安装</view>
					</view>
				</view>
				<view class="line"></view>

				<view class="buy-count-area">
					<view class="common-title">购买数量</view>
					<view class="buy-count-steps">
						<text class="step-reduce" @tap="goodsReduceOrAdd(-1)">-</text>
						<text class="step-text">{{ count }}</text>
						<text class="step-add" @tap="goodsReduceOrAdd(1)">+</text>
					</view>
				</view>


				<view class="btn-buy" @click="Enure">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		goodsdetail,
		addPreOrder,
		addCart,
	} from '@/api/goodsdetail/request.js';
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import mix from '@/mixins/checklogin.js'
	export default {
		components: {
			uniIcons,
		},
		mixins: [mix],
		data() {
			return {
				show: false,
				goodsdetailinfo: {},
				iconColor: '#fff', // #fff red
				tagStyle: {
					img: 'width:100%;height:auto;'
				},
				currentBuyType: 0,
				selectCurrentSkuIndex: 0,
				count: 0, //记录步进器的值,步进器值初始为0
			}



		},
		computed: {
			activityText() {
				return "没有促销价"
			}
		},
		methods: {
			async toPay() {
				uni.showToast({
					title: "要去下单购买了哦!",
					// icon: "none"
				})
				let obj = {
					// "addressId": "string",
					// "orderId": "string",
					orderItemList: [{
						productId: this.goodsdetailinfo.id,
						productSkuId: this.goodsdetailinfo.skuList[this.selectCurrentSkuIndex].id,
						productQuantity: this.count
					}]
					// "payType": 0,
					// "sourceType": 0
				}
				let result = await addPreOrder(obj)
				console.log(" await addPreOrder(obj)",result);	
				if (result.data.success == true) {
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/order/order?id=${result.data.data.orderId}`
						});
					}, 1000);
				}
			},
			async addCart() {
				uni.showToast({
					title: "购物车添加成功!!",
					// icon: "none"
				})
				console.log("这是啥东西",this.goodsdetailinfo);
				let result = await addCart({
					cartId: '',
					productId: this.goodsdetailinfo.id,
					productSkuId: this.goodsdetailinfo.skuList[this.selectCurrentSkuIndex].id,
					quantity: this.count
				})
				console.log("result",result);
			},
			closeCard() {
				this.show = false;
			},
			Enure() {
				if (this.count == 0) {
					uni.showToast({
						title: "商品数量不能为0",
						icon: "none"
					})
					return
				}
				if (this.currentBuyType == 0) {
					//这里假装检查是否登录了
					this.checklogin(this.addCart);
					console.log("这是添加购物车", this.count);
				} else {
					//这里假装检查是否登录了
					this.checklogin(this.toPay);
					console.log("这是购买", this.count);
				}
			},
			goodsReduceOrAdd(val) {
				console.log("goodsReduceOrAdd", val);
				if (val < 0) {
					if (this.count == 0) {
						return;
					}
				}
				this.count += val;
				console.log("this.count", this.count);
			},


			cartOrpurchase(val) {
				this.show = !this.show
				this.currentBuyType = val;
			},
			collect() {

			},
			async init(id) {
				let result = await goodsdetail(id)
				result.data.data.product.skuList.forEach(ele => {
					ele.spData = JSON.parse(ele.spData);
				});
				this.goodsdetailinfo = result.data.data.product
				console.log("this.goodsdetailinfo", this.goodsdetailinfo);
				uni.setNavigationBarTitle({
					title: this.goodsdetailinfo.name
				});

			}
		},
		onLoad(options) {
			// console.log("onLoad(options)", options);
			this.init(options.productId)
		}
	}
</script>

<style lang="scss" scoped>
	.info {
		.banner {
			width: 100%;
			position: relative;

			.banner-swiper {
				width: 100%;
				height: 634rpx;

				.swiper-item {
					width: 750rpx;
					height: 100%;

					.image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.collect {
				position: absolute;
				width: 100rpx;
				height: 100rpx;
				top: 634rpx;
				right: 100rpx;
				margin-top: -50rpx;
				background: #354e44;
				box-shadow: 0 16px 24px 0 rgba(70, 70, 70, 0.2);
				text-align: center;
				border-radius: 50%;
				display: flex;
				align-items: center;
				justify-content: center;

				.image {
					width: 44rpx;
					height: 44rpx;
					margin-top: 29rpx;
				}
			}

			.dotts {
				width: 100%;
				margin-top: 20rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.dott {
					width: 50rpx;
					height: 50rpx;
					margin: 0 20rpx;
					border-radius: 50%;
				}
			}
		}

		.title-block {
			box-sizing: border-box;
			padding: 70rpx 68rpx;

			.detail_title {
				color: #262626;
				overflow: hidden;
				font-size: 32rpx;
				font-weight: 700;
			}

			.detail_desc {
				font-size: 24rpx;
				padding: 18px 0 0;
				line-height: 1.3;
				color: #666;
			}

			.boxs {
				display: flex;
				align-items: baseline;
			}

			.price {
				font-family: JDZH-Regular;
				font-size: 32rpx;
				line-height: 60rpx;
				color: #f2270c;
				display: flex;
				font-family: fantasy;
				align-items: baseline;

				.money {
					font-size: 60rpx;
				}
			}

			.promotion-type {
				position: relative;
				display: -webkit-inline-box;
				display: -webkit-inline-flex;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				line-height: normal;
				margin-right: 6px;
				padding: 0 6px;
				border: 1px solid #ff8373;
				border-radius: 2.5px;
				height: 15px;
				color: #f2270c;
				font-size: 10px;
				color: #fff;
				background-color: #f2270c;
				border-color: #f2270c;
				margin-left: 10rpx;
			}

			.promotion-type:before {
				box-sizing: border-box;
				content: '';
				position: absolute;
				left: -1px;
				top: 50%;
				transform: translate(0, -50%);
				width: 3px;
				height: 6px;
				background-color: #fff;
				border: 1px solid #ff8373;
				border-radius: 0 3px 3px 0;
				border-left: none;
			}

			.promotion-type:after {
				box-sizing: border-box;
				content: '';
				position: absolute;
				right: -1px;
				top: 50%;
				transform: translate(0, -50%);
				width: 3px;
				height: 6px;
				background-color: #fff;
				border: 1px solid #ff8373;
				border-radius: 3px 0 0 3px;
				border-right: none;
			}

			.disabled {
				margin: 0 0 0 4rpx;
				text-decoration: line-through;
				color: #b5b5b5;
				font-size: 24rpx;
				font-weight: normal;

				.money {
					font-size: 24rpx;
					font-weight: normal;
				}
			}
		}

		.content {
			padding: 68rpx;
		}

		.goods-nav {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 888;
			display: flex;
			box-sizing: border-box;
			padding: 0 60rpx;
			justify-content: space-between;
			background-color: #fff;
			align-items: center;
			height: 120rpx;

			.kf {
				width: 60rpx;
				height: 60rpx;
				background: url(~@/static/icons/kf.png) no-repeat 0 center;
				background-size: 40rpx 40rpx;
			}

			.buy-btns {
				display: flex;
				justify-content: center;
				height: 100%;

				.btn-goods-cart,
				.btn-goods-buy {
					width: 238rpx;
					height: 80rpx;
					margin-top: 20rpx;
					// border-radius: 14rpx;
					font-size: 30rpx;
					color: #fff;
					line-height: 80rpx;
					text-align: center;
					// font-weight: 600;
					background-color: #354e44;

					&.btn-goods-cart {
						background-color: #e2e2e2;
						color: #8f8f94;
					}
				}
			}
		}

		.sku-main {
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 888;

			.card {
				position: absolute;
				left: 50%;
				top: 228rpx;
				margin-left: -314rpx;
				width: 628rpx;
				height: 926rpx;
				background: #ffffff;
				border-radius: 40px;
				border-radius: 40px;
				border-radius: 40rpx;

				.close {
					position: absolute;
					right: 62rpx;
					top: 62rpx;
					width: 42rpx;
					height: 42rpx;
				}

				.img {
					position: absolute;
					width: 192rpx;
					height: 192rpx;
					background-color: pink;
					left: 62rpx;
					top: -56rpx;
					border-radius: 10rpx;
				}

				.title {
					font-size: 28rpx;
					color: #3e3e3e;
					margin-left: 284rpx;
					margin-top: 42px;
					font-weight: 600;
					width: 260rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}

				.sku-count {
					font-size: 24rpx;
					color: #b0b0b0;
					margin-top: 6rpx;
					line-height: 33rpx;
					margin-left: 284rpx;
				}

				.common-title {
					font-size: 28rpx;
					color: #3e3e3e;
					line-height: 40rpx;
					letter-spacing: 2px;
					font-weight: 600;
				}

				.colors-area {
					box-sizing: border-box;
					margin: 28rpx 56rpx;
					padding: 0 4px;

					.colors {
						display: flex;
						flex-direction: column;
						height: 170rpx;
						width: 100%;
						overflow-y: auto;

						/deep/ .color-item {
							width: calc(100% - 10px) !important;
							text-align: left !important;
						}

						radio {
							display: none;
						}

						.color-item {
							box-sizing: border-box;
							border: 2px solid transparent;
							float: left;
							width: 242rpx;
							padding-left: 10rpx;
							height: 60rpx;
							color: #3e3e3e;
							font-size: 26rpx;
							text-align: center;
							line-height: 60rpx;
							background: #f2f4f3;
							border-radius: 10px;
							border-radius: 10px;
							margin: 10rpx;

							// &:nth-child(2n-1) {
							// 	margin-left: 0;
							// }

							&.active {
								border: 2px #354e44 solid;
							}
						}
					}
				}

				.promise_service {
					box-sizing: border-box;
					padding: 0 56rpx;

					.works {
						.work-item {
							width: 100%;
							height: 60rpx;
							color: #3e3e3e;
							font-size: 26rpx;
							text-align: center;
							line-height: 60rpx;
							background: #f2f4f3;
							border-radius: 10px;
							border-radius: 10px;
							margin: 10rpx auto;
							text-align: left;
							text-indent: 1em;
						}
					}
				}

				.line {
					width: 530rpx;
					height: 3rpx;
					background-color: #f2f4f3;
					margin: 36rpx auto;
				}

				.buy-count-area {
					box-sizing: border-box;
					padding: 0 56rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.buy-count-steps {
						display: flex;
						justify-content: center;

						.step-reduce,
						.step-add,
						.step-text {
							width: 60rpx;
							height: 60rpx;
							background: #f1ece7;
							border-radius: 50%;
							text-align: center;
							line-height: 60rpx;
							font-size: 30rpx;
							margin: 0 6rpx;
						}

						.step-text {
							width: 90rpx;
							border-radius: 30rpx;
						}
					}
				}

				.btn-buy {
					width: 208rpx;
					height: 80rpx;
					background: #354e44;
					border-radius: 14px;
					border-radius: 14px;
					margin: 48rpx auto;
					color: #fff;
					font-size: 32rpx;
					text-align: center;
					line-height: 80rpx;
				}
			}
		}
	}
</style>
