import Vue from 'vue'
import Router from 'vue-router'
import msgBox from '@/views/msgBox'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'msgBox',
      component: msgBox
    }
  ]
})
