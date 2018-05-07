<template>
    <div id="panda_owner">
        <div class="owner_top">
            <span class="iconfont icon-tuichu6 exit" @click="tuichu"></span>
            <div class="owner_top_cont">
                <div class="owner_top_main">
                    <div class="touxiang">
                        <input type="file" id="upload"/>
                        <div class="avator">
                            <img alt="" data-src="http://vue.wclimb.site/images//avator/8d348rp6z21524744505636.png" src="http://vue.wclimb.site/images//avator/8d348rp6z21524744505636.png" lazy="loaded">
                        </div>
                    </div>
                    <div class="name">
                        <i @click="tologin">{{username}}</i>
                        <span class="iconfont icon-icon-2" @click="modify"></span>
                    </div>
                    <div class="cont">
                        <ul>
                            <li><span  class="iconfont icon-wodedingdan active"></span><span><router-link to="/order/all">我的订单</router-link></span></li>
                            <li><span  class="iconfont icon-gouwucheman active"></span><span><router-link to="/car">我的购物</router-link></span></li>
                            <li><span  class="iconfont icon-icon3 active"></span><span><router-link to="/order">收藏商品</router-link></span></li>
                            <li><span  class="iconfont icon-dizhi active"></span><span><router-link to="/order">地址管理</router-link></span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="owner_main">
            <ul>
                <li>推荐APP给小伙伴</li>
                <li>求打分好评~</li>
                <li>帮助反馈</li>
                <li>关于熊猫优选</li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
    import http from '../../../utils/httpclient.js'
    export default{
        data(){
            return {
                username:''
            }
        },
        mounted:function(){
            http.post('islogin').then((res)=>{
                this.username=res;console.log(res)
            })
        },
        methods:{
            modify(event){
                if(event.target.classList.contains('icon-icon-2')){
                    console.log(event.target);
                    event.target.classList.remove('icon-icon-2');
                    event.target.classList.add('icon-icon3');
                    let input=document.createElement('input');
                    let txt=event.target.previousSibling.nodeValue;
                    input.value=txt;
                    input.type="text";
                    event.target.previousSibling.nodeValue='';
                    event.target.parentNode.insertBefore(input,event.target);
                }else if(event.target.classList.contains('icon-icon-3')){
                    console.log(event.target);
                    event.target.classList.remove('icon-icon-3');
                    event.target.classList.add('icon-icon-icon2');
                }  
            },
            tologin(event){
                if(event.target.innerHTML==='点击登录'){
                    this.$router.push({name:'login'});
                }
            },
            tuichu(){
                window.localStorage.removeItem('token_name');
                window.location.reload();
            }
        },

    }
</script>
<style lang="scss" >
@import 'owner.scss';
</style>

