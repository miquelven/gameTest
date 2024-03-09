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
  <div class="flex flex-col justify-center items-center gap-16">
    <h3 class="text-4xl font-semibold max-md:text-3xl">
      Lista dos jogos disponíveis:
    </h3>
    <div
      class="py-24 px-14 shadow-sm shadow-[#2bb478] rounded-3xl min-w-96 max-md:py-14 max-md:px-6"
    >
      <ul
        class="grid gap-16 grid-cols-4 items-center max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-11"
      >
        <!-- <GameListItem
          v-for="({ img, name, alt, tip }, index) in listInfo"
          :key="index"
          :img="img"
          :name="name"
          :alt="alt"
          :tip="tip"
        /> -->

        <v-card class="mx-auto my-8" elevation="16" max-width="344">
          <v-card-item>
            <v-card-title> Card title </v-card-title>
            <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
          </v-card-item>

          <v-card-text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </v-card-text>
        </v-card>
      </ul>
    </div>
  </div>
</template>
