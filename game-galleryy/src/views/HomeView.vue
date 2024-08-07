<template>
  <div class="home-container">
    <header class="header">
      <div class="logo">
        <h1 class="title">GG</h1>
        <p class="subtitle">Game Gallery</p>
      </div>
      <nav class="nav">
        <router-link to="/" class="nav-link active">Home page</router-link>
        <router-link to="/goats" class="nav-link">The Goats</router-link>
        <router-link to="/hot" class="nav-link hot">Hot right now!!</router-link>
        <button @click="$store.dispatch('logout')">Logout</button>
        <router-link to="/profile" class="nav-link profile">
          <img src="path/to/profile/icon" alt="Profile" class="profile-icon"/>
        </router-link>
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
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'HomeView',
  setup() {
    const searchQuery = ref('');
    const router = useRouter();
    const route = useRoute();
    const game = ref(null);
    const loading = ref(true);

    const search = () => {
      if (searchQuery.value.trim()) {
        router.push({ name: 'game-view', params: { Name: searchQuery.value } });
      }
    };

    const fetchGameDetails = async () => {
      try {
        const gameName = route.params.Name;
        const gamesRef = collection(db, 'video-games');
        const q = query(gamesRef, where('Name', '==', gameName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          game.value = querySnapshot.docs[0].data();
        } else {
          console.error('No such game found!');
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(() => {
      if (route.params.Name) {
        fetchGameDetails();
      }
    });

    return {
      searchQuery,
      search,
      game,
      loading,
      fetchGameDetails,
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
