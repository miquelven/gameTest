<script>
import GameListItem from "../Items/GameListItem.vue";
import gameListInfo from "@/data/gameListInfo.js";

export default {
  components: { GameListItem },
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
  <div
    class="flex flex-col justify-center items-center gap-16 max-[440px]:gap-8"
  >
    <h3
      class="text-4xl font-semibold text-center max-md:text-3xl max-[440px]:text-2xl"
    >
      Lista dos jogos disponíveis:
    </h3>
    <div
      class="py-24 px-14 shadow-sm shadow-[#2bb478] rounded-3xl min-w-96 max-md:py-14 max-md:px-6 max-sm:shadow-transparent"
    >
      <ul
        class="grid gap-16 grid-cols-4 items-center max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-11"
      >
        <GameListItem
          v-for="(item, index) in listInfo"
          :item="item"
          :key="index"
        />
      </ul>
    </div>
  </div>
</template>
