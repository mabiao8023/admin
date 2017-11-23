<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" size="big" @click="handleAdd">新增轮播图</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="bannerList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="内容id" width="100">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="200">
			</el-table-column>
			<el-table-column prop="img" label="图片" width="200">
				<template scope="scope">
					<img width="100%" style="vertical-align:middle;" :src="scope.row.img" alt="">
				</template>
			</el-table-column>
			<el-table-column label="跳转链接" prop="link" width="auto">
			</el-table-column>
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<el-col :span="12">
						<el-button class="btn" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
					</el-col>
					<el-col :span="12">
					<el-button type="danger" class="btn" size="small" @click="handleDel(scope.row)">删除</el-button>
					</el-col>
				</template>
			</el-table-column>
		</el-table>

		<!--编辑界面-->
		<el-dialog title="编辑轮播图" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="标题" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<img v-if="editForm.img_url" class="banner" :src="editForm.img_url" alt="">
					<input type="file" @change="httpUpload($event,'editForm')">
				</el-form-item>	
				<el-form-item label="跳转链接">
					<el-input v-model="editForm.link" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增轮播图" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="标题" prop="title">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<img v-if="addForm.img_url" class="banner" :src="addForm.img_url" alt="">
					<input type="file" @change="httpUpload($event,'addForm')">
				</el-form-item>	
				<el-form-item label="跳转链接">
					<el-input v-model="addForm.url" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { uploadFile,getBannerList,addBannerList,editBannerList,removeBannerList } from '../../api/api';

	export default {
		data() {
			return {
				bannerList:[],	
				//编辑界面数据
				editForm: {
					id: 0,
                    title: '',
                    img_url:'',
                    url:'',
				},

				page: 1,
				listLoading: false,

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
		
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					id: 0,
					title: '',
					img_url:'',
					url:'',
				},
				editFormRules:{},
				addFormRules:{},
			}
		},
		methods: {
            httpUpload(event,type){
                let file = event.currentTarget.files[0];
                let form = new FormData();
                form.append('file',file);
                uploadFile(form).then( res => {
                    console.log(res);
                    // 复制当前的url
                    this[type].img_url = res.path;
                }).catch( e => {
                    this.$message({
                        message: e,
                        type: 'error'
                    });
                } );
            },
			getClassChapter(){
				this.listLoading = true;
				getBannerList().then( res => {
					this.bannerList = res.data.data.bannerList;
					this.listLoading = false;
				} )
			},

			//删除
			handleDel: function (row) {
				this.$confirm('删除后不可恢复，确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id,classId:this.classId };
					removeBannerList(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getClassChapter();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
                    id: 0,
                    title: '',
                    img_url:'',
                    url:'',
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							editBannerList(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getClassChapter();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							addBannerList(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getClassChapter();
							});
						});
					}
				});
			},
		    gotoFreeList(row){
		      this.$router.push({path:`/freeList/${row.id}`});
		    }
		},
		mounted() {
			this.chapterId = this.$route.params.id;
			this.classId = this.$route.params.id;
			this.getClassChapter();
		},
	}

</script>

<style scoped>
	.banner-img{
		width:100%;
		height:100%;
		vertical-align:middle;
	}
	.banner{
		max-width:400px;
		border:1px solid #ccc;
		border-radius:10px;
	}
	.btn{
		margin:5px 0;
	}
</style>	