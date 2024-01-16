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
      data: [
        { name: "Jair", score: 1100 },
        { name: "Maria", score: 1500 },
        { name: "Maria", score: 1500 },
        { name: "Maria", score: 1500 },
        { name: "Maria", score: 1500 },
        { name: "Maria", score: 1500 },
        { name: "Maria", score: 1500 },
        { name: "Maria", score: 1500 },
        { name: "Maria", score: 1500 },
      ],
    };
  },
  mounted() {
    // faz a request
  },
};
</script>

<template>
  <Header />
  <main class="w-full my-19" id="score">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto flex justify-center">
      <table
        class="grid grid-cols-1 bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-200 via-red-500 to-fuchsia-500 gap-7 p-20 shadow-[5px_7px_10px_#666] rounded-xl"
      >
        <tr>
          <th>
            <h1
              class="text-4xl bg-clip-text bg-gradient-to-r from-yellow-900 from-10% via-yellow-600 via-30% to-black to-90% text-transparent mb-10"
            >
              Top Pontuações:
            </h1>
          </th>
        </tr>
        <tr
          v-for="(item, index) in data"
          :key="index"
          class="flex justify-between items-center text-xl"
        >
          <TopInfoItem :data="item" />
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
