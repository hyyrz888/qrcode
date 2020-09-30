<template>
	<div class="codeAllInfo">
	
		<Row :gutter="16">
				<Col span="18">
					<div class="codeLeft">
						<Row class="bg-white mb-3 navWarp">
						        <Col span="6">
									 <Card>
										<router-link to="11">
												<div class="text-center leftItem">
												<p class="mb-1 ffcur text-secondary">活码 ></p>
											    <h3 class="text-dark font-weight-normal">8</h3>
											</div>
										</router-link>
									    </Card>
								</Col>
						        <Col span="6">
									<Card>
										<router-link to="11">
									       <div class="text-center leftItem">
									           <p class="mb-1 ffcur text-secondary">表单 ></p>
									           <h3 class="text-dark font-weight-normal">7</h3>
									       </div>
										</router-link>
									   </Card>
								</Col>
						        <Col span="6">
									<Card>
										<router-link to="11">
									       <div class="text-center leftItem">
									           <p class="mb-1 ffcur text-secondary">我的快速模板 ></p>
									           <h3 class="text-dark font-weight-normal">7</h3>
									       </div>
										 </router-link>
									   </Card>
								</Col>
						        <Col span="6">
									<Card>
										<router-link to="11">
									       <div class="text-center leftItem">
									           <p class="mb-1 ffcur text-secondary">网址活码 ></p>
									           <h3 class="text-dark font-weight-normal">7</h3>
									       </div>
										</router-link>
									   </Card>
								</Col>
						 </Row>
						  <Card class="card1">
						         <p slot="title">
						             <strong class="f16">最近更新二维码</strong> <small>共14个</small>
						         </p>
								
						         <div  slot="extra" @click.prevent="changeLimit">
									   <Input suffix="ios-search" placeholder="Enter text" style="width: auto" />
									   <Button type="primary" ghost class="createNewTp">模板新建</Button>
									   <Button type="info">空白新建</Button>
						         </div>
								 
								 <Card class="card2">
								        <p slot="title" class="tagSelector">
											<Checkbox-group v-model="tableColumnsChecked" @on-change="changeTableColumns">
												<span>标签：</span>
												<Checkbox label="all" checked>All</Checkbox>
												<Checkbox label="333">333</Checkbox>
												<Checkbox label="signin">Signin</Checkbox>
											</Checkbox-group>
								        </p>
										<!-- 标签选择 -->
										<p slot="extra">
											<Icon type="ios-settings" class="poi" />
										</p>
								</Card>
								
								<!-- 历史二维码记录 -->
						         <Table :columns="codeColums" :data="recentCodeDataList" border>
									 
									    <template slot-scope="{ row, index }" slot="image">
									      <div @click="showImg(row.codeImg,row.name)" class="ImgZoom bde"><img :src="row.codeImg" alt="" width="80" style="margin:5px auto;opacity: .6;"></div>
									     </template>
										 
										 <template slot-scope="{ row, index }" slot="name">
										    <span>{{ row.name }}</span>
										  </template>
										  
										  <template slot-scope="{ row, index }" slot="type">
										     <span>{{ row.type }}</span>
										   </template>
										   
										   <template slot-scope="{ row, index }" slot="date">
										      <span>{{ row.date }}</span>
										    </template>
											
											<template slot-scope="{ row, index }" slot="tag">		
											
												<Tag closable v-for="(item,index) in row.tag" :key="item" :name="item" @on-close="handleClose(index)">{{item}}</Tag>
												 <Button icon="ios-add" type="dashed" size="small" @click="handleAdd(index)"></Button>
											 </template>
									 
											<template slot-scope="{ row, index }" slot="scan">
												{{row.scan}}
											</template>								
											
											<template slot-scope="{ row, index }" slot="actions">
												<Tooltip content="下载" placement="top-start" theme="light">
												         <a href=""><Icon type="md-download" size="20" /></a>
												</Tooltip>
												<Divider type="vertical" />
													 <Tooltip content="预览" placement="top-start" theme="light">
													    <a href=""><Icon type="md-eye" size="20" /></a> 
													 </Tooltip>
													<Divider type="vertical" />
													<Poptip placement="top" trigger="hover">
													     <Icon type="ios-more" size="20" />
													        <div class="moreTools" slot="content">
													          <a href="">当前所在目录</a>
															  <a href="">二维码详情</a>
															  <Divider size="small" class="divider"></Divider>
															  <a href="">二维码美化</a>
															  <a href="">二维码统计</a>
															   <Divider size="small" class="divider"></Divider>
															  <a href="">重命名</a>
															  <a href="">复制</a>
															  <a href="">删除</a>
													        </div>
													</Poptip>
													<Divider type="vertical" />
													<Tooltip content="编辑" placement="top-start" theme="light">
													    <a href=""><Icon type="ios-construct" size="20" /></a>
													</Tooltip>
													<Divider type="vertical" />
													<Tooltip content="数据导出" placement="top-start" theme="light">
													   <a href=""><Icon type="md-document" size="20" /></a> 
													</Tooltip>
											</template>

								 </Table>
								 
						     </Card>
					</div>
				</Col>
				<Col span="6">
					<div class="codeRight">
						<div class="comWrap flex justify-between align-center">
							<div class="left">
								<div class="title font-weight-bold f16 mb-2">
									中国邮政储蓄银行
								</div>
								<div class="subTitle">
									企业待填写
								</div>
							</div>
							<div class="right poi" @click="toAuth">
								<img src="../assets/images/logo-small.png" alt="">
								<p class="text-danger f12"><Icon type="md-thumbs-up" /> 未认证</p>
							</div>
						</div>
						
						<Account></Account>
					</div>
				</Col>
		</Row>
		
		<!--图片modal-->
		<Modal v-model="imgModal" :title="ImgObj.imgTitle" footer-hide>
			<div class="text-center">
				<img :src="ImgObj.imgSrc" :alt="ImgObj.imgTitle" class="mb-2">
				<br />
				<Button type="primary" @click="download"  size="large"><Icon type="md-download"/>下载</Button>
			</div>
			
		</Modal>
		<!--添加tag-->
		 <Modal  v-model="tagModal" title="输入标签名">
		         <Form :model="tagForm" :label-width="80" ref="tagFormRef" :rules="tagValidate">
		                <FormItem label="标签名" prop="input">
		                    <Input v-model="tagForm.input" placeholder="输入标签名"></Input>
		                </FormItem>
				</Form>
				
				<div slot="footer">
						<Button type="primary" @click="handleSubmit('tagFormRef')">确认</Button>
						<Button @click="handleReset('tagFormRef')"  style="margin-left: 8px">取消</Button>
				</div>
		</Modal>
	</div>
