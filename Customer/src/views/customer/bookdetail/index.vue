<template>
	<div>
		<el-row>
			<el-col :span="8">
				<div class="demo-image__placeholder">
					<div class="block">
						<el-image :src="book.bookPic" style="width: 400px; height: 400px" fit="fill"></el-image>
					</div>
				</div>
			</el-col>
			<el-col :span="16">
				<div class="book_buy">
					<div class="book_name">{{book.bookName}}</div>
					<div class="book_content book_buy_content">
						<div class="book_list_content">作者: {{book.bookAuthor}}</div>
						<div class="book_list_content">ISBN: {{book.bookIsbn}}</div>
						<div class="book_list_content">出版社: {{book.publisher}}</div>
						<div class="book_list_content">出版时间: {{book.publishTime}}</div>
					</div>
					<div class="book_content book_buy_price">
						<div class="book_buy_info">
							<span class="labelSpan">售价</span>
							<span class="labelPrice">￥{{book.bookPrice}}</span>
						</div>
						<div class="book_buy_info">
							<span class="labelSpan">市场价</span>
							<s>￥{{book.bookPrice * 1.5}}</s>
						</div>
					</div>
					<div class="book_content">
						<span class="labelSpan">运费</span>
						￥0.00
					</div>
					<div class="book_content">
						<span class="labelSpan">库存</span>
						{{book.bookStock}} 件
					</div>
					<div class="book_content">
						<el-input-number v-model="num" style="margin: 10px;" @change="handleChange" :min="1"
							:max="book.bookStock" label="描述文字"></el-input-number>
					</div>
					<div class="book_content">
						<el-button class="plainBtn" plain  @click="goBuyPage">立即购买</el-button>
						<el-button type="primary" icon="el-icon-shopping-cart-2" class="cartBtn" @click="addBookToCart">
							加入购物车</el-button>
					</div>
				</div>
			</el-col>
		</el-row>

		<h1>相关书籍推荐</h1>
		<el-divider></el-divider>

		<el-row :gutter="20">
			<el-col :span="4" v-for="item in sufferRelativeBooks.slice(0,6)">
				<el-card :body-style="{ padding: '0px' ,margin:'10px', height: '300px',}" shadow="hover">
					<img :src="item.bookPic" class="image" style="width: 200px; height: 200px;">
					<div>
						<h4>{{item.bookName}}</h4>
						<div class="bottom clearfix">
							<h3 style="color: red;">￥{{item.bookPrice}}</h3>
							<el-button type="text" class="button" @click="bookDetail(item)">查看详情</el-button>
						</div>
					</div>
				</el-card>
			</el-col>
		</el-row>

		<h1>相关评价</h1>
		<el-divider></el-divider>
		<el-row>
			<el-col v-for="evaluate in evaluates">
				<el-card class="box-card">
					<div slot="header" class="clearfix">
						<span>用户：{{evaluate.username}}</span>
						<span style="float: right; padding: 3px 0">发布时间：{{evaluate.evaCreateTime}}</span>
					</div>
					<div class="text">
						{{evaluate.evaContent}}
						<el-rate v-model="evaluate.evaStar" disabled style="float: right; padding: 3px 0" show-text
							text-color="#ff9900" score-template="{value}">
						</el-rate>
					</div>
				</el-card>
			</el-col>
		</el-row>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				book: {},
				num: 1,
				relativeBooks: [],
				evaluates:[],
		
			}
		},
		mounted() {
			this.init()
			
		},
		methods: {
			init() {
				this.$post("/book/queryBookById", {
					bookId: this.$route.query.bookId
				}).then(res => {
					this.book = res.data;
					this.getDataByKw(this.book.subcategoryName);
					this.getEvaluates();
				})
			},
			handleChange() {
				console.log(num);
			},
			goBuyPage() {
				var info = {
					bookId:this.book.id,
					num: this.num,
					userId:this.$store.state.userId,
				};
				console.log(info);
				this.$router.push({
					path: "/customer/buy",
					query: {
						info: info,
						type :"bookdetail"
					}
				})
			},
			addBookToCart() {
				console.log(this.num* this.book.bookPrice);
				this.$post("/cart/addToCart", {
					customerId:this.$store.state.userId,
					bookId:this.book.id,
					cartQuantity: this.num,
					cartAmount: this.num * this.book.bookPrice,
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
			bookDetail(item) {
				console.log(item);
				this.$router.push({
					path: '/customer/bookdetail',
					query: {
						bookId: item.id
					}
				});
				this.init();
			},
			getDataByKw(kw) {
				this.$post("book/queryBookVOByKw", {
					kw: kw
				}).then(res => {
					this.relativeBooks = res.data;
				}).catch(err => {
					console.log(err);
				})
			},getEvaluates(){
				this.$post("evaluate/queryEvaluateByBookId", {
					bookId:this.book.id
				}).then(res => {
					this.evaluates = res.data;
				}).catch(err => {
					console.log(err);
				})
			}
		},
		computed: {
			sufferRelativeBooks() {
				const shuffle = items => items.sort(() => Math.random() - 0.5);
				return shuffle(this.relativeBooks);
			}
		},
	}
</script>

<style scoped>
	.text {
		font-size: 14px;
	}

	.box-card {
		margin: 10px;
	}

	.book_box {
		height: 500px;
	}

	.book_img {
		margin: 10px;
		width: 450px;
		height: 480px;
		float: left;
	}

	.book_buy {
		margin: 10px;
		width: 750px;
		height: 480px;
		float: right;
		padding: 1px;
	}

	.book_buy_content {
		border: 1px #f3f0e9 solid;
		border-radius: .5em;
		padding: 5px;
	}

	.book_content {
		margin: 10px auto;
		width: 740px;
		max-height: 120px;
		line-height: 35px;
		border-radius: .5em;
	}

	.book_name {
		margin: 10px auto;
		width: 740px;
		line-height: 35px;
		font-size: 25px;
		overflow: hidden;

	}

	.book_list_content {
		width: 32%;
		display: inline-block;
		height: 20px;
		overflow: hidden;
		line-height: 20px;
		font-size: 15px;
		padding: 5px;
	}

	.book_buy_info {
		width: 100%;
		line-height: 40px;
		font-size: 15px;
		padding: 5px;
	}

	.book_buy_price {
		background-color: #f3f0e9;
		padding: 5px;
	}

	.labelSpan {
		color: #999;
	}

	.labelPrice {
		color: #9d232c;
		font-size: 17px;
	}

	.plainBtn {
		width: 150px;
		color: #9d232c;
		background-color: #f3f0e9;
		border: 1px #f3f0e9 solid;
	}

	.plainBtn:hover {
		background-color: white;
		color: #9d232c;
		border: 1px #b2bac2 solid;
	}

	.cartBtn {
		width: 150px;
		background-color: #9d232c;
		border: 1px #9d232c solid;
	}

	.cartBtn:hover {
		background-color: #f52b21;
	}
</style>
