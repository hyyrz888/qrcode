<template>
	<Layout>
		<Header id="header" :style="{ position: 'fixed', width: '100%' }"><ManageHead></ManageHead></Header>
		<Layout id="mainContent">
			<Sider hide-trigger id="sidebar" :width="220" :style="{ position: 'fixed', left: 0,top:'66px',overflow: 'hidden' }">
				<div class="scrollWrapper">
					<NavList></NavList>
				</div>
			</Sider>
			<Content id="comContent" :style="{marginLeft: '220px'}">
				<router-view></router-view>
			</Content>
		</Layout>
	</Layout>
</template>

<script>
// @ is an alias to /src
import ManageHead from '@/components/content/manageHead/ManageHead.vue';
import NavList from '@/components/content/navList/NavList.vue';

export default {
	name: 'Welcome',
	components: {
		ManageHead,
		NavList
	}
};
</script>

<style lang="less">
#header {
	background-color: #fff;
	box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.scrollWrapper {
	width: 220px;
	height: calc(100vh - 66px);
	padding:24px 0;
	background-color: #fff;
}
#comContent {
	padding: 24px;
	min-width: 700px;
	background-color: rgb(240, 242, 245);
	color: rgba(0, 0, 0, 0.87);
	margin-top: 64px;
	height: calc(100vh - 64px);
}
</style>
