<template>
	<div v-show="visableDetail" id="Detail">
		<Card>
			<div class="headerBox">
				<Breadcrumb>
					<BreadcrumbItem class="poi"><span @click="hideDetail">< 返回表单管理</span></BreadcrumbItem>
				</Breadcrumb>

				<div class="baseinfo">
					<h4 class="mt-3 mb-3">表单名:{{name}}</h4>
					<p class="mb-2">
						编号：
						<span class="text-darkgrey">D6</span>
					</p>
					<p class="mb-2">
						备注：
						<span class="text-darkgrey">-</span>
					</p>
					<p class="mb-2">
						更新字段：
						<time class="text-darkgrey">09-19 10:20</time>
					</p>
					<p class="mb-2">
						包含字段：
						<span class="text-darkgrey">姓名、手机、受访人姓名、来访事由</span>
					</p>
				</div>

				<div class="groupBtn position-absolute">
					<Button>编辑</Button>
					<Button>生成二维码</Button>
					<Dropdown>
						<Button>
							更多
							<Icon type="ios-arrow-down"></Icon>
						</Button>
						<DropdownMenu slot="list">
							<DropdownItem>复制</DropdownItem>
							<DropdownItem>删除</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Button type="primary">预览</Button>
				</div>

				<!--分析-->
				<div class="analysisBox">
					<div class="analysisItem flex align-center">
						<span></span>
						<span>填写数</span>
						<span>填表人数</span>
					</div>
					<div class="analysisItem flex align-center">
						<span>今日</span>
						<span class="number">0</span>
						<span class="number">0</span>
					</div>
					<div class="analysisItem lastItem flex align-center">
						<span>昨日</span>
						<span class="number">0</span>
						<span class="number">0</span>
					</div>
				</div>
			</div>
		</Card>
		<Card>
			<div class="tabsBox">
					 <Tabs value="formData">
					        <TabPane :label="formLabel" name="formData">
								<Card style="border:0;background-color: #f2f2f2;">
									<div class="tabhead">
										填表时间： 
										<Select v-model="formModel" style="width:138px"  transfer class="mr-3">
											<Option v-for="item in dateType" :value="item.value" :key="item.value">{{ item.type }}</Option>
										</Select>
										
										
										<!-- 可以搜索的下拉 -->
										<Select v-model="codeModel" filterable style="width:138px"  transfer>
										                <Option v-for="(item,index) in codeList" :value="item" :key="index">{{ item }}</Option>
										</Select>
	
									</div>
								</Card>
								<Card style="border:0;background-color: #f5f5f5;">
									<div class="tabContent flex justify-between">
										<div class="">
											<span class="f16">表单填写记录</span>  <small>共 1 条</small>
											 <Button type="info" ghost class="ml-3" @click="handleCheckAll" ref="delRef">批量删除</Button>
											 <!--删除选中的对话框-->
											    <Poptip v-model="delSelectModel" confirm :title="confirmTitle" @on-ok="ok"  @on-cancel="cancel" v-if="delShow" transfer ref="confirm1Ref">
											         <Button type="error" ghost  class="ml-2" :disabled="disabled">删除</Button>
											    </Poptip>
										</div>
										<div>
											 <Input search suffix="ios-search" placeholder="搜索记录结果" style="width: auto" class="mr-3" @on-search="onSearch" />
											<Button type="primary" ghost class="mr-3" @click="exportTableData">数据导出</Button>
											
											
										   <Poptip  transfer >
												<a href="javascript:void(0)">隐藏列 <Icon type="ios-arrow-down"></Icon></a>
												 <div slot="title">
								 <Checkbox :indeterminate="indeterminate" :value="checkAll" @click.prevent.native="handleCheckAllGroup">所有列展示(重置)</Checkbox>
												 </div>
												 <div slot="content">
													<CheckboxGroup v-model="allCheckOptions" @on-change="onChange">	
															<Checkbox label="checkRes">检查结果</Checkbox>
															<Checkbox label="jobnum">工号</Checkbox>
															<Checkbox label="lineText">单行文本</Checkbox>
															<Checkbox label="checkRecord">巡检情况记录</Checkbox>
															<Checkbox label="sitePhoto">现场照片</Checkbox>
															<Checkbox label="name">姓名</Checkbox>
															<Checkbox label="mobile">手机</Checkbox>
															<Checkbox label="position">定位</Checkbox>
															<Checkbox label="signature">签名</Checkbox>
															<Checkbox label="relateCode">关联二维码</Checkbox>
															<Checkbox label="res2">记录结果</Checkbox>
															<Checkbox label="recorder">填表人</Checkbox>
															<Checkbox label="recordTime">填表时间</Checkbox>
													</CheckboxGroup>
												 </div>
											 </Poptip>
										 </div>
									</div>
								</Card>
								
								<div v-if="curChooseShow">
									<Alert show-icon>已选择 {{checknum}} 项 <a @click.prevent="delAllCheck">  清空</a></Alert>
								</div>
									 
								<Card>
									 <Table 
										 :columns="formColumns2" 
										 :data="FormColData" border width="100%"  
										 ref="formColRef" 
										 @on-select-all="onSelectAll" 
										 @on-select-all-cancel="onSelectCancel"
										 @on-selection-change= "onSelectChange"
									  >
										
									  </Table>
									  <div style="margin: 10px;overflow: hidden">
									          <div style="float: right;">
									              <!-- <Page :total="100" :current="1" @on-change="changePage"></Page> -->
									          </div>
									      </div>
								</Card>
							</TabPane>
					        <TabPane :label="codeLabel" name="relateCode">
								<Card>
									<div class="tabhead">
										aa
									</div>
								</Card>
								<Card>
									<div class="tabContent">
										nnn
									</div>
								</Card>
							</TabPane>
					        <TabPane :label="recordLabel" name="recorder">
								<Card>
									<div class="tabhead">
										aa
									</div>
								</Card>
								<Card>
									<div class="tabContent">
										nnn
									</div>
								</Card>
							</TabPane>
					 </Tabs>
			</div>


		</Card>
		
	</div>
