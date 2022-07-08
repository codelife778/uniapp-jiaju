<template>
	<view>
		<view class="content">
			<view class="row">
				<view class="nominal">收件人</view>
				<view class="input">
					<input placeholder="请输入收件人姓名" type="text" v-model="name" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">电话号码</view>
				<view class="input">
					<input placeholder="请输入收件人电话号码" type="text" v-model="tel" />
				</view>
			</view>
			<view class="row">
				<view class="nominal">所在地区</view>
				<view class="input" @tap="chooseCity">{{region.label}}</view>
			</view>
			<view class="row">
				<view class="nominal">详细地址</view>
				<view class="input">
					<textarea v-model="detailed" auto-height="true" placeholder="输入详细地址"></textarea>
				</view>
			</view>
			<view class="row">
				<view class="nominal">设置默认地址</view>
				<view class="input switch">
					<switch color="#354E44" :checked="isDefault" @change="isDefaultChange" />
				</view>
			</view>
			<view class="row last" v-if="editType" @tap="deleteAddress">
				<view class="del">删除收货地址</view>
			</view>
		</view>
		<view class="save" @tap="saveAddress">
			<view class="btn">保存地址</view>
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"
			themeColor="#007AFF"></simple-address>

	</view>
</template>

<script>
	import simpleAddress from '@/components/simple-address/simple-address.vue';
	
	import {
		addAddress,
		allAddress,
		switchDefault,
		updateAddressInfo,
		deleteAddress
	} from '@/api/address/address.js'
	export default {
		//全局搜索,
		components: {
			simpleAddress
		},
		data() {
			return {
				cityPickerValueDefault: [0, 0, 1],
				editType: false,
				id: "",
				name: "",
				tel: "",
				detailed: "",
				isDefault: false,
				cityPickerValue: [0, 0, 0],
				addressid: "",
				themeColor: "#007AFF",
				region: {
					label: "请点击选择地址",
					value: [],
					cityCode: ""
				},
				address: {},
				addressInfo: {},
				currentError: ""
			}
		},
		methods: {
			async saveAddress() {
				let obj = {
					"province": this.region.value[0],
					"city": this.region.value[1],
					"region": this.region.value[2],
					"cityCode": this.region.cityCode,
					"defaultStatus": this.isDefault ? 1 : 0,
					"detailAddress": this.detailed,
					"name": this.name,
					"phoneNumber": this.tel,
					"postCode": "",
					"tag": ""
				}
				if (this.editType) {
					obj.memberId = this.addressInfo.memberId;
					obj.id = this.addressInfo.id
					console.log("obj", obj);
					let result = await updateAddressInfo(obj)
					console.log("await updateAddressInfo(obj)", result);
					if (result.data.success == true) {
						uni.showToast({
							title: "更新成功"
						});
						setTimeout(() => {
							uni.navigateTo({
								url: "../address/address"
							})
						}, 1000)
					}
				} else {
					let result = (await addAddress(obj)).data
					console.log("await addAddress(obj)", result);
					if (result.success) {
						uni.showToast({
							title: "添加成功"
						})
						setTimeout(() => {
							uni.navigateTo({
								url: "../address/address"
							})
						}, 1000)
					}
				}

			},
			// 根据id获取地址明细
			getAddressById(id) {
				allAddress()
					.then(res => {
						var info = res.data.data.items.find(ele => ele.id == id);
						// var index = this.$refs.simpleAddress.queryIndex(info.cityCode.split("-"), 'value');
						// this.cityPickerValueDefault = index.index;
						this.addressInfo = info;
						this.name = info.name;
						this.tel = info.phoneNumber;
						this.detailed = info.detailAddress;
						this.isDefault = info.defaultStatus ? true : false;
					})
			},
			chooseCity() {
				console.log("chooseCity()");
				console.log("this.$refs.simpleAddress",this.$refs.simpleAddress);
				this.$refs.simpleAddress.open();
			},
			onConfirm(e) {
				console.log("onConfirm(e)", e);
				this.region.cityCode = `${e.provinceCode}-${e.cityCode}-${e.areaCode}`;
				this.region.label = e.labelArr.join("-");
				this.region.value = e.labelArr;
			},
			async deleteAddress() {
				uni.showModal({
					title: "删除提示",
					content: "你将删除这个收货地址",
					success: res => {
						console.log("res", res);
						if (res.confirm == true) {
							// let result = (await deleteAddress(this.addressid)).data
							// console.log("await deleteAddress(this.addressid)",result);
							deleteAddress(this.addressid).then(res => {
								console.log("deleteAddress(this.addressid)", res);
								// uni.navigateTo({
								// 	url:"../address/address"
								// })
								uni.showToast({
									title: "删除成功"
								});
								setTimeout(() => {
									uni.navigateTo({
										url: "../address/address"
									})
								}, 1000)


							})
						}
					}
				})

			},
			isDefaultChange(e) {
				console.log("看看这是啥东西", e);
				this.isDefault = e.detail.value;
				if (this.editType) {
					switchDefault(this.addressid, e.detail.value == true ? 1 : 0)
						.then(res => {
							if (res.success == true) {
								uni.showToast({
									title: "切换默认成功",
								})
							}
						})
				}

			},
		},
		onLoad(e) {
			console.log("onLoad(e)", e);
			// 如果有addressId 说明是编辑 
			if (e.addressId) {
				this.editType = true;
				this.addressid = e.addressId;
				this.getAddressById(e.addressId);
				console.log("有id");
			} else {
				//false是增加地址
				this.editType = false
				console.log("无id");
			}

			// 表单验证插件
			// https://www.cnblogs.com/zhangxiaoyong/p/10166951.html
			// this.initValidate();
		}
	}
</script>


<style lang="scss" scoped>
	.red {
		color: red !important;
	}

	.save {
		view {
			display: flex;
		}

		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.btn {
			box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
			width: 70%;
			height: 80upx;
			border-radius: 80upx;
			background-color: #354E44;
			color: #fff;
			justify-content: center;
			align-items: center;

			.icon {
				height: 80upx;
				color: #fff;
				font-size: 30upx;
				justify-content: center;
				align-items: center;
			}

			font-size: 30upx;
		}
	}

	.content {
		display: flex;
		flex-wrap: wrap;

		view {
			display: flex;
		}

		.row {
			width: 94%;

			margin: 0 3%;
			border-bottom: 1Px solid #ccc;

			.nominal {
				width: 30%;
				height: 120upx;
				font-weight: 200;
				font-size: 30upx;
				align-items: center;
			}

			.input {
				width: 70%;
				padding: 20upx 0;
				align-items: center;
				font-size: 30upx;

				&.switch {
					justify-content: flex-end;
				}

				.textarea {
					margin: 20upx 0;
					min-height: 120upx;
				}
			}

			.del {
				width: 100%;
				height: 100upx;
				justify-content: center;
				margin-top: 60rpx;
				align-items: center;
				font-size: 36upx;
				color: #fff;
				background-color: #E64340;
				border-bottom: solid 1upx #eee;
			}
		}

		.last {
			border-bottom: 0;
		}
	}
</style>

</style>
