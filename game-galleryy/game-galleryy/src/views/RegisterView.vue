<template>
    <div class="auth-container">
      <div class="auth-header">
        <h1 class="title">GG</h1>
        <p class="subtitle">Game Gallery</p>
      </div>
      <div class="auth-forms">
        <button class="nav-button" :class="{ active: isLogin }" @click="toggleForm(true)">Login</button>
        <button class="nav-button" :class="{ active: !isLogin }" @click="toggleForm(false)">SignUp</button>
        <form v-if="isLogin" class="auth-form" @submit.prevent="login">
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
          <input type="submit" value="Login" class="auth-button" />
        </form>
        <form v-else class="auth-form" @submit.prevent="register">
          
          <input
            type="email"
            placeholder="E-mail"
            v-model="register_form.email"
          />
          <input
            type="password"
            placeholder="Password"
            v-model="register_form.password"
          />
          
          <input type="submit" value="SignUp" class="auth-button" />
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  import { useStore } from 'vuex';
  
  export default {
    name: 'AuthView',
    setup() {
      const login_form = ref({});
      const register_form = ref({});
      const isLogin = ref(true);
      const store = useStore();
  
      const login = () => {
        store.dispatch('login', login_form.value);
      };
  
      const register = () => {
        store.dispatch('register', register_form.value);
      };
  
      const toggleForm = (login) => {
        isLogin.value = login;
      };
  
      return {
        login_form,
        register_form,
        isLogin,
        login,
        register,
        toggleForm,
      };
    },
  };
  </script>
  
  <style scoped>
  .auth-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #2c2c2c;
    color: white;
  }
  
  .auth-header {
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
  
  .auth-forms {
    background-color: #3c3c3c;
    padding: 30px;
    border-radius: 10px;
    display: f;
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
  
  .auth-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .auth-form input[type="text"],
  .auth-form input[type="email"],
  .auth-form input[type="password"] {
    width: 250px;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
    border: 1px solid #555;
    background-color: #4c4c4c;
    color: white;
  }
  
  .auth-button {
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
  