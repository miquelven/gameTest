import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

function lazyLoad(view) {
  return () => import(`../views/${view}.vue`);
}

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
        layout: "default",
      },
    },
    {
      path: "/:pathMatch(.*)",
      name: "notFound",
      component: lazyLoad("NotFound"),
      meta: {
        title: "Página não encontrada",
        layout: "empty",
      },
    },
    {
      path: "/about",
      name: "about",
      component: lazyLoad("AboutView"),
      meta: {
        title: "Sobre",
        layout: "default",
      },
    },
    {
      path: "/login",
      name: "login",
      component: lazyLoad("Login"),
      meta: {
        title: "Login",
        layout: "empty",
      },
    },
    {
      path: "/contact",
      name: "contact",
      component: lazyLoad("Contact"),
      meta: {
        title: "Contato",
        layout: "default",
      },
    },
    {
      path: "/register",
      name: "register",
      component: lazyLoad("Register"),
      meta: {
        title: "Registro",
        layout: "empty",
      },
    },
    {
      path: "/resetpassword/:params*",
      name: "resetpassword",
      component: lazyLoad("Auth"),
      meta: {
        title: "Trocar a senha",
        layout: "empty",
      },
    },
    {
      path: "/scores",
      name: "scores",
      component: lazyLoad("ScoreView"),
      meta: {
        title: "Pontuações",
        layout: "default",
      },
    },
    {
      path: "/best",
      name: "best",
      component: lazyLoad("BestView"),
      meta: {
        title: "Melhores pontuações",
        layout: "default",
      },
    },

    {
      path: "/gamesPage",
      name: "gamesPage",
      component: lazyLoad("GamesPage"),
      meta: {
        title: "Jogos",
        layout: "empty",
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
  window.scrollTo(0, 0);
});

export default router;
