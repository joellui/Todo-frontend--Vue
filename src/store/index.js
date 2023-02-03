import { createStore } from 'vuex'

export default createStore({
  state: {
    todos: 
      [
        {
          id:1,
          title: "one"
        },
        {
          id:2,
          title: "two"
        },
        {
          id:3,
          title: "Three"
        }
      ],
    
  },
  getters: {
    allTodos: (state) => state.todos,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
