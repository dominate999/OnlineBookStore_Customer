<template>
	<div style="display: flex;justify-content: center; align-items: center;margin-top: 100px; flex-direction: column;">
		<el-card class="box-card" style=" width: 500px;">
			<div slot="header" style="text-align: center;font-size: 5ex;" class="clearfix">
				<span>登录</span>
			</div>
			<el-form ref="form" :model="form" label-width="100px">
				<el-form-item label="用户名">
					<el-input v-model="form.username" placeholder="请输入账号" style="width: 300px;"></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-input v-model="form.password" type="password" placeholder="请输入密码" style="width: 300px;">
					</el-input>
				</el-form-item>
				<el-form-item label="用户类型" style="width: 300px;">
					<el-select v-model="form.accountType" placeholder="请选择您的身份">
						<el-option label="顾客" value="customer"></el-option>
						<el-option label="管理员" value="admin"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-left: 80px;">
					<el-button style="width: 100px;text-align: center;" type="primary" @click="toLogin">登录</el-button>
				</el-form-item>
				没有账号，立即注册！👉
				<el-button type="text" @click="toRegister">注册</el-button>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import router from '../../router.js'

	export default {
		name: 'login',
		data() {
			return {
				userlist: [],
				form: {
					username: '',
					password: '',
					accountType: 'customer',
					userId: '',
					accountId: '',
				}
			}
		},
		mounted() {
			this.$get('/account/queryAllCustomer')
				.then(res => {
					// 业务代码
					console.log(res.data);
					this.userlist = res.data;
				})
		},
		methods: {
			toLogin() {
				let flag = 0
				for (let i in this.userlist) {
					if (this.userlist[i].username !== this.form.username) {
						flag = 2;
					}
					if (this.userlist[i].username === this.form.username &&
						this.userlist[i].password !== this.form.password) {
						flag = 3;
					}
					if (this.userlist[i].username === this.form.username &&
						this.userlist[i].password === this.form.password &&
						this.userlist[i].accountType !== this.form.accountType) {
						flag = 4;
					}


					if (this.userlist[i].username === this.form.username &&
						this.userlist[i].password === this.form.password &&
						this.userlist[i].accountType === this.form.accountType) {
						flag = 1
						this.form.userId = this.userlist[i].customerId;
						this.form.accountId = this.userlist[i].id;
						break
					}
				}

				if (flag == 1) {
					this.$store.commit("islogin", "yes")
					this.$store.commit("setusername", this.form.username)
					this.$store.commit("setuserId", this.form.userId)
					this.$store.commit("setaccountType", this.form.accountType)
					this.$store.commit("setaccountId", this.form.accountId)
					console.log(this.$store.state.isLogin)
					this.$message({
						type: 'success',
						message: `登录成功`
					});
					router.push('/customer/main')
				} else if (flag == 2) {
					this.$message({
						type: 'error',
						message: `请检查用户名`
					});
				} else if (flag == 3) {
					this.$message({
						type: 'error',
						message: `请检查密码！`
					});
				} else if (flag == 4) {
					this.$message({
						type: 'error',
						message: `请检查所选类型`
					});
				}
			},
			toRegister() {
					router.push('/register')
			}
		}
	}
</script>

<style scoped>

</style>
