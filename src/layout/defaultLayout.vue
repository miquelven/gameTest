<template>
  <Header />
  <slot />
  <Footer />
</template>

<script>
import Header from "@/components/Header/index.vue";
import Footer from "@/components/Footer/index.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>
