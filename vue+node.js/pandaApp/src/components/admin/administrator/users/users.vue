<template>
    <div class="users_box">
        <div class="table_box">

            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>password</th>
                    <th>delete</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(obj,idx) in dataset" :key="idx">
                    <td>{{idx+1}}</td>
                    <td class="username">{{obj.username}}</td>
                    <td>{{obj.password}}</td>
                    <td><input @click="del" type="button" value="delete"/></td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="action">

        </div>
    </div>
</template>

<script>
    import http from '../../../../router/httpclient.js'

    export default {
        data(){
            return  {
                dataset:[]
            }
        },
        mounted(){
            //发起一次ajax请求
            //目的把token当参数传给后端
            http.get('users').then((res)=>{
                this.dataset = res.data;
                if(res.message == 'unauth'){
                    this.$router.push({name:'admin_login'});
                }
            })
        },
        methods:{
            del(e){
                let username = e.target.parentNode.parentNode.getElementsByClassName('username')[0].innerText;
                http.post('removeUsers',{username}).then((res) => {
                    if(res.status){
                        e.target.parentNode.parentNode.parentNode.removeChild(e.target.parentNode.parentNode)
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import 'users.scss'
</style>