<script>
import BestInfoItem from "@/components/Items/BestInfoItem.vue";
import { useMouseInElement } from "@vueuse/core";
import axios from "axios";

export default {
  components: {
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

      loading: false,
    };
  },
  mounted() {
    this.fetchUserScores();
  },
  methods: {
    activeEffectHover() {
      this.infoItems = this.$refs.infoItems;

      const { elementX, elementY, isOutSide, elementHeight, elementWidth } =
        useMouseInElement(this.infoItems);
      this.elementX = elementX;
      this.elementY = elementY;
      this.isOutSide = isOutSide;
      this.elementHeight = elementHeight;
      this.elementWidth = elementWidth;
    },
    async fetchUserScores() {
      try {
        const userEmail = this.$store.state.user
          ? this.$store.state.user.email
          : null;
        this.loading = true;
        const response = await axios("/api/scores", {
          params: { email: userEmail },
        });

        this.scores = response.data.userScores.sort((a, b) => b - a);
        this.scores = this.scores.slice(0, 10);
      } catch (error) {
        console.error("Erro ao obter scores do usuário:", error);
      } finally {
        this.loading = false;

        this.activeEffectHover();
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
  <main class="w-full mt-32 min-h-[calc(100vh)]">
    <!-- container -->
    <div
      class="relative max-w-screen-2xl h-screen max-2xl:max-w-screen-xl max-xl:max-w-screen-lg m-auto max-lg:max-w-screen-md max-md:max-w-96"
    >
      <template v-if="loading">
        <div class="absolute inset-0">
          <p
            class="absolute top-[200px] left-[calc(50vw-200px)] font-medium text-5xl max-lg:text-4xl max-sm:text-3xl max-sm:left-[calc(50%-95px)] max-sm:top-[100px]"
          >
            Carregando...
          </p>
        </div>
      </template>

      <template v-else>
        <table
          class="grid grid-cols-3 grid-rows-5 gap-16 bg-gradient-to-br from-white/10 from-90% to-[#69dcaa] p-10 max-xl:grid-cols-2 max-xl:grid-rows-6 max-xl:gap-14 max-md:flex max-md:flex-col max-md:gap-8"
          ref="infoItems"
          :style="{
            transform: cardTransform,
            transition: 'transform 150ms ease-out',
          }"
          v-motion
          :initial="{
            opacity: 0,
          }"
          :enter="{
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
              <h3
                class="text-5xl font-medium bg-clip-text bg-gradient-to-r from-[#2bb478] from-10% via-[#69dcaa] via-30% to-[#40d292] to-90% text-transparent mb-10 max-2xl:text-4xl max-md:text-3xl"
              >
                Suas melhores pontuações:
              </h3>
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
      </template>
    </div>
  </main>
</template>
