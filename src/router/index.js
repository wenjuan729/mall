import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/home'
import Login from '@/components/login'
import Personal from '@/components/personal'
import Upload from '@/components/upload'
import About from '@/components/about'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})
