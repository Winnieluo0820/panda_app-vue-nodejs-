<template>
    <div class="panda_goodDetail">
        <div class="goodDetail_return" @click="returnBack">&lt;</div>
        <div class="goodDetail_img">
            <div class="swiper-container" id="swiper2">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="img in imgBanner">
                        <img :src="img"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="goodDetail_main">
            <div class="main1">
                <p><img src="//img6.lukou.com/js/img/baoyou.20f74bf.png"/>{{good.product_name}}</p>
                <div class="bottom">
                    <div class="left">￥<span>{{parseInt(good.price)}}</span><span>.{{parseInt(good.price*10%10)}}</span></div>
                    <div class="right">
                        <span>月销量：{{good.qty_sold}}</span>
                    </div>
                </div>
            </div>
            <div class="main2">
                <span class="line"></span>
                <span class="text">淘宝图文详情</span>
                <span class="line"></span>
            </div>
            <div class="main3">
                <img :src="img" v-for="img in good.imgs" />
            </div>
        </div>
        <div class="goodDetail_bottom">
            <span class="iconfont icon-icon_collect" @click="changecolor"></span><p>收藏</p>
            <button id="car" @click="$router.push('/car')">我的购物车</button>
            <button id="addBtn">添加购物车</button>
            <div class="carmove">已添加购物车{{total}}件</div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './goodDetail.scss';
    import http from '../../utils/httpclient.js';
    // import $ from 'jQuery';
    export default {
        data(){
            return {
                good:{},
                imgBanner:[],
                total:0
            }
        },
        methods:{
            returnBack:function(){
                this.$router.push('/');
            },
            changecolor:function(event){
                if(event.target.classList.contains('pink')){
                    event.target.classList.remove('pink');
                    // http.post('addToShopcart',{product_id:id}).then(function(res){
                    //     console.log(res)
                        
                    // })  
                }else{
                    event.target.classList.add('pink'); 
                    // http.post('addToShopcart',{product_id:id}).then(function(res){
                    //     console.log(res)
                        
                    // })
                }
            }
        },
        mounted:function(){
            var self = this;
            var $addBtn = $('#addBtn');
            var $carmove = $addBtn.next();
            //获取id发起ajax请求
            var id = window.location.href.slice(window.location.href.indexOf('?')+1).split('=')[1];
            http.post('query_product',{product_id:id}).then((res)=>{
                self.good = res;

                var arr = [];
                arr.push(res.product_imgurl);
                arr = arr.concat(res.imgs);
                self.imgBanner = arr;
            })

            //点击添加购物车并判断是否用户登陆
            var timer;
            $addBtn.on('click',(event)=>{
                http.post('addToShopcart',{product_id:id}).then((res)=>{
                    if(res.status){
                    	this.total++;
                        clearTimeout(timer);console.log(666)
                        $carmove.show();
                        
                        $carmove.animate({right:0},500,function(){
                            timer = setTimeout(function(){
                                $carmove.hide(400,function(){
                                    $carmove.css('right',-$carmove.width())
                                })
                            },1000)
                        })
                    }
                })
            })


        },
        updated:function(){
            var mySwiper2 = new Swiper('#swiper2', {
                autoplay:true,//自动滚动
                loop:true,//循环
                speed:3000,//滚动速度
                // slidesPerView : 4,//slide可见数量
                spaceBetween : 0,//slide之间的距离（单位px）
                disableOnInteration:false
            })
        }
    }
</script>