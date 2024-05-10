<script>
import timerImg from "../../assets/images/Home/timer.webp";
import TextHighlight from "@/views/icons/TextHighlight.vue";

export default {
  components: { TextHighlight },
  data() {
    return {
      timerImg: timerImg,
      TextHighlight,
    };
  },
};
</script>

<template>
  <section class="flex justify-center items-center max-sm:mt-40">
    <div
      data-aos="zoom-in"
      data-aos-delay="200"
      class="flex-1 brightness-90 max-sm:hidden"
    >
      <v-img :src="timerImg" class="h-5/6 w-5/6 invert" cover></v-img>
    </div>
    <div class="flex-1 flex flex-col gap-20 max-sm:gap-14">
      <h3
        data-aos="zoom-in"
        data-aos-delay="400"
        class="text-6xl font-bold text-center max-xl:text-4xl max-md:text-4xl"
      >
        Ganhe todos os jogos no

        <TextHighlight> menor tempo </TextHighlight>
        possível
      </h3>
      <div
        data-aos="zoom-in"
        data-aos-delay="600"
        class="text-[#bababa] text-center text-2xl max-xl:text-lg max-xl:leading-8 max-md:text-base"
      >
        <p>
          Consiga a melhor pontuação para aparecer no ranking dos melhores.
          <TextHighlight> Vença os jogos para obter mais pontos </TextHighlight>
          , quanto mais o tempo passa menos pontos você terá na pontuação final.
        </p>
        <p></p>
      </div>
    </div>
  </section>
</template>
