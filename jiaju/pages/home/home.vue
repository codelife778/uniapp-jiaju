<template>
	<view class="home">
	
		<!-- 轮播 -->
		<view class="banner">
			<swiper class="swiper-banner" previous-margin="0rpx" indicator-dots="true" indicator-color="#767574"
				indicator-active-color="#D8D8D8" :autoplay="true" :interval="3000" :duration="400">
				<swiper-item v-for="m in bannerAdsList" :key="m.id">
					<view class="swiper-item">
						<image class="img" :src="m.pic" mode="widthFix"></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		
		
		
		<!-- 分类 -->
		<view class="section-kinds">
			<navigator v-for="item in fourCategoryList" class="kind-block" :key="item.id"
				:url="'/pages/channel/channel?kindId=' + item.id">
				<image class="icon-kind" :src="item.icon"></image>
				<view class="kind-text">{{ item.name }}</view>
			</navigator>
		</view>
		
		
		<!-- 限时活动 -->
		<view class="section-notify">
			<image src="../../static/icons/notify.png" class="icon-notify"></image>
			<text class="text">限时活动:</text>
			<swiper class="swiper recommend-swiper" :circular="true" :vertical="true" :indicator-dots="false"
				:autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="item in limitTimeList" :key="item.id" class="recommend-item">
					<navigator class="nav-item" :url="'/pages/goodsdetail/goodsdetail?productId=' + item.productId">
						<view class="product-name">{{ item.name }}</view>
						<view class="product-price">
							<view class="text" style="text-decoration: line-through;color:#333;">{{ item.price }}元
							</view>
							<view class="text" style="color:red;">现价: {{ item.promotionPrice }}元</view>
						</view>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 热门推荐 -->
		<view class="section-series">
			<view class="common-title"><text class="title">热门推荐</text></view>
			<view class="box">
				<swiper class="scroll-series" :display-multiple-items="3" :circular="true" :autoplay="true"
					:interval="3000" easing-function="linear" :duration="3000">
					<swiper-item @tap="togoodsdetail(item.id)" class="series-block" v-for="item in hotList" :key="item.id">
						<image class="image" :src="item.pic" mode=""></image>
						<view class="cname">{{ item.name }}</view>
						<view class="ename">{{ item.ename }}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		
		<!-- 新品推荐 -->
		<view class="section-series">
			<view class="common-title">
				<text class="title">新品推荐</text>
				<!-- <text class="more" @tap="seriesMore">更多></text> -->
			</view>
			<scroll-view class="newProduct" scroll-x="true">
				<view @tap="togoodsdetail(item.id)" class="series-block" v-for="item in newProductsList" :key="item.id">
					<image class="image" :src="item.pic" mode=""></image>
					<view class="newProductBox">
						<view class="cname">{{ item.name }}</view>
						<!-- <view class="squote">
							<view class="dots" v-for="ele in item.squote" :key="ele" :style="{background:ele}"></view>
						</view> -->
						<view class="ename">价格：{{ item.price }}</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		
		<!-- 猜你喜欢 -->
		<view class="section-series section-hot">
			<view class="common-title"><text class="title">猜你喜欢</text></view>
		
			<view class="product-list-main">
				<view class="product-list">
					<navigator class="product-block" :key="item.id"
						:url="'/pages/goodsdetail/goodsdetail?productId=' + item.id"
						v-for="(item, index) in youLikeList">
						<image class="img" :src="item.pic" mode="scaleToFill"></image>
						<view class="text-area">
							<view class="gname">{{ item.brandName }}</view>
							<view class="price-origin">
								<text class="price">¥{{ item.price}}</text>
								<text class="origin">{{ item.origin_city || '乐居' }}</text>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
	import {
		bannerAds,
		findCategory,
		limitTime,
		hotList,
		newProducts,
		youLike,
	} from '../../api/home/request.js';
	export default {
		data() {
			return {
				bannerAdsList: [],
				fourCategoryList:[],
				limitTimeList:[],
				hotList:[],
				newProductsList:[],
				youLikeList:[],
			}
		},

		methods: {
			togoodsdetail(val){
				uni.navigateTo({
					url: `/pages/goodsdetail/goodsdetail?productId=${val}`
				})
			},
			goSeries(val){
				
			},
			async init() {
				// bannerAds().then(res=>{
				// 	console.log("res",res)
				// 	this.bannerAdsList = res.data.data.items
				// })
				this.bannerAdsList = (await bannerAds()).data.data.items
				this.fourCategoryList = (await findCategory()).data.data.category.children
				this.limitTimeList = (await limitTime()).data.data.items
				this.hotList = (await hotList()).data.data.items
				this.newProductsList = (await newProducts()).data.data.productList
				this.youLikeList = (await youLike()).data.data.items

			}
		},
		onLoad(options) {
			this.init()
		},
	}
</script>

