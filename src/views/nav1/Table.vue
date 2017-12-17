<template>
	<section>
		<!--工具条-->
		<!-- <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="姓名"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col> -->

		<!--列表-->
		<el-table border :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="用户id" width="120">
			</el-table-column>
			<el-table-column prop="nickname" label="姓名" width="120" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" width="150" :formatter="formatSex" sortable>
				<template scope="scope">
					{{formatSex(scope.row)}}
				</template>
			</el-table-column>
			<el-table-column prop="headimgurl" label="头像" width="100" sortable>
				<template scope="scope">
					<img class="avatar" :src="scope.row.headimgurl" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="channel_id" label="渠道来源" width="120">
			</el-table-column>
			<el-table-column label="地址" width="auto">
				<template scope="scope">
					{{ scope.row.province }} - {{ scope.row.city }}
				</template>
			</el-table-column>
		</el-table>
			
		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserList } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: [],
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列
			}
		},
		methods: {
			//性别显示转换
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;

                getUserList(para).then((res) => {
					this.total = res.total_count;
					this.users = res.list;
					this.listLoading = false;
				});
			}
		},
		mounted() {
			this.getUsers();
		}
	}

</script>

<style scoped>
	.avatar{
		vertical-align: middle;
		width:80px;
		height:80px;
		border-radius:50%;
	}
</style>