<script>
import rankingImg from "../../assets/images/Home/ranking.webp";
import TextHighlight from "@/views/icons/TextHighlight.vue";

export default {
  components: { TextHighlight },
  data() {
    return {
      rankingImg: rankingImg,
    };
  },
};
</script>

<template>
  <section
    class="text-center mt-80 flex flex-col gap-32 max-xl:gap-28 max-sm:gap-14"
  >
    <div>
      <h3
        data-aos="zoom-in"
        data-aos-delay="200"
        class="mb-14 text-6xl font-bold text-center max-xl:text-4xl max-md:text-4xl"
      >
        No ranking, são exibidas as
        <TextHighlight> 10 melhores pontuações </TextHighlight>
      </h3>
      <h4
        data-aos="zoom-in"
        data-aos-delay="400"
        class="text-[#bababa] text-center text-2xl max-xl:text-lg max-xl:leading-8 max-md:text-base"
      >
        Ele é atualizado em tempo real, fornecendo informações detalhadas sobre
        os principais jogadores, incluindo seus
        <TextHighlight>
          nomes, pontuações e posições no ranking.
        </TextHighlight>
      </h4>
    </div>
    <div class="brightness-90" data-aos="zoom-in" data-aos-delay="600">
      <v-img :src="rankingImg" class="w-1/4 h-1/4 invert mx-auto" cover></v-img>
    </div>
    <p
      data-aos="zoom-in"
      data-aos-delay="700"
      class="max-w-7xl mx-auto text-[#bababa] text-center text-xl max-md:text-lg max-sm:hidden"
    >
      No ranking, os números falam por si. Representam o esforço dos jogadores
      em alcançar o topo. É simples: os
      <TextHighlight> melhores são reconhecidos, </TextHighlight>
      e a competição continua.
    </p>
  </section>
</template>
