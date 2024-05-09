<script>
import BestInfoItem from "@/components/Items/BestInfoItem.vue";
import Loader from "@/components/Loader/index.vue";
import Container from "@/views/icons/Container.vue";
import { useMouseInElement } from "@vueuse/core";
import axios from "axios";

export default {
  components: {
    BestInfoItem,
    Loader,
    Container,
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
      this.loading = true;
      try {
        const userEmail = this.$store.state.user
          ? this.$store.state.user.email
          : null;
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
  <section class="w-full mt-32 min-h-[calc(100vh-80px)]">
    <Container>
      <template v-if="loading">
        <div class="absolute inset-0 flex justify-center">
          <div
            class="font-medium h-[calc(100vh-24rem)] flex items-center text-5xl max-lg:text-4xl max-sm:text-3xl max-sm:left-[calc(50%-95px)] max-sm:top-[100px]"
          >
            <Loader />
          </div>
        </div>
      </template>

      <template v-else>
        <table
          v-if="scores.length > 0"
          class="rounded-lg shadow-md shadow-black/50 grid grid-cols-2 gap-16 bg-[#0c0c0c] p-10 max-xl:gap-14 max-md:mx-5 max-sm:mx-0 max-sm:flex max-sm:flex-col max-sm:gap-8"
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
          <tr class="m-auto col-start-1 col-end-3">
            <th>
              <h3
                class="text-5xl font-medium mb-10 max-2xl:text-4xl max-md:text-3xl max-sm:text-2xl"
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
        <div
          v-else
          class="text-center rounded-lg shadow-md shadow-black/50 grid grid-cols-2 gap-16 bg-[#0c0c0c] p-10 max-xl:gap-14 max-md:mx-5 max-sm:mx-0 max-sm:flex max-sm:flex-col max-sm:gap-8"
        >
          <p>Consiga pontuações para poder vê-las aqui</p>
        </div>
      </template>
    </Container>
  </section>
</template>
