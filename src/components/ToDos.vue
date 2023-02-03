<template>
    <div>
        <h1>Meine To-Do-Liste</h1>
        <ul>
            <li v-bind:key="item.id" v-for="item in todoEntries">
                <ToDoItem v-bind:todoItem="item" />
            </li>   
        </ul>
    </div>
  </template>

<script >
import ToDoItem from "./ToDoItem";

export default {
  name: 'ToDos',
  components: {
      ToDoItem
  },
  props: [
      "todoEntries"
  ]
}
</script>