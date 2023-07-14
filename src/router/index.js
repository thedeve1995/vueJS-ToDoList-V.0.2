import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoneView from '../views/DoneView.vue'
import PinjamBarang from '../views/PinjamBarang.vue'
import PinjamSelesai from '../views/PinjamSelesai.vue'
import BarangMasuk from '../views/BarangMasuk.vue'
import PerbaikanBarang from '../views/PerbaikanBarang.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/pinjam',
      name: 'pinjam',
      component: PinjamBarang
    },
    {
      path: '/pinjamSelesai',
      name: 'pinjamSelesai',
      component: PinjamSelesai
    },
    {
      path: '/barangMasuk',
      name: 'barangMasuk',
      component: BarangMasuk
    },
    {
      path: '/perbaikan',
      name: 'perbaikan',
      component: PerbaikanBarang
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
