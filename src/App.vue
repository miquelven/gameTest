<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { useRouter } from "vue-router";

export default {
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
