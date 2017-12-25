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
		<el-table border :data="testList" highlight-current-row v-loading="listLoading" style="width: 100%;" :default-sort = "{prop: 'ask_no', order: 'ascending'}">
			<el-table-column prop="id" label="题目id" width="100">
			</el-table-column>
			<el-table-column prop="ask_no" label="题目顺序" width="100">
			</el-table-column>
			<el-table-column prop="desc" label="题目描述" width="300">
			</el-table-column>
			<el-table-column prop="img_url" label="题目图片" width="200">
				<template scope="scope">
					<img width="100%" style="vertical-align:middle;" :src="scope.row.img_url" alt="">
				</template>
			</el-table-column>
			<el-table-column label="答案选项" prop="option" width="auto">
				<template scope="scope">
					<el-row :span="24"
						v-for="(item,index) in scope.row.option"
					>
						{{index+1}} -- {{item.desc}}
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
				<el-form-item label="排序">
					<el-input-number v-model='editForm.ask_no'></el-input-number>
				</el-form-item>	
				<el-form-item label="标题" prop="desc">
					<el-input v-model="editForm.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<img v-if="editForm.img_url" class="banner" :src="editForm.img_url" alt="">
					<input type="file" ref='editFormFile' @change="httpUpload($event,'editForm')">
					<el-button v-if='editForm.img_url' type="danger" @click.native="delImage('editForm')">删除上传的图片</el-button>
				</el-form-item>	
				<el-form-item label="答案选项">
					<el-row style="margin-bottom:10px;" v-for="(item,index) in editForm.option">
						<el-col class="mr20" :span="18">
							<el-input v-model="editForm.option[index].desc" ref="answerInput" :key="index" auto-complete="off"></el-input>
						</el-col>
						<el-col v-if="index >= 1" :span="4">
							<el-button type="danger" @click.stop="deleEditAnswer(index)">删除{{index}}</el-button>
						</el-col>
					</el-row>

					<el-row>
						<el-button type="primary" @click.native.stop="editForm.option.push({ask_id:editForm.ask_no,desc:'默认'}) ">新增答案</el-button>
					</el-row>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>
			
		<!--新增界面-->
		<el-dialog title="新增测试题目" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
			<el-form-item label="排序">
					<el-input-number v-model='addForm.ask_no'></el-input-number>
				</el-form-item>	
				<el-form-item label="题目" prop="desc">
					<el-input v-model="addForm.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<img v-if="addForm.img_url" class="banner" :src="addForm.img_url" alt="">
					<input type="file" ref='addFormFile' @change="httpUpload($event,'addForm')">
					<el-button v-if='addForm.img_url' type="danger" @click.native="delImage('addForm')">删除上传的图片</el-button>
				</el-form-item>	
				<el-form-item label="答案">
					<el-row style="margin-bottom:10px;" v-for="(item,index) in addForm.option">
						<el-col class="mr20" :span="18">
							<el-input v-model="addForm.option[index].desc" ref="answerInput" :key="index" auto-complete="off"></el-input>
						</el-col>
						<el-col v-if="index >= 1" :span="4">
							<el-button type="danger" @click.stop="deleAddAnswer(index)">删除{{index}}</el-button>
						</el-col>
					</el-row>
				
					<el-row>
						<el-button type="primary" @click.native.stop="addForm.option.push({desc:'默认'}) ">新增答案</el-button>
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
	import { uploadFile,getQuestionList,addQuestionList,editQuestionList,removeQuestionList,removeQuestionOption } from '../../api/api';

	export default {
		data() {
			return {
				testList:[],
				//编辑界面数据
				editForm: {
                    desc: '',
                    img_url:'',
                    ask_no:1,
                    option:[
                        {
                            desc:'默认',
                        },
                    ],
				},

				page: 1,
				listLoading: false,

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
		
				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				//新增界面数据
				addForm: {
					desc: '',
					img_url:'',
					ask_no:1,
					option:[
					    {
							desc:'默认',
					    },
					],
				},
				editFormRules:{},
				addFormRules:{},
				testId:1,
			}
		},
		methods: {
			// 删除图片
			delImage(type){
				this[type].img_url = '';
				this.$refs[type + 'File'].value = '';	
			},
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
                let data = {
                    test_id:this.testId
				};
				this.listLoading = true;
				getQuestionList(data).then( res => {
					this.testList = res;
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
                    test_id:this.testId,
                    desc: '',
                    img_url:'',
                    option:[
                        {
                            desc:'默认',
                        },
                    ],
				}
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
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
			deleEditAnswer(index){
				let id = this.editForm.option[index].id;
				if(id){
					removeQuestionOption({id:id}).then( res => {
						this.$message({
								message: '删除成功',
								type: 'success'
						});
						this.editForm.option.splice(index,1);
					} ).catch( e => {
						this.$message({
									message: e,
									type: 'success'
						});
					} );		
				}else{
					this.editForm.option.splice(index,1);
				}
			},
            deleAddAnswer(index){
                this.addForm.option.splice(index,1)
			}
		},
		mounted() {
		    this.testId = this.$route.params.id;
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
	.banner{
		max-width:400px;
		border:1px solid #ccc;
		border-radius:10px;
	}
</style>	