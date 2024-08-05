<template>
  <nav v-if="$store.state.user">
    
    
    
  </nav>
  <router-view/>
</template>

<script>
import { onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import {db} from '@/firebase'
import { doc, getDoc } from "firebase/firestore";

const docRef = doc(db, "video-games", "Sot");
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Video game:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("Game not found.");
}

export default {
  setup() {
    const store =useStore()

    onBeforeMount(() => {
      store.dispatch('fetchUser')
    })
    
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
