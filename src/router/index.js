import Vue from 'vue'
import VueRouter from 'vue-router'
import AddCity from '../views/AddCity.vue'
import theWeather from '../views/theWeather.vue'

Vue.use(VueRouter)

// Donner les chemin des views 
const routes = [
  {
    path: '/',
    name: 'AddCity',
    component: AddCity
  },
  {
    path: '/theWeather/:city',
    name: 'theWeather',
    component: theWeather,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;