<template>
    <div class="uploadBackground">
        <div class="uploadWrapper">
            <div class="uploadHeader">
                <h1>商品信息上传</h1>
            </div>
            <div class="uploadUsername">
                用户名：
                <span>{{this.$store.state.username}}</span>
            </div>
            <div class="uploadText">
                <div class="uploadCategory">
                    商品类别: 
                    <el-select v-model="value" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="uploadBox">
                    商品名称：
                    <input type="text" placeholder="请输入商品名称" v-model="title">
                </div>
                <div class="uploadBox">
                    商品价格：
                    <input type="text" placeholder="请输入商品价格" v-model="price">
                </div>
                <div class="uploadBox">
                    商品质量：
                    <input type="text" placeholder="请输入商品质量" v-model="quality">
                </div>
                <div class="uploadBox">
                    商品所在地址：
                    <input type="text" placeholder="请输入商品所在地址" v-model="address">
                </div>
                
                <div class="uploadBox">
                    快递费用：
                    <input type="text" placeholder="请输入快递费用" v-model="deliver">
                </div>
                <div class="uploadImg">
                    商品图片:
                    <input type="file" class="file" ref="file">
                    <img src="#" alt=""> 
                </div> 
                <div class="introduceBox">
                    <p>商品描述：</p>
                    <textarea v-model="introduce" name="introduceText" id="introduce" cols="80" rows="10"></textarea>
                </div>
                   
            </div>
            <div class="uploadSubmit" @click="uploatShopInfo">
                <button class="uploadBtn">点击上传商品信息</button>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
      return {
        title:'',
        price:'',
        quality:'',
        address:'',
        deliver:'',
        introduce:'',
        filesInfo:'',
        options: [{
          value: '手机',
          label: '手机'
        }, {
          value: '服装',
          label: '服装'
        }, {
          value: '美妆',
          label: '美妆'
        }, {
          value: '其它类',
          label: '其它类'
        }],
        value: ''
      }
    },
    methods:{
        uploatShopInfo () {
            const form = new FormData();
            const file = this.$refs.file.files[0];
            form.append("file",file);
            axios({
                method:'post',
                url:'api/uploadGoods?category='+ this.value +'&title='+ this.title +'&price='+ this.price +'&quality='+ this.quality +'&address='+ this.address+'&deliver='+ this.deliver +'&introduce='+ this.introduce,
                anync:true,
                contentType:false,
                processData:false,
                data:form
            }).then(res => {
                // console.log(res)
                alert("上传成功");
                this.value = '';
                this.title = '';
                this.price = '';
                this.quality = '';
                this.address = '';
                this.deliver = '';
                this.introduce = '';
                this.$refs.file.files[0] = '';
            })
        }
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
.uploadBackground
    width 100%
    background-color #F0F8FF
    .uploadWrapper
        width 1190px
        margin 0 auto
        background-color #fff
        .uploadHeader
            width 100%
            padding-top 10px
            height 60px
            line-height 40px
            border-1px(rgba(240,20,20,0.1))
        .uploadUsername
                margin-top 10px
                width 100%
                height 50px
                line-height 50px
                font-size 22px
                font-weight 500
                color #444
        .uploadText
            margin-left 90px
            .uploadCategory
                height 50px
                font-size 18px
                font-weight 500
                color #444
                line-height 50px
            .uploadBox
                height 50px
                font-size 18px
                font-weight 500
                color #444
                line-height 50px 
                margin-top 15px
            input 
                width 250px
                height 40px
                border 1px solid #ccc
                line-height 40px
                font-size 16px
                color #606266
            .uploadImg
                height 100px
                font-size 18px
                font-weight 500
                color #444
                line-height 50px 
                margin-top 15px
                .file
                    border 0px solid #fff
                    color #444
                .imgBtn
                    width 100px
                    height 40px
                    background-color #409EFF
                    border 0px solid #fff
                    color #fff
            .introduceBox
                font-size 18px
                font-weight 500
                color #444
                line-height 50px 
                textarea
                   font-size 18px
                   font-weight 500
                   line-height 16px 
                   margin-left 85px
                   margin-top -35px
                   color #606266
        .uploadSubmit
            width 100%
            height 50px
            text-align center
            .uploadBtn
                width 150px
                height 40px
                background-color #409EFF
                border 0px solid #fff
                color #fff   

                

                    
            

</style>