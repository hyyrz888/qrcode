import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//引入view-design 
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';


Vue.use(ViewUI);

console.log(router)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
