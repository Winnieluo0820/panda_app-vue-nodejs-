<template>
    <div id="panda_order">
        <div class="order_header">
            <span class="iconfont icon-jiantou2 back" @click="$router.push({name:'owner'})"></span>
            <p>我的订单</p>
        </div>
        <div class="order_nav">
            <ul>
                <li class="active" @click="change">
                    <router-link to="/order/all" >全部</router-link>
                </li>
                <li @click="change">
                    <router-link to="/toPay" >待付款</router-link>
                </li>
                <li @click="change">
                    <router-link to="/toSend">待发货</router-link>
                </li>
                <li @click="change">
                    <router-link to="/toReceive">待收货</router-link>
                </li>
                <li @click="change">
                    <router-link to="/toEvaluate">待评价</router-link>
                </li>
             </ul>     
        </div>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script type="text/javascript">
    export default{
        methods:{
            change(event){
                let ul=document.getElementsByClassName('order_nav')[0].children[0];
                let lis=ul.children;
                for(let i=0;i<lis.length;i++){
                    lis[i].classList.remove('active');
                }
                event.target.parentNode.classList.add('active');
            }
        }
    }
</script>
<style lang="scss" >
@import 'order.scss';
</style>