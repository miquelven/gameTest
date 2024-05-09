<script>
import TopInfoItem from "@/components/Items/TopInfoItem.vue";
import axios from "axios";

export default {
  components: {
    TopInfoItem,
  },
  data() {
    return {
      topScores: [],
    };
  },
  mounted() {
    this.fetchTopScores();
  },
  methods: {
    async fetchTopScores() {
      const response = await axios("/api/top-scores");

      this.topScores = response.data.topScores.map((item) => ({
        ...item,
        name: this.capitalizeFirstLetter(item.name),
      }));
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
  },
};
</script>

<template>
  <section class="w-full min-h-[calc(100vh-80px)] mt-44">
    <div class="min-w-screen-2xl m-auto flex justify-center">
      <table
        class="w-1/3 grid grid-cols-1 gap-10 p-10 bg-[#0c0c0c] shadow-md shadow-black/50 rounded-lg max-xl:w-1/2 max-md:w-10/12 max-md:mx-5 max-sm:mx-0 max-sm:w-11/12 max-sm:gap-7"
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
        <tr class="flex justify-center">
          <th>
            <h3
              class="text-5xl font-medium mb-5 max-2xl:text-4xl max-sm:text-3xl"
            >
              Top Pontuações:
            </h3>

            <div
              class="font-medium text-[#bababa] leading-7 max-sm:text-sm max-sm:mb-5"
            >
              <p>Listagem dos jogadores com as melhores pontuações .</p>
              <p>
                Destaque das
                <span class="text-[#2bb478]"> pontuações mais altas </span> dos
                <span class="text-[#2bb478]"> melhores jogadores </span> em
                nossos jogos
              </p>
            </div>
          </th>
        </tr>
        <tr
          v-for="(item, index) in topScores"
          :key="index"
          class="transition-all duration-300 w-10/12 mx-auto flex justify-between hover:bg-[#0a0a0a] hover:scale-105 items-center text-xl gap-20 px-7 py-4 rounded-md max-sm:w-full"
          :class="[index < 3 ? 'bg-[#040404]' : '']"
          v-motion
          :initial="{
            opacity: 0,
          }"
          :enter="{
            opacity: 1,
            transition: {
              duration: 700,
              type: 'keyframes',
              ease: 'easein',
              delay: 400,
            },
          }"
        >
          <TopInfoItem :data="item" :position="index" />
        </tr>
      </table>
    </div>
  </section>
</template>
