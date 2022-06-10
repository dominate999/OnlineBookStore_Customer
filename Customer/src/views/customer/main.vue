<template>
	<div>
		<el-row>
			<search></search>
		</el-row>
		<el-row :gutter="10">
			<el-col :span="4">
				<div class="tab">
					<div
						style="text-align: center;line-height: 30px; font-weight: bold;font-size: 18px;font-family: 'Times New Roman', Times, serif; background-color: #f56c6c; color:#ffffff;  ">
						图书分类</div>
					<div v-if="single==0">
						<div v-for="(item,index) in options" :key="index" class="tab_list" @mouseenter="enter(index)"
							@mouseleave="out(index)">
							<div>
								<router-link :to="{path: '/customer/shop',query:{search:item[0].label}}">
									<span style="color: black">{{item[0].label}}</span>
								</router-link>
								<span> | </span>
								<router-link :to="{path: '/customer/shop',query:{search:item[1].label}}">
									<span style="color: black">{{item[1].label}}</span>
								</router-link>
								<transition name="fade">
									<div class="tab_page" v-show="seen&&index==current">
										<div v-for="book in item">
											<h3>
												<router-link :to="{path: '/customer/shop',query:{search:book.label}}">
													>{{book.label}}</router-link>
											</h3>
											<div class="tab_page_list">
												<el-breadcrumb separator="|">
													<!-- <el-breadcrumb-item :to="{ path: '/' }" exact>首页</el-breadcrumb-item> -->
													<el-breadcrumb-item v-for="it in book.children"
														:to="{path: '/customer/shop',query:{search:it.label}}"
														:key="it.value">
														{{it.label}}
													</el-breadcrumb-item>
													<!-- 	<el-breadcrumb-item>
													</el-breadcrumb-item> -->
												</el-breadcrumb>
											</div>
										</div>
									</div>
								</transition>
							</div>
						</div>
					</div>
					<div v-if="single==1">
						<div v-for="(item,index) in options" class="tab_list" @mouseenter="enter(index)"
							@mouseleave="out(index)">
							<div v-if="item.length<2">
								<router-link style="text-decoration: none;"
									:to="{path: '/customer/shop',query:{search:item[0].label}}">
									<span style="color: black">{{item[0].label}}</span>
								</router-link>
								<transition name="fade">
									<div class="tab_page" v-show="seen&&index==current">
										<div v-for="book in item">
											<h3>
												<router-link :to="{path: '/customer/shop',query:{search:book.label}}">
													>{{book.label}}</router-link>
											</h3>
											<div class="tab_page_list">
												<el-breadcrumb separator="|">
													<!-- <el-breadcrumb-item :to="{ path: '/' }" exact>首页</el-breadcrumb-item> -->
													<el-breadcrumb-item v-for="it in book.children"
														:to="{path: '/customer/shop',query:{search:it.label}}"
														:key="it.value">
														{{it.label}}
													</el-breadcrumb-item>
												</el-breadcrumb>
											</div>
										</div>
									</div>
								</transition>
							</div>
							<div v-if="item.length== 2">
								{{item[0].label}}<span> | </span>{{item[1].label}}
								<transition name="fade">
									<div class="tab_page" v-show="seen&&index==current">
										<div v-for="book in item">
											<h3>
												<router-link :to="{path: '/customer/shop',query:{search:book.label}}">
													>{{book.label}}</router-link>
											</h3>
											<div class="tab_page_list">
												<el-breadcrumb separator="|">
													<!--                            <el-breadcrumb-item :to="{ path: '/' }" exact>首页</el-breadcrumb-item>-->
													<el-breadcrumb-item v-for="it in book.children"
														:to="{path: '/customer/shop',query:{search :it.label}}"
														:key="it.value">
														{{it.label}}
													</el-breadcrumb-item>
													<!-- <el-breadcrumb-item> -->
													<!-- </el-breadcrumb-item> -->
												</el-breadcrumb>
											</div>
										</div>
									</div>
								</transition>
							</div>

						</div>
					</div>
				</div>
			</el-col>
			<el-col :span="16">
				<el-carousel :interval="4000" height="400px">
					<el-carousel-item>
						<img src="../../assets/20.jpg" alt="" height="400px">
					</el-carousel-item>
					<el-carousel-item>
						<img src="../../assets/21.jpg" alt="" height="400px">
					</el-carousel-item>
					<el-carousel-item>
						<img src="../../assets/22.jpg" alt="" height="400px">
					</el-carousel-item>
					<el-carousel-item>
						<img src="../../assets/23.jpg" alt="" height="400px">
					</el-carousel-item>
					<el-carousel-item>
						<img src="../../assets/24.jpg" alt="" height="400px">
					</el-carousel-item>
				</el-carousel>
			</el-col>
			<el-col :span="4">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>图书热销版</span>
					</div>
					<div v-for="book in rankBoook.slice(0,5)" class="text item"
						style="box-shadow: 1 1px 1px 0 rgba(0, 0, 0, 0.1);margin: 5px; height: 50px;">
						<router-link style="text-decoration: none; "
							:to="{path: '/customer/bookdetail',query:{bookId: book.id}}">
							<div class="rank" style="color: black;font-size: 15px;"><i class="el-icon-notebook-1
