<template>
	<div>
		<el-card class="box-card">
			<el-page-header @back="goBack" content="退款界面">
			</el-page-header>
			
			<el-table :data="refundData" style="width: 100%" size="medium">
				<el-table-column prop="orderGeneratedId" label="订单ID" width="180" align=center>
				</el-table-column>
				<el-table-column prop="orderState" label="订单状态" align=center>
				</el-table-column>
				<el-table-column prop="orderCreateTime" label="订单创建时间" align=center>
				</el-table-column>
				<el-table-column prop="orderPayTime" label="订单创建时间" align=center>
				</el-table-column>
				<el-table-column prop="orderAmount" label="总价" align=center>
				</el-table-column>
				<el-table-column label="期待金额" prop="refundExpectAmount" width="180" align=center>
				</el-table-column>
				<el-table-column prop="refundReason" label="退款理由" align=center>
				</el-table-column>
				<el-table-column label="操作" align=center>
					<template slot-scope="scope">
						<el-button type="text" @click="to('/customer/evaluate',scope.row)">查看详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				returnData: [],
				refundData: [],
			}
		},

		methods: {
			getreturnData() {
				this.$post("/refund/queryRefundByAccountId", {
					accountId: this.$store.state.accountId,
				}).then(res => {
					this.returnData = res.data;
				}).catch(err => {
					console.log(err);
				})
			},
			getrefundData() {
				this.$post("/refund/queryRefundByAccountId", {
					accountId: this.$store.state.accountId,
				}).then(res => {
					this.refundData = res.data;

				}).catch(err => {
					console.log(err);
				})
			},
			goBack(){
				this.$router.push("/customer/order");
			}
		},
		mounted() {
			this.getreturnData();
			this.getrefundData();
		},

	}
</script>

<style>
</style>
