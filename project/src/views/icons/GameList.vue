<script>
import GameListItem from "@/components/GameListItem.vue";
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
    v-motion
    :initial="{ opacity: 0, y: 100, x: 100 }"
    :visible="{
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: 900,
        type: 'keyframes',
        ease: 'easein,',
      },
    }"
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
