<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" size="big" @click="handleAdd">新增章节</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="chapterList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="内容id" width="100">
			</el-table-column>
			<el-table-column prop="type" label="类型" width="100">
				<template scope="scope">
					{{ scope.row.type == 1 ? '视频' : '文章'  }}
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="100">
			</el-table-column>
			<el-table-column prop="desc" label="描述" width="auto">
			</el-table-column>
			<el-table-column prop="img" label="图片" width="100">
				<template scope="scope">
					<img width="100%" style="vertical-align:middle;" :src="scope.row.img" alt="">
				</template>
			</el-table-column>
			<el-table-column label="内容" width="auto">
				<template scope="scope">
					点击编辑查看详情
				</template>
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
		<el-dialog title="课程章节内容编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="类型" prop="title">	
					<el-radio-group disabled v-model="editForm.type">
					    <el-radio :label="1">视频</el-radio>
					    <el-radio :label="2">文章</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述"  prop="desc">
					<el-input v-model="editForm.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					 <!--  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>	
				<el-form-item v-if="editForm.type == 1" label="视频">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handleVideoPreview"
					  :on-remove="handleVideoRemove"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					 <!--  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>	
				<el-form-item v-else label="文章内容">
					<el-input v-model="editForm.article"  type="textarea" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增课程" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="类型" prop="type">	
					<el-radio-group v-model="addForm.type">
					    <el-radio :label="1">视频</el-radio>
					    <el-radio :label="2">文章</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述"  prop="desc">
					<el-input v-model="addForm.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handlePreview"
					  :on-remove="handleRemove"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					 <!--  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>	
				<el-form-item v-if="addForm.type == 1" label="视频">
					<el-upload
					  class="upload-demo"
					  action="https://jsonplaceholder.typicode.com/posts/"
					  :on-preview="handleVideoPreview"
					  :on-remove="handleVideoRemove"
					  list-type="picture">
					  <el-button size="small" type="primary">点击上传</el-button>
					 <!--  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
					</el-upload>
				</el-form-item>	
				<el-form-item v-else label="文章内容">
					<el-input v-model="addForm.article"  type="textarea" auto-complete="off"></el-input>
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
	import { getClassChapterList,addClassChapterList,editClassChapterList,removeClassChapterList } from '../../api/api';

	export default {
		data() {
			return {
				chapterId:1, // 章节id
				classId:1, // 课程id
				chapterList:[],	
				//编辑界面数据
				editForm: {
					id: 0,
					type:1,
					title: '',
					desc: '',
					img:'',
					video:'',
					article:''
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
					type:1,
					title: '',
					desc: '',
					img:'',
					video:'',
					article:''
				},
				editFormRules:{},
				addFormRules:{},
			}
		},
		methods: {


			getClassChapter(){
				let para = {
					classId:this.classId
				}
				this.listLoading = true;
				getClassChapterList(para).then( res => {
					this.chapterList = res.data.data.classChapterList;
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
					removeClassChapterList(para).then((res) => {
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
					id: 7,
					classId:this.$route.params.id,
					title: '',
					desc: '',
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
							editClassChapterList(para).then((res) => {
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
							addClassChapterList(para).then((res) => {
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
		    },
		    handleVideoPreview(){

			},
			handleVideoRemove(){

			},
			handlePreview(){

			},
			handleRemove(){

			},
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
	.btn{
		margin:5px 0;
	}
</style>	