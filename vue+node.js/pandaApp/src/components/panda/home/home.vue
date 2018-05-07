<template>
    <div id="panda_home">
        <div class="home_header">
            <div class="top">
                <div class="sex">
                    <span>男</span>
                    <span class="active">女</span>
                </div>
                <div class="home_search">
                    <input type="text" class="search" id="search" :placeholder="search"/>
                    <i class="zoom"></i>                  
                </div>
            </div>
            <div class="bottom">
                <div class="b_left">
                    <span class="active" @click="$router.push({name:'recommend'})">今日推荐</span>
                    <i class="line">|</i>
                </div>
                <div class="b_center">
                    <ul class="list">
                        <li v-for="obj in menuData" >
                            <router-link to="menu"><span @click="menuDetail(obj.data)">{{obj.title}}</span></router-link>
                        </li>
                    </ul>
                </div>
                <div class="b_right" @click="showMenu">
                    <i class="menuicon"></i>
                </div>
                <div class="menu" v-show="menu">
                    <p>全部分类<i class="del" @click="showMenu"><img src="//img6.lukou.com/js/img/float-close.1eb21c0.png"/></i></p>
                    <ul class="list1">
                        <router-link to="/" ><img @click="showMenu" src="http://img1.lukou.com/static/p/fb/tab/1.png" /><span>今日推荐</span></router-link>
                        <router-link to='menu' v-for="obj in menuData" :key="obj.data.img">
                            <img @click="hidemenuDetail(obj.data)" :src="obj.title_img"/>
                            <span>{{obj.title}}</span>
                        </router-link>
                    </ul>
                </div>
            </div>
        </div>
        <div class="home_main">
            <router-view :msgMenu="singleMenu" :goods="goodData"></router-view>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './home.scss';
    import http from '../../.../../../utils/httpclient.js';
     import $ from 'jQuery';
    export default {
        data(){
            return {
                search: "短袖",
                menu:false,
                singleMenu:[],
                goodData:[]
            }
        },
        props:['menuData'],
        methods:{
            showMenu:function(){
                this.menu = !this.menu
            },
            menuDetail:function(data){
                this.singleMenu = data;
            },
            hidemenuDetail:function(data){
                this.singleMenu = data;
                this.menu = !this.menu;
            }
        },
        mounted:function(){
            var self = this;
            var $bottom = $('#panda_home .home_header .bottom');
            var $list = $('#panda_home .b_center .list');
            var $menu = $('#panda_home .home_header .bottom .menu .list1');
            var $home_search = $('#panda_home .home_header .home_search')
            //菜单滑动
            $('#panda_home .b_center').on('touchstart', function(event){
                var ox = event.touches[0].pageX;
                var left = $list.position().left;
                $('#panda_home .b_center').on('touchmove', function(event){
                    $list.css('left', (event.touches[0].pageX - ox + left))
                })
            })
            .on('touchend',function(){
                if($list.position().left > 0){
                    $list.animate({left:0}, 200);
                }
                if($list.position().left < -($list.width()-$list.parent().width())){
                    $list.animate({left:-($list.width()-$list.parent().width())}, 200);
                }                
            })

            //点击菜单tab切换并发起ajax请求
            $bottom.on('click','span',function(){
                $bottom.find('span').removeClass('active');
                $(this).addClass('active');
                http.post('query_product',{product_type:$(this).text()}).then(function(res){
                    self.goodData = res.data;
                })
                
            })

            //点击菜单小图标触发菜单tab切换并发起ajax请求
            $menu.on('click','a',function(){
                $bottom.find('span').removeClass('active');
                var text = $(this).text().trim();
                $bottom.find('span').filter(':contains('+text+')').eq(0).addClass('active');
                http.post('query_product',{product_type:text}).then(function(res){
                    self.goodData = res.data;
                }.bind(self))
            })

            //点击搜索框跳转到搜索组件
            $home_search.click(function(){
                self.$router.push('/pandaSearch');
            })
            
        }


    }
</script>