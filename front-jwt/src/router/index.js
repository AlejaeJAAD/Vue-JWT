import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthHome from '../views/AuthHome.vue'
import Landing from '../views/Landing.vue'
import Dashboard from '../views/Dashboard.vue'
import Welcome from '../views/Welcome.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {requireAuth: true}
  },
  {
    path: '/about',
    name: 'AuthHome',
    component: AuthHome,
    meta: {requireAuth: true}
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: {requireAuth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("x_jwt_string");
  const rutaProtegida = to.matched.some(record => record.meta.requireAuth);

  if(rutaProtegida && token === null){
    // ruta protegida es true
    // token es nulo true, por ende redirigimos al inicio
    next({name: 'Landing'})
  }else{
    // En caso contrario sigue...
    next()
  }
})

export default router

