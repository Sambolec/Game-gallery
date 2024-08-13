<template>
  <div class="admin-container">
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
        <router-link to="/profile" class="nav-link gallery-button">Your Gallery</router-link>
        
        <router-link to="/admin" class="nav-link active">Admin</router-link>
      </nav>
    </header>

    <div class="admin-container-content">
      <div class="game-form">
        <div class="form-section">
          <label for="game-image" class="image-upload-label">
            <img v-if="imagePreview" :src="imagePreview" alt="Game Image" class="image-preview"/>
            <img v-else src="path/to/placeholder/image" alt="Placeholder Image" class="image-placeholder"/>
            <input type="file" id="game-image" @change="previewImage" class="image-upload-input"/>
          </label>
        </div>
        <div class="form-section">
          <input type="text" v-model="gameName" placeholder="Name" class="input-field"/>
          <input type="text" v-model="releaseDate" placeholder="Release date" class="input-field"/>
          <input type="text" v-model="developerStudio" placeholder="Developer" class="input-field"/>
        </div>
      </div>
      <div class="admin-hub">
        <textarea v-model="description" placeholder="Description" class="description-field"></textarea>
        <button @click="addGame" class="add-button">Add to database</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/firebase';

export default {
  name: 'AdminView',
  setup() {
    const gameName = ref('');
    const releaseDate = ref('');
    const developerStudio = ref('');
    const description = ref('');
    const imagePreview = ref(null);
    const imageFile = ref(null);

    const previewImage = (event) => {
      const file = event.target.files[0];
      if (file) {
        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    };

    const addGame = async () => {
      try {
        const newGameRef = await addDoc(collection(db, 'video-games'), {
          Name: gameName.value,             
          Released: releaseDate.value,      
          Developer: developerStudio.value, 
          Description: description.value,   
          url: imagePreview.value || 'default-image-url', 
        });
        console.log('Game added with ID:', newGameRef.id);

        
        gameName.value = '';
        releaseDate.value = '';
        developerStudio.value = '';
        description.value = '';
        imagePreview.value = null;
        imageFile.value = null;

        alert('Game added successfully!');
      } catch (error) {
        console.error('Error adding game: ', error);
      }
    };

    return {
      gameName,
      releaseDate,
      developerStudio,
      description,
      imagePreview,
      previewImage,
      addGame,
    };
  },
};
</script>

<style scoped>
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.admin-container-content {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  width: 100%;
}

.game-form {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  width: 45%;
}

.admin-hub {
  background-color: #2c2c2c;
  padding: 20px;
  border-radius: 10px;
  width: 45%;
}

.form-section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.input-field {
  background-color: #444;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
}

.image-upload-label {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #444;
  border-radius: 10px;
  cursor: pointer;
  height: 200px;
}

.image-placeholder,
.image-preview {
  width: 100%;
  max-height: 200px;
  object-fit: cover;
}

.image-upload-input {
  display: none;
}

.description-field {
  width: 100%;
  height: 150px;
  background-color: #444;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
}

.add-button {
  background-color: red;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: 100%;
}

.add-button:hover {
  background-color: #d40000;
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
  background-color: #d40000; 
}

.logout-button:focus {
  outline: none;
  box-shadow: 0 0 4px red;
}

.gallery-button {
  background-color: #444; 
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.gallery-button:hover {
  background-color: #555; 
}

.gallery-button:focus {
  outline: none;
  box-shadow: 0 0 4px white;
}
</style>
