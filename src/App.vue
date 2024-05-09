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
  },
  computed: {
    layout() {
      return `${this.currentRoute.meta?.layout || this.defaultLayout}-layout`;
    },
  },
};
</script>
