import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import Control from '../views/Control.vue'
import ActiveCode from '../views/ActiveCode.vue'
import UserInfo from '../views/Settings/UserInfo/UserInfo.vue'
//表单
import Template from '../views/Record/Template/Template.vue'

Vue.use(VueRouter)

console.log(VueRouter) 

const routes = [
  {
    path: '/',
    name: 'welcome',
    component: Welcome,
	redirect:'/control',
	children:[
		{
			path: "/",
			name: 'control',
			component: Control
		},
		{
			path:'/active/activeCode',
			name:'activeCode',
			component:ActiveCode
		},
		{
			path:'/record/template',
			name:'template',
			component:Template
		},
		{
			path:'/settings/userinfo',
			name:'userinfo',
			component:UserInfo
		}
	]
  }
]

//路由实例
const router = new VueRouter({
  routes
})

export default router
