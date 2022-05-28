<template>
	<div>
		<el-row>
			<el-form :inline="true" class="demo-form-inline" style="display: flex; justify-content: center;">
				<el-form-item label="搜索">
					<el-autocomplete class="inline-input" v-model="search" :fetch-suggestions="querySearch"
						placeholder="查询您需要的图书...例如名称关键词,出版商..." :trigger-on-focus="false" clearable
						style="width: 25rem;" @select="handleSelect"></el-autocomplete>

				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSearch"><i class="el-icon-search"></i>查询</el-button>
				</el-form-item>
			</el-form>
		</el-row>
		<el-row>
			<div class="block">
				<el-carousel :interval="4000" type="card" height="400px">
					<el-carousel-item v-for="item in 6" :key="item">
						<h3 class="small">{{ item }}</h3>
					</el-carousel-item>
				</el-carousel>
			</div>
		</el-row>

		<el-row :gutter="20">
			<el-col :span="4" v-for="(o, index) in 12" :key="o">
				<el-card :body-style="{ padding: '0px' ,margin:'10px'}" shadow="hover">
					<img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
						class="image">
					<div >
						<h1>图书名称</h1>
						<div class="bottom clearfix">
							<h3 style="color: red;">￥100.0</h3>
							<!-- <el-button type="success" class="button"><i class = "el-icon-shopping-cart-1"></i>加入购物车</el-button> -->
							<!-- <el-button type="primary" class="button"><i class = "el-icon-shopping-cart-1"></i>购买</el-button> -->
						</div>
					</div>
			 </el-card>
			</el-col>
		</el-row>

	</div>


</template>

<script>
	export default {
		data() {
			return {
				restaurants: [],
				search: '',

			}
		},
		methods: {
			onSearch() {
				console.log(this.search);
				//实现业务，跳转到对应页面
				//查询
			},
			querySearch(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据
				cb(results);
			},
			createFilter(queryString) {
				return (restaurant) => {
					return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
				};
			},
			loadAll() {
				return [{
						"value": "三全鲜食（北新泾店）",
						"address": "长宁区新渔路144号"
					},
					{
						"value": "开心丽果（缤谷店）",
						"address": "上海市长宁区威宁路天山路341号"
					},
					{
						"value": "南拳妈妈龙虾盖浇饭",
						"address": "普陀区金沙江路1699号鑫乐惠美食广场A13"
					}
				];
			},
			handleSelect(item) {
				console.log(item);
			}
		},
		mounted() {
			this.restaurants = this.loadAll();
		}
	}
</script>

<style scoped>
	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.el-col {
		border-radius: 4px;
		margin-top: 20px;
	}
</style>
