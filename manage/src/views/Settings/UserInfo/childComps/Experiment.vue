<template>
	<Card dis-hover>
		<h4 slot="title">
			实验室
			<small class="text-darkgrey"></small>
		</h4>
		<div class="labox bg-white">
			<p class="mb-3">
				<span class="title-span font-weight-bold mr-2">目录管理功能：</span>
				<small class="text-darkgrey mr-3">目录汇总码</small>
				<i-switch v-model="dirSwitch" @on-change="handlechange" size="small" />
			</p>
			<p class="mb-3">
				<span class="title-span font-weight-bold mr-2">API：</span>
				<small class="text-darkgrey mr-3">数据推送</small>
				<i-switch v-model="ApiSwitch" @on-change="handlechange" size="small" />
				<a href="" class="ml-3">设置</a>
			</p>
			<p class="mb-3">
				<span class="title-span font-weight-bold mr-2">旧版活码菜单显示：</span>
				<small class="text-darkgrey mr-3">旧版活码菜单显示</small>
				<i-switch v-model="oldCodeSwitch" @on-change="handlechange" size="small" />
			</p>
		</div>
	</Card>
</template>

<script>
	export default{
		name:'Experiment',
		data(){
			return {
				dirSwitch:false,
				ApiSwitch:false,
				oldCodeSwitch:false,
			}
		},
		methods:{
			handlechange(status){
				this.$Message.info('开关状态：' + status);
			},
		}
	}
</script>

<style></style>
