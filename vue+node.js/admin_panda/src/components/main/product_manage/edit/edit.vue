<template>
    <div>
        <form class="ui form segment" style="width:40%;margin:0 auto 40px">
            <div class="field">
                <label>商品名称</label>
                <input type="text"  placeholder="商品名称" v-model="goodObj.product_name" id="name" >
            </div>
            <div class="fields">
                <div class="field">
                    <label>图片路径</label>
                    <input type="text" placeholder="图片路径" id="imgurl" v-model="goodObj.product_imgurl">
                </div>
            </div>
            <div class="field">
                <div class="field">
                    <label>商品分类</label>
                    <input type="text"  placeholder="商品分类" v-model="goodObj.product_type" id="type">
                </div>
            </div>
            <div class="field">
                <div class="field">
                    <label>商品价格</label>
                    <input type="text"  placeholder="商品价格" v-model="goodObj.price" id="price">
                </div>
            </div>
            <div class="field">
                <div class="field">
                    <label>销量</label>
                    <input type="text"  placeholder="销量" v-model="goodObj.qty_sold" id="sold">
                </div>
            </div>
            <button class="ui button" @click="save">提交</button>
        </form>
    </div>
</template>
<style type="text/css">
    @import '../../../login/login.css';
</style>
<script type="text/javascript">
    import http from '../../../../utils/httpclient'
    import axios from 'axios'
    export default{
        data(){
            return {
               goodObj:{}
            }
        },
        methods:{
            save(){
                // var id = this.$route.query.id;
                // let product_name=document.getElementById('name').value;
                // let product_type=document.getElementById('type').value;
                // let price=document.getElementById('price').value;
                // let qty_sold=document.getElementById('sold').value;
                // let product_imgurl = document.getElementById('imgurl').value;
                // // let update = {
                // //     product_name,
                // //     price,
                // //     qty_sold,
                // //     product_type,
                // //     product_imgurl
                // // }
                // http.post('edit_product',{product_id:id,product_name,product_type,price,qty_sold,product_imgurl}).then(function(res){
                //     console.log(res)
                // })
                
                http.post('edit_product',{params:JSON.stringify(this.goodObj)}).then(function(res){
                    console.log(res)
                })
            }
        },
        mounted:function(){
            var self = this;
            var id = self.$route.query.id;
            http.post('query_product',{product_id:id}).then(function(res){
                self.goodObj = res;
            })
        }
    }    
</script>