<script>
import ContactIconItem from "@/components/Items/ContactIconItem.vue";
import Footer from "@/components/Footer/Footer.vue";
import Header from "@/components/Header/Header.vue";

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
  <main class="w-full mt-10 min-h-[calc(100vh-250px)]" id="best">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto flex justify-center">
      <div class="flex flex-col gap-20 items-center mt-52">
        <h3 class="text-5xl font-medium max-sm:text-4xl" data-aos="zoom-in">
          Contatos:
        </h3>
        <div class="flex items-center">
          <ContactIconItem
            :icon="['fab', 'facebook-f']"
            name="Facebook"
            styling="#4267B2"
            v-motion
            :initial="{
              opacity: 0,
            }"
            :enter="{
              opacity: 1,
              transition: {
                duration: 400,
                type: 'keyframes',
                ease: 'easein,',
              },
            }"
          />
          <ContactIconItem
            :icon="['fab', 'instagram']"
            name="Instagram"
            styling="#E1306C"
            v-motion
            :initial="{
              opacity: 0,
            }"
            :enter="{
              opacity: 1,
              transition: {
                duration: 400,
                type: 'keyframes',
                ease: 'easein,',
              },
            }"
          />
          <ContactIconItem
            :icon="['fab', 'github']"
            name="GitHub"
            styling="#333"
            v-motion
            :initial="{
              opacity: 0,
            }"
            :enter="{
              opacity: 1,
              transition: {
                duration: 400,
                type: 'keyframes',
                ease: 'easein,',
              },
            }"
          />
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
