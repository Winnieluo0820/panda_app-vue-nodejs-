<template>
	<div id="panda_goodslist">
		<div class="goodslist_top">
			<!--搜索栏-->
			<!--<router-link to="/species" @click="createty"><</router-link>-->
			<span class="iconfont icon-jiantou2" @click="createty"></span>
			<div class="input_box" @click="$router.push('/pandaSearch')">
				<i class="zoom"></i>
				<input type="text" />
			</div>
		</div>
		<div class="goodslist_reash">

			<menus/>
		</div>
		<div class="goodslist__mian">
			<router-view></router-view>
		</div>

	</div>

</template>

<script>
	import menus from './menu/menu.vue'
	import common from '../../utils/common'
	export default {
		components: {
			menus
		},
		methods: {
			createty() {
				common.state.ty = '';
				common.state.resname ='';
				this.$router.push({
					path: '/species'
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "./goodsList";
</style>