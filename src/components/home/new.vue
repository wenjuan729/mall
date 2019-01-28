<template>
    <div class="newWrapper">
        <ul class="newBox">
            <router-link v-for="(item, index) in shopList" 
                        :key="index" 
                        class="newBody" 
                        :to="{name: 'shopDetails', params: {id: item.goods_id}}" 
                        tag="li"
                        >
                <div @click="setStore(index)">
                    <img :src="'api/getPic?path='+ item.file_path" class="image">
                    <p class="title" :title="item.title">{{item.title}}</p>
                    <p class="priceBox">
                    <span class="priceText">二手价</span>
                    <span class=price :price="item.price">￥{{item.price}}</span> 
                    </p>
                    <div class="underline"></div>
                    <div class="newBodyFooter">
                        <span class="username">{{item.user_name}}</span>
                        <span class="address">{{item.address}}</span>
                    </div>  
                </div>
                
            </router-link>
        </ul>
        <div class="page-tool">
            <el-pagination
                class="pagination"
                @current-change="handleCurrentChange"
                background
                layout="prev, pager, next"
                :page-size='pageSize'
                :total='totalCount'>
                </el-pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            shopList:[],
            pageSize:12,
            currentPage:1,
            totalCount:100,
        }
    },
    methods:{
        setStore (index) {
            this.$store.commit('setVal',this.shopList[index]);
        },
        getGoods () {
            axios.get('api/getAllGoodsByPage?pageSize='+ this.pageSize +'&currentPage='+ (this.currentPage-1)).then(res => {
            // console.log(res.data)
            this.shopList = res.data
            });
            axios.get('api/getAllGoodsCount').then(res => {
                // console.log(res)
                this.totalCount = res.data[0].count;
                // console.log(this.totalCount)
            })
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            this.getGoods(this.currentPage,this.pageSize)
        },
    },
    created () {
        this.getGoods(this.currentPage,this.pageSize)    
    },
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
    .page-tool
        width 100%
        height 30px
        .pagination
            width 100%
            height 100%
            margin 30px auto
            text-align center
                    


</style>

