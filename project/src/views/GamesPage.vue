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
    Memory,
    Pong,
    Breakout,
    FlappyBird,
    Simon,
    Snake,
    SpaceInvaders,
  },
  data() {
    return {
      showModal: true,
      score: [],
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
    addScore(score) {
      this.score += score;
    },
    addCounter() {
      this.counter++;
      if (this.counter >= 8) {
        this.setScore();
      }
    },
    async setScore() {
      this.stopCounter();
      this.score = this.score * 10 - 100 * this.seconds - 1000 * this.minutes;

      try {
        const userEmail = this.$store.state.user
          ? this.$store.state.user.email
          : null;
        await this.$axios.post("http://localhost:3000/update-score", {
          email: userEmail,
          newScore: this.score,
        });
      } catch (error) {
        console.error("Erro ao atualizar a pontuação:", error);
      }
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
  <div
    class="h-[calc(83.5vh)] w-full flex flex-col gap-10 justify-center items-center"
  >
    <router-link
      to="/"
      class="transition-all absolute top-20 left-20 px-3 py-1 shadow-md shadow-white/10 text-2xl hover:text-3xl hover:shadow-lg hover:shadow-white/30"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </router-link>

    <!-- area do modal -->
    <template v-if="showModal">
      <div
        class="absolute inset-0 z-30 bg-black/90 flex justify-center items-center"
      >
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
      </div>
    </template>

    <!-- temporizador -->
    <input
      class="text-4xl bg-transparent text-center font-bold absolute top-20"
      type="text"
      placeholder="00:00"
      v-model="timerController"
      disabled
    />
    <!-- area dos jogos -->
    <div
      class="absolute rounded-xl flex justify-center items-center border-8 border-double border-yellow-500 shadow-lg shadow-orange-200/30 size-2/3 max-h-[67%]"
    >
      <template v-if="counter == 0 && !showModal">
        <TicTacToe @addCounter="addCounter" @addScore="addScore" />
      </template>

      <template v-else-if="counter == 1">
        <Memory @addCounter="addCounter" />
      </template>

      <template v-else-if="counter == 2">
        <Pong @addCounter="addCounter" @addScore="addScore" />
      </template>

      <template v-else-if="counter == 3">
        <Breakout @addCounter="addCounter" @addScore="addScore" />
      </template>

      <template v-else-if="counter == 4">
        <FlappyBird @addCounter="addCounter" @addScore="addScore" />
      </template>

      <template v-else-if="counter == 5">
        <Simon @addCounter="addCounter" @addScore="addScore" />
      </template>

      <template v-else-if="counter == 6">
        <Snake @addCounter="addCounter" @addScore="addScore" />
      </template>

      <template v-else-if="counter == 7">
        <SpaceInvaders @addCounter="addCounter" @addScore="addScore" />
      </template>

      <template v-if="counter >= 8">
        <div
          class="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-red-600 to-fuchsia-500 shadow-[5px_7px_10px_#666] flex flex-col gap-8 pt-14 px-5 h-96 w-96 absolute rounded-xl font-bold"
        >
          <h2 class="text-4xl text-center mb-4">Fim dos jogos</h2>
          <div class="flex justify-around">
            <p class="text-lg text-black/70">Seu tempo:</p>
            <span class="text-white font-bold text-2xl">{{
              timerController
            }}</span>
          </div>
          <div class="flex justify-around">
            <p class="text-lg text-black/70">Sua pontuação:</p>
            <span class="text-white font-bold text-2xl">{{ score }}</span>
          </div>
          <router-link
            to="/"
            @click="startCounter"
            class="bg-black/50 rounded-md text-white py-2 hover:bg-black/70 mt-10 text-center"
          >
            Voltar
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>
