<template>
    <div class="changeWrapper">
        <div class="changeBac">
            <div class="changeBox">
                <div class="changeHeader">
                    <span class="changeTitle">商品信息修改</span>
                    <el-button class="closeBtn" type="info" @click="changeShow">退出修改</el-button>
                </div>
                <div class="changeText">
                    <div class="box">
                        <label for="">商品类别：</label>
                        <input type="text" placeholder="请输入商品类别" v-model="changeData.category">
                    </div>
                    <div class="box">
                        <label for="">商品名称：</label>
                        <input type="text" v-model="changeData.title">
                    </div>
                    <div class="box">
                        <label for="">商品价格：</label>
                        <input type="text" v-model="changeData.price">
                    </div>
                    <div class="box">
                        <label for="">商品质量：</label>
                        <input type="text" v-model="changeData.quality">
                    </div>
                    <div class="box">
                        <label for="">商品地址：</label>
                        <input type="text" v-model="changeData.address">
                    </div>
                    <div class="box">
                        <label for="">商品介绍：</label>
                        <input type="text" v-model="changeData.introduce">
                    </div>
                    <div class="box">
                        <label for="">快递费用：</label>
                        <input type="text" v-model="changeData.deliver">
                    </div>
                </div>
                <div class="changeFooter">
                    <el-button class="changeSub" type="primary" @click="submitInfo">提交修改</el-button>
                </div>
            </div>
            
        </div> 
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props:{
        changeData:Object
    },
    data () {
        return {
            
        }
    },
    methods:{
        changeShow () {
            this.$emit('changePersonal')
        },
        submitInfo () {
            //提交修改的信息到数据库
            
            axios.get('api/updateGoodList?category='+ this.changeData.category +'&title='+ this.changeData.title +'&price='+ this.changeData.price +'&quality='+ this.changeData.quality +'&address='+ this.changeData.address +'&introduce='+ this.changeData.introduce +'&deliver='+ this.changeData.deliver +'&goods_id=' + this.changeData.goods_id).then(res => {
                // console.log(res)
                alert("商品信息修改成功");
            })
            this.$emit('changePersonal')
        }
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../../assets/stylus/index.styl'
.changeWrapper
    position relative
    .changeBac
        position absolute
        width 100%
        height 800px
        background-color #F2F2F2
        z-index 100
        .changeBox
            width 1190px
            height 650px
            margin 0 auto
            border-left 1px solid #ccc
            border-right 1px solid #ccc
            border-bottom 1px solid #ccc
            .changeHeader
                width 100%
                height 50px
                border-1px(rgba(240,20,20,0.1))
                margin-left 15px
                .changeTitle
                    font-size 26px
                    font-weight 500
                    line-height 50px
                    color #333
                .closeBtn
                    width 100px
                    height 40px
                    position absolute
                    right 30px
                    top 5px
            .changeText
                margin-left 170px
                .box
                    height 60px
                    font-size 20px
                    color #333
                    line-height 60px
                    input
                        width 400px
                        height 40px
                        font-size 18px
            .changeFooter
                margin-top 15px
                width 100%
                height 60px
                text-align center
                line-height 60px
                .changeSub
                    width 100px
                    height 40px


</style>

