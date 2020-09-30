<template>
	<div id="template">
		<h3 class="mb-3">表单管理</h3>
		<Card v-if="viewDetail == false">
			<p slot="title">
				表单列表
				<small>共 {{ tpcount }} 条</small>
			</p>
			<div slot="extra" @click.prevent="changeLimit" class="flex">
				<Input suffix="ios-search" placeholder="搜索表单名称、备注或编号" class="mr-2" />
				<Button type="primary" icon="ios-add">新建表单</Button>
			</div>

			<Table :columns="columns" :data="tpData" border highlight-row @on-row-click="rowClick">
				<template slot-scope="{ row, index }" slot="ID">
					<span>{{ row.ID }}</span>
				</template>

				<template slot-scope="{ row, index }" slot="name">
					<span>{{ row.name }}</span>
				</template>

				<template slot-scope="{ row, index }" slot="group">
					<span class="my-2 d-block">{{ row.group }}</span>
				</template>

				<template slot-scope="{ row, index }" slot="writenum">
					<span class="text-primary">{{ row.writenum }}</span>
				</template>

				<template slot-scope="{ row, index }" slot="relatenum">
					<span class="text-primary">{{ row.relatenum }}</span>
				</template>

				<template slot-scope="{ row, index }" slot="recordersNumber">
					<span class="text-primary">{{ row.recordersNumber }}</span>
				</template>

				<template slot-scope="{ row, index }" slot="action">
					<div class="action">
						<a href="javascript:void(0)" @click="toDetail(row)">详情</a>
						<a href="">编辑</a>
						<a href="">数据导出</a>
						<Dropdown transfer>
							<a href="javascript:void(0)">
								更多
								<Icon type="ios-arrow-down"></Icon>
							</a>
							<DropdownMenu slot="list">
								<DropdownItem><a href="javascript:void(0)">生成</a></DropdownItem>
								<DropdownItem><a href="javascript:void(0)">复制</a></DropdownItem>
								<DropdownItem><a href="javascript:void(0)">删除</a></DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</div>
				</template>
			</Table>
		</Card>

		<div class="detailContent position-relative" v-else>
			<Detail :visable-detail="viewDetail" @tohide="tohide" :dataOpt="dataOpt"></Detail>
		</div>
	</div>
</template>

<script>
import Detail from './childComps/Detail.vue';
export default {
	name: 'Template',
	components: {
		Detail
	},
	data() {
		return {
			tpcount: 3,
			viewDetail: false,
			dataOpt:{},
			columns: [
				{
					title: '编号',
					slot: 'ID',
					align: 'center',
					width: 70
				},
				{
					title: '标题',
					slot: 'name',
					align: 'center'
				},
				{
					title: '包含字段',
					slot: 'group',
					align: 'center',
					width: 300
				},
				{
					title: '填写数',
					slot: 'writenum',
					align: 'center'
				},
				{
					title: '关联二维码数',
					slot: 'relatenum',
					align: 'center'
				},
				{
					title: '填写人数',
					slot: 'recordersNumber',
					align: 'center'
				},
				{
					title: '操作',
					slot: 'action',
					align: 'center',
					width: 240
				}
			],
			tpData: [
				{
					ID: 'D6',
					name: '来访登记',
					group: '姓名，手机，受访人姓名，来访事由',
					writenum: 0,
					relatenum: 1,
					recordersNumber: 5
				}
			]
		};
	},
	methods: {
		tohide(v){
			console.log(v)
			this.viewDetail = false
		},
		rowClick(data, index) {
			console.log(data, index);
			this.viewDetail = true;
			this.dataOpt = data;
		},
		toDetail(data) {
			//获取数据
			this.viewDetail = 1;
			console.log(data);
		}
	}
};
</script>

<style lang="less">
#template {
	.ivu-card-extra {
		top: 10px;
	}
	.action {
		a {
			margin-left: 8px;
			text-decoration: underline;
		}
	}
}
.ivu-dropdown-item a {
	font-size: 12px !important;
}
</style>
