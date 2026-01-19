<script>
import BannerHome from "@/components/BannerHome/index.vue";
import Button from "./icons/Button.vue";
import Container from "./icons/Container.vue";
import gameListInfo from "@/data/gameListInfo.js";
import gamesVideo from "@/assets/video/games.mov";

export default {
  components: {
    BannerHome,
    Button,
    Container,
  },
  data() {
    return {
      gamesVideo,
      games: gameListInfo,
      stats: [
        {
          id: 1,
          title: "Velocidade",
          desc: "O tempo é seu inimigo. Complete os desafios o mais rápido possível para garantir sua pontuação máxima.",
          icon: "fa-stopwatch",
          value: "REFLEXOS",
        },
        {
          id: 2,
          title: "Ranking Global",
          desc: "Dispute o topo da tabela com jogadores de todo o mundo. Apenas os 10 melhores são imortalizados.",
          icon: "fa-trophy",
          value: "COMPETIÇÃO",
        },
        {
          id: 3,
          title: "Precisão Cirúrgica",
          desc: "Em um speedrun, cada clique conta. Otimize seus movimentos para raspar milissegundos preciosos do seu tempo final.",
          icon: "fa-crosshairs",
          value: "PRECISÃO",
        },
      ],
      updates: [
        {
          date: "16 JAN",
          title: "Sistema Otimizado",
          desc: "Melhorias de performance aplicadas em todos os módulos de jogo.",
        },
        {
          date: "15 JAN",
          title: "Novo Desafio: Space Invaders",
          desc: "A invasão começou. Proteja a terra na nova simulação de combate.",
        },
        {
          date: "10 JAN",
          title: "Reset de Temporada",
          desc: "O ranking foi reiniciado. Uma nova chance de alcançar o topo.",
        },
      ],
    };
  },
};
</script>

