<script>
import TicTacToe from "@/components/Games/TicTacToe.vue";
import Memory from "@/components/Games/Memory.vue";
import Pong from "@/components/Games/Pong.vue";
import Breakout from "@/components/Games/Breakout.vue";
import FlappyBird from "@/components/Games/FlappyBird.vue";
import Simon from "@/components/Games/Simon.vue";
import Snake from "@/components/Games/Snake.vue";
import SpaceInvaders from "@/components/Games/SpaceInvaders.vue";
import axios from "axios";
import Button from "@/views/icons/Button.vue";

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
    Button,
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
        await axios.post("/update-score", {
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
    formatScore() {
      if (this.score >= 1000) {
        const newScore = (this.score -= 1000);
        return `${newScore}`;
      }
      return `${this.score}`;
    },
  },
};
</script>

<template>
  <div
    class="h-[calc(100vh-80px)] w-full flex flex-col gap-10 justify-center items-center max-sm:hidden"
  >
    <router-link
      to="/"
      class="transition-all duration-300 rounded-md absolute top-20 left-20 px-3 py-1 text-2xl hover:text-3xl"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </router-link>

    <!-- area do modal -->
    <template v-if="showModal">
      <div
        class="absolute inset-0 z-30 bg-black/90 flex justify-center items-center"
        v-motion
        :initial="{
          opacity: 0,
        }"
        :enter="{
          opacity: 1,
          transition: {
            duration: 700,
            type: 'keyframes',
            ease: 'easein,',
          },
        }"
      >
        <div
          class="flex flex-col gap-9 p-5 h-96 w-96 absolute rounded-lg border-2 border-[#777] font-light"
        >
          <h2>Há um contador em todos os jogos</h2>
          <p>Termine todos no menor tempo possível</p>
          <p>Poderá ver sua pontuação assim que terminar os jogos.</p>
          <p>O contador iniciará assim que fechar essa janela</p>
          <Button :click="startCounter" type="button" label="Continuar" />
        </div>
      </div>
    </template>

    <!-- temporizador -->
    <input
      class="text-4xl bg-transparent text-center font-bold absolute top-20 max-sm:text-2xl"
      type="text"
      placeholder="00:00"
      v-model="timerController"
      disabled
    />
    <!-- area dos jogos -->
    <div
      class="absolute rounded-lg flex justify-center overflow-hidden items-center border-4 border-double border-[#777] shadow-sm shadow-[#2bb478] size-2/3 max-h-[67%]"
      v-if="counter <= 10"
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
    </div>
    <!-- RESULTADO -->
    <template v-if="counter >= 8">
      <div
        class="border-2 border-[#2bb478] flex flex-col gap-8 pt-10 px-24 h-96 absolute rounded-xl font-medium max-sm:px-16"
      >
        <h2 class="text-4xl text-center mb-4 max-sm:text-3xl">Fim dos jogos</h2>
        <div class="flex justify-around">
          <p class="text-lg max-sm:text-base">Seu tempo:</p>
          <span class="text-white text-2xl max-sm:text-xl">{{
            timerController
          }}</span>
        </div>
        <div class="flex justify-around">
          <p class="text-lg max-sm:text-base">Sua pontuação:</p>
          <span class="text-white text-2xl max-sm:text-xl">{{
            formatScore
          }}</span>
        </div>
        <router-link to="/" @click="startCounter" class="self-end mt-10">
          <Button label="Voltar" type="button" />
        </router-link>
      </div>
    </template>
  </div>

  <div
    class="absolute inset-0 z-30 bg-black/90 flex justify-center items-center sm:hidden"
    v-motion
    :initial="{
      opacity: 0,
    }"
    :enter="{
      opacity: 1,
      transition: {
        duration: 700,
        type: 'keyframes',
        ease: 'easein,',
      },
    }"
  >
    <div
      class="flex flex-col justify-center items-center gap-9 p-5 h-96 w-80 absolute rounded-lg border-2 border-[#777] font-light"
    >
      <h2 class="text-xl font-medium mb-10 text-center">
        Jogos disponíveis apenas no desktop
      </h2>
      <router-link to="/" class="self-center">
        <Button label="Voltar" type="button" />
      </router-link>
    </div>
  </div>
</template>
