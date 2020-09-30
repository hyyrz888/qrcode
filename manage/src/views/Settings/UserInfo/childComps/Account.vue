<template>
	<div class="userInfoBox bg-white">
		 <Card>
			<h4 slot="title">账户信息</h4>
			<p><strong>用户账号：</strong> <span>13486731032</span><a href="javascript:;" @click="commodal = true">更换手机号</a></p>
			<p><strong>企业信息：</strong><span>中国农业银行</span><a href="javascript:;" @click="companyModel =true">修改</a><a href="">企业认证</a></p>
			<p><strong>登录密码：</strong> <span>已设置</span><a href="javascript:;" @click="passwordModel =true">修改密码</a></p>
			<p><strong>绑定微信：</strong><span>2018</span><a href="javascript:;" @click="removeWchatModel =true">解除绑定</a></p>
		</Card>
		
		<!--更换手机号-->
		<myModel title="验证手机号" :show="commodal" @showModel="showModel" :loading="loading" @save="save">
			<div slot="content">
				<Input v-model="oldphone" disabled readonly>
				        <span slot="prepend" class="text-success" style="padding:0 10px;display: inline-block;">原手机号</span>
				</Input>
				<div class="flex">
					 <Input class="mt-3" type="number" autofocus search enter-button="获取短信验证码" placeholder="请填写验证码(6位数字验证码)" maxlength="6" @on-search="sendMsg" v-model="vaildCode" />
				</div>
				
				 <div class="text-center mt-3">
					 <Button type="error" class="mr-3" ghost>无法获取验证码？</Button>  
					 <Button type="primary" @click="confirm">确认</Button>
				 </div>			 
			</div>
		</myModel>
		
		<!--企业信息-->
		<myModel title="完善企业信息" :show="companyModel" @showModel="showCompanyModel('companyRef')">
			<div slot="content">
				<p class="text-center mb-3"><small class="text-darkgrey text-danger">企业/组织名称将展示在企业名片及二维码中，请准确填写</small></p>
				 <Form ref="companyRef" :model="companyValidate" :rules="ruleCompanyValidate" :label-width="80">
				        <FormItem label="企业" prop="name">
				            <Input v-model="companyValidate.name" placeholder="企业"></Input>
				        </FormItem>
						
						 <FormItem label="行业" prop="industry">
						            <Select v-model="companyValidate.industry" :placeholder="companyValidate.industry">
						                <Option v-for="(item,index) in industry" :key="index" :value="item">{{item}}</Option>            
						            </Select>
						 </FormItem>
						 <div class="text-center"> <Button type="primary" @click="handleCompanySubmit('companyRef')">提交</Button></div>
						 
				</Form>
			</div>
		</myModel>
		
		<!--修改密码-->
		<myModel title="修改密码" :show="passwordModel" @showModel="showPasswordModel">
			<div slot="content">
				<Form ref="passwordRef" :model="passwordValidate" :rules="rulePassword" :label-width="80">
						<FormItem  label="原密码" prop="password">
							<Input v-model="passwordValidate.password" placeholder="原密码" type="password"></Input>
						</FormItem>
						<FormItem label="新密码" prop="newpassword">
							<Input v-model="passwordValidate.newpassword" placeholder="新密码" type="password"></Input>
						</FormItem>
						<FormItem label="确认密码" prop="pwdCheck">
							<Input v-model="passwordValidate.pwdCheck" placeholder="确认密码" type="password"></Input>
						</FormItem>
						 <div class="text-center"> <Button type="primary" @click="handlePasswordSubmit('passwordRef')">提交</Button></div>
						 
				</Form>
			</div>
		</myModel>
		
		<!--解除绑定微信-->
		<myModel title="解除绑定微信" :show="removeWchatModel" @showModel="showWchatModel">
			<div slot="content">
				<Form ref="wChatRef" :model="wChatValidate" :rules="wChatRules" :label-width="80">
						<FormItem  label="手机号" prop="mobile">
							<Input v-model="wChatValidate.mobile" placeholder="13486731033"  disabled readonly></Input>
						</FormItem>
						<FormItem label="验证码" prop="verCode">
							<Input v-model="wChatValidate.verCode" placeholder="填写验证码" type="number" search enter-button="获取短信验证码"></Input>
						</FormItem>
						 <div class="text-center"> 
							<Button type="info" @click="closeModel('wChatRef')" class="mr-3">取消</Button>
							<Button type="error" @click="handleRemoveWchat('wChatRef')">确认解绑</Button>
						 </div>			 
				</Form>
				<div class="fc6 warnbox">
					<small>
						<strong class="mb-2 d-block">解除微信绑定后，你将无法</strong>
						<p>1、使用微信扫码方式登录当前账号；</p>
						<p>2、使用微信操作记录功能的管理权限；</p>
						<p>3、使用微信接收草料二维码的消息通知。</p>
						<strong class="text-danger">请谨慎操作！</strong>
					</small>
				</div>
			</div>
		</myModel>
		
	</div>
