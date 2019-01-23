<template>
    <div class="newWrapper">
        <ul class="newBox">
            <router-link v-for="(item, index) in shopList" 
                        :key="index" 
                        class="newBody" 
                        :to="{name: 'shopDetails', params: {id: item.goodsId}}" 
                        tag="li"
                        >
                <div @click="setStore(index)">
                    <img :src="item.image" class="image">
                    <p class="title" :title="item.title">{{item.title}}</p>
                    <p class="priceBox">
                    <span class="priceText">二手价</span>
                    <span class=price :price="item.price">￥{{item.price}}</span> 
                    </p>
                    <div class="underline"></div>
                    <div class="newBodyFooter">
                        <span class="username">{{item.username}}</span>
                        <span class="address">{{item.address}}</span>
                    </div>  
                </div>
                
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            shopList:[{
                goodsId:1,
                image:"http://img.alicdn.com/bao/uploaded/i2/O1CN01U95Jze1KWofuLDWSE_!!0-fleamarket.jpg",
                title:"iphone配件",
                price:"50",
                quality:"8成新",
                username:"1001",
                address:"北京",
                deliver:"8"
            },
            {
                goodsId:2,
                image:"http://img.alicdn.com/bao/uploaded/i4/2387753754/TB2qA8ShgDD8KJjy0FdXXcjvXXa_!!2387753754.jpg",
                title:"[南大人]秋冬款长裙",
                price:"80",
                quality:"全新",
                username:"1002",
                address:"山东",
                deliver:"0" 
            },
            {
                goodsId:3,
                image:"http://img.alicdn.com/bao/uploaded/i1/O1CN016JqL7U1TLfZwyfOBy_!!0-fleamarket.jpg",
                title:"露华浓粉底液",
                price:"25",
                quality:"8成新",
                username:"1003",
                address:"哈尔滨",
                deliver:"12"
            },
            {
                goodsId:4,
                image:"http://img.alicdn.com/bao/uploaded/i1/O1CN016JqL7U1TLfZwyfOBy_!!0-fleamarket.jpg",
                title:"露华浓粉底液",
                price:"25",
                quality:"8成新",
                username:"1003",
                address:"哈尔滨",
                deliver:"12"
            },
            {
                goodsId:5,
                image:"http://img.alicdn.com/bao/uploaded/i1/O1CN016JqL7U1TLfZwyfOBy_!!0-fleamarket.jpg",
                title:"露华浓粉底液",
                price:"25",
                quality:"8成新",
                username:"1003",
                address:"哈尔滨",
                deliver:"12"
            }]
        }
    },
    methods:{
        setStore (index) {
            this.$store.commit('setVal',this.shopList[index]);
        }
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../../assets/stylus/index.styl'
.newWrapper
    width 1190px
    margin 0 auto
    .newBox
        margin-top 10px
        width 1190px
        border-radius 5px
        .newBody
            position relative
            display inline-block
            width 385px
            height 450px
            margin-right 10px
            margin-top 15px
            background-color #fff
            border-radius 10px
            cursor pointer
            .image
                width 350px
                height 350px
                margin-left 17px
                border-radius 5px
            .title
                width 100%
                height 16px
                font-size 16px
                line-height 16px
                margin-left 15px
                margin-top 3px
                color #222
                font-weight 600
            .priceBox
                width 100%
                height 20px
                margin-top 10px
                padding-left 15px
                .priceText
                    color #999
                    font-size 14px
                .price
                    color #ff4400
                    font-size 20px
                    font-weight 500
                    line-height 20px
            .underline
                height 10px
                border-bottom 1px solid #ccc
                margin 0 10px
            .newBodyFooter
                width 100%
                margin-left 15px
                margin-top 5px
                line-height 25px
                .username
                    color #6699ff
                    font-size 16px
                    font-weight 500
                .address
                    position absolute
                    right 15px
                    


</style>

