import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CityDetail from '../views/CityDetail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/city/:city_name',
    name: 'CityDetail',
    component: CityDetail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
