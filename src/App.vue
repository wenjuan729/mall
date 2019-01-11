<template>
  <div id="app">
    <div class="header-pic">
      <img src="./assets/img/he.jpg" alt="">
    </div>
    <ul class="header-nav">
      <div class="nav-left">
        <router-link class="nav-item" to='home' tag="li">首页</router-link>
      </div>
      <div class="nav-right">
        <router-link class="nav-item" to='login' tag="li">登陆/注册</router-link>
        <router-link class="nav-item" to='personal' tag="li">个人中心</router-link>
        <router-link class="nav-item" to='upload' tag="li">我要上传</router-link>
        <router-link class="nav-item" to='about' tag="li">关于</router-link>
      </div>
    </ul>
    <router-view/>
  </div>
</template>

<script>
import Home from './components/home'

export default {
  name: 'App',
  components:{
  	Home
  }
  // created() {
  //   axios.get("/api/login").then()
  // }
}
</script>

<style lang='stylus' ref='stylesheet/stylus'>
@import 'assets/stylus/index.styl'
#app
  .header-pic
    width 1120px
    height 165px
    margin 0 auto
    img
      width 1120px
  .header-nav
    height 80px
    width 1120px
    margin 0 auto
    position relative
    line-height 80px
    text-align center
    background-color #ffff66
    border-1px(rgba(240,20,20,0.1))
    .nav-left
      width 20%
      float left
      font-weight 500
    .nav-right
      width 50%
      float right
    .nav-item
      display inline-block
      width 105px
      padding 10px
      text-align center
      line-height 40px
      border-radius 40px
      margin-right 10px
      cursor pointer
      font-size 20px
      &:hover 
        background-color #ffff99
      
      
      
      

      


</style>
