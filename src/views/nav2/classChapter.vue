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
		<el-table border :data="chapterList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="#id" width="100">
			</el-table-column>
			<el-table-column prop="chapter_id" label="章节id" width="100">
			</el-table-column>
			<el-table-column prop="type" label="类型" width="100">
				<template scope="scope">
					{{ scope.row.resource_type == 0 ? '视频' : '文章'  }}
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="100">
			</el-table-column>
			<el-table-column prop="desc" label="描述" width="auto">
			</el-table-column>
			<el-table-column prop="img" label="图片" width="100">
				<template scope="scope">
					<img width="100%" style="vertical-align:middle;" :src="scope.row.img_url" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="lesson_no" label="第几课" width="100">
			</el-table-column>
			<el-table-column label="内容" width="auto">
				<template scope="scope">
					<el-button type="success" @click.stop="showDetail(scope.row)">查看详情</el-button>
				</template>
			</el-table-column>
			<!--<el-table-column label="内容" width="auto">-->
				<!--<template scope="scope">-->
					<!--视频和文章-->
					<!--<br>-->
					<!--请点击编辑查看-->
				<!--</template>-->
			<!--</el-table-column>-->
			<el-table-column label="操作" width="200">
				<template scope="scope">
					<!--<el-col :span="12">-->
						<!--<el-button class="btn" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>-->
					<!--</el-col>-->
					<el-col :span="24">
					<el-button type="danger" class="btn" size="small" @click="handleDel(scope.row)">删除</el-button>
					</el-col>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog v-loading.body="addLoading" title="详情页面" v-model="editFormVisible" :close-on-click-modal="false">
			<div class="container">
				<video v-if="editForm.resource_type == 0 && editFormVisible" class="view-cover"
					   autoplay="autoplay"
					   controls
					   :src="editForm.resource.media_url"
					   @play="handleEditFormPlay"
					   id="my-video4">
					<p>您的浏览器不支持该视频播放，请升级或者更换浏览器观看</p>
				</video>
				<div v-else class="content">
					<img   class="banner" :src="editForm.resource.img_url" alt="">
					<p>
						{{ editForm.resource.content }}
					</p>
				</div>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog v-loading.body="addLoading" title="新增课程" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="类型" prop="title">
					<el-radio-group v-model="addForm.resource_type">
						<el-radio :label="0">视频</el-radio>
						<el-radio :label="1">文章</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="第几课" prop="title">
					<el-input-number v-model="addForm.lesson_no" auto-complete="off"></el-input-number>
				</el-form-item>
				<el-form-item label="标题" prop="title">
					<el-input v-model="addForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述"  prop="desc">
					<el-input v-model="addForm.desc" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片">
					<img v-if="addForm.img_url" class="banner" :src="addForm.img_url" alt="">
					<input type="file" ref='addFormFile' @change="httpUpload($event,'addForm')">
					<el-button v-if='addForm.img_url' type="danger" @click.native="delImage('addForm')">删除上传的图片</el-button>
				</el-form-item>
				<el-form-item v-if="addForm.resource_type == 0" label="视频">
					<video v-if="addForm.resource.media_url && addFormVisible" class="view-cover"
						   autoplay="autoplay"
						   controls
						   :src="addForm.resource.media_url"
						   @play="handleAddFormPlay"
						   id="my-video3">
						<p>您的浏览器不支持该视频播放，请升级或者更换浏览器观看</p>
					</video>
					<input type="file" @change="httpVideoUpload($event,'addForm')">
				</el-form-item>

				<el-form-item v-if="addForm.resource_type == 1" label="文章图片">
					<img v-if="addForm.resource.img_url" class="banner" :src="addForm.resource.img_url" alt="">
					<input type="file" @change="httpArticleUpload($event,'addForm')">
				</el-form-item>
				<el-form-item v-if="addForm.resource_type == 1" label="文章内容">
					<el-input v-model="addForm.resource.content"  type="textarea" auto-complete="off"></el-input>
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
	import { uploadFile,uploadVideo,getClassChapterList,addClassChapterList,editClassChapterList,removeClassChapterList } from '../../api/api';

	export default {
		data() {
			return {
				chapterId:1, // 章节id
				classId:1, // 课程id
				chapterList:[],	
				//编辑界面数据
				editForm: {
					id: 0,
                    chapter_id:0,
                    resource_type:0,
					title: '',
					desc: '',
                    img_url:'',
                    lesson_no:'',
                    resource:{
                        resource_id:1,
                        media_url:'',
                        title:'',
                        img_url:'',
                        content:'',
                        media_time:0
					}
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
                    chapter_id:0,
                    resource_type:0,
                    title: '',
                    desc: '',
                    img_url:'',
                    lesson_no:'',
                    resource:{
                        resource_id:1,
                        media_url:'',
                        title:'',
                        img_url:'',
                        content:'',
                        media_time:0
                    }
				},
				editFormRules:{},
				addFormRules:{},
			}
		},
		methods: {
			// 删除图片
			delImage(type){
				this[type].img_url = '';
				this.$refs[type + 'File'].value = '';	
			},
            // 获取视频时长
            handleEditFormPlay(event){
                let target = event.target;
                this.editForm.resource.media_time = target.duration;
                console.log(this.addForm.resource.media_time);
            },
            // 获取视频时长
            handleAddFormPlay(event){
                let target = event.target;
                this.addForm.resource.media_time = target.duration;
                console.log(this.addForm.resource.media_time);
            },
            showDetail(row){
                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
		    // 上传图片
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
            httpArticleUpload(event,type){
                let file = event.currentTarget.files[0];
                let form = new FormData();
                form.append('file',file);
                this.addLoading = true;
                uploadFile(form).then( res => {
                    this.addLoading = false;
                    // 复制当前的url
                    this[type].resource.img_url = res.path;
                }).catch( e => {
                    this.addLoading = false;
                    this.$message({
                        message: e,
                        type: 'error'
                    });
                } );
            },
            // 上传视频
            httpVideoUpload(event,type){
                let file = event.currentTarget.files[0];
                let form = new FormData();
                form.append('file',file);
                this.addLoading = true;
                uploadVideo(form).then( res => {
                    this.addLoading = false;
                    console.log(res);
                    // 复制当前的url
                    this[type].resource.resource_id = res.resource_id;
                    this[type].resource.media_url = res.path;
                }).catch( e => {
                    this.addLoading = false;
                    this.$message({
                        message: e,
                        type: 'error'
                    });
                } );
            },

			getClassChapter(){
				let para = {
				    class_id:this.classId,
                    chapter_id:this.chapterId
				};
				this.listLoading = true;
				getClassChapterList(para).then( res => {
					this.chapterList = res.list;
					this.listLoading = false;
				})
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
				    id:this.classId,
                    chapter_id: this.chapterId,
                    img_url:'',
                    resource_type: 0,
                    title:'',
                    lesson_no:'',
                    desc: '',
                    resource: {
                        resource_id:1,
                        media_url:'',
                        title:'',
                        img_url:'',
                        content:'',
                        media_time:0
                    },
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
                            para.resource_data = this.addForm.resource;
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
		},
		mounted() {
			this.chapterId = this.$route.params.id;
			this.classId = this.$route.params.classId;
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
	.banner{
		max-width:400px;
		border:1px solid #ccc;
		border-radius:10px;
	}
	.view-cover{
		width:400px;
		border:1px solid #aaa;
		border-radius:10px;
		overflow: hidden;
	}
</style>	