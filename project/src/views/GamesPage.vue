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
  <div class="h-screen w-full bg-red-500 flex justify-center items-center">
    <div class="border-4 border-white size-2/3">
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
