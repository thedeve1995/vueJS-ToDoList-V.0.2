import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoneView from '../views/DoneView.vue'
import FerdiView from '../views/FerdiView.vue'
import BudiView from '../views/BudiView.vue'
import ReviView from '../views/ReviView.vue'
import SuripView from '../views/SuripView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ferdi',
      name: 'ferdi',
      component: FerdiView
    },
    {
      path: '/budi',
      name: 'budi',
      component: BudiView
    },
    {
      path: '/revi',
      name: 'revi',
      component: ReviView
    },
    {
      path: '/surip',
      name: 'surip',
      component: SuripView
    },
    {
      path: '/done',
      name: 'done',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: DoneView
    }
  ]
})

export default router
