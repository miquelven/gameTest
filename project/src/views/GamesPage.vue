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
      showModal: true,
      data: [],
      counter: 0,
      intervalCounter: null,
      minutes: 0,
      seconds: 0,
      timer: "00:00",
      score: 0,
    };
  },
  methods: {
    formattedTime(time) {
      if (time < 10) return `0${time}`;
      return `${time}`;
    },
    addCounter() {
      this.counter++;
    },
    startCounter() {
      this.showModal = false;
      this.intervalCounter = setInterval(() => {
        this.seconds++;
        if (this.seconds == 60) {
          this.seconds = 0;
          this.minutes++;
        }
      }, 1000);
    },
    stopCounter() {
      clearInterval(this.intervalCounter);
    },
    addData(name, value) {
      this.data.push({ name, value });
    },
  },
  computed: {
    timerController() {
      return `${this.formattedTime(this.minutes)}:${this.formattedTime(
        this.seconds
      )}`;
    },
  },
};
</script>

<template>
  <div class="h-screen w-full flex flex-col gap-10 justify-center items-center">
    <!-- area do modal -->
    <template v-if="showModal">
      <div class="absolute inset-0 bg-black/90"></div>
      <div
        class="bg-white text-black flex flex-col gap-8 p-5 h-96 w-96 absolute rounded-xl border-8 border-gray-800 font-bold"
      >
        <h2>Há um contador em todos os jogos</h2>
        <p>Termine todos no menor tempo possível</p>
        <p>Poderá ver sua pontuação assim que terminar os jogos.</p>
        <p>O contador iniciará assim que fechar essa janela</p>
        <button
          @click="startCounter"
          class="bg-black/50 rounded-md text-white py-2 hover:bg-black/70"
        >
          Continuar
        </button>
      </div>
    </template>

    <!-- temporizador -->
    <input
      class="text-4xl bg-transparent text-center font-bold"
      type="text"
      placeholder="00:00"
      v-model="timerController"
      disabled
    />
    <!-- area dos jogos -->
    <div
      class="rounded-xl flex justify-center items-center border-8 border-double border-yellow-500 shadow-lg shadow-orange-200/30 size-2/3"
    >
      <template v-if="counter == 0 && !showModal">
        <TicTacToe @addCounter="() => counter++" @tictactoe="addData" />
      </template>

      <template v-else-if="counter == 1"> <h1>Outro template</h1> </template>

      <template> </template>

      <template> </template>

      <template> </template>

      <template> </template>

      <template> </template>

      <template> </template>
    </div>
  </div>
</template>