" style="color: orangered;"></i>《{{book.bookName}}》</div>
						</router-link>
					</div>
				</el-card>
			</el-col>
		</el-row>
		<el-divider></el-divider>
		<h1>书籍推荐</h1>
		<el-row :gutter="20">
			<el-col :span="4" v-for="book in sufferBoooks.slice(0,18)">
				<el-card :body-style="{ padding: '0px' ,margin:'10px'}" shadow="hover">
					<img :src="book.bookPic" class="image" style="width: 200px; height: 200px;">
					<div>
						<h5>{{book.bookName}}</h5>
						<div class="bottom clearfix">
							<h3 style="color: red;">¥{{book.bookPrice}}</h3>
							<el-button type="text" class="button" @click="bookDetail(book)">立即抢购</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import search from '../../components/search.vue'
	export default {
		components: {
			search,
		},
		data() {
			return {
				options: [],
				single: 0,
				seen: false, //显示和隐藏
				books: [],
				rankBoook: [],
			}
		},
		methods: {
			bookDetail(item) {
				// console.log(item);
				this.$router.push({
					path: '/customer/bookdetail',
					query: {
						bookId: item.id
					}

				});
			},

			getAllBook() {
				this.$post("/book/queryAllBook")
					.then(res => {
						this.books = res.data;
						// console.log(this.books);
					}).catch(err => {
						{
							console.log(err);
						}
					})
			},
			getRankBook() {
				this.$post("/book/queryAllBookOrderBySale")
					.then(res => {
						this.rankBoook = res.data;
						console.log("renakksk");
						console.log(this.rankBoook);
					}).catch(err => {

						console.log(err);

					})

			},
			getName(upperName, childName) {
				return upperName + "/" + childName;
			},
			enter(index) {
				// console.log(this.seen);
				this.seen = true;
				this.current = index;
				// console.log("鼠标进入了！");
				// console.log("index:"+index)
			},
			out(index) {
				this.seen = false;
				this.current = null;
			}, //得到并设置图书分类的联级选择器
			getSortList() {
				this.$post("/book/queryNavigate").then(res => {
					let list = res.data;
					// console.log(list);
					this.options = [];
					if (list.length % 2 == 0) {
						for (let i = 0; i < list.length; i = i + 2) {
							let children = [];
							// console.log(list[i].subcategories);
							if (list[i].subcategories != null && list[i].subcategories.length > 0) {
								for (let j = 0; j < list[i].subcategories.length; j++) {
									children.push({
										label: list[i].subcategories[j].subcategoryName,
										value: list[i].subcategories[j].id
									});
									// console.log("children - -----------");
									// console.log(children);
								}
							}
							// console.log(list[i]);

							let children1 = [];
							if (list[i + 1].subcategories != null && list[i + 1].subcategories.length > 0) {
								for (let j = 0; j < list[i + 1].subcategories.length; j++) {
									children.push({
										label: list[i + 1].subcategories[j].subcategoryName,
										value: list[i + 1].subcategories[j].id
									});
								}
							}
							// console.log(list[i+1]);
							this.single = 0
							this.options.push([{
								label: list[i].categoryName,
								value: list[i].id,
								seen: false,
								children: children
							}, {
								label: list[i + 1].categoryName,
								value: list[i + 1].id,
								seen: false,
								children: children1
							}])
							// console.log(this.options);
						}
					} else {
						for (let i = 0; i < list.length - 1; i = i + 2) {
							let children = [];
							console.log(list[i].subcategories);
							if (list[i].subcategories != null && list[i].subcategories.length > 0) {
								for (let j = 0; j < list[i].subcategories.length; j++) {
									children.push({
										label: list[i].subcategories[j].subcategoryName,
										value: list[i].subcategories[j].id
									});
									// console.log("children - -----------");
									// console.log(children);
								}
							}
							// console.log(list[i]);

							let children1 = [];
							if (list[i + 1].subcategories != null && list[i + 1].subcategories.length > 0) {
								for (let j = 0; j < list[i + 1].subcategories.length; j++) {
									children1.push({
										label: list[i + 1].subcategories[j].subcategoryName,
										value: list[i + 1].subcategories[j].id
									});
								}
							}
							// console.log(list[i+1]);

							this.options.push([{
								label: list[i].categoryName,
								value: list[i].id,
								seen: false,
								children: children
							}, {
								label: list[i + 1].categoryName,
								value: list[i + 1].id,
								seen: false,
								children: children1
							}])

							// console.log(this.options);
						}
						let children2 = [];
						if (list[list.length - 1].subcategories != null && list[list.length - 1].subcategories
							.length > 0) {
							for (let j = 0; j < list[list.length - 1].subcategories.length; j++) {
								children2.push({
									label: list[list.length - 1].subcategories[j].subcategoryName,
									value: list[list.length - 1].subcategories[j].id
								});
							}
						}
						this.options.push([{
							label: list[list.length - 1].categoryName,
							value: list[list.length - 1].id,
							seen: false,
							children: children2
						}])
						this.single = 1;
					}

				});
			},


		},
		mounted() {
			this.getSortList();
			this.getAllBook();
			this.getRankBook();
		},
		computed: {
			sufferBoooks() {
				const shuffle = items => items.sort(() => Math.random() - 0.5);
				return shuffle(this.books);
			}
		},

	}
