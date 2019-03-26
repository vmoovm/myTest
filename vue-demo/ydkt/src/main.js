import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './components/header/header.vue'
import Sub1 from './components/sub/sub1.vue'
import Sub2 from './components/sub/sub2.vue'


Vue.use(VueRouter)

const router = new VueRouter({
	routers: [
		{path:'./components/sub',compontent:Sub1},
		{path:'./components/sub',compontent:Sub2}
	]
})

new Vue({
  el: '#app',
  router,
  render: hc => hc(App)
  
})