</template>

<script>
	import expandRow from '@/components/common/table/table-expand.vue';
	import Account from './HomeChildComps/Account.vue'
	export default{
		name:'Control',
		 components: { 
			 expandRow,
			 Account
		 },
		 data () {
		            return {
						tagModal:false,
						imgModal:false,
						tagForm:{
							input:''
						},
						ImgObj:{
							imgTitle:'',
							imgSrc:'', //大图展示的图片地址
						},
						tagValidate: {
						    input: [
						         { required: true, message: '输入标签名', trigger: 'blur' }
						    ],
						},
						tableColumnsChecked:['all'],
		                codeColums: [
							// {
								
							// 	type:'index',
							// 	title:'序号',
							// 	align:'center',
							// 	width:'70px'
							// },
							 {
							                        type: 'expand',
							                        width: 50,
							                        render: (h, params) => {
							                            return h(expandRow, {
							                                props: {
							                                    row: params.row
							                                }
							                            })
							                        }
							},
							{
								
								title:'图片',
								slot:'image'
								// align:'center',
								// key:'codeImg',
								// render:(h,params)=>{
								// 	return h('img',{
								// 			　attrs: {
								// 			　　src:params.row.codeImg,
								// 				width:50,
								// 			　},
								// 			style:{
								// 				'margin':'10px auto',
								// 				'display':'block'
								// 			}
								// 		})
								// }
							},
		                    {
		                        title: '二维码名称',
		                        key: 'name',
								slot:'name'
		                    },
		                    {
		                        title: '类型',
		                        key: 'type',
								width:"88px",
								slot:'type'
		                    },
		                    {
		                        title: '创建时间',
		                        key: 'date',
								slot:'date'
		                    },
							{
							    title: '标签',
							    key: 'tag',
								slot:'tag'
		// 						render:(h,params)=>{
		// 							let tagData = params.row.tag;
		// 							try{
										
		// 								if(!Array.isArray(tagData)) {
		// 									throw '数据格式不正确'
		// 								}
											
		// 							}catch(err){
		// 								console.log(err)
		// 							}
		// 							console.log(tagData)
		// 							// for(let i =0;i<tagData.length;i++){
		// 							// 	return h('Tag',{
		// 							// 			props:{
		// 							// 				color:'blue',
		// 							// 			}
		// 							// 		},tagData[i])
		// 							// 	}
		// 							return h('Tag',{
		// 									props:{
		// 										color:'blue',
		// 									}
		// 								},{
		// 									tagData
		// 								})
										
								
									
		// 							return h('div',[
		
		// 								h('Button',{
		// 									props:{
		// 										icon:'ios-add',
		// 										size:'small',
		// 										type:'dashed',
		// 									},
		// 									on:{
		// 										click:()=>{
		// 											console.log(params)
		// 										}
		// 									}
		// 								})	
		// 							])
		// 						}
							},
		                    {
		                        title: '总扫描量',
		                        key: 'scan',
								slot:'scan'
		                    },
							{
							    title: '操作',
								slot:'actions',
							 //    key: 'Actions',
								// align: 'center',
								 width:"210",
								 style:{
									  marginLeft: '5px'
								 }
								//  render: (h, params) => {
								//     return h('div', [
										
								//          h('Button', {
								//          props: {
								//             type: 'success ghost',
								// 			size:'small'
								//          },
								//          style: {
								//               marginRight: '5px',
								//          },
								//         on: {
								//             click: () => {
								//                 this.show(params.index)
								//              }
								//          }
								//      }, '下载'),
								//             h('Button', {
								//                 props: {
								//                      type: 'dashed',
								// 					 size:'small'
								//                     },
								// 					style: {
								// 					     marginRight: '5px'
								// 					},
								//          on: {
								//             click: () => {
								//         this.remove(params.index)
								//                                         }
								//                                     }
								//                                 }, '预览'),
								// 		    h('Button',{
								// 				props:{
								// 					type:'info',
								// 					size:'small'
								// 				},
								// 				style: {
								// 				     marginRight: '5px'
								// 				},
								// 				on:{
													
													
								// 				}
								// 			},"编辑"),
								// 			h('Button',{
								// 				props:{
								// 					type:'info',
								// 					size:'small'
								// 				},
								// 				style: {
								// 				     marginRight: '5px'
								// 				}
								// 			},"更多"),
								// 			h('Button',{
								// 				props:{
								// 						type:'info',
								// 						size:'small'
								// 				}
								// 			},'数据导出')
								//     ]);
								// }
							}
		                ],
		                recentCodeDataList: [
		                    {
		                        name: 'Test',
								codeImg:require('../assets/images/code.png'),
		                        type: "活码",
								tag:[33,44],
		                        date: '09-20',
		                        scan: '3',
								_expanded:true
								
		                    },
		                   {
		                       name: 'Test',
							   codeImg:require('../assets/images/code.png'),
		                       type: "活码",
		                       date: '09-20',
							   tag:[333,444],
		                       scan: '3'
		                   },
						   {
						       name: 'Test',
							   codeImg:require('../assets/images/code.png'),
						       type: "活码",
						       date: '09-20',
							   tag:[333,444],
						       scan: '3'
						   },
						   {
						       name: 'Test',
							   codeImg:require('../assets/images/code.png'),
						       type: "活码",
						       date: '09-20', 
							    tag:[333,444],
						       scan: '3'
						   },
		                ]
		            }
		        },
		methods:{
			toAuth(){
				//跳转到页面
				this.$router.push('/toAuth')
			},
			changeTableColumns(data){
				console.log(data)
			},
			showImg(imgSrc,imgName){
				this.ImgObj.imgSrc = imgSrc;
				this.ImgObj.imgTitle = imgName;
				this.imgModal = true
			},
			handleAdd(index){
				console.log(index)
				this.tagModal = true
			},
			handleClose(index){
				console.log(index)
			},
			//标签新增提交方法
			handleSubmit (name) {
			    this.$refs[name].validate((valid) => {
			        if (!valid) return;
			        this.$Message.success('Success!');
					this.tagModal = false
			    })
			},
			handleReset(name){
				  this.$refs[name].resetFields();
				  this.tagModal = false
			}
		}
	}
