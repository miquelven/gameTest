<script>
import Button from "@/views/icons/Button.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";

export default {
  components: {
    Button,
    TextHighlight,
  },
};
</script>

<template>
  <section
    class="relative flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24 my-24 lg:my-32"
    id="container"
  >
    <div class="flex-1 space-y-10 text-center lg:text-left">
      <p
        data-aos="fade-up"
        class="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300"
      >
        <span class="size-2 rounded-full bg-emerald-400 animate-pulse"></span>
        Arcade de minigames
      </p>

      <h1
        data-aos="fade-up"
        data-aos-delay="100"
        class="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight"
      >
        Suba para o
        <TextHighlight>topo do ranking</TextHighlight>
        e prove suas habilidades.
      </h1>

      <p
        data-aos="fade-up"
        data-aos-delay="200"
        class="text-lg lg:text-xl text-white-light max-w-xl mx-auto lg:mx-0"
      >
        Jogue clássicos reimaginados, desafie seus reflexos e memória e acumule
        pontos para entrar para a elite do
        <TextHighlight> GameTest.</TextHighlight>
      </p>

      <div
        data-aos="fade-up"
        data-aos-delay="300"
        class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
      >
        <router-link to="/gamesPage">
          <Button type="button" label="INICIAR DESAFIO" class="font-bold" />
        </router-link>

        <router-link to="/score">
          <button
            class="px-6 py-3 rounded-lg border border-emerald-500/60 text-sm font-semibold tracking-wide text-emerald-300 hover:bg-emerald-500/10 transition-colors"
          >
            Ver ranking em tempo real
          </button>
        </router-link>
      </div>

      <div
        data-aos="fade-up"
        data-aos-delay="400"
        class="grid grid-cols-3 gap-4 max-w-xl mx-auto lg:mx-0 text-sm"
      >
        <div class="rounded-lg border border-white/5 bg-white/5 px-4 py-3">
          <p class="text-emerald-400 text-xs uppercase tracking-wider">Jogos</p>
          <p class="text-xl font-semibold">8+ desafios</p>
          <p class="text-xs text-white-light/70">
            Clássicos arcade em versão web
          </p>
        </div>
        <div class="rounded-lg border border-white/5 bg-white/5 px-4 py-3">
          <p class="text-emerald-400 text-xs uppercase tracking-wider">
            Ranking
          </p>
          <p class="text-xl font-semibold">Top 10 global</p>
          <p class="text-xs text-white-light/70">Atualizado em tempo real</p>
        </div>
        <div class="rounded-lg border border-white/5 bg-white/5 px-4 py-3">
          <p class="text-emerald-400 text-xs uppercase tracking-wider">
            Skills
          </p>
          <p class="text-xl font-semibold">Reflexo &amp; foco</p>
          <p class="text-xs text-white-light/70">Treine enquanto se diverte</p>
        </div>
      </div>
    </div>

    <div
      data-aos="zoom-in"
      data-aos-delay="200"
      class="flex-1 flex justify-center lg:justify-end w-full"
    >
      <div
        class="relative w-full max-w-md rounded-2xl border border-emerald-500/40 bg-gradient-to-b from-black/80 via-black/70 to-emerald-950/40 shadow-[0_0_40px_rgba(16,185,129,0.25)] p-6"
      >
        <div
          class="absolute inset-0 rounded-2xl border border-emerald-300/20 pointer-events-none"
          style="mask-image: radial-gradient(circle at top, black, transparent)"
        ></div>

        <div class="flex items-center justify-between mb-4">
          <p class="text-xs font-semibold tracking-widest text-emerald-300">
            DASHBOARD DO JOGADOR
          </p>
          <span
            class="text-[10px] px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/40"
          >
            MODO ARCADE
          </span>
        </div>

        <div class="space-y-4">
          <div
            class="flex items-center justify-between rounded-lg bg-black/40 border border-white/5 px-4 py-3"
          >
            <div>
              <p class="text-xs text-white-light/60">Próximo desafio</p>
              <p class="text-sm font-semibold">Combo de 8 minigames</p>
            </div>
            <span class="text-emerald-400 text-xs font-semibold">
              +XP / +Score
            </span>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div
              class="rounded-lg bg-black/40 border border-emerald-500/30 px-4 py-3"
            >
              <p class="text-xs text-white-light/60">Tempo médio</p>
              <p class="text-lg font-semibold">04:32</p>
              <p class="text-[10px] text-emerald-300">
                Aprimore sua velocidade
              </p>
            </div>
            <div
              class="rounded-lg bg-black/40 border border-emerald-500/30 px-4 py-3"
            >
              <p class="text-xs text-white-light/60">Melhor posição</p>
              <p class="text-lg font-semibold">#07</p>
              <p class="text-[10px] text-emerald-300">Falta pouco pro topo</p>
            </div>
          </div>

          <div
            class="mt-2 flex items-center justify-between rounded-lg border border-white/5 bg-black/40 px-4 py-3"
          >
            <div class="text-xs text-white-light/70">
              <p>Pronto para subir no ranking?</p>
              <p class="text-emerald-300 font-semibold">
                Clique em "Iniciar desafio" para começar a rodada.
              </p>
            </div>
            <span
              class="size-10 rounded-full border border-emerald-400/60 flex items-center justify-center text-emerald-300 text-xs"
            >
              GO
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
