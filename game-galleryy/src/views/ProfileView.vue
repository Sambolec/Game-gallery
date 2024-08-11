<template>
  <div class="profile-container">
    <header class="header">
      <div class="logo">
        <h1 class="title">GG</h1>
        <p class="subtitle">Game Gallery</p>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link">Home page</router-link>
        <router-link to="/goats" class="nav-link">The Goats</router-link>
        <router-link to="/hot" class="nav-link hot">Hot right now!!</router-link>
        <button @click="$store.dispatch('logout')" class="nav-link logout-button">Logout</button>
        <router-link to="/profile" class="nav-link profile">
          <img src="path/to/profile/icon" alt="Profile" class="profile-icon"/>
        </router-link>
      </nav>
    </header>

    <div class="profile-content">
      <div class="user-info">
        <h2>{{ user.email }}</h2>
        <p>Member since: {{ memberSince }}</p>
        <p>Games in gallery: {{ totalGames }}</p>
      </div>

      <div class="game-status-dropdown">
        <label for="status">Filter by status:</label>
        <select id="status" v-model="selectedStatus" @change="filterGames">
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="currently_playing">Currently playing</option>
          <option value="planning_to_start">Planning to start</option>
          <option value="dropped">Dropped</option>
        </select>
      </div>

      <div class="games-grid">
        <div v-for="game in filteredGames" :key="game.id" class="game-card">
          <router-link :to="{ name: 'game-view', params: { Name: game.Name || 'Untitled' } }">
            <img :src="game.url" alt="Game Image" class="game-image"/>
            <p class="game-title">{{ game.Name || 'Untitled' }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { collection, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '@/firebase';
import { useStore } from 'vuex';

export default {
  name: 'profile',
  setup() {
    const store = useStore(); // Initialize Vuex store
    const games = ref([]);
    const filteredGames = ref([]);
    const selectedStatus = ref('');
    const auth = getAuth();
    const user = ref(auth.currentUser);

    const loadGames = async () => {
      if (user.value) {
        const gamesRef = collection(db, `users/${user.value.email}/user-video-games`);
        const querySnapshot = await getDocs(gamesRef);
        games.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        filteredGames.value = games.value;
      }
    };

    const filterGames = () => {
      if (selectedStatus.value) {
        filteredGames.value = games.value.filter(game => game.Status === selectedStatus.value);
      } else {
        filteredGames.value = games.value;
      }
    };

    const totalGames = computed(() => games.value.length);
    const memberSince = computed(() => {
      const creationTime = user.value?.metadata?.creationTime;
      return creationTime ? new Date(creationTime).toLocaleDateString() : 'N/A';
    });

    onMounted(() => {
      loadGames();
    });

    return {
      user,
      games,
      filteredGames,
      totalGames,
      memberSince,
      selectedStatus,
      filterGames,
      store, // Return store in the setup
    };
  },
};
</script>

<style scoped>
.profile-container {
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

.profile-content {
  width: 80%;
  margin-top: 20px;
}

.user-info {
  margin-bottom: 20px;
}

.game-status-dropdown {
  margin-bottom: 20px;
}

.games-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
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
