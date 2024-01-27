<script>
import GameListItem from "../Items/GameListItem.vue";
import gameListInfo from "@/data/gameListInfo.js";

export default {
  components: { GameListItem },
  data() {
    return {
      listInfo: "",
    };
  },
  mounted() {
    this.listInfo = gameListInfo;
  },
};
</script>

<template>
  <div
    class="flex flex-col justify-center items-center gap-16"
    data-aos="zoom-out-down"
    data-aos-duration="400"
    data-aos-delay="150"
  >
    <h3 class="text-4xl font-bold max-md:text-3xl">
      Lista dos jogos disponíveis:
    </h3>
    <div
      class="py-24 px-14 shadow-md shadow-white/30 rounded-3xl min-w-96 max-md:py-14 max-md:px-6"
    >
      <ul
        class="grid gap-16 grid-cols-4 items-center max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-11"
      >
        <GameListItem
          v-for="({ img, name, alt, tip }, index) in listInfo"
          :key="index"
          :img="img"
          :name="name"
          :alt="alt"
          :tip="tip"
        />
      </ul>
    </div>
  </div>
</template>
