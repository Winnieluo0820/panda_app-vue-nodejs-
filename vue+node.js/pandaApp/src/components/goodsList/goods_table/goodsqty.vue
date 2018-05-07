<template>
	<div>
		<goodstable :config="config" :resh="resh"/>
</div>
</template>

<script>
	import goodstable from './goodstable';
	import common from '../../../utils/common'

	export default {
		data() {
			return {
				resh:{
					apis:'search',
					keyword:''
				},
				config: {
					api: 'query_product_qtysold',
						product_type:common.state.ty
				}
			}
		},
		components:{
			goodstable
		},
		//加载完成前触发事件
		beforeCreate(){
			if(!common.state.ty){
			let tys= this.$route.params.key;
			common.state.ty = tys;		
			}
		}
	}
</script>

<style>

</style>