<template>
  <main class="w-full min-h-screen relative overflow-hidden pattern-grid">
    <Container class="relative z-10 pb-20 !mt-60">
      <BannerHome />

      <section class="mt-40 mb-32">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="stat.id"
            class="group relative p-7 rounded-md bg-neutral-900 border border-neutral-800/80 hover:border-emerald-500/60 transition-colors duration-200"
            data-aos="fade-up"
            :data-aos-delay="index * 150"
          >
            <h4 class="text-emerald-500 font-bold tracking-widest text-xs mb-4">
              // {{ stat.value }}
            </h4>
            <div class="flex items-center gap-3 mb-3">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-md bg-neutral-800 text-emerald-400"
              >
                <font-awesome-icon
                  :icon="['fas', stat.icon]"
                  class="text-base"
                />
              </div>
              <h3 class="text-lg font-semibold text-white">
                {{ stat.title }}
              </h3>
            </div>
            <p class="text-neutral-400 leading-relaxed text-sm">
              {{ stat.desc }}
            </p>
          </div>
        </div>
      </section>

      <section class="mb-40">
        <div
          class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12"
        >
          <div class="space-y-3" data-aos="fade-right">
            <p
              class="text-emerald-500 font-mono text-xs tracking-[0.35em] uppercase"
            >
              // MISSÕES DISPONÍVEIS
            </p>
            <h2 class="text-3xl md:text-4xl font-bold text-white">
              Selecione sua próxima missão
            </h2>
            <p class="text-neutral-400 max-w-xl text-sm md:text-base">
              Cada modo foi desenhado para testar um tipo de habilidade. Escolha
              um desafio, estude a dica estratégica e inicie quando estiver
              pronto.
            </p>
          </div>

          <div
            class="flex flex-wrap items-center gap-3 md:justify-end"
            data-aos="fade-left"
          >
            <span
              class="px-3 py-1 rounded-sm text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/40"
            >
              {{ games.length }} modos disponíveis
            </span>
            <span
              class="px-3 py-1 rounded-sm text-[11px] font-medium bg-neutral-900 border border-neutral-700 text-neutral-300"
            >
              Reflexos
            </span>
            <span
              class="px-3 py-1 rounded-sm text-[11px] font-medium bg-neutral-900 border border-neutral-700 text-neutral-300"
            >
              Estratégia
            </span>
          </div>
        </div>

        <div
          class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-2 md:px-0"
        >
          <div
            v-for="(game, index) in games"
            :key="index"
            class="group relative flex flex-col h-full overflow-hidden rounded-md border border-neutral-800/80 bg-gradient-to-b from-neutral-900 to-neutral-950/80 hover:border-emerald-500/70 transition-all duration-300"
            data-aos="fade-up"
            :data-aos-delay="index * 120"
          >
            <div class="relative h-44 md:h-52 overflow-hidden">
              <img
                :src="game.img"
                :alt="game.alt"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div
                class="absolute bottom-3 left-4 flex items-center gap-2 text-[11px]"
              >
                <span
                  class="px-2 py-1 rounded-md bg-black/70 text-emerald-400 font-semibold tracking-[0.25em] uppercase"
                >
                  Missão {{ index + 1 }}
                </span>
              </div>
            </div>

            <div class="flex flex-1 flex-col justify-between p-6 gap-5">
              <div class="space-y-3">
                <h3 class="text-xl font-semibold text-white">
                  {{ game.name }}
                </h3>
                <p class="text-neutral-400 text-sm leading-relaxed">
                  {{ game.tip }}
                </p>
              </div>
              <div
                class="flex items-center justify-end border-t border-neutral-800 pt-4 mt-2"
              >
                <router-link
                  :to="{ name: 'training', params: { id: index } }"
                  class="inline-flex items-center gap-2 text-emerald-400 text-xs font-semibold tracking-[0.25em] uppercase hover:text-emerald-300"
                >
                  Iniciar missão
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32"
      >
        <div data-aos="fade-right">
          <h3 class="text-emerald-500 font-bold tracking-widest text-sm mb-2">
            // SYSTEM_LOGS
          </h3>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-8">
            Últimas Atualizações
          </h2>
          <div class="space-y-6">
            <div
              v-for="(update, i) in updates"
              :key="i"
              class="flex gap-6 border-l-2 border-neutral-800 pl-6 hover:border-emerald-500 transition-colors duration-300 py-2"
            >
              <div
                class="text-emerald-500 font-mono font-bold text-sm min-w-[60px]"
              >
                {{ update.date }}
              </div>
              <div>
                <h4 class="text-white font-bold text-lg mb-1">
                  {{ update.title }}
                </h4>
                <p class="text-neutral-400 text-sm">{{ update.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div
          class="relative h-full min-h-[280px] rounded-md border border-neutral-800 flex flex-col justify-center items-center text-center overflow-hidden group"
          data-aos="fade-left"
        >
          <!-- Decorator lines for HUD look -->
          <div
            class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-600 to-transparent opacity-50 z-20"
          ></div>
          <div
            class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-900 to-transparent opacity-30 z-20"
          ></div>

          <!-- Corner Accents -->
          <div
            class="absolute top-[-1px] left-[-1px] w-4 h-4 border-t-2 border-l-2 border-green-600 rounded-tl-lg transition-colors duration-300 z-20"
          ></div>
          <div
            class="absolute top-[-1px] right-[-1px] w-4 h-4 border-t-2 border-r-2 border-green-600 rounded-tr-lg transition-colors duration-300 z-20"
          ></div>
          <div
            class="absolute bottom-[-1px] left-[-1px] w-4 h-4 border-b-2 border-l-2 border-green-600 rounded-bl-lg transition-colors duration-300 z-20"
          ></div>
          <div
            class="absolute bottom-[-1px] right-[-1px] w-4 h-4 border-b-2 border-r-2 border-green-600 rounded-br-lg transition-colors duration-300 z-20"
          ></div>

          <!-- Video Background -->
          <video
            autoplay
            loop
            muted
            playsinline
            class="absolute inset-0 opacity-50 w-full h-full object-cover"
          >
            <source :src="gamesVideo" type="video/mp4" />
          </video>

          <!-- Overlay -->
          <div class="absolute inset-0 bg-neutral-950/90"></div>

          <!-- Content -->
          <div class="relative z-10 p-8 md:p-10 drop-shadow-md">
            <h3 class="text-2xl font-bold text-white mb-4">Junte-se à Elite</h3>
            <p class="text-neutral-300 mb-8 max-w-md mx-auto">
              Crie sua conta, salve suas pontuações e apareça no ranking global.
              Você está pronto?
            </p>

            <div class="flex gap-4 flex-wrap justify-center">
              <router-link to="/gamesPage">
                <Button label="JOGAR AGORA" class="font-bold" />
              </router-link>
              <router-link to="/register">
                <button
                  class="px-6 py-3 rounded-md border border-neutral-700 hover:bg-neutral-800/80 backdrop-blur-sm text-white font-semibold transition-colors"
                >
                  Criar Conta
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </Container>
  </main>
</template>
