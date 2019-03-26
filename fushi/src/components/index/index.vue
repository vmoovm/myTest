<template>
	<div class="index">
		<div class="menu">
			<ul>
				<li><router-link to="/index/list">列表一</router-link></li>
				<li><router-link to="/index/list2">列表二</router-link></li>
				<li><router-link to="/index/list3">列表三</router-link></li>
			</ul>
		</div>
		<div class="">{{movieName}}</div>
		<div class="list">
			<router-view></router-view>
		</div>
		<div class="post">
			<div class="loading" v-if="loading">
				{{post}}
			</div>
		
			<div v-if="error" class="error">
				{{ error }}
			</div>
		
			<div v-if="post" class="content">
				<h2>{{ post.message }}</h2>
				<p>{{ post.body }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data () {
	    return {
	      loading: false,
	      post: 'Loading...',
	      error: null,
	      movieName: ''
	    }
	},
	created () {
		this.fetchData()
	},
	methods: {
		fetchData () {
			this.error = this.post = null
			this.loading = true
			this.$axios({
			    url: '/join/listW3cplus?kd=%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91',
			    headers: {'X-Requested-with': 'XMLHttpRequest'},
			    method: 'get'
			}).then(res => {
			    this.movieName = res
			}).catch(err => {
				this.error = err.toString()
			})
			this.$axios({
			    url: '/ppt/beginsAPI/isupCrouse?tpid=&chartId=18250984390658',
			    headers: {'X-Requested-with': 'XMLHttpRequest'},
			    method: 'get'
			}).then(res => {
			    this.post = res
			}).catch(err => {
				this.error = err.toString()
			})
		}
	}
}
</script>

<style>
	.index { display: flex;}
	.menu { flex: 0 0 6rem; width: 6rem;}
	.list { flex: 1;}
	.post { background: #007AFF;}
</style>