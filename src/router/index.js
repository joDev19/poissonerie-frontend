import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Auth/Login.vue'
import IndexEntrer from '@/views/App/Entrer/Index.vue'
import { useCrudStore } from '@/stores/crudStore'
import IndexMarque from '@/views/App/Marque/Index.vue'
import IndexFournisseur from '@/views/App/Fournisseur/Index.vue'
import IndexVente from '@/views/App/Vente/Index.vue'
import IndexProduct from "@/views/App/Product/Index.vue"
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
    }
  ],
})
router.beforeEach((to, from) => {
  // ...
  useCrudStore().filters = {}
  return true
})
export default router
