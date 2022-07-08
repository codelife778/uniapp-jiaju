<template>
	<div class="buycart-main">
		<view class="product-card" v-for="item in shoppingcartList" :key="item.id">
			<view class="info-block">
				<label>
					<evan-checkbox primary-color="#354E44" shape="square" v-model="item.isChecked"></evan-checkbox>
				</label>
				<navigator class="nav" url="/pages/buyCart/index">
					<image class="cover-img" :src="item.productPic" mode=""></image>
					<view class="info-text">
						<view class="gname">{{ item.productName }}</view>
						<view class="code">
							<text>编号: {{ item.productSkuId }}</text>
							<text>价格: ¥{{ item.price }}</text>
						</view>
						<view>数量: {{ item.quantity }}</view>
					</view>
				</navigator>
			</view>

			<view class="buy-count-steps">
				<text class="step-reduce" @tap="btnReduce(item)">-</text>
				<text class="step-text">{{ item.quantity }}</text>
				<text class="step-add" @tap="btnAdd(item)">+</text>
			</view>
		</view>

		<view class="footer-bar">
			<view class="sel-all">
				<text class="text">全选</text>
				<evan-checkbox primary-color="#354E44" shape="square" v-model="allChecked"></evan-checkbox>
			</view>
			<view class="price">
				合计: ¥
				<text class="text">{{ allPrice }}</text>
				<text class="btn" @click="goPay">结算</text>
			</view>
		</view>
	</div>
</template>

<script>
	import {
		showShoppingcartList,
		deleteCartItems,
		clearCart
	} from '@/api/shoppingcart/request.js'
	import {
		addPreOrder
	} from '@/api/goodsdetail/request.js'
	export default {
		onLoad() {
			this.init()
		},
		data() {
			return {
				shoppingcartList: [],
				//计算属性不需要写在
				// allChecked:false,
				// allPrice:0,
			}
		},
		computed: {
			allChecked: {
				get() {
					if (this.shoppingcartList.length == 0) {
						return false;
					}
					// every 判断每一项的checked = true
					return this.shoppingcartList.every(item => item.isChecked);
				},
				set(val) {
					this.shoppingcartList.forEach(ele => (ele.isChecked = val));
				}
			},
			allPrice() {
				if (this.shoppingcartList.length == 0) return 0;
				return this.shoppingcartList.reduce((a, b) => {
					if (b.isChecked) {
						a += b.quantity * b.price;
					}
					return a;
				}, 0);
			}
		},
		methods: {
			btnReduce(val) {
			var _this = this;
			if (val.quantity > 1) {
				val.quantity--;
			} else {
				uni.showModal({
					title: '是否删除该商品?',
					confirmText: '确认',
					cancelText: '取消',
					success(res) {
						if (res.confirm) {
							deleteCartItems([val.id]).then(res => {
									if (res.data.success) {
										uni.showToast({
											title: '删除成功'
										});
										_this.init();
										console.log("删除了");	
									} 
							});
						} else {
							alert('取消了');
						}
					}
				});
			}
			},
			btnAdd() {

			},
			goPay() {
				// 选中的商品列表
				var checkedList = this.shoppingcartList.filter(ele => ele.isChecked);

				//构建提交对象
				var orderInfoVo = {
					orderItemList: []
				};
				for (var i = 0; i < checkedList.length; i++) {
					var checkedOne = checkedList[i];
					orderInfoVo.orderItemList.push({
						cartId: checkedOne.id,
						productId: checkedOne.productId,
						productQuantity: checkedOne.quantity,
						productSkuId: checkedOne.productSkuId
					});
				}
				addPreOrder(orderInfoVo).then(res => {
					console.log(res);
					if (res.data.success) {
						uni.showToast({
							title: '购买成功,1s后跳转到订单确认页',
							icon: 'none'
						});
						setTimeout(() => {
							uni.navigateTo({
								url: `/pages/payment/payment?orderId=${res.data.data.orderId}`
							});
						}, 1000);
					}
				});
			},
			init() {
				showShoppingcartList().then(res => {
					console.log("这是啥啊",res);
					res.data.data.items.forEach(ele => {
						ele.isChecked = false;
					});
					this.shoppingcartList = res.data.data.items;
				});
			},
			// async init() {
			// 	let _this = this
			//⭐
			// 	this.shoppingcartList = (await showShoppingcartList()).data.data.items	
			// 	this.shoppingcartList.forEach(ele => {
			// 		_this.set(ele,'isCheck',false)
			// 		// ele.isChecked = false;
			// 	}); 
			// }
		},
		
	}
</script>

<style lang="scss" scoped>
	.buycart-main {
		padding-bottom: 150rpx;

		.product-card {
			width: 672rpx;
			margin: 50rpx auto;
			background-color: #fff;
			border-radius: 24rpx;
			padding: 20rpx 20rpx;
			box-sizing: border-box;

			.info-block {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.nav {
					display: flex;
					justify-content: flex-start;
					align-items: center;

					.cover-img {
						width: 136rpx;
						height: 136rpx;
						flex-shrink: 1;
						margin: 0 20rpx;
					}

					.info-text {
						font-size: 22rpx;
						color: #8d8d8d;

						.gname {
							font-size: 26rpx;
							color: #3e3e3e;
						}

						.price {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}
					}
				}
			}

			.buy-count-steps {
				display: flex;
				justify-content: flex-end;

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

		.footer-bar {
			position: fixed;
			display: flex;
			justify-content: space-around;
			align-items: center;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 150rpx;
			background-color: #fff;

			.btn {
				display: inline-block;
				width: 208rpx;
				height: 80rpx;
				background: #354e44;
				border-radius: 14px;
				color: #fff;
				font-size: 36rpx;
				line-height: 80rpx;
				text-align: center;
			}

			.sel-all {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.text {
					margin-right: 20rpx;
				}
			}

			.price {
				.text {
					color: red;
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
