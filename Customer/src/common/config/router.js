/* 
	规则：
	一、例如 index_index, shop/index 以index结尾的，path和name默认去除index
	二、例如：shop/list，默认生成name为shop_list（如果结尾为index，则shop/index则是shop）
	三、填写后不会自动生成名称和路径
 */

let routes = [{
		// component :  () => import(`../../views/layout.vue`),
		path: "/customer",
		component: 'layout',
		redirect: '/404',
		children: [{
			// path:'/index',
			// name:'index',
			// component :  () => import(`../../views/index/index.vue`)
			component: 'customer/index/index',
		}, ]
	},
	{
		path: "/404",
		component: '404/index'
	},
	{
		path: '/',
		component: 'login/index',
		redirect: '/customer/index',
	},
	{
		/* 找不到以上所有的路径时，就到默认路径 */
		path: '*',
		redirect: '/404',
	}
]

let getRoutes = function() {
	/* 生成路由详细信息 */
	createRoute(routes)
	return routes
}

/* 自动生成路由 */
function createRoute(arr) {
	for (let i = 0; i < arr.length; i++) {
		if (!arr[i].component) return
		/* 去除index */
		let val = getValue(arr[i].component)
		// console.log(val)
		/* 生成name */
		arr[i].name = arr[i].name || val.replace(/\//g, '_')
		// console.log(arr[i].name)
		/* 生成path */
		arr[i].path = arr[i].path || `/${val}`
		// console.log(arr[i].path)
		/* 自动生成component */
		// console.log(`../../views/${arr[i].component}.vue`)
		let componentFun = import(`../../views/${arr[i].component}.vue`)
		arr[i].component = () => componentFun
		if (arr[i].children && arr[i].children.length > 0) {
			createRoute(arr[i].children)
		}
	}
}

function getValue(str) {
	// 获取最后一个/的索引
	// login/index
	let index = str.lastIndexOf('/')
	/* 获取最后一个/后面的值 */
	let val = str.substring(index + 1, str.length)
	if (val === 'index') {
		return str.substring(index, -1)
	}
	return str
}

export default getRoutes()
