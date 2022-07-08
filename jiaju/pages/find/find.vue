<template>
<view class="find-main">
		<view class="head-nav" style="background-color:#354E44;" >
			<radio-group class="radio-group" @change="switchPage">

				<label class="nav-item" :class="{active: scene=='0'}">
					<radio value="0" :checked="scene=='0'" /><text class="text">精选文章</text>
				</label>
				<label class="nav-item" :class="{active: scene=='1'}">
					<radio value="1" :checked="scene=='1'" /><text class="text">品牌列表</text>
				</label>
			</radio-group>
		</view>

		<!-- //分类块 -->
		<view v-show="scene == 0" class="article-section">
			<view class="article-section">

				<view class="article-list">
					<view class="article-block" v-for="item in articleList" :key="item.id">
						<navigator :url="'articlDetail/articlDetail?articleId='+item.id">
							<image class="cover-img" :src="item.coverImg" mode=""></image>
							<text class="ctitle">{{item.title}}</text>
							<text class="etitle">{{item.author}}</text>
						</navigator>

						<view class="btns-bar">
							<view class="view-block">
								<image class="icon" src="../../static/icons/view.png" mode=""></image>
								<text class="count-text">{{item.viewCount}}</text>
							</view>
							<view class="zan-share">
								<!-- <image class="icon" src="../../static/icons/zan.png" mode="" @tap="doZan"></image> -->
								
								<!-- #ifndef H5 -->
									<button open-type="share" class="icon btn-share" :data-id="item.id"> </button>
								<!-- #endif -->
								<view class="collect" @tap="collectButton(item.id)">
									<image class="icon" v-if="!item.isCollected" src="../../static/icons/collect1.png"></image>
									<image class="icon" v-else src="../../static/icons/collect1-active.png"></image>
								</view>
							</view>
							
						</view>
					</view>
					<view style="width: 100%;height: 120rpx;"></view>
				</view>
			</view>
		</view>

		<!-- 系列列表 -->
		<view v-show="scene == 1" class="series-section" >
			<view class="ul">
				<view v-for="item in brandList" class="per" :key="item.id">
					<image :src="item.bigPic" mode=""></image>
					<view class="box">
							<h2 class="title">{{ item.name }}</h2>
							<p class="descr">{{ item.brandStory }}</p>
					</view>
					
				</view>
				<view style="width: 100%;height: 120rpx;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		articleList,
		brandList,
	} from '../../api/find/request.js'
	export default {
		data() {
			return {
				articleList:[],
				brandList:[],
				current:0,
				scene:'',
			}
		},
		methods: {
			collectButton(){
				uni.showToast({
					title:'点击了收藏,但是似乎没有效果...',
					duration:2000
				})
			},
			switchPage(val){
				// console.log("康康这是啥",val);
				this.scene = val.detail.value
			},
			async init(){
				this.articleList = (await articleList(1,10)).data.data.rows
				console.log("this.articleList",this.articleList);
				this.brandList = (await brandList(1,10)).data.data.rows
				
			}
		},
		onLoad(){
			this.init()
		}
	}
</script>

