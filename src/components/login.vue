<template>
    <div class="login-wrapper">
        <div class="login_box">
            <div class="logBox">
                <div class="login_header" :class="{'clickHover':!ifHoverShow}" @click="changeHover">
                    用户登录
                </div>
                <span class="login_1"> | </span>
                <div class="login_header" :class="{'clickHover':ifHoverShow}" @click="changeHover">
                    管理员登录
                </div>
            </div>
           
            
            <div class="login_main" v-if="!closeUserName">
                <form action="">
                    <div class="input_use">
                        用户名： 
                        <input type="text" v-model="username" placeholder="请输入用户名" class="username">
                    </div>
                    <div class="input_pas">
                        密码：
                        <input type="password" v-model="password" placeholder="请输入密码" class="password">
                    </div>
                    <button text="submit" class="sub" @click="submitLoginForm()">
                        登录
                    </button>    
                </form>
                <router-link class="register" :to="{name: 'register'}">免费注册，有惊喜></router-link>   
            </div> 
            <div class="isLogin" v-else>
                <!-- <div class="hello">Hi,欢迎用户{{this.$store.state.username}}</div> -->
                <div class="hello">Hi,欢迎用户{{closeUserName}}</div>                
                <button class="changeIsLogin" @click="changeIsLogin()">退出登陆</button>
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
            closeUserName: this.$cookieStore.getCookie('username'),
            ifHoverShow:false
        }
    },
    methods:{
        changeHover () {
            this.ifHoverShow = !this.ifHoverShow;
        },
        submitLoginForm () {
            axios.get('api/login?username='+this.username+'&password='+this.password).then((res) => {
                if(res.data.status == 'success') {
                    this.$store.commit('setUserName',this.username);
                    if (this.ifHoverShow) {
                        if (this.username != 'admin') {
                            alert("只允许管理员登录！请选择用户登录");
                        } else {
                            // window.location.href = 'http://localhost:12306/index.html';
                            window.open("http://localhost:12306/index.html"); 
                        }
                        this.username = '';
                        this.password = '';
                    } else {
                        alert("登录成功");
                        this.$cookieStore.setCookie( 'username' ,this.username,86400);
                        this.$cookieStore.setCookie( 'password' ,this.password,86400);
                        this.$router.push({name:'home'})
                    }
                }else{
                    alert("用户名或者密码不正确,请重新登陆")
                    this.password = '';
                }
            })
        },
        changeIsLogin () {
            const answer = confirm("确定要退出登陆嘛？");
            if(answer) {
                this.$cookieStore.delCookie('username');
                this.closeUserName = this.$cookieStore.getCookie('username')
            }
        }
    }
    
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
.login-wrapper
    width 100%
    height 600px
    background-image url(../assets/img/login_ba.jpg) 
    background-position center
    .login_box
        float right
        width 365px
        height 430px
        margin-top 50px
        margin-right 200px
        background-color #fff
        .logBox
            widtn 100%
            height 50px
            line-height 50px
            text-align center
            border-1px(rgba(240,20,20,0.1))
            .login_1
                font-size 16px
                font-weight 500
                color #ccc
            .login_header
                display inline-block
                width 80px
                height 40px
                font-size 16px
                font-weight 500
                color #f60
                cursor pointer
            .clickHover
                border-bottom 2px solid #f60
        .login_main
            width 100%
            .input_use
                width 100%
                margin-top 40px
                margin-left 10px
                .username
                    width 250px
                    height 36px
                    line-height 36px
            .input_pas
                margin-left 26px
                margin-top 20px
                .password
                    width 250px
                    height 36px
                    line-height 36px
            .sub
                width 320px
                height 40px
                margin-top 45px
                margin-left 20px
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
                margin-top 40px
                text-align center
                font-size 14px
                color #000
                &:hover
                    color #ff6600
                    text-decoration underline
        .isLogin
            width 100%
            .hello
                width 100%
                height 40px
                font-size 28px
                color #333
                text-align center
                line-height 40px
                margin-top 80px
            .changeIsLogin
                width 320px
                height 40px
                margin-top 45px
                margin-left 20px
                background-color #f40
                border 0px
                font-size 20px
                font-weight 700
                color #fff
                cursor pointer

                    
                




</style>