</script>

<style lang="less">
	.codeAllInfo{
		.codeLeft{
			.ivu-card{
				&:hover{
						box-shadow: none;
						background-color: #fafafa;
				}
				.leftItem{
					border-right:1px solid #e8e8e8
				}
				&:last-child{
					border-right: 0;
				}
			}
		}
		.codeLeft{
			.navWarp{
				.ivu-card-body{
					padding:30px 0;
				}
			}
			.ivu-card{
				border: 0;
			}
			.card1{
				& > .ivu-card-extra{
					top:9px;
					.createNewTp{
						margin:0 10px;
					}
				}
				.ivu-table-wrapper{
					overflow: unset !important;
				}
				.moreTools{
					z-index: 999;
					a{
						display: block;
						color:#777;
						font-size: 12px;
						margin-bottom: 10px;
						cursor: pointer;
					}
					.divider{
						margin:8px 0;
					}
				}
				.ImgZoom{
					cursor: zoom-in;
					width: 90px;
					margin: 5px auto;
					text-align: center;
					height: 90px;
					&:hover img{
						opacity: 1 !important;
					}
				}
				.card2{
					.ivu-card-head{
						padding-top:0;
						padding-left:0;
						padding-right: 0;
					}
					.ivu-card-extra{
						top:-1px
					}
				}
				
			}

		}
		.codeRight{
			.comWrap{
				background-color: #fff;
				height: 121px;
				padding:0 24px;
				.title{
					color:#333;	
				}
				.subTitle{
					color:#999;
				}
				img{
					width:58px;
					height: 58px;
					border-radius: 4px;
				}
			}
		}
	}
</style>
