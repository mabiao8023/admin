<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item>
					<el-select v-model="filtersValue" placeholder="请选择">
				    <el-option
				      v-for="item in filtersOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				  </el-select>
				</el-form-item>	
				<el-form-item v-if="filtersValue == 'testTime'">
					<el-date-picker
				      v-model="filters.name"
				      type="datetimerange"
				      range-separator="至"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期">
				    </el-date-picker>
				</el-form-item>
				<el-form-item v-else>
					<el-input v-model="filters.name" placeholder="请输入对应内容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getOrderList">查询</el-button>
				</el-form-item>
				<!-- <el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item> -->
			</el-form>
		</el-col>

		<!--列表-->
		<el-table border :data="testUserList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="id" label="#id" width="80">
			</el-table-column>
			<el-table-column prop="userId" label="用户id" width="100">
			</el-table-column>
			<el-table-column prop="userName" label="用户昵称" width="100">
			</el-table-column>
			<el-table-column prop="testId" label="测试id" width="100">
			</el-table-column>
			<el-table-column prop="testTitle" label="测试名称" min-width="100">
			</el-table-column>
			<el-table-column prop="testAnswerTitle" label="测试答案标题" width="100">
			</el-table-column>
			<el-table-column prop="testAnswerImg" label="测试标准答案" min-width="150" sortable>
			<template scope="scope">
					<img width="100%" style="vertical-align:middle;" :src="scope.row.testAnswerImg" alt="">
				</template>
			</el-table-column>
			<el-table-column prop="channel" label="渠道来源" width="120" sortable>
			</el-table-column>
			<el-table-column prop="testTime" label="测试时间" min-width="180" sortable>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<!-- <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button> -->
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="text-align:center;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getTestUserList } from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					id: '',
					time:''
				},
				filtersValue:'testId',
				filtersOptions:[
					{
						label:'测试id',
						value:'testId'
					},
					{
						label:'用户名',
						value:'userName'
					},
					{
						label:'测试名称',
						value:'testTitle'
					},
					{
						label:'渠道来源',
						value:'channel'
					}
					,
					{
						label:'测试时间',
						value:'testTime'
					}
				],
				testUserList:[],
				// users: [],
				total: 0,
				page: 1,
				listLoading: false,
			}
		},
		methods: {
			handleCurrentChange(val) {
				this.page = val;
				this.getOrderList();
			},
			//获取用户列表
			getOrderList() {

				// todo:增加过滤参数
				let para = {
					page: this.page,
				};
				para[this.filtersValue] = this.filters.name
				this.listLoading = true;
				//NProgress.start();
				getTestUserList(para).then((res) => {
					this.total = res.data.total;
					this.testUserList = res.data.testUserList;
					this.listLoading = false;
					//NProgress.done();
				});
			},
		},
		mounted() {
			this.getOrderList();
		}
	}

</script>

<style scoped>

</style>