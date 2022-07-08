<template>
	<view  class="kind-main">
		<navigator v-if="allCategoryList.length>0" class="block chuangyi"
			:url="'/pages/channel/channel?kindId='+allCategoryList[0].id">
			<image class="img" :src="allCategoryList[0].icon" mode="scaleToFill"></image>
			<view class="ctitle">{{allCategoryList[0].name}}</view>
			<view class="etitle">{{allCategoryList[0].etitle}}</view>
		
		</navigator>
		
		<navigator v-if="allCategoryList.length>0" class="block shipin" :url="'/pages/channel/channel?kindId='+allCategoryList[1].id">
			<image class="img" :src="allCategoryList[1].icon" mode="scaleToFill"></image>
			<view class="ctitle">{{allCategoryList[1].name}}</view>
			<view class="etitle">{{allCategoryList[1].etitle}}</view>
		</navigator>
		<view class="f-d">
			<navigator v-if="allCategoryList.length>0" class="block fengge"
				:url="'/pages/channel/channel?kindId='+allCategoryList[2].id">
				<image class="img" :src="allCategoryList[2].icon" mode="scaleToFill"></image>
				<view class="ctitle">{{allCategoryList[2].name}}</view>
				<view class="etitle">{{allCategoryList[2].etitle}}</view>
			</navigator>
			<navigator v-if="allCategoryList.length>0" class="block dengju"
				:url="'/pages/channel/channel?kindId='+allCategoryList[3].id">
				<image class="img" :src="allCategoryList[3].icon" mode="scaleToFill"></image>
				<view class="ctitle">{{allCategoryList[3].name}}</view>
				<view class="etitle">{{allCategoryList[3].etitle}}</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		findCategory
	} from '../../api/kind/request.js'
	export default {
		data() {
			return {
				allCategoryList:[]
			}
		},
		methods: {
			async init(){
				// let restul = (await findCategory())
				// console.log("康康这是啥",restul);
				this.allCategoryList = (await findCategory()).data.data.category.children
				console.log("康康这是啥",this.allCategoryList);
			}
		},
		onLoad(){
			this.init()
		}
	}
</script>

<style lang="scss" scoped>
	.kind-main {
		.head-nav{
			background-color: $base-bg;
			box-sizing: border-box;
			.title{
				width: 100%;
				text-align: center;
				color: #fff;
			}
			.icon{
				width: 36rpx;
				height: 36rpx;
				&.icon-chat{
					margin-left: 20rpx;
				}
				&.icon-search{
					margin-right: 40rpx;
				}
			}
			
		}
		
	
		.f-d {
			width: 670rpx;
			display: flex;
			margin: 0 auto;
			margin-bottom: 48rpx;
			justify-content: space-between;
	
			.fengge,
			.dengju {
				width: 312rpx;
				height: 442rpx;
				background: #FAFAFA;
				box-shadow: 0 12px 20px 0 rgba(83, 66, 49, 0.03);
				border-radius: 20px;
				border-radius: 20px;
			}
		}
	
		.block {
			position: relative;
			.img {
				position: absolute;
				right: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
			.ctitle{
				position: absolute;
				left: 52rpx;
				top: 148rpx;
				font-size: 48rpx;
				color: #3E3E3E;
			}
			.etitle{
				position: absolute;
				left: 52rpx;
				top: 220rpx;
				color: #7F7F7F;
				font-size: 30rpx;
			}
			
			&.chuangyi,
			&.shipin {
				width: 670rpx;
				height: 302rpx;
				background: #D5D5D5;
				box-shadow: 0 12px 20px 0 rgba(83, 66, 49, 0.05);
				border-radius: 20px;
				margin: 28px auto;
				.img{
					width: 60%;
				}
			
			}
			&.shipin{
				background-color: #fff;
			}
		}
	
	}
</style>
