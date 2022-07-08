<template>
	<view class="article-main">
		<h2>{{article.title}}</h2>
		<p style="text-align: right;color:#333333">作者:{{article.author}}</p>
		<p style="text-align: right;color:#333333">时间: {{article.createTime}}</p>
		<p class="summary">概要描述: {{article.summary}}</p>
		<image style="width:100%;margin: 30rpx auto;" :src="article.coverImg" mode=""></image>
		<!-- <rich-text :nodes="article.content2"></rich-text> -->
		<mp-html :content="article.content2" ref="article"></mp-html>
	</view>
</template>

<script>
	import {
		searchDetailByid
	} from '@/api/find/request.js'
	export default {
		data() {
			return {
				id:'',
				article:{},
			}
		},
		methods: {
			async init(id){
				let result = (await searchDetailByid(id)).data.data.productArticle
				console.log("康康这是啥",result);
				this.article = result
			}
		},
		onLoad(e){
			this.id = e.articleId
			this.init(this.id)
		}
	}
</script>

<style>

</style>
