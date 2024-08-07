import { createStore } from 'vuex';
import router from '../router';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export default createStore({
  state: {
    user: null,
    games: [],
    nameFilter: ''
  },
  getters: {
    filteredGamesByName(state) {
      if (!state.nameFilter) {
        return state.games;
      }
      return state.games.filter(game => game.Name.toLowerCase().includes(state.nameFilter.toLowerCase()));
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_GAMES(state, games) {
      state.games = games;
    },
    SET_NAME_FILTER(state, filter) {
      state.nameFilter = filter;
    }
  },
  actions: {
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert("User not found");
            break;
          case 'auth/wrong-password':
            alert("Wrong password");
            break;
          default:
            alert("Oops, something went wrong");
        }
        return;
      }
      commit('SET_USER', auth.currentUser);
      router.push('/');
    },
    async register({ commit }, details) {
      const { email, password } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert("Email already in use");
            break;
          case 'auth/invalid-email':
            alert("Invalid email");
            break;
          case 'auth/weak-password':
            alert("Password is too weak");
            break;
          default:
            alert("Oops, something went wrong");
        }
        return;
      }
      commit('SET_USER', auth.currentUser);
      router.push('/');
    },
    async logout({ commit }) {
      await signOut(auth);
      commit('CLEAR_USER');
      router.push('/login');
    },
    fetchUser({ commit }) {
      auth.onAuthStateChanged(async user => {
        if (user === null) {
          commit('CLEAR_USER');
        } else {
          commit('SET_USER', user);
          if (router.isReady() && router.currentRoute.value.path === '/login') {
            router.push('/');
          }
        }
      });
    },
    async fetchGames({ commit }) {
      const gamesRef = collection(db, 'video-games');
      const querySnapshot = await getDocs(gamesRef);
      const games = querySnapshot.docs.map(doc => doc.data());
      commit('SET_GAMES', games);
    },
    updateNameFilter({ commit }, filter) {
      commit('SET_NAME_FILTER', filter);
    }
  }
});
