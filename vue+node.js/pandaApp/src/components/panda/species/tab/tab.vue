<template>
	<div class="species_right1">
		<h2><span></span>{{title}}<span></span></h2>
		<ul>
			<li v-for="obj in dataset" :key="obj.type">
				<router-link :to="{name:'goodsnormal',params:{key:title}}"><img :src="obj.img" alt="" />{{obj.type}}</router-link>
			</li>
		</ul>

	</div>
</template>

<script>
	import http from '../../../../utils/httpclient'
	export default {
		data() {
			return {
				dataset: [{
						"type": "T恤",
						"img": "http://img1.lukou.com/static/p/commodity/img/20171116-150904.jpeg"
					},
					{
						"type": "衬衫内搭",
						"img": "http://img1.lukou.com/static/p/commodity/img/20180226-171743.jpeg"
					},
					{
						"type": "卫衣",
						"img": "http://img1.lukou.com/static/p/commodity/img/20180226-163133.jpeg"
					},
					{
						"type": "外套",
						"img": "http://img1.lukou.com/static/coupon/p/misc/20170830-145947.jpeg"
					},
					{
						"type": "裤装",
						"img": "http://img1.lukou.com/static/coupon/p/misc/20170831-181808.jpeg"
					},
					{
						"type": "半身裙",
						"img": "http://img1.lukou.com/static/p/commodity/img/20180313-214608.jpeg"
					},
					{
						"type": "连衣裙",
						"img": "http://img1.lukou.com/static/p/commodity/img/20180226-163048.jpeg"
					},
					{
						"type": "情侣装",
						"img": "http://img1.lukou.com/static/p/commodity/img/20180118-162244.jpeg"
					},
					{
						"type": "短裤",
						"img": "http://img1.lukou.com/static/p/commodity/img/20180423-180233.jpeg"
					}
				],
				title: '女装'
			}
		},
		methods: {
			changetab(tabname) {
				http.post('tabs', {
					tabname: tabname
				}).then((res) => {
					this.title = res.data[0].title
					this.dataset = res.data[0].data;
				})
			}
		}

	}
</script>

<style>
	.species_right1 h2 {
		height: 60px;
		font-size: 28px;
		color: #7D7978;
		text-align: center;
		line-height: 60px;
		font-weight: normal;
	}
	
	.species_right1 h2 span {
		display: inline-block;
		width: 83px;
		margin: 0 25px 15px 25px;
		height: 1px;
		background-color: gray;
	}
	
	.species_right1 ul {
		overflow: inherit;
	}
	
	.species_right1 li {
		text-align: center;
		float: left;
		height: 250px;
		width: 33.3%;
	}
	
	.species_right1 li a {
		display: inline-block;
		color: #7D7978;
	}
</style>