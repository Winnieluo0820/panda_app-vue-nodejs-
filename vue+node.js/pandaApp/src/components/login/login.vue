<template>
    <div class="login">
        <router-link to="/" class="close">&times;</router-link>
        <div class="main">
            <p>登录后，解锁更多功能</p>
            <div class="input_box">
                <div class="input_box_div">
                    <i class="iconfont icon-shouji"></i>
                    <input placeholder="请输入手机号码" v-model="data.username">
                </div>
            </div>
            <div class="input_box">
                <div class="input_box_div">
                    <i class="iconfont icon-mima"></i>
                    <input placeholder="请输入密码" v-model="data.password">
                 <!--   <div class="yanzhengma_box">获取验证码</div>-->
                </div>
            </div>
            <div class="login_btn" @click="login">快速登录</div>
            <div class="register" @click="$router.push('register')">快速注册</div>
        </div>
        <div class="footer">
            <p>其他登录方式</p>
            <ul class="qq">
                <li>
                    <!-- <div class="qq_box"> -->
                        <i class="iconfont icon-QQ "></i>
                    <!-- </div> -->
                    <p>QQ</p>
                </li>
                <li>
                    <!-- <div class="qq_box"> -->
                        <i class="iconfont icon-weixin "></i>
                    <!-- </div> -->
                    <p>微信</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import http from '../../utils/httpclient'
    export default {
        data(){
            return {
                data: {
                    username:'',
                    password:''
                }
            }
        },
        methods: {
            login(){
                http.post('login',this.data).then((res) => {
                    console.log(res);
                    if(res.status){
                        window.localStorage.setItem('token_name',res.data);
                        this.$router.push({name:'owner'});
                    }
                })
            }
        }
    }
</script>
<style lang="scss" >
    @import 'login.scss';
</style>