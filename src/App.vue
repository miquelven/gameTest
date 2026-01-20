<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
  <ScrollToTopButton />
</template>

<script>
import { useRouter } from "vue-router";
import ScrollToTopButton from "./components/ScrollToTopButton/index.vue";

export default {
  components: { ScrollToTopButton },
  data() {
    return {
      defaultLayout: "empty",
      currentRoute: {},
    };
  },
  mounted() {
    const { currentRoute } = useRouter();
    this.currentRoute = currentRoute;

    const user = this.$store.state.user;
    if (user && user.email === "google-login") {
      console.warn(
        "Detectado estado de usuário inconsistente. Forçando logout para correção.",
      );
      this.$store.commit("setUser", null);
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      window.location.reload();
    }
  },
  computed: {
    layout() {
      return `${this.currentRoute.meta?.layout || this.defaultLayout}-layout`;
    },
  },
};
</script>
