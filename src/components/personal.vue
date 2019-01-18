<template>
    <div class="personalWrapper">
        <change-goods v-show="isChanging"  @change = 'change'></change-goods>
        <div class="personalBox">
            <div class="personalHeader">我的个人中心</div>
            <div class="personalContent">
                <el-tabs type="border-card">
                    <el-tab-pane label="个人信息">
                        <div class="personalText">
                            <p class="user">账号：{{personalList[0].username}}</p>
                            <p class="personalGender">性别：{{personalList[0].gender}}</p>
                            <p class="personalAge">年龄：{{personalList[0].age}}</p>
                            <div class="personalDescribe">
                                我的描述：
                                <div class="describeText">
                                    {{personalList[0].describe}}
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="我上传的商品">
                        <el-table
                            :data="tableData"
                            border
                            style="width: 100%">
                            <el-table-column
                                fixed
                                prop="category"
                                label="商品类别"
                                width="150">
                            </el-table-column>
                            <el-table-column
                                prop="title"
                                label="商品名称"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="price"
                                label="商品价格"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="quality"
                                label="商品质量"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="商品所在地址"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="introduce"
                                label="商品描述"
                                width="300">
                            </el-table-column>
                            <el-table-column
                                prop="deliver"
                                label="快递费用"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="ctime"
                                label="上传时间"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="image"
                                label="商品图片"
                                width="180">
                            </el-table-column>
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                                <el-button @click="change" type="text" size="small">修改</el-button>
                            </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        
    </div>
</template>

<script>
import ChangeGoods from "./personal/changeGoods"

export default {
    components:{
        ChangeGoods
    },
    methods: {
      handleClick(row) {
        console.log(row);
      },
      change () {
          this.isChanging = !this.isChanging;  
      }
    },

    data() {
      return {
        isChanging: false,
        personalList:[{
            username:"1001",
            age:"18",
            gender:"女",
            describe:"微笑，是一个人身上最好看的东西。"
        }],
        tableData: [{
          goodsId:"1",
          category: '手机',
          title: 'iphone配件',
          price: '50',
          quality: '8成新',
          address: '北京',
          introduce: "商品",
          deliver:"8",
          ctime:"2019年1月1日",
          image:"0000"
        }, {
           category: '手机',
          title: 'iphone配件',
          price: '50',
          quality: '8成新',
          address: '北京',
          introduce: "商品",
          deliver:"8",
          ctime:"2019年1月1日",
          image:"0000"
        }, {
           category: '手机',
          title: 'iphone配件',
          price: '50',
          quality: '8成新',
          address: '北京',
          introduce: "商品",
          deliver:"8",
          ctime:"2019年1月1日",
          image:"0000"
        }, {
           category: '手机',
          title: 'iphone配件',
          price: '50',
          quality: '8成新',
          address: '北京',
          introduce: "商品",
          deliver:"8",
          ctime:"2019年1月1日",
          image:"0000"
        }]
      }
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
.personalWrapper
    .personalHeader
        weidth 100%
        height 50px
        font-size 24px
        line-height 50px
        color #333
    .personalContent
        width 100%
        .personalText
            .user
                height 30px
                font-size 24px
                color #444
            .personalGender,.personalAge
                height 25px
                font-size 20px
                color #444
                margin-top 10px
            .personalDescribe
                height 100px
                font-size 20px
                color #444
                margin-top 10px
                .describeText
                    display inline-block
                    width 450px
                    height 70px
                    border 1px solid #ccc
                    border-radius 5px
                    padding 5px
                    font-size 16px
</style>