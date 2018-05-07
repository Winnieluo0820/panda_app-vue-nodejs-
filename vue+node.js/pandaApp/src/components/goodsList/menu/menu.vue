<template>
	
 <ul>
        <li v-for="obj in menus" :key="obj.path" @click="changecolor">
            <router-link :to="obj.path">{{obj.text}}</router-link>
        </li>
    </ul>


</template>

<script>
    import $ from 'jQuery'
	export default {
        data(){
            return {
                menus: [
                    {path: '/goodslist/goodsnormal', text: '默认排序'},
                    {path: '/goodslist/goodsprices', text: '价格最低'},
                    {path: '/goodslist/goodsqty',text: '销量最高'}
                ]
            }
        },
        methods:{
            changecolor(event){

            }
        }
   }
</script>

<style>
</style>