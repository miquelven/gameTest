<script>
import TopInfoItem from "@/components/Items/TopInfoItem.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";
import useGetTopScores from "@/hooks/useGetTopScores.js";
import Container from "@/views/icons/Container.vue";

export default {
  components: {
    TopInfoItem,
    TextHighlight,
    Container,
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
    class="w-full min-h-[calc(100vh-80px)] bg-neutral-950 relative overflow-hidden"
  >
    <div class="absolute inset-0 z-0 opacity-20 pointer-events-none">
      <div
        class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
      ></div>
    </div>

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
          Veja quem está dominando os rankings do GameTest. Suba na tabela,
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
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-8 h-8 text-gray-700 animate-spin fill-emerald-500"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </template>

            <template v-else-if="topScores && topScores.length > 0">
              <table
                class="w-full border-separate border-spacing-y-3"
                data-aos="fade-up"
                data-aos-duration="400"
              >
                <tbody>
                  <tr
                    v-for="(item, index) in topScores"
                    :key="index"
                    class="transition-all duration-300 hover:bg-white/5"
                    :class="[index < 3 ? 'bg-black-bold' : '']"
                    v-motion
                    :initial="{
                      opacity: 0,
                    }"
                    :enter="{
                      opacity: 1,
                      transition: {
                        duration: 700,
                        type: 'keyframes',
                        ease: 'easein',
                        delay: 400,
                      },
                    }"
                  >
                    <TopInfoItem :data="item" :position="index" />
                  </tr>
                </tbody>
              </table>
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
