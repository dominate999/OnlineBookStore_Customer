<template>
	<div>
		<el-row>
			<el-menu background-color="#F56C6C" text-color="#FFFFFF" default-active="1" class="el-menu-demo"
				mode="horizontal" @select="handleSelect" router>
				<el-menu-item index="1" route="main"><i class="el-icon-edit el-icon"></i>网上书店</el-menu-item>
				<div style="display: flex; justify-content:flex-end ;">
					<el-menu-item index="4" route="/login" v-if= "this.$store.state.islogin == ''"><i class="el-icon-position el-icon"></i>登录/注册</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i
								class="el-icon-user el-icon"></i>{{this.$store.state.username}}</template>
						<el-menu-item index="2-1" route="modify">修改信息</el-menu-item>
						<el-menu-item index="2-2" route="/login">退出登录</el-menu-item>
					</el-submenu>
					<!-- <el-menu-item index="3" route="message"><i class="el-icon-message el-icon"></i>消息中心</el-menu-item> -->
					<el-menu-item index="4" route="cart"><i class="el-icon-s-goods el-icon"></i>购物车</el-menu-item>
					<el-menu-item index="5" route="order"><i class="el-icon-s-order el-icon"></i>订单中心</el-menu-item>
					<el-menu-item index="6" route="info"><i class="el-icon-menu el-icon"></i>个人中心</el-menu-item>
				</div>
			</el-menu>
		</el-row>

		<el-main>
			<router-view></router-view>
		</el-main>

		<el-row>
			<el-divider></el-divider>
			<foot></foot>
		</el-row>

	</div>
</template>

<script>
	import foot from '../components/foot.vue'
	export default {
		name: 'layout',
		components: {
			foot,
		},
		data() {
			return {
				username: this.$store.state.username,
				islogin: this.$store.state.islogin,
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				if (key == '2-2') {
					this.$store.commit("islogin", "no")
					this.$store.commit("setusername", "")
					this.$store.commit("setuserId", "")
					this.$store.commit("setaccountType", "")
					this.$store.commit("setaccountId", "")
					sessionStorage.setItem("islogin", "no")
					sessionStorage.setItem("username", "")
					sessionStorage.setItem("userId", "")
					sessionStorage.setItem("accountType", "")
					sessionStorage.setItem("accountId", "")
				}
			}
		}
	}
</script>

<style scoped>
	.el-header {
		background-color: #FFFFFF;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-main {
		margin-left: 5%;
		margin-right: 5%;
	}

	.el-icon {
		color: #FFFFFF;
	}
</style>
