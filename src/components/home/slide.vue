<template>
  <slider :pages="pages" :sliderinit="sliderinit">
    <!-- slot  -->   
  </slider>
</template>
 
<script>
import slider from 'vue-concise-slider'// 引入slider组件
export default {
   data () {
      return {
        //图片列表[arr]
        pages:[
          {
            title: 'roll_1',
            style:{
             background:'url(https://s1.zhuanstatic.com/platform/zzapppages/static/css/classify-banner-2.b8051cb.png)'
            }
          },
          {
           title: 'roll_2',
           style:{
            background:'url(src/assets/img/roll_2.png)'
            }
          },
          {
            title: 'roll_3',
            style:{
             background:'url(src/assets/img/roll_3.png)'
            }
          },
          {
            title: 'roll_4',
            style:{
             background:'url(src/assets/img/roll_4.png)'
            }
          },
          {
            title: 'slide3',
            style:{
              background:'#4bbfc3',
            },
          }
        ],
        //滑动配置[obj]
        sliderinit: {
          currentPage: 0,//当前页码
          thresholdDistance: 500,//滑动判定距离
          thresholdTime: 100,//滑动判定时间
          autoplay:1000,//自动滚动[ms]
          loop:true,//循环滚动
          direction:'vertical',//方向设置，垂直滚动
          infinite:1,//无限滚动前后遍历数
          slidesToScroll:1,//每次滑动项数
        }
      }
    },
    components: {
        slider
    }
}
</script>