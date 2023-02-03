<template>
    <div>
      {{ todoItem.title }}
    </div>
  </template>
  
  <script >
  
  export default {
    name: 'ToDoItem',
    components: {
    },props: [
      "todoItem"
    ]
  }
  </script>