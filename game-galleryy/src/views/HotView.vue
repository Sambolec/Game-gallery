<template>
  <div class="hot-container">
    <header class="header">
      <div class="logo">
        <h1 class="title">GG</h1>
        <p class="subtitle">Game Gallery</p>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link">Home page</router-link>
        <router-link to="/goats" class="nav-link">The Goats</router-link>
        <router-link to="/hot" class="nav-link active hot">Hot right now!!</router-link>
        <button @click="$store.dispatch('logout')" class="nav-link logout-button">Logout</button>
        <router-link to="/profile" class="nav-link profile">
          <img src="path/to/profile/icon" alt="Profile" class="profile-icon"/>
        </router-link>
      </nav>
    </header>

    <main class="games-grid">
      <div v-for="game in games" :key="game.id" class="game-card">
        <router-link :to="{ name: 'game-view', params: { Name: game.Name } }">
          <img :src="game.url" :alt="game.Name" class="game-image"/>
          <p class="game-title">{{ game.Name }}</p>
        </router-link>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'HotView',
  setup() {
    const games = ref([]);

    const fetchHotGames = async () => {
      try {
        const hotGames = ['The First Descendant', 'EA Sports College Football 25', 'Once Human'];
        const gamesRef = collection(db, 'video-games');
        const q = query(gamesRef, where('Name', 'in', hotGames));
        const querySnapshot = await getDocs(q);
        games.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching hot games:', error);
      }
    };

    onMounted(() => {
      fetchHotGames();
    });

    return {
      games,
    };
  },
};
</script>

<style scoped>
.hot-container {
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

.games-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  width: 80%;
}

.game-card {
  margin: 15px;
  text-align: center;
}

.game-image {
  width: 200px;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
  transition: transform 0.3s;
}

.game-image:hover {
  transform: scale(1.05);
}

.game-title {
  color: white;
  font-size: 18px;
  margin-top: 10px;
}
.logout-button {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.logout-button:hover {
  background-color: #d40000; /* Darker red on hover */
}

.logout-button:focus {
  outline: none;
  box-shadow: 0 0 4px red;
}

</style>
