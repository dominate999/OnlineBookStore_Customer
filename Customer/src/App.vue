<template>
	<div id="app">
		<el-backtop >
		  <div style="{
		    height: 100%;
		    width: 100%;
		    background-color: #f2f5f6;
		    box-shadow: 0 0 6px rgba(0,0,0, .12);
		    text-align: center;
		    line-height: 40px;
		    color: #ff5500;
		    }">↑</div>
		</el-backtop>
		<router-view></router-view>
	</div>
</template>



<script>
	export default {
		name: 'App',
		components: {

		},
	}
</script>

<style>
	*{
		margin: 0px;
	}
</style>
