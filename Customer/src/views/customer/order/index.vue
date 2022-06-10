<template>
	<div>
		<el-tabs type="border-card">
			<el-tab-pane>
				<span slot="label"><i class="el-icon-date"></i>所有订单</span>
				<div v-for="orderinfo in orderData">
					<orderinfo :orderinfo="orderinfo"></orderinfo>
				</div>
			</el-tab-pane>
			<el-tab-pane label="待付款">
				<div v-for="orderinfo in orderData">
					<orderinfo :orderinfo="orderinfo" v-if = "orderinfo.order.orderState == '待付款'"></orderinfo>
				</div>
			</el-tab-pane>
			<el-tab-pane label="待收/发货">
				<div v-for="orderinfo in orderData">
					<orderinfo :orderinfo="orderinfo"  v-if = "orderinfo.order.orderState == '待发货' || orderinfo.order.orderState == '待收货'"></orderinfo>
				</div>
			</el-tab-pane>
			<el-tab-pane label="待评价">
				<div v-for="orderinfo in orderData">
					<orderinfo :orderinfo="orderinfo"  v-if = "orderinfo.order.orderState == '待评价'"></orderinfo>
				</div>
			</el-tab-pane>
			<el-tab-pane label="服务中">
				<div v-for="orderinfo in orderData">
					<orderinfo :orderinfo="orderinfo"  v-if = "orderinfo.order.orderState == '待退还金额' || orderinfo.order.orderState == '退款申请待同意'"></orderinfo>
				</div>
			</el-tab-pane>
			<el-tab-pane label="已完成">
				<div v-for="orderinfo in orderData">
					<orderinfo :orderinfo="orderinfo"  v-if = "orderinfo.order.orderState == '历史订单'"></orderinfo>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import orderinfo from "../../../components/orderInfo.vue"
	export default {
		components: {
			orderinfo,
		},
		data() {
			return {
				orderData: [],
			}
		},
		watch: { //同一个界面带参数刷新页面
			'$route': function(to, from) {
				this.getOrderData();
			}
		},
		methods: {
			getOrderData() {
				this.$post("/order/queryOrderBind", {
					userId: this.$store.state.userId,
				}).then(res => {
					this.orderData = res.data;
					console.log(this.orderData);
				}).catch(err => {
					console.log(err);
				})
			},
		},
		mounted() {
			this.getOrderData();
		},

	}
</script>

<style>
</style>
