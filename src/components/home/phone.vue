<template>
    <div class="phoneWrapper">
        <ul class="phoneBox">
            <router-link v-for="(item, index) in phoneList" 
                        :key="index" 
                        class="phoneBody" 
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
                    <div class="phoneBodyFooter">
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
            phoneList:[],
            pageSize:12,
            currentPage:1,
            totalCount:100,
        }
    },
    methods:{
        setStore (index) {
            // console.log(this.shopList[index].goods_id)
            axios.get('api/updateViews?goods_id='+ this.phoneList[index].goods_id +'&view='+ this.phoneList[index].views)
            this.$store.commit('setVal',this.phoneList[index]);
        },
        getGoods () {
            axios.get('api/getPhoneGoodsByPage?pageSize='+ this.pageSize +'&currentPage='+ (this.currentPage-1)).then(res => {
            // console.log(res.data)
            this.phoneList = res.data
            });
            axios.get('api/getPhoneGoodsCount').then(res => {
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
.phoneWrapper
    width 1190px
    margin 0 auto
    .phoneBox
        margin-top 10px
        width 1190px
        border-radius 5px
        .phoneBody
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
            .phoneBodyFooter
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
// <style lang='stylus' ref='stylesheet/stylus'>
// .el-pagination li.active 
//     background: #ffd84d !important
// .el-pagination li
//     background : #fff !important
// .el-pagination button 
//     background : #fff !important

// </style>