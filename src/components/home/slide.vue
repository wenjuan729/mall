<template>
  <div class="slider">
    <div class="slider-header">
      <h1>什么都能买，什么都能卖</h1>
      <span>二手轻松换成钱</span>
    </div>
    <div class="slider-main">
      <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in imgList" :key="item.img">
        <img :src="item.img" alt="">
      </el-carousel-item>
      </el-carousel>
    </div>
  </div>
  
</template>
 
<script>
export default {
  data() {
    return {
      imgList:[{
        url:'#',
        img:'https://s1.zhuanstatic.com/platform/zzapppages/static/css/classify-banner-1.218d4bd.png'
      },{
        url:'#',
        img:'https://s1.zhuanstatic.com/platform/zzapppages/static/css/classify-banner-0.fa91d15.png'
      },{
        url:'#',
        img:'https://s1.zhuanstatic.com/platform/zzapppages/static/css/classify-banner-6.b143d83.png'
      },{
        url:'#',
        img:'https://s1.zhuanstatic.com/platform/zzapppages/static/css/classify-banner-3.0ce19f4.png'
      },{
        url:'#',
        img:'https://s1.zhuanstatic.com/platform/zzapppages/static/css/classify-banner-5.293b142.png'
      },{
        url:'#',
        img:'https://s1.zhuanstatic.com/platform/zzapppages/static/css/classify-banner-2.b8051cb.png'
      }]
    }
  }
}
</script>

<style lang='stylus' ref='stylesheet/stylus'>
.slider
  width 1190px
  margin 0 auto
  .slider-header
    padding-top 20px
    text-align center
    h1
      color:#504A4D
    span
      display inline-block
      font-size 14px
      color #3D3D3D
      padding-top 10px
  .slider-main
    margin-left 190px
    width 820px
    height 200px
    margin-bottom 20px
    img
      width 410px
      height 200px



</style>
