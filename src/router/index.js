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

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/explore",
    name: "explore",
    component: Explore,
  },
  {
    path: "/statistics",
    name: "statistics",
    component: Statistics,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/library",
    name: "library",
    component: Library,
  },
  {
    path: "/sign-in",
    name: "sign-in",
    component: SignIn,
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp,
  },
  {
    path: "/routine/new",
    name: "new-routine",
    component: Routine,
  },
  {
    path: "/routine/:id",
    name: "routine",
    component: Routine,
  },
  {
    path: "/verification",
    name: "email-verification",
    component: EmailVerification,
  },
  {
    path: "/user/:id",
    name: "user",
    component: ExternalUserView,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
