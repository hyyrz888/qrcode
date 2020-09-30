<template>
	 <Modal  v-model="visible" :title="title" footer-hide transfer @on-ok="ok" @on-cancel="cancel">
		 
			<slot name="content">我是中间内容</slot>
			
			<!-- <div slot="footer">
				<Button type="success" size="large" long :loading="loading" @click="save">确认</Button>
			</div> -->
	</Modal>
</template>

<script>
	export default{
		name:'myModel',
		data(){
			return{
				visible:this.show,
			}
		},
		watch:{
			show(n,o){
				//传进来的新值
				this.visible = n
				console.log(o,n)
			}
		},
		props:{
			loading:false,
			show:{
				type:Boolean,
				default:false
			},
			title:{
				type:String,
				default:'默认标题'
			}
		},
		methods:{
			ok(){
				this.$emit('showModel',this.visible);
			},
			cancel(){
				this.$emit('showModel',this.visible);
			},
			save(){
				this.$emit("save")
			}
		}
	}
</script>

<style>
</style>
