<script>
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";
import TopInfoItem from "@/components/TopInfoItem.vue";

export default {
  components: {
    Header,
    Footer,
    TopInfoItem,
  },
  data() {
    return {
      topScores: [
        { name: "miquelven", score: 1000 },
        { name: "miquelven", score: 1000 },
        { name: "miquelven", score: 1000 },
        { name: "miquelven", score: 1000 },
        { name: "miquelven", score: 1000 },
        { name: "miquelven", score: 1000 },
        { name: "miquelven", score: 1000 },
      ],
    };
  },
  mounted() {
    this.fetchTopScores();
  },
  methods: {
    async fetchTopScores() {
      const response = await this.$axios.get("/api/top-scores");

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
  <main class="w-full mt-20" id="score">
    <!-- container -->
    <div class="min-w-screen-2xl m-auto flex justify-center">
      <table
        class="grid grid-cols-1 gap-10 p-20 bg-[rgba(255,255,255,.1)] shadow-lg shadow-black rounded-xl"
        v-motion
        :initial="{
          x: 200,
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
        <tr class="flex justify-center">
          <th>
            <h1
              class="text-4xl bg-clip-text bg-gradient-to-r from-yellow-100 from-10% via-yellow-300 via-30% to-white to-90% text-transparent mb-7"
            >
              Top Pontuações:
            </h1>
          </th>
        </tr>
        <tr
          v-for="(item, index) in topScores"
          :key="index"
          class="flex font-bold justify-between items-center text-xl gap-20 px-7 py-2 rounded-md border-2"
          :style="{
            borderColor: index < 3 ? 'rgba(255,255,0,.7)' : 'rgba(0,0,255,.7 )',
            boxShadow:
              index < 3
                ? '4px 5px 10px rgba(255,255,0,.3)'
                : '4px 5px 10px rgba(0,0,255,.2)',
          }"
          v-motion
          :initial="{
            x: -200,
            opacity: 0,
          }"
          :enter="{
            x: 0,
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

<style scoped>
#score {
  min-height: calc(100vh - 250px);
}
</style>
