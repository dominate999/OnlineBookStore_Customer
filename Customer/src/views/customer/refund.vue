<template>
	<div>
		<el-page-header @back="goBack" content="退款界面">
		</el-page-header>

		<el-divider></el-divider>
		<el-card class="box-card" style="margin-top: 10px;">
			<el-descriptions border direction="vertical" :column="7" style="margin-top: 10px;padding: 0px;">
				<el-descriptions-item label="订单编号">{{orderinfo.order.orderGeneratedId}}
				</el-descriptions-item>
				</el-descriptions-item>
				<el-descriptions-item label="收货人">{{orderinfo.customerVO.customerName}}
				</el-descriptions-item>
				<el-descriptions-item label="订单总价">¥{{orderinfo.order.orderAmount}}</el-descriptions-item>
				<el-descriptions-item label="创建时间">{{orderinfo.order.orderCreateTime}}
				</el-descriptions-item>
				<el-descriptions-item label="支付时间">
					<div>{{orderinfo.order.orderPayTime}}</div>
				</el-descriptions-item>
				<el-descriptions-item label="订单状态">{{orderinfo.order.orderState}}</el-descriptions-item>
			</el-descriptions>
			<template>
				<el-table :data="orderinfo.orderitems" style="width: 100%" size="mini">
					<el-table-column prop="id" label="订单子项ID" width="180" align=center>
					</el-table-column>
					<el-table-column label="图书封面" width="180" align=center>
						<template slot-scope="scope">
							<el-image :src="scope.row.bookPic" style="width: 100px; height: 100px" fit="fill">
							</el-image>
						</template>
					</el-table-column>
					<el-table-column prop="bookName" label="图书名称" align=center>
					</el-table-column>
					<el-table-column prop="bookQuantity" label="数量" align=center>
					</el-table-column>
					<el-table-column prop="orderItemAmount" label="总价" align=center>
					</el-table-column>
				</el-table>
			</template>

		</el-card>
		<el-divider></el-divider>
		<el-card class="box-card">

			<div slot="header" class="clearfix">
				<span>退款理由</span>

			</div>
			<el-form class="demo-form-inline">
				<el-form-item>
					<el-input placeholder="请输入期待退还金额" v-model="input" type="number" min=0 style="width: 200px;">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-input type="textarea" :rows="5" placeholder="请输入内容,您的反馈是对我们的最好的鞭策!" v-model="textarea">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="float: right; padding: 10px" type="danger" @click="doit">立即退款！</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderinfo: {},
				input: '',
				textarea: ''
			}
		},
		methods: {
			goBack() {
				console.log('go back');
				this.$router.push("/customer/order");
			},
			doit() {
				console.log(this.textarea);
				this.$confirm('确认要进行吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$post("refund/addRefund", {
						expressAmount: this.input,
						content: this.textarea,
						orderId: this.orderinfo.order.id,
					}).then(res => {
						this.$message({
							message: res.data?"反馈成功":'反馈失败',
							type: res.data?"success":"warning"
						})
						this.$router.push("/customer/order");
					}).catch(err => {

					});

				}).catch(err => {
					console.log(err);
					this.$message({
						message: "已取消",
						type: "warning"
					})
				})
			}

		},
		mounted() {
			this.orderinfo = this.$route.query.info;
			console.log(this.orderinfo);
		}
	}
</script>

<style>
</style>
