<template>
    <div class="uploadBackground">
        <div class="uploadWrapper">
            <div class="uploadHeader">
                <h1>商品信息上传</h1>
            </div>
            <div class="uploadUsername">
                用户名：
                <span>1001</span>
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
                    <input type="text" placeholder="请输入商品名称">
                </div>
                <div class="uploadBox">
                    商品价格：
                    <input type="text" placeholder="请输入商品价格">
                </div>
                <div class="uploadBox">
                    商品质量：
                    <input type="text" placeholder="请输入商品质量">
                </div>
                <div class="uploadBox">
                    商品所在地址：
                    <input type="text" placeholder="请输入商品所在地址">
                </div>
                <div class="uploadBox">
                    商品描述：
                    <input type="text" placeholder="请输入商品介绍">
                </div>
                <div class="uploadBox">
                    快递费用：
                    <input type="text" placeholder="请输入快递费用">
                </div>
                <div class="uploadImg">
                    商品图片:
                    <p><input type="file" class="file"></p>
                    <button class="imgBtn">点击上传文件</button>
                    <img src="#" alt=""> 
                </div>    
            </div>
            <div class="uploadSubmit">
                <button class="uploadBtn">点击上传商品信息</button>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '手机'
        }, {
          value: '选项2',
          label: '服装'
        }, {
          value: '选项3',
          label: '美妆'
        }, {
          value: '选项4',
          label: '其它类'
        }],
        value: ''
      }
    },
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
                border 1px solid #f0f0f0
                line-height 40px
                font-size 16px
                color #ccc
            .uploadImg
                height 150px
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
        .uploadSubmit
            width 100%
            height 50px
            text-align center
            .uploadBtn
                width 150px
                height 40px
                background-color #F56C6C
                border 0px solid #fff
                color #fff   

                

                    
            

</style>