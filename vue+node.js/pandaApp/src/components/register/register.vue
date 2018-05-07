<template>
    <div class="register">
        <router-link to="/owner" class="close">&times;</router-link>
        <div class="main">
            <p>注册后，解锁更多功能</p>
            <div class="input_box" style="margin-bottom:0;"">
                <div class="input_box_div">
                    <i class="iconfont icon-shouji"></i>
                    <input placeholder="请输入手机号码" v-model="data.username">
                </div>
            </div>
            <p ref="msg" style="margin-bottom:0;text-align:left;font-size:40px;line-height:50px;padding-left:170px;height:50px;"></p>
            <div class="input_box">
                <div class="input_box_div">
                    <i class="iconfont icon-mima"></i>
                    <input placeholder="请输入密码" v-model="data.password">
              
                </div>
            </div>
            <div class="register_btn" @click="register" ref="zhuce">快速注册</div>
        </div>
        <div class="footer">
            <p>其他登录方式</p>
            <ul class="qq">
                <li>
                    <div class="qq_box">
                        <i class="iconfont icon-QQ"></i>
                    </div>
                    <p>QQ</p>
                </li>
                <li>
                    <div class="qq_box">
                        <i class="iconfont icon-weixin"></i>
                    </div>
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
            register(){
                http.post('register',this.data).then((res) => {
                    if(res.status){
                        this.$refs.msg.innerText = 'x该用户已注册';
                    }else{
                        this.$refs.zhuce.innerText = '注册成功';
                        this.$refs.zhuce.style.background = '#FECD61';
                        this.$router.push({name:'login'});
                    }
                })
            }
        }
    }
</script>
<style lang="scss" >
    @import 'register.scss';
</style>