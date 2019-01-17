<template>
  <div id="app">
    <div class="header-pic">
      <img src="./assets/img/he.jpg" alt="">
    </div>
    <ul class="header-nav">
      <div class="nav-left">
        <router-link class="nav-item" :to="{name:'home'}" tag="li">首页</router-link>
      </div>
      <div class="nav-right">
        <router-link class="nav-item" :to="{name:'login'}" tag="li">登陆</router-link>
        <router-link class="nav-item" :to="{name:'register'}" tag="li">注册</router-link>
        <router-link class="nav-item" :to="{name:'personal'}" tag="li">个人中心</router-link>
        <router-link class="nav-item" :to="{name:'upload'}" tag="li">我要上传</router-link>
      </div>
    </ul>
    <router-view />
    <footer>关于</footer>
  </div>

</template>

<script>
import Footer from './components/footer'

export default {
  name: 'App',
  components:{
  	Footer
  }
  // created() {
  //   axios.get("/api/login").then()
  // }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import 'assets/stylus/index.styl'
#app
  .header-pic
    width 100%
    height 185px
    background-color #ffd760
    img 
     margin-left 200px 
      
  .header-nav
    height 80px
    width 100%
    position relative
    line-height 80px
    text-align center
    background-color #ffff66
    border-1px(rgba(240,20,20,0.1))
    .nav-left
      width 15%
      float left
      font-weight 500
    .nav-right
      width 50%
      float right
    .nav-item
      display inline-block
      width 130px
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
