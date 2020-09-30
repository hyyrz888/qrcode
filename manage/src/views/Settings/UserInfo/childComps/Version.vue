<template>
	<div class="versionBox bg-white">
		 <Card>
			<h4 slot="title">版本信息</h4>
			<p class="mb-2"><strong>当前版本：</strong><span>基础版(780元/年)</span><span class="ml-3">将于2021-07-02到期</span><a href="">续费</a> <a href="">申请发票</a></p>
			<div class="useProcess flex">
				<strong>使用情况：</strong>
				<div class="rightContent">
					<div class="capacity-content flex">
						<span class="title-span">
							容量
							<Tooltip placement="top" transfer max-width="360">
								<Icon type="ios-help-circle-outline" />
								<div slot="content">
									所有二维码中上传的图片文件的总容量(除记录外) <a href="">了解详情</a>
								</div>
							</Tooltip>
						</span>
						 <Progress :percent="25" :stroke-width="5" hide-info/>
						 <span class="f12 text-darkgrey ml-2 progress-text">11.17M/1G</span>
					</div>
					<div class="capacity-content flex">
						<span class="title-span">音视频流量
							<Tooltip placement="top" transfer max-width="360">
								<Icon type="ios-help-circle-outline" />
								<div slot="content">
									音视频播放需要消耗的流量(包括记录音视频) <a href="">了解详情</a>
								</div>
							</Tooltip>
						</span>
						 <Progress :percent="25" :stroke-width="5" hide-info />
						 <span class="f12 text-darkgrey ml-2 progress-text">24.35M/240G</span>
					</div>
					<div class="capacity-content">
					<span class="title-span">协作成员人数</span><span class="f9">(仅旗舰版以上可用)</span></div>
					<div class="capacity-content">
					<span class="title-span">子管理员人数</span><span class="f9">(仅高级版以上可用)</span></div>		
				</div>
	
			</div>
		</Card>
	</div>
</template>

<script>
	export default{
		name:'Version'
	}
</script>

<style lang="less" scoped>
	.versionBox{
		p{
			:not('strong'){
					color:rgba(0,0,0,.65);
			}
			a{
				text-decoration: underline;
				color: #007bff;
				margin-left: 10px;
			}
		}
	}
	.useProcess{
		.title-span{
			display: inline-block;
			min-width: 120px;
			margin-right: 32px;
			color:rgba(0,0,0,.65);
			margin-bottom: 7px;
		}
		p{
			&:last-child{
				margin-bottom: 0 !important;
			}
		}
		.capacity-content{
			.progress-text{
				min-width: 72px;
			}
			i{
				font-size: 14px;
			}
			.ivu-progress{
				width: 80px;
			}
		}
	} 
</style>
