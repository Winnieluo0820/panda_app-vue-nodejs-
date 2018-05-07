<template>
    <div>
        <div class="ui inverted secondary menu">
            <router-link to="/main/product_manage" class="item">商品管理</router-link>
            <router-link to="/main/addproduct" class="item">增加商品</router-link>
            <router-link to="/main/admin" class="item">后台管理员列表</router-link>
            <router-link to="/main/mobile_user" class="item">手机用户列表</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<style type="text/css">
    @import 'main.css';
</style>
<script type="text/javascript">
    export default{}
</script>