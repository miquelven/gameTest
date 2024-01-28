<script>
import GameList from "@/components/GameList/GameList.vue";
import Footer from "@/components/Footer/Footer.vue";
import Header from "@/components/Header/Header.vue";

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
    <div class="max-w-screen-2xl min-h-[calc(100vh-250px)] m-auto px-10">
      <section
        class="flex mb-20 max-xl:flex-col max-xl:gap-32 max-lg:gap-14"
        id="container"
      >
        <!-- left-size -->
        <div
          class="flex-1 flex flex-col gap-36 justify-center max-xl:gap-16"
          data-aos="fade-up"
          data-aos-duration="250"
        >
          <!-- title -->
          <div>
            <h1
              class="text-center text-7xl gap-16 flex flex-col max-xl:text-6xl max-md:text-5xl max-md:gap-12 max-[440px]:text-4xl"
            >
              Venha explorar os jogos
              <span
                class="text-2xl max-md:text-xl max-sm:text-lg max-[440px]:text-base"
                >você será capaz de encarar todos eles?</span
              >
            </h1>
          </div>
          <p
            class="text-xl max-md:text-lg max-sm:text-base max-[440px]:text-sm"
          >
            Aqui você encontrará vários desafios, terá que superar todos eles no
            menor tempo possível, dê o seu máximo para conseguir a melhor
            pontuação.
          </p>

          <span class="text-xl max-md:text-lg max-[440px]:text-base"
            >Alcance a pontuação máxima e fique entre os melhores! 🏆🏆🏆</span
          >
        </div>
        <!-- right-size -->
        <div
          class="flex-1 flex flex-col justify-center items-end gap-14 relative max-xl:items-center"
          data-aos="fade-up"
          data-aos-duration="250"
        >
          <h2
            class="text-5xl max-xl:text-4xl max-md:text-3xl max-[440px]:text-center"
          >
            Irá encarar esse desafio?
          </h2>

          <div
            data-aos="fade-bottom"
            data-aos-delay="500"
            data-aos-duration="150"
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
            data-aos="fade-up"
            data-aos-delay="500"
            data-aos-duration="150"
            class="absolute rotate-12 bottom-24 flex flex-col items-center gap-7 max-xl:right-0 max-xl:bottom-0 max-sm:-right-8"
          >
            <div
              class="bg-yellow-400 w-4 h-1 shadow-md shadow-yellow-100/40 rounded-full max-sm:w-2"
            ></div>
            <div
              class="bg-yellow-400 w-12 h-1 shadow-md shadow-yellow-100/40 rounded-full max-sm:w-6"
            ></div>
            <div
              class="bg-yellow-400 w-20 h-1 shadow-md shadow-yellow-100/40 rounded-full max-sm:w-10"
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
