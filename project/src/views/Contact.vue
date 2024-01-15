<script>
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";
import ContactIconItem from "@/components/ContactIconItem.vue";

export default {
  components: {
    Header,
    Footer,
    ContactIconItem,
  },
};
</script>

<template>
  <Header />
  <main class="w-full my-19" id="best">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto flex justify-center">
      <div class="flex flex-col gap-16 items-center mt-52">
        <h1 class="text-5xl font-bold">Contatos:</h1>
        <div class="flex items-center">
          <ContactIconItem
            :icon="['fab', 'facebook-f']"
            name="Facebook"
            styling="#4267B2"
          />
          <ContactIconItem
            :icon="['fab', 'instagram']"
            name="Instagram"
            styling="#E1306C"
          />
          <ContactIconItem
            :icon="['fab', 'github']"
            name="GitHub"
            styling="#333"
          />
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
#best {
  min-height: calc(100vh - 250px);
}
</style>
