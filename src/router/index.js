import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Home from '@/components/home'
import Login from '@/components/login'
import Register from '@/components/register'
import Personal from '@/components/personal'
import Upload from '@/components/upload'

import New from '@/components/home/new'
import Phone from '@/components/home/phone'
import Clothes from '@/components/home/clothes'
import Beauty from '@/components/home/beauty'
import Other from '@/components/home/other'

import ShopDetails from '@/components/shopDetails'
import About from '@/components/about'
import Search from '@/components/search'

Vue.use(Router)

const router = new Router({
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
    {
      path: '/shopDetails/:id',
      name: 'shopDetails',
      component: ShopDetails
    },
    {
      path:'/about',
      name:'about',
      component:About
    },
    {
      path:'/search',
      name:'search',
      component:Search
    }
    
  ]
})

//全局路由守卫
router.beforeEach ((to,from,next) => {
  //进入前需要拦截的页面
  const nextRoute = ['personal','upload','shopDetails'];
  if( nextRoute.indexOf(to.name) >= 0) {
    const UserName = router.app.$store.state.username;
    //未登录状态，跳转到登录界面
    if(!UserName) {
      const answer = confirm("您还没有登陆，要登陆后才能浏览信息，要登陆嘛？");
      if(answer) {
        router.push({name:'login'});
      }else{
        next(false);
      }
    }else {
      next();
    }
  }else{
    next();
  }
  //已经登录状态，点击注册时调到home页面
  if(to.name === 'register') {
    const UserName = router.app.$store.state.username;
    if(UserName) {
      alert("您已经登录，可直接浏览商品")
      router.push({name:'home'});
    }
  }
})

export default router;
