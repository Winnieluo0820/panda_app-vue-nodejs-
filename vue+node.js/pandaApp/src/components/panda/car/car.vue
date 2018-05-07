<template>
	<div class="car">
		<div class="car_top">
			购物车	
		<!--	<span>编辑</span>-->
		</div>
		<div class="car_main">
			 <transition-group tag="ul" name="list">
				<li v-for="obj,idx in goodslist" :key="obj._id" :id='obj._id'>
					<input type="checkbox"  class="smallcheck" />
					<img :src="obj.product_imgurl" alt="" />
					<p>{{obj.product_name}}</p>
<!-- 					<h3>销量：{{obj.qty_sold}}</h3> -->
					<h4>￥{{obj.price}}</h4>
					<a href="javascript:void(0);" @click="addgoods(idx)" >+</a>
					<input type="number" :value=obj.qty  class="input_num"  disabled="true"/>
					<a href="javascript:void(0);" @click="minusgoods(idx)">-</a>
					<span @click="delectgoods(idx)">删除</span>
				</li>
			 </transition-group>
		</div>
		
		<div class="car_bottom">
			<h2> 
			<input type="checkbox" v-model="checked"  v-on:click="allclick"/>
			全选
			</h2>
			<div class="car_bottom_right">
				合计： <span>￥<i>{{total}}</i></span> 
				<router-link to="">结算</router-link>
			</div>
			
			
			
		</div>
		
		
		
		
	</div>
	
</template>

<script>
	import $ from 'jquery';
	import http from '../../../utils/httpclient'
	export default{
		methods:{
			allclick(){
				//全选
				let $sm = $('.smallcheck').prop('checked',!this.checked)	
			},
			addgoods(idx){
				let $input = $('.car_main').find('.input_num');
				let ids = ($('.car_main').find('li'))[idx].getAttribute('id');
				$input[idx].value++;
				let qtynum = $input[idx].value;
				this.goodslist[idx].qty++
				this.alltotal();
				this.upload(ids,qtynum)
			},
			minusgoods(idx){
				let $input = $('.car_main').find('.input_num');
				let ids = ($('.car_main').find('li'))[idx].getAttribute('id');
				let value = $input[idx].value;
				if(value>1){
					$input[idx].value--;
					this.goodslist[idx].qty--;
					this.alltotal();
					let qtynum = $input[idx].value;
					this.upload(ids,qtynum)
				}else{
					$input[idx].value =1;
					let qtynum = $input[idx].value;
					this.upload(ids,qtynum)
					return;
				}
			},
			alltotal(idx){
					let totals =0;
				this.total=0;
				this.goodslist.map((item)=>{
					totals += item.price*item.qty;
					this.total = totals.toFixed(2)
				})
			},
			delectgoods(idx){
				let ids = ($('.car_main').find('li'))[idx].getAttribute('id');
				console.log(655)
				this.del_product(ids)
			this.goodslist.splice(idx,1);	
			},
			upload(ids,qtynum){
				http.post('update_qty',{product_id:ids,qty:qtynum}).then((res)=>{
					console.log('数据库更新成功')
				})
			},
			del_product(ids){
				http.post('del_shop_cart',{product_id:ids}).then((res)=>{
					this.alltotal();
					console.log('数据库删除成功')
				})
			}
		},
		data(){
			return {
				checked:'false',
				total:0,
				goodslist:[]
			}
		},
		created(){
			http.post('showShopcart').then((res)=>{
				this.goodslist = res.data;
				let totals =0;
				res.data.map((item)=>{
					totals += item.price*item.qty;
					this.total = totals.toFixed(2)
				})
			})
			
			
		}
		
		
		
		
		
	}
</script>

<style lang="scss">
	@import'car.scss';
</style>