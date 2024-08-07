<template>
  <nav v-if="$store.state.user">
    <!-- Add your navigation links or other authenticated user content here -->
  </nav>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import { db } from '@/firebase';
import { collection, query, getDocs } from 'firebase/firestore';

export default {
  setup() {
    const store = useStore();

    onBeforeMount(() => {
      store.dispatch('fetchUser');
    });

    // Function to fetch all games for initial load
    const fetchGames = async () => {
      const gamesRef = collection(db, "video-games");
      const q = query(gamesRef);
      const querySnapshot = await getDocs(q);
      const games = [];
      querySnapshot.forEach((doc) => {
        games.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      store.commit('SET_GAMES', games);
    };

    // Fetch games on mount
    fetchGames();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: fill;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 0px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
