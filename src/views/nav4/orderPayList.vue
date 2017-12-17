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
				<el-form-item v-if="filtersValue == 'pay_time'">
					<el-date-picker
				      v-model="filters.time"
				      type="datetime"
				      placeholder="选择日期时间">
				    </el-date-picker>
				</el-form-item>
				<el-form-item v-else>
					<el-input v-model="filters.name" placeholder="请输入对应内容"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getOrderList">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table border :data="orderList" highlight-current-row v-loading="listLoading" style="width: 100%;">
			<el-table-column prop="order_id" label="订单id" width="120">
			</el-table-column>
			<el-table-column prop="user_id" label="用户id" width="100">
			</el-table-column>
			<el-table-column prop="nickname" label="用户昵称" width="150">
			</el-table-column>
			<el-table-column prop="class_id" label="课程id" width="100">
			</el-table-column>
			<el-table-column prop="title" label="课程名称" min-width="180">
			</el-table-column>
			<el-table-column prop="channel_name" label="渠道来源" min-width="180">
			</el-table-column>
			<el-table-column prop="pay_time" label="付款时间" min-width="180" sortable>
			 	<template scope='scope'> 
			 		{{ new Date(scope.row.pay_time*1000).toLocaleString() }}
			 	</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="10" :total="total" style="text-align:center;">
			</el-pagination>
		</el-col>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	import {getOrderPayList} from '../../api/api';

	export default {
		data() {
			return {
				filters: {
					name:'',
					time:new Date(),
				},
				filtersValue:'order_id',
				filtersOptions:[
					{
						label:'订单号',
						value:'order_id'
					},
					{
						label:'用户名',
						value:'nickname'
					},
					{
						label:'课程id',
						value:'class_id'
					},
					{
						label:'渠道来源',
						value:'channel_name'
					}
					// ,
					// {
					// 	label:'付款时间',
					// 	value:'pay_time'
					// }
				],
				orderList:[],
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
				if(this.filtersValue == 'pay_time'){
					this.filters.name = this.filters.time.getTime()/1000;
				}
				// let time = 
				let para = {
					page:this.page,
					key: this.filtersValue,
					value: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getOrderPayList(para).then((res) => {
					this.total = res.total_count;
					this.orderList = res.list;
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