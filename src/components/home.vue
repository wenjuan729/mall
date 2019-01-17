<template>
    <div class="home-content">
        <v-slide></v-slide>    
        <ul class="shop-nav">
            <router-link class="shop-nav-item" :to="{name: 'new'}" tag="li">最新</router-link>
            <router-link class="shop-nav-item" :to="{name: 'phone'}" tag="li">手机</router-link>
            <router-link class="shop-nav-item" :to="{name: 'clothes'}" tag="li">服装</router-link>
            <router-link class="shop-nav-item" :to="{name: 'beauty'}" tag="li">美妆</router-link>
            <router-link class="shop-nav-item" :to="{name: 'other'}" tag="li">其它</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import Slide from './home/slide'
import New from './home/new'

export default {
    
    components:{
        'v-slide':Slide
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
.home-content
    width 100%
    height 100%
    background-color #ffffcc
    .shop-nav
        width 1190px
        height 50px
        margin 0 auto
        background-color #ffff99
        border-radius 10px
        .shop-nav-item
            float left
            display inline-block
            width 230px
            text-align center
            line-height 50px
            cursor pointer
            font-size 16px
            color #222
        .router-link-active
            font-size 20px
            font-weight 700
            border-bottom 3px solid #000
            boeder-radius 5px

</style>

