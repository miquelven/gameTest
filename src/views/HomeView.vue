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
    <div class="max-w-screen-2xl min-h-[calc(100vh-250px)] mx-auto px-10">
      <section
        class="flex my-40 max-xl:flex-col max-xl:gap-32 max-lg:gap-14"
        id="container"
        data-aos="fade-up"
        data-aos-duration="250"
      >
        <!-- left-size -->
        <div class="flex-1 flex flex-col gap-36 justify-center max-xl:gap-16">
          <!-- title -->
          <div className="flex flex-col gap-7 justify-center ">
            <h1
              class="text-6xl font-bold gap-16 flex flex-col max-xl:text-5xl max-md:text-5xl max-md:gap-12 max-[440px]:text-3xl"
            >
              Venha explorar os jogos
            </h1>
            <p
              class="text-xl font-light max-md:text-xl max-sm:text-lg max-[440px]:text-base"
            >
              você será capaz de encarar todos eles?
            </p>
          </div>
          <p
            class="text-xl leading-9 max-md:text-lg max-sm:text-base max-[440px]:text-sm"
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
        >
          <h2
            class="text-4xl font-semibold max-xl:text-3xl max-md:text-2xl max-[440px]:text-center"
          >
            Irá encarar esse desafio?
          </h2>

          <div
            class="shadow-md font-semibold shadow-zinc-900 flex rounded-full transition-all ease-in bg-gradient-to-tr to-[#2bb478] from-zinc-400 p-1 hover:scale-95 hover:shadow-zinc-700"
          >
            <router-link
              to="/gamesPage"
              class="flex-1 font-medium md:text-xl bg-black px-6 py-3 rounded-full"
            >
              Iniciar desafio
            </router-link>
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
