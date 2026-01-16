<script>
import Container from "./icons/Container.vue";
import TextHighlight from "./icons/TextHighlight.vue";
import Button from "./icons/Button.vue";

export default {
  components: {
    Container,
    TextHighlight,
    Button,
  },
  data() {
    return {
      features: [
        {
          title: "Speedrun Mode",
          desc: "Cronômetros de alta precisão para registrar cada milissegundo da sua performance.",
          icon: "stopwatch",
        },
        {
          title: "Ranking Global",
          desc: "Compare seus tempos com jogadores de todo o mundo em tempo real.",
          icon: "trophy",
        },
        {
          title: "Arcade Classics",
          desc: "Uma coleção curada de jogos retrô recriados com tecnologia moderna.",
          icon: "gamepad",
        },
      ],
    };
  },
};
</script>

<template>
  <main class="w-full min-h-screen bg-neutral-950 relative overflow-hidden">
    <!-- Background Grid -->
    <div class="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
    </div>

    <Container class="relative z-10 pb-20 pt-10">
      <!-- Header Section -->
      <section class="text-center mb-20" data-aos="fade-up">
        <h1 class="text-5xl md:text-7xl font-bold text-white mb-6">
          SOBRE O <TextHighlight>PROJETO</TextHighlight>
        </h1>
        <p class="text-neutral-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Mais do que uma plataforma de jogos. Um laboratório digital para
          testar seus limites, treinar seus reflexos e competir pela glória
          eterna.
        </p>
      </section>

      <!-- Mission Briefing (Grid Layout) -->
      <section
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-32 items-center"
      >
        <div class="space-y-8" data-aos="fade-right">
          <div class="border-l-4 border-emerald-500 pl-6">
            <h2 class="text-3xl font-bold text-white mb-2">A Missão</h2>
            <h3 class="text-emerald-500 font-mono text-sm tracking-widest">
              // MISSION_BRIEFING
            </h3>
          </div>
          <p class="text-neutral-300 leading-loose text-lg">
            O <strong class="text-white">GameTest</strong> nasceu de uma
            necessidade simples: criar um ambiente onde a habilidade pura é o
            único diferencial. Sem pay-to-win, sem loot boxes. Apenas você, seus
            reflexos e o código.
          </p>
          <p class="text-neutral-300 leading-loose text-lg">
            Nossa plataforma foi desenhada para entusiastas de
            <span class="text-emerald-400 font-bold">Speedruns</span> e jogos de
            precisão. Cada pixel foi otimizado para garantir que o único limite
            seja a sua própria velocidade de reação.
          </p>
        </div>

        <div class="relative group" data-aos="fade-left">
          <div
            class="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full group-hover:bg-emerald-500/30 transition-all duration-500"
          ></div>
          <div
            class="relative bg-neutral-900 border border-neutral-800 p-8 rounded-2xl overflow-hidden"
          >
            <div
              class="absolute top-0 right-0 p-4 opacity-10 font-mono text-6xl font-bold text-white select-none"
            >
              01
            </div>
            <div class="grid grid-cols-1 gap-6">
              <div
                v-for="(feature, index) in features"
                :key="index"
                class="flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div
                  class="bg-emerald-500/10 p-3 rounded-lg text-emerald-500 min-w-[50px] flex justify-center"
                >
                  <font-awesome-icon :icon="['fas', feature.icon]" size="lg" />
                </div>
                <div>
                  <h4 class="text-white font-bold mb-1">{{ feature.title }}</h4>
                  <p class="text-neutral-400 text-sm">{{ feature.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Origin Story (Full Width) -->
      <section
        class="relative rounded-3xl bg-neutral-900 border border-neutral-800 p-10 md:p-16 mb-32 overflow-hidden text-center"
        data-aos="fade-up"
      >
        <div
          class="absolute inset-0 bg-[url('@/assets/images/Home/timer.webp')] bg-cover bg-center opacity-10 mix-blend-overlay"
        ></div>
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-900/80 to-neutral-900"
        ></div>

        <div class="relative z-10 max-w-4xl mx-auto">
          <font-awesome-icon
            :icon="['fas', 'code']"
            class="text-5xl text-emerald-500 mb-8"
          />
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-6">
            Código. Competição. Comunidade.
          </h2>
          <p class="text-neutral-300 text-lg leading-relaxed mb-10">
            Acreditamos que a competição saudável eleva o nível de todos. Seja
            tentando bater seu próprio recorde no
            <span class="text-emerald-400">Simon</span> ou lutando pelo top 1 no
            <span class="text-emerald-400">Space Invaders</span>, cada tentativa
            conta. O GameTest é um projeto open-source feito por gamers, para
            gamers.
          </p>

          <div class="flex justify-center gap-6 flex-wrap">
            <router-link to="/gamesPage">
              <Button
                label="COMEÇAR A JOGAR"
                class="font-bold tracking-widest"
              />
            </router-link>
            <a
              href="https://github.com/miqueiasbelfort/game_in_game"
              target="_blank"
            >
              <button
                class="px-8 py-3 rounded hover:bg-white/10 text-white border border-white/20 transition-colors font-semibold flex items-center gap-3"
              >
                <font-awesome-icon :icon="['fab', 'github']" />
                Ver no GitHub
              </button>
            </a>
          </div>
        </div>
      </section>

      <!-- Tech Stack Footer -->
      <section
        class="text-center border-t border-neutral-800 pt-10"
        data-aos="fade-in"
        data-aos-delay="200"
      >
        <p class="text-neutral-500 text-sm uppercase tracking-widest mb-4">
          Powered By
        </p>
        <div
          class="flex justify-center gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500"
        >
          <font-awesome-icon
            :icon="['fab', 'vuejs']"
            class="text-3xl hover:text-green-500"
            title="Vue.js"
          />
          <font-awesome-icon
            :icon="['fab', 'js']"
            class="text-3xl hover:text-yellow-400"
            title="JavaScript"
          />
          <font-awesome-icon
            :icon="['fab', 'css3-alt']"
            class="text-3xl hover:text-blue-500"
            title="Tailwind CSS"
          />
        </div>
      </section>
    </Container>
  </main>
</template>
