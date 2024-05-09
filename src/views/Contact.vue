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
    class="w-full mt-20 h-[calc(100vh-80px)] flex justify-center items-center"
    id="best"
  >
    <div class="px-5">
      <div class="flex flex-col gap-20 items-center max-sm:gap-10">
        <h1
          data-aos="fade-up"
          data-aos-delay="400"
          class="text-6xl font-bold text-center max-xl:text-5xl max-md:text-4xl max-[440px]:text-3xl"
        >
          Conecte-se conosco nas redes sociais!
        </h1>
        <h2
          data-aos="fade-up"
          data-aos-delay="400"
          class="max-w-7xl mx-auto text-[#bababa] text-center text-3xl max-2xl:text-2xl max-xl:text-xl max-md:text-lg max-sm:text-base"
        >
          Basta clicar nos ícones abaixo para acessar nossos perfis e ficar por
          dentro de todas as novidades, comunidades e informações relevantes do
          GameTest
        </h2>

        <div class="flex items-center max-sm:flex-col max-sm:gap-5">
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
        <p
          class="text-[#a9a9a9] text-center text-xl max-xl:text-lg max-md:text-base max-sm:text-sm"
        >
          Veja dicas, métodos, guias e acompanhe a trajetória de várias pessoas
        </p>
      </div>
    </div>
  </section>
</template>
