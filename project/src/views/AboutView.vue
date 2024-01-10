<script>
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<template>
  <Header />
  <main class="w-full my-19" id="best">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto flex justify-center">Create about</div>
  </main>
  <Footer />
</template>

<style scoped>
#best {
  min-height: calc(100vh - 250px);
}
</style>
