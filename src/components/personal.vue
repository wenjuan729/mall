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
                            <el-dropdown>
                                <span class="el-dropdown-link">
                                    个人设置<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item><span @click="personalDialogVisible = true">修改个人信息</span></el-dropdown-item>
                                    <el-dropdown-item><span @click="changePasswordDialog = true">修改密码</span></el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
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
                    <el-tab-pane label="我购买的商品" >
                        <ul class="buyGoodsWrapper">
                            <li class="buygoods" v-for="(item, index) in buyGoodsList" :key="index">
                                <img :src="'api/getPic?path='+ item.goods_img" class="buygoodsImg">
                                <div class="buygoodstitle">
                                    {{item.goods_title}}
                                    <span class="buygoodsprice">￥{{item.goods_price}}</span>
                                </div>
                                <div class="buygoosTimeBox">
                                    <p class="buygoodTimeText">购买时间 : </p>
                                    <p class="buyGoodTime">{{item.ctime}}</p>
                                </div>
                             </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <!-- 修改个人信息弹框 -->
        <el-dialog
            title="修改个人信息"
            :visible.sync="personalDialogVisible"
            width="50%"
            :before-close="handleClose">
            <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="性别">
                    <el-input v-model="gender"></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="age"></el-input>
                </el-form-item>
                <el-form-item label="个人描述">
                    <el-input placeholder="请输入1-20个字符" v-model="describe"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="personalDialogVisible = false" class="btnClass">取 消</el-button>
                <el-button type="primary" @click="submitPersonal" class="btnClass">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 修改密码弹框 -->
        <el-dialog
            title="修改密码"
            :visible.sync="changePasswordDialog"
            width="31%"
            :before-close="handleClose">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                <el-form-item label="当前密码" prop="curpass" class="passClass">
                    <el-input type="password" v-model="ruleForm2.curpass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="请输入新密码" prop="pass" class="passClass">
                    <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass" class="passClass">
                    <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm2')" class="btnPass">提交</el-button>
                    <el-button @click="resetForm('ruleForm2')" class="btnPass">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
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
          this.changeData = this.tableData[index];
      },
      changePersonal () {
          this.isChanging = !this.isChanging;
      },
      //关闭弹窗提示
      handleClose (done) {
          this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //提交修改个人信息
      submitPersonal () {
          this.personalDialogVisible = false;
            axios.get('api/updatePersonalList?age='+ this.age +'&gender='+ this.gender +'&describe='+ this.describe +'&id=' +this.personalList.id ).then(res => {
                // axios.get('api/queryLoginByUsername').then(res => {
                //     var personal = JSON.parse(res.data.data);
                //     this.personalList = personal[0];
                //     this.gender = personal[0].gender;
                //     this.age = personal[0].age;
                //     this.describe = personal[0].describe;
                // })
                if(res.data.status == 'success'){
                    this.personalList.age = this.age;
                    this.personalList.gender = this.gender;
                    this.personalList.describe = this.describe;
                }
            })
      },
      //提交修改密码表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.get('api/updatePersonalPassword?password='+ this.ruleForm2.pass +'&id=' +this.personalList.id ).then(res => {
                // console.log(res)
                // this.$cookieStore.setCookie( 'password' ,this.ruleForm2.pass,86400);
                // this.$message({
                //     message: '密码修改成功,请重新登陆',
                //     type: 'success'
                // })
                alert('密码修改成功,请重新登陆')
                this.changePasswordDialog = false; 
            })
            this.$cookieStore.delCookie('username');
            this.$router.push({name:'login'});
          } else {
            console.log('错误提交请稍后再试');
            this.$message.error('密码修改失败，请重新输入');
            return false;
          }
        });
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.changePasswordDialog = false; 
      }
    },
    data() {
        //表单验证
        var validCurPass = (rule,value,callback) => {
            var curPassword = this.$cookieStore.getCookie('password')
            if(value !== curPassword) {
                callback(new Error('请确认正确密码'));
            }else{
                callback();
            }
        }
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入新密码'));
            } else {
            if (this.ruleForm2.checkPass !== '') {
                this.$refs.ruleForm2.validateField('checkPass');
            }
            callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请再次输入密码'));
            } else if (value !== this.ruleForm2.pass) {
            callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
      return {
        isChanging: false,
        personalDialogVisible:false,
        labelPosition: 'right',
        changeData:{},
        personalList:{},
        tableData: [{}],
        buyGoodsList:{},
        gender:'',
        age:'',
        describe:'',
        changePasswordDialog:false,
        ruleForm2: {
            curpass:'',
            pass: '',
            checkPass: '',
        },
        //校验规则
        rules2: {
            curpass:[
                {validator: validCurPass,trigger: 'blur'}
            ],
            pass: [
                { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
                { validator: validatePass2, trigger: 'blur' }
            ],
        }
      }
    },
      
    created () {
        axios.get('api/queryLoginByUsername').then(res => {
            // console.log(res)
            var personal = JSON.parse(res.data.data);
            this.personalList = personal[0];
            this.gender = personal[0].gender;
            this.age = personal[0].age;
            this.describe = personal[0].describe
        })
        axios.get('api/queryGoodsByUsername').then(res => {
            this.tableData = res.data;
        })
        axios.get('api/queryBuyGoodsByUsername').then(res => {
            console.log(res)
            this.buyGoodsList = res.data;
        })
    }
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
                display inline-block
                height 30px
                font-size 24px
                color #444
            .el-dropdown-link
                width 200px
                height 30px
                margin-left 1200px
                font-size 24px;
                cursor pointer;
                color #444;
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
                    // border 1px solid #ccc
                    border-radius 5px
                    padding 5px
                    font-size 16px
        .buyGoodsWrapper
            margin 0 auto
            width 1120px
            .buygoods
                position relative
                margin-top 10px
                width 1120px
                height 100px
                border 1px solid #ccc
                .buygoodsImg
                    margin-left 60px
                    margin-top 10px
                    width 80px;
                    height 80px;
                .buygoodstitle
                    display inline-block
                    position absolute
                    top 10px
                    width 60%
                    height 80px
                    line-height 80px
                    font-size 26px
                    margin-left 50px
                    color #444
                    border 1px solid #ccc
                    .buygoodsprice
                        position absolute
                        top 0px
                        right 16px
                        font-size 22px
                        color #f40
                .buygoosTimeBox
                    display inline-block
                    position absolute
                    top 10px
                    right 40px
                    .buygoodTimeText
                        margin-top 15px
                        margin-left 55px
                        color #333
                    .buyGoodTime
                        margin-top 15px
                        color #409EFF
.btnClass
    width 100px
    padding 10px 0
.passClass
    width 400px
    margin-top 20px
.btnPass
    margin-top 20px
    width 100px
    padding 10px 0
    
</style>