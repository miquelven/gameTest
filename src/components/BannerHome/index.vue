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
    class="relative flex items-center justify-center my-24 lg:my-32"
    id="container"
  >
    <div class="max-w-3xl mx-auto space-y-10 text-center">
      <h1
        data-aos="fade-up"
        data-aos-delay="100"
        class="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight"
      >
        Suba para o
        <TextHighlight>topo do ranking</TextHighlight>
        e prove suas habilidades.
      </h1>

      <p
        data-aos="fade-up"
        data-aos-delay="200"
        class="text-lg lg:text-xl text-white-light max-w-xl mx-auto lg:mx-0"
      >
        Jogue clássicos reimaginados, desafie seus reflexos e memória e acumule
        pontos para entrar para a elite do
        <TextHighlight>
          <span class="font-bold">ChronoRun.</span></TextHighlight
        >
      </p>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        class="flex flex-col sm:flex-row items-center gap-4 justify-center"
      >
        <router-link to="/gamesPage">
          <Button type="button" label="INICIAR DESAFIO" class="font-bold" />
        </router-link>
      </div>
    </div>
  </section>
</template>
