<script>
import TopInfoItem from "@/components/Items/TopInfoItem.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";
import useGetTopScores from "@/hooks/useGetTopScores.js";
import Container from "@/views/icons/Container.vue";
import Loader from "@/components/Loader/index.vue";

export default {
  components: {
    TopInfoItem,
    TextHighlight,
    Container,
    Loader,
  },
  data() {
    return {
      topScores: [],
      loading: false,
    };
  },
  mounted() {
    const { data, isPending } = useGetTopScores();
    this.topScores = data;

    this.loading = isPending;
  },
};
</script>

<template>
  <main
    class="w-full min-h-[calc(100vh-80px)] relative overflow-hidden pattern-grid"
  >
    <Container class="relative z-10 pb-20 pt-10">
      <section class="mb-10 text-center md:text-left" data-aos="fade-up">
        <h1
          class="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
        >
          Ranking geral de <TextHighlight>pontuações</TextHighlight>
        </h1>
        <p
          class="text-neutral-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0"
        >
          Veja quem está dominando os rankings do ChronoRun. Suba na tabela,
          alcance o topo e defenda sua posição contra novos desafiantes.
        </p>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div
          class="lg:col-span-1 bg-neutral-900 border border-neutral-800 rounded-md p-6 flex flex-col gap-4"
          data-aos="fade-right"
          data-aos-delay="150"
        >
          <h2 class="text-xl md:text-2xl font-semibold text-white">
            Como subir no ranking
          </h2>
          <p class="text-neutral-400 text-sm md:text-base leading-relaxed">
            Jogue qualquer um dos modos disponíveis, conquiste boas pontuações e
            volte para ver sua posição atualizada entre os melhores jogadores.
          </p>
          <p class="text-neutral-400 text-sm md:text-base leading-relaxed">
            As primeiras posições são reservadas para quem mantém consistência,
            estratégia e reflexos em dia.
          </p>
          <div class="mt-2 text-xs text-neutral-500 space-y-1">
            <p>• Apenas as melhores pontuações são exibidas aqui.</p>
            <p>• Fique atento: qualquer partida pode mudar o topo.</p>
          </div>
        </div>

        <div
          class="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-md p-6 md:p-8 relative overflow-hidden"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div>
            <div
              class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6"
            >
              <div class="text-left">
                <h2 class="text-xl md:text-2xl font-semibold text-white">
                  Top jogadores
                </h2>
                <p class="text-neutral-400 text-sm md:text-base">
                  Destaque das
                  <TextHighlight>pontuações mais altas</TextHighlight> da
                  plataforma.
                </p>
              </div>
              <span
                v-if="topScores && topScores.length > 0"
                class="px-3 py-1 rounded-sm text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/40 self-start md:self-auto"
              >
                {{ topScores.length }} jogadores no ranking
              </span>
            </div>

            <template v-if="loading">
              <div class="flex justify-center items-center h-64">
                <Loader />
              </div>
            </template>

            <template v-else-if="topScores && topScores.length > 0">
              <div class="space-y-3">
                <TopInfoItem
                  v-for="(item, index) in topScores"
                  :key="index"
                  :data="item"
                  :position="index"
                />
              </div>
            </template>

            <template v-else>
              <div
                class="h-64 flex flex-col items-center justify-center text-center gap-3"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <p class="text-lg md:text-xl text-neutral-200">
                  Ainda não há dados suficientes para montar o ranking.
                </p>
                <p class="text-neutral-400 text-sm md:text-base max-w-md">
                  Jogue alguns modos, registre boas pontuações e volte mais
                  tarde para ver quem está liderando.
                </p>
              </div>
            </template>
          </div>
        </div>
      </section>
    </Container>
  </main>
</template>
