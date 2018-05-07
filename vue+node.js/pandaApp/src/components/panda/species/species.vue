<template>
	<!--分类组件-->
	<div id="panda_species">
		<div class="species_top">
			<!--搜索栏-->
			<div class="input_box" @click="$router.push('/pandaSearch')">
				<i class="zoom"></i>
				<input type="text" />
		
			</div>
			
		</div>
		<div class="species_left">
			<!--左边盒子-->
			<ul>
				<li><span @click="addapi" >女装</span></li>
				<li><span v-on:click="addapi">美妆护肤</span></li>
				<li><span v-on:click="addapi">男装</span></li>
				<li><span v-on:click="addapi">配饰</span></li>
				<li><span v-on:click="addapi">女鞋</span></li>
				<li><span v-on:click="addapi">零食王国</span></li>
				<li><span v-on:click="addapi">箱包</span></li>
				<li><span v-on:click="addapi">个人洗护</span></li>
				<li><span v-on:click="addapi">男鞋</span></li>
				<li><span v-on:click="addapi">手机周边</span></li>
				<li><span v-on:click="addapi">数码家电</span></li>
				<li><span v-on:click="addapi">内衣袜子</span></li>
				<li><span v-on:click="addapi">日用家居</span></li>
				<li><span v-on:click="addapi">文体娱乐</span></li>
			</ul>
		</div>
		<div class="species_right">
			<tab :config="config"/>
		</div>
	</div>

</template>

<script>
	import tab from './tab/tab.vue'

	export default {
		data() {
			return {
				config: {
					title:'6666',
					listdata:''
				}
			}
		},
		components: {
			tab
		},
		methods: {
			addapi: function(event) {
				this.tabname = event.currentTarget.innerText;
				this.$children[0].changetab(this.tabname);
				
				
			}
		}
	}
</script>

<style lang="scss">
	@import'species.scss';
</style>