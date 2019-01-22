<template>
    <div class="register-wrapper">
        <div class="register_box">
            <div class="register_header">
                账户注册
            </div>
            <div class="register_main">
                <form action="">
                    <div class="box">
                        用户名:
                        <div class="inputBox">
                            <input type="text" placeholder="请输入4位数字的用户名" v-model="username">
                        </div> 
                    </div>
                    <div class="box">
                        您的密码：
                        <div class="inputBox">
                            <input type="password" placeholder="请输入密码" v-model="password">
                        </div>
                    </div>
                    <div class="box">
                        您的年龄：
                        <div class="inputBox">
                            <input type="text" placeholder="请输入年龄" v-model="age">
                        </div>
                    </div>
                    <div class="box">
                        您的性别：
                        <div class="inputBox">
                            <input type="text" placeholder="请输入性别" v-model="gender">
                        </div>
                    </div>
                    <div class="box">
                        个性宣言：
                        <div class="inputBox">
                            <input type="text" placeholder="请输入您的个性宣言" v-model="describe">
                        </div>
                    </div>
                    <button text="submit" class="sub" @click="submitForm()">
                        提交注册
                    </button>    
                </form> 
                <router-link class="register" :to="{name: 'login'}">已有账号，去登录</router-link>   

            </div> 
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data () {
        return {
            username:'',
            password:'',
            age:'',
            gender:'',
            describe:''
            
        }
    },
    methods: {
        submitForm () {
            axios.get('/api/editRegister?username='+ this.username +'&password='+ this.password +'&age='+ this.age +'&gender='+ this.gender +'&describe='+ this.describe).then((res) => {
                console.log(res)
                if(res.data.status == 'success') {
                    alert("注册成功！去登录");
                    this.$router.push({name:'login'})
                }else{
                    alert("用户名已被注册！去登录");
                    this.$router.push({name:'login'})
                }
            })
        }
    }
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
.register-wrapper
    width 100%
    height 600px
    background-image url(../assets/img/login_ba.jpg) 
    background-position center
    background-repat no-repat
    .register_box
        float right
        width 400px
        height 500px
        margin-top 50px
        margin-right 200px
        background-color #fff
        .register_header
            width 100%
            height 50px
            line-height 50px
            text-align center
            border-1px(rgba(240,20,20,0.1))
            font-size 16px
            font-weight 500
            color #f60
        .register_main
            width 100%
            .box
                position relative
                height 60px
                font-size 20px
                line-height 60px
                margin-top 10px
                margin-left 10px
                color #333
                .inputBox
                    position absolute
                    right 35px
                    top -3px
                    input 
                        width 250px
                        height 36px
                        line-height 36px 
                        border-radius 5px
                        border 1px solid #ccc 
            .sub
                width 320px
                height 40px
                margin-top 15px
                margin-left 35px
                background-color #f40
                border 0px
                font-size 20px
                font-weight 700
                color #fff
                cursor pointer
            .register
                display inline-block
                width 100%
                height 20px
                text-decoration none
                margin-top 15px
                text-align center
                font-size 14px
                color #000
                &:hover
                    color #ff6600
                    text-decoration underline
                    
                




</style>
