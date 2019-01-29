<template>
    <div class="detail">
        <div class="detailHeader">
                <div class="username">
                    卖家ID：{{shopdetailList.user_name}}
                </div>
                <div class=timeBox>
                    最近编辑：
                     <p class="time">{{shopdetailList.ctime}}</p>
                </div>
                <div class=viewsBox>
                    宝贝浏览次数：
                    <p class="views">{{shopdetailList.views}}次</p>
                </div>
                <div class="report">举报该宝贝</div>
        </div>
        <div class="detailMain">
            <div class="shopimgWrapper">
                <img class="shopImg" :src="'api/getPic?path='+ shopdetailList.file_path" >
            </div>
            <div class="shopSelect">
                <div class="shopSelectHeader">
                    <h2 class="shopTitle">{{shopdetailList.title}}</h2>
                    <p class="shopPriceWrapper">
                        <span class="priceText">特 卖 价 :</span>
                        <span class="shopPrice">￥{{shopdetailList.price}}</span>
                    </p>
                </div>
                <div class="shopSelectContent">
                    <p class="qualityWrapper">
                        <span class="qualityText">成 色 :</span>
                        <span class="quality">{{shopdetailList.quality}}</span>
                    </p>
                    <p class="adderssWrapper">
                        <span class="adderssText">所 在 地 :</span>
                        <span class="address">{{shopdetailList.address}}</span>
                    </p>
                    <p class="modeWrapper">
                        <span class="modeText">交易方式 :</span>
                        <span class="mode">在线交易</span>
                    </p>
                    <p class="deliverWrapper">
                        <span class="deliverText">快 递 ：</span>
                        <span class="deliver" v-if="shopdetailList.deliver > 0">￥{{shopdetailList.deliver}}</span>
                        <span class="deliver" v-else>包邮</span>
                    </p>
                </div>
                <div class="shopFooter">
                    <p>
                        <el-button type="warning" class="purchase">立即购买</el-button>
                    </p>
                </div>
                <div class="transaction">
                    <div class="dbjy">
                        <div class="dbjyImg"></div>
                        <div class="dbjyTitle">担保交易</div>
                        <div class="dbjyText"> 由支付宝先行保管,验货OK再付款到卖家账户。</div>
                    </div>
                    <div class="smrz">
                        <div class="smrzImg"></div>
                        <div class="smrzTitle">实名认证</div>
                        <div class="smrzText">经支付宝核实会员身份和银行账户信息,真实可靠。</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="detailFooter">
            <el-tabs type="card" v-model="activeName2">
                <el-tab-pane label="宝贝介绍" name="first">
                    <div class="shopIntroduce">
                        宝贝介绍
                    </div>
                </el-tab-pane>
                <el-tab-pane label="留言" name="second">
                    <div class="message">
                        宝贝留言
                     </div>
                </el-tab-pane>
                <el-tab-pane label="安全保障" name="third">
                    安全保障
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    created () {

    },
    data () {
        return {
            activeName2: 'first'
        }
    },
    computed:{
        shopdetailList () {
            // console.log(this.$store.state.shopdetailList)
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
    .detailHeader
        position relative
        width 100%
        height 70px
        border 1px solid #ccc
        border-radius 5px
        margin-top 10px
        border-top 2px solid #000
        .username
            position absolute
            top 10px
            left 15px
            width 130px
            color #999
            line-height 45px
            border-right 1px solid #ccc
        .timeBox
            position absolute
            top 10px
            left 147px
            width 210px
            border-right 1px solid #ccc
            text-align center
            color #999
            font-size 14px
            .time
                color #333
        .viewsBox
            position absolute
            top 10px
            left 375px
            text-align center
            color #999
            font-size 14px
            .views
                color #333
        .report
            position absolute
            top 10px
            right 15px
            font-size 14px
            color #333
            cursor pointer
            &:hover
                text-decoration underline
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
                .modeWrapper
                    width 100%
                    height 30px
                    line-height 30px
                    margin-top 10px
                    .modeText 
                        font-size 18px
                        color #333
                    .mode
                        width 30px
                        height 20px
                        border 1px solid #ccc
                        padding 5px
                        cursor pointer
                        &:hover
                            border 1px solid #f40
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
                        background-color #f1f1f1
                        border 1px solid #ccc
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
            .transaction
                width 100%
                height 150px
                margin-top 35px
                border 1px solid #ccc
                .dbjy
                    position relative
                    width 100%
                    height 75px
                    border-bottom 1px solid #ccc
                    .dbjyImg
                        display inline-block
                        width 45px
                        height 40px
                        background-image url(../assets/img/dbjy.png)
                        background-repeat no-repeat
                        margin-top 15px
                        margin-left 10px
                    .dbjyTitle
                        position absolute
                        top 22px
                        left 65px
                        display inline-block
                        width 75px
                        color #333
                        font-weight 600
                    .dbjyText
                        position absolute
                        top 24px
                        left 140px
                        display inline-block
                        font-size 12px
                        color #666
                .smrz
                    position relative
                    width 100%
                    height 75px
                    .smrzImg
                        display inline-block
                        width 45px
                        height 40px
                        background-image url(../assets/img/smrz.png)
                        background-repeat no-repeat
                        margin-top 25px
                        margin-left 10px
                    .smrzTitle
                        position absolute
                        top 27px
                        left 65px
                        display inline-block
                        width 75px
                        color #333
                        font-weight 600
                    .smrzText
                        position absolute
                        top 28px
                        left 140px
                        display inline-block
                        font-size 12px
                        color #666

                
                    
                        

            
</style>

<style lang='stylus' ref='stylesheet/stylus'>
.el-tabs--card>.el-tabs__header
    border-bottom 5px solid #ffda44 !important
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active
    background-color #ffda44 !important
    color #fff
    font-weight 700
    font-size 18px
.el-tabs__item
    color #333
    font-weight 700
    font-size 18px
</style>



