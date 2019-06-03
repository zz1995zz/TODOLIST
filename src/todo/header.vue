<template>
	<header class="main-header">
		<h1>{{title}}</h1>
	</header>
</template>	
<script>
export default {
	data() {
		return {
			title: 'Just Do It'
		}
	}
};
</script>
<style lang="stylus" scoped>
    h1 
        text-align center
        font-size 100px
        color rgba(175,47,47,.4)
        font-weight 100
        margin 20px
</style>