<script>
import ContactIconItem from "@/components/Items/ContactIconItem.vue";

export default {
  components: {
    ContactIconItem,
  },
};
</script>

<template>
  <section class="w-full min-h-[calc(100vh-350px)]" id="best">
    <Container
      class="relative max-w-screen-2xl min-h-screen max-2xl:max-w-screen-xl max-xl:max-w-screen-lg m-auto max-lg:max-w-screen-md max-md:max-w-96"
    >
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
    </Container>
  </section>
</template>
