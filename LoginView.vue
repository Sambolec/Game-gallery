<template>
    <div class="login-container">
      <div class="login-header">
        <h1 class="title">GG</h1>
        <p class="subtitle">Game Gallery</p>
      </div>
      <div class="login-forms">
        <a href="/login"><button class="nav-button active" type="button">Login</button></a> 
        <a href="/register"><button class="nav-button" type="button">Register</button></a> 
        <form class="login-form" @submit.prevent="login">
          <input
            type="text"
            placeholder="E-mail"
            v-model="login_form.email"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="login_form.password"
          />
          <input type="submit" value="Login" class="login-button" />
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'LoginView',
    setup() {
      const login_form = ref({});
      const store = useStore();
  
      const login = () => {
        store.dispatch('login', login_form.value);
      };
  
      return {
        login_form,
        login,
      };
    },
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #2c2c2c;
    color: white;
  }
  
  .login-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .title {
    font-size: 48px;
    font-weight: bold;
    color: red;
    margin: 0;
  }
  
  .subtitle {
    font-size: 16px;
    color: white;
    margin: 0;
  }
  
  .login-forms {
    background-color: #3c3c3c;
    padding: 30px;
    border-radius: 10px;
    display:fill;
    flex-direction: column;
    align-items: center;
  }
  
  .nav-button {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    margin: 0 10px 20px;
    cursor: pointer;
  }
  
  .nav-button.active {
    color: red;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .login-form input[type="text"],
  .login-form input[type="password"] {
    width: 300px;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #555;
    background-color: #4c4c4c;
    color: white;
  }
  
  .login-button {
    width: 270px;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: red;
    color: white;
    font-size: 18px;
    cursor: pointer;
  }
  </style>
  