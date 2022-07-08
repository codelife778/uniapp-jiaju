<template>
	<view class="login">
		<view class="content">
		
			<view class="header">
				<image src="../../../static/icons/leju-logo.png"></image>
			</view>

			<view class="main">
				<wInput v-model="phoneNumber" type="text" maxlength="11" placeholder="用户名/电话"></wInput>
				<wInput v-model="passWord" type="password" maxlength="11" placeholder="密码"></wInput>
			</view>
			<view class="btn">
				
			<wButton bgColor="#354E44" text="登 录" @tap.native="startLogin()">登录</wButton> 
			</view>
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="/pages/my/register/register" open-type="navigate">注册账号</navigator>
			
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from '@/components/watch-login/watch-input.vue' //input
	import wButton from '@/components/watch-login/watch-button.vue' //button
	import {
		doLogin,
		register,
		getUserInformation
	} from '@/api/my/request.js'
	export default {
		data() {
			return {
				phoneNumber: '火星人',
				passWord: '123456',
			}
		},
		components: {
			wInput,
			wButton,
		},
		methods: {
			login() {
				return new Promise((resolve, rej) => {
					doLogin({
						username: this.phoneNumber,
						password: this.passWord
					}).then(res => {
					
						if (res.data.success == true) {
					
							uni.clearStorageSync();
							uni.setStorageSync("leju_token", res.data.data.token);
						
							resolve(true)
						} else {
							rej(false)
						}
					})
				})
			},
			getUserInfo() {
				return new Promise((resolve, reject) => {
					getUserInformation()
						.then(res => {
							if (res.data.success == true) {
								uni.setStorageSync("leju_user", res.data.data.userInfo);
								uni.showToast({
									title: "登录成功,1s后跳转到个人中心"
								})
								setTimeout(() => {
									uni.switchTab({
										url: '/pages/my/my'
									})
								}, 1000)
			
								resolve()
							} else {
								reject()
							}
						})
			
				})
			},
			async startLogin() {
			//同步的方式书写异步代码
			console.log(111);
				var result = await this.login();
				if (result) {
					await this.getUserInfo();
				} else {
					uni.showToast({
						title: "登录失败,请检查用户名和密码!"
					})
				}
			
			},
			toRegister() {
				uni.navigateTo({
					url: '../register/register'
				})
				console.log("跳转了");
			},
		}
	}
</script>

<style lang="scss" scoped>
.content {
		display: flex;
		flex-direction: column;
		justify-content:center;
	}
	

	.header {
		width:161rpx;
		height:161rpx;
		box-shadow:0rpx 0rpx 60rpx 0rpx rgba(0,0,0,0.1);
		border-radius:50%;
		background-color: #000000; 
		margin-top: 128rpx;
		margin-bottom: 72rpx;
		margin-left: auto;
		margin-right: auto;
	}
	.header image{
		width:161rpx;
		height:161rpx;
		border-radius:50%;
	}
	
	.main {
		display: flex;
		// align-items: center;
		
		flex-direction: column;
		padding-left: 70rpx;
		padding-right: 70rpx;
		
	}
	.btn{
		
	}
	.tips {
		color: #999999;
		font-size: 28rpx;
		margin-top: 64rpx;
		margin-left: 48rpx;
	}
	
	.login_icon{
		border: none;
		width: 64rpx;
		height: 64rpx;
		font-size: 64rpx;
		margin: 0 64rpx 0 64rpx;
		color: rgba(0,0,0,0.7);
		background-color: #fff;
		border-radius: 32rpx;
	}
	.wechat_color{
		color: #83DC42;
	}
	.weibo_color{
		color: #F9221D;
	}
	.github_color{
		color: #24292E;
	}
	
	/* 底部 */
	.footer{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		font-size: 28rpx;
		margin-top: 64rpx;
		color: rgba(0,0,0,0.7);
		text-align: center;
		height: 40rpx;
		line-height: 40rpx;
	}
	.footer text{
		font-size: 24rpx;
		margin-left: 15rpx;
		margin-right: 15rpx;
	}
</style>
