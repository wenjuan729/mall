<template>
    <div class="newWrapper">
        <ul class="newBox">
            <router-link v-for="(item, index) in newList" :key="index" class="newBody" to="#" tag="li">
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
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    data () {
        return {
            newList:[{
                image:"http://img.alicdn.com/bao/uploaded/i2/O1CN01U95Jze1KWofuLDWSE_!!0-fleamarket.jpg",
                title:"iphone配件",
                price:"50",
                username:"1001",
                address:"北京"
            },
            {
               image:"http://img.alicdn.com/bao/uploaded/i4/2387753754/TB2qA8ShgDD8KJjy0FdXXcjvXXa_!!2387753754.jpg",
                title:"[南大人]秋冬款长裙",
                price:"80",
                username:"1002",
                address:"山东" 
            },
            {
                image:"http://img.alicdn.com/bao/uploaded/i1/O1CN016JqL7U1TLfZwyfOBy_!!0-fleamarket.jpg",
                title:"露华浓粉底液",
                price:"25",
                username:"1003",
                address:"哈尔滨"
            }]
        }
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus'>
.newWrapper
    width 1190px
    margin 0 auto
    .newBox
        display flex
        margin-top 10px
        width 100%
        border-radius 5px
        .newBody
            flex 1
            position relative
            display inline-block
            width 385px
            height 450px
            margin-right 10px
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

