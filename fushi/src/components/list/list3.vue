<template>
	<div class="item">
		<ul class="row">
			<li class="row_pic"><img src="../../assets/logo.png" width="100%"/></li>
			<li class="row_field">图片3</li>
		</ul>
	</div>
</template>

<script>
</script>

<style>
	.row { display: flex; border-bottom: 1px #dedede solid;}
	.row_pic { flex: 0 0 5rem;
		img { width: 100%; border-radius: 50%;}
	}
	.row_field { flex: 1;}
</style>