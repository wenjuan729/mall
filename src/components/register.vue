<template>
    <div class="login-wrapper">
        <div class="login_box">
            <div class="login_header">
                账户注册
            </div>
            <div class="login_main">
                <form action="">
                    <div class="input_use">
                        用户名： 
                        <input type="text" placeholder="请输入用户名" class="username">
                    </div>
                    <div class="input_pas">
                        密码：
                        <input type="password" placeholder="请输入密码" class="password">
                    </div>
                    <button text="submit" class="sub">
                        提交注册
                    </button>    
                </form> 
                <router-link class="login" :to="{name: 'login'}">已有账号，去登录</router-link>   

            </div> 
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang='stylus' ref='stylesheet/stylus' scoped>
@import '../assets/stylus/index.styl'
.login-wrapper
    width 100%
    height 600px
    background-image url(../assets/img/login_ba.jpg) 
    background-position center
    background-repat no-repat
    .login_box
        float right
        width 365px
        height 430px
        margin-top 50px
        margin-right 200px
        background-color #fff
        .login_header
            width 100%
            height 50px
            line-height 50px
            text-align center
            border-1px(rgba(240,20,20,0.1))
            font-size 16px
            font-weight 500
            color #f60
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
            .login
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
                    
                




</style>
