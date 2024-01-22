<script>
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";
import BestInfoItem from "@/components/BestInfoItem.vue";
import { useMouseInElement } from "@vueuse/core";

export default {
  components: {
    Header,
    Footer,
    BestInfoItem,
  },
  data() {
    return {
      scores: [],

      infoItems: null,
      elementX: null,
      elementY: null,
      isOutSide: null,
      elementHeight: null,
      elementWidth: null,
    };
  },
  mounted() {
    this.fetchUserScores();

    this.infoItems = this.$refs.infoItems;

    const { elementX, elementY, isOutSide, elementHeight, elementWidth } =
      useMouseInElement(this.infoItems);
    this.elementX = elementX;
    this.elementY = elementY;
    this.isOutSide = isOutSide;
    this.elementHeight = elementHeight;
    this.elementWidth = elementWidth;
  },
  methods: {
    async fetchUserScores() {
      try {
        const userEmail = this.$store.state.user
          ? this.$store.state.user.email
          : null;

        const response = await this.$axios.get("/api/scores", {
          params: { email: userEmail },
        });

        this.scores = response.data.userScores.sort((a, b) => b - a);
        this.scores = this.scores.slice(0, 10);
      } catch (error) {
        console.error("Erro ao obter scores do usuário:", error);
        // Trate o erro conforme necessário
      }
    },
  },
  computed: {
    cardTransform() {
      const MAX_ROTATION = 6;

      const rX = (
        MAX_ROTATION / 2 -
        (this.elementY / this.elementHeight) * MAX_ROTATION
      ).toFixed(2);

      const rY = (
        MAX_ROTATION / 2 -
        (this.elementX / this.elementWidth) * MAX_ROTATION
      ).toFixed(2);

      return this.isOutSide
        ? ""
        : `perspective(${this.elementWidth}px) rotateX(${rX}deg) rotateY(${rY}deg)`;
    },
  },
};
</script>

<template>
  <Header />
  <main class="w-full mt-32" id="best">
    <!-- container -->
    <div
      class="max-w-screen-2xl m-auto h-screen max-2xl:max-w-screen-xl max-xl:max-w-screen-lg max-lg:max-w-screen-md max-md:max-w-96"
    >
      <table
        class="grid grid-cols-3 grid-rows-5 gap-16 bg-gradient-to-r from-white/10 from-10% via-yellow-200/30 via-30% to-yellow-100/10 to-90% p-10 shadow-2xl shadow-black/80 max-xl:grid-cols-2 max-xl:grid-rows-6 max-xl:gap-14 max-md:flex max-md:flex-col max-md:gap-8"
        ref="infoItems"
        :style="{
          transform: cardTransform,
          transition: 'transform 150ms ease-out',
        }"
        v-motion
        :initial="{
          x: -500,
          opacity: 0,
        }"
        :enter="{
          x: 0,
          opacity: 1,
          transition: {
            duration: 700,
            type: 'keyframes',
            ease: 'easein,',
          },
        }"
      >
        <tr
          class="row-start-1 row-end-6 m-auto max-xl:row-end-2 max-xl:col-start-1 max-xl:col-end-3"
        >
          <th>
            <h1
              class="text-6xl bg-clip-text bg-gradient-to-r from-yellow-400 from-10% via-yellow-100 via-30% to-yellow-400 to-90% text-transparent mb-10 max-2xl:text-5xl max-md:text-3xl"
            >
              Suas melhores pontuações:
            </h1>
          </th>
        </tr>
        <tr
          v-for="(score, index) in scores"
          :key="index"
          class="min-2xl:even:col-start-2 min-2xl:even:col-end-3"
        >
          <BestInfoItem :score="score" :position="index + 1" />
        </tr>
      </table>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
#best {
  min-height: calc(100vh);
}
</style>
