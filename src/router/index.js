import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/components/home'
import Login from '@/components/login'
import Personal from '@/components/personal'
import Upload from '@/components/upload'
import Register from '@/components/register'

import New from '@/components/home/new'
import Phone from '@/components/home/phone'
import Clothes from '@/components/home/clothes'
import Beauty from '@/components/home/beauty'
import Other from '@/components/home/other'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'new',
          name: 'new',
          component: New
        },
        {
          path: 'phone',
          name: 'phone',
          component: Phone
        },
        {
          path: 'clothes',
          name: 'clothes',
          component: Clothes
        },
        {
          path: 'beauty',
          name: 'beauty',
          component: Beauty
        },
        {
          path: 'other',
          name: 'other',
          component: Other
        },
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    { path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    
  ]
})
