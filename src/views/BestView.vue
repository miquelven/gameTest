<script>
import BestInfoItem from "@/components/Items/BestInfoItem.vue";
import Loader from "@/components/Loader/index.vue";
import Container from "@/views/icons/Container.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";
import useGetScores from "@/hooks/useGetScores.js";

export default {
  components: {
    BestInfoItem,
    Loader,
    Container,
    TextHighlight,
  },
  data() {
    return {
      scores: [],
      loading: false,
    };
  },
  async mounted() {
    const userEmail = this.$store.state.user
      ? this.$store.state.user.email
      : null;

    const { data, isPending } = useGetScores(userEmail);
    this.loading = isPending;

    this.scores = data;
  },
};
</script>

<template>
  <main
    class="w-full min-h-[calc(100vh-80px)] relative overflow-hidden pattern-grid"
  >
    <Container class="relative z-10 pb-20 pt-10">
      <section
        class="mb-10 flex flex-col gap-4 items-center text-center"
        data-aos="fade-up"
      >
        <h1
          class="text-4xl md:text-5xl font-bold text-white leading-tight max-w-3xl"
        >
          Suas <TextHighlight>melhores pontuações</TextHighlight> em destaque
        </h1>
        <p class="text-neutral-400 text-base md:text-lg max-w-2xl">
          Acompanhe a evolução da sua performance em cada jogo. Use este painel
          como um histórico pessoal de conquistas e tente sempre bater o seu
          próprio recorde.
        </p>
      </section>

      <section class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div
          class="lg:col-span-1 bg-neutral-900 border border-neutral-800 rounded-md p-6 flex flex-col gap-4"
          data-aos="fade-right"
          data-aos-delay="150"
        >
          <h2 class="text-xl md:text-2xl font-semibold text-white">
            Como funciona
          </h2>
          <p class="text-neutral-400 text-sm md:text-base leading-relaxed">
            Cada partida concluída registra uma pontuação. As melhores marcas de
            cada jogo aparecem aqui, sempre organizadas para você entender onde
            está indo melhor.
          </p>
          <p class="text-neutral-400 text-sm md:text-base leading-relaxed">
            Use este painel para comparar diferentes modos, identificar seus
            pontos fortes e decidir qual desafio vai encarar em seguida.
          </p>
          <div class="mt-2 text-xs text-neutral-500 space-y-1">
            <p>• Somente partidas válidas aparecem no histórico.</p>
            <p>• Melhore seus tempos para atualizar automaticamente a lista.</p>
          </div>
        </div>

        <div
          class="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-md p-6 md:p-8 relative overflow-hidden"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div>
            <template v-if="loading">
              <div class="flex justify-center items-center h-64">
                <Loader />
              </div>
            </template>
            <template v-else>
              <template v-if="scores && scores.length > 0">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl md:text-2xl font-semibold text-white">
                    Histórico de melhores partidas
                  </h2>
                  <span
                    class="px-3 py-1 rounded-sm text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/40"
                  >
                    {{ scores.length }} registros
                  </span>
                </div>
                <div class="space-y-3">
                  <BestInfoItem
                    v-for="(score, index) in scores"
                    :key="index"
                    :score="score"
                    :position="index + 1"
                  />
                </div>
              </template>
              <template v-else>
                <div
                  class="h-64 flex flex-col items-center justify-center text-center gap-3"
                >
                  <p class="text-lg md:text-xl text-neutral-200">
                    Nenhuma pontuação registrada ainda.
                  </p>
                  <p class="text-neutral-400 text-sm md:text-base max-w-md">
                    Jogue qualquer um dos modos disponíveis, conclua uma partida
                    e volte aqui para acompanhar a sua trajetória.
                  </p>
                </div>
              </template>
            </template>
          </div>
        </div>
      </section>
    </Container>
  </main>
</template>
