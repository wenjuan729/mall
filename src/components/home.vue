<template>
    <div>
        <v-slide></v-slide>    
        <ul class="shop-wrapper">
            <router-link :to="{name: 'new'}" tag="li">最新</router-link>
            <router-link :to="{name: 'phone'}" tag="li">手机</router-link>
            <router-link :to="{name: 'clothes'}" tag="li">服装</router-link>
            <router-link :to="{name: 'beauty'}" tag="li">美妆</router-link>
            <router-link :to="{name: 'other'}" tag="li">其它</router-link>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
import Slide from './home/slide'

export default {
    
    components:{
        'v-slide':Slide
    }
}
</script>

