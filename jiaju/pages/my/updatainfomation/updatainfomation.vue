<template>
	<view class="user-center">
		<button @tap="isTextOrInput" style="float: right;margin: 10px;" type="default" size="mini" plain="true">修改用户信息</button>
		<view class="item">
			<text class="label">头像</text>
			<view v-if="textORinput">
				<image class="avatar" :src="userInfo.icon" mode=""></image>
			</view>
			<view v-else style="display: flex;align-items: center;">
				
				<button v-if="!img" @tap="uploadIcon" type="default" size="mini" plain="true">上传头像</button>
				<image v-else class="avatar" :src="img" mode=""></image>
			</view>
		</view>
		<view class="item">
			<text class="label">用户名</text>
			<text class="text"  v-if="textORinput">{{userInfo.username}}</text>
			<view v-else>
					<input type="text" class="ipt" v-model="userInfo.username" placeholder="请输入用户名"/>
			</view>
		</view>
		<view class="item">
			<text class="label">昵称</text>
			<text class="text"  v-if="textORinput">{{userInfo.nickname}}</text>
			<view v-else>
					<input type="text" class="ipt"  v-model="userInfo.nickname" placeholder="请输入昵称" />
			</view>
		</view>
		<view class="item">
			<text class="label">手机号</text>
			<text class="text"  v-if="textORinput">{{userInfo.phone}}</text>
			<view v-else>
					<input type="text" class="ipt" v-model="userInfo.phone" placeholder="请输入手机号" />
			</view>
		</view>
		<button class="btn-logout" v-if="!textORinput" type="default" @tap="uptUserInfo">更新</button>
		<button class="btn-logout" v-else type="default" @tap="logout">退出登陆</button>
	</view>
</template>

<script>
	import baseUrl from "@/api/baseUrl.js"
	import {
		updateMemberInfo
	} from '@/api/updateInfomation/request.js'
	export default {
		data() {
			return {
				textORinput:'',
				userInfo:{},
				img:'',
			}
		},
		methods: {
			uploadIcon(){
				uni.chooseImage({
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
				        uni.uploadFile({
				            url: `${baseUrl}/lejuClient/login/uploadAvatar`, 
				            filePath: tempFilePaths[0],
				            name: 'file',
				            formData: {
				                'user': 'test'
				            },
				            success: (uploadFileRes) => {
								console.log("uploadFileRes",uploadFileRes);
								console.log(JSON.parse(uploadFileRes.data).data.fileUrl);
								console.log("this",this);
								this.img = JSON.parse(uploadFileRes.data).data.fileUrl
				            }
				        });
				    }
				});
			},
			uptUserInfo(){
				if(this.img){
					this.userInfo.icon = this.img
				}
				console.log("用户信息",this.userInfo);
				updateMemberInfo(this.userInfo).then(res=>{
					console.log("让我康康你是谁",res);
					if(res.data.success == true){
						uni.showToast({
							title:"更新成功,需要重新登录获取最新用户信息"
						})
						setTimeout(()=>{
							this.logout()
						},1000)
						
					}else{
						uni.showToast({
							title:"更新失败"
						})
					}
				})
				
			},
			
			isTextOrInput(){
				this.textORinput = !this.textORinput
				console.log("this.textORinput = !this.textORinput",this.textORinput);
			},
			logout(){
				uni.clearStorageSync();
				uni.showToast({
					title:"退出成功,跳转到我的页面",
					duration:1500
				})
				setTimeout(()=>{
					uni.switchTab({
						url:'../my'					
					})
				},1000)
				
				// uni.navigateTo({
				// 	url:'/pages/home/home'
				// })
			},
			init(){
				var userData = uni.getStorageSync("leju_user");
				this.textORinput = true;
				this.userInfo = userData;
				console.log("this.userInfo",this.userInfo);
			},
			
		},
		onLoad(){
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
.ipt{
		text-align: right;
	}
	.user-center{
		.item{
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			line-height: 94rpx;
			box-sizing: border-box;
			padding: 10rpx 30rpx;
			border-bottom: 1px solid #E5E5E5;
			&:nth-child(1){
				margin-top: 20rpx;
			}
			.avatar{
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			.label{
				color: #494949;
			}
			.text{
				color: #A1A1A1;
			}
		}
		.btn-logout{
			position: fixed;
			left: 50%;
			bottom: 20%;
			margin-left: -185rpx;
			width: 370rpx;
			height: 88rpx;
			font-size: 32rpx;
			color: #fff;
			text-align: center;
			line-height: 88rpx;
			background: #1C4B47;
			border-radius: 8px;
		}
	}
</style>
