<template>
	<div>
		<el-page-header @back="goBack" content="订单评价">
		</el-page-header>

		<el-divider></el-divider>
		<el-card class="box-card" style="margin-top: 10px;">
			<el-descriptions border direction="vertical" :column="7" style="margin-top: 10px;padding: 0px;">
				<el-descriptions-item label="订单编号">{{orderitem.id}}</el-descriptions-item>
				</el-descriptions-item>
				<el-descriptions-item label="收货人">{{this.$store.state.username}}</el-descriptions-item>
				<el-descriptions-item label="订单总价">{{orderitem.orderItemAmount}}</el-descriptions-item>
				<el-descriptions-item label="订单状态">待评价</el-descriptions-item>
			</el-descriptions>
			<el-descriptions border direction="vertical" :column="7" style="margin-top: 10px;padding: 0px;">
				<el-descriptions-item label="图书封面">
					<el-image :src="orderitem.bookPic" style="width: 100px; height: 100px" fit="fill">
					</el-image>
				</el-descriptions-item>
				<el-descriptions-item label="ISBN">{{orderitem.bookIsbn}}</el-descriptions-item>
				</el-descriptions-item>
				<el-descriptions-item label="图书名称">{{orderitem.bookName}}</el-descriptions-item>
				<el-descriptions-item label="数量">{{orderitem.bookQuantity}}</el-descriptions-item>
				<el-descriptions-item label="价格">¥{{orderitem.bookPrice}}</el-descriptions-item>

			</el-descriptions>


		</el-card>
		<el-divider></el-divider>
		<el-card class="box-card">

			<div slot="header" class="clearfix">
				<span>评价内容</span>
			</div>
			<el-form class="demo-form-inline">
				<el-form-item>
					<el-rate v-model="value" allow-half show-text text-color="#ff9900" score-template="{value}">
					</el-rate>
				</el-form-item>
				<el-form-item>
					<el-input type="textarea" :rows="5" placeholder="请输入内容,您的反馈是对我们的最好的鞭策!😀" v-model="textarea">
					</el-input>
				</el-form-item>
				<el-form-item>
					<el-button style="float: right; padding: 10px" type="success" @click="doit">立即评价！</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				orderitem: {},
				value: "",
				textarea: ''
			}
		},
		methods: {
			goBack() {
				console.log('go back');
				this.$router.push("/customer/order");
			},
			doit() {
				this.$confirm('确认要进行吗?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$post("evaluate/addEvaluate", {
						evaStar: this.value,
						content: this.textarea,
						orderitemId: this.orderitem.id,
						username: this.$store.state.username,
						bookId: this.orderitem.bookId,
						customerId: this.$store.state.userId,
					}).then(res => {
						this.$message({
							message: res.data ? "反馈成功" : '反馈失败',
							type: res.data ? "success" : "warning"
						})
						this.$router.push("/customer/order");
					}).catch(err => {

					});

				}).catch(err => {
					this.$message({
						message: "已取消",
						type: "warning"
					})
				})
			}
		},
		mounted() {
			this.orderitem = this.$route.query.info;
			console.log(this.orderitem);
		}
	}
</script>

<style>
</style>
