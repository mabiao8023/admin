<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true">
				<el-form-item>
					<el-button type="primary" size="big" @click="handleAdd">新增测试题目</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table border :data="testList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="测试id" width="100">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="300">
			</el-table-column>
			<el-table-column prop="img" label="图片" width="200">
				<template scope="scope">
					<img width="100%" style="vertical-align:middle;" :src="scope.row.img" alt="">
				</template>
			</el-table-column>
			</el-table-column>
			<el-table-column label="答案" prop="answers" width="auto">
				<template scope="scope">
					<el-row :span="24"
						v-for="(item,index) in scope.row.answers"
					>
						{{index+1}} -- {{item}}
					</el-row>
				</template>	
			</el-table-column>
			<el-table-column label="操作" width="150">
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
		<el-dialog title="编辑测试题目" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="标题" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
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
				<el-form-item label="答案">
					<el-row style="margin-bottom:10px;" v-for="(item,index) in editForm.answers">
						<el-col class="mr20" :span="18">
							<el-input v-model="editForm.answers[index]" ref="answerInput" :key="index" auto-complete="off"></el-input>
						</el-col>
						<el-col v-if="index >= 1" :span="4">
							<el-button type="danger" @click.stop="deleEditAnswer(index)">删除{{index}}</el-button>
						</el-col>
					</el-row>

					<el-row>
						<el-button type="primary" @click.native.stop="editForm.answers.push('') ">新增答案</el-button>
					</el-row>
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
				<el-form-item label="答案">
					<el-row style="margin-bottom:10px;" v-for="(item,index) in addForm.answers">
						<el-col class="mr20" :span="18">
							<el-input v-model="addForm.answers[index]" ref="answerInput" :key="index" auto-complete="off"></el-input>
						</el-col>
						<el-col v-if="index >= 1" :span="4">
							<el-button type="danger" @click.stop="deleEditAnswer(index)">删除{{index}}</el-button>
						</el-col>
					</el-row>

					<el-row>
						<el-button type="primary" @click.native.stop="addForm.answers.push('') ">新增答案</el-button>
					</el-row>
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
	import { getQuestionList,addQuestionList,editQuestionList,removeQuestionList } from '../../api/api';

	export default {
		data() {
			return {
				testList:[],	
				//编辑界面数据
				editForm: {
					id: 0,
					title: '',
					img:'',
					desc:'',
					answers:[]
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
					img:'',
					desc:'',
					answers:['默认']
				},
				editFormRules:{},
				addFormRules:{},
			}
		},
		methods: {


			getClassChapter(){
				this.listLoading = true;
				getQuestionList().then( res => {
					this.testList = res.data.data.questionList;
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
					removeQuestionList(para).then((res) => {
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
					img:'',
					desc:'',
					answers:['默认']
				}
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						console.log(this.$refs.answerInput);
						this.$refs.answerInput.forEach((val,index) => {
							if(val.value){
								this.editForm.answers[index] = val.value;
							}
						}) 
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							editQuestionList(para).then((res) => {
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
							addQuestionList(para).then((res) => {
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
			deleEditAnswer(index){
				console.log(index);
				this.editForm.answers.splice(index,1)
			}
		},
		mounted() {
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
	.mr20{
		margin-right:20px;
	}
</style>	