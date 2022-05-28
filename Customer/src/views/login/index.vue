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
						<el-option label="学生" value="student"></el-option>
						<el-option label="教师" value="teacher"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item style="margin-left: 80px;">
					<el-button style="width: 100px;text-align: center;" type="primary" @click="toLogin">登录</el-button>
				</el-form-item>
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
					accountType: 'student',
					userId: '',
					classId: '',
					accountId:'',
				}
			}
		},
		mounted() {
			this.$get('/account/findAll')
				.then(res => {
					// 业务代码
					console.log(res);
					this.userlist = res;
				})
		},
		methods: {
			toLogin() {
				let flag = 0
				for (let i in this.userlist) {
					if (this.userlist[i].username === this.form.username &&
						this.userlist[i].password === this.form.password &&
						this.userlist[i].accountType === this.form.accountType) {
						flag = 1
						this.form.userId = this.userlist[i].userId;
						this.form.classId = this.userlist[i].classId;
						this.form.accountId = this.userlist[i].accountId;
						console.log(this.userlist[i].userId);
						break
					}
				}

				if (flag == 1) {
					this.$store.commit("islogin", "yes")
					this.$store.commit("setusername", this.form.username)
					this.$store.commit("setuserId", this.form.userId)
					this.$store.commit("setaccountType", this.form.accountType)
					this.$store.commit("setclassId", this.form.classId)
					this.$store.commit("setaccountId", this.form.accountId)
					console.log(this.$store.state.isLogin)
					router.push('/student/index')
				} else {
					this.$alert('检查用户/密码/类型是否错误', '登录失败', {
						confirmButtonText: '确定',
						callback: () => {
							this.$message({
								type: 'error',
								message: `登录失败`
							});
						}
					});
				}
			}
		}
	}
</script>

<style scoped>
	
</style>
