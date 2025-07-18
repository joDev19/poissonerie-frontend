import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import IndexEntrer from '@/views/App/Entrer/Index.vue'
import { useCrudStore } from '@/stores/crudStore'
import IndexMarque from '@/views/App/Marque/Index.vue'
import IndexFournisseur from '@/views/App/Fournisseur/Index.vue'
import IndexVente from '@/views/App/Vente/Index.vue'
import Profile from '@/views/App/User/Profile.vue'
import IndexEmployee from '@/views/App/Employee/Index.vue'
import IndexProduct from "@/views/App/Product/Index.vue"
import Dashboard from '@/views/App/Dashboard.vue'
import Stats from '@/views/App/Vente/Stats.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/entrer/dashboard',
      name: 'entrer',
      component: IndexEntrer,
      // meta: {
      //   active: false,
      // }
    },
    // {
    //   path: '/loader',
    //   name: 'loader',
    //   component: Loader,
    // }
    {
      path: '/marque/dashboard',
      name: 'marque',
      component: IndexMarque,
    },
    {
      path: '/fournisseur/dashboard',
      name: 'fournisseur',
      component: IndexFournisseur,
    },
    {
      path: '/product/dashboard',
      name: 'product',
      component: IndexProduct,
    },
    {
      path: '/vente/dashboard',
      name: 'vente',
      component: IndexVente
    },
    {
      path: '/statistique/vente',
      name: 'stat_vente',
      component: Stats
    },
    {
      path: '/user/profile',
      name: 'profile',
      component: Profile,
    },
    {
      path: '/employee/dashboard',
      name: "employee",
      component: IndexEmployee,
    }, {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
    }
  ],
})
router.beforeEach((to, from) => {
  // ...
  useCrudStore().filters = {}
  return true
})
export default router
