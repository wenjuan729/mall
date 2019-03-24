<template>
    <div class="personalWrapper">
        <change-goods v-show="isChanging"  @changePersonal = 'changePersonal' :changeData="changeData"></change-goods>
        <div class="personalBox">
            <div class="personalHeader">我的个人中心</div>
            <div class="personalContent">
                <el-tabs type="border-card">
                    <el-tab-pane label="个人信息">
                        <div class="personalText">
                            <p class="user">账号：{{personalList.user_name}}</p>
                            <p class="personalGender">性别：{{personalList.gender}}</p>
                            <p class="personalAge">年龄：{{personalList.age}}</p>
                            <div class="personalDescribe">
                                我的描述：
                                <div class="describeText">
                                    {{personalList.describe}}
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
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="title"
                                label="商品名称"
                                width="160">
                            </el-table-column>
                            <el-table-column
                                prop="price"
                                label="商品价格"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="quality"
                                label="商品质量"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="address"
                                label="商品所在地址"
                                width="120">
                            </el-table-column>
                            <el-table-column
                                prop="introduce"
                                label="商品描述"
                                width="400">
                            </el-table-column>
                            <el-table-column
                                prop="deliver"
                                label="快递费用"
                                width="80">
                            </el-table-column>
                            <el-table-column
                                prop="ctime"
                                label="上传时间"
                                width="180">
                            </el-table-column>
                            <el-table-column
                                prop="utime"
                                label="最近修改时间"
                                width="180">
                            </el-table-column>
                            <el-table-column
                            fixed="right"
                            label="操作"
                            width="100">
                            <template slot-scope="scope">
                                <el-button @click="deleatGoods(scope.$index)" type="text" size="small">删除</el-button>
                                <el-button @click="change(scope.$index)" type="text" size="small">修改</el-button>
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
import axios from 'axios'

export default {
    components:{
        ChangeGoods
    },
    methods: {
    //删除商品
    deleatGoods(index) {
        axios.get('/api/deleatGoods?id='+ this.tableData[index].goods_id).then(res => {
                console.log(res)
                if(res.data.status == 'success') {
                    alert("商品删除成功");
                    axios.get('api/queryGoodsByUsername').then(res => {
                        this.tableData = res.data;
                    })
                }else{
                    alert("商品删除失败，请待会重试");
                }
            })
      },
    //修改商品
      change (index) {
          this.isChanging = !this.isChanging;
          console.log(this.isChanging)
          this.changeData = this.tableData[index];
          console.log(this.changeData)
      },
      changePersonal () {
          this.isChanging = !this.isChanging;
          console.log(this.isChanging)
      }
    },
    data() {
      return {
        isChanging: false,
        changeData:{},
        personalList:{},
        tableData: [{}]
      }
    },
    created () {
        axios.get('api/queryLoginByUsername').then(res => {
            // console.log(res)
            var personal = JSON.parse(res.data.data);
            this.personalList = personal[0];
        })
        axios.get('api/queryGoodsByUsername').then(res => {
            this.tableData = res.data;
        })
    },
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
.personalWrapper
    min-Height 500px
    padding-bottom 35px
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