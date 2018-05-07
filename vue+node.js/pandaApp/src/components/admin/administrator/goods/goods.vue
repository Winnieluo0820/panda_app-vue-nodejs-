<template>
    <div class="goods_box">
        <div class="table_box">

            <table class="table table-striped table-hover">
                <thead>
                <tr>
                    <th>#</th>
                    <th>商品名称</th>
                    <th>商品分类</th>
                    <th>商品价格</th>
                    <th>图片</th>
                    <th>编辑</th>
                    <th>删除</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(obj,idx) in dataset" :key="idx">
                    <td>{{obj._id}}</td>
                    <td>{{obj.images}}</td>
                    <td>{{obj.name}}</td>
                    <td>{{obj.price}}</td>
                    <td>{{obj.origin_price}}</td>
                    <td><button>编辑</button></td>
                    <td><button>删除</button></td>
                </tr>
                </tbody>
            </table>

        </div>
            <div class="action">

            </div>
        </div>
    </div>
</template>

<script>
    import http from '../../../../router/httpclient.js'

    export default {
        data(){
            return  {
                dataset:[]
            }
        },
        mounted(){
            //发起一次ajax请求
            //目的把token当参数传给后端
            http.get('admin_goods').then((res)=>{
                this.dataset = res.data;
            })
        }
    }
</script>

<style lang="scss">
    @import 'goods.scss';
</style>