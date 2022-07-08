<template>
	<view class="product-main">


		<view class="tab head-bar">
			<view class="per" v-for="(item,index) in headItems" :class="{'active':index==current}"
				@tap="headChange(index,item)" :key="index">
				{{item.name}}
				<view class="icons" v-if="index == 1 || index == 2">
					<uni-icons :color="item.isDesc === 1 ? '#DD524D' : '#fff'" class="icon-child" type="arrowup"
						size="12"></uni-icons>
					<uni-icons :color="item.isDesc === 0 ? '#DD524D' : '#fff'" class="icon-child" type="arrowdown"
						size="12"></uni-icons>
				</view>
			</view>
		</view>


		<view class="product-list">
			<navigator class="product-block" :url="'../goodsdetail/goodsdetail?productId='+item.id" :key="item.id"
				v-for="(item,index) in showProductList">
				<image class="img" :src="item.pic" mode="scaleToFill"></image>
				<view class="text-area">
					<view class="gname">
						{{item.name}}
					</view>
					<view class="price-origin">
						<text class="price">¥{{item.price}}</text>
						<text class="origin">{{item.origin_city||'不凡'}}</text>
					</view>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		findProductList
	} from '@/api/channel/channel.js'
	export default {
		data() {
			return {
				id: '',
				showProductList: [],
				headItems: [{
						name: '新品',
						value: '',
						isDesc: ""
					},
					{
						name: '销量',
						value: 'sale',
						isDesc: ""
					},
					{
						name: '价格',
						value: 'price',
						isDesc: ""
					},
					{
						name: '筛选',
						value: '',
						isDesc: ""
					}
				],
				current: 0,
				// page: {
				// 	start: 1,
				// 	limit: 6,
				// 	lastPage: false
				// },
				// total:0

			}
		},
		computed:{
			sortBy(){
				if(this.current == 0){
					return ""
				}else if( this.current == 1){
					return "sale"
				}else if(this.current == 2){
					return "price"
				}else{
					return ""
				}
			}
		},
		methods: {
			headChange(index, val) {
				this.current = index;
				this.clear(index);
				if (val.isDesc == "") {
					val.isDesc = 1
				} else if (val.isDesc == 1) {
					val.isDesc = 0
				} else {
					val.isDesc = 1
				}

				this.init();
			},
			clear(val) {
				this.showProductList = [];
				this.headItems.forEach((ele,index)=>{
					if(index == val){
					}else{
						ele.isDesc = null
					}
				})
			
			},
			async init(id) {
				let result = (await findProductList(1, 10, {
					categoryId: this.id,
					sortBy: this.headItems[this.current].value,
					isDesc: this.headItems[this.current].isDesc
				}))
				// console.log("result", result.data.data.rows);
				this.showProductList = result.data.data.rows

			}
		},
		onLoad(e) {
			this.id = e.kindId
			this.init(this.id)
		}
	}
</script>

<style lang="scss" scoped>
	.product-main {
		.head-bar {
			position: fixed;
			left: 0;
			top: 0;
			/* #ifdef H5 */
			top: 84rpx;
			/* #endif */

			display: flex;
			justify-content: space-around;
			width: 100%;
			height: 62rpx;
			padding-top: 14rpx;
			background-color: #354E44;
			color: #fff;
			font-size: 30rpx;
			line-height: 62rpx;
			z-index: 999;

			.label {
				radio {
					display: none;
				}


			}

			.per {
				display: flex;
				align-items: center;
				border-bottom: 2px solid transparent;

				.icons {
					display: flex;
					align-items: center;
					justify-content: center;
					flex-direction: column;
					margin-left: 6rpx;
					color: #fff;

					.icon-child {
						display: flex;
						align-items: center;
						height: 16rpx;
						overflow: hidden;

						/deep/ span {
							height: 100%;
							font-weight: bold;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
			}

			.active {
				// border-bottom: 2px solid #DD524D;
				color: #DD524D;
			}
		}

		.product-list {
			width: 100%;
			margin-top: 120rpx;
			overflow: hidden;

			.product-block {
				float: left;
				width: 316rpx;
				margin-left: 40rpx;
				margin-bottom: 40rpx;
				background-color: #fff;
				border-radius: 4px;

				.img {
					width: 100%;
					height: 238rpx;
				}

				.text-area {
					padding: 36rpx;
					font-size: 26rpx;

					.gname {
						color: #3E3E3E;
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
							color: #3E3E3E;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
					}
				}

			}
		}

	}
</style>
