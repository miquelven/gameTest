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
      const totalSeconds = this.minutes * 60 + this.seconds;
      const targetTime = 180;
      const timeBonus = Math.max(0, (targetTime - totalSeconds) * 50);

      this.score += timeBonus;

      if (this.score < 0) this.score = 0;

      if (!this.$store.state.user) {
        return;
      }

      try {
        const userEmail = this.$store.state.user.email;
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
        this.seconds,
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
    class="w-full min-h-screen relative overflow-hidden flex items-center justify-center pattern-grid"
  >
    <div
      class="relative z-10 h-screen w-full flex flex-col p-4 md:p-8 max-sm:hidden"
    >
      <header class="w-full flex justify-between items-end mb-6 shrink-0">
        <div class="flex flex-col gap-1">
          <router-link
            to="/"
            class="flex items-center gap-2 text-neutral-500 hover:text-emerald-400 transition-colors w-fit group"
          >
            <font-awesome-icon
              :icon="['fas', 'arrow-left']"
              class="text-xs group-hover:-translate-x-1 transition-transform"
            />
            <span class="text-[10px] font-bold tracking-widest uppercase">
              Voltar
            </span>
          </router-link>
          <h1
            class="text-xl md:text-2xl font-bold text-white tracking-widest uppercase flex items-center gap-2"
          >
            Modo <TextHighlight>Arcade</TextHighlight>
          </h1>
        </div>

        <div class="flex flex-col items-end gap-1">
          <span
            class="text-[10px] font-mono tracking-[0.25em] text-neutral-300 uppercase"
          >
            Tempo Decorrido
          </span>
          <div
            class="flex items-baseline gap-2 px-4 py-1 rounded border border-emerald-500/30 bg-black/40"
          >
            <span
              class="text-2xl md:text-3xl font-mono font-bold text-emerald-400"
            >
              {{ timerController }}
            </span>
          </div>
        </div>
      </header>

      <div
        class="flex-1 w-full flex justify-center items-center relative overflow-hidden"
      >
        <div
          class="relative rounded-lg flex justify-center overflow-hidden items-center border border-neutral-800 bg-black/80 w-full h-full max-w-6xl max-h-[85vh] ring-1 ring-white/5"
          :style="counter >= 8 ? 'border-color: transparent;' : ''"
          v-if="counter <= 10"
        >
          <template v-if="!showModal && counter < 8">
            <component
              data-aos="fade-up"
              :is="datas[counter][0].component"
              @addCounter="addCounter"
              @addScore="addScore"
            />
          </template>
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
            class="relative flex flex-col gap-5 p-8 w-[420px] max-w-[90vw] rounded-md border border-emerald-500/40 bg-neutral-900/95 shadow-2xl"
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
            <div class="mt-2 flex justify-center w-full">
              <template v-if="$store.state.user">
                <Button :click="startCounter" type="button" label="COMEÇAR" />
              </template>
              <template v-else>
                <div class="flex flex-col gap-3 w-full">
                  <p
                    class="text-red-400 text-xs text-center uppercase tracking-widest font-bold"
                  >
                    <font-awesome-icon :icon="['fas', 'lock']" class="mr-2" />
                    Identificação Necessária
                  </p>
                  <router-link to="/login" class="w-full">
                    <button
                      class="w-full py-3 rounded bg-emerald-900/20 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 font-bold tracking-wider uppercase transition-all duration-300 text-sm"
                    >
                      Fazer Login
                    </button>
                  </router-link>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>

      <template v-if="counter >= 8">
        <div
          class="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center items-center"
          v-motion
          :initial="{ opacity: 0 }"
          :enter="{ opacity: 1, transition: { duration: 500 } }"
        >
          <div
            class="relative flex flex-col gap-8 p-10 w-[500px] max-w-[90vw] rounded-xl border border-emerald-500/50 bg-neutral-900/95"
            v-motion
            :initial="{ y: 50, opacity: 0 }"
            :enter="{
              y: 0,
              opacity: 1,
              transition: { duration: 500, delay: 100 },
            }"
          >
            <div class="text-center space-y-2">
              <h3
                class="text-4xl font-bold text-white uppercase tracking-wider"
              >
                Missão Cumprida
              </h3>
              <div class="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div class="grid grid-cols-2 gap-8 py-4">
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 border border-white/10"
              >
                <p
                  class="text-xs font-mono tracking-widest text-neutral-400 uppercase"
                >
                  Tempo Total
                </p>
                <span class="text-3xl font-bold text-white font-mono">
                  {{ timerController }}
                </span>
              </div>
              <div
                class="flex flex-col items-center gap-2 p-4 rounded-lg bg-emerald-900/10 border border-emerald-500/20"
              >
                <p
                  class="text-xs font-mono tracking-widest text-emerald-400/80 uppercase"
                >
                  Pontuação
                </p>
                <span class="text-3xl font-bold text-emerald-400 font-mono">
                  {{ formatScore }}
                </span>
              </div>
            </div>

            <div v-if="$store.state.user" class="w-full flex flex-col gap-6">
              <p
                class="text-neutral-400 text-sm text-center leading-relaxed px-4"
              >
                Relatório enviado ao comando central. <br />
                Sua performance foi registrada no ranking global.
              </p>

              <router-link to="/" class="w-full">
                <button
                  type="button"
                  class="w-full py-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-widest uppercase transition-all duration-300 hover:-translate-y-1 hover:tracking-[0.25em] active:scale-95 border border-transparent hover:border-emerald-400"
                >
                  Retornar à Base
                </button>
              </router-link>
            </div>

            <div v-else class="w-full flex flex-col gap-4">
              <p
                class="text-neutral-400 text-sm text-center leading-relaxed px-4"
              >
                Identificação não detectada. <br />
                <span class="text-emerald-400/80"
                  >Faça login para registrar sua patente no ranking.</span
                >
              </p>

              <div class="grid grid-cols-2 gap-3 w-full">
                <router-link to="/login" class="w-full">
                  <button
                    type="button"
                    class="w-full py-3 rounded bg-emerald-900/20 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 font-bold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1 text-xs md:text-sm"
                  >
                    Login
                  </button>
                </router-link>
                <router-link to="/register" class="w-full">
                  <button
                    type="button"
                    class="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-wider uppercase transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-emerald-400 text-xs md:text-sm"
                  >
                    Criar Conta
                  </button>
                </router-link>
              </div>

              <router-link to="/" class="w-full mt-2">
                <button
                  class="w-full text-center text-[10px] text-neutral-500 hover:text-neutral-300 uppercase tracking-[0.2em] cursor-pointer transition-colors"
                >
                  Retornar sem salvar
                </button>
              </router-link>
            </div>
          </div>
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
            duration: 400,
            type: 'keyframes',
            ease: 'easein,',
          },
        }"
        class="flex flex-col justify-center items-center gap-9 p-5 h-96 w-80 absolute rounded-md border-2 border-gray-light font-light"
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
