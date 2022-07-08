<template>
	<view class="register">

		<view class="content">
			<!-- 头部logo -->
			<view class="header">

				<image :src="avatar" @tap="saleAvatar"></image>

			</view>
			<!-- 主体 -->
			<view class="main">
				<view class="phone">
					<wInput v-model="phoneNumber" type="text" maxlength="11" placeholder="手机号"></wInput>


				</view>
				<wInput v-model="passWord" type="password" maxlength="11" placeholder="请输入登录密码"></wInput>
				<wInput v-model="username" type="text" maxlength="11" placeholder="请输入用户名 该用户名将用于账户登录"></wInput>
				<wInput v-model="nickname" type="text" maxlength="11" placeholder="请输入昵称"></wInput>
				<wInput v-model="verCode" type="number" maxlength="4" placeholder="请输入验证码"></wInput>

			</view>

			<wButton text="注册" @tap.native="toregister" bgColor="#354E44" ></wButton>
			<!-- 底部信息 -->
			<view class="footer">
				<text @tap="isShowAgree" class="cuIcon" :class="showAgree?'cuIcon-radiobox':'cuIcon-round'">同意</text>
				<!-- 协议地址 -->
				<navigator url="" open-type="navigate">《协议》</navigator>
			</view>
		</view>
	</view>
	<!-- <view class="content">
		<view class="avator">
			<image src="@/static/icons/tiger1.jpg" style="width: 100rpx; height: 100rpx;background-color: chocolate;"></image>
		</view>
		<view class="phoneNumber">
			<input type="text" v-model="phoneNumber" placeholder="输入手机号">
		</view>
		<view class="password">
			<input type="password" v-model="passWord" placeholder="输入密码">
		</view>
		<view class="username">
			<input type="text" v-model="username"  placeholder="输入用户名称">
		</view>
		<view class="nickname">
			<input type="text" v-model="nickname" placeholder="输入昵称">
		</view>
		<button @click="toregister">注册</button>
	</view> -->
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import {
		register
	} from '../../../api/my/request.js'
	export default {
		data() {
			return {
				avatar: '/static/icons/tiger1.jpg',
				phoneNumber: '',
				passWord: '',
				username: '',
				nickname: '',
				verCode: '',
				showAgree:''
			}
		},
		components: {
			wInput,
			wButton,
		},
		methods: {
			isShowAgree(){
				console.log("同意");
			},
			saleAvatar() {
				console.log("修改头像");
			},
			toregister() {
				var obj = {
					"birthday": "",
					"city": "",
					"email": "",
					"growth": 0,
					"historyIntegration": 0,
					"icon": '/static/icons/leju-logo.png',
					"integration": 0,
					"isDisabled": 0,
					"memberLevelId": "",
					"nickname": this.nickname,
					"password": "123456",
					"personalizedSignature": "",
					"phone": this.phoneNumber,
					"realname": "",
					"sex": 0,
					"sourceType": 0,
					"status": 1,
					"username": this.username,
					"wxOpenId": ""
				}
				register(obj).then(res => {
					console.log(res);

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* margin-top: 128rpx; */
	}

	/* 头部 logo */
	.header {
		width: 161rpx;
		height: 161rpx;
		box-shadow: 0rpx 0rpx 60rpx 0rpx rgba(0, 0, 0, 0.1);
		border-radius: 50%;
		background-color: #000000;
		margin-top: 128rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}

	.header image {
		width: 161rpx;
		height: 161rpx;
		border-radius: 50%;
	}

	/* 主体 */
	.main {
		display: flex;
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;

		.phone {
			position: relative;

			.btn {
				position: absolute;
				right: 20rpx;
				top: 0;
				bottom: 0;
				margin: auto;
				height: 30px;
				z-index: 9999;
			}
		}
	}

	.tips {
		color: #999999;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-left: 48rpx;
	}

	/* 其他登录方式 */
	.other_login {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin-top: 156rpx;
		text-align: center;
	}

	.login_icon {
		border: none;
		width: 64rpx;
		height: 64rpx;
		font-size: 64rpx;
		margin: 0 64rpx 0 64rpx;
		color: rgba(0, 0, 0, 0.7);
		background-color: #fff;
		border-radius: 32rpx;
	}

	.wechat_color {
		color: #83DC42;
	}

	.weibo_color {
		color: #F9221D;
	}

	.github_color {
		color: #24292E;
	}

	/* 底部 */
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0, 0, 0, 0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}

	.footer text {
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
