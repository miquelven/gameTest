import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import AboutView from "@/views/AboutView.vue";
import Contact from "@/views/Contact.vue";
// import Auth from "@/views/Auth.vue";

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
      path: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/about",
      name: "about",
      component: AboutView,
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
    // {
    //   path: "/resetpassword",
    //   name: "resetpassword",
    //   component: Auth,
    // },
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
