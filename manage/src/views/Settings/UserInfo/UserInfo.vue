<template>
	<div id="UserInfo">
		<Row :gutter="16" class="mb-3">
			<Col :span="12">
				<Account></Account>
			</Col>
			<Col :span="12">
				<Version></Version>
			</Col>
		</Row>
		<Row :gutter="16">
			<Col :span="12">
			   <Subscribe></Subscribe>
			</Col>
			<Col :span="12">
			  <Experiment></Experiment>
			</Col>
		</Row>
		

	</div>
</template>

<script>
	import Account from './childComps/Account.vue'
	import Version from './childComps/Version.vue'
	import Subscribe from './childComps/Subscribe.vue'
	import Experiment from './childComps/Experiment.vue'
	
	export default{
		name:'UserInfo',
		components:{
			Account,
			Version,
			Subscribe,
			Experiment
		},
		data(){
			return {

			}
		},
		methods:{

		}
	}
</script>

<style lang="less" scoped>

</style>

