<script>
import Header from "@/components/Header/Header.vue";
import Footer from "@/components/Footer/Footer.vue";
import TopInfoItem from "@/components/Items/TopInfoItem.vue";
import axios from "axios";

export default {
  components: {
    Header,
    Footer,
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
  <Header />
  <main class="w-full mt-20 min-h-[calc(100vh-250px)]">
    <!-- container -->
    <div class="min-w-screen-2xl m-auto flex justify-center">
      <table
        class="grid grid-cols-1 gap-10 p-20 bg-[rgba(0,0,0,.9)] shadow-sm shadow-zinc-700 rounded-xl max-sm:p-10"
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
              class="text-4xl font-medium bg-clip-text bg-gradient-to-r from-[#40d292] from-10% via-[#69dcaa] via-30% to-[#2bb478] to-90% text-transparent mb-7 max-[550px]:text-3xl"
            >
              Top Pontuações:
            </h3>
          </th>
        </tr>
        <tr
          v-for="(item, index) in topScores"
          :key="index"
          class="flex font-bold justify-between items-center text-xl gap-20 px-7 py-2 rounded-md border-2 max-[550px]:text-lg max-[550px]:gap-12 max-[375px]:text-sm"
          :style="{
            borderColor: index < 3 ? '#40d292' : '#f1f1ef',
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
              ease: 'easein',
              delay: 400,
            },
          }"
        >
          <TopInfoItem :data="item" :position="index" />
        </tr>
      </table>
    </div>
  </main>
  <Footer />
</template>
