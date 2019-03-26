<template>
	<div class="header">
		<dl class="header_wraper">
			<dt class="header_logo"><img src="../../assets/logo.png" height="40"/></dt>
			<dd class="header_nav">
				<div class="swiper-container" id="nav">
				    <div class="swiper-wrapper">
				        <div class="swiper-slide"><router-link to="/index">首页</router-link></div>
				        <div class="swiper-slide"><router-link to="/slide">slide</router-link></div>
				        <div class="swiper-slide"><router-link to="/end">end</router-link></div>
				    </div>
				</div>
			</dd>
		</dl>
		<router-view></router-view>
	</div>
</template>

<script>
	import Swiper from '../../../static/js/swiper.min.js'
	export default {
		mounted () {
			this.lunbo()
		},
		methods: {
			lunbo () {
				/* eslint-disable no-new */
				new Swiper('#nav', {
					slidesPerView: 2.1
				})
			}
		}
	}
</script>

<style lang="less">
	@import '../../../static/css/swiper.min.css';
	.header { padding: 1.2rem;}
	.header_wraper { display: flex;}
	.header_logo { flex: 0 0 5rem; width: 5rem;}
	.header_nav { flex: 1;}
	.header_nav { height: ;}
	#nav .swiper-slide { height: 40px; border:1px #ccc solid; color: #fff; line-height: 40px;}
</style>