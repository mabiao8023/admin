<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<!-- <el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item> -->
				<el-form-item>
					<el-button type="primary" size="big" @click="handleAdd">新增课程</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="classlist" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
		<!-- 	<el-table-column type="selection" width="55">
			</el-table-column> -->
			<<!-- el-table-column type="index" width="60">
			</el-table-column> -->
			<el-table-column prop="id" label="课程id" width="80">
			</el-table-column>
			<el-table-column prop="status"  label="状态" width="100">
				<template scope="scope">
					<el-col>
						{{ scope.row.status == 1 ? '正常':'已冻结' }}
					</el-col>
				</template>
			</el-table-column>
			<el-table-column prop="title" label="标题" width="120">
			</el-table-column>

			<el-table-column prop="img_url" label="banner图" width="140">
				<template scope="scope">
					<img class="banner-img" :src="scope.row.img_url">
				</template>
			</el-table-column>
			<el-table-column prop="desc" label="描述" width="200">
			</el-table-column>
			<el-table-column prop="tag" label="标签" width="100">
				<template scope="scope">
					<el-tag type="success">{{scope.row.tag}}</el-tag>	
				</template>
			</el-table-column>
			<el-table-column prop="sold" label="购买人数" min-width="100">
			</el-table-column>
			<el-table-column prop="price" label="价格" min-width="100">
			</el-table-column>
			<el-table-column style="text-align:center;" label="其他配置" width="100">
				<template scope="scope">
					<el-col :span="24">
						<el-button class="btn" type="primary" size="small" @click="goEditClassIndex(scope.row)">课程首页</el-button>
					</el-col>
					<el-col :span="24">
						<el-button class="btn" type="success" size="small" @click="gotoClassDetail(scope.row)">课程章节</el-button>
					</el-col>
					<el-col :span="24">
						<el-button class="btn" type="info" size="small" @click="gotoFreeList(scope.row)">免费列表</el-button>
					</el-col>
				</template>
			</el-table-column>
			<el-table-column label="操作"  width="100">
				<template scope="scope">
					<el-col :span="24">
						<el-button class="btn" type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
					</el-col>
					<el-col :span="24">
						<el-button :type="scope.row.status == 1 ? 'danger' : 'success'" :disabled="scope.row.status == 0" class="btn" size="small" @click="handleDel(scope.row)">{{ scope.row.status == 1?'冻结':'已冻结' }}</el-button>
					</el-col>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col> -->

		<!--编辑界面-->
		<el-dialog title="课程编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="标题" prop="title">
					<el-input v-model="editForm.title" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="描述"  prop="desc">
					<el-input v-model="editForm.desc" type="textarea" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="标签" prop="tag">
					<el-input v-model="editForm.tag" auto-complete="off"></el-input>
				</el-form-item>
				<!-- 上传图片 -->
				<el-form-item label="banner图" prop="banner">
					<img class="banner" v-if="editForm.img_url" :src="editForm.img_url" alt="">
					<input type="file" @change="httpUpload($event,'editForm')">
				</el-form-item>
				<el-form-item label="价格" prop="price">
					<el-input-number v-model="editForm.price" auto-complete="off"></el-input-number>
				</el-form-item>
				<el-form-item label="购买人数" prop="peoples">
					<el-input-number v-model="editForm.sold" auto-complete="off"></el-input-number>
				</el-form-item>
				<el-form-item label="是否可用">
					<el-switch
							v-model="editForm.status"
							on-color="#13ce66"
							off-color="#ff4949"
							on-text="冻结"
							off-text="启用"
							:on-value="1"
							:off-value="0">
					</el-switch>
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
				<el-form-item label="标签" prop="tag">
					<el-input v-model="addForm.tag" auto-complete="off"></el-input>
				</el-form-item>
				<!-- 上传图片 -->
				<el-form-item label="图片" prop="img_url">
					<img v-if="addForm.img_url" class="banner" :src="addForm.img_url" alt="">
					<input type="file" @change="httpUpload($event,'addForm')">
				</el-form-item>
				<el-form-item label="价格" prop="prize">
					<el-input-number v-model="addForm.price" auto-complete="off"></el-input-number>
				</el-form-item>
				<el-form-item label="购买人数" prop="peoples">
					<el-input-number v-model="addForm.sold" auto-complete="off"></el-input-number>
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
	import { getClassList,editClass,addClass,removeClass,uploadFile } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: '',
					title:''
				},
				classlist:[],
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {},
				//编辑界面数据
				editForm: {
					id: 0,
					title: '',
					img_url: '',
					desc: '',
					tag: '',
					sold: 0,
					price:0,
                    status:1,
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
				},
				//新增界面数据
				addForm: {
					id: 0,
					title: '',
					img_url: '',
					desc: '',
					tag: '',
					sold: 0,
					price:0,
					status:1,
				},
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
			getClassList(){
				let para = {
					name:this.filters.title
				}
				this.listLoading = true;
				getClassList({}).then( res => {
					this.classlist = res.list;
					this.listLoading = false;
				} )
			},

			//删除
			handleDel: function (row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { class_id: row.id };
					removeClass(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '已删除',
							type: 'success'
						});
						this.getClassList();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (row) {
				this.editFormVisible = true;
				this.editForm = {
                        class_id: row.id,
                        title: row.title,
                        img_url: row.img_url,
                        desc: row.desc,
                        tag: row.tag,
                        sold: row.sold,
                        price:row.price,
						status:row.status
				};
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
                    id: 0,
                    title: '',
                    img_url: '',
                    desc: '',
                    tag: '',
                    sold: 0,
                    price:0,
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
							editClass(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getClassList();
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
							addClass(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getClassList();
							});
						});
					}
				});
			},
		     goEditClassIndex(row){
		     	this.$router.push({path:`/classIndex/${row.id}`});
		     },
		     gotoClassDetail(row){
		     	this.$router.push({path:`/classDetail/${row.id}`});
		     },
		     gotoFreeList(row){
		     	this.$router.push({path:`/freeList/${row.id}`});
		     },
		},
		mounted() {
			this.getClassList();
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
	.banner{
		max-width:400px;
		border:1px solid #ccc;
		border-radius:10px;
	}
</style>	