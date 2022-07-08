<template>
	<view class="mine-main">
		<view class="head">
			<view class="avatar-area">
				<image class="avatar" :src="userInfo.icon" @tap="goUserCenter" mode=""></image>
				<view class="user-info">
					<template v-if="userInfo.nickname">
						<view class="nickname">{{userInfo.nickname}}</view>
						<view class="username">用户名: {{userInfo.username}}</view>
					</template>
					<template v-else>
						<view>Hi~</view>
						<view>您还没有登陆呢</view>
					</template>
					<!-- #ifdef APP-PLUS -->
					<view @tap="getUserInfo">点我获取个人微信头像及昵称</view>
					<!-- #endif -->


				</view>
			</view>
			<!-- <image class="icon-setting" src="../../static/icons/setting.png" mode="" @tap="goSetting"></image> -->
		</view>
		<view class="btns" v-if="!userInfo.nickname">
			<navigator url="register/register" class="btn btn-reg">注册</navigator>
			<navigator url="login/login" class="btn btn-login">登陆</navigator>
		</view>
		<!-- 我的订单 -->
		<view class="my-orders">
			<view class="title">
				我的订单
			</view>
			<view class="navs">
				<navigator class="nav-item" url="/pages/my/myorder/myorder?type=0">
					<image class="icon" src="../../static/icons/icon-pay.png"></image>
					<view class="text">待付款</view>
				</navigator>
				<navigator class="nav-item" url="/pages/my/myorder/myorder?type=1">
					<image class="icon" src="../../static/icons/pay-done.png"></image>
					<view class="text">已付款</view>
				</navigator>
				<navigator class="nav-item" url="/pages/my/myorder/myorder?type=2">
					<image class="icon" src="../../static/icons/icon-car.png"></image>
					<view class="text">已发货</view>
				</navigator>
				<navigator class="nav-item" url="/pages/my/myorder/myorder?type=3">
					<image class="icon" src="../../static/icons/icon-done.png"></image>
					<view class="text">已收货</view>
				</navigator>
				<navigator class="nav-item" url="/pages/my/myorder/myorder?type=4">
					<image class="icon" src="../../static/icons/icon-back.png"></image>
					<view class="text">售后</view>
				</navigator>
			</view>
		</view>
		<view class="grid-block">
			<view v-for="item in gridList" class="uni-grid-item" :key="item.text">
				<view @tap="navigateTo(item.url,item.text)">
					<image :src="item.img" mode=""></image>
					<text class="text">
						{{item.text}}
					</text>
				</view>
			</view>
		
			<view class="uni-grid-item" key="tel">

				<view @tap="tel">
					<image src="../../static/icons/tel.png" mode=""></image>
					<text class="text">
						联系客服
					</text>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import mix from '@/mixins/checklogin.js'
	export default {
		name: 'Mine',
		mixins:[mix],
		data() {
			return {
				user: {
					avatar: '',
					
				},
				userInfo: {},
				isLogin: false,
				baseUrl: "http://bufantec.com",
				gridList: [{
						url: '/pages/my/goodscollect/goodscollect',
						img: '../../static/icons/save.png',
						text: '商品收藏'
					},
					{
						url: '',
						img: '../../static/icons/brand.png',
						text: '品牌'
					},
					{
						url: '/pages/my/articleList/articleList',
						img: '../../static/icons/article.png',
						text: '文章收藏'
					},
					{
						url: './address/address',
						img: '../../static/icons/address.png',
						text: '地址'
					},
					{
						url: '',
						img: '../../static/icons/card.png',
						text: '卡包'
					},
					{
						url: '/pages/my/shoppingcart/shoppingcart',
						img: '/static/icons/cart2.png',
						text: '购物车'
					},

				]
			}
		},
		onShow() {
			if(this.checkHasLogined()){
				
				this.init();
			}else{
				console.log(1111111)
				this.userInfo =  {
		
				}
			}
		},
		methods: {
			tel() {
				uni.makePhoneCall({
					phoneNumber: "110"
				})
			},
			
			
			init() {
				var userData = uni.getStorageSync("leju_user");
				
				console.log(userData)
				this.userInfo = userData;
			},
			navigateTo(url, text) {
				if (url) {
					uni.navigateTo({
						url
					})
				} else {
					uni.showToast({
						image: '/static/icons/sorry.png',
						title: text + '功能暂未开通 !'
					})
				}

			},
			goUserCenter() {
				uni.navigateTo({
					url: 'updatainfomation/updatainfomation'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.mine-main {
		box-sizing: border-box;
		padding: 0 40rpx;

		.head {
			display: flex;
			justify-content: space-between;
			width: 100%;
			height: 150rpx;
			padding-top: 60rpx;

			.avatar-area {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				height: 150rpx;

				.avatar {
					width: 150rpx;
					height: 150rpx;
					border-radius: 50%;
					background-color: #C8C7CC;
				}

				.user-info {
					display: flex;
					margin-left: 32rpx;
					height: 150rpx;
					color: #3D4C46;
					font-size: 28rpx;
					flex-direction: column;
					justify-content: space-around;
					box-sizing: border-box;
					padding: 14rpx 0;

					.nickname {
						font-size: 40rpx;
						font-weight: 600;
					}

					.username {
						font-size: 26rpx;
						color: #999;
					}
				}
			}

			.icon-setting {
				width: 50rpx;
				height: 50rpx;
			}
		}

		.btns {
			margin: 40rpx auto;
			display: flex;
			justify-content: center;
			align-items: center;

			.btn {
				width: 182rpx;
				height: 76rpx;
				box-sizing: border-box;
				border: 1px solid #354E44;
				color: #354E44;
				font-size: 30rpx;
				text-align: center;
				line-height: 76rpx;
				border-radius: 10rpx;
				margin: 0 30rpx;

				&.btn-login {
					background-color: #354E44;
					color: #fff;
				}
			}
		}

		.my-orders {
			width: 670rpx;
			height: 208rpx;
			border-radius: 4rpx;
			background-color: #fff;
			margin-top: 60rpx;

			.title {
				height: 76rpx;
				font-size: 26rpx;
				line-height: 76rpx;
				border-bottom: 1px solid #ddd;
				box-sizing: border-box;
				margin: 0 54rpx;
			}

			.navs {
				padding: 0 54rpx;
				box-sizing: border-box;
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-align: center;

				.icon {
					width: 40rpx;
					height: 40rpx;
					margin-top: 20rpx;
				}

				.text {
					font-size: 26rpx;
					line-height: 37rpx;
					text-align: center;
				}
			}
		}

		.grid-block {
			width: 670rpx;
			margin-top: 60rpx;
			background-color: #fff;
			border-radius: 20rpx;
			text-align: center;
			padding: 30rpx 0 60rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;

			.uni-grid-item {
				width: 33.33%;
				min-height: 200rpx;
				display: flex;
				align-items: center;
				justify-content: center;

				image {
					display: block;
					width: 50rpx;
					height: 50rpx;
					margin: 30rpx auto;
				}

				.phoneBtn {
					background: transparent;
					font-size: 26rpx;
					line-height: 1.2;

				}

				.phoneBtn::after {
					border: none;
				}

				text {
					font-size: 26rpx;
					line-height: 38rpx;
				}

			}
		}
	}
</style>
