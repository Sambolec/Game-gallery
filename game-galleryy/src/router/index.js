import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { auth } from '../firebase'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'about',
    
    component: () => import( '../views/AboutView.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/game-view',
    name: 'game-view',
    
    component: () => import( '../views/GameView.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/hot',
    name: 'hot',
    
    component: () => import( '../views/HotView.vue'),
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/goats',
    name: 'goats',
    
    component: () => import( '../views/GoatsView.vue'),
    meta: {
      requiresAuth: true
    }
  },


  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },





  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach((to,from,next)=> {
  if(to.path === 'login' && auth.currentUser){
    next('/')
    return;
  }
  if(to.matched.some(record => record.meta.requiresAuth) &&  !auth.currentUser){
    next('/login')
    return;
  }
  next();
})



router.beforeEach((to,from,next)=> {
  if(to.path === 'register' && auth.currentUser){
    next('/')
    return;
  }
  if(to.matched.some(record => record.meta.requiresAuth) &&  !auth.currentUser){
    next('/register')
    return;
  }
  next();
})


export default router
