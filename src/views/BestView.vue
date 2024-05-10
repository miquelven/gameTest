<script>
import BestInfoItem from "@/components/Items/BestInfoItem.vue";
import Loader from "@/components/Loader/index.vue";
import Container from "@/views/icons/Container.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";
import { useMouseInElement } from "@vueuse/core";
import axios from "axios";
import useGetScores from "@/hooks/useGetScores.js";

export default {
  components: {
    BestInfoItem,
    Loader,
    Container,
    TextHighlight,
  },
  data() {
    return {
      scores: [],
      loading: false,
    };
  },
  async mounted() {
    const userEmail = this.$store.state.user
      ? this.$store.state.user.email
      : null;

    const { data, isPending } = useGetScores(userEmail);
    this.loading = isPending;

    this.scores = data;
  },
};
</script>

<template>
  <section
    class="w-1/2 mx-auto mt-32 min-h-[calc(100vh-80px)] max-2xl:w-2/3 max-md:w-9/12 max-[550px]:w-11/12"
  >
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
          v-if="scores && scores.length > 0"
          class="rounded-lg shadow-md shadow-black-half grid grid-cols-2 gap-16 bg-black-light p-10 max-xl:gap-14 max-md:mx-5 max-sm:mx-0 max-sm:flex max-sm:flex-col max-sm:gap-8"
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
                class="text-5xl font-medium mb-5 max-2xl:text-4xl max-md:text-3xl max-sm:text-2xl"
              >
                Suas melhores pontuações:
              </h3>
              <p
                class="font-medium text-white-light leading-7 max-sm:text-sm max-sm:mb-5"
              >
                Alcance
                <TextHighlight> melhores pontuações </TextHighlight>
                para atualizar o seu histórico.
              </p>
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
          class="rounded-lg text-center shadow-md shadow-black-half bg-black-light p-10 max-md:mx-5 max-sm:mx-0"
        >
          <p class="text-3xl max-sm:text-base">
            Consiga pontuações para poder vê-las aqui
          </p>
        </div>
      </template>
    </Container>
  </section>
</template>
