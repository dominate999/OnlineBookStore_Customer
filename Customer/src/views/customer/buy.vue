<template>
	<div>

		<el-descriptions border title="订单信息" direction="vertical" :column="7" style="margin-top: 10px;padding: 0px;">
			<el-descriptions-item label="订单编号">{{orderData[0].orderGeneratedId}}</el-descriptions-item>
			</el-descriptions-item>
			<el-descriptions-item label="创建时间">{{orderData[0].orderCreateTime}}</el-descriptions-item>
			<el-descriptions-item label="订单状态">{{orderData[0].orderState}}</el-descriptions-item>
			<el-descriptions-item label="订单总价" style="color: red;">¥{{orderData[0].orderAmount}}</el-descriptions-item>
		</el-descriptions>
		<el-table :data="orderData" border style="width: 100%" size="mini">
			<el-table-column prop="orderitemId" label="订单子项ID" width="180" align="center">
			</el-table-column>
			<el-table-column label="封面" width="180" align="center">
				<template slot-scope="scope">
					<el-image style="height: 120px" :src="scope.row.bookPic">
						<div slot="error" class="image-slot">
							<i class="el-icon-picture-outline"></i>
						</div>
					</el-image>
				</template>
			</el-table-column>
			<el-table-column prop="bookName" label="图书名称" align="center">
			</el-table-column>
			<el-table-column prop="bookQuantity" label="数量" align="center">
			</el-table-column>
			<el-table-column prop="orderItemAmount" label="总价" align="center">
			</el-table-column>
		</el-table>
		<el-descriptions border title="顾客信息" direction="vertical" :column="7" style="margin-top: 10px;padding: 0px;">
			<el-descriptions-item label="收货地址">{{userInfo.customerAddress}}</el-descriptions-item>
			</el-descriptions-item>
			<el-descriptions-item label="昵称">{{userInfo.username}}</el-descriptions-item>
			<el-descriptions-item label="收货人">{{userInfo.customerName}}</el-descriptions-item>
			<el-descriptions-item label="性别">{{userInfo.customerSex}}</el-descriptions-item>
			<el-descriptions-item label="联系方式">{{userInfo.telephone}}</el-descriptions-item>

		</el-descriptions>

		<div class="title">
			<h4 style="float: left;width: 100px">配送方式</h4><span class="height_text" style="margin-left: 60px">包邮</span>
		</div>
		<div class="list_box">
			<div class="order_detail">
				<div class="bill_item">
					<div class="bill_title">商品件数:</div>
					<div class="bill_money height_text">×{{countQuantity}}件</div>
				</div>
				<div class="bill_item">
					<div class="bill_title">商品总价:</div>
					<div class="bill_money height_text">¥{{orderData[0].orderAmount * 1.5}}元</div>
				</div>
				<div class="bill_item">
					<div class="bill_title">活动优惠:</div>
					<div class="bill_money height_text">-¥{{orderData[0].orderAmount * 0.5}}元</div>
				</div>
				<div class="bill_item">
					<div class="bill_title">运费:</div>
					<div class="bill_money height_text">0元</div>
				</div>
				<div class="bill_item">
					<div class="bill_title">应付总额:</div>
					<div class="bill_money height_text" style="font-size: 22px">¥{{orderData[0].orderAmount}}元</div>
				</div>
			</div>
		</div>
		<div class="list_box">
			<div class="order_action">
				<div class="action">
					<el-button type="text" @click="toMain">👉下次再下单，继续购物</el-button>
					<button class="plainBtn" style="background-color: #d0082c;color: white"
						@click="submitOrder">立刻下单</button>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>l

