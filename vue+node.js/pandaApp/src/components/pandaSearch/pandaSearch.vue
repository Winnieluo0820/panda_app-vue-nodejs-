<template>
    <div class="panda_Search">
        <div class="search_header">
            <button class="return">返回</button>
            <input type="text" class="searchText" placeholder="搜索商品,发现更多优选"/>
            <button class="search">搜索</button>
            <img src="../../assets/zoom.jpg" class="iconSearch" />
        </div>
        <div class="search_main">
            <div class="top">
                <h3>热门搜索</h3>
                <p>
                    <span>T恤女</span>
                    <span>连衣裙</span>
                    <span>帽子</span>
                    <span>卫衣女</span>
                    <span>快手同款</span>
                    <span>防晒霜</span>
                    <span>外套 女</span>
                    <span>口红</span>
                </p>
            </div>
            <div class="bottom">
                <h3>商品分类</h3>
                <p>
                    <span>女装</span>
                    <span>男装</span>
                    <span>美妆护肤</span>
                    <span>配饰</span>
                    <span>女鞋</span>
                    <span>男鞋</span>
                    <span>零售王国</span>
                    <span>箱包</span>
                    <span>个人洗护</span>
                    <span>手机周边</span>
                    <span>数码家电</span>
                    <span>内衣袜子</span>
                    <span>成人用品</span>
                    <span>日用家居</span>
                    <span>文体娱乐</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './pandaSearch.scss'
    import http from '../../utils/httpclient.js'

    export default {
        mounted:function(){
            var self = this;
            var $ret = $('.panda_Search .return');
            var $search = $('.panda_Search .search');
            var $searchText = $('.panda_Search .searchText');
            var $searchmain = $('.panda_Search .search_main');
            //点击返回
            $ret.click(function(){
                self.$router.push('/');
            })
            //点击serachmain事件委托
            $searchmain.on('click','span',function(){
            	var text = $(this).text();
            	self.$router.push('/goodslist/goodsnormal?key='+text)
            })
            //点击搜索跳转
           	$search.click(function(){
           		var text = $searchText.val().trim();
           		if(text == ''){
           			return false;
           		}
           			self.$router.push('/goodslist/goodsnormal?key='+text)
           	})
        }
    }

</script>