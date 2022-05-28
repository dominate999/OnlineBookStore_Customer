<template>
	<div>
		<el-container>
			<el-header>
				<el-menu background-color="#F56C6C" text-color="#000000" default-active="1" class="el-menu-demo"
					mode="horizontal" @select="handleSelect" router>
					<el-menu-item index="1" route="index"><i class="el-icon-edit"></i>网上书店</el-menu-item>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-user"></i>{{this.$store.state.username}}</template>
						<el-menu-item index="2-1" route="info">我的信息</el-menu-item>
						<el-menu-item index="2-2" route="modify">修改信息</el-menu-item>
						<el-menu-item index="2-3" route="/">退出登录</el-menu-item>
					</el-submenu>
					<el-menu-item index="3" route="index"><i class="el-icon-message"></i>消息中心</el-menu-item>
					<el-menu-item index="3" route="index"><i class="el-icon-s-goods"></i>购物车</el-menu-item>
					<el-menu-item index="3" route="index"><i class="el-icon-s-order"></i>订单中心</el-menu-item>
				</el-menu>
			</el-header>
			<el-container>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	export default {
		name: 'layout',
		components: {

		},
		data() {
			return {
				username: this.$store.state.username,
				islogin: this.$store.state.islogin,
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				if (key == '2-3') {
					this.$store.commit("islogin", "no")
					this.$store.commit("setusername", "")
					this.$store.commit("setuserId", "")
					this.$store.commit("setaccountType", "")
					this.$store.commit("setclassId", "")
					sessionStorage.setItem("islogin", "no")
					sessionStorage.setItem("username", "")
					sessionStorage.setItem("userId", "")
					sessionStorage.setItem("accountType", "")
					sessionStorage.setItem("classId", "")
				}
			}
		}
	}
</script>

<style>
	.el-header {
		background-color: #FFFFFF;
		color: #333;
		text-align: center;
		line-height: 60px;
	}



	body>.el-container {
		margin-bottom: 40px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
