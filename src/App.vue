<template>
  <NavBar />
  <TodoInput/>
  <TodoList/>
</template>

<script>
import NavBar from './components/NavBar.vue'
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    TodoInput,
    TodoList
  },
  
}
</script>

<style>

#app{
  
}

</style>
