<template>
  <nav v-if="$store.state.user">
  </nav>
  <router-view/>

  
  <div v-for="image in images" :key="image.id" class="image-item">
    <img :src="image.url" alt="Uploaded Image" />
    <p>Description: {{ game.Description }}</p>
    <p>Released: {{ game.Released }}</p>
    <p>Developed by: {{ game.Developer }}</p>
  </div>
</template>

<script>
import { onBeforeMount, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { collection, query, getDocs, addDoc, getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '@/firebase'; 

export default {
  setup() {
    const store = useStore();
    const images = ref([]);
    const newImage = ref({
      description: '',
      weight: '',
      url: '',
      date: new Date(),
    });
    const selectedFile = ref(null);

    onBeforeMount(() => {
      store.dispatch('fetchUser');
    });

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

    const onFileChange = (event) => {
      selectedFile.value = event.target.files[0];
    };

    const uploadImage = async () => {
      if (selectedFile.value) {
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          if (!user) {
            throw new Error("User not authenticated");
          }

          const storage = getStorage();
          const fileRef = storageRef(storage, `images/${user.uid}/${selectedFile.value.name}`);

          await uploadBytes(fileRef, selectedFile.value);

          const downloadURL = await getDownloadURL(fileRef);

          const { description, weight, date } = newImage.value;
          const docRef = await addDoc(collection(getFirestore(), 'users', user.uid, 'images'), {
            description,
            weight,
            url: downloadURL,
            date,
          });

          newImage.value.id = docRef.id;
          images.value.push({ ...newImage.value, id: docRef.id, url: downloadURL });
          resetForm();
          console.log("Image uploaded and URL saved to Firestore!");
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      } else {
        console.error("No file selected");
      }
    };

    const loadImages = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        try {
          const imageCollection = collection(getFirestore(), 'users', user.uid, 'images');
          const snapshot = await getDocs(imageCollection);
          images.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
          console.error('Error loading images:', error);
        }
      }
    };

    const resetForm = () => {
      newImage.value = {
        description: '',
        weight: '',
        url: '',
        date: new Date(),
      };
      selectedFile.value = null;
    };

    
    onMounted(() => {
      fetchGames();
      loadImages();
    });

    return {
      newImage,
      images,
      onFileChange,
      uploadImage,
    };
  }
}
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #1c1c1c; 
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 0;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.image-upload-section {
  margin: 20px 0;
}

.images-list {
  margin-top: 20px;
}

.image-item {
  margin-bottom: 20px;
}

.image-item img {
  max-width: 100%;
  height: auto;
}
</style>
