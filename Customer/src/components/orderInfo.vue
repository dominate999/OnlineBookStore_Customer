<template>
	<el-card class="box-card" style="margin-top: 10px;">
		<el-descriptions border direction="vertical" :column="8" style="margin-top: 10px;padding: 0px;">
			<el-descriptions-item label="订单编号">{{orderinfo.order.orderGeneratedId}}
			</el-descriptions-item>
			</el-descriptions-item>
			<el-descriptions-item label="收货人">{{orderinfo.customerVO.customerName}}
			</el-descriptions-item>
			<el-descriptions-item label="订单总价">¥{{orderinfo.order.orderAmount}}</el-descriptions-item>
			<el-descriptions-item label="创建时间">{{orderinfo.order.orderCreateTime}}
			</el-descriptions-item>
			<el-descriptions-item label="快递单号" v-if="orderinfo.order.deliver_no != null&& orderinfo.order.deliver_no != ''">
				{{orderinfo.order.deliver_no}}
			</el-descriptions-item>
			<el-descriptions-item label="支付时间">
				<div v-if="orderinfo.order.orderPayTime === null">暂未付款</div>
				<div v-else>{{orderinfo.order.orderPayTime}}</div>
			</el-descriptions-item>
			<el-descriptions-item label="订单状态">{{orderinfo.order.orderState}}</el-descriptions-item>
			<el-descriptions-item label="操作">
				<el-button type="text" v-if="orderinfo.order.orderState=='待付款'" @click="payforOrder(orderinfo.order.id)">付款
				</el-button>
				<el-button type="text" v-if="orderinfo.order.orderState=='待收货'" @click="updateOrder(orderinfo.order.id,'待评价')">确认收货</el-button>
				<el-button type="text" v-if="orderinfo.order.orderState=='待评价'"
					@click="to('/customer/return',orderinfo)">退货</el-button>
				<el-button type="text" v-if="orderinfo.order.orderState=='待发货'"
					@click="to('/customer/refund',orderinfo)">退款</el-button>
			</el-descriptions-item>
		</el-descriptions>
		<template>
			<el-table :data="orderinfo.orderitems" style="width: 100%" size="mini">
				<el-table-column prop="id" label="订单子项ID" width="180" align=center>
				</el-table-column>
				<el-table-column label="图书封面" width="180" align=center>
					<template slot-scope="scope">
						<el-image :src="scope.row.bookPic" style="width: 100px; height: 100px" fit="fill"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="bookName" label="图书名称" align=center>
				</el-table-column>
				<el-table-column prop="bookQuantity" label="数量" align=center>
				</el-table-column>
				<el-table-column prop="orderItemAmount" label="总价" align=center>
				</el-table-column>
				<el-table-column label="操作" v-if="orderinfo.order.orderState=='待评价'" align=center>
					<template slot-scope="scope">
						<el-button type="text" @click="to('/customer/evaluate',scope.row)">评价订单</el-button>
					</template>
				</el-table-column>
			</el-table>
		</template>

	</el-card>
</template>

<script>
	export default {
		props: ["orderinfo"],
		methods: {
			to(url, info) {
				this.$router.push({
					path: url,
					query: {
						info: info,
					}
				})
			},
			payforOrder() {
				var url = "/BookStoreBackstage_war_exploded/pay/alipay";
				this.axios({
					method: 'post',
					url: url,
					params: {
						//输入一定不要带中文！！！
						outTradeNo: this.orderinfo.order.orderGeneratedId,
						subject: this.orderinfo.order.orderCreateTime,
						totalAmount: this.orderinfo.order.orderAmount,
						body: this.orderinfo.order.id,
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
				
			},
			updateOrder(id, state) {
				this.$confirm('确认执行? 请确定您的操作', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$post("order/updateOrderState", {
						orderId: id,
						state: state,
					}).then(res => {
						this.$message({
							message: res.data ? '操作成功！' : "操作失败",
							type: res.data ? 'success' : 'error'
						});
						this.$router.push({
							path: "/customer/order",
							query: {
								status: res.msg,
							}
						});
					}).catch(err => {
						console.log(err);
					});
				}).catch((err) => {
					console.log(err);
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			}
		},

	}
</script>

<style>
</style>
