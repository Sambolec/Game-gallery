<template>
  <div class="game-view-container">
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
    <main class="game-details-section">
      <div v-if="game" class="game-info">
        <img :src="game.url" alt="Game Image" class="game-image"/>
        <h2>{{ game.Name }}</h2>
        <p>Release date: {{ game.Released }}</p>
        <p>Developed by: {{ game.Developer }}</p>
        <p>{{ game.Description }}</p>
      </div>
      <div class="game-hub">
        <h2>My hub</h2>
        <input type="text" placeholder="Progress" class="hub-input"/>
        <input type="text" placeholder="Rate it!!" class="hub-input"/>
        <input type="text" placeholder="Status" class="hub-input"/>
        <textarea placeholder="Leave a note" class="hub-textarea"></textarea>
        <button class="hub-button">Add to Library</button>
      </div>
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'GameView',
  setup() {
    const route = useRoute();
    const game = ref(null);

    const fetchGameDetails = async () => {
      try {
        const gameName = route.params.Name; // Dynamically set game name from route parameters
        const gamesRef = collection(db, 'video-games');
        const q = query(gamesRef, where('Name', '==', gameName));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          game.value = querySnapshot.docs[0].data(); // Retrieve game data
        } else {
          console.error('No such game found!');
        }
      } catch (error) {
        console.error('Error fetching game details:', error);
      }
    };

    onMounted(() => {
      fetchGameDetails();
    });

    return {
      game,
    };
  },
};
</script>

<style scoped>
.game-view-container {
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

.game-details-section {
  display: flex;
  justify-content: space-around;
  width: 80%;
  margin-top: 20px;
}

.game-info {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-image {
  width: 50%;
  border-radius: 10px;
}

.game-info h2, .game-info p {
  margin: 10px 0;
}

.game-hub {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  width: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hub-input,
.hub-textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #1c1c1c;
  color: white;
}

.hub-textarea {
  resize: none;
}

.hub-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: red;
  color: white;
  cursor: pointer;
  font-size: 16px;
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
