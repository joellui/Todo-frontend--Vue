<template>

  <div>
    <nav id="nav">
      <div v-if="!loggedIn">
        <button style="margin: 3px;" @click="showLogin = !showLogin">Login</button>
        <button style="margin: 3px;" @click="showRegister = !showRegister">Register</button>
      </div>
      <div v-else>
        <button @click="logout" >Logout</button>
      </div>
    </nav>

    <form v-if="!loggedIn" v-show="showLogin">
      <h2>Login</h2>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="usernameLogin" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="passwordLogin" />
      </div>
      <button @click.prevent="login"> logIn ➡️</button>
    </form>

    <div v-if="!loggedIn" v-show="showRegister">
      <h2>Register</h2>
      <form>
        <div>
          <label for="username">Username:</label>
          <input id="username" v-model="usernameRegister" />
        </div>
        <div>
          <label for="email">Email:</label>
          <input id="email" v-model="emailRegister" />
        </div>
        <div>
          <label for="password">Password:</label>
          <input id="password" v-model="passwordRegister" type="password" />
        </div>
        <button @click.prevent="register"> Register ➡️</button>
      </form>
    </div>



  </div>

</template>

<script>
import api from "@/api";
export default {

  data() {
    return {
      loggedIn: false,
      showLogin: false,
      showRegister: false,
    }
  },
  methods: {
    async login() {

      const url = '/user/login/'
      const auth = {
          username: this.usernameLogin,
          password: this.passwordLogin
        }

      try{
        const response = await api.post(url, auth);
        if (response.status == 200){
          this.loggedIn = true
          this.$emit('userStatus',{'logStatus': this.loggedIn,'token': response.data.token})
          alert(response.data.token)

          localStorage.setItem('token', response.data.token);
          api.defaults.headers.common['Authorization'] = `token ${response.data.token}`;

        }else{
          alert(response.status)
          console.log(response.data)
        }

        // initialize todo list for the database
        const res = await api.get('/todos/task-list/')
        this.$emit('initTodoList',res.data)
        // console.log(res.data)

      }catch(error){
        console.error(error)
        alert("An error occurred while logging in")
      }
    },

    async register() {
      const url = '/user/register/'
      const data = {
        "username": this.usernameRegister,
        "password": this.passwordRegister,
        "email": this.emailRegister}

      
        try{
          const res = await api.post(url, data);
          if (res.status == 201){
            alert("now login with the credentials")
          }else{
            alert("error " +  res.status)
          }
        }catch(err){
          alert("error has occured")
          console.error(err)
        }
    },

    async logout(){
      this.loggedIn = false
      this.$emit('userStatus',{'logStatus': this.loggedIn,'token': null})
      localStorage.setItem('token', null)
      api.defaults.headers.common['Authorization'] = null;
      alert("logout")
      try{
      const res = await api.get('/todos/task-list/')
      this.$emit('initTodoList',res.data)
      }catch(err){
        console.error(err)
      }
    }
  }
}

</script>

<style scoped>
#nav {
  display: flex;
  justify-content: flex-end;
  width: 100vh;
}
</style>
