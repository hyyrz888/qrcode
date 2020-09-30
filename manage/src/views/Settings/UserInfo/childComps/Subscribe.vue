<template>
	<Card dis-hover>
		<h4 slot="title">消息通知与订阅 <small class="text-darkgrey">（你已经关注草料公众号，能够接收以下消息）</small></h4>
		<div class="subscribeBox bg-white">
			<p class="font-weight-bold f16">订阅通知</p>
			<div class="item flex mt-3 mb-3">
				<div class="iteml mr-5">
					<p>每周扫描量统计</p>
					<small class="text-darkgrey">每周一推送上周二维码扫描量情况</small>
				</div>
				<div class="teimr">
					 <i-switch v-model="ScanSwitch" @on-change="handlechange" size="small" >
					</i-switch>
				</div>
			</div>
			<div class="item flex">
				<div class="iteml mr-5">
					<p>容量与流量使用情况</p>
					<small class="text-darkgrey">当你的容量或流量达到预警时汇报</small>
				</div>
				<div class="teimr">
					 <i-switch v-model="SapSwitch" @on-change="handlechange" size="small" />
				</div>
			</div>
		</div>
	</Card>
</template>

<script>
	export default{
		name:'Subscribe',
		data(){
			return {
				ScanSwitch:false,
				SapSwitch:false,
			}
		},
		methods:{
			handlechange(status){
				this.$Message.info('开关状态：' + status);
			}
		}
	}
</script>

<style>
</style>
