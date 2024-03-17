<script>
import ContactIconItem from "@/components/Items/ContactIconItem.vue";

export default {
  components: {
    ContactIconItem,
  },
};
</script>

<template>
  <section
    class="w-full h-[calc(100vh-80px)] flex justify-center items-center"
    id="best"
  >
    <div class="flex flex-col gap-20 items-center">
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
  </section>
</template>
