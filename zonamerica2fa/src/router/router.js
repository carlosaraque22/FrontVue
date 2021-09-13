import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/',
    name: 'Home',
    redirect: {
      name: "Login"
    }
  },
  {
    path: '/qrgenerator',
    name: 'Qrgenerator',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/Qrgenerator.vue'),

    beforeEnter: (to, from, next) => {
      const hola = localStorage.getItem("token");
      if (hola) {
        next();
      } else {
        localStorage.removeItem("token");
        console.log("token invalido")
        next({ name: "Login" });
      }
    }
  },
  {
    path: '/modificarqr',
    name: 'Modificarqr',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "home" */ '../views/ModificarQr.vue'),

    beforeEnter: (to, from, next) => {
      const hola = localStorage.getItem("token");
      if (hola) {
        next();
      } else {
        localStorage.removeItem("token");
        console.log("token invalido")
        next({ name: "Login" });
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  base: "/qrcode"
})


export default router
