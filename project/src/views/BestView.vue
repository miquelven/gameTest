<script>
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";
import BestInfoItem from "@/components/BestInfoItem.vue";

export default {
  components: {
    Header,
    Footer,
    BestInfoItem,
  },
  data() {
    return {
      scores: [],
    };
  },
  mounted() {
    this.fetchUserScores();
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

        // Atualize a variável 'scores' com os scores obtidos
        this.scores = response.data.userScores.sort((a, b) => b - a);
        console.log(this.scores);
      } catch (error) {
        console.error("Erro ao obter scores do usuário:", error);
        // Trate o erro conforme necessário
      }
    },
  },
};
</script>

<template>
  <Header />
  <main class="w-full mt-20" id="best">
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
  min-height: calc(100vh);
}
</style>
