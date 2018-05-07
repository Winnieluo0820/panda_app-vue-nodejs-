<template>
    <div>
        <form class="ui form segment" style="width:40%;margin:0 auto 40px">
            <div class="field">
                <label>商品名称</label>
                <input type="text"  placeholder="商品名称"  id="name">
            </div>
            <!-- <div class="fields">
                <div class="field">
                    <label>图片</label>
                    <input type="file" name="photos" multiple="" id="proimg">
                </div>
            </div> -->
            <div class="field">
                <div class="field">
                    <label>商品分类</label>
                    <input type="text"  placeholder="商品分类" id="type">
                </div>
            </div>
            <div class="field">
                <div class="field">
                    <label>商品价格</label>
                    <input type="text"  placeholder="商品价格"  id="price">
                </div>
            </div>
            <div class="field">
                <div class="field">
                    <label>销量</label>
                    <input type="text"  placeholder="销量" id="sold">
                </div>
            </div>
            <button class="ui button" @click="save">提交</button>
        </form>
    </div>
</template>
<style type="text/css">
    @import '../../login/login.css';
</style>
<script type="text/javascript">
    import http from '../../../utils/httpclient'
    import axios from 'axios'
    export default{
        data(){
            return {
               
            }
        },
        methods:{
            save(){
                // var myform = new FormData();
                // let proimg=document.getElementById('proimg');
                let product_name=document.getElementById('name').value;
                let product_type=document.getElementById('type').value;
                let price=document.getElementById('price').value;
                let qty_sold=document.getElementById('sold').value;
                http.get('add_product',{product_name,price,qty_sold,product_type}).then((res)=>{
                    this.dataset=res.data;
                })
                // myform.append('proname', product_name);
                // myform.append('price', price);
                // myform.append('type', type);
                // myform.append('sold', sold);
                // myform.append('proimg', proimg.files[0]);
                // var src = proimg.files[0].name;
                // var formart = src.split(".")[1];
                // if (formart == "jpg" || formart == "png"||formart == "gif") {
                //     http.upload({
                //         url: 'singleUpload', 
                //         data: myform, 
                //         cb:function(res){
                //             console.log(res);
                //         }
                //     }) 
                // }
                // else {
                //   alert("文件格式不支持上传");
                // }
            }
        }
    }    
</script>