</script>

<style scoped>
	.first_content {
		width: 100%;
		background-color: #f7f7f6;
	}

	.content_main {
		margin: 0px auto;
		width: 1240px;
		height: 1450px;
		background-color: #f7f7f6;
	}

	.content_main_left {
		width: 17%;
		height: 100%;
		float: left;
	}

	.content_main_right {
		width: 82%;
		height: 100%;
		float: right;
	}

	.gallery-book_title {
		padding-top: 10px;
		width: 100%;
		height: 32px;
		margin-bottom: 25px;
		border-bottom: 1px solid #ccc;
		margin-top: 20px;
		padding-bottom: 34px;
		font-size: 22px;
	}

	.second_content {
		width: 100%;
		background-color: #ffffff;
	}

	.book_box {
		width: 1240px;
		height: 700px;
		margin: 0px auto;
	}

	.tab_page a {
		font-size: 19px;
		color: #000000;
		text-decoration: none;
	}

	/*/deep/ .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{*/
	/*  !*font-weight: 700;*!*/
	/*  !*text-decoration: none;*!*/
	/*  !*-webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);*!*/
	/*  !*transition: color .2s cubic-bezier(.645,.045,.355,1);*!*/
	/*  color: #be1f89 !important;*/
	/*}*/

	/deep/ .el-breadcrumb__item .el-breadcrumb__inner {
		/*color: #393a42 !important;*/
		font-weight: 300;
	}

	.router-link-active {
		text-decoration: none;
	}

	.el-breadcrumb__item {
		line-height: 30px;
	}

	.tab {
		width: 98%;
		height: 400px;
		border: 1px solid #EBEEF5;
		border-radius: 3px;
	}

	.tab_list {
		padding-left: 5px;
		width: 96%;
		height: 40px;
		line-height: 40px;
		background-color: #ffffff;
		margin: 1px 0px;
		border: none !important;
	}

	.tab_list:hover {
		background-color: #ddfffc;
	}

	.tab_page {
		/*display: none;*/
		padding: 25px 30px;
		width: 300px;
		position: absolute;
		left: 209px;
		top: 0;
		z-index: 24;
		height: 410px;
		border: 1px solid #e0e0e0;
		border-left: 0;
		background: #fff;
		-webkit-box-shadow: 0 2px 4px rgba(0, 0, 0, .18);
		box-shadow: 0 2px 4px rgba(0, 0, 0, .18);
	}

	.tab_page_list {
		margin-left: 15px;
		margin-right: 15px;
		margin-bottom: 20px;
		position: relative;
	}


	.communicate {
		clear: both;
		position: relative;
		width: 100%;
		height: 100px;
		border: 1px #acb4bc solid;
		padding: 2px 5px;
		line-height: 30px;
	}

	/deep/ .el-tabs__item {
		height: 60px;
		line-height: 60px;
		font-size: 20px;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 300px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}

	.el-col {
		border-radius: 4px;
		margin-top: 20px;
	}

	router-link:hover {
		background-color: aqua;
	}

	.rank {
		padding: 1px;
		color: #ff0000;
		transition: background-color 1s linear, color 1s linear;
		-webkit-transition: background-color 1s linear, color 1s linear;
		-moz-transition: background-color 1s linear, color 1s linear;
		-o-transition: background-color 1s linear, color 1s linear;
	}

	.rank:hover {
		
		color: blue;
	}

	.box-card {
		width: 230px;
	}
</style>
