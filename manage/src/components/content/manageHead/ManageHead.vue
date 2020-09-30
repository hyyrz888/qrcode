<template>
	<div class="header-content flex justify-between align-center">
		<div class="logo">
			<a href=""><img src="@/assets/images/logo.png" alt="" /></a>
		</div>
		<div class="tools">
			
			<div class="flex align-center tools-cont">
				<div><a href="">首页</a></div>
				<div><a href="">帮助</a></div>
				<div class="seachbox">
					 <Input suffix="ios-search" placeholder="输入搜索内容" style="width: 180px" />
				</div>		
				 <div>
					 <Poptip class="poi" trigger="hover" transfer width="300">
						  <Badge :count="10" overflow-count="9" :offset=[20,-8]>
							<Icon type="ios-notifications-outline" />
						 </Badge>
						 <div slot="content" class="ovh">
							 <h5 class="f18 font-weight-bold mb-2">通知中心</h5>
							 <div class="newContentBox">
								 <ul class="noticeInfo scroll-view">
									 <li class="noticeInfoItem mb-2 bbe pb5" v-for="(item,index) in noticeData" :key="index">
										 <a :href="item.url" target="_blank" class="noticeInfoLink" :title="item.title">
											 <span class="time">{{item.date}}</span>
											<span class="text text-truncate">{{item.title}}</span>
										</a>
									 </li>
								 </ul>
								 <a href="javascript:;" @click="loadMore" class="noticeInfoMore textBlue" v-if="staticMore">查看更多</a></div>
								 <Spin v-if="isShow">
								    <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
								</Spin>
						 </div>
					 </Poptip>
				 </div>
				<div class="userbox ml-4 poi"> 
				  <Dropdown transfer>
					<div>
						<Avatar icon="ios-person" shape="square" :src="avatarImg" /><span class="username ml-2">{{username}}</span>
						<Icon type="ios-arrow-down" class="ml-1" />
					</div>
				    <DropdownMenu slot="list" class="header-trigger-min">
					            <DropdownItem><Icon type="ios-contact-outline" /> 个人中心</DropdownItem>
					            <DropdownItem><Icon type="ios-settings-outline" /> 设置</DropdownItem>
								 <DropdownItem><Icon type="ios-trophy-outline" /> 企业认证</DropdownItem> 
					            <DropdownItem class="item-divided"><Icon type="ios-log-out" /> 安全退出</DropdownItem>
					</DropdownMenu>
				  </Dropdown>
				</div>			
			</div>
			
		</div>
	</div>
</template>

<script>
export default {
	name: 'ManageHead',
	data(){
		return{
			isShow:false,
			staticMore:true,
			username:"米点科技",
			avatarImg:'https://i.loli.net/2017/08/21/599a521472424.jpg',
			noticeData:[
				{
					date:'9-10',
					url:'http://www.baidu.com',
					title:'H5中的表单支持跳转到微信小程序填写'
				},
				{
					date:'9-10',
					url:'http://www.baidu.com',
					title:'H5中的表单支持跳转到微信小程序填写'
				}
			]
		}
	},
	methods:{
		loadMore(){
			this.isShow = true
			this.staticMore = false
			let timer = setTimeout(()=>{
				this.noticeData.push(
					{
						date:'9-10',
						url:'http://www.baidu.com',
						title:'H5中的表单支持跳转到微信小程序填写'
					},
					{
						date:'9-10',
						url:'http://www.baidu.com',
						title:'H5中的表单支持跳转到微信小程序填写'
					}
				)
				this.isShow = false
				this.staticMore = true
				clearInterval(timer)
			},1000)
		}
	}
};
</script>

<style lang="less" scoped>
.header-content {
	height:inherit;
	img {
		width: 200px;
		display: block;
		height: 43px;
	}
	.tools{
		.tools-cont{
			& > div{
				a{
					display: block;
				}
				margin-left:20px
			}
		}
	}
}

.newContentBox {
	overflow: hidden;
	  .scroll-view{
		  overflow-y: auto;
		  max-height: 300px;
	  }
	.noticeInfo{
		max-height: 300px;
		.noticeInfoItem{
			.time{
				color:#777
			}
			.noticeInfoLink{
				&:hover{
					.text{
						color:#2d8cf0
					}
				}
			}
			.text{
				display: block;
				color:#454545
			}
		}
	}
	.noticeInfoMore{
		display: block;
		text-align: center;
	}
}

</style>
<style>
	.item-divided{
		margin-top: 5px;
		border-top: 1px solid #e8eaec;
	}
	.ivu-badge-count{
		padding:0 4px;
	}
	.spin-icon-load{
	animation: ani-demo-spin 1s linear infinite;
	}
	@keyframes ani-demo-spin {
	        from { transform: rotate(0deg);}
	        50%  { transform: rotate(180deg);}
	        to   { transform: rotate(360deg);}
	    }
	.spin-col{
		height: 100px;
		position: relative;
		border: 1px solid #eee;
	}
</style>