</template>

<script>
	import myModel from '@/components/common/modal/myModel.vue'
	export default{
		name:'Detail',
		components:{
			myModel
		},
		props:{
			visableDetail:{
				type:Boolean,
				default:false
			},
			dataOpt:{
				type:Object,
				default(){
					return{}
				}
			}
		},
		data(){
			return {
				formCount:1,
				codeCount:2,
				recoderCount:1,
				indeterminate:true,
				checkAll:true,  //是否全选
				checkAllForm:false,
				curChooseShow:false,   //显示/隐藏当前的选中的alert
				delShow:false,   //控制批量删除的显示和隐藏
				checkAllData:'',  //选中的数据存储
				delSelectModel:true,  //所有被选中的行删除
				delSelectOneModel:false, //当前删除所在行被删除
				formLabel: (h) => {
					return h('div', [
						h('span', '表单数据汇总'),
						h('span',`(${this.formCount})`)
					])
				},
				codeLabel: (h) => {
					return h('div', [
						h('span', '关联二维码'),
						h('span',`(${this.codeCount})`)
					])
				},
				recordLabel: (h) => {
					return h('div', [
						h('span', '填表人'),
						h('span',`(${this.recoderCount})`)
					])
				},
				formModel:'all',
				codeModel:'二维码全部',
				dateType:[
					{
						
						type:'全部',
						value:'all'
					},
					{
						type:'昨日',
						value:'yestday'
					},
					{
						type:'今日',
						value:'today'
					},
					{
						type:'近7日',
						value:'week'
					},
					{
						type:'近30日',
						value:'month'
					},
					{
						type:'自定义',
						value:'customday'
					}
				],
				codeList:["二维码全部","设备巡检"],
				formColumns2:[],  //修改后的列项
				allCheckOptions:["checkRes",'jobnum',"lineText","checkRecord","sitePhoto","name","mobile","position","signature","relateCode","res2","recorder","recordTime"],
				FormColData: [
				   {
					No: "L3",
					checkRes: '正常',
					jobnum: '919526400000',
					lineText: '你',
					checkRecord:'检查了',
					sitePhoto:'图片地址',
					name:'彭杨珍',
					mobile:'13813206530',
					position:'湖北省武汉市洪山区白沙四路(清能清江锦城三期-珂园内,清能清江锦城一期-玺园内0米)',
					signature:'手写地址',
					relateCode:'设备巡检',
					res2:'正常',
					recorder:'彭杨珍',
					recordTime:'09-20 16:19'
				  }
				],
			}
		},
		created(){
			//全部选中的项
			//除了第一列和最后一列的所有数据
			// this.FormColumns2.filter(item=> item.key !=='No' && item.key !=='action').forEach(item=>{
			// 	//this.allCheckOptions.push(item.title)
			// })	
			this.onChange();
			console.log('创建之前获取需要展示的数据对象')
			this.name = this.dataOpt.name
		},
		computed:{
			checknum(){
				return this.checkAllData.length
			},
			disabled(){
				//按钮默认禁止状态
				return this.checkAllData.length ? false : true
			},
			confirmTitle(){
				console.log(Boolean(this.checkAllData.length))
				//如果有被选中的数据
				if(this.checkAllData.length){
					let num = this.checkAllData.length
					return "是否删除这" + num +'条记录？'		
				}
			}
		},
		
		methods:{
			hideDetail(){
				console.log('点击了返回')
				this.$emit('tohide')
			},
			handleCheckAll(){
				this.checkAllForm = !this.checkAllForm;
				this.curChooseShow = true
				if(this.checkAllForm){
					console.log(this.$refs.delRef)
					this.$refs.delRef.$el.innerText = '退出批量删除'
				    let newFormColumns = this.formColumns2.unshift({
				        type: 'selection',
				        width: 60,
				        align: 'center'
						})
						console.log(this.checkAll)
				}else{
					this.curChooseShow = false
					this.$refs.delRef.$el.innerText = '批量删除'
					this.formColumns2.shift()
					//退出批量删除取消全选
					this.$refs.formColRef.selectAll(false)
				}
				this.delShow = this.checkAllForm
			},
			getFormColumns(){
				let formColumns = {
					No:{title:'记录编号',key:'No',minWidth:130,width:130},
					checkRes:{title:"检查结果",key:'checkRes',minWidth:130,width:130},
					jobnum:{title:'工号',key:"jobnum",minWidth:200,width:200},
					lineText:{title:'单行文本',key:'lineText',minWidth:130,width:130},
					checkRecord:{title:'巡检情况记录',key:'checkRecord',minWidth:130,width:130},
					sitePhoto:{title:'现场照片',key:'sitePhoto',minWidth:130,width:130},
					name:{title:'姓名',key:'name',minWidth:130,width:130},
					mobile:{title:'手机',key:'mobile',minWidth:130,width:130},
					position:{title:'定位',key:'position',width:600,minWidth:600,tooltip:true,ellipsis:true},
					signature:{title:'签名',key:'signature',minWidth:130,width:130},
					relateCode:{title:'关联二维码',key:'relateCode',minWidth:130,width:130},
					res2:{title:'记录结果',key:'res2',minWidth:130,width:130},
					recorder:{title:'填表人',key:'recorder',minWidth:130,width:130},
					recordTime:{title:'填表时间',key:'recordTime',minWidth:152,width:152},
					action:{title:'操作',key:'action',fixed:'right',minWidth:162,width:162,
						 render: (h, params) => {
							return h('span', [
								h('a',{
									 style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.RowDetail(params.index)
										}
									}
								},'查看详情'),
								h('a',{
									 style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.delRow(params.index)
										}
									}
								},'删除'),
							])
						}
					}
				}
				 let data = [formColumns.No];
				 console.log(data)
				 this.allCheckOptions.forEach(col => data.push(formColumns[col]));
				 return data;
			},
			onChange(v){
				//console.log(v)
				this.formColumns2 = this.getFormColumns()
			},
			onSelectAll(v){
				//全选
				this.checkAllData = v
			},
			onSelectCancel(v){
				//取消全选
				this.checkAllData = v
			},
			onSelectChange(selection){
				//只要选中项发生变化时就会触发
				this.checkAllData = selection
				
				if(this.checkAllData.length ==0){
					//如果没用选中的内容那么隐藏确认框
					console.log(this.$refs.confirm1Ref)
					this.delSelectModel = false
				}
			},
			delAllCheck(){
				//清空所有选择项
				if(this.checkAllForm){
					this.$refs.formColRef.selectAll(false)
				}
			},
			showSelectModel(show){
				this.delSelectModel = show
			},
			showSelectOneModel(show){
				this.delSelectOneModel = show
			},
			onSearch(v){
				//搜索记录
				this.$Message.success('搜索'+v)
				console.log(v)
			},
			exportTableData(){
				//导出数据
				this.$refs.formColRef.exportCsv({
				     filename: this.dataOpt.name,
					  original: false,
					  columns: this.formColumns2.filter((col, index) => index < 14),
					  data: this.FormColData.map(item=>{
						  //去除导出的大数字出现科学计数法的形式：
						   item.jobnum = '\t' + item.jobnum;
						   item.mobile = '\t' + item.mobile
						   return item;
					  })
					  
				 });
			}
		}
	}
</script>

<style lang="less">
	.ivu-card{
		margin-bottom: 16px;
	}
	.groupBtn {
		top: 52px;
		right:16px;
		button {
			margin-left: 8px;
		}
	}
	.analysisBox {
		width: 250px;
		border-radius: 4px;
		background: #f9f9f9;
		position: absolute;
		bottom: 16px;
		right: 16px;
		font-size: 12px;
		padding: 0 6px;
		.analysisItem {
			padding: 6px 6px 6px 12px;
			span {
				flex: 1;
			}
		}
	}
	.ivu-tabs-nav .ivu-tabs-tab{
		font-size: 16px;
	}
	body .ivu-select-item{
		font-size: 12px !important;
	}
	#Detail{
		.ivu-table-body table{
			width: max-content !important;
			min-width: 100%;
			table-layout: unset !important;
		}
	}
</style>
