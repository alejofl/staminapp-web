import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Explore from "../views/Explore.vue";
import Statistics from "../views/Statistics.vue";
import Profile from "../views/Profile.vue";
import Library from "../views/Library.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Routine from "@/views/Routine";
import EmailVerification from "@/views/EmailVerification";
import ExternalUserView from "@/views/User";
import Error from '@/views/Error'
import { useSecurityStore } from "@/store/SecurityStore";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiresAuth: false,
      title: 'Inicio'
    }
  },
  {
    path: "/explore",
    name: "explore",
    component: Explore,
    meta: {
      requiresAuth: false,
      title: 'Explorar'
    }
  },
  {
    path: "/statistics",
    name: "statistics",
    component: Statistics,
    meta: {
      requiresAuth: true,
      title: 'Estadísticas'
    }
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: {
      requiresAuth: true,
      title: 'Mi perfil'
    }
  },
  {
    path: "/library",
    name: "library",
    component: Library,
    meta: {
      requiresAuth: true,
      title: 'Mi biblioteca'
    }
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn,
    meta: {
      requiresAuth: false,
      title: 'Iniciar sesión'
    }
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp,
    meta: {
      requiresAuth: false,
      title: 'Registrarse'
    }
  },
  {
    path: "/routine/new",
    name: "new-routine",
    component: Routine,
    meta: {
      requiresAuth: true,
      title: 'Nueva rutina'
    }
  },
  {
    path: "/routine/:id",
    name: "routine",
    component: Routine,
    meta: {
      requiresAuth: true,
      title: 'Rutina'
    }
  },
  {
    path: "/verification",
    name: "email-verification",
    component: EmailVerification,
    meta: {
      requiresAuth: false,
    }
  },
  {
    path: "/user/:id",
    name: "user",
    component: ExternalUserView,
    meta: {
      requiresAuth: true,
      title: 'Usuario'
    }
  },
  {
    path: "/error",
    name: "error",
    component: Error,
    meta: {
      requiresAuth: false,
      title: 'Error'
    }
  },
  {
    path: "*",
    name: "error",
    component: Error,
    meta: {
      requiresAuth: false,
      title: 'Error'
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useSecurityStore();
  await store.isLoggedIn;
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    next({ name: "sign-in" });
  }
  next();
})

router.afterEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} | StaminApp`;
  }
})

export default router;
