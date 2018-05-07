<template>
    <div class="home_menu">
        <div class="menu_header">
            <div class="top">
                <span class="line"></span>
                <span class="center"><i class="before"></i>潮流精选<i class="after"></i></span>
                <span class="line"></span>
            </div>
            <div class="center">
                <ul class="list1">
                    <a v-for="obj in msgMenu" @click="">
                        <img :src="obj.img" />
                        <span>{{obj.type}}</span>
                    </a>
                </ul>
            </div>
            <div class="bottom">
                <span class="line"></span>
                <span class="center"><i class="before"></i>大家都在逛<i class="after"></i></span>
                <span class="line"></span>
            </div>
        </div>
        <div class="menu_main">
            <ul class="list">
                <li v-for="obj in goods" :id="obj._id">
                    <router-link to="">
                        <img :src="obj.product_imgurl"/>
                        <p><img src="//img6.lukou.com/js/img/baoyou.20f74bf.png"/>{{obj.product_name}}</p>
                        <div class="price">￥<span>{{parseInt(obj.price)}}</span><span>.{{parseInt(obj.price*10%10)}}</span></div>
                    </router-link>                     
                </li>                
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './menu.scss';
    export default {
        data(){
            return {  
            }
        },
        props:['msgMenu','goods'],
        mounted(){
            var self = this;
            var $menu_main_ul = $('.home_menu .menu_main .list');
            //给列表页绑定事件 点击跳转
            $menu_main_ul.on('click','li',function(){
                var id = $(this).attr('id');
                self.$router.push('/goodDetail?id='+id)
            })
        }
    }
</script>