<template>
    <div class="box">
        <div class="meun">
            <div class="logo"><img src="./timg.jpg" /><span>熊猫后台管理</span></div>
            <ul>
                <li><router-link to="/users">用户管理</router-link></li>
                <li><router-link to="/goods">商品管理</router-link></li>
            </ul>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    
</script>

<style lang="scss">
    @import 'administrator.scss'
</style>