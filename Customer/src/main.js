import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store/store.js'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import '@wangeditor/editor/dist/css/style.css';
import 'moment/locale/zh-cn'; // 获取中国标准时间，避免出现utc时间
import VueAxios from 'vue-axios'
import {
	post,
	get
} from './common/index'

import moment from 'moment'

Vue.prototype.$moment = moment
Vue.prototype.$post = post
Vue.prototype.$get = get

Vue.use(VueAxios, axios)
Vue.use(VueAxios, axios)
Vue.use(ElementUI);

Vue.config.productionTip = false
new Vue({
	router,
	store,
	render: h => h(App),
	created() {
		if (sessionStorage.getItem("islogin") === null) {
			sessionStorage.setItem("islogin", "")
		}
		this.$store.state.accountId = sessionStorage.getItem("accountId")
		this.$store.state.islogin = sessionStorage.getItem("islogin")
		this.$store.state.username = sessionStorage.getItem("username")
		this.$store.state.userId = sessionStorage.getItem("userId")
		this.$store.state.accountType = sessionStorage.getItem("accountType")
	}
}).$mount('#app')
