<template>
	<div>
	<el-card class="box-card">
		 <div slot="header" class="clearfix">
		 修改个人信息
		 </div>
		<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账号名" prop="username">
				<el-input type="text" v-model="ruleForm.username" autocomplete="off" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="pass">
				<el-input type="password" v-model="ruleForm.pass" autocomplete="off" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item label="新密码" prop="newPass">
				<el-input type="password" v-model="ruleForm.newPass" autocomplete="off" style="width: 300px;">
				</el-input>
			</el-form-item>
			<el-form-item label="确认新密码" prop="checkNewPass">
				<el-input type="password" v-model.number="ruleForm.checkNewPass" style="width: 300px;"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
				<el-button @click="to('info')">返回</el-button>
			</el-form-item>
		</el-form>
	</el-card>
		
	</div>
</template>

<script>
	export default {
		name: "modify",
		components: {

		},
		data() {
			var validcheckUsername = (rule, value, callback) => {
				var ans;
				if (!value) {
					return callback(new Error('昵称不能为为空'));
				} else {
					this.$post("/account/checkName", {
						username: value,
						accountId: this.$store.state.accountId
					}).then((res) => {
						if (res.data == true) {
							callback();
						} else {
							return callback(new Error('该昵称已被占用！'));
						}
					})

				}
			};
			var validcheckNewPass = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('确认新密码不能为空'));
				} else if (value != this.ruleForm.newPass) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入密码'));
				} else {
					this.$post("/account/queryByAccountId", {
						accountId: this.$store.state.accountId
					}).then((res) => {

						if (res.data.password == value) {
							callback();
						} else {
							return callback(new Error('原密码输入错误！'));
						}
					})
				}
			};
			var validateNewPass = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('请输入新密码'));
				} else if (this.ruleForm.newPass == this.ruleForm.pass) {
					callback(new Error('新密码不能和旧密码一致！'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					username: this.$store.state.username,
					pass: '',
					newPass: '',
					checkNewPass: ''
				},
				rules: {
					pass: [{
						validator: validatePass,
						trigger: 'blur'
					}],
					newPass: [{
						validator: validateNewPass,
						trigger: 'blur'
					}],
					checkNewPass: [{
						validator: validcheckNewPass,
						trigger: 'blur'
					}],
					username: [{
						validator: validcheckUsername,
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$post('/account/update', {
							username: this.ruleForm.username,
							password: this.ruleForm.newPass,
							accountId: this.$store.state.accountId,
						}).then(res => {
							// 业务代码
							console.log(res);
							if (res) this.$router.push("/student/info");

							this.$message({
								type: 'info',
								message: res == true ? '修改成功' : '修改失败'
							});

						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			to(url) {
				this.$router.push(url)
			}
		}
	}
</script>

<style>
</style>
