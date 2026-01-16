<script>
import BannerHome from "@/components/BannerHome/index.vue";
import Button from "./icons/Button.vue";
import Container from "./icons/Container.vue";
import gameListInfo from "@/data/gameListInfo.js";

export default {
  components: {
    BannerHome,
    Button,
    Container,
  },
  data() {
    return {
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
          title: "Foco Total",
          desc: "Cada erro custa caro. Mantenha a concentração para não perder vidas e recomeçar do zero.",
          icon: "fa-brain",
          value: "ESTRATÉGIA",
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
  <main class="w-full min-h-screen bg-neutral-950 relative overflow-hidden">
    <!-- Background Grid Effect -->
    <div class="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-b from-neutral-950 via-transparent to-neutral-950"
      ></div>
    </div>

    <Container class="relative z-10 pb-20 !mt-32">
      <!-- HERO SECTION -->
      <BannerHome />

      <!-- STATS SECTION (Replacing Timer/Ranking areas) -->
      <section class="mt-32 mb-24">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(stat, index) in stats"
            :key="stat.id"
            class="group relative p-8 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-2"
            data-aos="fade-up"
            :data-aos-delay="index * 150"
          >
            <div
              class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity"
            >
              <font-awesome-icon
                :icon="['fas', stat.icon]"
                class="text-6xl text-emerald-500"
              />
            </div>
            <h4 class="text-emerald-500 font-bold tracking-widest text-xs mb-4">
              // {{ stat.value }}
            </h4>
            <h3 class="text-2xl font-bold text-white mb-3">{{ stat.title }}</h3>
            <p class="text-neutral-400 leading-relaxed text-sm">
              {{ stat.desc }}
            </p>
          </div>
        </div>
      </section>

      <!-- GAMES GRID (Mission Select) -->
      <section class="mb-32">
        <div class="flex flex-col items-center mb-16 text-center">
          <h2
            class="text-4xl md:text-5xl font-bold text-white mb-4"
            data-aos="fade-up"
          >
            SELECIONE SUA MISSÃO
          </h2>
          <div
            class="h-1 w-24 bg-emerald-500 rounded-full"
            data-aos="fade-up"
            data-aos-delay="100"
          ></div>
        </div>

        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0"
        >
          <div
            v-for="(game, index) in games"
            :key="index"
            class="group relative h-80 rounded-xl overflow-hidden cursor-pointer border border-neutral-800 hover:border-emerald-500 transition-all duration-500"
            data-aos="zoom-in"
            :data-aos-delay="index * 100"
          >
            <!-- Game Image -->
            <img
              :src="game.img"
              :alt="game.alt"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
            />

            <!-- Overlay Gradient -->
            <div
              class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"
            ></div>

            <!-- Content -->
            <div class="absolute inset-0 p-6 flex flex-col justify-end">
              <div
                class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
              >
                <h3 class="text-xl font-bold text-white mb-2">
                  {{ game.name }}
                </h3>
                <p
                  class="text-neutral-400 text-xs line-clamp-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100"
                >
                  {{ game.tip }}
                </p>
                <button
                  class="text-emerald-400 text-sm font-bold tracking-wide uppercase flex items-center gap-2 hover:text-emerald-300"
                >
                  Iniciar
                  <font-awesome-icon :icon="['fas', 'arrow-right']" />
                </button>
              </div>
            </div>

            <!-- Corner Accents (Decor) -->
            <div
              class="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </div>
        </div>
      </section>

      <!-- UPDATES / COMMUNITY (New Content) -->
      <section
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
      >
        <!-- Text Side -->
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

        <!-- CTA Side -->
        <div
          class="relative h-full min-h-[300px] rounded-2xl bg-gradient-to-br from-emerald-900/20 to-black border border-emerald-500/30 p-10 flex flex-col justify-center items-center text-center overflow-hidden"
          data-aos="fade-left"
        >
          <div
            class="absolute inset-0 bg-[url('@/assets/images/Home/ranking.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"
          ></div>

          <h3 class="text-2xl font-bold text-white mb-4 relative z-10">
            Junte-se à Elite
          </h3>
          <p class="text-neutral-300 mb-8 max-w-md relative z-10">
            Crie sua conta, salve suas pontuações e apareça no ranking global.
            Você está pronto?
          </p>

          <div class="flex gap-4 relative z-10 flex-wrap justify-center">
            <router-link to="/gamesPage">
              <Button label="JOGAR AGORA" class="font-bold" />
            </router-link>
            <router-link to="/register">
              <button
                class="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10 text-white font-semibold transition-colors"
              >
                Criar Conta
              </button>
            </router-link>
          </div>
        </div>
      </section>
    </Container>
  </main>
</template>
