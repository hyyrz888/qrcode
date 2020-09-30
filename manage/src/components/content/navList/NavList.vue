<template>
	<Menu :active-name="$route.name" width="240" :open-names="[$route.path.split('/')[1]]" accordion>
		     <MenuItem name="control" to="/"><Icon type="ios-filing" /> 工作台</MenuItem>
	        <Submenu name="active">
	            <template slot="title">
	                <Icon type="ios-filing" />
	                二维码列表
	            </template>
	            <MenuItem name="activeCode" to="/active/activeCode">活码</MenuItem>
	            <MenuItem name="2-2">快速模板 6</MenuItem>
				<MenuItem name="2-1">批量活码</MenuItem>
				<MenuItem name="2-1">网址跳转码</MenuItem>
				<MenuItem name="2-1">名片活码</MenuItem>
	        </Submenu>
	        <Submenu name="record">
	            <template slot="title">
	                <Icon type="ios-cog" />
	                表单
	            </template>
	            <MenuItem name="template" to="/record/template">表单管理</MenuItem>
	            <MenuItem name="4-2">填表人管理</MenuItem>
	            <MenuItem name="4-3">表单数据汇总</MenuItem>
	            <MenuItem name="4-4">待审核数据</MenuItem>
				<MenuItem name="4-4">协作成员</MenuItem>
	        </Submenu>
			<Submenu name="scanAnalyse">
			    <template slot="title">
			        <Icon type="ios-cog" />
			        扫描分析
			    </template>
			    <MenuItem name="4-1">扫描量统计</MenuItem>
			    <MenuItem name="4-2">收藏量统计</MenuItem>
			</Submenu>
			<Submenu name="settings">
			    <template slot="title">
			        <Icon type="ios-cog" />设置
			    </template>
			    <MenuItem name="4-1">企业主页</MenuItem>
			    <MenuItem name="4-2">子管理员</MenuItem>
				<MenuItem name="4-1">操作日志</MenuItem>
				<MenuItem name="4-2">美化样式</MenuItem>
				<MenuItem name="userinfo" to="/settings/userinfo">账户信息</MenuItem>
			</Submenu>
			<Submenu name="oldCode">
			    <template slot="title">
			        <Icon type="ios-cog" /> 旧版活码
			    </template>
			    <MenuItem name="oldCode2">文本码</MenuItem>
				<MenuItem name="oldCode">图文码</MenuItem>
				<MenuItem name="oldCode">文件码</MenuItem>
				<MenuItem name="oldCode">商品码</MenuItem>
				<MenuItem name="oldCode">名片码</MenuItem>
				<MenuItem name="oldCode">记录码</MenuItem>
				<MenuItem name="oldCode">企业码</MenuItem>
				<MenuItem name="oldCode">静态吗-文本</MenuItem>
				<MenuItem name="oldCode1">静态吗-网址</MenuItem>
				<MenuItem name="oldCode">静态吗-微信</MenuItem>
			</Submenu>
	    </Menu>
</template>

<script>
	export default{
		name:'NavList',
		data(){
			return {

			}
		},
		beforeCreate(){
			console.log('创建之前')
		},
		created(){
			console.log('创建完成')
		},
		mounted(){
			console.log(this.$route)
		}
	}
</script>

<style lang="less" scoped>
	.ivu-menu:first-child{
		& > .ivu-menu-item:first-child{
			font-size: 14px;
			color: #454545;
			.ivu-icon{
				font-size: 18px;
			}
		}
		.ivu-menu-submenu{
			font-size: 14px;
			color: #454545;
			.ivu-icon{
				font-size: 18px;
			}
			.ivu-menu-item{
				padding-top:10px !important;
				padding-bottom: 10px !important;
				padding-left:60px !important;
				font-size: 13px;
			}
		}
	}


</style>
