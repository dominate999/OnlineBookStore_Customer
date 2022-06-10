import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state:{
		username:"",
		islogin:"",
		accountId:"",
		accountType:"",
		userId:"",
	},
	mutations:{
		setusername(state,msg){
			state.username = msg
			sessionStorage.setItem("username",msg)
		},
		setuserId(state,msg){
			state.userId = msg
			sessionStorage.setItem("userId",msg)
		},
		setaccountType(state,msg){
			state.accountType = msg
			sessionStorage.setItem("accountType",msg)
		},
		islogin(state,msg){
			state.islogin = msg
			sessionStorage.setItem("islogin",msg)
		},
		setaccountId(state,msg){
			state.accountId = msg
			sessionStorage.setItem("accountId",msg)
		},
	}
})

export default store