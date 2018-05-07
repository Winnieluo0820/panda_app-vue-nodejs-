<template>
    <div>
        <form class="ui form segment" style="width: 30%;margin: 0 auto;">
            <div class="field">
                <label>用户名</label>
                <input type="text" v-model="data.username" placeholder="用户名">
            </div>
            <div class="field">
                <label>密码</label>
                <input type="password" v-model="data.password" placeholder="密码">
            </div>
            <button class="ui fluid primary button" @click="login">登录</button>
        </form>
    </div>
</template>

<style type="text/css">
    @import 'login.css';
</style>
<script>
    import http from '../../utils/httpclient.js'
    export default {
        data(){
            return {
                data: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            login(){
                http.post('adminlogin', this.data).then((res) => {
                    if(res.status){
                        window.localStorage.setItem('token_name',res.data);
                        this.$router.push({name:'product_manage'}); 
                    }else{
                        window.alert('登录失败')
                    }
                }) 
            }
        }
    }
</script>