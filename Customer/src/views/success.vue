<template>
	<div>
		支付成功！！
	</div>
</template>

<script>
	export default {
		mounted() {
			console.log(this.$route.query.out_trade_no);
			this.$post("order/payForOrderByGen", {
				orderGeneratedId: this.$route.query.out_trade_no,
			}).then(res => {
				this.$message({
					message: res.data ? '支付成功！' : "支付失败",
					type: res.data ? 'success' : 'error'
				});
				this.$router.push("/customer/order");
			}).catch(err => {
				console.log(err);
			});
		}
	}
</script>

<style>
</style>
