<template>
	<el-card class="body-card">
		<el-form ref="form" :model="form" label-width="80px" >
			<el-form-item label="昵称">
				<el-input v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="form.customerName"></el-input>
			</el-form-item>
			<el-form-item label="性别">
			  <el-select v-model="form.customerSex" placeholder="性别选择">
			      <el-option label="男" value="男"></el-option>
			      <el-option label="女" value="女"></el-option>
			    </el-select>
			</el-form-item>
			<el-form-item label="联系方式">
				<el-input v-model="form.telephone"></el-input>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model="form.customerEmail"></el-input>
			</el-form-item>
			<el-form-item label="地址">
				<el-input v-model="form.customerAddress"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="updateInfo">修改信息</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				form:{},
				
			}
		},
		mounted() {
			this.getUserInfo();
		},
		methods: {
			getUserInfo(){
				this.$post("/account/queryCustomerByCustomerId",{
					customerId:this.$store.state.userId,
				}).then(res=>{
					this.form = res.data;
				}).catch(err=>{
					console.log(err);
				})
			}
		},updateInfo(){
			this.$post("/account/queryCustomerByCustomerId",{
				customerId:this.$store.state.userId,
			}).then(res=>{
				this.form = res.data;
				this.$message({
					message: res.data ? '修改成功！' : "修改失败",
					type: res.data ? 'success' : 'error'
				});
			}).catch(err=>{
				console.log(err);
			})
		
		}

	}
</script>

<style scoped>
	.el-input{
		max-width: 300px;
		
	}
</style>
