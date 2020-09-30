<template>
	<div id="activeCode" class="bg-white">
		<Row>
			<Col :span="4">
				<div class="categoryArticle">
					<div class="title">
						目录<span><small>共7个码</small></span>
					</div>
					<div class="content">
						<div class="scrollWrapper">
							 <Tree :data="categoryData" :render="renderContent" class="category-tree" @on-toggle-expand="selectItem"></Tree>
							 <div class="addCategoryBtnBox text-center">
								 <Button type="primary" ghost @click="addCategory"><Icon type="ios-add" /><span>新建根目录</span></Button>
							 </div>
							 <Poptip :transfer="true">
								 <a href="java:;">click me</a>
								 <div slot="content">
									 <div><a href="">目录汇总</a></div>
									<div><a href="">添加子目录</a></div>
									<div><a href="">重命名</a></div>
									<div><a href="">删除</a></div>
								 </div>
							 </Poptip>
						</div>
					</div>
				</div>
			</Col>
			<Col :span="20">
				b
			</Col>
		</Row>
	</div>
</template>

<script>
	import {selectTextareaRange} from '@/common/util.js'
	export default{
		name:'ActiveCode',
		   data () {
			return {
				isShow:false,
				categoryData: [
					{
						title: '默认目录',
						expand: true,
						selected:true,
						codeNum:7,
						//渲染父级目录
						render: (h, { root, node, data }) => {
							return h('div', {
								attrs:{
									class:'titleNames',
									id:'treeId'+parseInt(Math.random() * 4 * 10000000),
								},
								style: {
									display: 'flex',
									width: '100%',
									justifyContent: 'space-between'
								}
							}, [
								h('div',{
									attrs:{
										class:'titleInfo'
									},
									style:{
										flex:1
									}
								}, [
									h('Icon', {
										style: {
											marginRight: '8px'
										}
									}),
									h('span', data.title)
								]),
								h('div', {  //当前目录有多少二维码
									attrs:{
										class:'count'
									},
									style: {
										fontSize: '12px'
									}
								},[
									h('span',{
										
									},data.codeNum)
								]),
								h('div',{
									attrs:{
										class:'block_inline',
									},	
									style:{
										display:'none'
									},

								},[
									h('poptip',{
										props:{
											transfer: true,
											width:100,
											
										},
										style:{
											'min-width':100
										}
									},[
										//图标
										h('Icon',{
											props:{
												type:'ios-more'
											},
											on: {
												
												click: (e) => { 
													let titName = document.querySelector(".titleNames")
													console.log(titName.className )
													//treeItemHoverLock
													if(titName.className == 'titleNames'){
														titName.classList.add('treeItemHoverLock')
													}else{
														titName.classList.remove('treeItemHoverLock')
													}
												}
											}
										}),

										h('div',{
												class:'moreTips',
												slot:"content"
										},[
											h('div',{
												style:{
													cursor:'pointer',
												}
											},'目录汇总'),
											h('div',{
												style:{
													cursor:'pointer',
												},
												on:{
													click:()=>{
														this.append(data)
													}
												}
											},'添加子目录')
											])
									]),

								])
							]);
						},
						children: [
							{
								title: '未命名目录',
								expand: true,
								id:parseInt(Math.random() * 4 * 10000000)
							}
						]
					}
				],
				buttonProps: {
					type: 'primary',
					size: 'small',
				}
			}
		},
		methods:{
			 renderContent (h, { root, node, data }) {
				 //渲染子目录
				return h('div', {
					attrs:{
						class:'titleNames',
						id:'treeId'+data.id
					},
					style: {
						display: 'flex',
						width: '100%',
						justifyContent: 'space-between'
					}
				}, [
					h('div',{
						attrs:{
							class:'titleInfo'
						},
						style:{
							flex:1
						}
					}, [
						h('Icon', {
							style: {
								marginRight: '8px'
							}
						}),
						h('span', data.title)
					]),
					h('Input',{
						attrs:{
							type:'text',
							value:data.title,
							id:data.id,
							'data-id':data.id,
							'v-if':this.isShow
						},
						props:{
							vIf:this.isShow,
							value:data.title,
							id:data.id,
							'data-id':data.id,
							'v-if':this.isShow
						},
						on:{
							focus:()=>{
								console.log(this)
							}
						}
					}),
					h('div', {  //当前目录有多少二维码
						attrs:{
							class:'count'
						},
						style: {
							fontSize: '12px'
						}
					},[
						h('span',{
							
						},data.codeNum)
					]),
					h('div',{
						attrs:{
							class:'block_inline',
						},	
						style:{
							display:'none'
						},
				
					},[
						h('poptip',{
							props:{
								transfer: true,
								width:100,
								
							},
							style:{
								'min-width':100
							}
						},[
							//图标
							h('Icon',{
								props:{
									type:'ios-more'
								},
								on: {
									
									click: (e) => { 
										let titName = document.querySelector(".titleNames")
										console.log(titName.className)
										//treeItemHoverLock
										if(titName.className == 'titleNames'){
											titName.classList.add('treeItemHoverLock')
										}else{
											titName.classList.remove('treeItemHoverLock')
										}
									}
								}
							}),
				
							h('div',{
									class:'moreTips',
									slot:"content"
							},[
								h('div',{
									style:{
										cursor:'pointer',
									},
									attrs:{
										'data-id':data.id
									}
								},'目录汇总'),
								h('div',{
									style:{
										cursor:'pointer',
									},
									attrs:{
										'data-id':data.id
									},
									on:{
										click:()=>{
											console.log(data)
											this.append(data)
										}
									}
								},'添加子目录'),
								h('div',{
										class:'edit',
										style:{
											cursor:'pointer',
										},
										attrs:{
											'data-id':data.id
										},
										on:{
											click:()=>{
												this.rename(root,node,data)												
											}
										}
									},'重命名'),
								h('div',{
									style:{
										cursor:'pointer',
									},
									class:'delete',
									attrs:{
										'data-id':data.id
									},
									on:{
										click:()=>{
											console.log(root)
											console.log(node)
											this.remove(root,node,data)
										}
									}
									},'删除')
								])
						]),
				
					])
				]);
			},
			append (data) {
				//添加子元素
				const children = data.children || [];
				children.push({
					title: '未命名目录',
					expand: true
				});
				this.$set(data, 'children', children);
			},
			remove (root, node, data) {
				//删除元素
				const parentKey = root.find(el => el === node).parent;  //0
				const parent = root.find(el => el.nodeKey === parentKey).node;
				
				const index = parent.children.indexOf(data);
				console.log(index)
				parent.children.splice(index, 1);
			},
			rename(root,node,data){
				
				console.log(root)
				console.log(node)
				//重命名
				console.log(data)
				var oldname = data.title;
				
				data.title = '命名后'
			},
			addCategory(){
				//添加根目录
				
			},
			selectItem(e){
				console.log(e)
			}
		}

	}
