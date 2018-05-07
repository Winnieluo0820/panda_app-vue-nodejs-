<template>
    <div>
        <div id="tab">
            <table class="table">
                <thead>
                    <tr>
                        <th>商品名称</th>
                        <th>商品分类</th>
                        <th>商品价格</th>
                        <th>销量</th>
                        <th>图片</th>
                        <th>编辑</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="obj in dataset" :id=obj._id>
                        <td v-for="(col,idx) in config.cols" :key="idx">{{obj[col]}}</td>
                        <td><img :src="obj.product_imgurl"/></td>
                        <td><router-link :to="{path:'/main/edit',query:{
                            id:obj._id
                            }
                        }"><button class="ui primary button" title="编辑" @click="edit">Edit</button></router-link></td>
                        <td><button class="ui primary button delete" title="删除" @click="del">Delete </button></td>
                    </tr>
                </tbody>
            </table>
        </div>  
        <div id="page">
            <a href="#" v-for="(value, index) in pages" @click.stop="change" :id="index">{{value}}</a>
           <!--  <a href="#">下一页</a>
            <a href="#">尾页</a> -->
            <span>共 <b>{{pages}}</b> 页</span>
        </div>
    </div>
</template>
<style type="text/css">
    @import 'product_manage.css';
</style>
<script type="text/javascript">
    import http from '../../../utils/httpclient'
    export default{
        data(){
            return {
                dataset:[],
                config:{
                    api:'product_manage',
                    cols:['product_name','product_type','price','qty_sold']
                },
                pages:1
            }
        },
        mounted(){
            http.get(this.config.api).then((res)=>{
                this.pages=Math.ceil(res.data/10);
                http.get(this.config.api,{page:"1",qty:10}).then((res)=>{
                    this.dataset=res.data;
                    let firstA=document.getElementById('page').firstElementChild;
                    firstA.classList.add('active');
                })
            })  
        },
        methods:{
            change(event){
                let a=document.getElementById('page').children;
                for(let i=0;i<a.length;i++){
                    a[i].classList.remove('active');
                }
                event.target.classList.add('active');
                let page=parseInt(event.target.id)+1;
                http.get(this.config.api,{page:page}).then((res)=>{
                    this.dataset=res.data;
                })
            },
            edit(event){
                // let curTr=event.target.parentNode.parentNode;
                // let product_name=curTr.firstElementChild.innerHTML;
                // window.localStorage.setItem(product);
            },
            del(event){
                let curTr=event.target.parentNode.parentNode;
                let product_name=curTr.firstElementChild.innerHTML;
                http.post('del_product',{product_name}).then((res)=>{
                    http.get(this.config.api).then((res)=>{
                        this.pages=Math.ceil(res.data/10);
                        http.get(this.config.api,{page:"1"}).then((res)=>{
                            this.dataset=res.data;
                            let firstA=document.getElementById('page').firstElementChild;
                            firstA.classList.add('active');
                        })
                    })  
                })
            }
        }
    }   
</script>