<style lang="scss" scoped>
.home{
	
	
	//轮播
	.banner {
		.swiper-banner {
			width: 100%;
			height: 362rpx;
	
			.swiper-item {
				width: 750rpx;
				height: 100%;
				border-radius: 0 0 30rpx 30rpx;
				overflow: hidden;
	
				.img {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	//四个主分类
	.section-kinds {
		width: 100%;
		margin: 60rpx auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
	
		.kind-block {
			width: 120rpx;
			text-align: center;
	
			.icon-kind {
				width: 80rpx;
				height: 80rpx;
				border-radius: 8rpx;
			}
	
			.kind-text {
				font-size: 32rpx;
				color: #3e3e3e;
				text-align: center;
			}
		}
	}
	
	//限时活动
	.section-notify {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		width: 670rpx;
		height: 96rpx;
		margin: 40rpx auto;
		background-color: #fff;
		font-size: 28rpx;
		color: #3e3e3e;
		line-height: 96rpx;
		text-indent: 0.5em;
	
		.icon-notify {
			width: 48rpx;
			height: 48rpx;
			margin-left: 30rpx;
			animation: notifyA 0.5s 1s linear infinite both;
		}
	
		.text {
			font-weight: 600;
			color: orange;
		}
	
		.recommend-swiper {
			flex: 1;
			height: 96rpx;
			.recommend-item {
				.nav-item {
					display: flex;
					width: 100%;
					height: 100%;
					justify-content: flex-start;
					align-items: center;
				}
	
				.product-name {
					width: 250rpx;
					display: inline-block;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
	
				.product-price {
					.text {
						font-size: 24rpx;
						line-height: 30rpx;
					}
				}
			}
		}
	}
	.section-series {
		// padding: 0 $base-padding;	
	
		.common-title {
			// padding: $base-padding 0;
			font-family: PingFangSC-Semibold;
			font-size: 32rpx;
			color: #3e3e3e;
			letter-spacing: 1px;
			font-weight: 600;
		}
	
		.newProduct {
			// height: 314rpx;
			white-space: nowrap;
	
			// /deep/ .uni-scroll-view-content{
			// 	// display: flex;
			// 	// align-items: center;
			// 	// justify-content: flex-start;
			// 	white-space: nowrap;
			// }
			.series-block {
				width: 590rpx;
				// height: 314rpx;
				// padding-top: 54rpx;
				display: inline-block;
				margin-right: 20rpx;
				position: relative;
				// display: flex;
				// align-items: flex-end;
	
				.image {
					position: absolute;
					left: 44rpx;
					top: 0;
					bottom: 0;
					width: 194rpx;
					height: 168rpx;
					border-radius: 8rpx;
					margin: auto;
				}
	
				.newProductBox {
					// width: 100%;
					padding-left: 270rpx;
					padding-top: 50rpx;
					padding-bottom: 50rpx;
					height: 160rpx;
					background: #ffffff;
					box-shadow: 0 16rpx 48rpx 0 rgba(122, 98, 75, 0.12);
					border-radius: 20rpx;
					display: flex;
					flex-wrap: wrap;
	
					justify-content: space-between;
					flex-direction: column;
	
					.cname,
					.ename {
						font-family: PingFangSC-Semibold;
						font-size: 26rpx;
						color: #3e3e3e;
						letter-spacing: 1.86rpx;
						// overflow: hidden;
						// text-overflow: ellipsis;
						// white-space: break-spaces;
						width: 100%;
					}
	
					.cname {
						height: 72rpx;
						// overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-box-orient: vertical;
						white-space: normal;
					}
	
					.squote {
						display: flex;
						align-items: center;
						margin: 20rpx 0;
	
						.dots {
							width: 20rpx;
							height: 20rpx;
							border-radius: 100%;
							margin: 0 4rpx;
						}
					}
				}
			}
		}
	
		.box {
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
		}
	
		.left,
		.right {
			position: absolute;
			left: 0;
			top: 0;
		}
	
		.left {
			animation: fir 20s linear infinite;
			animation-delay: 2s;
		}
	
		.right {
			animation: sec 20s linear infinite;
			animation-delay: 20s;
		}
	
		@keyframes fir {
			0% {
				transform: translateX(0);
			}
	
			100% {
				transform: translateX(-100%);
			}
		}
	
		@keyframes sec {
			0% {
				transform: translateX(100%);
			}
	
			100% {
				transform: translateX(0%);
			}
		}
	
		.left {
			-webkit-animation: fir 20s linear infinite;
			animation: fir 20s linear infinite;
		}
	
		.right {
			-webkit-animation: sec 20s linear infinite;
			animation: sec 20s linear infinite;
		}
	
		.scroll-series {
			width: 100%;
			white-space: nowrap;
			display: flex;
			align-items: center;
	
			.series-block {
				display: inline-block;
				margin: 0 20rpx;
				width: 208rpx;
	
				.image {
					width: 208rpx;
					height: 176rpx;
				}
	
				.cname {
					font-size: 26rpx;
					line-height: 38rpx;
					color: #3e3e3e;
					text-align: center;
					margin-top: 20rpx;
					font-weight: 600;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
	
				.ename {
					font-size: 20rpx;
					color: #b0b0b0;
					line-height: 28rpx;
					text-align: center;
				}
			}
		}
	}
	.product-list-main {
		.product-list {
			width: 100%;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-wrap: wrap;
	
			// column-count:2;
			// column-gap:0;
			.product-block {
				float: left;
				width: 325rpx;
				margin: 20rpx 0;
				background-color: #fff;
				border-radius: 4px;
	
				// break-inside: unset;
				.img {
					width: 100%;
					height: 238rpx;
				}
	
				.text-area {
					padding: 36rpx;
					font-size: 26rpx;
	
					.gname {
						color: #3e3e3e;
						line-height: 38rpx;
						margin-top: 8rpx;
						font-weight: bold;
						text-overflow: ellipsis;
						overflow: hidden;
						white-space: nowrap;
					}
	
					.price-origin {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-top: 20rpx;
	
						.origin {
							color: #3e3e3e;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}
			}
		}
	}
}
</style>
