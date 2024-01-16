<script>
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";
import BestInfoItem from "@/components/BestInfoITem.vue";

export default {
  components: {
    Header,
    Footer,
    BestInfoItem,
  },
  data() {
    return {
      scores: ["00", "00", "00", "00", "00", "00", "00", "00", "00", "00"],
    };
  },
  mounted() {
    // faz a request do historico e armazena na variavel para fazer o 'for'
  },
};
</script>

<template>
  <Header />
  <main class="w-full my-19" id="best">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto">
      <table class="grid grid-cols-1 gap-7">
        <tr>
          <th>
            <h1
              class="text-4xl bg-clip-text bg-gradient-to-r from-yellow-400 from-10% via-yellow-100 via-30% to-yellow-400 to-90% text-transparent mb-10"
            >
              Suas melhores pontuações:
            </h1>
          </th>
        </tr>
        <tr
          v-for="(score, index) in scores"
          :key="index"
          class="even:text-white"
        >
          <BestInfoItem :score="score" />
        </tr>
      </table>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
#best {
  min-height: calc(100vh - 250px);
}
</style>
