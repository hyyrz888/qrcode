<template>
	<div class="block-account mt-3" dis-hover>
		<Card>
		        <p slot="title">
		           <strong class="f16">账户信息</strong>
		        </p>
		        <a href="#" slot="extra" @click.prevent="changeLimit">
		            <Icon type="ios-loop-strong"></Icon>
		            详情
		        </a>
		        <ul class="account-con">
					<li class="mb-2"><span class="f9">我的账号：</span> <span>13486731033</span></li>
					<li><span class="f9">当前版本：</span> <span>基础版 <small class="f9 poi" @click="showExpiredModal">2020-10-01到期</small></span><span class="float-right"><a href="">续费</a><Divider type="vertical" class="mb-2"></Divider><a href="">升级</a></span></li>
					 <Divider class="mt-3 mb-2" dashed></Divider>
		            <li><span class="f9 text-danger"> 使用情况：</span>
					<div class="progress">
						 <Progress :percent="25" :stroke-width="4" />
						<div class="user-capacity-info f14 f9">
							<span class="f12 mr-2">容量</span>  
							<a class="_question_link f9 mr-1" href="" title="上传图片文件的总容量" target="_blank" id="capacity">
								<Icon type="ios-help-circle-outline" />
							</a> 
							 <span id="capacity-info-text" class="f9 f12 poi" @click="showHelpModal">11.17M / 1G</span>
							 <a href="" class="ml-1 f16 fcc" title="显示最新数据"><Icon type="md-refresh"/></a>
						</div>
						<Progress :percent="25" :stroke-width="4" />
						<div class="user-capacity-info f14 f9">
							<span class="f12 mr-2">音视频流量</span>  
							<a class="_question_link f9 mr-1" href="" title="音视频播放需要消耗的流量" target="_blank" id="media">
								<Icon type="ios-help-circle-outline" />
							</a> 
							 <span id="capacity-info-text" class="f9 f12 poi" @click="showHelpModal">25M / 240G</span>
						</div>
					</div>
					</li>
		        </ul>
		    </Card>
			
			
			<!--有效期弹框-->
			<Modal v-model="ExpiredModal" class-name="expiredModal" :transition-names="['fade']" width="680">
				<div slot="header" class="text-center">
					<p class="font-weight-light f18">你的基础版本 <span class="text-danger">剩余120天</span></p>
					<p class="f13 mt-2 text-darkgrey">到期时间：2020/12/12</p>
				</div>
				<div class="expired-cont">
					<div class="expired_title">到期后将恢复为免费版，账号下所有已生成的二维码依旧能正常扫描，但不再享受付费版专享功能：</div>
					<ul class="expired_advantage"><li>所有二维码底部，将出现么么扫标识；</li><li>到期后新建的二维码将使用二维码展示，加载和转发将显示么么扫Logo；</li><li>网址跳转活码，将出现安全提示页，点击继续访问才能跳转目标网址；</li><li>图片/文件容量限额，恢复为50M，将无法编辑更新二维码；</li><li>不再享受 删码找回、提前审核、1对1专属顾问等服务。</li></ul>
					<p class="mt-2 f12"><a href="" target="_blank" class="text-blue">前往查看付费版本到期后说明</a></p>
				</div>
				<div slot="footer" class="text-center">
					<Button type="primary" ghost>在线咨询</Button>
					 <Button type="primary">立即续费</Button>
				</div>
			</Modal>
			
			<!--helpModal-->
			<Modal v-model="helpModal" class-name="helpModal" width="680">
				<div slot="header">
					<h4 class="text-center">二维码中内容上传容量限额/音视频流量</h4>
				</div>
				<div class="help-cont">
					<img src="@/assets/images/caoliao-vesion-small-new.png" alt="" width="100%" class="mb-3">
					<div class="helpSubtitle">图片/文件容量限额：<span>账号下所有二维码中上传的图片和文件的总容量限额。</span></div>
					<div class="helpSubtitle"><span>手机端填写记录单时，上传的图片不占用容量，上传的音视频总额不限。<a href="" target="_blank">了解记录功能</a></span></div>
					<div class="helpText"><blockquote class="eQuote"><p class="textXs textGrey">因微信小程序功能限制，单个文件/图片上传上限为30M。</p></blockquote></div>
				</div>
				<div slot="footer" class="text-center">
					<Button type="info">立即升级</Button>
				</div>
			</Modal>
	</div>

</template>

<script>
	export default{
		name:'Account',
		data(){
			return{
				ExpiredModal:false,
				helpModal:false
			}
		},
		beforeCreate(){
			fetch('User/getCapacity?user_id=9520571',{
				method: 'POST', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, cors, *same-origin
				headers: new Headers({
				    'Content-Type': 'application/json'
				})
			}).then(res=>{
				console.log(res)
			})
		},
		methods:{
			showExpiredModal(){
				this.ExpiredModal = true
			},
			showHelpModal(){
				this.helpModal = true
			}
		}
	}
</script>

<style scoped lang="less">
	.account-con{
		li{
			
		}
	}

</style>
<style lang="less">
	.ivu-modal-header{
		padding: 20px 15px 15px !important;
	}
	.expiredModal{
		.expired-cont{
			padding: 15px 17px;
			background-color: #f8f8f8;
			.expired_title{
				font-weight: 400;
				margin: 10px 0 5px;
				color:rgba(0,0,0,.87)
			}
			.expired_advantage{
				    
					li{
						position: relative;
						padding-left: 18px;
						line-height: 24px;
						color: rgba(0,0,0,.65);
						 &::before{
							content: "";
						    display: inline-block;
						    width: 6px;
						    height: 6px;
						    background-color: #333;
						    border-radius: 50%;
						    position: absolute;
						    left: 2px;
						    top: 9px;
						    opacity: .7;
					}
			}
		}
	}
}
.helpModal{
	.ivu-modal-content{
		.helpSubtitle{
			position: relative;
			font-size: 14px;
			font-weight: 600;
			color: rgba(0,0,0,.87);
			line-height: 24px;
			 margin-bottom: 10px;
		}
		.helpText{
			font-size: 12px;
			color: #666;
			line-height: 20px;
			margin-bottom: 18px;
		}
		blockquote{
			padding-left: 15px;
			border-left: 5px solid #f0f0f0;
			margin: 0 0 1rem;
			font-weight: 400;
		}
	}
}
</style>
