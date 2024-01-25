import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import AboutView from "@/views/AboutView.vue";
import Contact from "@/views/Contact.vue";
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
        title: "GameTest",
        requiresAuth: true,
      },
    },
    {
      path: "/:pathMatch(.*)",
      name: "notFound",
      component: NotFound,
      meta: {
        title: "Página não encontrada",
      },
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
      meta: {
        title: "Sobre",
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
      meta: {
        title: "Contato",
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        title: "Registro",
      },
    },
    {
      path: "/resetpassword/:params*",
      name: "resetpassword",
      component: Auth,
      meta: {
        title: "Trocar a senha",
      },
    },
    {
      path: "/scores",
      name: "scores",
      component: ScoreView,
      meta: {
        title: "Pontuações",
      },
    },
    {
      path: "/best",
      name: "best",
      component: BestView,
      meta: {
        title: "Melhores pontuações",
      },
    },

    {
      path: "/gamesPage",
      name: "gamesPage",
      component: GamesPage,
      meta: {
        title: "Jogos",
      },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title}`;
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
