<template>
  <div id="app">
    <div class="header-pic">
      <img src="./assets/img/he.jpg" alt="">
    </div>
    <ul class="header-nav">
      <div class="nav-left">
        <router-link class="nav-item" :to="{name:'home'}" tag="li">首页</router-link>
      </div>
      <router-link class="serch" :to="{name:'search'}" tag="input" placeholder="我要搜索" readonly="readonly"></router-link>
      <!-- <input type="text" placeholder="我要搜索" class="serch"> -->
      <div class="nav-right">
        <router-link class="nav-item" :to="{name:'login'}" tag="li">登陆</router-link>
        <router-link class="nav-item" :to="{name:'register'}" tag="li">注册</router-link>
        <router-link class="nav-item" :to="{name:'personal'}" tag="li">个人中心</router-link>
        <router-link class="nav-item" :to="{name:'upload'}" tag="li">我要上传</router-link>
      </div>
    </ul>
    <router-view />
    <!-- <search v-show="isSh" @ChangeSh="ChangeSh"></search> -->
    <div class="footer">
      <h1>二手交易网-一个帮你省钱又赚钱的网站</h1>
      <h2>每年帮助超过1000万用户卖出宝贝</h2>
      <router-link  :to="{name:'about'}" tag="p" class="about">关于我们</router-link>
    </div>
  </div>

</template>

<script>
// import Search from '@/components/search'

export default {
  name: 'App',
  components:{
  	// Search
  },
  // data () {
  //   return {
  //     isSh : true,
  //   }
  // },
  // methods : {
  //   ChangeSh () {
  //     this.isSh = !isSh;
  //   }
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
    .serch
      width 15%
      height 40px
      border-radius 5px
      border 1px solid #ccc
      font-size 18px
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
  .footer
    width 100%
    height 150px
    color #333
    background-color #ffff99
    h1
      text-align center
      padding-top 10px
    h2
      text-align center
      margin-top 10px
    .about
      text-align center
      color #333
      text-decoration underline
      cursor pointer
      font-size 16px
      margin-top 10px

      
      
      
      

      


</style>
