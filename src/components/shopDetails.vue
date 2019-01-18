<template>
    <div class="detail">
        <div class="detailMain">
            <div class="shopimgWrapper">
                <img class="shopImg" :src="shopdetailList.image" >
            </div>
            <div class="shopSelect">
                <div class="shopSelectHeader">
                    <h2 class="shopTitle">{{shopdetailList.title}}</h2>
                    <p class="shopPriceWrapper">
                        <span class="priceText">特 卖 价：</span>
                        <span class="shopPrice">￥{{shopdetailList.price}}</span>
                    </p>
                </div>
                <div class="shopSelectContent">
                    <p class="qualityWrapper">
                        <span class="qualityText">成 色：</span>
                        <span class="quality">{{shopdetailList.quality}}</span>
                    </p>
                    <p class="adderssWrapper">
                        <span class="adderssText">所 在 地：</span>
                        <span class="address">{{shopdetailList.address}}</span>
                    </p>
                    <p class="deliverWrapper">
                        <span class="deliverText">快 递：</span>
                        <span class="deliver" v-if="shopdetailList.deliver > 0">￥{{shopdetailList.deliver}}</span>
                        <span class="deliver" v-else>包邮</span>
                    </p>
                </div>
                <div class="shopFooter">
                    <p>
                        <el-button type="warning" class="purchase">立即购买</el-button>
                    </p>
                    <p>
                      <el-button type="primary" class="jion">加入购物车</el-button>  
                    </p>
                    <p>
                        <el-badge :value="12" class="item">
                            <el-button size="small">浏览次数</el-button>
                        </el-badge>
                    </p>
                </div>
                
            </div>
        </div>
        <div class="shopIntroduce">
            宝贝介绍
        </div>
        <div class="message">
            宝贝留言
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    created () {
        // const goodsId = this.$route.params.id;
        // const index = this.shopList.findIndex( item => item.goodsId == goodsId );//寻找数组中第一个符合条件的值
        // console.log(goodsId)
        // console.log(index)
        // //这时候就可以动态请求数据了，现在先用假数据模拟
    },
    data () {
        return {
            
        }
    },
    computed:{
        shopdetailList () {
            return this.$store.state.shopdetailList;
        }
        // ...mapState('[shopdetailList]')
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
.detail
    width 1190px
    margin 0 auto
    border-left 1px solid #f0f0f0
    border-right 1px solid #f0f0f0
    .detailMain
        position relative
        width 1190px
        height 580px
        .shopimgWrapper
            position absolute
            width 730px
            height 490px
            margin-top 10px
            background-color #e6e6fa
            .shopImg
                width 490px
                height 490px
                margin-left 120px
        .shopSelect
            position absolute
            right 10px
            top 10px
            width 430px
            height 580px
            .shopSelectHeader
                width 100%
                height 100px
                border-1px(rgba(240,20,20,0.1))
                .shopTitle
                    width 100%
                    height 30px
                    line-height 30px
                    color #333
                    margin-top 5px
                .shopPriceWrapper
                    width 100%
                    margin-top 20px
                    .priceText
                        width 80px
                        font-size 18px
                        color #333
                    .shopPrice
                        font-size 30px
                        font-weight 600
                        color #f40
            .shopSelectContent
                width 100%
                margin-top 20px
                .qualityWrapper
                    width 100%
                    height 30px
                    line-height 30px
                    span
                        font-size 20px
                        color #333
                .adderssWrapper
                    width 100%
                    height 30px
                    line-height 30px
                    margin-top 10px
                    span
                        font-size 18px
                        color #333
                .deliverWrapper
                    width 100%
                    height 30px
                    line-height 30px
                    margin-top 10px
                    .deliverText
                        font-size 18px
                        color #333
                    .deliver
                        display inline-block
                        width 80px
                        height 25px
                        font-size 18px
                        color #333
                        background-color #cfcfcf
                        border 1px solid #000
                        text-align center
                        line-height 25px
            .shopFooter
                width 100%
                margin-top 20px
                p
                    margin-top 20px
                    .purchase
                        width 200px
                        height 45px
                        font-size 20px
                        background-color #f40
                    .jion
                        width 200px
                        height 45px
                        font-size 20px
                    
                        

            
</style>

