<template>
    <div class="searchWrapper">
        <div class="searchHeader">
            <div class="sercTitle">
                二手交易网
                <p>一个能赚钱的网站</p>
            </div>
            <div class="serachBox">
                <el-input  placeholder="请在此输入您想找的商品" class="secInput" v-model="searchVal"></el-input>
                <el-button type="primary" icon="el-icon-search" class="secBtn" @click="searchStar" >搜索</el-button>
                <ul class="ulBox" v-show="isSearch">
                    <router-link
                        class="liList"
                        v-for="(item, index) in serachList" :key="index"
                        :to="{name: 'shopDetails', params: {id: item.goods_id}}"
                        tag="li"
                    >
                        <span @click="setStore(index)">{{item.title}}</span>   
                    </router-link>
                    <!-- <li class="liList"  v-for="(item, index) in serachList" :key="index">{{item.title}}</li> -->
                </ul>
            </div> 
        </div>
        <div class="searchList">
            <ul class="shopBox">
            <router-link v-for="(item, index) in serachList" 
                        :key="index" 
                        class="shopBody" 
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
                    <div class="shopBodyFooter">
                        <span class="username">{{item.user_name}}</span>
                        <span class="address">{{item.address}}</span>
                    </div>  
                </div>    
            </router-link>
        </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            serachList:[],
            searchVal:'',
            isSearch:false,
            OldSerachList:[]
        }
    },
    methods:{
        setStore (index) {
            this.$store.commit('setVal',this.serachList[index]);
        },
        searchStar () {
            // console.log(this.searchVal,this.serachList)
            var text = this.searchVal;
            var newList = [];
            if(text) {
                this.serachList.filter(function(ele,index) {
                    if(ele.title.indexOf(text) != -1){
                        newList.push(ele)
                        return true;
                    }else{
                        return false;
                    }
                })
                // console.log(newList)
                this.serachList = newList;
                this.isSearch = false;
            }else {
                this.serachList = this.OldSerachList;
            }
        }
    },
    created () {
        axios.get('api/getSearchGoods').then(res => {
            // console.log(res)
            this.serachList = res.data;
            this.OldSerachList = this.serachList;
        })
    },
    watch:{
        searchVal:function() {
            this.isSearch = true;
            var text = this.searchVal;
            var newList = [];
            if(text) {
                this.serachList.filter(function(ele,index) {
                    if(ele.title.indexOf(text) != -1){
                        newList.push(ele)
                        return true;
                    }else{
                        return false;
                    }
                })
                // console.log(newList)
                this.serachList = newList;
            }else {
                this.serachList = this.OldSerachList;
                // console.log(this.serachList)
                this.isSearch = false;
            }
        }
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
.searchWrapper
    width 100%
    min-Height 500px
    background-color #ffffcc
    padding-bottom 25px
    .searchHeader
        margin 0 auto
        width 1190px
        height 90px
        background-color #ff9
        position relative
        .sercTitle
            display inline-block
            width 180px
            height 100%
            font-size 30px
            font-family Microsoft YaHei
            color #ff9900
            padding-top 15px
            padding-left 45px
            cursor default
            p
                font-size 14px
                width 180px
                height 20px
                padding-top 10px
                color #ff9933
        .serachBox
            display inline-block
            position absolute
            left 300px
            top 20px
            width 560px
            height 100%
            .secInput
                width 460px
                height 40px
            .secBtn
                width 88px
                height 40px
                margin-left -7px
                background-color #ff9933
                border none
            .ulBox
                position relative
                width 460px
                height 175px
                background #fff
                border-radius 5px
                overflow hidden
                z-index 999
            .liList
                width 100%
                height 25px
                padding-left 20px
                color #999
                cursor pointer
                z-index 999
    .searchList
        width 1190px
        margin 0 auto
        .shopBox
            margin-top 10px
            width 1190px
            border-radius 5px
            .shopBody
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
                .shopBodyFooter
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

