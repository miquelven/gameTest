<script>
import TicTacToe from "@/components/Games/TicTacToe.vue";
import Memory from "@/components/Games/Memory.vue";
import Pong from "@/components/Games/Pong.vue";
import Breakout from "@/components/Games/Breakout.vue";
import FlappyBird from "@/components/Games/FlappyBird.vue";
import Simon from "@/components/Games/Simon.vue";
import Snake from "@/components/Games/Snake.vue";
import SpaceInvaders from "@/components/Games/SpaceInvaders.vue";

import Button from "@/views/icons/Button.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";

import axios from "axios";

import sound from "../assets/songs/backgroundSound.wav";

export default {
  components: {
    Button,
    TextHighlight,
  },
  data() {
    return {
      showModal: true,
      score: [],
      datas: [
        [{ counter: 0, component: TicTacToe }],
        [{ counter: 1, component: Memory }],
        [{ counter: 2, component: Pong }],
        [{ counter: 3, component: Breakout }],
        [{ counter: 4, component: FlappyBird }],
        [{ counter: 5, component: Simon }],
        [{ counter: 6, component: Snake }],
        [{ counter: 7, component: SpaceInvaders }],
      ],
      counter: 0,
      intervalCounter: null,
      minutes: 0,
      seconds: 0,
      timer: "00:00",
      score: 0,

      soundInterval: null,
      audio: null,
    };
  },
  mounted() {
    this.audio = new Audio(sound);
    this.playSound();
  },
  methods: {
    pauseSound() {
      this.audio.pause();
      window.clearInterval(this.soundInterval);
    },
    playSound() {
      this.audio.play();
      this.soundInterval = setInterval(() => this.audio.play(), [1100]);
    },
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
      this.score = this.score * 8 - 100 * this.seconds - 20000 * this.minutes;

      if (this.score < 0) this.score = 0;

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
      return `${this.score}`;
    },
  },
  unmounted() {
    this.pauseSound();
  },
};
</script>

<template>
  <main
    class="w-full min-h-screen bg-neutral-950 relative overflow-hidden flex items-center justify-center"
  >
    <div class="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
    </div>

    <div
      class="relative z-10 h-screen w-full flex flex-col gap-10 justify-center items-center max-sm:hidden"
    >
      <router-link
        to="/"
        class="transition-all duration-300 rounded-md absolute top-10 left-10 px-3 py-1 text-2xl hover:text-emerald-400"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </router-link>

      <div class="flex flex-col items-center gap-3 mt-10">
        <h1
          class="text-3xl md:text-4xl font-bold text-white tracking-widest uppercase"
        >
          Modo <TextHighlight>Arcade</TextHighlight>
        </h1>
        <p class="text-neutral-400 text-sm md:text-base text-center max-w-xl">
          Enfrente uma sequência de jogos clássicos em ritmo acelerado. Termine
          todos no menor tempo possível para conquistar a melhor pontuação.
        </p>
      </div>

      <div
        class="absolute top-24 md:top-24 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span class="text-xs font-mono tracking-[0.25em] text-neutral-500">
          TEMPO
        </span>
        <div
          class="px-6 py-2 rounded-full border border-emerald-500/60 bg-black/60 shadow-[0_0_30px_rgba(16,185,129,0.35)]"
        >
          <span class="text-3xl md:text-4xl font-bold text-emerald-400">
            {{ timerController }}
          </span>
        </div>
      </div>

      <template v-if="showModal">
        <div
          class="absolute inset-0 z-30 bg-black/80 flex justify-center items-center"
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
            class="relative flex flex-col gap-5 p-8 w-[420px] max-w-[90vw] rounded-2xl border border-emerald-500/40 bg-neutral-900/95 shadow-2xl"
          >
            <h2 class="text-2xl font-semibold text-white text-center">
              Briefing da missão
            </h2>
            <p class="text-neutral-300 text-sm leading-relaxed text-center">
              Você vai encarar uma sequência de jogos. O cronômetro já está
              preparado para registrar cada segundo.
            </p>
            <p class="text-neutral-300 text-sm leading-relaxed text-center">
              Finalize todos os desafios no menor tempo possível para maximizar
              sua pontuação final.
            </p>
            <p class="text-neutral-400 text-xs text-center">
              O contador será iniciado assim que você continuar.
            </p>
            <div class="mt-2 flex justify-center">
              <Button :click="startCounter" type="button" label="COMEÇAR" />
            </div>
          </div>
        </div>
      </template>

      <div
        class="relative rounded-3xl flex justify-center overflow-hidden items-center border border-neutral-700/80 bg-gradient-to-br from-black via-neutral-950 to-emerald-950/40 shadow-[0_0_60px_rgba(0,0,0,0.75)] size-2/3 max-h-[67%]"
        :style="
          counter >= 8 ? 'border-color: transparent;' : 'border-color: #777'
        "
        v-if="counter <= 10"
      >
        <template v-if="!showModal && counter < 8">
          <component
            data-aos="zoom-in"
            :is="datas[counter][0].component"
            @addCounter="addCounter"
            @addScore="addScore"
          />
        </template>
      </div>

      <template v-if="counter >= 8">
        <div
          class="border border-emerald-500/60 bg-neutral-900/95 flex flex-col gap-6 pt-10 px-10 md:px-16 h-96 absolute rounded-2xl font-medium shadow-2xl"
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
          <h3 class="text-3xl md:text-4xl text-center mb-2 text-white">
            Missão concluída
          </h3>
          <div class="flex justify-between gap-6">
            <div class="flex flex-col gap-1">
              <p class="text-sm text-neutral-400">Seu tempo total</p>
              <span class="text-white text-2xl md:text-3xl">{{
                timerController
              }}</span>
            </div>
            <div class="flex flex-col gap-1 text-right">
              <p class="text-sm text-neutral-400">Sua pontuação final</p>
              <span class="text-emerald-400 text-2xl md:text-3xl">{{
                formatScore
              }}</span>
            </div>
          </div>
          <p class="text-neutral-400 text-sm text-center">
            Sua pontuação foi enviada para o sistema. Continue treinando para
            subir ainda mais no ranking global.
          </p>
          <router-link to="/" @click="startCounter" class="self-end mt-4">
            <Button label="Voltar para o início" type="button" />
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
        class="flex flex-col justify-center items-center gap-9 p-5 h-96 w-80 absolute rounded-lg border-2 border-gray-light font-light"
      >
        <h2 class="text-xl font-medium mb-10 text-center">
          Jogos disponíveis apenas para computador.
        </h2>
        <router-link to="/" class="self-center">
          <Button label="Voltar" type="button" />
        </router-link>
      </div>
    </div>
  </main>
</template>
