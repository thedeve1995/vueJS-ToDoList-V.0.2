import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DoneView from '../views/DoneView.vue'
import PinjamBarang from '../views/PinjamBarang.vue'
import PinjamSelesai from '../views/PinjamSelesai.vue'
import BarangMasuk from '../views/BarangMasuk.vue'
import PerbaikanBarang from '../views/PerbaikanBarang.vue'
import RequestBeli from '../views/RequestBeli.vue'
import LoginView from '../views/LoginView.vue'

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
      path: '/login',
      name: 'login',
      component: LoginView,
      meta :{
        requiresAuth:false,
      }
    },
    {
      path: '/perbaikan',
      name: 'perbaikan',
      component: PerbaikanBarang
    },
    {
      path: '/buyrequest',
      name: 'buyrequest',
      component: RequestBeli
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

const getCurrentUser=()=>{
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user)=> {
        removeListener();
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async(to, from, next) =>{
  if(to.matched.some((record) => record.meta.requiresAuth)){
    if(await getCurrentUser()){
      next()
    } else {
      alert("You Dont Have Access ! Please Log In")
      next("/login")
    }
  }else {
    next()
  }
});

export default router
