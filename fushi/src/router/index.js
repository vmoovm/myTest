import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Index from '@/components/index/index'
import List from '@/components/list/list'
import List2 from '@/components/list/list2'
import List3 from '@/components/list/list3'
import Slide from '@/components/slide/slide'
import End from '@/components/end/end'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'index',
		component: Index
	},
	{
		path: '/hello',
		name: 'Hello',
		component: Hello
	},
	{
		path: '/slide',
		name: 'slide',
		component: Slide
	},
	{
		path: '/index',
		name: 'index',
		component: Index,
		children: [
			{
				path: '/list',
				name: 'list',
				component: List
			},
			{
				path: '/list2',
				name: 'list2',
				component: List2
			},
			{
				path: '/list3',
				name: 'list3',
				component: List3
			}
		]
	},
	{
		path: '/end',
		name: 'end',
		component: End
	}]
})