<style scoped lang="scss">
uni-page-body {
		height: 100%;
	}

	.find-main {
		height: 100%;

		.head-nav {
			width: 100%;
			height: 88rpx;
			background-color: transparent;
			color: #fff;
			font-size: 32rpx;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;

			.radio-group {
				display: flex;
				justify-content: center;
				align-items: center;

				.nav-item {
					radio {
						display: none;
					}

					.text {
						line-height: 88rpx;
						box-sizing: border-box;
						padding: 10rpx 0;
						margin: 0 10rpx;
					}

					&.active .text {
						border-bottom: 1px solid #fff;
					}
				}


			}

		}

		.kind-nav {
			display: flex;
			width: 100%;
			height: 84rpx;
			margin-top: 140rpx;
			justify-content: space-around;
			align-items: center;
			box-sizing: border-box;
			padding: 0 80rpx;

			.kind-item {
				width: 84rpx;
				height: 84rpx;
				background-color: #fff;
				border-radius: 50%;
				text-align: center;
				transition: all ease .4s;

				radio {
					display: none;
				}

				.icon {
					width: 50rpx;
					height: 50rpx;
					margin: 17rpx auto;


				}

				&.active {
					width: 98rpx;
					height: 98rpx;
					background-color: $base-bg;

					.icon {
						margin-top: 24rpx;
					}
				}
			}
		}

		.article-list {
			margin-top: 100rpx;

			.article-block {
				position: relative;
				width: 674rpx;
				height: 482rpx;
				border-radius: 24rpx;
				background-color: #fff;
				margin: 28rpx auto;
				overflow: hidden;

				.cover-img {
					display: block;
					width: 674rpx;
					height: 382rpx;
					background-color: #8F8F94;
				}

				.ctitle {
					position: absolute;
					left: 20rpx;
					top: 244rpx;
					color: #fff;
					font-size: 48rpx;
					line-height: 68rpx;
				}

				.etitle {
					position: absolute;
					left: 20rpx;
					top: 316rpx;
					color: #fff;
					font-size: 30rpx;
					line-height: 42rpx;
				}

				.btns-bar {
					width: 100%;
					height: 100rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					box-sizing: border-box;
					padding: 0 60rpx;

					.icon {
						width: 40rpx;
						height: 40rpx;

					}

					.view-block {
						height: 100%;
						display: flex;
						align-items: center;

						.icon {
							margin-right: 30rpx;
						}

						.count-text {
							color: #3E3E3E;
							font-size: 26rpx;
						}
					}

					.zan-share {
						height: 100%;
						display: flex;
						align-items: center;

						.icon {
							margin-left: 30rpx;
							display: block;
						}

						.icon.btn-share {
							width: 40rpx;
							height: 40rpx;
							outline: none;
							background: url(../../static/icons/share.png) no-repeat center;
							background-size: contain;

							&::after {
								border: none;
							}
						}

					}
				}

			}
		}

		.series-section {
			width: 100%;
			height: 100%;
			margin-top: 100rpx;
			.ul{
				view{
					margin: 30rpx;
					// height: 612rpx;
					background: #fff;
					// padding-bottom: 10px;
					border-radius: 8rpx;
					overflow: hidden;
					image{
						width: 100%;
						// height: 612rpx;
					}
					// .box{
					// 	padding: 60rpx;
						
					// }
					.title{
						font-size: 32rpx;
						line-height: 45rpx;
						// margin-top: 30rpx;
						color: #3E3E3E;
						// margin-left: 56rpx;
					}
					.descr{
						font-size: 22rpx;
						color: #B1B1B1;
						line-height: 30rpx;
						// margin-top: 20rpx;
						white-space: nowrap;
						overflow: hidden;
						// margin-left: 56rpx;
					}
					.share{
						position: absolute;
						right: 30rpx;
						bottom: 30rpx;
						color: blue;
					}
				}
			}
			.swiper {
				width: 100%;
				height: 100%;

				.swiper-item {
					position: relative;
					width: 100%;
					height: 100%;

					.ename {
						font-size: 26rpx;
						margin: 120rpx 50rpx;
						color: #fff;
					}

					.cname {
						font-size: 72rpx;
						color: #fff;
						margin: 20rpx 50rpx;
					}

					.swiper-inner {
						position: absolute;
						left: 0px;
						bottom: 100rpx;
						height: 264rpx;
						width: 100%;

						.swiper-inner-item {
							.item-card {
								width: 496rpx;
								height: 264rpx;
								background-color: #fff;
								border-radius: 20rpx;
								margin: 0 auto;

								.swiper-item {
									display: flex;
									justify-content: space-between;
									align-items: center;
									box-sizing: border-box;
									padding: 20rpx;

									.image {
										width: 120rpx;
										height: 120rpx;
										flex-shrink: 0;
									}

									.info {
										margin-left: 20rpx;
										text-align: left;
										width: 200rpx;
										height: 100%;

										.gname {
											font-size: 20rpx;
											font-weight: 600;
										}

										.descr {
											font-size: 20rpx;
											color: #8F8F94;
										}
									}
								}

							}

						}
					}
				}
			}

		}
	}
</style>
