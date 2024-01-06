<script>
import TicTacToe from "./icons/games/TicTacToe.vue";
import Memory from "./icons/games/Memory.vue";
import Pong from "./icons/games/Pong.vue";
import Breakout from "./icons/games/Breakout.vue";
import FlappyBird from "./icons/games/FlappyBird.vue";
import Simon from "./icons/games/Simon.vue";
import Snake from "./icons/games/Snake.vue";
import SpaceInvaders from "./icons/games/SpaceInvaders.vue";

export default {
  components: {
    TicTacToe,
  },
  data() {
    return {
      counter: 0,
      // traduzir os nomes
      gameList: [
        "TicTacToe",
        "Memory",
        "Pong",
        "Breakout",
        "FlappyBird",
        "Simon",
        "Snake",
        "SpaceInvaders",
      ],
    };
  },
};
</script>

<template>
  <div class="h-screen w-full flex flex-col gap-10 justify-center items-center">
    <div class="text-4xl">00:00</div>
    <div
      class="rounded-xl flex justify-center items-center border-8 border-double border-yellow-500 shadow-lg shadow-orange-200/30 size-2/3"
    >
      <template v-if="counter == 0"> <TicTacToe /> </template>

      <template> </template>

      <template> </template>

      <template> </template>

      <template> </template>

      <template> </template>

      <template> </template>

      <template> </template>
    </div>
  </div>
</template>