</script>

<style lang="less">
	#activeCode{
		width: 100%;
		height: calc(100vh - 64px - 48px);
		box-shadow: 0 1px 3px 0 rgba(0,0,0,.05);
		border-radius: 2px;
		.categoryArticle{
			   height: calc(100vh - 64px - 48px);
			   border-right: 1px solid #e0e1e3;
			   position: relative;
			   overflow: hidden;
			.content{
				position: relative;
				background-color: #fff;
				overflow: hidden;
				height: calc(100vh - 66px - 94px );
			}
			.scrollWrapper{
				width: 100%;
				padding: 0;
				position: relative;
				z-index: 1;
				height: inherit;
			}
		}
		.title{
			width: 100%;
			background: #fff;
			font-size: 16px;
			color: #000;
			box-sizing: border-box;
			padding: 14px 15px 10px;
			span{
				margin-left: 8px;
				font-size: 12px;
				color: #999;
				font-weight: 400;
			}
		}
		.content{
			.category-tree{
				padding:0 15px;
				position: relative;
				transition: all .3s;
				overflow: hidden;
				.ivu-tree-arrow{
					position: relative;
					z-index: 2;
					top: 6px;
					width: 12px;
				}
				.ivu-tree-title{
					width: 100%;
					line-height:36px;
					height: 36px;
					padding-right: 15px;
					position: relative;
					&:hover{
						background-color: #eaf4fe;
					}
					&:hover::before{
						content: "";
						position: absolute;
						width: 400px;
						height: 36px;
						top: 0;
						left: -100px;
						z-index: -1;
						background-color: #eaf4fe;
					}
					&.ivu-tree-title-selected{
						background-color: #eaf4fe !important;
					}
					&.ivu-tree-title-selected::before{
						position: absolute;
						content:'';
						width:400px;
						top:0;
						left:-160px;
						height: 36px;
						z-index: -1;
						background-color: #eaf4fe;
						border-top: 2px solid transparent;
						border-bottom: 2px solid transparent;
					}
				}
				.ivu-tree-title{
					margin:0;
					&:hover{
						.count{
							display: none;
						}
						.block_inline{
							display: block !important;
							font-size:16px;
						}
					}
					.block_inline{
						i{
							font-size:16px;
						}
					}
					.treeItemHoverLock{
						.count{
							display: none;
						}
						.block_inline{
							display: block !important;
							font-size:16px;
						}
					}
				}
			}
			.addCategoryBtnBox{
				margin: 30px 0;
				font-size: 12px;
				button{
					padding:0 30px;
				}
			}
		}
	}
	.moreTips {
		& > div:hover{
			color:#2d8cf0
		}
		& > div{
			font-size: 12px;
			margin-bottom: 6px;
		}
	}
	[class*="titleNames"]{
		input{
			width: 100px;
			height: 26px;
			    outline: none;
			    border-radius: 6px;
			    margin-top: 5px;
			    border: 1px solid rgb(43, 133, 228);
		}
	}
</style>
