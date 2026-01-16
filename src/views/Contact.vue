<script>
import ContactIconItem from "@/components/Items/ContactIconItem.vue";
import contactItemInfo from "@/data/contactItemInfo";
import Container from "@/views/icons/Container.vue";
import TextHighlight from "@/views/icons/TextHighlight.vue";

export default {
  components: {
    ContactIconItem,
    Container,
    TextHighlight,
  },
  data() {
    return {
      contactItemInfo: contactItemInfo,
    };
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
      <section class="text-center mb-16" data-aos="fade-up">
        <h1
          class="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight"
        >
          Entre em contato com o <TextHighlight>GameTest</TextHighlight>
        </h1>
        <p
          class="text-neutral-400 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
        >
          Dúvidas, feedbacks ou ideias de novos desafios? Escolha um dos canais
          oficiais e faça parte da nossa comunidade.
        </p>
      </section>

      <section
        class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch"
        data-aos="fade-up"
        data-aos-delay="150"
      >
        <div class="space-y-6">
          <h2 class="text-2xl md:text-3xl font-semibold text-white">
            Canais oficiais
          </h2>
          <p class="text-neutral-400 text-base md:text-lg leading-relaxed">
            Fique por dentro de anúncios, atualizações da plataforma, novos
            jogos e eventos especiais. Acompanhe conteúdos pensados para quem
            quer melhorar performance, descobrir estratégias e conhecer outros
            jogadores.
          </p>
          <p class="text-neutral-400 text-base md:text-lg leading-relaxed">
            Siga o GameTest nas principais redes e conecte-se com uma comunidade
            apaixonada por competição saudável e tecnologia.
          </p>
          <div
            class="flex flex-wrap gap-4 items-center mt-4"
            data-aos="fade-right"
            data-aos-delay="250"
          >
            <ContactIconItem
              v-for="contactItem in contactItemInfo"
              :key="contactItem.id"
              :icon="contactItem.icon"
              :name="contactItem.name"
              :styling="contactItem.styling"
            />
          </div>
        </div>

        <div
          class="relative bg-neutral-900 border border-neutral-800 rounded-md p-8 flex flex-col justify-between overflow-hidden"
        >
          <div class="space-y-6">
            <h2 class="text-2xl md:text-3xl font-semibold text-white">
              Quer colaborar com o projeto?
            </h2>
            <p class="text-neutral-300 text-base md:text-lg leading-relaxed">
              O GameTest é um projeto em constante evolução. Se você tem ideias
              de novos modos, sugestões de UX, feedback técnico ou propostas de
              parceria, seu contato é muito bem-vindo.
            </p>
            <p class="text-neutral-400 text-sm md:text-base">
              Envie uma mensagem pelas redes oficiais e conte um pouco sobre
              você, sua experiência e como gostaria de contribuir com o projeto.
            </p>
            <div class="mt-6 text-sm text-neutral-500">
              <p>Tempo médio de resposta: até 2 dias úteis.</p>
              <p>Fique à vontade para escrever em português ou inglês.</p>
            </div>
          </div>
        </div>
      </section>
    </Container>
  </main>
</template>
