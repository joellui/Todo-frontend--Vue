<template>
  <NavBar @userStatus="handleUserStatus" @initTodoList="handleUpdateList" />
  <div>
    <h1>Todo List</h1>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo" placeholder="Add Todo">
      <button type="submit">Add</button>
    </form>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.completed" @change="markTodoComplete(todo)">
        <span :style="{ textDecoration: todo.completed ? 'line-through' : 'none' }">{{ todo.task }}</span>
        <button @click="removeTodo(todo,index)">X</button>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "./api";
import NavBar from "./components/NavBar";

export default {
  name: "app",
  components: {
    NavBar
  },
  data() {
    return {
      newTodo: '',
      todos: []
    };
  },
  methods: {
    async getTodos(){
      try{
        const response = await api.get('/todos/task-list/')
        console.log(response.data)
      }catch(err){
        console.error(err)
      }
    },

    handleUserStatus(data){
      console.log(data)
      return data
    },
    handleUpdateList(data){
      this.todos = data
      console.log(data)
      return data
    },

    async addTodo() {
      const newTodo = { task: this.newTodo, completed: false };
      this.todos.push(newTodo);
      try{
        await api.post("/todos/task-create", newTodo)
        this.getTodos()
      }catch(err){
        console.error(err)
      }
    },

    async markTodoComplete(todo) {
      console.log(todo)
      const newTodo = { task: todo.task, completed: todo.completed };

      try{
        await api.put(`/todos/task-update/${todo.id}`, newTodo)
        // this.getTodos()
      }catch(err){
        console.error(err)
      }

    },

    async removeTodo(todo, index) {
      this.todos.splice(index, 1);
      console.log(todo)
      try{
        await api.delete(`/todos/task-delete/${todo.id}`)
        this.getTodos()
      }catch(err){
        console.error(err)
      }
      
    }
  }
};
</script>