<script>
import Header from "./icons/Header.vue";
import Footer from "./icons/Footer.vue";
import AboutItem from "@/components/AboutItem.vue";

export default {
  components: {
    Header,
    Footer,
    AboutItem,
  },
};
</script>

<template>
  <Header />
  <main class="w-full mt-20" id="best">
    <!-- container -->
    <div class="flex  ">
      <div class="m-auto mb-10 max-w-4xl  border-x-2 border-white/50 px-5 py-10 flex flex-col  gap-24 max-sm:border-0">
        <AboutItem
          title="Bem-vindo:"
          content="Bem vindo ao nosso universo de desafios de jogos, onde a diversão
            encontra a competição em um ambiente emocionante e inovador. Nosso
            site foi concebido com a paixão por jogos e o desejo de proporcionar
            uma experiência única aos entusiastas que buscam algo além do
            convencional. Aqui, cada desafio é uma oportunidade de testar suas
            habilidades, superar limites e fazer parte de uma comunidade
            vibrante. Nosso site é dedicado a todos os amantes de jogos que
            buscam algo mais do que simples entretenimento. Se você é alguém que
            adora desafios, que busca uma forma divertida de medir suas
            habilidades e competir com jogadores ao redor do mundo, você está no
            lugar certo. Seja você um veterano experiente ou um novato ansioso
            por desafios, há algo emocionante aguardando por você."
            v-motion
          :initial="{
           y: 200,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
            transition:{
              duration: 500,
              type: 'keyframes',
              ease: 'easein',
            }
          }"
        />
        
            <AboutItem title="Por Que Foi Criado:" content="A ideia por trás do nosso site nasceu da necessidade de proporcionar
            uma experiência de jogo mais envolvente e desafiadora. Vimos a
            oportunidade de criar um espaço onde jogadores de todas as
            habilidades pudessem se reunir, competir e se superar em uma
            variedade de desafios cronometrados, incluindo a empolgante
            categoria de Speed Run. Acreditamos que a competição saudável é uma
            forma de elevar a diversão a um novo patamar, e queremos oferecer
            essa experiência única a todos os que compartilham nossa paixão por
            jogos." 
            v-motion
          :initial="{
           y: 200,
            opacity: 0,
          }"
          :enter="{
            y: 0,
            opacity: 1,
            transition:{
              duration: 500,
              type: 'keyframes',
              ease: 'easein',
            }
          }"
            />
            
        <div class="m-4 flex flex-col gap-4 row-start-3 row-end-4 "  v-motion
          :initial="{
            opacity:0,
            y: 200,
            
          }"
          :visible="{
            y: 0,
            opacity: 1,
transition: {
              duration: 700,
              type: 'keyframes',
              ease: 'easein',
              
            },
          }"
        >
          <h3 id="line" class="text-4xl font-bold relative inline mb-6">
            Principais Objetivos:
          </h3>
          <ul class="flex flex-col mt-5 gap-5">
            <li>
              <h5 class="text-2xl font-bold">Diversão Competitiva:</h5>
              <li class="text-justify text-lg text-white/90">Queremos proporcionar momentos emocionantes, onde a diversão e a
            competição se entrelaçam, criando uma experiência de jogo memorável.</li>
            </li>
            <li class="mt-10">
              <h5 class="text-2xl font-bold">Inclusividade:</h5>
              <li class="text-justify text-lg text-white/90"> Nosso site é para todos. Quer você seja um jogador
            casual ou um dedicado competidor, nosso espaço é projetado para ser
            inclusivo, oferecendo desafios adequados para diferentes níveis de
            habilidade, incluindo os fãs de Speed Run.</li>
            </li>
          </ul>
        </div>
        <AboutItem title="Speed Run:" content="Em nosso repertório de desafios, damos destaque especial à arte da
            'Speed Run'. Essa prática envolvente e emocionante consiste em
            completar um jogo o mais rápido possível, desafiando jogadores a
            otimizarem suas estratégias e movimentos. Se você é um entusiasta da
            adrenalina e da eficiência, nossos desafios de Speed Run são feitos
            sob medida para você. Teste não apenas sua habilidade técnica, mas
            também sua capacidade de pensar rapidamente sob pressão, enquanto
            compete para alcançar tempos recordes e figurar no topo do ranking." 
            v-motion
            :initial="{
              y: 200,
            opacity: 0,
          }"
          :visible="{
            y: 0,
            opacity: 1,
            transition: {
              duration: 700,
              type: 'keyframes',
              ease: 'easein',
              
            },
          }"/>
        <AboutItem title="Resumo:" content="Nosso site é mais do que uma plataforma de
            jogos; é um convite para uma experiência emocionante e desafiadora,
            
            onde os amantes de Speed Run também encontrarão seu lugar. Junte-se
            a nós nesta jornada, teste suas habilidades, faça novos amigos e
            torne-se parte de uma comunidade que compartilha sua paixão pela
            emoção dos jogos cronometrados. Estamos ansiosos para vê-lo na
            competição!" 
            v-motion
            :initial="{
              y: 200,
            opacity: 0,
          }"
          :visible="{
            y: 0,
            opacity: 1,
            transition: {
              duration: 700,
              type: 'keyframes',
              ease: 'easein',
              
            },
          }"/>
      </div>
    </div>
  </main>
  <Footer />
</template>

<style scoped>
#best {
  min-height: calc(100vh - 250px);
}

#line::before {
  content: "";
  position: absolute;
  background: linear-gradient(to right, rgb(201, 201, 10) 10%, #000000ca);
  bottom: -6px;
  height: 4px;
  width: 100%;
}

</style>