</template>

<script>
	import myModel from '@/components/common/modal/myModel'
	
	export default{
			name:'Account',
			components:{
				myModel
			},
			data(){
				 const pwdValidate = (rule, value, callback) => {
					console.log(this.$refs.passwordRef)
					 if (value === '') {
					    callback(new Error('请输入原密码'));
					} else {
						//对第二个密码进行单独验证
						if(this.passwordValidate.pwdCheck !==''){
							this.$refs.passwordRef.validateField('pwdCheck');
						}
						callback();
					}
				 };
				 const pwdCheckValidate = (rule, value, callback) => {
					if (this.passwordValidate.newpassword != '' && value == '' || value=='') {
						callback(new Error('确认密码不能为空'));
					} else if (this.passwordValidate.newpassword != value) {
						callback(new Error('新密码和确认密码应相同'));
					} else {
						callback();
					}
				}
				//验证手机验证码
				const verCodeCheck = (rule,value,callback)=>{
					if(value == ''){
						callback(new Error("手机验证码不能位空"))
						if(value.trim().length < 6){
							callback(new Error("手机验证码格式不正确"))
						}
					}
					callback()
				} 
				return {
					commodal:false,
					companyModel:false,
					passwordModel:false,
					removeWchatModel:false,
					loading:false,
					oldphone:13486731033,
					vaildCode:'',  //短信验证码
					companyValidate:{
						name:'米点网络科技有限公司',
						industry:'建筑施工'
					},
					industry:["建筑施工","广告/媒体","互联网","旅游业"," 教育/培训","批发/零售","出版/印刷/包装","生产/制造/机械","政府/组织","医疗/护理/美容","能源/电力/水利","运输/物流/仓储","农林牧渔","物业/维保","生活服务","保险/金融","建材装修","其他"],
					ruleCompanyValidate:{
						  name: [
								{ required: true, message: '企业名称不为空', trigger: 'blur' }
							],
						industry: [
								{ required: true, message: '未选择行业类型', trigger: 'blur' },
							],
					},
					passwordValidate:{
						password:'',
						newpassword:'',
						pwdCheck:''
					},
					wChatValidate:{
						verCode:''
					},
					rulePassword:{
						password:[
							  { required: true, message: '原密码不为空！', trigger: 'blur' }
						],
						newpassword: [
							{validator: pwdValidate, trigger: 'blur'}
						],
						pwdCheck: [
							{validator: pwdCheckValidate, trigger: 'blur'}
					   ]
					},
					wChatRules:{
						verCode:[
							{validator: verCodeCheck, trigger: 'blur'}
						]
					}
				}
			},
			methods:{
				showModel(show){
					this.commodal = show
					this.vaildCode = ''
				},
				showCompanyModel(show){
					this.companyModel = show
				},
				showPasswordModel(show){
					this.passwordModel = show
				},
				showWchatModel(show){
					this.removeWchatModel = show
				},
				closeModel(name){
					//直接再@click里面写好像不行
					//关闭模态框
					this.removeWchatModel = false
					this.resetForm(name)
				},
				save(){
					 this.loading = true;
						setTimeout(() => {
							this.loading = false;
							this.commodal = false;
							this.$Message.success('Successfully');
					}, 2000);
				},
				sendMsg(v){
					if(v.trim().length < 6){
						this.$Message.error('输入格式不正确！(6位数字)')
						return false
					}
					this.$Message.success('发送验证码')
				},
				confirm(){
					if(this.vaildCode.length == 0){
						this.$Message.error('请填写验证码!')
					}
					//下一步操作
				},
				handleCompanySubmit(name){
					this.$refs[name].validate((valid) => {
						if (valid) {
							this.$Message.success('提交成功!');
						} else {
							this.$Message.error('提交错误!');
						}
					})
				},
				handlePasswordSubmit(){
					//修改密码
				},
				handleRemoveWchat(name){
					//确认解绑
					this.$refs[name].validate((valid) => {
						if (valid) {
							this.$Message.success('解绑成功!');
							this.resetForm(name)
						} else {
							this.$Message.error('解绑错误!');
						}
					})
				},
				resetForm(name){
					//表单关闭或者取消的时候清楚数据
					 this.$refs[name].resetFields();
				}
			}
		}
</script>

<style lang="less" scoped>
	.userInfoBox{
		.ivu-card-body{
			p{
				margin-bottom: 16px;
				strong{
					font-weight:700
				}
				span{
					color:rgba(0,0,0,.65)
				}
				a{
					text-decoration: underline;
					margin-left: 20px;
					color:#007bff
				}
			}
		}
	}
	.warnbox{
			padding-top:20px;
			p{
				margin-bottom: 6px;
			}
		}
</style>
<style lang="less">
	#UserInfo{
		.ivu-card-body{
			min-height: 180px;
		}
	}
</style>
