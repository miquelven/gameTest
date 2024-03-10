<script>
import GameList from "@/components/GameList/GameList.vue";
import Footer from "@/components/Footer/Footer.vue";
import Header from "@/components/Header/Header.vue";
import Button from "./icons/Button.vue";

export default {
  components: {
    GameList,
    Header,
    Footer,
    Button,
  },
};
</script>

<template>
  <Header />

  <main class="w-full mb-19">
    <!-- container -->
    <div class="max-w-screen-2xl min-h-[calc(100vh-350px)] mx-auto px-10">
      <section
        class="flex my-28 max-xl:flex-col max-xl:gap-32 max-lg:gap-14 max-sm:my-16"
        id="container"
        data-aos="fade-up"
        data-aos-duration="250"
      >
        <!-- left-size -->
        <div class="flex-1 flex flex-col gap-28 justify-center max-xl:gap-16">
          <!-- title -->
          <div className="flex flex-col gap-7 justify-center ">
            <h1
              class="text-5xl font-bold gap-16 flex flex-col max-xl:text-4xl max-md:text-3xl max-md:gap-12"
            >
              Venha explorar os jogos
            </h1>
          </div>
          <div class="flex flex-col gap-10">
            <p
              class="text-lg font-light max-md:text-xl max-sm:text-lg max-[440px]:text-base"
            >
              Você será capaz de encarar todos eles?
            </p>
            <p
              class="text-lg leading-9 max-md:text-lg max-sm:text-base max-[440px]:text-sm"
            >
              Aqui você encontrará
              <span class="text-[#2bb478]">vários desafios,</span> terá que
              superar todos eles no
              <span class="text-[#2bb478]"> menor tempo possível,</span> dê o
              seu máximo para conseguir a melhor pontuação.
            </p>
          </div>

          <span class="text-base max-md:text-lg max-[440px]:text-base"
            >Alcance a pontuação máxima e fique entre os melhores! 🏆🏆🏆</span
          >
        </div>
        <!-- right-size -->
        <div
          class="flex-1 flex flex-col justify-center items-end gap-14 relative max-xl:items-center"
        >
          <h2
            class="text-4xl font-semibold max-xl:text-3xl max-md:text-2xl max-[440px]:text-center max-[440px]:text-xl"
          >
            Irá encarar esse desafio?
          </h2>

          <router-link to="/gamesPage">
            <Button label="INICIAR DESAFIO" />
          </router-link>
        </div>
      </section>
      <!-- ListGames -->
      <section class="my-56 max-[440px]:mt-40 max-[440px]:mb-0">
        <GameList />
      </section>
    </div>
  </main>
  <Footer />
</template>
