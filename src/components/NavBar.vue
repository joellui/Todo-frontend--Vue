<template>

  <div>
    <nav id="nav">
      <div v-if="!loggedIn">
        <button style="margin: 3px;" @click="showLogin = !showLogin">Login</button>
        <button style="margin: 3px;" @click="showRegister = !showRegister">Register</button>
      </div>
      <div v-else>
        <button @click="logout">Logout</button>
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
import axios from "axios";
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

      const url = 'http://127.0.0.1:8000/user/login/'
      const auth = {
          username: this.usernameLogin,
          password: this.passwordLogin
        }

      try{
        const response = await axios.post(url, auth);
        if (response.status == 200){
          this.loggedIn = true
          this.$emit('userStatus',{'logStatus': this.loggedIn,'token': response.data.token})
          alert(response.data.token)
        }else{
          alert(response.status)
          console.log(response.data)
        }

      }catch(error){
        console.error(error)
        alert("An error occurred while logging in")
      }
    },

    async register() {
      const url = 'http://127.0.0.1:8000/user/register/'
      const data = {
        "username": this.usernameRegister,
        "password": this.passwordRegister,
        "email": this.emailRegister}

      
        try{
          const res = await axios.post(url, data);
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

    logout(){
      this.loggedIn = false
      this.$emit('userStatus',{'logStatus': this.loggedIn,'token': null})
      alert("logout")
      
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
