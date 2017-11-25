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
			<el-table-column prop="id" label="章节id" width="100">
			</el-table-column>
			<el-table-column prop="title" label="标题" width="200">
			</el-table-column>
			<el-table-column prop="chapter_no" label="章节顺序" width="200">
			</el-table-column>
			<el-table-column prop="desc" label="描述" width="auto">
			</el-table-column>
			<el-table-column style="text-align:center;" label="其他配置" width="100">
				<template scope="scope">
					<el-col :span="24">
						<el-button class="btn" type="primary" size="small" @click="goClassChapterList(scope.row)">章节列表</el-button>
					</el-col>
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
		<el-dialog title="课程章节编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="标题" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述"  prop="desc">
					<el-input v-model="editForm.desc" type="textarea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="章节顺序"  prop="desc">
					<el-input-number v-model="editForm.chapter_no" auto-complete="off"></el-input-number>
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
				<el-form-item label="标题" prop="title">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述"  prop="desc">
					<el-input v-model="addForm.desc" type="textarea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="章节顺序"  prop="chapter_no">
					<el-input-number v-model="addForm.chapter_no"></el-input-number>
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
	import { getClassChapter,addClassChapter,editClassChapter,removeClassChapter } from '../../api/api';

	export default {
		data() {
			return {
				classId:1,
				chapterList:[],	
				//编辑界面数据
				editForm: {
				    id:1,
                    class_id:this.$route.params.id,
                    title: '',
                    desc: '',
                    chapter_no:1,
				},

				page: 1,
				listLoading: false,

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
		
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					class_id:this.$route.params.id,
					title: '',
					desc: '',
                    chapter_no:1,
				},
				editFormRules:{},
				addFormRules:{},
			}
		},
		methods: {

			getClassChapter(){
				let para = {
					class_id:this.classId
				}
				this.listLoading = true;
				getClassChapter(para).then( res => {
					this.chapterList = res.list;
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
					removeClassChapter(para).then((res) => {
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
                    class_id:this.classId,
                    title: '',
                    desc: '',
                    chapter_no:1,
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
							editClassChapter(para).then((res) => {
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
							addClassChapter(para).then((res) => {
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
			goClassChapterList(row){
				this.$router.push({path:`/classChapter/${row.id}/${this.classId}`})
			},
		    gotoFreeList(row){
		     this.$router.push({path:`/freeList/${row.id}`});
		    }
		},
		mounted() {
			this.classId = this.$route.params.id;
			this.getClassChapter();
		}
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