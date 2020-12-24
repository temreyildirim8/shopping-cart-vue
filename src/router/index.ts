import VueRouter from 'vue-router'
import BasketList from '@/components/BasketList.vue'
import ProductList from '@/components/ProductList.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProductList
  },
  {
    path: '/Basket',
    name: 'Basket',
    component: BasketList
  }
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