<script>
	export default {
		data() {
			return {
				cartIds: [],
				orderData: [],
				userInfo: {},
				bookInfo: {},

			}
		},
		mounted() {
			this.cartIds = this.$route.query.info;
			if (this.$route.query.type === "cart") {
				this.generateOrder();

			} else {
				this.generateOrderFromBookDetail();
			}
			this.getCustomerInfo();


		},
		methods: {
			toMain() {
				this.$router.push("/customer/main");
			},
			generateOrder() {
				this.$post("order/addOrderFromCart", {
					cartIds: this.cartIds,
					userId: this.$store.state.userId,
				}).then(res => {
					this.orderData = res.data;
				}).catch(err => {
					console.log(err);
				});
			},
			generateOrderFromBookDetail() {
				console.log(this.$route.query.info);
				this.$post("order/addOrderByOne",
					this.$route.query.info
				).then(res => {
					this.orderData = res.data;
				}).catch(err => {
					console.log(err);
				});
			},
			getCustomerInfo() {
				this.$post("account/queryCustomerByCustomerId", {
					customerId: this.$store.state.userId,
				}).then(res => {
					this.userInfo = res.data;
				}).catch(err => {
					console.log(err);
				});
			},
			submitOrder() {
				var url = "/BookStoreBackstage_war_exploded/pay/alipay";
				this.axios({
					method: 'post',
					url: url,
					params: {
						//输入一定不要带中文！！！
						outTradeNo: this.orderData[0].orderGeneratedId,
						subject: this.orderData[0].orderCreateTime,
						totalAmount: this.orderData[0].orderAmount,
						body: this.orderData[0].id,
					},
					
				}).then(response => {
					// 添加之前先删除一下，如果单页面，页面不刷新，添加进去的内容会一直保留在页面中，二次调用form表单会出错
					const divForm = document.getElementsByTagName('div')
					if (divForm.length) {
						document.body.removeChild(divForm[0])
					}
					const div = document.createElement('div')
					console.log(response.data);
					div.innerHTML = response.data // data就是接口返回的form 表单字符串
					document.body.appendChild(div)
					document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
					document.forms[0].submit()
				}).catch(err => {
					console.log(err)
				})

				// // 这里实现付款接口
				// // 将订单状态修改，
				// this.$confirm('确认支付? 请确定您的订单信息', '提示', {
				// 	confirmButtonText: '确定',
				// 	cancelButtonText: '取消',
				// 	type: 'warning'
				// }).then(() => {
				// 	this.$post("order/payForOrder", {
				// 		orderId: this.orderData[0].id,
				// 	}).then(res => {
				// 		this.$message({
				// 			message: res.data ? '支付成功！' : "支付失败",
				// 			type: res.data ? 'success' : 'error'
				// 		});
				// 		this.$router.push("/customer/cart");
				// 	}).catch(err => {
				// 		console.log(err);
				// 	});
				// }).catch(() => {
				// 	this.$message({
				// 		type: 'info',
				// 		message: '已取消支付'
				// 	});
				// });
			},
		},
		computed: {
			countQuantity() {
				let values = this.orderData.map(item => Number(item["bookQuantity"]));
				let sum = 0;
				values.forEach(value => {
					sum += value;
				})
				return sum
			}
		},

	}
</script>

<style scoped>
	.content {
		width: 1240px;
		margin: 20px auto;
		background-color: white;
		/*  padding-left: 10px; */
		/*border: 1px solid #B3C0D1;*/
	}

	.title {
		width: 1230px;

		line-height: 30px;
	}

	.list_box {
		width: 1230px;
		/*  padding: 10px; */
	}

	.address_list {
		width: 280px;
		height: 180px;
		border: 1px solid #cacaca;
		display: inline-block;
		margin-right: 18px;
		margin-bottom: 20px;
		/* padding: 20px; */
		vertical-align: top;
	}

	.selected_address {
		border: 1px solid #ff6700;
	}

	.name {
		width: 240px;
		height: 40px;
		font-size: 18px;
	}

	.tel {
		width: 240px;
		height: 30px;
		font-size: 14px;
		color: #757575;
	}

	.detail {
		width: 240px;
		height: 30px;
		font-size: 14px;
		color: #757575;
	}

	.foot {
		width: 240px;
		height: 60px;
		font-size: 14px;
		color: #ff6700;
		line-height: 60px;
	}

	.add {
		width: 80px;
		height: 80px;
		margin-top: 40px;
		margin-left: 75px;
		font-size: 30px;
		color: #757575;
		text-align: center;
	}

	.bookInfo {
		width: 1200px;
		height: 125px;
		padding: 10px;
		border-bottom: 1px solid #B3C0D1;
	}

	.book_item {
		width: 660px;
		height: 105px;
		float: left;
	}

	.bookImg {
		float: left;
		width: 80px;
		height: 105px;
	}

	.book_detail {
		margin: 25px 20px;
		height: 55px;
		line-height: 55px;
		float: left;
		font-size: 14px;
	}

	.book_num {
		width: 360px;
		font-size: 14px;
		float: left;
		height: 105px;
		line-height: 105px;
	}

	.book_money {
		width: 150px;
		font-size: 14px;
		float: left;
		height: 105px;
		line-height: 105px;
	}

	.height_text {
		color: #ff6700;
	}

	.order_detail {
		margin-left: 1088px;
		width: 250px;
		height: 220px;
	}

	.bill_item {
		line-height: 35px;
	}

	.bill_title {
		width: 145px;
		text-align: right;
		float: left;
	}

	.bill_money {
		width: 95px;
		text-align: right;
		float: left;
	}

	.order_action {
		width: 1290px;
		padding-left: 20px;
		padding-right: 20px;
		padding-top: 5px;
		border-top: 1px solid #B3C0D1;
		height: 50px;
	}

	.action {
		width: 400px;
		height: 50px;
		float: right;
		vertical-align: center;
		padding-top: 5px;
	}

	.plainBtn {
		width: 120px;
		height: 35px;
		background-color: white;
		color: #757575;
		border: 1px #cacaca solid;
		float: right;
		margin-left: 10px;
	}

	.plainBtn:hover {
		border: 1px #a2a4ac solid;
		background-color: #e7e7e7;
	}
</style>
