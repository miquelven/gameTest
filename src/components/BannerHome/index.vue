<script>
import Button from "@/views/icons/Button.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";

export default {
  components: {
    Button,
    TextHighlight,
  },
};
</script>

<template>
  <section
    class="flex flex-col justify-center gap-40 h-[calc(100vh-212px)] items-center my-28 max-xl:gap-32 max-lg:gap-48 max-sm:my-16 max-sm:h-[calc(100vh-244px)] max-sm:gap-32"
    id="container"
  >
    <div class="text-center">
      <h1
        data-aos="fade-up"
        class="text-7xl font-bold max-xl:text-5xl max-sm:text-4xl max-[440px]:text-3xl"
      >
        Consiga a
        <TextHighlight> melhor pontuação </TextHighlight>
        e
        <span class="block mt-5">Fique em primeiro</span>
      </h1>
    </div>
    <div class="flex flex-col justify-center items-center gap-12">
      <h2
        data-aos="fade-up"
        data-aos-delay="300"
        class="text-2xl font-semibold text-center leading-9 max-xl:text-xl max-md:text-lg max-sm:text-base max-[440px]:text-sm"
      >
        Aqui você encontrará
        <TextHighlight>vários desafios, </TextHighlight>

        terá que superar todos eles no
        <TextHighlight> menor tempo possível, </TextHighlight>

        dê o seu máximo para conseguir a melhor pontuação.
      </h2>
      <router-link
        to="/gamesPage"
        data-aos="flip-left"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="500"
        data-aos-delay="600"
      >
        <Button type="button" label="INICIAR DESAFIO" />
      </router-link>
    </div>
  </section>
</template>
