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
  <main class="w-full mt-20 min-h-[calc(100vh-250px)]" id="best">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto flex justify-center">
      <div class="flex flex-col gap-20 items-center mt-52">
        <h1
          class="text-7xl font-bold max-sm:text-5xl"
          v-motion
          :initial="{
            y: -200,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
            transition: {
              duration: 700,
              type: 'keyframes',
              ease: 'easein,',
            },
          }"
        >
          Contatos:
        </h1>
        <div class="flex items-center">
          <ContactIconItem
            :icon="['fab', 'facebook-f']"
            name="Facebook"
            styling="#4267B2"
            v-motion
            :initial="{
              x: -100,
              opacity: 0,
              scale: 2,
            }"
            :enter="{
              x: 0,
              opacity: 1,
              transition: {
                duration: 400,
                type: 'keyframes',
                ease: 'easein,',
              },
              scale: 1,
            }"
          />
          <ContactIconItem
            :icon="['fab', 'instagram']"
            name="Instagram"
            styling="#E1306C"
            v-motion
            :initial="{
              y: 100,
              opacity: 0,
              scale: 2,
            }"
            :enter="{
              y: 0,
              opacity: 1,
              transition: {
                duration: 400,
                type: 'keyframes',
                ease: 'easein,',
              },
              scale: 1,
            }"
          />
          <ContactIconItem
            :icon="['fab', 'github']"
            name="GitHub"
            styling="#333"
            v-motion
            :initial="{
              x: 100,
              opacity: 0,
              scale: 2,
            }"
            :enter="{
              x: 0,
              opacity: 1,
              transition: {
                duration: 400,
                type: 'keyframes',
                ease: 'easein,',
              },
              scale: 1,
            }"
          />
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>
