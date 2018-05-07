<template>
    <div id="panda">
        <div id="main">
            <router-view :menuData="menuData"></router-view>
        </div>
        <footer id="footer">
            <ul>
                 <li @click="$router.push('/')">
                    <span class="iconfont icon-shouye"></span>
                    <a>首页</a>
                 </li>
                 <li @click="$router.push('/species')">
                 	<span class="iconfont icon-fenlei"></span>
                    <a>分类</a>
                 </li>
                 <li @click="$router.push('/car')">
                 	<span class="iconfont icon-gouwucheman"></span>
                    <a>购物车</a>
                 </li>
                 <li @click="$router.push('/owner')">
                 	<span class="iconfont icon-ren"></span>
                    <a>我的</a>
                 </li>
             </ul>            
        </footer>
    </div>
</template>

<script type="text/javascript">
    import '../../style/panda.scss';
    import http from '../../utils/httpclient.js';
    export default {
        data(){
            return{
                menuData:[]
            }
        },
        mounted(){
            var self = this;
            http.post('tabs').then(function(res){
                self.menuData = res.data;
            }.bind(self))
        }
    };
</script>

