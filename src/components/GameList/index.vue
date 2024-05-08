<script>
import { Carousel, Navigation, Pagination, Slide } from "vue3-carousel";
import GameListItem from "../Items/GameListItem.vue";
import gameListInfo from "@/data/gameListInfo.js";

import "vue3-carousel/dist/carousel.css";

export default {
  components: { GameListItem, Carousel, Slide, Pagination, Navigation },
  data() {
    return {
      listInfo: "",
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    };
  },
  mounted() {
    this.listInfo = gameListInfo;
  },
};
</script>

<template>
  <section class="my-56 max-[440px]:mt-80 max-[440px]:mb-0">
    <div
      class="flex flex-col justify-center items-center gap-8 max-[440px]:gap-8"
    >
      <h3
        data-aos="fade-up"
        data-aos-delay="400"
        class="text-4xl font-bold text-center max-md:text-3xl max-[440px]:text-3xl"
      >
        Lista dos jogos disponíveis:
      </h3>
      <h4
        data-aos="fade-up"
        data-aos-delay="400"
        class="max-w-7xl mx-auto text-[#bababa] text-center text-xl max-md:text-lg max-sm:text-base max-[440px]:text-base"
      >
        Este é o espaço onde você pode explorar todos os jogos disponíveis para
        jogar, acompanhados de algumas dicas úteis sobre cada um deles.
      </h4>
      <div
        class="py-24 px-14 rounded-md min-w-96 max-md:py-14 max-md:px-6 max-sm:shadow-transparent"
      >
        <ul
          class="grid gap-4 grid-cols-4 items-center max-xl:justify-center max-xl:grid-cols-[repeat(3,_300px)] max-lg:grid-cols-[repeat(2,_300px)] max-md:hidden"
        >
          <GameListItem
            v-for="(item, index) in listInfo"
            :item="item"
            :key="index"
            :itemIndex="index"
          />
        </ul>

        <div class="hidden max-md:block">
          <Carousel>
            <Slide v-for="(item, index) in listInfo" :key="index">
              <GameListItem :item="item" :itemIndex="index" />
            </Slide>
            <template #addons>
              <Pagination />
            </template>
          </Carousel>
        </div>
      </div>
    </div>
  </section>
</template>
