<template>
  <div>
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add Todo">
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.completed" @change="markTodoComplete(todo)">
        <span :class="{'completed': todo.completed}">{{ todo.text }}</span>
        <button @click="removeTodo(index)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  methods: {
    addTodo() {
      this.todos.push({ text: this.newTodo, completed: false });
      this.newTodo = '';
    },
    markTodoComplete(todo) {
      todo.completed = !this.todo.completed;
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    }
  }
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>