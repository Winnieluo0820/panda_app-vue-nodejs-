<template>
    <div class="home_recommend">
        <div class="recommend_banner">
            <div class="swiper-container" id="swiper1">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="obj in banner_data">
                        <router-link :to="obj.link">
                            <img :src="obj.img" />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="recommend_main">
            <div class="main1">
                <div class="left" @click="$router.push('/goodsList')">
                    <span>9块9包邮</span>
                    <span>保你不亏</span>
                    <img :src="main_data.main1.left.img"/>
                </div>
                <div class="right">
                    <div class="same" @click="$router.push('/goodsList')">
                        <span>大额卷专区</span>
                        <span>秒杀一折起</span> 
                        <img :src="main_data.main1.right.img1"/>                       
                    </div>
                    <div class="same" @click="$router.push('/goodsList')">
                        <span>特价春款</span>
                        <span>低至9块9</span>  
                        <img :src="main_data.main1.right.img2"/>                      
                    </div>
                </div>
            </div>
            <div class="main2">
                <div class="head">
                    <span>每日排行榜</span>
                    <router-link to="">查看全部 ></router-link> 
                </div>
                <div class="bottom">
                    <div class="content">
                        <router-link to="" v-for="obj in main_data.main2" :key="obj.img">
                            <img :src="obj.img" />
                            <p>{{obj.content}}</p>
                            <p>￥<span>{{parseInt(obj.price)}}</span><span>.{{parseInt(obj.price*10%10)}}</span><span>{{obj.buies}}人已买</span></p>
                        </router-link>
                        <router-link to="">
                            <div class="more">
                                <p><span>更多商品</span></p>
                                <span>see-more</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="main3">
                <span class="line"></span>
                <span class="center"><i class="before"></i>更多优惠更新中 (ง •̀_•́)ง<i class="after"></i></span>
                <span class="line"></span>
            </div>
            <div class="main4">
                <ul>
                    <li v-for="obj in main_data.main4" :id="obj._id">
                        <router-link to="" class="ncot">
                            <img :src="obj.product_imgurl"/>
                            <p><img src="//img6.lukou.com/js/img/baoyou.20f74bf.png"/>{{obj.product_name}}</p>
                            <div class="price">￥<span>{{parseInt(obj.price)}}</span><span>.{{parseInt(obj.price*10%10)}}</span></div>
                        </router-link>               
                    </li>
                </ul>
            </div>
        </div>         
    </div>
</template>

<script type="text/javascript">
    import './recommend.scss';
    import $ from 'jQuery'
    import http from '../../../../utils/httpclient.js';

    export default {
        data:function(){
            return{
                banner_data:[{link:'',img:'//img1.lukou.com/static/p/commodity/img/20180429-112115.jpeg'},{link:'/',img:'//img1.lukou.com/static/p/commodity/img/20180423-162110.jpeg'},{link:'',img:'//img1.lukou.com/static/p/commodity/img/20180417-192602.jpeg'},{link:'',img:'//img1.lukou.com/static/p/commodity/img/20180409-160905.jpeg'}],
                main_data:{
                    main1:{
                        left:{link:'recommend',img:'//img1.lukou.com/static/p/commodity/img/20180226-162136.jpeg'},
                        right:{link1:'recommend',img1:'//img1.lukou.com/static/p/commodity/img/20180226-162153.jpeg',link2:'recommend',img2:'//img1.lukou.com/static/p/commodity/img/20180226-162210.jpeg'}
                    },
                    main2:[{img:'//img1.lukou.com/static/p/commodity/img/20027534.jpeg',content:'脸部去角质面部女',price:3.8,buies:17540},{img:'//img1.lukou.com/static/p/commodity/img/20027498.jpeg',content:'卡奈资小羊皮口红',price:9.9,buies:27537},{img:'//img1.lukou.com/static/p/commodity/img/20027368.jpeg',content:'瘦脸神器脸部滑轮',price:9.9,buies:12435},{img:'//img1.lukou.com/static/p/commodity/img/20026961.jpeg',content:'2支装 眼线笔持久',price:7.9,buies:56157},{img:'//img1.lukou.com/static/p/commodity/img/20024349.jpeg',content:'洗脸发带女发绳',price:2.8, buies:82212}],
                    main4:[]
                },
            }
        },
        mounted:function(){
            var self = this;
            //获取商品数据
            http.post('query_product').then((res)=>{
                this.main_data.main4 = res.data;
                
            })

            var $banner = $('#panda_home .recommend_banner');
            var $banner_ul = $banner.find('ul');
            var $banner_lis = $banner_ul.find('li');
            var $main2 = $('#panda_home .recommend_main .main2 .bottom');
            var $main2_content = $main2.children();
            var $main2_lis = $main2_content.find('a');
            var $main4_ul = $('#panda_home .recommend_main .main4 ul');
            //轮播图
            var mySwiper1 = new Swiper ('#swiper1', {
                autoplay:1,//自动滚动
                loop:true,//循环
                speed:3000,//滚动速度
                // slidesPerView : 4,//slide可见数量
                spaceBetween : 0,//slide之间的距离（单位px）
                disableOnInteration:false
            })
            //main2滑动
            ;(function(){
                $main2_content.width(($main2_lis.width()+40)*$main2_lis.length)

                var main2_len = $main2_content.width();
                var a_len = $main2_lis.width();

                $main2.on('touchstart',function(event){
                    var ox = event.touches[0].pageX;
                    var left = $main2_content.position().left;
                    $main2.on('touchmove',function(event){
                        $main2_content.css('left', event.touches[0].pageX - ox + left)
                    })
                })
                .on('touchend',function(){
                    if($main2_content.position().left > 0){
                        $main2_content.animate({left:0},300)
                    }
                    if($main2_content.position().left < -main2_len+a_len*3){
                        $main2_content.animate({left:-main2_len+a_len*3},300)
                    }
                })

            })();

            //给列表页绑定事件 点击跳转
            $main4_ul.on('click','li',function(){
                var id = $(this).attr('id');
                self.$router.push('/goodDetail?id='+id)
            })

        }
    };
</script>