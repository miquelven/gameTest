<script>
import GameList from "@/components/GameList/index.vue";
import Button from "./icons/Button.vue";
import Container from "./icons/Container.vue";

export default {
  components: {
    GameList,
    Button,
    Container,
  },
};
</script>

<template>
  <main class="w-full">
    <Container>
      <section
        class="flex my-28 max-xl:flex-col max-xl:gap-32 max-lg:gap-14 max-sm:my-16"
        id="container"
      >
        <!-- left-size -->
        <div class="flex-1 flex flex-col gap-28 justify-center max-xl:gap-16">
          <!-- title -->
          <div className="flex flex-col gap-7 justify-center ">
            <h1
              data-aos="fade-right"
              data-aos-delay="200"
              class="text-5xl font-bold gap-16 flex flex-col max-xl:text-4xl max-md:text-3xl max-md:gap-12"
            >
              Venha explorar os jogos
            </h1>
          </div>
          <div class="flex flex-col gap-10">
            <p
              data-aos="fade-right"
              data-aos-delay="200"
              class="text-lg font-light max-md:text-xl max-sm:text-lg max-[440px]:text-base"
            >
              Você será capaz de encarar todos eles?
            </p>
            <p
              data-aos="fade-right"
              data-aos-delay="600"
              class="text-lg leading-9 max-md:text-lg max-sm:text-base max-[440px]:text-sm"
            >
              Aqui você encontrará
              <span class="text-[#2bb478]">vários desafios,</span> terá que
              superar todos eles no
              <span class="text-[#2bb478]"> menor tempo possível,</span> dê o
              seu máximo para conseguir a melhor pontuação.
            </p>
          </div>

          <span
            data-aos="fade-right"
            data-aos-delay="600"
            class="text-base max-md:text-lg max-[440px]:text-base"
            >Alcance a pontuação máxima e fique entre os melhores! 🏆🏆🏆</span
          >
        </div>
        <!-- right-size -->
        <div
          data-aos="fade-left"
          data-aos-delay="800"
          class="flex-1 flex flex-col justify-center items-end gap-14 relative max-xl:items-center"
        >
          <h2
            class="text-4xl font-semibold max-xl:text-3xl max-md:text-2xl max-[440px]:text-center max-[440px]:text-xl"
          >
            Irá encarar esse desafio?
          </h2>

          <router-link
            to="/gamesPage"
            data-aos="flip-left"
            data-aos-easing="ease-out-cubic"
            data-aos-duration="500"
            data-aos-delay="1100"
          >
            <Button type="button" label="INICIAR DESAFIO" />
          </router-link>
        </div>
      </section>
      <!-- GameList -->
      <GameList />
    </Container>
  </main>
</template>
