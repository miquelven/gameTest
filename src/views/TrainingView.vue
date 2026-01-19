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
import gameListInfo from "@/data/gameListInfo.js";

export default {
  components: {
    Button,
    TextHighlight,
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
      gameId: null,
      gameInfo: null,
      gameComponent: null,
      gameState: "briefing", // briefing, playing, finished
      gameKey: 0, // Para forçar recriação do componente

      // Mapeamento de índice para componente (mesma ordem de gameListInfo)
      componentMap: [
        TicTacToe,
        Memory,
        Pong,
        Breakout,
        FlappyBird,
        Simon,
        Snake,
        SpaceInvaders,
      ],
    };
  },
  created() {
    this.gameId = parseInt(this.$route.params.id);
    if (
      isNaN(this.gameId) ||
      this.gameId < 0 ||
      this.gameId >= gameListInfo.length
    ) {
      this.$router.push("/");
      return;
    }
    this.gameInfo = gameListInfo[this.gameId];
    this.gameComponent = this.componentMap[this.gameId];
  },
  methods: {
    startGame() {
      this.gameState = "playing";
    },
    finishGame() {
      this.gameState = "finished";
    },
    retryGame() {
      this.gameKey++; // Força remontagem do componente
      this.gameState = "playing";
    },
    exitTraining() {
      this.$router.push("/");
    },
    // Handler para pontuação (apenas log ou ignorar, já que não salva)
    handleScore(score) {
      console.log("Pontuação no treino:", score);
    },
  },
};
</script>

<template>
  <main
    class="w-full min-h-screen relative overflow-hidden flex items-center justify-center pattern-grid"
  >
    <!-- Header Global de Navegação -->
    <header
      class="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-start pointer-events-none"
    >
      <router-link
        to="/"
        class="pointer-events-auto flex items-center gap-4 px-6 py-4 bg-neutral-900/80 backdrop-blur-md border border-neutral-700/50 rounded-lg hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400 text-neutral-300 transition-all group shadow-xl"
      >
        <div
          class="flex items-center justify-center w-8 h-8 rounded bg-neutral-800 group-hover:bg-red-500/20 transition-colors"
        >
          <font-awesome-icon
            :icon="['fas', 'arrow-left']"
            class="text-sm group-hover:-translate-x-1 transition-transform"
          />
        </div>
        <div class="flex flex-col">
          <span
            class="text-[10px] text-neutral-500 font-mono uppercase tracking-widest group-hover:text-red-400/70"
            >Sistema</span
          >
          <span class="text-xs font-bold tracking-wider uppercase"
            >Encerrar Treino</span
          >
        </div>
      </router-link>

      <!-- Status (Apenas visível durante o jogo) -->
      <div
        v-if="gameState === 'playing'"
        class="pointer-events-auto hidden md:flex items-center gap-3 px-5 py-3 bg-neutral-900/50 border border-emerald-500/20 rounded-lg backdrop-blur-sm"
      >
        <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <span
          class="text-emerald-500/80 text-[10px] font-mono tracking-widest uppercase"
        >
          Simulação Ativa
        </span>
      </div>
    </header>

    <!-- FASE 1: BRIEFING -->
    <div
      v-if="gameState === 'briefing'"
      class="relative z-10 max-w-2xl w-full p-6"
      v-motion-fade
    >
      <div
        class="bg-neutral-900/95 border border-emerald-500/30 rounded-xl p-8 shadow-2xl relative overflow-hidden"
      >
        <!-- Efeito decorativo -->
        <div
          class="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
        ></div>

        <div class="flex flex-col items-center text-center gap-6">
          <div class="space-y-2">
            <p
              class="text-emerald-500 font-mono text-xs tracking-[0.3em] uppercase"
            >
              // MODO TREINAMENTO
            </p>
            <h1
              class="text-3xl md:text-4xl font-bold text-white uppercase tracking-wider"
            >
              {{ gameInfo.name }}
            </h1>
          </div>

          <div
            class="relative w-full max-w-md aspect-video rounded-lg overflow-hidden border border-neutral-700 group"
          >
            <img
              :src="gameInfo.img"
              :alt="gameInfo.alt"
              class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
            ></div>
          </div>

          <p class="text-neutral-300 text-sm leading-relaxed max-w-lg">
            {{ gameInfo.tip }}
          </p>

          <div
            class="bg-emerald-900/20 border border-emerald-500/20 p-3 rounded w-full"
          >
            <p class="text-xs text-emerald-400/80 font-mono">
              <font-awesome-icon :icon="['fas', 'circle-info']" class="mr-2" />
              Pontuações obtidas neste modo
              <strong class="text-emerald-400">NÃO</strong> serão salvas no
              ranking.
            </p>
          </div>

          <Button
            :click="startGame"
            label="INICIAR SIMULAÇÃO"
            class="w-full max-w-xs mt-2"
          />
        </div>
      </div>
    </div>

    <!-- FASE 2: JOGO -->
    <div
      v-if="gameState === 'playing'"
      class="relative z-10 w-full h-full flex flex-col items-center justify-center p-4"
    >
      <div class="mb-10 animate-fade-in-down">
        <h2 class="text-2xl font-bold text-white/20 uppercase tracking-[0.5em]">
          {{ gameInfo.name }}
        </h2>
      </div>

      <div
        class="relative p-10 rounded-xl bg-neutral-900/30 border border-white/5 backdrop-blur-sm shadow-2xl"
      >
        <component
          :is="gameComponent"
          :key="gameKey"
          @addCounter="finishGame"
          @addScore="handleScore"
        />
      </div>
    </div>

    <!-- FASE 3: CONCLUSÃO -->
    <div
      v-if="gameState === 'finished'"
      class="absolute inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-center items-center"
    >
      <div
        class="relative flex flex-col gap-8 p-10 w-[450px] max-w-[90vw] rounded-xl border border-emerald-500/50 bg-neutral-900/95 text-center"
        v-motion-pop
      >
        <div class="space-y-2">
          <h3 class="text-3xl font-bold text-white uppercase tracking-wider">
            Treino Finalizado
          </h3>
          <div class="h-1 w-24 bg-emerald-500 mx-auto rounded-full"></div>
        </div>

        <p class="text-neutral-400 text-sm leading-relaxed">
          Sessão de treinamento concluída. Você pode repetir o exercício para
          aprimorar suas habilidades ou retornar ao menu principal.
        </p>

        <div class="flex flex-col gap-3">
          <button
            @click="retryGame"
            class="w-full py-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-1"
          >
            Repetir Exercício
          </button>

          <button
            @click="exitTraining"
            class="w-full py-3 rounded border border-neutral-700 hover:bg-neutral-800 text-neutral-300 hover:text-white font-medium tracking-wider uppercase transition-colors"
          >
            Retornar ao Menu
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
