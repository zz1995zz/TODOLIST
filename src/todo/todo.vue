<template>
	<section class="real-app">
		<input 
		type="text"
		class='add-input'
		autofocus
		placeholder="接下来要做什么呢？" 
		@keyup.enter="addTodo"
		>
		<Item
		 v-for='todo in filterTodos'
		 :key='todo.id'
		 :todo="todo"
		 @del='deleteTodo'
		 ></Item>
		<Tabs
		:todos='todos' 
		:filter='filter'
		@toggle='toggleFilter'
		@clearAll='clearAllCompleted'
		></Tabs>
	</section>
</template>

<script>
import Item from "./item.vue"
import Tabs from "./tabs.vue"
export default {
	components: {
		Item,
		Tabs
	},
	data() {
		return {
			id: 0,
			todos: [],
			filter: '全部'
		}
	},
	computed: {
		filterTodos() {
			if(this.filter == '全部'){
				return this.todos
			}
			const completed = this.filter == '已完成'
			return this.todos.filter(todo => todo.completed == completed)
		}
	},
	methods:{
		addTodo(e) {
			if(e.target.value){
				this.todos.unshift({
				id: this.id++,
				content: e.target.value.trim(),
				completed: false
			})
			e.target.value=''
			}
		},
		deleteTodo(id) {
			this.todos.splice(this.todos.findIndex(todo => todo.id === id),1)
		},
		toggleFilter(state) {
			this.filter = state
		},
		clearAllCompleted() {
			this.todos = this.todos.filter(todo => todo.completed == false);
		}
	}
};
</script>

<style lang="stylus" secped>
    section 
        width 600px
        margin auto
        box-shadow 0 0 5px #666
        >input 
            position: relative;
            margin: 0;
            width: 100%;
            font-size: 24px;
            font-family: inherit;
            font-weight: inherit;
            line-height: 1.4em;
            border: 0;
            outline: none;
            color: inherit;
            padding: 6px;
            border: 1px solid #999;
            box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
            box-sizing: border-box;
            font-smoothing: antialiased;
            padding: 16px 16px 16px 60px;
            border: none;
            box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
</style>