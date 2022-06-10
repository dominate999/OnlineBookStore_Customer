<template>
	<div>
		<el-form :inline="true" class="demo-form-inline" style="display: flex; justify-content: center;">
			<el-form-item label="搜索">
				<el-autocomplete class="inline-input" v-model="search" :fetch-suggestions="querySearch"
					placeholder="查询您需要的图书...例如名称关键词,出版商..." :trigger-on-focus="false" clearable style="width: 25rem;"
					@select="handleSelect"></el-autocomplete>
			</el-form-item>
			<el-form-item>
				<el-button type="danger" @click="onSearch"><i class="el-icon-search"></i>查询</el-button>
			</el-form-item>
		</el-form>
		<el-divider></el-divider>
	</div>


</template>

<script>
	export default {
		props: ["bookData"],
		data() {
			return {
				suggests: [],
				search: '',
			}
		},
		methods: {
			onSearch() {
				console.log(this.search);
				this.$router.push({
					path: "/customer/shop",
					query: {
						search: this.search,
					}
				});
			},
			querySearch(queryString, cb) {
				var suggests = this.suggests;
				var results =  queryString ? suggests.filter(this.createFilter(queryString)) :suggests;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return (suggest) => {
					console.log(queryString);
					console.log(suggest.value);
					return (suggest.value.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
				};
			},
			loadAll() {
				this.$post("book/queryAllBook",{
				}).then(res=>{
					for(let i=0;i<res.data.length;i++){
					   this.suggests.push({'value':res.data[i].bookName})
					}
					console.log(this.suggests);
				}).catch(err=>{
					console.log(err);
				})
			},
			handleSelect(item) {
				console.log(item);
			}
		},
		mounted() {
			this.search = this.$route.query.search;
			this.loadAll();
		},created() {
			
		}
	}
</script>

<style>
</style>
