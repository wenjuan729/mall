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
                        <el-button type="warning" class="purchase" @click="buySuccess">立即购买</el-button>
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
                        <p class="anquan">如遇到以下情况可能是诈骗行为：
                            <span>1.宝贝价格异常低；</span>
                            <span>2.卖家要求QQ沟通；</span>
                            <span> 3.卖家要求直接汇款。</span>
                            <a href="#">寻求防骗经验。</a>
                        </p>
                        <p class="shopInt">宝贝介绍</p>
                        <div class="IntContent">
                            <h2>{{shopdetailList.title}}</h2>    
                            <p>宝 贝 成 色 ：{{shopdetailList.quality}}</p>
                            <p>二 手 价 ：{{shopdetailList.price}}元</p>
                            <p class="IncDetail">{{shopdetailList.introduce}}</p>
                            <img class="shopIncImg" :src="'api/getPic?path='+ shopdetailList.file_path" >
                        </div>
                        <p class="shopInt">安全保障</p>
                        <div class="space">
                            <p>二手交易消费者安全保障服务</p>
                            <div class="aqbz"></div>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="留言" name="second">
                    <div class="message">
                        <p class="messageTitle">我要留言</p>
                        <div class="writeComment">
                            <div class="usernameBox">
                                <span> 用户名:
                                    <p>{{this.$store.state.username}}</p>    
                                </span>
                            </div>
                            <textarea v-model="commentsContent" name="comment" id="commentText" cols="74" rows="5" placeholder="我来说两句..."></textarea>
                            <el-button @click="insertComments" class="commentBtn" type="primary" plain>提交留言</el-button>
                        </div>
                    </div>
                    <div class="commentList" v-for="(item, index) in commentList" :key="index">
                        <div class="commentBox">
                            <div class="commentUser">{{item.user_name}} :</div>
                            <div class="comment">{{item.content}}</div>
                        </div>
                        <div class="commentFooter">
                            <div class="commentTime">{{item.ctime}}</div>
                            <div class="zan">
                                <img src="../assets/img/zan.png" alt="" @click="addZan(index)">
                                <span>点赞数({{item.zan}}）</span>
                            </div>
                            <button class="commentDelete" @click="deleatComment(index)">删除</button>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="安全保障" name="third">
                    <div class="space">
                        <p>二手交易消费者安全保障服务</p>
                        <div class="aqbz"></div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
    created () {
        axios.get('api/getComments?goods_id='+ this.shopdetailList.goods_id).then( res => {
            // console.log(res);
            this.commentList = res.data;
        })
    },
    data () {
        return {
            commentsContent:'',
            activeName2: 'first',
            commentList:''
        }
    },
    computed:{
        shopdetailList () {
            console.log(this.$store.state.shopdetailList)
            return this.$store.state.shopdetailList;
            
        }
        // ...mapState('[shopdetailList]')
    },
    methods:{
        //写留言
        insertComments () {
            axios.get('/api/insertComments?user_name='+ this.$store.state.username +'&content='+ this.commentsContent + '&goods_id='+ this.shopdetailList.goods_id).then( res => {
                // console.log(res)
                if(res.data.status == 'success') {
                    alert("留言成功");
                    axios.get('api/getComments?goods_id='+ this.shopdetailList.goods_id).then( res => {
                            // console.log(res);
                            this.commentList = res.data;
                            this.commentsContent = '';
                    })
                }else{
                    alert("留言失败，请重新输入留言内容");
                }
            })
        },
        //点赞
        addZan (index) {
            axios.get('/api/addZan?id='+ this.commentList[index].id +'&zan='+ this.commentList[index].zan).then(res => {
                // console.log(res)
                this.commentList[index].zan = res.data[0].zan
            })
        },
        //删除留言
        deleatComment (index) {
            axios.get('/api/deleatComment?id='+ this.commentList[index].id).then(res => {
                // console.log(res)
                if(res.data.status == 'success') {
                    alert("留言删除成功");
                    axios.get('api/getComments?goods_id='+ this.shopdetailList.goods_id).then( res => {
                            this.commentList = res.data;
                    })
                }else{
                    alert("留言删除失败，请待会重试");
                }
            })
        },
        //购买成功
        buySuccess () {
            var curUserName = this.$cookieStore.getCookie('username')
            axios.get('api/addBuyGoods?username='+ curUserName +'&goodsTitle='+ this.shopdetailList.title +'&goodsPrice='+ this.shopdetailList.price +'&goodsImg='+ this.shopdetailList.file_path ).then( res => {
                this.$notify({
                        title: '成功',
                        message: '订单创建成功，可到个人中心"我购买的商品"查看购买的商品信息',
                        type: 'success'
                });
                this.$router.push({name:'personal'})
            });
            
        }
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
    .detailFooter
        width 100%
        margin-bottom 20px
        .shopIntroduce
            margin 10px auto
            width 950px
            .anquan
                width 100%
                height 30px
                font-size 14px
                color #333
                span 
                    color #f60
                a
                    text-decoration none
                    color #000
                    font-weight 600
                    &:hover
                        text-decoration underline
            .shopInt
                width 100%
                font-size 20px
                color #333
                font-weight 700
            .IntContent
                width 100%
                p
                    font-size 18px
                    margin-top 10px
                    color #000
                h2
                    font-weight 500
                    margin-top 10px
                .IncDetail
                    color rgb(0, 0, 255)
                .shopIncImg
                    margin-top 30px
                    margin-left 150px
                    width 600px
                    height 600px
        .message
            margin 10px auto
            width 950px
            .messageTitle
                width 100%
                height 30px
                font-size 20px
                color #333
                font-weight 600
                line-height 30px
            .writeComment
                position relative
                width 100%
                height 200px
                background-color #FFE1FF
                margin-top 10px
                .usernameBox
                    position absolute
                    top 35px
                    left 15px
                    display inline-block
                    width 100px
                    height 100px
                    background-color #FFBBFF
                    border-radius 50%
                    span 
                        display inline-block
                        width 100%
                        height 100%
                        text-align center
                        margin-top 30px
                        color #F56C6C
                #commentText
                    position absolute
                    top 35px
                    left 135px
                    font-size 20px
                    color #333
                .commentBtn
                    position absolute
                    bottom 5px
                    right 30px
                    width 100px
                    height 35px
        .commentList
            position relative
            margin 20px auto
            width 950px
            height 120px
            border-top 1px solid #ccc
            border-bottom 1px solid #ccc
            background-color #F5FFFA
            .commentBox
                width 100%
                height 90px
                .commentUser
                    display inline-block
                    margin 15px 15px 5px 15px
                    cursor pointer
                    font-size 20px
                    color #39a6b1
                    font-weight 500
                    &:hover
                        color #f40
                        text-decoration underline
                .comment
                    display inline-block
                    position absolute
                    top 15px
                    width 800px
                    height 80px
                    font-size 18px
                    color #333
            .commentFooter
                width 100%
                .commentTime
                    display inline-block
                    margin-left 15px
                    color #ccc
                .zan
                    position absolute
                    right 95px
                    bottom 10px
                    display inline-block
                    width 130px
                    height 25px
                    img 
                        width 25px
                        height 25px
                        cursor pointer
                    span 
                        color #333
                .commentDelete
                    position absolute
                    right 20px
                    width 80px
                    height 25px
                    cursor pointer
        .space
            margin 0px auto
            width 950px
            p
                width 100%
                hieght 35px
                font-size 30px
                color #333
                font-weight 600
                text-align center
            .aqbz
                width 100%
                height 570px
                background-image url(../assets/img/aqbz.png)
                cursor text



                    

                
                    
                        

            
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



