<template>
	<div>
		<el-row>
			<search></search>
		</el-row>
		<el-row>
			<el-col>
				<el-card class="box-card">
					<el-form :inline="true" :model="formInline" class="demo-form-inline">
						<el-form-item label="分类">
							<el-input v-model="formInline.bookCategory" placeholder="输入分类" style="width: 100px;">
							</el-input>
						</el-form-item>
						<el-form-item label="图书名称">
							<el-input v-model="formInline.bookName" placeholder="输入图书名称" style="width: 120px;">
							</el-input>
						</el-form-item>
						<el-form-item label="价格范围">
							<el-input v-model="formInline.minPrice" type="number" min="0" placeholder="最小价格"
								style="width: 120px;"></el-input>
						</el-form-item>
						<el-form-item>
							<el-input v-model="formInline.maxPrice" type="number" min="0" placeholder="最大价格"
								style="width: 120px;">
							</el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="danger" @click="onSubmit">查询</el-button>
						</el-form-item>
					</el-form>

					<div v-for="book in searchBooks">
						<el-card class="box-card" :body-style="{ padding: '0px' ,margin:'10px'}" shadow="hover"
							style="margin: 10px;">
							<router-link :to="{path: '/customer/bookdetail',query:{bookId:book.id}}">
								<div class="book_content_img">
									<el-image style="width: 82%; height: 150px;margin:5px 9%" :src="book.bookPic"
										fit="fill"></el-image>
								</div>
							</router-link>
							<div class="book_content_info">
								<div class="book_name">{{book.bookName}}</div>
								<div class="book_list_content">作者: {{book.bookAuthor}}</div>
								<div class="book_list_content">ISBN: {{book.bookIsbn}}</div>
								<div class="book_list_content">出版社: {{book.publisher}}</div>
								<div class="book_list_content">分类: {{book.categoryName}}/{{book.subcategoryName}}</div>
								<div class="book_list_content">出版时间: {{book.publishTime}}</div>
								<div class="book_list_content">库存: {{book.bookStock}}</div>
								<div class="book_list_content">原价: ¥{{book.bookPrice * 1.5}}</div>
								<div class="book_list_content" style="color: #9d232c;">售价: ¥{{book.bookPrice}}</div>
								<div style="float: right;margin-left: 200px;">

									<el-button type="primary" icon="el-icon-shopping-cart-2" class="cartBtn" @click="addBookToCart(book)">加入购物车
									</el-button>
									<el-button class="plainBtn" plain @click="goBuyPage(book)">立即购买</el-button>
									<el-button class="detail" @click="bookDetail(book)">查看详情</el-button>
								</div>
							</div>
						</el-card>
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
				searchBooks: [],
				formInline: {
					bookCategory: null,
					bookName: null,
					minPrice: null,
					maxPrice: null,
				},

			}

		},
		mounted() {
			this.getDataByKw(this.$route.query.search);
		},
		watch: { //同一个界面带参数刷新页面
			'$route': function(to, from) {
				this.getDataByKw(this.$route.query.search);
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
			onSubmit() {
				this.$post("/book/queryBookVOByKeys", {
					bookName: this.formInline.bookName,
					category: this.formInline.bookCategory,
					minPrice: this.formInline.minPrice,
					maxPrice: this.formInline.maxPrice,
				}).then(res => {
					this.searchBooks = res.data;
					// this.$router.push("/customer/shop",{query:{search:this.$route.query.search}});
				}).catch(err => {

				})
			},
			getDataByKw(kw) {
				this.$post("book/queryBookVOByKw", {
					kw: kw
				}).then(res => {
					this.searchBooks = res.data;
					console.log(this.searchBooks);
				}).catch(err => {
					console.log(err);
				})
			},
			addBookToCart(book) {
				this.$post("/cart/addToCart", {
					customerId: this.$store.state.userId,
					bookId: book.id,
					cartQuantity: 1,
					cartAmount: 1 *  book.bookPrice,
				}).then(res => {
					this.$message({
						message: res.data ? "成功" : "失败",
						type: res.data ? "success" : "warning"
					})

				}).catch(err => {
					console.log(err);
					this.$message({
						message: "修改失败",
						type: "warning"
					})
				})
			},
			goBuyPage(book) {
				var info = {
					bookId: book.id,
					num: 1,
					userId: this.$store.state.userId,
				};
				console.log(info);
				this.$router.push({
					path: "/customer/buy",
					query: {
						info: info,
						type: "bookdetail"
					}
				})
			},
		},
	}
</script>
<style scoped>
	.content {
		background-color: #ffffff;
	}

	.box_title {
		margin: 10px auto;
		width: 1240px;
		color: #545c64;
		padding: 5px 10px;
	}

	.box {
		margin: 10px auto;
		width: 1240px;
	}

	.book_sort {
		margin: 10px 10px;
		width: 200px;
		float: left;
		border-right: 1px #f3f0e9 solid;
	}

	.book_info {
		margin: 10px 10px;
		width: 1000px;
		float: right;

	}

	.tab {
		width: 100%;
	}

	.tab_head {
		padding-left: 5px;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #f3f0e9;
		margin: 1px 0px;
	}

	.tab_list {
		padding-left: 5px;
		width: 100%;
		height: 40px;
		line-height: 40px;
		background-color: #ffffff;
		margin: 1px 0px;
	}

	.tab_list:hover {
		background-color: #a0a9b1;
	}

	.book_content {
		border: 1px #f3f0e9 solid;
		padding: 5px;
		margin: 10px auto;
		width: 940px;
		height: 190px;
		max-height: 240px;
		line-height: 35px;
		border: 1px solid #cacaca;
		padding: 15px;
	}

	.book_content:hover {
		background-color: white;
	}

	.book_content_img {
		float: left;
		width: 150px;
		height: 160px;
		/*border: 1px solid black;*/
	}

	.book_content_info {
		float: left;
		width: 1053px;
		height: 160px;
		color: black;
		/*border: 1px solid black;*/
	}

	.book_name {
		margin: 5px 0px;
		width: 740px;
		line-height: 30px;
		font-size: 18px;
		color: #9d232c;
		overflow: hidden;
	}

	.book_list_content {
		width: 32%;
		display: inline-block;
		height: 20px;
		overflow: hidden;
		line-height: 18px;
		font-size: 14px;
	}

	.plainBtn {
		width: 100px;
		color: #9d232c;
		background-color: #f3f0e9;
		border: 1px #f3f0e9 solid;
		float: right;
		margin: 0px 5px;
		font-size: 14px;
	}

	.detail {
		width: 100px;
		color: #ffffff;
		background-color: #F56C6C;
		border: 1px #f3f0e9 solid;
		float: right;
		margin: 0px 5px;
		font-size: 14px;
	}

	.plainBtn:hover {
		background-color: white;
		color: #9d232c;
		border: 1px #b2bac2 solid;
	}

	.cartBtn {
		width: 140px;
		background-color: #9d232c;
		border: 1px #9d232c solid;
		float: right;
		margin: 0px 5px;
		font-size: 14px;
	}

	.cartBtn:hover {
		background-color: #f52b21;
	}
</style>
