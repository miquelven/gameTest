import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import AboutView from "@/views/AboutView.vue";
import Contact from "@/views/Contact.vue";
import PerfilView from "@/views/PerfilView.vue";
import Auth from "@/views/Auth.vue";
import GamesPage from "@/views/GamesPage.vue";
import ScoreView from "@/views/ScoreView.vue";
import BestView from "@/views/BestView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)",
      name: "notFound",
      component: NotFound,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/resetpassword/:params*",
      name: "resetpassword",
      component: Auth,
    },
    {
      path: "/scores",
      name: "scores",
      component: ScoreView,
    },
    {
      path: "/best",
      name: "best",
      component: BestView,
    },
    {
      path: "/perfil",
      name: "perfil",
      component: PerfilView,
    },
    {
      path: "/gamesPage",
      name: "gamesPage",
      component: GamesPage,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const token = localStorage.getItem("token");

    if (token) {
      return next();
    }

    return next("/login");
  }

  next();
});

export default router;
