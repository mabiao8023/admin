<template>
	<section v-loading="loading">
		<!--新增界面-->
			<el-row class="container"
				v-for="(item,index) in article"
			>
				<el-col :span="18" class="title">
					第{{ index + 1 }}部分
				</el-col>
				<el-col :span="18">
					<el-form :model="item" label-width="80px">
				<el-form-item label="标题" prop="title">
					<el-input v-model="item.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="文本" prop="content">
					<el-input type="textarea" v-model="item.content" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<img v-if="item.img_url" class="banner" :src="item.img_url" alt="">
					<input type="file" :ref="'fileImage' + index" @change="httpUpload($event,index)">
					<el-button v-if='item.img_url' type="danger" @click.native="delImage(index)">删除上传的图片</el-button>
				</el-form-item>	
				<el-form-item label="跳转链接" prop="url">
					<el-input v-model="item.url" auto-complete="off"></el-input>
				</el-form-item>
				</el-form>
			</el-col>	
			<el-col :span="24" class="btn-group">
			<el-button  size="big" type="danger" @click.native="removeClassPart(index)">删除-</el-button>
				<el-button  size="big" @click.native="addClassPart(index)">新增+</el-button>
			</el-col>
			</el-row>
		
			<el-row class="btn-group">
				<el-col :span="6" :offset="6">
					<el-button  size="big" @click.native="cancleModify">取消修改</el-button>
				</el-col>	
				<el-col :span="6">
				<el-button  size="big" type="primary" @click.native="addAllSubmit"
				:loading="addLoading">保存全部</el-button>
				</el-col>	
			</el-row>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { uploadFile,getClassIndex,addClassDetail } from '../../api/api';

	export default {
		data() {
			return {
				classId:'',
				addLoading: false,
				article:[],
				loading:true,
			}
		},
		methods: {
			// 删除图片
			delImage(index){
				this.article[index].img_url = '';
				this.$refs['fileImage' + index].value = '';	
			},
            httpUpload(event,index){
                let file = event.currentTarget.files[0];
                let form = new FormData();
                form.append('file',file);
                uploadFile(form).then( res => {
                    console.log(res);
                    // 复制当前的url
                    this.article[index].img_url = res.path;
                }).catch( e => {
                    this.$message({
                        message: e,
                        type: 'error'
                    });
                } );
            },
			getArticleList(){
                let param = {
                    class_id:this.classId
				};
				getClassIndex(param).then( res => {
				    if(res.length){
                        this.article = res;
					}else{
				        this.article.push({
				        	class_id:this.classId,
                            title:'',
                            content:'',
                            img_url:'',
                            url:'',
						});
					}
					this.loading = false;
				} )
			},
		     removeClassPart(index){
		     	this.$confirm('确认删除吗？')
		          .then( _ => {
		          	this.article.splice(index,1);
		          })
		          .catch(_ => {});
		     },
		     addClassPart(index){
		     	this.article.splice(index+1,0,{
		     		class_id:this.classId,
		     		title:'',
                    content:'',
		     		img_url:'',
			 		url:'',
		     	})
		     },
		     addAllSubmit(){
		     	this.$confirm('确认修改保存吗？')
		          .then( _ => {
		          	this.addLoading = true;
		          	addClassDetail({class_id:this.classId,list:this.article}).then(res => {
		          		this.addLoading = false;
						//NProgress.done();
						this.$message({
							message: '提交成功',
							type: 'success'
						});
						// this.getArticleList();
						this.$router.push({path:'/classList'});
		          	})
		          })
		     },
		     cancleModify(){
		     	this.$router.push({path:'/classList'});
		     },

		},
		mounted() {
		    this.classId = this.$route.params.id;
			this.getArticleList();
			console.log(this.$route);

		}
	}

</script>

<style scoped>
	.container{
		margin:0 40px;
	}
	.title{
		padding:20px 0;
		text-align:center;
		font-size:18px;
	
	}
	.c-title{
		padding:20px;
		font-size:18px;
	}
	.btn-group{
		padding-left:50px;
		margin-bottom:20px;
	}
	.banner{
		max-width:400px;
		border:1px solid #ccc;
		border-radius:10px;
	}
</style>