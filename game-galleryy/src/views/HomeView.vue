<template>
  <div class="home-container">
    <header class="header">
      <div class="logo">
        <h1 class="title">GG</h1>
        <p class="subtitle">Game Gallery</p>
      </div>
      <nav class="nav">
        <a href="/" class="nav-link active">Home page</a>
        <a href="/goats" class="nav-link">The Goats</a>
        <a href="/hot" class="nav-link hot">Hot right now!!</a>
        <button @click="$store.dispatch('logout')">Logout</button>
        <a href="/profile" class="nav-link profile">
          <img src="path/to/profile/icon" alt="Profile" class="profile-icon"/>
        </a>
      </nav>
    </header>
    <main class="search-section">
      <h1 class="main-title">GG</h1>
      <p class="main-subtitle">Game Gallery</p>
      <div class="search-bar">
        <input type="text" placeholder="What game are you looking for?" v-model="searchQuery"/>
        <button @click="search" class="search-button">Search</button>
      </div>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'HomeView',
  setup() {
    const searchQuery = ref('');

    const search = () => {
      console.log(`Searching for: ${searchQuery.value}`);
      // funkcionalnost za search tu
    };

    return {
      searchQuery,
      search,
    };
  },
};
</script>

<style scoped>
.home-container {
  
  background-color: #1c1c1c;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  width: 100%;
  background-color: #2c2c2c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 36px;
  color: red;
  margin: 0;
}

.subtitle {
  font-size: 14px;
  color: white;
  margin: 0;
}

.nav {
  display: flex;
  align-items: center;
}

.nav-link {
  color: white;
  margin: 0 15px;
  text-decoration: none;
  font-size: 18px;
}

.nav-link.active {
  color: red;
}

.nav-link.hot {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
}

.nav-link.profile .profile-icon {
  width: 30px;
  height: 30px;
}

.search-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.main-title {
  font-size: 48px;
  color: red;
  margin: 0;
}

.main-subtitle {
  font-size: 16px;
  color: white;
  margin: 0;
}

.search-bar {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.search-bar input {
  width: 300px;
  padding: 10px;
  border: none;
  border-radius: 5px 0 0 5px;
  font-size: 16px;
}

.search-button {
  padding: 10px 20px;
  border: none;
  border-radius: 0 5px 5px 0;
  background-color: red;
  color: white;
  font-size: 16px;
  cursor: pointer;
}
</style>


