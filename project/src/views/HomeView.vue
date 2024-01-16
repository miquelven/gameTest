<script>
import GameList from "./icons/GameList.vue";
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";

export default {
  components: {
    GameList,
    Header,
    Footer,
  },
};
</script>

<template>
  <Header />

  <main class="w-full mt-20 mb-19">
    <!-- container -->
    <div class="max-w-screen-2xl m-auto">
      <section class="flex mb-20" id="container">
        <!-- left-size -->
        <div class="flex-1 flex flex-col gap-36 justify-center">
          <!-- title -->
          <div>
            <h1 class="text-center text-7xl gap-16 flex flex-col">
              Venha explorar os jogos
              <span class="text-2xl"
                >você será capaz de encarar todos eles?</span
              >
            </h1>
          </div>
          <p class="text-xl">
            Aqui você encontrará vários desafios, terá que superar todos eles no
            menor tempo possível, dê o seu máximo para conseguir a melhor
            pontuação.
          </p>

          <span class="text-xl"
            >Alcance a pontuação máxima e fique entre os melhores! 🏆🏆🏆</span
          >
        </div>
        <!-- right-size -->
        <div
          class="flex-1 flex flex-col justify-center items-end gap-14 relative"
        >
          <h2 class="text-5xl">Irá encarar esse desafio?</h2>

          <div
            class="shadow-lg shadow-yellow-900 flex rounded-full transition-all ease-in bg-gradient-to-tr from-yellow-500 to-white/50 p-1 hover:scale-95 hover:shadow-none"
          >
            <router-link
              to="/gamesPage"
              class="flex-1 font-bold md:text-xl bg-black px-6 py-3 rounded-full"
            >
              Iniciar desafio
            </router-link>
          </div>
          <div
            class="absolute bottom-24 rotate-[-45deg] flex flex-col items-center gap-7"
          >
            <div
              class="bg-yellow-400 w-4 h-1 shadow-md shadow-yellow-100/40 rounded-full"
            ></div>
            <div
              class="bg-yellow-400 w-12 h-1 shadow-md shadow-yellow-100/40 rounded-full"
            ></div>
            <div
              class="bg-yellow-400 w-20 h-1 shadow-md shadow-yellow-100/40 rounded-full"
            ></div>
          </div>
        </div>
      </section>
      <!-- ListGames -->
      <section class="my-56">
        <GameList />
      </section>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
#container {
  min-height: calc(100vh - 250px);
}
</style>
