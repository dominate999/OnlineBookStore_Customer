<template>
	<div>
		<h4>全部商品</h4>
		<el-table ref="multipleTable" :data="cartList" :summary-method="getSummaries" show-summary tooltip-effect="dark"
			style="width: 100%" @selection-change="handleSelectionChange">
			<el-table-column type="selection" width="80" align="center">
			</el-table-column>
			<el-table-column width="110" align="center">
				<template slot-scope="scope">
					<el-image style="height: 120px" :src="scope.row.bookPic">
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</template>
			</el-table-column>
			<el-table-column prop="bookName" label="书名" align="center">
			</el-table-column>
			<el-table-column label="大类/小类" align="center">
				<template slot-scope="scope">
					{{ scope.row.categoryName}}/{{ scope.row.subcategoryName }}
				</template>
			</el-table-column>
			<el-table-column label="原价/售价" width="160" align="center">
				<template slot-scope="scope">
					原价：<s>{{ scope.row.bookPrice * 1.5 }}元</s><br>
					<div style="color: orangered;">售价：{{ scope.row.bookPrice }}元</div>
				</template>
			</el-table-column>
			<el-table-column prop="author" width="230" label="数量" align="center">
				<template slot-scope="scope">
					<el-input-number v-model="scope.row.cartQuantity" @change="modifyCart(scope.$index,scope.row)"
						:min="1" :max="scope.row.bookStock" label="描述文字"></el-input-number>
				</template>
			</el-table-column>
			<el-table-column label="小计" width="130" align="center">
				<template slot-scope="scope">
					<p style="color: red">{{scope.row.bookPrice * scope.row.cartQuantity}}元</p>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="130" align="center">
				<template slot-scope="scope">
					<i class="el-icon-delete" style="font-size: 25px;"
						@click="handleDelete(scope.$index,scope.row)"></i>
				</template>
			</el-table-column>
		</el-table>
		<div class="buyBox">
			<div style="float: left;">
				<el-button type="text" @click="deleteSelect">移除选中商品</el-button>
			</div>
			<div style="float: right;">
				<el-button class="buyBtn" type="primary" @click="goBuy">
					购买
				</el-button>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: "ShopCart",

		data() {
			return {
				cartList: [],
				multipleSelection: [],
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			getSummaries(param) {
				const {
					columns,
					data
				} = param;
				const sums = [];
				columns.forEach((column, index) => {
					if (index === 0) {
						sums[index] = '合计';
						return;
					}

					if (index === 5) {
						let values = data.map(item => Number(item["cartQuantity"]));
						let sum = 0;
						values.forEach(function(value) {
							sum += value;
						});
						sums[index] = "商品数: " + sum + " 件"
						return;
					}

					if (index === 6) {
						let sum = 0;
						data.forEach(value => {
							sum += value["cartQuantity"] * value["bookPrice"];
						})
						sums[index] = "总价: " + sum + " 元"
						return;
					}
				});

				return sums;
			},
			//获取个人购物车数据
			getData() {
				this.$post("/cart/queryCartByCustomerId", {
					customerId: this.$store.state.userId,
				}).then(res => {
					console.log(res);
					this.cartList = res.data;
				}).catch(err => {
					console.log(err);
				});
			},
			//修改某一个产品的个数
			modifyCart(index, row) {
				this.$post("/cart/updateQuantity", {
					cartQuantity: row.cartQuantity,
					cartId: row.id,
				}).then(res => {
					this.$message({
						message: res.data ? "成功" : "失败",
						type: res.data ? "success" : "warning"
					})

				}).catch(err => {
					this.$message({
						message: "修改失败",
						type: "warning"
					})
				})
			},
			//实现删除一个数据的功能：
			handleDelete(index, row) {
				console.log(row.id);
				this.$confirm('是否要进行删除操作?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$post("/cart/deleteOneByCartId", {
						cartId: row.id
					}).then(res => {

						//删除后重新获取数据
						this.getData();
					})
				}).catch(err => {
					this.$message({
						message: "删除失败",
						type: "warning"
					})
				})
			},
			//处理选项框的操作，获取表格中哪些选项被选中
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			},
			//实现删除所有数据的功能：

			deleteSelect() {
				if (this.multipleSelection.length > 0) {

					let arr = [];
					for (let i = 0; i < this.multipleSelection.length; i++) {
						arr.push(this.multipleSelection[i].id);
					}
					let ids = JSON.stringify(arr);

					this.$confirm('是否要进行删除操作?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.$post("/cart/deleteSelect", {
							cartIds: ids
						}).then(res => {
							//删除后重新获取数据
							this.getData();

						})
					}).catch(err => {
						this.$message({
							message: "删除失败",
							type: "warning"
						})
					})
				} else {
					this.$message({
						message: "请至少选择一件商品进行",
						type: "warning"
					})
				}

			},
			goBuy() {
				if (this.multipleSelection.length > 0) {
					let arr = [];
					for (let i = 0; i < this.multipleSelection.length; i++) {
						arr.push(this.multipleSelection[i].id);
					}
					let ids = JSON.stringify(arr);
					console.log(ids);
					this.$router.push({
						path: "/customer/buy",
						query: {
							info: ids,
							type :"cart"
						}
					})
				} else {
					this.$message({
						message: "请至少选择一件商品进行购买",
						type: "warning"
					})
				}
			},

		},
		computed: {

		},
	};
</script>

<style scoped>
	el-input-number {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.table_content {
		width: 1240px;
		margin: 0px auto;
	}

	.buyBox {
		width: 100%;
		/* width: 1328px; */
		background-color: white;
		height: 52px;
		line-height: 52px;
	}

	.buyBtn {
		margin-top: 10px;
		width: 200px;
		height: 50px;
		background-color: #c22b38;
		border: none;

	}
</style>
